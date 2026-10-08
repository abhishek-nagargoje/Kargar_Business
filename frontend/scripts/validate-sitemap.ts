/**
 * Sitemap validator. Verifies every <loc> in sitemap.xml:
 *   - is HTTPS on the canonical host, with no query string, fragment, uppercase or trailing slash
 *   - is listed once
 *   - returns HTTP 200 directly (no redirect, no 404)
 *   - is self-canonical (exactly one canonical, equal to the sitemap URL)
 *   - is not noindex (meta robots or X-Robots-Tag)
 * Also checks robots.txt references the sitemap and sitemap.xml itself is served as XML.
 *
 * Usage:
 *   tsx scripts/validate-sitemap.ts                 # local build: serves dist/ with vercel.json routing
 *   tsx scripts/validate-sitemap.ts --url https://www.kargarbusinessservices.com
 * Exits 1 on any failure (wired into `npm run postbuild`, so a broken sitemap fails the build).
 */
import { fetchRaw, analyzeHtml, parseSitemap, toAuditUrl } from './seo/crawl-utils';
import { SITE_URL } from './seo/seo.config';
import { startDistServer } from './seo/serve-dist';

async function validate(baseUrl: string): Promise<string[]> {
  const errors: string[] = [];

  const robots = await fetchRaw(`${baseUrl}/robots.txt`);
  if (robots.status !== 200) errors.push(`robots.txt returned ${robots.status}`);
  if (!robots.body.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) errors.push('robots.txt does not reference the canonical sitemap URL');
  if (/^Disallow:\s*\/\s*$/m.test(robots.body)) errors.push('robots.txt disallows the whole site');

  const sitemap = await fetchRaw(`${baseUrl}/sitemap.xml`);
  if (sitemap.status !== 200) return [...errors, `sitemap.xml returned ${sitemap.status}`];
  if (!sitemap.contentType?.includes('xml')) errors.push(`sitemap.xml served as "${sitemap.contentType}", expected XML`);
  if (!sitemap.body.trimStart().startsWith('<?xml') || !sitemap.body.includes('<urlset')) errors.push('sitemap.xml is not a valid <urlset> document');

  const locs = parseSitemap(sitemap.body);
  if (locs.length === 0) errors.push('sitemap.xml contains no URLs');

  const seen = new Set<string>();
  for (const loc of locs) {
    if (seen.has(loc)) errors.push(`${loc}: duplicate sitemap entry`);
    seen.add(loc);

    const url = new URL(loc);
    if (`${url.protocol}//${url.host}` !== SITE_URL) errors.push(`${loc}: not on canonical origin ${SITE_URL}`);
    if (url.search || url.hash) errors.push(`${loc}: contains query string or fragment`);
    if (url.pathname !== '/' && url.pathname.endsWith('/')) errors.push(`${loc}: trailing slash (site convention is none)`);
    if (url.pathname !== url.pathname.toLowerCase()) errors.push(`${loc}: contains uppercase characters`);

    const res = await fetchRaw(toAuditUrl(loc, baseUrl));
    if (res.status >= 300 && res.status < 400) {
      errors.push(`${loc}: redirects (${res.status} -> ${res.location ?? '?'})`);
      continue;
    }
    if (res.status !== 200) {
      errors.push(`${loc}: returned HTTP ${res.status}`);
      continue;
    }
    const page = analyzeHtml(res.body, toAuditUrl(loc, baseUrl));
    if (page.canonicals.length !== 1) errors.push(`${loc}: has ${page.canonicals.length} canonical tags`);
    else if (page.canonicals[0] !== loc) errors.push(`${loc}: canonical points elsewhere (${page.canonicals[0]})`);
    if (page.robotsMeta.some((r) => /noindex/i.test(r)) || /noindex/i.test(res.xRobotsTag ?? '')) errors.push(`${loc}: is noindex`);
    if (page.titles.length !== 1 || !page.titles[0]) errors.push(`${loc}: missing or duplicate <title>`);
    if (page.h1s.length !== 1) errors.push(`${loc}: has ${page.h1s.length} <h1> elements`);
  }

  console.log(`[validate-sitemap] Checked ${locs.length} sitemap URLs against ${baseUrl}`);
  return errors;
}

async function main() {
  const urlFlag = process.argv.indexOf('--url');
  const target = urlFlag > -1 ? process.argv[urlFlag + 1] : undefined;
  let close: (() => void) | undefined;
  let baseUrl = target?.replace(/\/$/, '');

  if (!baseUrl) {
    const { server, baseUrl: localUrl } = await startDistServer(4181);
    baseUrl = localUrl;
    close = () => { server.close(); };
  }

  try {
    const errors = await validate(baseUrl);
    if (errors.length > 0) {
      console.error('[validate-sitemap] FAILED:');
      errors.forEach((e) => { console.error(`  - ${e}`); });
      process.exitCode = 1;
    } else {
      console.log('[validate-sitemap] PASS — every sitemap URL is 200, self-canonical and indexable.');
    }
  } finally {
    close?.();
  }
}

void main();
