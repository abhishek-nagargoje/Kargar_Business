import { allAuthoredPunePages, punePageList } from '../../src/features/pune-landing/config/punePages';
import { enquiryServicesById } from '../../src/features/enquiry/enquiryServices';
import { REDIRECTS } from './seo.config';

const MAX_REVIEW_AGE_DAYS = 180;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Editorial governance for the Pune service pages:
 *  - every page names an owner role and a real last-reviewed date (not in the future);
 *  - only `published` pages are public (punePageList), so drafts cannot leak into routes/sitemap;
 *  - a published page never targets a URL that is also a redirect source;
 *  - every page routes enquiries to a known service/team.
 * Returns { errors, warnings }; warnings (stale reviews) do not fail the build.
 */
export function validateGovernance(today: Date = new Date()): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const redirectSources = new Set(REDIRECTS.map((r) => r.from));

  for (const page of allAuthoredPunePages) {
    const { review } = page;
    if (!review.owner.trim()) errors.push(`${page.path}: review.owner is empty`);
    if (!ISO_DATE.test(review.lastReviewed) || Number.isNaN(Date.parse(review.lastReviewed))) {
      errors.push(`${page.path}: review.lastReviewed "${review.lastReviewed}" is not an ISO date`);
      continue;
    }
    const reviewed = new Date(`${review.lastReviewed}T00:00:00Z`);
    if (reviewed.getTime() > today.getTime() + 86_400_000) {
      errors.push(`${page.path}: review.lastReviewed ${review.lastReviewed} is in the future`);
    }
    const ageDays = Math.floor((today.getTime() - reviewed.getTime()) / 86_400_000);
    if (review.status === 'published' && ageDays > MAX_REVIEW_AGE_DAYS) {
      warnings.push(`${page.path}: facts last reviewed ${ageDays} days ago (${review.lastReviewed})`);
    }
    if (!(page.enquiryService in enquiryServicesById)) {
      errors.push(`${page.path}: enquiryService "${page.enquiryService}" is not in the enquiry taxonomy`);
    }
    if (redirectSources.has(page.path)) {
      errors.push(`${page.path}: is a redirect source but is also authored as a page`);
    }
  }

  const drafts = allAuthoredPunePages.filter((p) => p.review.status !== 'published');
  for (const draft of drafts) {
    if (punePageList.some((p) => p.path === draft.path)) {
      errors.push(`${draft.path}: draft page is present in the public page list`);
    }
  }

  return { errors, warnings };
}
