import { copyFileSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

function resolve(relative: string): string {
  return fileURLToPath(new URL(relative, import.meta.url));
}

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'assets' ? [] : htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

function findRawMarkdownLinks(distDir: string): string[] {
  const leaks: string[] = [];
  for (const file of htmlFiles(distDir)) {
    const visible = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
    const match = /\[[^\]<>]{1,120}\]\(\/[^)\s<>]*\)/.exec(visible);
    if (match) leaks.push(`${relative(distDir, file)}: ${match[0]}`);
  }
  return leaks;
}

function postbuild() {
  const distDir = resolve('../../dist');
  const indexPath = `${distDir}/index.html`;
  const path404 = `${distDir}/404.html`;
  const vercelJsonPath = resolve('../../vercel.json');

  if (!existsSync(indexPath)) {
    console.error('[postbuild] ERROR: dist/index.html not found!');
    process.exit(1);
  }

  // `prerender.ts` (runs as part of `npm run build`, after `vite build`) writes a real,
  // fully-rendered dist/404.html from the app's actual NotFoundPage. Only fall back to
  // copying the SPA shell if that step didn't run (e.g. `vite build` invoked directly).
  if (existsSync(path404)) {
    console.log('[postbuild] dist/404.html already prerendered — leaving it as-is.');
  } else {
    copyFileSync(indexPath, path404);
    console.log('[postbuild] dist/404.html missing (prerender did not run) — fell back to copying dist/index.html.');
  }

  if (!existsSync(vercelJsonPath)) {
    console.error('[postbuild] ERROR: vercel.json not found!');
    process.exit(1);
  }

  const vercelConfig = JSON.parse(readFileSync(vercelJsonPath, 'utf8')) as {
    rewrites?: Array<{ source: string; destination: string }>;
    redirects?: Array<{ source: string; destination: string }>;
  };

  const hasWildcardRewrite = vercelConfig.rewrites?.some((r) => r.source === '/(.*)');
  if (hasWildcardRewrite) {
    console.error('[postbuild] ERROR: vercel.json still contains wildcard /(.*) rewrite rule!');
    process.exit(1);
  }

  console.log(`[postbuild] vercel.json validated: ${vercelConfig.redirects?.length ?? 0} redirects, ${vercelConfig.rewrites?.length ?? 0} explicit rewrites, 0 wildcard rewrites.`);

  // Content configs write internal links as `[anchor](/path)`. If a renderer outputs that string as
  // plain text instead of passing it through <Inline>, visitors and screen readers get raw markdown
  // and the link is lost. Fail the build on any such leak in prerendered visible HTML.
  const leaks = findRawMarkdownLinks(distDir);
  if (leaks.length > 0) {
    console.error('[postbuild] ERROR: raw markdown links rendered as text (use <Inline> for InlineText):');
    leaks.forEach((leak) => { console.error(`  - ${leak}`); });
    process.exit(1);
  }
  console.log('[postbuild] No raw markdown links in prerendered HTML.');
  console.log('[postbuild] Postbuild verification successfully completed.');
}

postbuild();
