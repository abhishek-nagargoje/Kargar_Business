/**
 * SEO crawler / regression audit.
 *
 * Crawls the site from the homepage and every sitemap URL (following internal links), plus a
 * fixed set of probe URLs that reproduce known Search Console issues, and reports per URL:
 * status, redirect target, title/description (+lengths), canonical (+its status), robots,
 * H1 count, word count, JSON-LD types, internal/external links, images and missing alt.
 * Site-level checks: duplicate titles/descriptions, orphans, links to redirects/404s/parameter URLs.
 *
 * Usage:
 *   tsx scripts/seo-audit.ts                       # audits the local build (dist/ + vercel.json routing)
 *   tsx scripts/seo-audit.ts --url https://www.kargarbusinessservices.com
 *   tsx scripts/seo-audit.ts --strict              # exit 1 on critical issues (CI/regression guard)
 *   tsx scripts/seo-audit.ts --out ../seo-audit    # report directory (default: ../seo-audit)
 *   tsx scripts/seo-audit.ts --external            # also check every outbound link (never fails --strict)
 * Writes SEO_AUDIT_REPORT.json, SEO_AUDIT_REPORT.md, internal-links.csv, redirects.csv and, with
 * --external, external-links.csv. Against production it also writes canonicalization-matrix.csv
 * (http/https x www/apex x trailing slash for CANONICALIZATION_ROUTES).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyzeHtml, checkExternal, fetchRaw, parseSitemap, toAuditUrl, traceRedirects, type PageAnalysis, type RedirectTrace } from './seo/crawl-utils';
import { SITE_URL } from './seo/seo.config';
import { startDistServer } from './seo/serve-dist';

const MAX_PAGES = 400;

interface Probe {
  path: string;
  status: number;
  /** For redirects: the final path the chain must end on (with a 200). */
  location?: string;
  /** Max redirect hops allowed before the final 200 (default 1 for redirects). */
  maxHops?: number;
  /** For 200s: the path the page's canonical must point at. */
  canonical?: string;
  note?: string;
}

/**
 * URLs that reproduce Search Console findings, asserted on every run (a mismatch is CRITICAL, so
 * `--strict` fails CI). Background in seo-audit/GSC_ISSUES_AND_FIXES.md.
 */
const PROBES: Probe[] = [
  // GSC "Page with redirect": trailingSlash:false strips the slash in one permanent hop. Intentional.
  { path: '/services/', status: 308, location: '/services' },
  { path: '/sectors/', status: 308, location: '/sectors' },
  // GSC "Redirect error" (Oct 2026): must stay a single hop to the 200, self-canonical policy page.
  { path: '/privacy-policy/', status: 308, location: '/privacy-policy' },
  { path: '/privacy-policy/?ref=x', status: 308, location: '/privacy-policy?ref=x', note: 'query string preserved' },
  { path: '/privacy-policy', status: 200, canonical: '/privacy-policy' },
  { path: '/services', status: 200, canonical: '/services' },
  { path: '/sectors', status: 200, canonical: '/sectors' },
  // Prerendered files are reachable by their .html name; they must canonicalize to the clean URL.
  { path: '/privacy-policy.html', status: 200, canonical: '/privacy-policy' },
  { path: '/services.html', status: 200, canonical: '/services' },
  // Legacy aliases from vercel.json `redirects`.
  { path: '/category/services', status: 308, location: '/services' },
  { path: '/category/services/', status: 308, location: '/services', maxHops: 2, note: 'slash strip, then alias' },
  { path: '/contact', status: 308, location: '/contact-us' },
  { path: '/about-us', status: 308, location: '/company-profile' },
  { path: '/contact-us?source=homepage&cta_position=hero', status: 200, canonical: '/contact-us' },
  // Unknown URLs must be real 404s, never the homepage or a soft-404 200.
  { path: '/services/does-not-exist', status: 404, note: 'was soft-404 200' },
  { path: '/services/hard-services/does-not-exist', status: 404, note: 'was soft-404 200' },
  { path: '/this-page-does-not-exist', status: 404 },
  { path: '/HOUSEKEEPING-SERVICES-PUNE', status: 404, note: 'no case-variant duplicate' },
];

/** Routes checked across scheme/host/slash variants when auditing production (`--url` = SITE_URL). */
const CANONICALIZATION_ROUTES = ['/', '/services', '/sectors', '/privacy-policy', '/contact-us', '/company-profile', '/housekeeping-services-pune'];

