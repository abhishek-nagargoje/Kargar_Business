# SEO Audit Report — KARGAR Facility Management

**Date:** 2026-10-14
**Site:** https://www.kargarbusinessservices.com/
**Scope:** Google Search Console issues (from supplied screenshots), technical SEO, canonicals, redirects, sitemap, robots, prerendering, internal links, structured data.
**Evidence base:** live production HTTP responses (`curl`, Googlebot UA), post-JavaScript DOM of every sitemap URL (headless Chromium), source code, local production build.
**Not available:** authenticated Search Console, Google Business Profile, Vercel dashboard. No GSC status in this report is live-verified; GSC categories come from the supplied screenshots.

---

## 1. Executive summary

Production is in good technical shape. None of the five GSC categories points to a live defect today:

- Every sitemap URL (41) returns `200` with no redirect, exactly one self-referencing absolute canonical, `index, follow`, one `<h1>`, valid JSON-LD, and full prerendered content in the initial HTML. Canonicals stay the same after JavaScript runs.
- `/privacy-policy/`, `/services/` and `/sectors/` all end in a single correct `308` to the slash-less URL, with no loops. The longest chain (`http://` apex) is 3 hops, well under Google's limit.
- `/sitemap.xml` is valid XML served as `application/xml` with `X-Robots-Tag: noindex`. Google listing the sitemap file as "not indexed" is expected, not a defect.
- The ten `/contact-us?source=…` URLs all canonicalize to `/contact-us`. Their source (CTA `href`s that carried tracking params) was fixed in code on **2026-10-08**. Neither the initial HTML nor the rendered DOM of any page links to a parameterized URL any more.

Most of these GSC reports are therefore **stale or expected exclusions**. The "Failed" validation states most likely reflect crawls from before the 2026-10-08 deploy.

The audit found three genuine, low-to-medium defects, all fixed in the repository (**not yet deployed**):

| ID | Severity | Fix |
|---|---|---|
| F-01 | Medium | `/services/hard-services` and `/services/soft-services` were the only sitemap pages missing from the site-wide footer directory: 7 and 3 inlinking pages vs. 41 for every other page. Added them, so both now have 41. |
| F-02 | Low | The 404 page (noindex) declared `canonical`, `hreflang`, `og:url` → `/404`, a URL that itself returns 404. Noindex pages no longer emit a canonical. |
| F-03 | Low | The hard-services hub did not link back to its Pune pillar `/facility-maintenance-services-pune`, which links to it. The link is now reciprocal. |

Plus one latent issue (F-04: unused `components/layout/Footer.tsx` still built a parameterized contact href). There's also a regression guard: the build validator now fails on parameterized or trailing-slash internal links and on a 404 page that declares a canonical.

## 2. Baseline architecture

| Area | Implementation |
|---|---|
| Framework | React 19 + Vite 6, TypeScript, `react-router` v7, `react-helmet-async` (`frontend/`) |
| Metadata / canonical | `src/components/seo/SEO.tsx`, `src/lib/seo/canonical.ts`, route registry `src/features/seo/registry.ts` |
| Structured data | `src/lib/seo/schema.ts`: Organization, LocalBusiness, WebSite, BreadcrumbList, Service; FAQ/Article where applicable. No AggregateRating. |
| Route inventory | `scripts/seo/route-inventory.ts` + `seo.config.ts` (single source for sitemap, rewrites, prerender) |
| Sitemap / robots | Generated at `prebuild` by `scripts/seo/generate-sitemap.ts` / `generate-robots.ts`; `lastmod` from the git commit date of each page's content source |
| Prerendering | `scripts/seo/prerender.ts`: Playwright renders every route to `dist/<route>.html` and the real NotFound page to `dist/404.html` |
| Hosting | Vercel, `vercel.json`: `trailingSlash: false`, per-route rewrites to prerendered files, 5 legacy 301s, `X-Robots-Tag` on `/admin*` and `/sitemap.xml` |
| 404 handling | Unknown paths are not rewritten → Vercel serves `dist/404.html` with a genuine HTTP 404 (verified live) |
| Validation | `prebuild`: canonicals, metadata, headings, alt text, schema, links, route coverage. `postbuild`: `validate-sitemap.ts` crawls the built site over HTTP with vercel.json routing |
| Analytics | Google Ads tag + phone/form conversions (`src/lib/analytics`); not modified |

**Route classification** (41 sitemap URLs):
- **A. Indexable:** 41 (8 core pages, 23 Pune landing pages, 4 resource guides, 2 service hubs, 4 service detail pages)
- **B. Redirects/alternates:** trailing-slash variants (edge 308), `/contact`, `/about`, `/about-us`, `/category/services`, `/amp` (301), `/contact-us?…` (canonical to `/contact-us`)
- **C. Utility/excluded:** `/admin/*` (noindex header + robots disallow), `/sitemap.xml` (noindex header)
- **D. Error:** any unknown path → 404, noindex
- **E. Business decision needed:** none for routing; content claims in §7

