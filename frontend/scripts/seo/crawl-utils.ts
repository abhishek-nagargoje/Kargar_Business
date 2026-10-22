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

const AUDIT_UA = 'KARGAR-SEO-Audit/1.0 (+Googlebot-like check)';

/** Fetches without following redirects so 3xx responses are visible to the audit. */
export async function fetchRaw(url: string): Promise<FetchResult> {
  const res = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': AUDIT_UA } });
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

export interface RedirectTrace {
  /** Every URL requested, starting with the input. */
  chain: { url: string; status: number }[];
  hops: number;
  finalUrl: string;
  finalStatus: number;
  loop: boolean;
  /** Network-level failure (DNS, TLS, timeout) — finalStatus is 0. */
  error?: string;
}

/** Follows redirects one hop at a time (GET, not HEAD) so every hop, loops and over-long chains are visible. */
export async function traceRedirects(url: string, { maxHops = 10, timeoutMs = 15000, userAgent = AUDIT_UA } = {}): Promise<RedirectTrace> {
  const chain: { url: string; status: number }[] = [];
  const seen = new Set<string>();
  let current = url;
  for (let i = 0; i <= maxHops; i++) {
    if (seen.has(current)) return { chain, hops: chain.length - 1, finalUrl: current, finalStatus: chain.at(-1)?.status ?? 0, loop: true };
    seen.add(current);
    let res: Response;
    try {
      res = await fetch(current, { redirect: 'manual', signal: AbortSignal.timeout(timeoutMs), headers: { 'User-Agent': userAgent } });
    } catch (error) {
      const cause = (error as { cause?: { code?: string } }).cause?.code;
      return { chain, hops: Math.max(chain.length - 1, 0), finalUrl: current, finalStatus: 0, loop: false, error: cause ?? (error as Error).name };
    }
    await res.body?.cancel();
    chain.push({ url: current, status: res.status });
    const location = res.headers.get('location');
    if (res.status < 300 || res.status >= 400 || !location) {
      return { chain, hops: chain.length - 1, finalUrl: current, finalStatus: res.status, loop: false };
    }
    current = new URL(location, current).href;
  }
  return { chain, hops: chain.length - 1, finalUrl: current, finalStatus: chain.at(-1)?.status ?? 0, loop: false, error: 'too-many-redirects' };
}

/** True when a redirect only normalized the URL (scheme, www, trailing slash, query) rather than moving it. */
function sameDestination(a: string, b: string): boolean {
  const norm = (u: string) => {
    const p = new URL(u);
    return `${p.host.replace(/^www\./, '')}${p.pathname.replace(/\/+$/, '').toLowerCase()}`;
  };
  return norm(a) === norm(b);
}

export type ExternalStatus = 'ok' | 'redirected' | 'dead' | 'blocked' | 'rate-limited' | 'server-error' | 'network-error' | 'inconclusive';

/**
 * Classifies an external URL. A failed automated request is not proof a link is broken: 401/403/999
 * (bot walls, e.g. LinkedIn) are "blocked", 429 is "rate-limited", and network errors/5xx are retried
 * once before being reported. Only 404/410 count as "dead".
 */
export async function checkExternal(url: string): Promise<{ status: ExternalStatus; trace: RedirectTrace }> {
  const browserUa = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
  let trace = await traceRedirects(url, { userAgent: browserUa });
  if (trace.finalStatus === 0 || trace.finalStatus >= 500 || trace.finalStatus === 429) {
    await new Promise((r) => setTimeout(r, 2000));
    trace = await traceRedirects(url, { userAgent: browserUa });
  }
  const s = trace.finalStatus;
  const status: ExternalStatus = trace.loop
    ? 'dead'
    : s === 0
      ? 'network-error'
      : s === 404 || s === 410
        ? 'dead'
        : s === 401 || s === 403 || s === 999
          ? 'blocked'
          : s === 429
            ? 'rate-limited'
            : s >= 500
              ? 'server-error'
              : s >= 200 && s < 300
                ? sameDestination(trace.finalUrl, url)
                  ? 'ok'
                  : 'redirected'
                : 'inconclusive';
  return { status, trace };
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

/** One `<a href>` occurrence, for the link inventory CSVs. */
export interface LinkInfo {
  /** Internal: path + search. External: absolute href (hash stripped in both cases). */
  target: string;
  internal: boolean;
  /** Visible text, else aria-label/title, else the alt of a contained image. Empty = no accessible name. */
  anchorText: string;
  type: 'navigation' | 'footer' | 'breadcrumb' | 'image' | 'cta' | 'content';
  rel?: string;
  newTab: boolean;
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
  /** Profile URLs from JSON-LD `sameAs` — not <a> links, but Google reads them, so they're link-checked too. */
  schemaSameAs: string[];
  internalLinks: string[];
  externalLinks: string[];
  links: LinkInfo[];
  imageCount: number;
  imagesMissingAlt: number;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
}

function collectTypes(node: unknown, out: string[], sameAs: string[]): void {
  if (Array.isArray(node)) {
    node.forEach((n) => { collectTypes(n, out, sameAs); });
    return;
  }
  if (node && typeof node === 'object') {
    const record = node as Record<string, unknown>;
    const type = record['@type'];
    if (typeof type === 'string') out.push(type);
    if (Array.isArray(type)) type.forEach((t) => { if (typeof t === 'string') out.push(t); });
    const links = record.sameAs;
    if (typeof links === 'string') sameAs.push(links);
    if (Array.isArray(links)) links.forEach((l) => { if (typeof l === 'string') sameAs.push(l); });
    if (record['@graph']) collectTypes(record['@graph'], out, sameAs);
  }
}

export function analyzeHtml(html: string, pageUrl: string): PageAnalysis {
  const head = /<head[\s\S]*?<\/head>/i.exec(html)?.[0] ?? html;
  const bodyNoScript = html.replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, ' ');
  const main = /<main\b[\s\S]*?<\/main>/i.exec(bodyNoScript)?.[0] ?? bodyNoScript;
  const text = decode(main.replace(/<[^>]+>/g, ' '));

  const schemaTypes: string[] = [];
  const schemaErrors: string[] = [];
  const schemaSameAs: string[] = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collectTypes(JSON.parse(m[1] ?? ''), schemaTypes, schemaSameAs);
    } catch (error) {
      schemaErrors.push(`Invalid JSON-LD: ${(error as Error).message}`);
    }
  }

  const page = new URL(pageUrl);
  const internalLinks = new Set<string>();
  const externalLinks = new Set<string>();
  const links: LinkInfo[] = [];
  // Character ranges of landmark regions, used to classify each link by where it sits.
  const regions = (re: RegExp) => [...bodyNoScript.matchAll(re)].map((m) => [m.index, m.index + m[0].length] as const);
  const navRanges = regions(/<(nav|header)\b[\s\S]*?<\/\1>/gi);
  const footerRanges = regions(/<footer\b[\s\S]*?<\/footer>/gi);
  const crumbRanges = regions(/<(nav|ol)\b[^>]*aria-label="breadcrumb"[^>]*>[\s\S]*?<\/\1>/gi);
  const within = (ranges: (readonly [number, number])[], index: number) => ranges.some(([s, e]) => index >= s && index < e);
  for (const m of bodyNoScript.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const tag = `<a ${m[1] ?? ''}>`;
    const inner = m[2] ?? '';
    const href = attr(tag, 'href');
    if (!href || href.startsWith('#') || /^(mailto|tel|javascript):/i.test(href)) continue;
    let resolved: URL;
    try {
      resolved = new URL(href, pageUrl);
    } catch {
      continue;
    }
    const isInternal = resolved.origin === page.origin || resolved.origin === SITE_URL;
    resolved.hash = '';
    const target = isInternal ? resolved.pathname + resolved.search : resolved.href;
    if (isInternal) internalLinks.add(target);
    else externalLinks.add(target);

    const text = decode(inner.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    const imgAlt = /<img\b[^>]*>/i.exec(inner)?.[0];
    const anchorText = text || attr(tag, 'aria-label') || attr(tag, 'title') || (imgAlt ? (attr(imgAlt, 'alt') ?? '') : '');
    const cls = attr(tag, 'class') ?? '';
    const index = m.index;
    const type: LinkInfo['type'] = within(crumbRanges, index)
      ? 'breadcrumb'
      : within(footerRanges, index)
        ? 'footer'
        : within(navRanges, index)
          ? 'navigation'
          : imgAlt && !text
            ? 'image'
            : /\b(btn|button|rounded-full|cta)\b/i.test(cls)
              ? 'cta'
              : 'content';
    links.push({ target, internal: isInternal, anchorText, type, rel: attr(tag, 'rel'), newTab: attr(tag, 'target') === '_blank' });
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
    schemaSameAs: [...new Set(schemaSameAs)],
    internalLinks: [...internalLinks],
    externalLinks: [...externalLinks],
    links,
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