function describeProbe(p: Probe): string {
  const base = p.location ? `${p.status} -> ${p.location}` : p.canonical ? `${p.status}, canonical ${p.canonical}` : String(p.status);
  return p.note ? `${base} (${p.note})` : base;
}

function csv(rows: (string | number | boolean | undefined)[][]): string {
  return `${rows.map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n')}\n`;
}

interface PageRecord {
  url: string;
  path: string;
  status: number;
  redirectTo?: string;
  redirect?: RedirectTrace;
  contentType?: string;
  xRobotsTag?: string;
  inSitemap: boolean;
  probe?: string;
  title?: string;
  titleLength?: number;
  description?: string;
  descriptionLength?: number;
  canonical?: string;
  canonicalStatus?: number;
  selfCanonical?: boolean;
  robots?: string;
  indexable?: boolean;
  h1Count?: number;
  h1?: string;
  wordCount?: number;
  schema?: string[];
  internalLinkCount?: number;
  externalLinkCount?: number;
  inboundLinks: number;
  imageCount?: number;
  imagesMissingAlt?: number;
  issues: string[];
}

async function main() {
  const args = process.argv.slice(2);
  const urlFlag = args.indexOf('--url');
  const outFlag = args.indexOf('--out');
  const strict = args.includes('--strict');
  const checkExternalLinks = args.includes('--external');
  const outDir = resolve(outFlag > -1 ? (args[outFlag + 1] ?? '') : fileURLToPath(new URL('../../seo-audit', import.meta.url)));

  let baseUrl = urlFlag > -1 ? args[urlFlag + 1]?.replace(/\/$/, '') : undefined;
  let closeServer: (() => void) | undefined;
  if (!baseUrl) {
    const { server, baseUrl: local } = await startDistServer(4182);
    baseUrl = local;
    closeServer = () => { server.close(); };
  }
  const target = baseUrl;

  try {
    const sitemapRes = await fetchRaw(`${target}/sitemap.xml`);
    const sitemapPaths = new Set(parseSitemap(sitemapRes.body).map((loc) => new URL(loc).pathname));

    const records = new Map<string, PageRecord>();
    const analyses = new Map<string, PageAnalysis>();
    const inbound = new Map<string, Set<string>>();
    const canonicalStatusCache = new Map<string, number>();
    const queue: string[] = ['/', ...sitemapPaths, ...PROBES.map((p) => p.path)];
    const queued = new Set(queue);

    while (queue.length > 0 && records.size < MAX_PAGES) {
      const path = queue.shift() ?? '/';
      const url = `${target}${path}`;
      const res = await fetchRaw(url);
      const probe = PROBES.find((p) => p.path === path);
      const record: PageRecord = {
        url: `${SITE_URL}${path}`,
        path,
        status: res.status,
        redirectTo: res.location,
        contentType: res.contentType,
        xRobotsTag: res.xRobotsTag,
        inSitemap: sitemapPaths.has(path),
        probe: probe ? describeProbe(probe) : undefined,
        inboundLinks: 0,
        issues: [],
      };
      records.set(path, record);
      if (res.status >= 300 && res.status < 400) record.redirect = await traceRedirects(url);

      if (res.status !== 200 || !res.contentType?.includes('text/html')) continue;
      const page = analyzeHtml(res.body, url);
      analyses.set(path, page);

      const canonical = page.canonicals[0];
      let canonicalStatus: number | undefined;
      if (canonical) {
        const auditUrl = toAuditUrl(canonical, target);
        if (!canonicalStatusCache.has(auditUrl)) canonicalStatusCache.set(auditUrl, (await fetchRaw(auditUrl)).status);
        canonicalStatus = canonicalStatusCache.get(auditUrl);
      }
      const robots = page.robotsMeta.join(' | ');
      const noindex = /noindex/i.test(robots) || /noindex/i.test(res.xRobotsTag ?? '');
      Object.assign(record, {
        title: page.titles[0],
        titleLength: page.titles[0]?.length,
        description: page.descriptions[0],
        descriptionLength: page.descriptions[0]?.length,
        canonical,
        canonicalStatus,
        selfCanonical: canonical === `${SITE_URL}${path === '/' ? '/' : path}`,
        robots,
        indexable: !noindex && canonical === `${SITE_URL}${path === '/' ? '/' : path}`,
        h1Count: page.h1s.length,
        h1: page.h1s[0],
        wordCount: page.wordCount,
        schema: [...new Set(page.schemaTypes)],
        internalLinkCount: page.internalLinks.length,
        externalLinkCount: page.externalLinks.length,
        imageCount: page.imageCount,
        imagesMissingAlt: page.imagesMissingAlt,
      });

      // Only follow links from pages that are themselves part of the site (not probes/404s).
      for (const link of page.internalLinks) {
        const linkPath = link;
        if (!inbound.has(linkPath)) inbound.set(linkPath, new Set());
        inbound.get(linkPath)?.add(path);
        if (!queued.has(linkPath) && !linkPath.startsWith('/admin') && !/\.(pdf|png|webp|jpe?g|svg|xml|txt)$/i.test(linkPath)) {
          queued.add(linkPath);
          queue.push(linkPath);
        }
      }
    }

    // ── Issue detection ──
    const titleOwners = new Map<string, string[]>();
    const descOwners = new Map<string, string[]>();
    for (const record of records.values()) {
      record.inboundLinks = inbound.get(record.path)?.size ?? 0;
      const page = analyses.get(record.path);

      if (record.inSitemap) {
        if (record.status !== 200) record.issues.push(`CRITICAL: sitemap URL returns ${record.status}`);
        if (record.status === 200 && !record.indexable) record.issues.push('CRITICAL: sitemap URL is not indexable/self-canonical');
        if (record.inboundLinks === 0 && record.path !== '/') record.issues.push('HIGH: orphan (no internal links found)');
      }
      if (!page) continue;
      if (record.indexable) {
        if (!record.title) record.issues.push('CRITICAL: missing <title>');
        if (!record.description) record.issues.push('CRITICAL: missing meta description');
        if (!record.canonical) record.issues.push('CRITICAL: missing canonical');
        if (record.h1Count !== 1) record.issues.push(`CRITICAL: ${record.h1Count ?? 0} H1 elements`);
        if (page.titles.length > 1) record.issues.push('HIGH: multiple <title> tags');
        if (page.descriptions.length > 1) record.issues.push('HIGH: multiple meta descriptions');
        if ((record.titleLength ?? 0) > 65) record.issues.push(`LOW: title ${record.titleLength} chars (may truncate)`);
        if ((record.descriptionLength ?? 0) > 165) record.issues.push(`LOW: description ${record.descriptionLength} chars (may truncate)`);
        if (!page.ogTitle || !page.ogDescription || !page.ogImage) record.issues.push('MEDIUM: incomplete Open Graph tags');
        if (!page.twitterCard) record.issues.push('MEDIUM: missing twitter:card');
        if (page.schemaErrors.length) record.issues.push(...page.schemaErrors.map((e) => `HIGH: ${e}`));
        if ((record.wordCount ?? 0) < 250) record.issues.push(`MEDIUM: thin main content (${record.wordCount} words)`);
        if (record.title) titleOwners.set(record.title, [...(titleOwners.get(record.title) ?? []), record.path]);
        if (record.description) descOwners.set(record.description, [...(descOwners.get(record.description) ?? []), record.path]);
      }
      if (record.canonical && record.canonicalStatus !== 200) record.issues.push(`CRITICAL: canonical returns ${record.canonicalStatus}`);
      if ((record.imagesMissingAlt ?? 0) > 0) record.issues.push(`MEDIUM: ${record.imagesMissingAlt} image(s) without alt attribute`);

      for (const link of page.internalLinks) {
        if (link.includes('?')) record.issues.push(`HIGH: links to parameter URL ${link}`);
        const target = records.get(link);
        if (target && target.status >= 300 && target.status < 400) record.issues.push(`HIGH: links to redirecting URL ${link}`);
        if (target && target.status >= 400) record.issues.push(`CRITICAL: broken internal link ${link} (${target.status})`);
      }
    }
    const toPath = (u: string) => {
      const parsed = new URL(u);
      return parsed.pathname + parsed.search;
    };

    // Redirect chains: loops, chains that end anywhere but a 200, and probe expectations.
    for (const record of records.values()) {
      const trace = record.redirect;
      if (trace?.loop) record.issues.push(`CRITICAL: redirect loop (${trace.chain.map((c) => toPath(c.url)).join(' -> ')})`);
      else if (trace && trace.finalStatus !== 200) record.issues.push(`CRITICAL: redirect chain ends in ${trace.finalStatus || trace.error}`);
      const probe = PROBES.find((p) => p.path === record.path);
      if (!probe) continue;
      const fail = (msg: string) => record.issues.push(`CRITICAL: probe expected ${describeProbe(probe)} — ${msg}`);
      if (record.status !== probe.status) fail(`got ${record.status}`);
      else if (probe.location && trace) {
        if (toPath(trace.finalUrl) !== probe.location) fail(`chain ends at ${toPath(trace.finalUrl)}`);
        if (trace.hops > (probe.maxHops ?? 1)) fail(`${trace.hops} hops`);
      } else if (probe.canonical && record.canonical !== `${SITE_URL}${probe.canonical}`) fail(`canonical ${record.canonical}`);
    }

    // Link quality on every crawled page.
    for (const [path, page] of analyses) {
      const record = records.get(path);
      for (const link of page.links) {
        if (!link.anchorText) record?.issues.push(`MEDIUM: link to ${link.target} has no accessible name`);
        if (!link.internal && link.target.startsWith('http:')) record?.issues.push(`MEDIUM: insecure http:// link ${link.target}`);
        if (link.newTab && !/noopener|noreferrer/.test(link.rel ?? '')) record?.issues.push(`LOW: target=_blank without rel=noopener (${link.target})`);
      }
    }

    // ── Link inventory (internal) ──
    const linkRows: (string | number | boolean | undefined)[][] = [
      ['source', 'anchor_text', 'target', 'link_type', 'http_status', 'redirect_hops', 'final_url', 'target_canonical', 'classification', 'recommended_action'],
    ];
    const linkTotals = { internal: 0, broken: 0, redirecting: 0, chains: 0, review: 0 };
    // Linked files (images, PDFs) aren't crawled as pages, but a dead one is still a broken link.
    const assetStatus = new Map<string, number>();
    for (const page of analyses.values()) {
      for (const link of page.links) {
        if (!link.internal || records.has(link.target) || assetStatus.has(link.target) || link.target.startsWith('/admin')) continue;
        assetStatus.set(link.target, (await fetchRaw(`${target}${link.target}`)).status);
      }
    }
    for (const [path, page] of analyses) {
      if (PROBES.some((p) => p.path === path) && !sitemapPaths.has(path)) continue; // probes are not real link sources
      for (const link of page.links.filter((l) => l.internal)) {
        const t = records.get(link.target);
        const trace = t?.redirect;
        const status = t?.status ?? assetStatus.get(link.target);
        if (!t && status !== undefined && status >= 400) records.get(path)?.issues.push(`CRITICAL: broken link to file ${link.target} (${status})`);
        const classification = status === undefined ? 'requires review' : status >= 400 ? 'broken' : status >= 300 ? 'redirecting' : 'pass';
        linkTotals.internal++;
        if (classification === 'broken') linkTotals.broken++;
        if (classification === 'redirecting') linkTotals.redirecting++;
        if ((trace?.hops ?? 0) > 1) linkTotals.chains++;
        if (classification === 'requires review') linkTotals.review++;
        linkRows.push([
          `${SITE_URL}${path}`,
          link.anchorText,
          link.target,
          link.type,
          status,
          trace?.hops ?? 0,
          trace ? `${SITE_URL}${toPath(trace.finalUrl)}` : `${SITE_URL}${link.target}`,
          t?.canonical,
          classification,
          classification === 'pass' ? '' : classification === 'redirecting' && trace ? `Link directly to ${toPath(trace.finalUrl)}` : classification === 'broken' ? 'Fix or remove link' : 'Not crawled (asset/admin) — check manually',
        ]);
      }
    }

    const redirectRows: (string | number | boolean | undefined)[][] = [['source', 'status', 'hops', 'chain', 'final_url', 'final_status', 'loop', 'probe_expectation']];
    for (const r of records.values()) {
      if (!r.redirect) continue;
      redirectRows.push([r.path, r.status, r.redirect.hops, r.redirect.chain.map((c) => `${toPath(c.url)} [${c.status}]`).join(' -> '), toPath(r.redirect.finalUrl), r.redirect.finalStatus, r.redirect.loop, r.probe]);
    }

    // ── Canonicalization matrix (production only — scheme/host variants can't be emulated locally) ──
    let matrixRows: (string | number | boolean | undefined)[][] | undefined;
    if (target === SITE_URL) {
      matrixRows = [['requested', 'hops', 'chain', 'final_url', 'final_status', 'loop', 'result']];
      const apex = SITE_URL.replace('://www.', '://');
      for (const route of CANONICALIZATION_ROUTES) {
        const expected = `${SITE_URL}${route}`;
        for (const origin of [SITE_URL, SITE_URL.replace('https:', 'http:'), apex, apex.replace('https:', 'http:')]) {
          for (const variant of route === '/' ? ['/'] : [route, `${route}/`]) {
            const t = await traceRedirects(`${origin}${variant}`);
            const ok = !t.loop && t.finalStatus === 200 && t.finalUrl === expected;
            matrixRows.push([`${origin}${variant}`, t.hops, t.chain.map((c) => `${c.url} [${c.status}]`).join(' -> '), t.finalUrl, t.finalStatus || t.error, t.loop, ok ? 'pass' : 'FAIL']);
            if (!ok) records.get(route)?.issues.push(`CRITICAL: ${origin}${variant} does not resolve to ${expected} (ends ${t.finalUrl} ${t.finalStatus || t.error})`);
          }
        }
      }
    }

    // ── External links (opt-in; informational, never fails --strict) ──
    let externalRows: (string | number | boolean | undefined)[][] | undefined;
    const externalTotals: Record<string, number> = {};
    if (checkExternalLinks) {
      const sources = new Map<string, { source: string; anchor: string; rel?: string; newTab: boolean }[]>();
      for (const [path, page] of analyses) {
        for (const link of page.links.filter((l) => !l.internal)) {
          sources.set(link.target, [...(sources.get(link.target) ?? []), { source: `${SITE_URL}${path}`, anchor: link.anchorText, rel: link.rel, newTab: link.newTab }]);
        }
        for (const url of page.schemaSameAs) {
          sources.set(url, [...(sources.get(url) ?? []), { source: `${SITE_URL}${path}`, anchor: '(JSON-LD sameAs)', newTab: false }]);
        }
      }
      externalRows = [['target', 'final_host', 'classification', 'final_status', 'hops', 'final_url', 'error', 'rel', 'new_tab', 'source_pages', 'anchor_text', 'recommended_action']];
      const urls = [...sources.keys()];
      const results = new Map<string, Awaited<ReturnType<typeof checkExternal>>>();
      // Two at a time: enough to finish quickly without hammering third-party servers.
      for (let i = 0; i < urls.length; i += 2) {
        const batch = urls.slice(i, i + 2);
        (await Promise.all(batch.map((u) => checkExternal(u)))).forEach((r, j) => results.set(batch[j] ?? '', r));
      }
      for (const u of urls) {
        const r = results.get(u);
        const refs = sources.get(u) ?? [];
        if (!r) continue;
        externalTotals[r.status] = (externalTotals[r.status] ?? 0) + 1;
        const action = {
          ok: '',
          redirected: 'Verify the new destination is the intended one; update the link if so',
          dead: 'Confirm manually, then replace with a verified URL or remove',
          blocked: 'Bot-blocked or login wall — verify manually in a browser',
          'rate-limited': 'Recheck later',
          'server-error': 'Recheck later; replace if it persists',
          'network-error': 'DNS/TLS/timeout — recheck; replace if the host is gone',
          inconclusive: 'Verify manually',
        }[r.status];
        externalRows.push([
          u,
          new URL(r.trace.finalUrl).host,
          r.status,
          r.trace.finalStatus,
          r.trace.hops,
          r.trace.finalUrl,
          r.trace.error,
          [...new Set(refs.map((x) => x.rel ?? ''))].join(' / '),
          refs.some((x) => x.newTab),
          [...new Set(refs.map((x) => x.source))].length,
          [...new Set(refs.map((x) => x.anchor))].join(' / '),
          action,
        ]);
      }
    }

    for (const [title, paths] of titleOwners) if (paths.length > 1) paths.forEach((p) => records.get(p)?.issues.push(`HIGH: duplicate title "${title}" (${paths.join(', ')})`));
    for (const [, paths] of descOwners) if (paths.length > 1) paths.forEach((p) => records.get(p)?.issues.push(`HIGH: duplicate description (${paths.join(', ')})`));

    const all = [...records.values()].sort((a, b) => a.path.localeCompare(b.path));
    const critical = all.flatMap((r) => r.issues.filter((i) => i.startsWith('CRITICAL')).map((i) => `${r.path}: ${i}`));
    const summary = {
      generatedAt: new Date().toISOString(),
      target,
      pagesCrawled: all.length,
      sitemapUrls: sitemapPaths.size,
      indexablePages: all.filter((r) => r.indexable).length,
      criticalIssues: critical.length,
      highIssues: all.reduce((n, r) => n + r.issues.filter((i) => i.startsWith('HIGH')).length, 0),
      probesFailed: all.filter((r) => r.issues.some((i) => i.includes('probe expected'))).length,
      internalLinksChecked: linkTotals.internal,
      internalLinksBroken: linkTotals.broken,
      internalLinksToRedirects: linkTotals.redirecting,
      internalLinkRedirectChains: linkTotals.chains,
      internalLinksNeedingReview: linkTotals.review,
      ...(matrixRows ? { canonicalizationVariants: matrixRows.length - 1, canonicalizationFailures: matrixRows.filter((r) => r[6] === 'FAIL').length } : {}),
      ...(externalRows ? { externalLinksChecked: externalRows.length - 1, ...Object.fromEntries(Object.entries(externalTotals).map(([k, v]) => [`external_${k}`, v])) } : {}),
    };

    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'internal-links.csv'), csv(linkRows), 'utf8');
    writeFileSync(join(outDir, 'redirects.csv'), csv(redirectRows), 'utf8');
    if (matrixRows) writeFileSync(join(outDir, 'canonicalization-matrix.csv'), csv(matrixRows), 'utf8');
    if (externalRows) writeFileSync(join(outDir, 'external-links.csv'), csv(externalRows), 'utf8');
    writeFileSync(join(outDir, 'SEO_AUDIT_REPORT.json'), `${JSON.stringify({ summary, pages: all }, null, 2)}\n`, 'utf8');
    writeFileSync(join(outDir, 'SEO_AUDIT_REPORT.md'), renderMarkdown(summary, all), 'utf8');

    console.log(`[seo-audit] ${summary.pagesCrawled} URLs crawled on ${target}; ${summary.indexablePages} indexable; ${summary.criticalIssues} critical, ${summary.highIssues} high issues.`);
    console.log(`[seo-audit] Reports written to ${outDir}`);
    if (critical.length) critical.forEach((c) => { console.error(`  - ${c}`); });
    if (strict && critical.length > 0) process.exitCode = 1;
  } finally {
    closeServer?.();
  }
}

