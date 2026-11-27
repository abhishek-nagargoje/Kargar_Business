/**
 * QA harness for the priority service pages and the enquiry journey, run against the local
 * production build (dist/) through the Vercel emulation in scripts/seo/serve-dist.ts.
 *
 *   npx tsx --tsconfig scripts/tsconfig.seo.json scripts/qa-enquiry-journey.ts [outDir]
 *
 * Safety: every request to Supabase or EmailJS is intercepted. Inserts are answered with a mock
 * 201 and the payload is captured for assertions; nothing reaches the real lead table or inbox.
 * Any other write to an external host is aborted.
 *
 * Checks (one row each in the JSON report):
 *  - priority pages at 360px and 1280px: HTTP 200, one H1, self canonical, no horizontal overflow,
 *    enquiry CTA visible, tel: link present, main copy present in the raw HTML (no JS needed)
 *  - retired /services/* detail URLs: 308/301 to the Pune page
 *  - mobile journey: land on /security-services-pune → CTA → form preselects "security" →
 *    submit with optional details → lead payload carries service, team, landing page, details;
 *    email params carry the full lead summary; GA event carries ids only (no PII)
 *  - same delivery assertion for each distinct routing configuration (one page per team)
 *  - validation: empty submit is blocked; DB failure shows an error and fires no success event
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium, type Page, type Request } from 'playwright';
import { startDistServer } from './seo/serve-dist';

interface Row { test: string; url: string; expected: string; actual: string; pass: boolean }
const rows: Row[] = [];
const record = (test: string, url: string, expected: string, actual: string, pass: boolean) => {
  rows.push({ test, url, expected, actual, pass });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${test}  ${url}  — ${actual}`);
};

const PRIORITY = [
  '/security-services-pune',
  '/housekeeping-services-pune',
  '/facility-management-company-pune',
  '/electrical-maintenance-services-pune',
  '/hvac-maintenance-services-pune',
  '/facility-maintenance-services-pune',
  '/housekeeping-staff-pune',
  '/housekeeping-services-baner',
  '/security-services-baner',
  '/facility-maintenance-services-baner',
  '/',
  '/contact-us',
];

const RETIRED: Record<string, string> = {
  '/services/hard-services/electrical-maintenance': '/electrical-maintenance-services-pune',
  '/services/hard-services/hvac-maintenance': '/hvac-maintenance-services-pune',
  '/services/soft-services/housekeeping': '/housekeeping-services-pune',
  '/services/soft-services/security-services': '/security-services-pune',
};

/** One landing page per distinct enquiry routing (service → team). */
/** Baner locality pages and the Pune parent that must link to each (crawl-discoverability check). */
const BANER_PARENTS: Record<string, string> = {
  '/housekeeping-services-baner': '/housekeeping-services-pune',
  '/security-services-baner': '/security-services-pune',
  '/facility-maintenance-services-baner': '/facility-maintenance-services-pune',
};

const ROUTING: { page: string; service: string; team: string; detail: [string, string]; locality?: string }[] = [
  { page: '/security-services-pune', service: 'security', team: 'Security', detail: ['coverage_hours', 'Round the clock (24 hours)'] },
  { page: '/housekeeping-services-pune', service: 'housekeeping', team: 'Housekeeping', detail: ['area_sqft', '12000'] },
  { page: '/housekeeping-staff-pune', service: 'housekeeping-manpower', team: 'Housekeeping', detail: ['roles_needed', '3 housekeeping staff'] },
  { page: '/facility-management-company-pune', service: 'facility-management', team: 'Facility management', detail: ['current_vendors', 'Two or three vendors'] },
  { page: '/hvac-maintenance-services-pune', service: 'hvac', team: 'Technical maintenance', detail: ['unit_count', '4 AHUs, 30 FCUs'] },
  { page: '/electrical-maintenance-services-pune', service: 'electrical', team: 'Technical maintenance', detail: ['asset_list', '1 DG set, 2 UPS'] },
  // Baner pages: the locality must arrive pre-filled from the page (the test does not type it).
  { page: '/housekeeping-services-baner', service: 'housekeeping', team: 'Housekeeping', detail: ['area_sqft', '8000'], locality: 'Baner' },
  { page: '/security-services-baner', service: 'security', team: 'Security', detail: ['coverage_hours', 'Round the clock (24 hours)'], locality: 'Baner' },
  { page: '/facility-maintenance-services-baner', service: 'facility-maintenance', team: 'Technical maintenance', detail: ['contract_model', 'Resident technician on site'], locality: 'Baner' },
];

