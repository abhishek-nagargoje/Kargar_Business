/**
 * Build-time prerenderer — run via `npm run prerender` (wired into `npm run build`, after
 * `vite build`). The site is a client-rendered SPA (GSAP, Swiper, Framer Motion, React Query,
 * Supabase all assume a real browser), so rather than migrating to SSR, this boots the actual
 * built app in a real headless browser, lets it fully hydrate on every real route, and saves
 * the resulting DOM as static HTML. Vercel then serves that file directly for the route
 * (see `generate-redirects.ts`), so crawlers get complete title/meta/canonical/H1/body/JSON-LD
 * in the initial HTTP response without executing JavaScript.
 */
import { chromium, type Browser, type Page } from 'playwright-core';
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

/**
 * Vercel's build container is a minimal Amazon-Linux-based image with no `apt`, so
 * Playwright's own downloaded Chromium fails to launch there (missing shared libraries
 * like libnspr4.so — there's no `--with-deps` equivalent without apt). `@sparticuz/chromium`
 * ships a Chromium build specifically compiled for exactly this class of minimal serverless/
 * build environment, so it's used only when `VERCEL=1` (set automatically during Vercel
 * builds). Everywhere else (local dev, other CI), the Chromium installed via
 * `npx playwright install chromium` — which works fine on a normal OS — is used unchanged.
 */
const IS_VERCEL = process.env.VERCEL === '1';

/**
 * @sparticuz/chromium's default args target AWS Lambda and include `--single-process`, which
 * runs every tab's renderer inside the browser process: one renderer crash or OOM kills the
 * whole browser ("Target page, context or browser has been closed" for every later route).
 * Vercel's build container is a normal multi-process environment, so that flag is dropped
 * there; if Chromium refuses to start without it, the stock args are used as a fallback (the
 * retry/relaunch logic below still keeps the run alive in that mode).
 */
async function launchBrowser(): Promise<Browser> {
  if (IS_VERCEL) {
    const sparticuzChromium = (await import('@sparticuz/chromium')).default;
    const executablePath = await sparticuzChromium.executablePath();
    const multiProcessArgs = sparticuzChromium.args.filter((arg) => arg !== '--single-process');
    try {
      console.log('[prerender] Running on Vercel — launching @sparticuz/chromium (multi-process).');
      return await chromium.launch({ args: multiProcessArgs, executablePath, headless: true });
    } catch (error) {
      console.warn('[prerender] Multi-process launch failed, retrying with stock args:', (error as Error).message);
      return chromium.launch({ args: sparticuzChromium.args, executablePath, headless: true });
    }
  }
  return chromium.launch({ headless: true });
}

/**
 * One shared browser, relaunched on demand if it disconnects (crash/OOM). Concurrent workers
 * share a single in-flight launch so a crash never spawns several browsers at once.
 */
class BrowserManager {
  private browser: Browser | undefined;
  private launching: Promise<Browser> | undefined;

  async get(): Promise<Browser> {
    if (this.browser?.isConnected()) return this.browser;
    if (!this.launching) {
      const wasRunning = this.browser !== undefined;
      this.launching = launchBrowser()
        .then((browser) => {
          if (wasRunning) console.warn('[prerender] Browser was closed — relaunched.');
          this.browser = browser;
          return browser;
        })
        .finally(() => {
          this.launching = undefined;
        });
    }
    return this.launching;
  }

  /** Drops a browser that stopped responding so the next get() launches a fresh one. */
  abandon(browser: Browser): void {
    if (this.browser !== browser) return;
    this.browser = undefined;
    void browser.close().catch(() => undefined);
  }

  async close(): Promise<void> {
    await this.launching?.catch(() => undefined);
    if (this.browser?.isConnected()) await this.browser.close();
  }
}

const MAX_ATTEMPTS = 3;
/** Hard cap per attempt (goto 60s + hydration 30s + margin) so a wedged browser can't hang the build. */
const ATTEMPT_DEADLINE_MS = 120000;
const PAGE_CLOSE_DEADLINE_MS = 10000;

function withDeadline<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => { reject(new Error(`${label} exceeded ${ms / 1000}s`)); }, ms);
  });
  return Promise.race([promise, deadline]).finally(() => { clearTimeout(timer); });
}

