import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { REDIRECTS, routeToStaticFile } from './seo.config';
import { buildRouteInventory } from './route-inventory';

interface VercelRewrite {
  source: string;
  destination: string;
}

interface VercelConfig {
  redirects?: unknown[];
  rewrites?: VercelRewrite[];
  [key: string]: unknown;
}

export function mergeRedirects(existing: VercelConfig): VercelConfig {
  const inventory = buildRouteInventory();

  // Every route in the SEO route inventory is prerendered at build time (see prerender.ts),
  // so it gets its own static HTML file — served directly instead of the SPA shell, giving
  // crawlers complete title/meta/canonical/H1/body/JSON-LD without executing JavaScript.
  const rewrites: VercelRewrite[] = inventory.map((page) => ({
    source: page.path,
    destination: `/${routeToStaticFile(page.path)}`,
  }));

  // Parameter patterns for any future dynamic category/service route not yet in the
  // inventory, and the admin portal, fall back to the CSR shell (client-side routed).
  rewrites.push(
    { source: '/services/:categoryId', destination: '/index.html' },
    { source: '/services/:categoryId/:serviceId', destination: '/index.html' },
    { source: '/admin', destination: '/index.html' },
    { source: '/admin/(.*)', destination: '/index.html' },
  );

  return {
    ...existing,
    redirects: REDIRECTS.map((r) => ({ source: r.from, destination: r.to, permanent: r.permanent })),
    rewrites,
  };
}

function main() {
  const vercelJsonPath = fileURLToPath(new URL('../../vercel.json', import.meta.url));
  const existing = JSON.parse(readFileSync(vercelJsonPath, 'utf8')) as VercelConfig;
  const merged = mergeRedirects(existing);
  writeFileSync(vercelJsonPath, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
  console.log(
    `[seo] vercel.json generated -> ${vercelJsonPath} (${REDIRECTS.length} redirects, ${merged.rewrites?.length ?? 0} rewrites)`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
