# SEO Audit — AFTER (2026-10-08)

**Scope of verification:** the final local production build (`npm run build`). It was crawled through `scripts/seo/serve-dist.ts`, which reproduces this project's `vercel.json` routing (slash strip → redirects → filesystem → rewrites → 404).

**Not deployed. Not verified in production.** Production checks are listed in `GSC_REVALIDATION_CHECKLIST.md`.

## 1. Build and quality gates (final build)

| Check | Result |
|---|---|
| `tsc -b` | PASS |
| `npm run lint` (`eslint src/`) | 0 errors. The 21 warnings were already there before this pass (baseline was 21). |
| Prebuild SEO validators: canonicals, metadata, headings, alt text, schema, links (JSX **and** content configs), route coverage | All PASS |
| Prerender | **42/42** routes (was 19). Build time 4 min (was ~6 min), using 4 parallel workers. |
| `validate-sitemap.ts` (now build-blocking) | PASS: 41 URLs, each 200, self-canonical, indexable, one title, one H1, https/www/no slash/no query/lowercase, no duplicates. robots.txt references the sitemap. |
| `seo-audit.ts --strict` | 50 URLs crawled, 41 indexable, **0 critical, 0 high**. Details in `SEO_AUDIT_REPORT.md` / `.json`. |
| Tests | No test runner is configured in the project (`package.json` has no `test` script). |

## 2. Probe results (HTTP behaviour on the local emulation)

| URL | Before (production) | After (local build) |
|---|---|---|
| `/services/does-not-exist` | **200** (soft 404) | **404** |
| `/services/hard-services/does-not-exist` | **200** (soft 404) | **404** |
| `/services/`, `/sectors/` | 308 → no slash | 308 → no slash (unchanged, correct) |
| `/category/services` | 308 → `/services` | 308 → `/services` |
| `/contact-us?source=homepage&cta_position=hero` | 200, canonical `/contact-us` | Same. **Parameter links in HTML: 0** (was one per CTA on every page). |
| `/HOUSEKEEPING-SERVICES-PUNE` | 404 | 404 |
| `/sitemap.xml` | 200 XML | 200 XML + `X-Robots-Tag: noindex` |

## 3. Page inventory (41 indexable URLs)

| Type | Count | Notes |
|---|---|---|
| Static (home, services, sectors, company profile, support, contact, privacy, **resources hub**) | 8 | `/resources` is new |
| Pune landing pages | 23 | 5 existing (housekeeping pillar, FM pillar and electrical **rewritten**; security extended; HVAC unchanged) and **18 new** |
| Guides under `/resources` | 4 | New |
| Service category / detail pages | 6 | Unchanged content |

**New indexable pages: 23** (18 landing pages, 4 guides and the resources hub).

### New and rewritten pages (from the final audit)

Every page below returns 200. Each has `index, follow`, a self-canonical, a unique title and description, exactly one H1, 42 internal inbound links (footer directory plus hubs), and JSON-LD of Organization, LocalBusiness, WebSite and BreadcrumbList. Landing pages add Service and FAQPage. Guides add Article (and FAQPage where they have FAQs). The "Words" column counts the rendered `<main>` text, including the shared FAQ, related-links and CTA blocks.

| URL | Title length (with brand suffix) | Description length | Words |
|---|---|---|---|
| /housekeeping-services-pune (rewritten pillar) | 58 | 156 | 1,466 (was ~385) |
| /commercial-housekeeping-services-pune | 60 | 154 | 760 |
| /corporate-housekeeping-services-pune | 59 | 156 | 706 |
| /office-housekeeping-services-pune | 56 | 160 | 603 |
| /society-housekeeping-services-pune | 57 | 158 | 721 |
| /housekeeping-staff-pune | 55 | 150 | 616 |
| /industrial-housekeeping-services-pune | 58 | 157 | 511 |
| /school-housekeeping-services-pune | 56 | 156 | 464 |
| /healthcare-housekeeping-services-pune | 58 | 151 | 491 |
| /facility-management-company-pune (rewritten pillar) | 56 | 155 | 886 |
| /facility-management-for-societies-pune | 56 | 151 | 600 |
| /office-facility-management-pune | 60 | 153 | 518 |
| /commercial-facility-management-pune | 59 | 157 | 506 |
| /facility-staffing-services-pune | 54 | 149 | 450 |
| /facility-maintenance-services-pune (new pillar) | 57 | 151 | 624 |
| /electrical-maintenance-services-pune (rewritten) | 56 | 153 | 586 |
| /plumbing-maintenance-services-pune | 57 | 154 | 475 |
| /building-maintenance-services-pune | 57 | 154 | 531 |
| /stp-operation-maintenance-pune | 56 | 150 | 462 |
| /landscaping-services-pune | 57 | 154 | 397 |
| /society-security-services-pune | 59 | 150 | 494 |
| /resources | 58 | 150 | 373 |
| /resources/how-to-choose-a-housekeeping-company-pune | 60 | 152 | 730 |
| /resources/office-housekeeping-checklist | 58 | 156 | 468 |
| /resources/housekeeping-cost-pune | 54 | 160 | 663 |
| /resources/how-many-housekeeping-staff | 57 | 157 | 637 |