/** Fresh page per attempt (isolated context), always closed; relaunches the browser if it died. */
async function prerenderWithRetry(
  browsers: BrowserManager,
  baseUrl: string,
  routePath: string,
  outFile: string,
): Promise<boolean> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const handles: { browser?: Browser; page?: Page } = {};
    try {
      await withDeadline(
        (async () => {
          handles.browser = await browsers.get();
          handles.page = await handles.browser.newPage();
          await prerenderRoute(handles.page, baseUrl, routePath, outFile);
        })(),
        ATTEMPT_DEADLINE_MS,
        'Prerender attempt',
      );
      return true;
    } catch (error) {
      // A browser that is still "connected" but stopped answering won't recover on its own.
      if (handles.browser && (error as Error).message.includes('Prerender attempt exceeded')) {
        browsers.abandon(handles.browser);
      }
      const message = (error as Error).message;
      if (attempt < MAX_ATTEMPTS) {
        console.warn(`[prerender] Attempt ${attempt}/${MAX_ATTEMPTS} failed for ${routePath}: ${message} — retrying.`);
      } else {
        console.error(`[prerender] FAILED for ${routePath} after ${MAX_ATTEMPTS} attempts:`, message);
      }
    } finally {
      if (handles.page) {
        await withDeadline(handles.page.close(), PAGE_CLOSE_DEADLINE_MS, 'page.close').catch(() => undefined);
      }
    }
  }
  return false;
}

async function waitForHydration(page: Page): Promise<void> {
  // The SPA shell has no <h1>; every real page renders exactly one after hydration.
  await page.waitForSelector('h1', { timeout: 15000 });
  // react-helmet-async commits title/meta/JSON-LD in a post-render effect — give it a beat.
  // `attached`, not the default `visible`: a <script> is never visible, so the default always
  // burned the full 15s timeout on every route.
  await page.waitForSelector('script[type="application/ld+json"]', { state: 'attached', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(250);
}

async function prerenderRoute(
  page: Page,
  baseUrl: string,
  routePath: string,
  outFile: string,
): Promise<void> {
  const url = `${baseUrl}${routePath}`;
  // 60s, not 30s: pages with several unthumbnailed real photos in a "Real Service Work"
  // gallery can legitimately take longer to reach networkidle over a real network than a
  // page with only a few small assets — this is not a hang, just more bytes to fetch.
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
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
  const browsers = new BrowserManager();
  let failures = 0;

  try {
    await browsers.get();
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

    // Each route is an independent page load in its own tab, so a small worker pool cuts wall
    // time without changing the HTML produced for any route. Sequential by default on Vercel's
    // 2-CPU build machine, where parallel heavy pages exhaust memory; override with
    // PRERENDER_CONCURRENCY.
    const concurrency = Math.max(1, Number(process.env.PRERENDER_CONCURRENCY ?? (IS_VERCEL ? 1 : 4)));
    const pending = [...inventory];
    await Promise.all(
      Array.from({ length: Math.min(concurrency, pending.length) }, async () => {
        for (let routeEntry = pending.shift(); routeEntry; routeEntry = pending.shift()) {
          const outFile = join(DIST_DIR, routeToStaticFile(routeEntry.path));
          if (!(await prerenderWithRetry(browsers, baseUrl, routeEntry.path, outFile))) failures += 1;
        }
      }),
    );

    // Prerender the real 404 page content (a genuinely nonexistent path hits the * route).
    if (!(await prerenderWithRetry(browsers, baseUrl, NOT_FOUND_PROBE_PATH, join(DIST_DIR, '404.html')))) {
      failures += 1;
    }

    console.log(
      `\n[prerender] Done. ${inventory.length + 1 - failures}/${inventory.length + 1} routes prerendered successfully.`,
    );
  } finally {
    // Only after every route (and the 404 probe) has finished or exhausted its retries.
    await browsers.close().catch(() => undefined);
    await previewServer?.httpServer.close();
  }

  if (failures > 0) {
    console.error('[prerender] SEO pipeline FAILED — one or more routes could not be prerendered.');
    process.exit(1);
  }
}

void main();