function esc(value: unknown): string {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function renderMarkdown(summary: Record<string, unknown>, pages: PageRecord[]): string {
  const lines = [
    '# SEO Audit Report (automated)',
    '',
    `Generated by \`frontend/scripts/seo-audit.ts\` on ${esc(summary.generatedAt)} against \`${esc(summary.target)}\`.`,
    '',
    '| Metric | Value |',
    '|---|---|',
    ...Object.entries(summary).map(([k, v]) => `| ${k} | ${esc(v)} |`),
    '',
    '## Indexable pages',
    '',
    '| URL | Status | Title (len) | Desc len | H1 | Words | Canonical | Schema | In links | Imgs (no alt) | Sitemap |',
    '|---|---|---|---|---|---|---|---|---|---|---|',
    ...pages
      .filter((p) => p.indexable)
      .map((p) => `| ${esc(p.path)} | ${p.status} | ${esc(p.title)} (${p.titleLength ?? 0}) | ${p.descriptionLength ?? 0} | ${p.h1Count ?? 0}: ${esc(p.h1)} | ${p.wordCount ?? 0} | ${p.selfCanonical ? 'self' : esc(p.canonical)} (${p.canonicalStatus ?? '-'}) | ${esc((p.schema ?? []).join(', '))} | ${p.inboundLinks} | ${p.imageCount ?? 0} (${p.imagesMissingAlt ?? 0}) | ${p.inSitemap ? 'yes' : 'NO'} |`),
    '',
    '## Non-indexable / non-200 URLs (redirects, 404s, parameter variants, probes)',
    '',
    '| URL | Status | Redirect to | Hops -> final | Canonical | Robots / X-Robots-Tag | Probe expectation |',
    '|---|---|---|---|---|---|---|',
    ...pages
      .filter((p) => !p.indexable)
      .map((p) => `| ${esc(p.path)} | ${p.status} | ${esc(p.redirectTo)} | ${p.redirect ? `${p.redirect.hops} -> ${p.redirect.finalStatus}${p.redirect.loop ? ' LOOP' : ''}` : ''} | ${esc(p.canonical)} | ${esc(p.robots)} ${esc(p.xRobotsTag)} | ${esc(p.probe)} |`),
    '',
    '## Issues',
    '',
  ];
  const withIssues = pages.filter((p) => p.issues.length > 0);
  if (withIssues.length === 0) lines.push('No issues detected.');
  for (const p of withIssues) {
    lines.push(`- **${esc(p.path)}**`);
    [...new Set(p.issues)].forEach((i) => lines.push(`  - ${esc(i)}`));
  }
  lines.push('');
  return lines.join('\n');
}

void main();
