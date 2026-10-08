import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { buildRouteInventory, type RoutePage } from './route-inventory';
import { SITE_URL } from './seo.config';
import { clusters, punePagesByPath } from '../../src/features/pune-landing/config/punePages';
import { guidePagesByPath } from '../../src/features/resources/config/guides';

// Pillar landing pages are the primary commercial targets; homepage is set to 1.0 separately.
const PILLAR_PATHS = new Set(clusters.map((cluster) => cluster.pillarPath));

const FRONTEND_DIR = fileURLToPath(new URL('../..', import.meta.url));
const lastCommitCache = new Map<string, string | undefined>();

/** Date (YYYY-MM-DD) of the last commit touching `relPath`, or undefined if git can't say (e.g. shallow clone). */
function lastCommitDate(relPath: string): string | undefined {
  if (!lastCommitCache.has(relPath)) {
    let date: string | undefined;
    try {
      date = execFileSync('git', ['log', '-1', '--format=%cs', '--', relPath], { cwd: FRONTEND_DIR, encoding: 'utf8' }).trim() || undefined;
    } catch {
      date = undefined;
    }
    lastCommitCache.set(relPath, date);
  }
  return lastCommitCache.get(relPath);
}

const LANDING_SOURCE_BY_CLUSTER: Record<string, string> = {
  housekeeping: 'src/features/pune-landing/config/pages/housekeeping.ts',
  'facility-management': 'src/features/pune-landing/config/pages/facilityManagement.ts',
  maintenance: 'src/features/pune-landing/config/pages/maintenance.ts',
  security: 'src/features/pune-landing/config/pages/security.ts',
};

/**
 * `lastmod` must reflect real content changes — stamping every URL with the build date on every
 * deploy teaches Google to ignore the field. Guides carry an explicit dateModified; other pages use
 * the last commit to the file that defines their content, and omit lastmod when that is unknown.
 * Uncommitted local edits are not reflected until committed.
 */
function lastModified(page: RoutePage): string | undefined {
  if (page.type === 'guide') return guidePagesByPath[page.path]?.dateModified;
  if (page.type === 'landing') {
    const cluster = punePagesByPath[page.path]?.cluster;
    return cluster ? lastCommitDate(LANDING_SOURCE_BY_CLUSTER[cluster] ?? '') : undefined;
  }
  if (page.type === 'category' || page.type === 'service') return lastCommitDate('src/features/services/config');
  if (page.path === '/privacy-policy') return lastCommitDate('src/pages/PrivacyPolicyPage.tsx');
  if (page.path === '/resources') return lastCommitDate('src/features/resources');
  return lastCommitDate('src/pages/KargarSinglePage.tsx');
}

const PRIORITY_BY_TYPE: Record<string, string> = {
  static: '0.8',
  category: '0.7',
  service: '0.7',
  landing: '0.8',
  guide: '0.6',
};

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemap(): string {
  const pages = buildRouteInventory().filter((page) => !page.noindex);

  const urls = pages
    .map((page) => {
      const priority = page.path === '/' ? '1.0' : PILLAR_PATHS.has(page.path) ? '0.9' : (PRIORITY_BY_TYPE[page.type] ?? '0.5');
      const imageBlock = page.image
        ? `\n    <image:image>\n      <image:loc>${xmlEscape(`${SITE_URL}${page.image.src}`)}</image:loc>\n      <image:title>${xmlEscape(page.image.alt)}</image:title>\n    </image:image>`
        : '';
      const lastmod = lastModified(page);
      const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
      return `  <url>\n    <loc>${xmlEscape(page.canonical)}</loc>${lastmodTag}\n    <changefreq>${page.path === '/' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${priority}</priority>${imageBlock}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
}

function main() {
  const outPath = fileURLToPath(new URL('../../public/sitemap.xml', import.meta.url));
  const xml = generateSitemap();
  writeFileSync(outPath, xml, 'utf8');
  const urlCount = (xml.match(/<url>/g) ?? []).length;
  console.log(`[seo] sitemap.xml generated -> ${outPath} (${urlCount} URLs)`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