## 3. Findings register

| ID | Affected | Problem | Evidence | Severity | Root cause | Fix | Files | Verification | Result |
|---|---|---|---|---|---|---|---|---|---|
| F-01 | `/services/hard-services`, `/services/soft-services` | Weak internal-link signal for the page GSC reports as "Discovered – currently not indexed" | Crawl of 41 live pages: hard-services linked from 7 pages, soft-services from 3, every other sitemap URL from 41 | Medium | `FooterDirectory` lists Pune clusters, nav items and guides, but not the `/services/*` category hubs | Category hubs (from `serviceCategories`, `showInNavigation`) inserted under "Services" in the footer directory | `src/pages/KargarSinglePage.tsx` | Built `dist/`: both hubs now linked from 41 pages | Pass (local) |
| F-02 | 404 page (all unknown URLs) | Noindex page declares canonical/hreflang/og:url → `/404`, which returns 404 | Live: `<link rel="canonical" href=".../404">` on `/this-does-not-exist-xyz`; `/404` → HTTP 404 | Low | `NotFoundPage` passed `canonicalUrl={buildCanonicalUrl('/404')}`; `SEO` always emitted canonical | `SEO` omits canonical, hreflang, og:url and twitter:url when `robots.index === false`; `NotFoundPage` no longer passes a canonical | `src/components/seo/SEO.tsx`, `src/pages/NotFoundPage.tsx` | `dist/404.html` has 0 canonical tags; new validator check fails on production and passes locally | Pass (local) |
| F-03 | `/services/hard-services` | Pune pillar links to the hub, but the hub didn't link back | Hub's "Serving Pune" row only listed `/hvac-maintenance-services-pune` | Low | Filter matched only `serviceDetailLink` hrefs under `${path}/`, not the hub itself | Filter also matches `href === path` | `src/features/services/pages/CategoryPage.tsx` | `dist/services/hard-services.html` now links `/facility-maintenance-services-pune` | Pass (local) |
| F-04 | `components/layout/Footer.tsx` | Contact link `to=` used `buildContactUrl({source…})`, the exact pattern behind the "Alternate page" reports | Source inspection | Informational | Component not imported anywhere (dead code) but would reintroduce the issue if reused | Uses `contactHref` (param-free) like every other CTA | `src/components/layout/Footer.tsx` | type-check + lint | Pass |
| F-05 | Build validation | No automated guard against parameterized/trailing-slash internal links or a canonical on the 404 page | — | Low | — | `validate-sitemap.ts` now checks every sitemap page's internal links and a nonexistent URL (must be 404, noindex, no canonical) | `scripts/validate-sitemap.ts` | Run against production: flags F-02 only. Run in `postbuild`: PASS | Pass |
| I-01 | `/sitemap.xml` | GSC "Crawled – currently not indexed" | Live: 200, `application/xml`, valid `<urlset>`, 41 unique URLs, all 200/self-canonical | Info | Expected: a sitemap is not a search-result page (and is served `noindex`) | None | — | curl + XML parse + per-URL fetch | Not a defect |
| I-02 | `/services/`, `/sectors/`, `/privacy-policy/` | GSC "Page with redirect" / "Redirect error" | Live: single 308 → slash-less URL → 200; no loops; no internal links to slash variants (initial HTML or rendered DOM) | Info | `trailingSlash: false` normalization. The "Redirect error" for privacy-policy cannot be reproduced on any http/https/www/apex/slash variant today | None | — | `curl -IL` on 5 variants | Expected exclusion / likely stale |
| I-03 | `/contact-us?…` (10 URLs) | GSC "Alternate page with proper canonical tag" | All canonicalize to `https://www.kargarbusinessservices.com/contact-us` in initial HTML and after JS; no page links to them any more | Info | CTA `href`s carried tracking params until the 2026-10-08 fix (`CONTACT_LINK_HREF`). Attribution still works via the click handler → hidden form fields | None (already fixed) | — | Chromium DOM audit of all 41 pages | Expected exclusion |
| I-04 | Every page | `hreflang="en-IN"` + `x-default` self-references on a single-language site | Source | Info | Harmless; not needed without alternate-language versions | Left as-is (no SEO benefit to removing; no harm keeping) | — | — | — |

## 4. Google Search Console findings

