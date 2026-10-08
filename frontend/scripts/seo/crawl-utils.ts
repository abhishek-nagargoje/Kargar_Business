/**
 * Shared fetch + HTML analysis for scripts/seo-audit.ts and scripts/validate-sitemap.ts.
 * Dependency-free (regex parsing of our own prerendered markup), so it runs in Vercel's build.
 */
import { SITE_URL } from './seo.config';

export interface FetchResult {
  url: string;
  status: number;
  location?: string;
  contentType?: string;
  xRobotsTag?: string;
  body: string;
}

/** Fetches without following redirects so 3xx responses are visible to the audit. */
export async function fetchRaw(url: string): Promise<FetchResult> {
  const res = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'KARGAR-SEO-Audit/1.0 (+Googlebot-like check)' } });
  const body = res.status >= 300 && res.status < 400 ? '' : await res.text();
  return {
    url,
    status: res.status,
    location: res.headers.get('location') ?? undefined,
    contentType: res.headers.get('content-type') ?? undefined,
    xRobotsTag: res.headers.get('x-robots-tag') ?? undefined,
    body,
  };
}

/**
 * When auditing a local build, canonical/sitemap URLs still point at production. These helpers
 * translate between the production origin and the origin actually being audited.
 */
export function toAuditUrl(productionUrl: string, baseUrl: string): string {
  return productionUrl.startsWith(SITE_URL) ? `${baseUrl}${productionUrl.slice(SITE_URL.length) || '/'}` : productionUrl;
}
export function toProductionPath(url: string, baseUrl: string): string {
  const u = new URL(url, baseUrl);
  return u.pathname + u.search;
}

function decode(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function attr(tag: string, name: string): string | undefined {
  const m = new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, 'i').exec(tag) ?? new RegExp(`\\b${name}\\s*=\\s*'([^']*)'`, 'i').exec(tag);
  return m ? decode(m[1] ?? '') : undefined;
}

function metaContent(html: string, key: 'name' | 'property', value: string): string[] {
  return [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => attr(tag, key)?.toLowerCase() === value)
    .map((tag) => attr(tag, 'content') ?? '');
}

export interface PageAnalysis {
  titles: string[];
  descriptions: string[];
  canonicals: string[];
  robotsMeta: string[];
  h1s: string[];
  wordCount: number;
  schemaTypes: string[];
  schemaErrors: string[];
  internalLinks: string[];
  externalLinks: string[];
  imageCount: number;
  imagesMissingAlt: number;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
}

function collectTypes(node: unknown, out: string[]): void {
  if (Array.isArray(node)) {
    node.forEach((n) => { collectTypes(n, out); });
    return;
  }
  if (node && typeof node === 'object') {
    const record = node as Record<string, unknown>;
    const type = record['@type'];
    if (typeof type === 'string') out.push(type);
    if (Array.isArray(type)) type.forEach((t) => { if (typeof t === 'string') out.push(t); });
    if (record['@graph']) collectTypes(record['@graph'], out);
  }
}

export function analyzeHtml(html: string, pageUrl: string): PageAnalysis {
  const head = /<head[\s\S]*?<\/head>/i.exec(html)?.[0] ?? html;
  const bodyNoScript = html.replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, ' ');
  const main = /<main\b[\s\S]*?<\/main>/i.exec(bodyNoScript)?.[0] ?? bodyNoScript;
  const text = decode(main.replace(/<[^>]+>/g, ' '));

  const schemaTypes: string[] = [];
  const schemaErrors: string[] = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectTypes(JSON.parse(m[1] ?? ''), schemaTypes);
    } catch (error) {
      schemaErrors.push(`Invalid JSON-LD: ${(error as Error).message}`);
    }
  }

  const page = new URL(pageUrl);
  const internalLinks = new Set<string>();
  const externalLinks = new Set<string>();
  for (const m of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attr(m[0], 'href');
    if (!href || href.startsWith('#') || /^(mailto|tel|javascript):/i.test(href)) continue;
    let resolved: URL;
    try {
      resolved = new URL(href, pageUrl);
    } catch {
      continue;
    }
    const isInternal = resolved.origin === page.origin || resolved.origin === SITE_URL;
    resolved.hash = '';
    if (isInternal) internalLinks.add(resolved.pathname + resolved.search);
    else externalLinks.add(resolved.href);
  }

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);

  return {
    titles: [...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => decode((m[1] ?? '').trim())),
    descriptions: metaContent(head, 'name', 'description'),
    canonicals: [...head.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).filter((t) => attr(t, 'rel') === 'canonical').map((t) => attr(t, 'href') ?? ''),
    robotsMeta: metaContent(head, 'name', 'robots'),
    h1s: [...bodyNoScript.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => decode((m[1] ?? '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()),
    wordCount: text.split(/\s+/).filter(Boolean).length,
    schemaTypes,
    schemaErrors,
    internalLinks: [...internalLinks],
    externalLinks: [...externalLinks],
    imageCount: imgs.length,
    // alt="" is valid for decorative images; only a missing attribute is an error.
    imagesMissingAlt: imgs.filter((tag) => !/\balt\s*=/.test(tag)).length,
    ogTitle: metaContent(head, 'property', 'og:title')[0],
    ogDescription: metaContent(head, 'property', 'og:description')[0],
    ogImage: metaContent(head, 'property', 'og:image')[0],
    twitterCard: metaContent(head, 'name', 'twitter:card')[0],
  };
}

export function parseSitemap(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode((m[1] ?? '').trim())).filter((loc) => !loc.match(/\.(webp|png|jpe?g)$/i));
}
