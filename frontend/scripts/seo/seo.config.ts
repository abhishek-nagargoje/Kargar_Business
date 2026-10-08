/**
 * Single source of truth for the Node-side SEO build pipeline.
 *
 * Scripts in this directory run under plain `tsx`, not Vite, so they cannot import
 * `@/config` (it reads `import.meta.env`, which only Vite populates) or anything that
 * transitively imports it (`@/lib/seo/*`, `@/components/seo/SEO`). SITE_URL below is
 * therefore a standalone constant — keep it in sync with the `siteUrl` default in
 * `frontend/src/config/index.ts` whenever the canonical domain changes.
 */

export const SITE_URL = 'https://www.kargarbusinessservices.com';

/**
 * Static routes that render pages and are covered by `src/features/seo/registry.ts`.
 * Pune landing pages and /resources guides are NOT listed here — route-inventory.ts reads them
 * straight from their content configs, so a new page is wired by adding its content entry.
 */
export const STATIC_ROUTES = [
  '/',
  '/services',
  '/sectors',
  '/company-profile',
  '/support',
  '/contact-us',
  '/privacy-policy',
  '/resources',
];

/** Route prefixes that must never appear in the sitemap and must be disallowed in robots.txt. */
export const DISALLOWED_PREFIXES = ['/admin'];

export interface RedirectRule {
  from: string;
  to: string;
  permanent: boolean;
}

/** Single source of truth for redirects — generated into vercel.json's `redirects` array. */
export const REDIRECTS: RedirectRule[] = [
  { from: '/contact', to: '/contact-us', permanent: true },
  { from: '/about', to: '/company-profile', permanent: true },
  { from: '/about-us', to: '/company-profile', permanent: true },
  { from: '/category/services', to: '/services', permanent: true },
  { from: '/amp', to: '/', permanent: true },
];

/**
 * Image entries for the sitemap's `<image:image>` block. The site's hero photographs are generic
 * illustrations (not KARGAR sites or staff), so titles describe only what is literally in the
 * frame — never a location, client or KARGAR team. Pune landing pages and guides use the same
 * illustrative photos as decorative backdrops and are deliberately not given image entries.
 */
export const PAGE_IMAGES: Record<string, { src: string; alt: string }> = {
  '/': { src: '/images/page/hero-building.webp', alt: 'Modern glass office building at dusk' },
  '/services': { src: '/images/page/services-hero.webp', alt: 'Bright office lobby with a cleaner operating a floor machine' },
  '/services/hard-services': {
    src: '/images/services/hard-services.webp',
    alt: 'Technicians in safety gear inspecting an electrical panel and plant-room equipment',
  },
  '/services/soft-services': {
    src: '/images/services/soft-services.webp',
    alt: 'Cleaning staff wiping desks and mopping the floor of an open-plan office',
  },
  '/services/hard-services/electrical-maintenance': {
    src: '/images/services/hard-services.webp',
    alt: 'Technicians in safety gear inspecting an electrical panel and plant-room equipment',
  },
  '/services/hard-services/hvac-maintenance': {
    src: '/images/services/hard-services.webp',
    alt: 'Technicians in safety gear inspecting an electrical panel and plant-room equipment',
  },
  '/services/soft-services/housekeeping': {
    src: '/images/services/housekeeping-services.webp',
    alt: 'Cleaning staff operating floor scrubbers in a marble-floored office lobby',
  },
  '/services/soft-services/security-services': {
    src: '/images/services/security-services.webp',
    alt: 'Uniformed security officer standing at the glass entrance of an office building',
  },
};

export function buildCanonicalUrl(path: string): string {
  const normalizedPath = path === '/' ? '' : path.replace(/\/+$/, '');
  return `${SITE_URL}${normalizedPath || '/'}`;
}

/**
 * Maps a route path to the static HTML file the prerenderer writes it to under `dist/`.
 * '/' -> 'index.html' (the build's own entry file); every other route -> '<path>.html'
 * so Vercel rewrites can serve real prerendered markup instead of the SPA shell.
 * Shared by `prerender.ts` (writes the files) and `generate-redirects.ts` (points rewrites at them).
 */
export function routeToStaticFile(path: string): string {
  if (path === '/') return 'index.html';
  return `${path.replace(/^\/+/, '').replace(/\/+$/, '')}.html`;
}