| GSC category | Classification | Detail |
|---|---|---|
| Alternate page with proper canonical tag (10) | **Expected exclusion; root cause already fixed 2026-10-08** | These are attribution URLs. Canonical is correct and stable. Google should stop discovering new variants now that no `href` carries params. Existing ones may linger in the report for weeks; that's harmless. The `source` / `service` / `category` / `cta_position` params are still read on `/contact-us` (form subject prefill and hidden fields), so they must not be stripped from the click handler. |
| Page with redirect (`/services/`, `/sectors/`) | **Expected exclusion** | Intentional single-hop 308 to the canonical slash-less URL. Destinations are 200, self-canonical, in the sitemap. Do not remove the redirects. |
| Redirect error (`/privacy-policy/`) | **Not reproducible; likely stale** | Every variant resolves cleanly (max 3 hops for `http://kargarbusinessservices.com/privacy-policy/`). Git history shows a 2026-08-11 fix (`7ffe208`) for trailing-slash URLs that previously returned 404, so the report likely predates it. Re-inspect in GSC after deploy (§10). |
| Crawled – currently not indexed (`/sitemap.xml`) | **Expected; not a defect** | Valid sitemap; Google processes it from the Sitemaps report regardless. Don't request indexing for it. |
| Discovered – currently not indexed (`/services/hard-services`) | **Google crawl-priority decision; strengthened by F-01/F-03** | Technically eligible (200, prerendered, unique title/description/H1, self-canonical, in sitemap). It had the weakest internal linking of any sitemap page. After deploy it receives site-wide links. Content is a 456-word hub that overlaps with `/facility-maintenance-services-pune`; see §7. |

## 5. Route inventory

All 41 sitemap URLs, live production, 2026-10-14. Status 200 with 0 redirects, canonical equal to the URL, `index, follow`, 1 H1, in sitemap: **all 41 pass**. Titles and descriptions are unique (enforced by `validate-metadata` at build). Word count of `<main>`-area text and inlinking pages (before this change) were measured per page:

| URL | Purpose | Words | Inlinks (before) |
|---|---|---|---|
| `/` | Homepage | 1190 | 41 |
| `/housekeeping-services-pune` | Primary keyword pillar | 1742 | 41 |
| `/facility-management-company-pune` | FM pillar | 1154 | 41 |
| `/facility-maintenance-services-pune` | Maintenance pillar | 900 | 41 |
| `/security-services-pune` | Security pillar | 737 | 41 |
| `/services` / `/sectors` / `/company-profile` / `/support` / `/contact-us` / `/privacy-policy` / `/resources` | Core pages | 334–725 | 41 |
| 19 other Pune landing pages | Service × segment pages | 664–1036 | 41 |
| 4 `/resources/*` guides | Articles | 735–998 | 41 |
| `/services/hard-services` | Category hub | 456 | **7** |
| `/services/soft-services` | Category hub | 468 | **3** |
| `/services/hard-services/{electrical,hvac}-maintenance` | Service detail | 611–631 | 5–6 |
| `/services/soft-services/{housekeeping,security-services}` | Service detail | 604–909 | 6–8 |

Non-sitemap URLs checked: `/404` → 404; unknown path → 404 noindex; `/category/services/` → 308 → 308 → `/services` 200 (2 hops; acceptable).

## 6. Technical SEO results

| Area | Result |
|---|---|
| Indexability | Pass. No accidental noindex; `X-Robots-Tag` only on `/admin*` and `/sitemap.xml` |
| Canonicalization | Pass. Absolute, https, www, no trailing slash, one per page, stable after JS. F-02 fixed for 404 |
| Redirects | Pass. All permanent (308/301), no loops, ≤3 hops. Apex→www and http→https are handled by Vercel domain settings |
| Sitemap | Pass. Valid XML, 41 unique canonical URLs, no params/redirects/404s, referenced in robots.txt. `lastmod` is derived from git history (35 URLs show 2026-10-08 because their shared content source was last committed then; accurate by design) |
| Robots.txt | Pass. `Allow: /`, `Disallow: /admin`, sitemap declared; CSS/JS not blocked |
| Metadata | Pass. Validated at build for every route |
| Structured data | Pass. Valid JSON on all pages; no AggregateRating or invented reviews. See §7 for facts to confirm |
| Internal links | F-01/F-03 fixed. No broken links, no links to redirecting or parameterized URLs |
| 404 behaviour | Pass. Genuine HTTP 404 with prerendered NotFound content; F-02 fixed |
| Prerendering | Pass on production. Initial HTML contains title, meta, canonical, H1, body, JSON-LD for every route |
| JS errors | None on any of the 41 pages in headless Chromium |
| Performance / CWV | **Not measured in this pass.** No field data access; Lighthouse not run. Build emits a chunk-size warning (pre-existing) |
| Accessibility | New footer links reuse the existing link markup and focus styles inside the existing `<nav aria-label="Site directory">`. No other UI changed |

## 7. Content and local SEO (needs human confirmation; nothing changed)

