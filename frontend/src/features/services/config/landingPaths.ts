/**
 * Service-detail pages consolidated into their Pune landing pages (2026-11-24).
 *
 * KARGAR serves Pune and PCMC only, so `/services/{category}/{service}` and the Pune page for
 * the same service answered the same buyer with the same intent. The generic pages were thinner,
 * not local, and carried equipment claims the company documents do not support. Each retired URL
 * now 301-redirects to its Pune page (scripts/seo/seo.config.ts derives the rules from this map),
 * every card links straight to the Pune page, and ServicePage redirects client-side.
 *
 * The service records themselves stay in hard-services.ts / soft-services.ts: they still feed
 * the service cards, category hubs and media-library tagging (catalogSlug).
 */
export const SERVICE_LANDING_PATHS: Record<string, string> = {
  'electrical-maintenance': '/electrical-maintenance-services-pune',
  'hvac-maintenance': '/hvac-maintenance-services-pune',
  housekeeping: '/housekeeping-services-pune',
  'security-services': '/security-services-pune',
};

/** Public URL for a service card or link: its Pune landing page when consolidated, else the detail page. */
export function serviceHref(categorySlug: string, serviceSlug: string): string {
  return SERVICE_LANDING_PATHS[serviceSlug] ?? `/services/${categorySlug}/${serviceSlug}`;
}

/** Reverse lookup used for media tagging: Pune landing path → service slug. */
export function serviceSlugForLandingPath(path: string): string | undefined {
  return Object.entries(SERVICE_LANDING_PATHS).find(([, landing]) => landing === path)?.[0];
}
