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
 * Writes SEO_AUDIT_REPORT.json and SEO_AUDIT_REPORT.md.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyzeHtml, fetchRaw, parseSitemap, toAuditUrl, type PageAnalysis } from './seo/crawl-utils';
import { SITE_URL } from './seo/seo.config';
import { startDistServer } from './seo/serve-dist';

const MAX_PAGES = 400;

/** URLs that reproduce the Search Console findings — expected behaviour documented in GSC_ISSUES_AND_FIXES.md. */
const PROBES: { path: string; expect: string }[] = [
  { path: '/services/', expect: '308 -> /services' },
  { path: '/sectors/', expect: '308 -> /sectors' },
  { path: '/category/services', expect: '308 -> /services' },
  { path: '/contact', expect: '308 -> /contact-us' },
  { path: '/contact-us?source=homepage&cta_position=hero', expect: '200, canonical /contact-us' },
  { path: '/services/does-not-exist', expect: '404 (was soft-404 200)' },
  { path: '/services/hard-services/does-not-exist', expect: '404 (was soft-404 200)' },
  { path: '/this-page-does-not-exist', expect: '404' },
  { path: '/HOUSEKEEPING-SERVICES-PUNE', expect: '404 (no case-variant duplicate)' },
];

interface PageRecord {
  url: string;
  path: string;
  status: number;
  redirectTo?: string;
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
        probe: probe?.expect,
        inboundLinks: 0,
        issues: [],
      };
      records.set(path, record);

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
    };

    mkdirSync(outDir, { recursive: true });
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
    '| URL | Status | Redirect to | Canonical | Robots / X-Robots-Tag | Probe expectation |',
    '|---|---|---|---|---|---|',
    ...pages
      .filter((p) => !p.indexable)
      .map((p) => `| ${esc(p.path)} | ${p.status} | ${esc(p.redirectTo)} | ${esc(p.canonical)} | ${esc(p.robots)} ${esc(p.xRobotsTag)} | ${esc(p.probe)} |`),
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
