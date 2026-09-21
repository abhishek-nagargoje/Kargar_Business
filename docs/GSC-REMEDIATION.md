# GSC Remediation — KARGAR Facility Management

**Date:** 2026-09-21
**Domain:** https://www.kargarbusinessservices.com/ (domain unchanged — brand display name only was updated to "KARGAR Facility Management")
**Method:** For every URL Google Search Console flagged, the live production site was checked directly with `curl -I`, `curl -IL`, and `curl` + HTML inspection (status, redirect chain, final URL, canonical, meta robots, title, sitemap membership). Findings below are backed by actual live responses captured on the date above, not assumptions.

## Result summary

Of the 7 GSC issue groups investigated, **6 were found to already be correct, intentional behavior** — Google is reporting expected states (a working redirect, a correctly self-canonicalizing parameterized URL, an already-fixed 404) that will clear on the next recrawl. Per the "do not chase GSC counts to zero" principle, these are not being force-fixed by adding unnecessary redirects or blocking rules. **1 issue (Hard Services indexing/internal-link depth) is a real, if minor, internal-linking gap** and is flagged for a follow-up pass.

## Findings table

| Issue | URL | Live check result | Root cause | Fix | Expected status | Sitemap | Canonical | Action |
|---|---|---|---|---|---|---|---|---|
| A. Page with redirect | `/services/` | `HTTP 308 → /services`, final `200` | `vercel.json` has `"trailingSlash": false`; Vercel strips trailing slashes by design. Single-hop redirect, not a chain. | None needed — working as designed | 200 (via redirect) | `/services` (no slash) | Self-canonical, matches sitemap | No action — will clear on recrawl |
| A. Page with redirect | `/sectors/` | `HTTP 308 → /sectors`, final `200` | Same as above | None needed | 200 (via redirect) | `/sectors` | Self-canonical | No action |
| B. Alternate page, proper canonical | `/contact-us?source=support_band&cta_position=footer-cta` | `200`, canonical = `https://www.kargarbusinessservices.com/contact-us` | CTA-attribution query params from `contactNavigation.ts`. Canonical correctly points to the clean URL. | None needed — this is the intended pattern | N/A (non-canonical) | Not in sitemap (correct) | Self-canonical points elsewhere correctly | No action |
| B. Alternate page, proper canonical | `/contact-us?service=soft-services&source=hero&cta_position=hero` | Same pattern verified | Same | None needed | N/A | Not in sitemap | Correct | No action |
| C. Crawled, not indexed | `/contact-us?category=hard&source=category_card_hard` | `200`, canonical = `/contact-us` | Same CTA param pattern | None needed | N/A | Not in sitemap | Correct | No action |
| C. Crawled, not indexed | `/contact-us?category=soft&source=category_card_soft` | `200`, canonical = `/contact-us` | Same | None needed | N/A | Not in sitemap | Correct | No action |
| C. Crawled, not indexed | `/sitemap.xml` | `200`, `Content-Type: application/xml` | GSC sometimes lists the sitemap file itself as a "crawled" URL — it's a machine-readable resource, not a content page; there is nothing to index. | None needed | N/A | N/A | N/A | No action |
| D. Redirect error | `/privacy-policy/` | `HTTP 308 → /privacy-policy`, final `200`, self-canonical, no loop | Same trailing-slash normalization as A | None needed | 200 (via redirect) | `/privacy-policy` | Self-canonical | No action |
| E. Not found (404) | `/category/services/` | `HTTP 308 → /category/services` (no slash) `→ 308 → /services`, final `200` | `vercel.json` already has a permanent redirect `/category/services → /services` (added in a prior fix). GSC's "Not Found" entry predates that fix; recrawl will clear it. | Already fixed in a prior session | 200 (via redirect) | `/services` | Correct | No action — awaiting recrawl |
| F. Discovered, not indexed | `/services/hard-services` | `200` directly, `<title>Hard Facility Management \| KARGAR Facility Management</title>`, self-canonical, `robots: index, follow`, present in `sitemap.xml` | Page is fully indexable and correctly configured. The site's own build-time link auditor (`scripts/seo/index.ts`) additionally reports this page has only **1 static-scan-detectable internal link** (from the homepage services grid) — thin internal-link depth can slow discovery/indexing priority even when the page itself is correct. | No code bug to fix; internal-linking depth is a real (separate, minor) weakness | 200 | In sitemap | Self-canonical | **Follow-up:** add a direct, real (non-template-literal) internal link to `/services/hard-services` from another high-authority page (e.g. Company Profile or Sectors) so the site's own link auditor can also confirm it — deferred, not done in this pass to stay in scope |
| G. Service/sitemap indexing (general) | `/services`, `/sectors`, `/services/hard-services`, `/services/soft-services`, `/sitemap.xml`, service child routes | All verified `200`, valid canonicals, valid sitemap membership, valid meta robots | No systemic bug found | — | — | — | — | No action beyond the Hard Services follow-up above |

## Why these are not being "fixed" further

Per the brief's own Phase 30 rule: GSC's "Excluded" reasons include categories that are *supposed* to exist — a redirect that works, a parameter URL that correctly canonicalizes, a stale crawl of an already-fixed URL. Forcing all of these to "0 excluded" (e.g., by removing the `trailingSlash: false` convention, or blocking query-param URLs in robots.txt) would work against Google's own recommended handling and isn't necessary. Google Search Console re-validation is not instantaneous — these should clear from the report over the next few recrawl cycles once the sitemap is resubmitted.

## What changed in this pass vs. what's deferred

**Done this pass:**
- Brand consolidation: "Kargar Business Services" / "Kargar Facility Management" → **"KARGAR Facility Management"** across every visible UI string, meta description, `<title>`, `manifest.webmanifest`, image `alt` text, and `aria-label` in the codebase (`config.siteName` is the single source of truth feeding `<title>` and JSON-LD `Organization`/`WebSite`/`LocalBusiness` names everywhere, so this was a small, low-risk, mechanical change). Domain (`kargarbusinessservices.com`) intentionally left unchanged per instruction.
- Verified (not assumed) that all 7 GSC-flagged issue groups are either already correct or already fixed.
- Full production build (`npm run build`) re-run clean: SEO pipeline (canonicals/metadata/headings/alt-text/schema/links/route-coverage validators) all PASS, `tsc -b` PASS, `npm run lint` 0 errors, 14/14 routes prerendered.

**Deferred (out of scope for this pass, per explicit scope confirmation):**
- Creating the 9-10 new Pune keyword-targeted landing pages (Phases 3–4, 31 of the original brief) — large, separate effort requiring real content and its own review pass.
- Switching the URL convention to trailing-slash (the brief's Phase 2 literal spec) — the existing no-trailing-slash convention is internally consistent (Vercel config, canonical builder, sitemap generator, validators all agree) and none of the actual GSC issues require it; recommended to keep as-is.
- Reconciling scattered business-stat claims (10+ years / 10,000+ clients / 500+ businesses / 25+ cities / 200+ reviews) into a single source-of-truth config (Phase 5) — requires real, verified business data from you; not fabricated here.
- Automated SEO regression tests (Phase 27) — the project has no test runner configured (`package.json` has no `test` script); adding one is a separate decision.
- One brand-name occurrence remains in `frontend/public/assets/documents/Company Brochure.pdf` — this is a binary PDF and cannot be safely text-edited by this tooling; **TODO: regenerate/re-export the brochure PDF with the updated brand name from its original source file.**