The following visible claims could not be verified from any authoritative source in the repo. Confirm them against company records before relying on them in Google Business Profile, ads or schema:

- **Homepage stats:** "10,000+ Happy Clients" next to "50+ Sites Managed" and "2,000+ Skilled Workforce". Ten thousand clients across fifty sites is internally inconsistent.
- **Geographic scope:** the homepage operations card says "We Operate Across India" and "50+ sites across 5+ cities". LocalBusiness schema states `areaServed: Pune, Pimpri-Chinchwad`. Pick one truthful scope and align both.
- **Hard Services hub:** "150+ Engineers", "99% SLA Compliance". **Soft Services hub:** "5M+ Sq. Ft. Managed". The hard-services overview mentions "plumbing … and civil maintenance", but the hub only has electrical and HVAC detail pages; plumbing/building maintenance exist only as Pune pages.
- **Hard-services content:** the hub is thin (456 words) and overlaps with `/facility-maintenance-services-pune`. If the business wants it indexed independently, expand it with real operational detail (PPM scheduling, response process, actual asset types handled). Do not pad it. Alternatively, accept that Google may index the Pune pillar instead. Both are legitimate outcomes.
- **Google Business Profile (manual):** confirm name "Kargar Business Services" vs. website brand "KARGAR Facility Management" is an intentional difference. Make sure GBP phone, address (301, Unity Commercial, Baner, Pune 411045), hours (Mon–Sat 09:00–18:00) and website URL match the site. Choose categories that reflect the real primary service (e.g. housekeeping or facility management). Collect genuine reviews only.

## 8. Files changed

| File | Why |
|---|---|
| `frontend/src/pages/KargarSinglePage.tsx` | F-01: category hubs added to the site-wide footer directory |
| `frontend/src/features/services/pages/CategoryPage.tsx` | F-03: hub lists Pune pages that link to it |
| `frontend/src/components/seo/SEO.tsx` | F-02: no canonical/hreflang/og:url/twitter:url on noindex pages |
| `frontend/src/pages/NotFoundPage.tsx` | F-02: stop passing `/404` canonical |
| `frontend/src/components/layout/Footer.tsx` | F-04: param-free contact href (unused component) |
| `frontend/scripts/validate-sitemap.ts` | F-05: regression checks for internal link hygiene and 404 canonical |
| `docs/seo-audit-report.md` | This report |

## 9. Test results (2026-10-14, local)

| Check | Result |
|---|---|
| `npm run lint` (baseline and after) | Pass. 0 errors, 21 warnings, identical before and after (pre-existing unused `eslint-disable` directives) |
| `tsc -b` | Pass |
| `npm run build` (prebuild validators → tsc → vite → prerender → postbuild) | Pass: canonicals, metadata, headings, alt text, schema, links, route coverage, robots, sitemap (41 URLs) |
| `validate-sitemap` on local `dist/` (incl. new checks) | Pass |
| `validate-sitemap --url <production>` (incl. new checks) | Fails only on F-02 (expected until deploy) |
| Live HTTP sweep (redirect variants, sitemap, robots, 404) | Done, see §4 and §6 |
| Headless Chromium DOM audit of 41 live pages | Pass: canonical stable, 1 H1, no param/slash links, no JS errors |
| Contact form submission | **Not run** (would send a real enquiry). Attribution code path unchanged |
| Lighthouse / CWV | **Not run** |
| Production verification of the fixes | **Not done.** Changes are not deployed |

## 10. Remaining work and next actions

**After you review and deploy** (not done by this audit):
1. Run `cd frontend && npx tsx --tsconfig scripts/tsconfig.seo.json scripts/validate-sitemap.ts --url https://www.kargarbusinessservices.com`. It should report PASS once F-02 is live.

**Search Console** (requires your login):
2. URL Inspection → *Test live URL* for `https://www.kargarbusinessservices.com/services/hard-services`, then **Request indexing**. Do the same for `/services/soft-services`. Only these two benefited from link changes.
3. URL Inspection → *Test live URL* on `https://www.kargarbusinessservices.com/privacy-policy/`. If it shows "Page with redirect" to `/privacy-policy`, the error was stale. Validate the "Redirect error" issue once.
4. Do **not** request indexing for `/contact-us?…`, trailing-slash URLs or `/sitemap.xml`. Leave those exclusions alone.
5. Sitemaps report: confirm `sitemap.xml` shows "Success" with 41 discovered URLs.
6. Allow several weeks for Google to recrawl. Indexing is Google's decision and is not guaranteed.

**Business confirmation:** resolve the §7 claims, then align homepage stats, operations card, schema `areaServed` and the GBP profile.

**Later:** Lighthouse/CWV pass on `/`, `/housekeeping-services-pune` and `/services/hard-services`, plus field data from GSC's Core Web Vitals report.
