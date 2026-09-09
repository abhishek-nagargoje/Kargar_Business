import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

function resolve(relative: string): string {
  return fileURLToPath(new URL(relative, import.meta.url));
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
  console.log('[postbuild] Postbuild verification successfully completed.');
}

postbuild();
