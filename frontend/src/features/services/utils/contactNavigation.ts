import type { ContactNavigationOptions } from '../domain/navigation.types';

/**
 * The `href` every contact CTA renders. Deliberately parameter-free: Googlebot follows hrefs, so
 * putting `?source=…&cta_position=…` here made every CTA expose a new duplicate URL
 * ("Alternate page with proper canonical tag" in Search Console). Attribution is preserved by
 * `navigateToContact`, which navigates to `buildContactUrl(options)` on click.
 */
export const CONTACT_LINK_HREF = '/contact-us#contact-form';

/**
 * Layer 1: Pure URL Builder for Contact Navigation
 * No React hooks here. Only pure functions.
 */
export function buildContactUrl(options?: ContactNavigationOptions): string {
  const params = new URLSearchParams();

  if (options?.category) params.set('category', options.category);
  if (options?.service) params.set('service', options.service);
  if (options?.source) params.set('source', options.source);
  if (options?.campaign) params.set('campaign', options.campaign);
  if (options?.ctaPosition) params.set('cta_position', options.ctaPosition);

  const queryString = params.toString();
  return `/contact-us${queryString ? `?${queryString}` : ''}#contact-form`;
}
