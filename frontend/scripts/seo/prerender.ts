/**
 * Build-time prerenderer — run via `npm run prerender` (wired into `npm run build`, after
 * `vite build`). The site is a client-rendered SPA (GSAP, Swiper, Framer Motion, React Query,
 * Supabase all assume a real browser), so rather than migrating to SSR, this boots the actual
 * built app in a real headless browser, lets it fully hydrate on every real route, and saves
 * the resulting DOM as static HTML. Vercel then serves that file directly for the route
 * (see `generate-redirects.ts`), so crawlers get complete title/meta/canonical/H1/body/JSON-LD
 * in the initial HTTP response without executing JavaScript.
 */
import { chromium } from 'playwright';
import { preview, type PreviewServer } from 'vite';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRouteInventory } from './route-inventory';
import { routeToStaticFile } from './seo.config';

function resolve(relative: string): string {
  return fileURLToPath(new URL(relative, import.meta.url));
}

const ROOT_DIR = resolve('../..');
const DIST_DIR = resolve('../../dist');
const NOT_FOUND_PROBE_PATH = '/__prerender-404-probe__';

async function waitForHydration(page: import('playwright').Page): Promise<void> {
  // The SPA shell has no <h1>; every real page renders exactly one after hydration.
  await page.waitForSelector('h1', { timeout: 15000 });
  // react-helmet-async commits title/meta/JSON-LD in a post-render effect — give it a beat.
  await page.waitForSelector('script[type="application/ld+json"]', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(250);
}

async function prerenderRoute(
  page: import('playwright').Page,
  baseUrl: string,
  routePath: string,
  outFile: string,
): Promise<void> {
  const url = `${baseUrl}${routePath}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await waitForHydration(page);
  const html = await page.content();
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, `<!DOCTYPE html>\n${html}`, 'utf8');
  console.log(`[prerender] ${routePath} -> ${outFile.replace(`${ROOT_DIR}\\`, '').replace(`${ROOT_DIR}/`, '')}`);
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error('[prerender] ERROR: dist/ not found. Run `vite build` before `npm run prerender`.');
    process.exit(1);
  }

  const inventory = buildRouteInventory();
  if (inventory.length === 0) {
    console.error('[prerender] ERROR: route inventory is empty — nothing to prerender.');
    process.exit(1);
  }

  let previewServer: PreviewServer | undefined;
  const browser = await chromium.launch();

  try {
    previewServer = await preview({
      root: ROOT_DIR,
      preview: { port: 4174, strictPort: false, host: '127.0.0.1' },
      logLevel: 'error',
    });
    const localUrl = previewServer.resolvedUrls?.local?.[0];
    if (!localUrl) {
      throw new Error('Could not resolve a local preview server URL.');
    }
    const baseUrl = localUrl.replace(/\/$/, '');
    console.log(`[prerender] Preview server running at ${baseUrl}\n`);

    const page = await browser.newPage();

    let failures = 0;
    for (const routeEntry of inventory) {
      const outFile = join(DIST_DIR, routeToStaticFile(routeEntry.path));
      try {
        await prerenderRoute(page, baseUrl, routeEntry.path, outFile);
      } catch (error) {
        failures += 1;
        console.error(`[prerender] FAILED for ${routeEntry.path}:`, (error as Error).message);
      }
    }

    // Prerender the real 404 page content (a genuinely nonexistent path hits the * route).
    try {
      await prerenderRoute(page, baseUrl, NOT_FOUND_PROBE_PATH, join(DIST_DIR, '404.html'));
    } catch (error) {
      failures += 1;
      console.error('[prerender] FAILED for 404 page:', (error as Error).message);
    }

    console.log(
      `\n[prerender] Done. ${inventory.length + 1 - failures}/${inventory.length + 1} routes prerendered successfully.`,
    );

    if (failures > 0) {
      console.error('[prerender] SEO pipeline FAILED — one or more routes could not be prerendered.');
      process.exit(1);
    }
  } finally {
    await browser.close();
    await previewServer?.httpServer.close();
  }
}

void main();