Mobile: the pillar page and a guide were rendered at 390px and 1280px with headless Chromium, with **0 px horizontal overflow** at both widths. Screenshots of the hero, FAQ, table and hub were reviewed: brand colours are kept, and data tables scroll inside a keyboard-focusable region on mobile.

## 4. Content duplication check

Pairwise Jaccard similarity was measured on 5-word shingles of the rendered `<main>` text across all 41 pages (820 pairs).

- Only **1 pair scores ≥ 0.30**: `/resources` ↔ `/services`. Both are hubs that intentionally share the cluster-directory block.
- No new landing page or guide appears among the 15 most similar pairs. The highest of those 15 involving any service page is 0.195 (`/services/hard-services` ↔ `/services/soft-services`, which already existed).
- Every new page has its own section sequence and its own FAQs.

## 5. Changes by area

| Area | Change |
|---|---|
| **Canonical / parameters** | CTAs render a clean `href` (`CONTACT_LINK_HREF`). Click tracking and form prefill still work through `navigateToContact`. |
| **Soft 404** | Removed the catch-all rewrites under `/services/*`. |
| **Robots** | `X-Robots-Tag` on `/admin` (previously missing) and on `/sitemap.xml`. robots.txt unchanged (it was already correct). |
| **Sitemap** | Built from content configs: 41 URLs. `lastmod` now uses real change dates (guide `dateModified` / git history) instead of the build date. Image entries removed or corrected where they made false location claims. Validated at build. |
| **Metadata** | Twitter tags use `name=`. Added `og:site_name`, `og:locale` and `og:type=article` for guides. The keyword validator now ignores connector words, so copy can read naturally. |
| **Structured data** | Removed the fake `SearchAction`. Added `legalName` (from the brochure), email, published hours, and `areaServed` (Pune, Pimpri-Chinchwad). Hierarchical BreadcrumbList. Added Article schema with organisation authorship and real dates. FAQ JSON-LD answers are stripped of link markup and match the visible answers. |
| **FAQ rendering** | Native `<details>`: every answer is now in the HTML. |
| **Internal linking** | Footer site directory on every page. Grouped cluster hub on Home, `/services` and `/resources`. "More in this topic" navigation. Hierarchical breadcrumbs. Contextual anchors validated at build. |
| **Content architecture** | 4 clusters (housekeeping, facility management, maintenance, security), each with a pillar, plus a `/resources` hub. Adding a page means adding one config object. |
| **Images** | Alt text and sitemap titles now describe only what the stock photographs show. |
| **Accessibility** | Reviewed by the accessibility lead. Fixed: primary button contrast (orange-600), eyebrow contrast, focus ring contrast, callout link contrast, dark breadcrumb variant (`<ol>`, `aria-hidden` icons, hover stays visible), list roles, table labelling and focus, `aria-labelledby` on the topic nav, reduced-motion handling. |
| **Performance** | Prerender runs in parallel (4 workers), so the build is faster with twice the routes. No change to runtime bundles. |
| **Regression protection** | `validate-sitemap.ts` blocks the build. `seo-audit.ts --strict` runs in CI. |

## 6. Remaining risks and open items

| Priority | Item |
|---|---|
| P0 (business) | **NAP is inconsistent** across the website, the company PDFs and probably GBP. Choose one canonical form (see `OFFSITE_SEO_PLAN.md` §0). |
| P1 (business) | Unverifiable stats remain on existing pages: "10+ years", "10,000+ clients", "2,000+ workforce", "50+ sites", "5+ cities", "ISO", "eco-friendly". Verify or remove them. They were not repeated on new pages. |
| P1 | Real photographs are needed. Every hero uses generic stock imagery. Upload genuine site and team photos via the Media Library. `ManagedImage` already uses them automatically. |
| P2 | `/hvac-maintenance-services-pune` still closely mirrors its service page. Rewrite it with Pune-specific content or consolidate. |
| P2 | Pre-existing thin pages: `/support` (67 words), `/sectors` (146), `/services/hard-services` (189), `/services/soft-services` (201), `/contact-us`, `/company-profile`. |
| P2 | `/services/soft-services/housekeeping` is titled "Corporate Housekeeping Service" and may compete with `/corporate-housekeeping-services-pune`. Monitor in GSC. |
| P3 | Legacy redirect chains (platform-ordered, up to 4 hops). `.html` duplicate file URLs (canonicalised and unlinked). Main JS chunk still about 1.3 MB (pre-existing). |
| P3 | The footer logo `<div>` has an `aria-label` but no role and only a mouse double-click handler (pre-existing admin shortcut). |
