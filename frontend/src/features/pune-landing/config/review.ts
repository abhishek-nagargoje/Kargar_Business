import type { PageReview } from '../domain/types';

/**
 * Editorial review records. Owners are roles, never personal names. Update `lastReviewed` only
 * when someone has actually re-checked the page's facts against the source documents
 * (seo-audit/SEO_CONTENT_PLAN.md §0) — scripts/seo/validate-governance.ts warns when a published
 * page has not been reviewed for more than 180 days.
 */
const OWNER = 'Operations head (service facts) with marketing (search and copy)';

/** Claims audit of every landing page (commit 2c83a3b). */
export const REVIEWED_2026_11_17: PageReview = { status: 'published', owner: OWNER, lastReviewed: '2026-11-17' };

/** Priority-page rewrite and enquiry-routing review. */
export const REVIEWED_2026_11_24: PageReview = { status: 'published', owner: OWNER, lastReviewed: '2026-11-24' };
