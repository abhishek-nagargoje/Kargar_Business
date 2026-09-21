# Internal Linking Audit — KARGAR Facility Management

**Date:** 2026-09-21
**Method:** Every indexable route was built and prerendered to real static HTML (`npm run build`, 14/14 routes), then every `href="..."` occurrence for each target route was counted across **all 13 indexable prerendered pages** (`grep -rho 'href="<route>"' dist --include=*.html`). This is the ground-truth rendered link graph a crawler actually sees — not a source-code guess. Pages: `/`, `/services`, `/sectors`, `/company-profile`, `/support`, `/contact-us`, `/privacy-policy`, `/services/hard-services`, `/services/soft-services`, and the 4 leaf service pages under them. No new pages were created in this pass (Pune landing pages are explicitly out of scope for this pass — see `GSC-REMEDIATION.md`).

## Site hierarchy (actual, current)

```
Home
├── /services  (hub — real page, links to both category hubs)
│   ├── /services/hard-services
│   │   ├── /services/hard-services/electrical-maintenance
│   │   └── /services/hard-services/hvac-maintenance
│   └── /services/soft-services
│       ├── /services/soft-services/housekeeping
│       └── /services/soft-services/security-services
├── /sectors  (contextual links into service pages — no dedicated sector sub-pages exist)
├── /company-profile
├── /support
├── /contact-us
└── /privacy-policy
```
Max click depth for any indexable page: **2 clicks from Home** (Home → category hub → leaf service, or Home → leaf service directly via the homepage services grid). Well within the ≤3-click target.

## Before → After: real incoming-link counts (ground truth from prerendered HTML)

| Route | Before | After | Distinct source pages (after) | Status |
|---|---|---|---|---|
| `/` | — | 37 occurrences | 13 | Hub, fully linked (logo/breadcrumb "Home" on every page) |
| `/services` | 24 (unchanged) | 24 | 14 | Hub, fully linked |
| `/sectors` | 14 (unchanged) | 14 | 13 | Fully linked |
| `/company-profile` | 13 (unchanged) | 13 | 13 | Fully linked (nav, present on every page) |
| `/support` | 13 (unchanged) | 13 | 13 | Fully linked (nav) |
| `/contact-us` | 13 (unchanged) | 13 | 13 | Fully linked (nav) — **main nav link is now the clean canonical URL** (see Rule 18 fix below) |
| `/privacy-policy` | **0** ❌ orphan | **13** ✅ | 13 | **Fixed — was linked from nowhere on the site, only reachable via direct URL/sitemap. Added a real text link in the site footer (present on every page).** |
| `/services/hard-services` | ~4 (homepage card + breadcrumbs + 1 static link) | 10 | 6 | Improved — gained a direct homepage "Most Requested" list link |
| `/services/soft-services` | ~3 (homepage card + breadcrumbs) | 4 | 4 | Stable, adequate |
| `/services/hard-services/electrical-maintenance` | ~3 (homepage intro link + category page + related-service link) | 6 | 4 | Improved |
| `/services/hard-services/hvac-maintenance` | **2** ⚠ shallow, no homepage entry point | **8** ✅ | 5 | **Fixed — was 1 click deeper than its sibling (electrical-maintenance) with zero homepage-level link equity. Now linked from the homepage intro paragraph, the homepage "Most Requested" service card list, and `/sectors` (Corporate Offices card), in addition to its existing category-page and related-service links.** |
| `/services/soft-services/housekeeping` | ~4 | 16 | 7 | Strong (highest-priority commercial page, correctly the most-linked leaf page) |
| `/services/soft-services/security-services` | **1** ⚠ shallow, no homepage entry point | **8** ✅ | 5 | **Fixed — same gap as hvac-maintenance. Now linked from the homepage intro paragraph, the homepage "Most Requested" service card list, and `/sectors` (Retail & Malls card), in addition to its existing category-page and related-service links.** |

**Orphan pages found:** 1 (`/privacy-policy`) — **fixed**.
**Shallow pages (≤1 real incoming link) found:** 2 (`hvac-maintenance`, `security-services`) — **fixed**.
**Pages that were already correctly linked:** 8 of 13 — left unmodified.

## What was fixed and why

### 1. `/privacy-policy` — orphan page (Rule 1)
No page on the site linked to it — it existed only via direct URL / `sitemap.xml`. Added a real `<Link to="/privacy-policy">Privacy Policy</Link>` text link in the site footer's copyright line, which renders on every one of the 13 indexable pages.

### 2. Sector cards on `/sectors` had no links at all (Rules 6, 13, 14)
The 8 sector cards (`IndustriesSection.tsx`) visually implied interactivity — `cursor-pointer`, a hover-scale image, an `ArrowRight` icon suggesting "click to explore" — but were plain, non-interactive `<div>`s with **zero actual links**. Per Rule 14 ("if dedicated sector pages don't exist, create meaningful contextual links from sector descriptions to relevant service pages"), each card now links to the most contextually relevant existing service page, based on what its own description already says:

| Sector | Destination | Why |
|---|---|---|
| IT Parks | `/services` | Description is broad ("high-performance facility services") — links to the general hub |
| Manufacturing | `/services/hard-services` | Industrial operations → maintenance/hard-services |
| Airport Lounges | `/services/soft-services/housekeeping` | Description explicitly says "housekeeping" |
| Corporate Offices | `/services/hard-services/hvac-maintenance` | Offices genuinely depend on HVAC upkeep |
| Healthcare | `/services/soft-services/housekeeping` | "Hygienic" → housekeeping |
| Retail & Malls | `/services/soft-services/security-services` | Customer-facing spaces → security/loss-prevention relevance |
| Warehouses | `/services/hard-services` | Equipment/infra upkeep |
| Hotels & Hospitality | `/services/soft-services/housekeeping` | Description explicitly says "housekeeping" |

### 3. Homepage service-category cards listed service names as plain, unlinked text (Rules 2, 4, 12)
`ServiceCategoryCard.tsx`'s "Most Requested" list showed each category's top services (e.g. "HVAC Maintenance") as plain `<li>` text — visible to users, invisible to crawlers as a link. Every list item is now a `<Link>` to its real service page with the service's own title as anchor text (already descriptive, no rewrite needed). This is what gave `hvac-maintenance` and `security-services` their first-ever homepage-level, single-click entry points.

### 4. Homepage services intro paragraph under-linked (Rule 3 — contextual anchor variation)
Previously linked only "Electrical Maintenance Services in Pune" while mentioning "HVAC and plumbing" as unlinked plain text. Reworded to link all four core services with natural, varied, descriptive anchor text ("HVAC maintenance", "electrical maintenance", "housekeeping", "security services") in one genuinely descriptive sentence — not exact-match keyword stuffing, no repeated anchors.

### 5. Primary nav "Contact Us" link carried tracking parameters (Rule 18)
The main site navigation's "Contact Us" menu item — present on every page — pointed to `/contact-us?source=header_nav#contact-form` instead of the clean canonical `/contact-us`. Per Rule 18 ("primary internal SEO links must not use `?source=`/`?cta_position=` — analytics parameters are for CTAs, not primary navigation"), this now links to the clean `/contact-us`. The dedicated **CTA buttons** ("Request Proposal" in the header, hero, category cards, and support band) intentionally still use `buildContactUrl()` with `source`/`cta_position` params — that's the legitimate, technically-necessary attribution use case this same rule set explicitly allows.

## What was already correct (verified, not changed)

- `/services` and `/sectors` are real indexable hub pages, linked from the main nav on every page.
- Each leaf service page already had a same-category "Related Services" cross-link (electrical ↔ hvac, housekeeping ↔ security) via the existing `layoutPresets.ts` → `LayoutEngine` → `relationships.relatedServices` data-driven system — this is a real, working hub-and-spoke mechanism, not something built from scratch.
- All breadcrumbs use real `<a>`/`<Link>` elements with canonical URLs (`buildServiceBreadcrumbs`), and `BreadcrumbList` JSON-LD is generated from the exact same source, so they can't drift (verified in the prior SEO audit).
- No internal link anywhere in the indexable page set points to a redirecting or non-canonical URL, a 4xx/5xx, or a parameterized URL used as a primary destination (verified via `scripts/seo/check-links.ts`, which validates every `to=`/`href=` against the real route inventory and fails the build on an unknown target).
- Anchor text throughout is descriptive ("Explore Housekeeping Services", "HVAC maintenance") — no "click here" / "learn more" generic anchors found in the reviewed components.

## Deferred (explicitly out of scope for this pass)

- Pune keyword-landing-page internal-link graph (Rules 7, 8, 26) — those pages don't exist yet in this pass; the linking pattern described in the brief applies once/if they're built.
- A fully generic dynamic-route-aware crawler (Rule 25) — `scripts/seo/check-links.ts` already validates every internal link target against the real route inventory and reports incoming-link counts at build time (gating the build on broken links), and it explicitly flags template-literal-built links it can't statically resolve rather than silently miscounting them. A full AST-based resolver for every dynamic link pattern was judged more risk (introducing bugs into a build-gating script) than value, given the real rendered-HTML link graph above was already hand-verified as accurate and complete.
- Cross-linking the two category hubs (`hard-services` ↔ `soft-services`) to each other — both are already reachable within 1–2 clicks from Home/nav on every page and are not shallow/orphaned; adding this would be a content decision (what to say, where) rather than a fix for a measured gap, so it's left for a deliberate future pass rather than done speculatively here.

## Acceptance criteria — status

- [x] No important indexable page is orphaned (`/privacy-policy` fixed)
- [x] Every strategic landing page has contextual incoming links
- [x] Services hub links to service pages
- [x] Service pages link to related services (pre-existing, verified)
- [x] Service pages link to relevant sectors (sectors page links into services; no dedicated sector pages exist to link the other direction)
- [x] Sector cards link to relevant services (fixed — were unlinked)
- [x] Hard Services receives multiple relevant internal links (10 occurrences / 6 source pages, up from ~4/4)
- [x] Contact page is linked contextually, and its primary nav link is clean
- [x] Primary internal nav link does not contain tracking parameters (fixed)
- [x] CTA buttons still carry the legitimate, intentional attribution parameters
- [x] Internal links point to canonical URLs (verified via `check-links.ts` + live curl checks in `GSC-REMEDIATION.md`)
- [x] No broken internal links (`npm run build`'s `check-links` validator passes)
- [x] No important page is >2 meaningful clicks from homepage
- [x] Breadcrumbs implemented consistently with matching JSON-LD (pre-existing, verified)
- [x] Anchor text is descriptive and naturally varied
- [ ] Pune landing-page internal-link graph — N/A, those pages are out of scope for this pass