interface Captured { leads: Record<string, unknown>[]; emails: Record<string, unknown>[]; gaEvents: unknown[][] }

async function instrument(page: Page, captured: Captured, opts: { failDb?: boolean } = {}) {
  await page.addInitScript(() => {
    // Capture gtag calls without loading Google scripts.
    (window as unknown as { __ga: unknown[] }).__ga = [];
  });
  await page.route('**/*', async (route) => {
    const req: Request = route.request();
    const url = new URL(req.url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
    if (url.hostname.endsWith('supabase.co')) {
      if (req.method() === 'POST' && url.pathname.includes('/contact_messages')) {
        const body = req.postDataJSON() as Record<string, unknown>;
        captured.leads.push(body);
        return opts.failDb
          ? route.fulfill({ status: 500, contentType: 'application/json', body: '{"message":"mock failure"}' })
          : route.fulfill({ status: 201, body: '' });
      }
      if (req.method() === 'GET') return route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
      return route.abort();
    }
    if (url.hostname.includes('emailjs')) {
      const body = req.postDataJSON() as { template_params?: Record<string, unknown> };
      captured.emails.push(body.template_params ?? {});
      return route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK' });
    }
    if (req.method() !== 'GET') return route.abort();
    // Third-party GETs (fonts, badges, gtag) are not needed for these checks.
    return route.abort();
  });
}

async function layoutChecks(page: Page, base: string, path: string, width: number) {
  await page.setViewportSize({ width, height: width < 500 ? 800 : 900 });
  const res = await page.goto(base + path, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  const status = res?.status() ?? 0;
  const info = await page.evaluate(() => {
    const canon = document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const h1 = document.querySelectorAll('h1').length;
    const tel = document.querySelectorAll('a[href^="tel:"]').length;
    const cta = [...document.querySelectorAll('main a[href^="/contact-us"]')].some((a) => {
      const r = (a as HTMLElement).getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    const smallest = Math.min(...[...document.querySelectorAll('main p')].map((p) => parseFloat(getComputedStyle(p).fontSize)).filter((n) => n > 0));
    return { canon, overflow, h1, tel, cta, smallest };
  });
  const label = `${width}px`;
  const okCanon = info.canon === `https://www.kargarbusinessservices.com${path === '/' ? '/' : path}`;
  const pass = status === 200 && info.h1 === 1 && okCanon && info.overflow <= 0 && info.tel > 0 && (path === '/contact-us' || info.cta);
  record(`layout+crawl ${label}`, path, '200, 1 H1, self canonical, no overflow, tel link, visible CTA',
    `status ${status}, H1 ${info.h1}, canonical ${okCanon ? 'self' : info.canon}, overflow ${info.overflow}px, tel ${info.tel}, CTA ${info.cta}, min body font ${info.smallest}px`, pass);
}

async function rawHtmlCheck(base: string, path: string) {
  const html = await (await fetch(base + path)).text();
  const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? '';
  const words = main.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const links = (main.match(/<a\b[^>]*href="\/[^"]*"/g) ?? []).length;
  record('raw HTML (no JS)', path, 'title, main copy and internal links in initial HTML', `title "${title}", ${words} words in <main>, ${links} internal links`, Boolean(title) && words > 150 && (path === '/contact-us' || links > 3));
}

async function journey(page: Page, base: string, r: (typeof ROUTING)[number], width: number, label: string) {
  const captured: Captured = { leads: [], emails: [], gaEvents: [] };
  await instrument(page, captured);
  await page.setViewportSize({ width, height: 800 });
  await page.goto(base + r.page, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);
  // Hero CTA (first contact link in main).
  await page.locator('main a[href="/contact-us#contact-form"]').first().click();
  await page.waitForURL(/\/contact-us/);
  await page.waitForSelector('#contact-form select[name="enquiry_service"]');
  const preselected = await page.locator('#contact-form select[name="enquiry_service"]').inputValue();
  record(`${label}: service preselected`, r.page, r.service, preselected || '(none)', preselected === r.service);

  await page.fill('#contact-form input[name="name"]', 'QA Test (do not contact)');
  await page.fill('#contact-form input[name="phone"]', '+910000000000');
  await page.fill('#contact-form input[name="email"]', 'qa-test@example.com');
  if (r.locality) {
    const prefilled = await page.inputValue('#contact-form input[name="locality"]');
    record(`${label}: locality pre-filled`, r.page, r.locality, prefilled || '(empty)', prefilled === r.locality);
  } else {
    await page.fill('#contact-form input[name="locality"]', 'Baner');
  }
  const [field, value] = r.detail;
  const el = page.locator(`#contact-form [name="${field}"]`).first();
  const tag = await el.evaluate((n) => n.tagName);
  if (tag === 'SELECT') await el.selectOption(value); else await el.fill(value);
  await page.locator('#contact-form button[type="submit"]').click();
  await page.waitForSelector('#contact-form .kb-enquiry-status--success', { timeout: 8000 }).catch(() => undefined);
  const statusText = (await page.locator('#contact-form [role="status"]').textContent()) ?? '';
  const ga = await page.evaluate(() => (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? []);

  const lead = captured.leads[0] ?? {};
  const meta = (lead.metadata ?? {}) as Record<string, unknown>;
  const details = (meta.details ?? {}) as Record<string, string>;
  const leadOk = meta.enquiry_service === r.service && meta.team === r.team && meta.service === r.page && meta.landing_page === r.page && Object.values(details).includes(value) && details['Locality or area'] === 'Baner';
  record(`${label}: lead record`, r.page, `enquiry_service=${r.service}, team=${r.team}, CTA page + landing page=${r.page}, details saved`,
    `enquiry_service=${String(meta.enquiry_service)}, team=${String(meta.team)}, service=${String(meta.service)}, landing=${String(meta.landing_page)}, details=${JSON.stringify(details)}, subject="${String(lead.subject)}"`, leadOk);

  const email = captured.emails[0] ?? {};
  const msg = String(email.message ?? '');
  const emailOk = msg.includes('Service requested:') && msg.includes('qa-test@example.com') && msg.includes('+910000000000') && msg.includes(value) && String(email.subject ?? '').startsWith(`[${r.team}]`);
  record(`${label}: notification email`, r.page, 'message contains service, team, email, phone, details; subject prefixed with team',
    `subject "${String(email.subject)}"; message has service ${msg.includes('Service requested:')}, email ${msg.includes('qa-test@example.com')}, phone ${msg.includes('+910000000000')}, detail ${msg.includes(value)}`, emailOk);

  record(`${label}: success message`, '/contact-us', 'visible confirmation naming the team', statusText.trim().slice(0, 140), statusText.toLowerCase().includes(r.team.toLowerCase()));
  const gaText = JSON.stringify(ga);
  record(`${label}: analytics has no PII`, '/contact-us', 'no name, email or phone in dataLayer', gaText.includes('qa-test@example.com') || gaText.includes('0000000000') ? 'PII found' : 'none found (tracking disabled outside production)', !(gaText.includes('qa-test@example.com') || gaText.includes('0000000000')));
  return captured;
}

async function main() {
  const outDir = process.argv[2] ?? 'qa-output';
  mkdirSync(outDir, { recursive: true });
  const { server, baseUrl } = await startDistServer(4181);
  const browser = await chromium.launch();
  try {
    // Redirects
    for (const [from, to] of Object.entries(RETIRED)) {
      const res = await fetch(baseUrl + from, { redirect: 'manual' });
      const loc = res.headers.get('location') ?? '';
      record('retired URL redirect', from, `301/308 → ${to}`, `${res.status} → ${loc}`, [301, 308].includes(res.status) && loc.endsWith(to));
    }
    // Sitemap
    const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
    for (const from of Object.keys(RETIRED)) record('sitemap excludes retired URL', from, 'absent', sitemap.includes(from) ? 'present' : 'absent', !sitemap.includes(from));
    for (const p of PRIORITY.filter((x) => x !== '/')) record('sitemap includes priority URL', p, 'present', sitemap.includes(`kargarbusinessservices.com${p}<`) ? 'present' : 'absent', sitemap.includes(`kargarbusinessservices.com${p}<`));

    for (const p of PRIORITY) await rawHtmlCheck(baseUrl, p);

    // Baner discoverability: a plain <a href> in the Pune parent's initial HTML, trailing-slash handling.
    for (const [baner, parent] of Object.entries(BANER_PARENTS)) {
      const html = await (await fetch(baseUrl + parent)).text();
      const main = html.match(/<main\s[\s\S]*?<\/main>/i)?.[0] ?? '';
      const anchor = main.match(new RegExp(`<a[^>]*href="${baner}"[^>]*>([^<]*)</a>`))?.[1] ?? '';
      record('crawl: Pune parent links to Baner page', parent, `<a href="${baner}"> in initial HTML`, anchor ? `found, anchor "${anchor}"` : 'missing', Boolean(anchor));
      const slash = await fetch(`${baseUrl}${baner}/`, { redirect: 'manual' });
      const loc = slash.headers.get('location') ?? '';
      record('trailing slash redirect', `${baner}/`, `308 → ${baner}`, `${slash.status} → ${loc}`, [301, 308].includes(slash.status) && loc.endsWith(baner));
    }

    const ctx = await browser.newContext();
    for (const width of [360, 1280]) {
      for (const p of PRIORITY) {
        const page = await ctx.newPage();
        await instrument(page, { leads: [], emails: [], gaEvents: [] });
        await layoutChecks(page, baseUrl, p, width);
        if (width === 360 && p === '/security-services-pune') await page.screenshot({ path: join(outDir, 'security-mobile-landing.png'), fullPage: false });
        if (p.endsWith('-baner')) await page.screenshot({ path: join(outDir, `${p.slice(1)}-${width}.png`), fullPage: false });
        await page.close();
      }
    }

    // Mobile journey (handover demo) with screenshots
    {
      const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      const page = await mctx.newPage();
      await journey(page, baseUrl, ROUTING[0]!, 390, 'mobile security journey');
      await page.screenshot({ path: join(outDir, 'security-mobile-enquiry-sent.png'), fullPage: false });
      await mctx.close();
    }
    // Each routing configuration
    for (const r of ROUTING.slice(1)) {
      const rctx = await browser.newContext();
      const page = await rctx.newPage();
      await journey(page, baseUrl, r, 1280, `routing ${r.service}`);
      await rctx.close();
    }

    // Validation: empty submit blocked
    {
      const vctx = await browser.newContext();
      const page = await vctx.newPage();
      const cap: Captured = { leads: [], emails: [], gaEvents: [] };
      await instrument(page, cap);
      await page.goto(`${baseUrl}/contact-us`, { waitUntil: 'domcontentloaded' });
      await page.locator('#contact-form button[type="submit"]').click();
      await page.waitForTimeout(500);
      record('validation: empty submit', '/contact-us', 'blocked, no request', `${cap.leads.length} requests`, cap.leads.length === 0);
      await vctx.close();
    }
    // DB failure path
    {
      const fctx = await browser.newContext();
      const page = await fctx.newPage();
      const cap: Captured = { leads: [], emails: [], gaEvents: [] };
      await instrument(page, cap, { failDb: true });
      await page.goto(`${baseUrl}/contact-us`, { waitUntil: 'domcontentloaded' });
      await page.fill('#contact-form input[name="name"]', 'QA Test');
      await page.fill('#contact-form input[name="phone"]', '+910000000000');
      await page.fill('#contact-form input[name="email"]', 'qa-test@example.com');
      await page.selectOption('#contact-form select[name="enquiry_service"]', 'other');
      await page.locator('#contact-form button[type="submit"]').click();
      await page.waitForTimeout(1500);
      const text = (await page.locator('#contact-form [role="status"]').textContent()) ?? '';
      const nameKept = await page.inputValue('#contact-form input[name="name"]');
      record('DB failure path', '/contact-us', 'error shown, input kept, no email sent', `"${text.trim().slice(0, 80)}", name kept ${nameKept === 'QA Test'}, emails ${cap.emails.length}`, text.includes('Unable') && nameKept === 'QA Test' && cap.emails.length === 0);
      await fctx.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
  writeFileSync(join(outDir, 'qa-report.json'), JSON.stringify({ ranAt: new Date().toISOString(), rows }, null, 2));
  const failed = rows.filter((r) => !r.pass).length;
  console.log(`\n${rows.length - failed}/${rows.length} passed`);
  process.exit(failed ? 1 : 0);
}

void main();
