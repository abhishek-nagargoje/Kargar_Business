# SEO Audit — BEFORE (baseline, 2026-10-08)

Everything below was observed **before** any code change in this pass, from the repository at commit `0cd7553`, a local production build, and live HTTP requests to `https://www.kargarbusinessservices.com`.

## 1. Architecture

| Area | Finding |
|---|---|
| Framework | React 19 + Vite 6 SPA, TypeScript, Tailwind 4 (`frontend/`) |
| Routing | `react-router` v7, routes declared in `src/App.tsx`; static pages rendered by `KargarSinglePage.tsx` switching on pathname; service pages `/services/:categoryId(/:serviceId)`; 5 Pune landing pages via one `PuneLandingPage` template |
| Rendering | Client-side app, **build-time prerendering** (`scripts/seo/prerender.ts`) boots the built app in headless Chromium and saves hydrated DOM per route to `dist/<route>.html` |
| Hosting | Vercel; `vercel.json` generated partly by `scripts/seo/generate-redirects.ts` — explicit rewrite per route → its prerendered `.html`; `trailingSlash: false` |
| Metadata | `react-helmet-async` via central `src/components/seo/SEO.tsx`; static-route metadata in `src/features/seo/registry.ts`; Pune pages in `features/pune-landing/config/punePages.ts`; service pages in `features/services/config/*` |
| Structured data | One `@graph` per page: Organization, LocalBusiness, WebSite (+SearchAction), BreadcrumbList, + Service/FAQPage on service & Pune pages |
| Sitemap / robots | Generated at prebuild by `scripts/seo/generate-sitemap.ts` / `generate-robots.ts` from a route inventory |
| Validators | Prebuild pipeline: canonicals, metadata length/duplication, headings (static scan), alt text, schema data, link check, route coverage |
| Build health | `tsc -b` PASS · `eslint src/` 0 errors / 21 warnings · `npm run build` PASS, 19/19 routes prerendered (~6 min) · no test runner configured |

## 2. Live HTTP behaviour (curl, 2026-10-08)

| URL | Result | Assessment |
|---|---|---|
| `/`, all 18 sitemap URLs | 200, prerendered HTML, self-canonical | OK |
| `/services/`, `/sectors/`, `/contact-us/` | 308 → no-slash version | Correct policy; explains GSC "Page with redirect" |
| `/category/services/` | 308 → `/category/services` → 308 → `/services` | **2-hop chain** (Vercel strips the slash before user redirects run) |
| `http://kargarbusinessservices.com/about-us/` | 308 https → 308 www → 308 strip slash → 308 `/company-profile` | **4-hop chain** — likeliest "Redirect error" class |
| `/contact-us?source=homepage&cta_position=hero` | 200, canonical `/contact-us` | Canonical correct; URL should not be discoverable |
| `/services/foo`, `/services/foo/bar` | **200** (SPA shell) | **Soft 404** caused by catch-all rewrites `/services/:categoryId` → `/index.html` |
| `/this-does-not-exist` | 404 with prerendered 404 page | OK |
| `/HOUSEKEEPING-SERVICES-PUNE` | 404 | OK (no case duplicates) |
| `/services.html`, `/index.html` | 200 | Duplicate file URLs; canonical tags point to clean URLs (low risk) |
| `/sitemap.xml` | 200 `application/xml`, valid | OK; GSC lists it as "Crawled – not indexed", which is normal |
| `/admin` | 200, `X-Robots-Tag` only on `/admin/(.*)` | Header missing on `/admin` itself (robots.txt disallows it anyway) |

## 3. Problems found (prioritised)

### P0 — critical
1. **Soft 404s under `/services/*`.** Any non-existent `/services/x` or `/services/x/y` URL returns HTTP 200 with the SPA shell. Code: `scripts/seo/generate-redirects.ts` fallback rewrites.
2. **Tracking-parameter URLs exposed as crawlable links on every page.** Every CTA rendered `href="/contact-us?source=…&cta_position=…"` (or `?service=/…-pune&source=…`) into the prerendered HTML, so Googlebot discovered a new duplicate per CTA. This is the root cause of the 10 "Alternate page with proper canonical tag" URLs. Code: `buildContactUrl` used as `to=`/`href=` in `KargarSinglePage.tsx` (3), `PuneLandingPage.tsx` (2), `HeroSection.tsx`, `CTASection.tsx`, `ServiceCategoryCard.tsx`.
3. **Primary keyword page is thin and misses KARGAR's actual core segment.** `/housekeeping-services-pune` had ~385 words of main content, 4 generic "what's included" cards, and **no mention of residential/housing societies** — which the Company Profile documents as KARGAR's core Pune business ("Pune's most premium residential societies"). No process, supervision model, scope table, property-type coverage or buyer guidance.

### P1 — high
4. **No topical cluster.** 5 Pune pages total; no supporting pages for commercial/corporate/office/society housekeeping, staffing, maintenance, society FM. Pune pages linked to each other with 3 generic links each.
5. **Footer contained zero navigation links** (logo, social icons, privacy link only). No site-wide crawl path to deeper pages.
6. **FAQ answers not in the HTML.** The accordion rendered answers only when open (`{isOpen && <p>}`), so prerendered HTML contained only the first answer while FAQPage JSON-LD contained all of them (markup/visible-content mismatch).
7. **`/electrical-maintenance-services-pune` near-duplicates `/services/hard-services/electrical-maintenance`** (same four scope items, same FAQs reworded) — a plausible reason for "Discovered – currently not indexed". `/services/hard-services` (195 words) is thin.
8. **Inaccurate image claims.** Hero photographs are generic illustrations (e.g. signage "One Financial Plaza", "Ascent Tower"), yet sitemap image titles / alt text said "KARGAR Facility Management office building in Baner, Pune" and "Housekeeping staff cleaning a corporate office in Pune".
9. **WebSite schema declared a `SearchAction` (`/services?q=`) for a search feature that does not exist.**

### P2 — medium
10. Redirect chains for legacy URLs (2–4 hops; see §2). Vercel applies http→https→www and the trailing-slash strip before project redirects, so these cannot be collapsed in `vercel.json`.
11. Sitemap `lastmod` = build date on every URL on every deploy (not a real change signal).
12. Twitter tags used `property=` instead of `name=`.
13. Validator required the literal keyword string (e.g. "Commercial Housekeeping Services Pune") in title/description, pushing copy toward unnatural phrasing.
14. Breadcrumbs on Pune pages were flat (Home › Page) — no hierarchy for Google to infer.
15. No automated post-build crawl: sitemap URLs were never checked for 200/self-canonical/indexable after build; no HTTP-level checks at all.

### P3 — low
16. `.html` file URLs (`/services.html`) are directly reachable (canonicalised; not linked).
17. `/admin` lacks `X-Robots-Tag` (disallowed in robots.txt, unlinked).
18. Dead components `src/components/layout/Footer.tsx` / `Navbar.tsx` contain placeholder NAP (already flagged in `docs/SEO-HOUSEKEEPING-PUNE-STRATEGY.md`; not rendered).

## 4. Content, trust and local-SEO findings

| Topic | Finding |
|---|---|
| Verified business facts | Company Brochure & Profile PDFs (in `public/assets/documents/`) document: legal name *Kargar Business Services Pvt. Ltd.*; full soft/hard/support service list; sectors; society org structures and co-op society services; PURNA protocol; 100% financial transparency; year-round training; 98% client / 95% employee retention; PM award (2024) and Maharashtra grant. None of the PURNA/transparency/society content was used on the SEO pages. |
| Unverifiable claims on site | "10+ years", "10,000+ clients", "2,000+ workforce", "50+ sites", "5+ cities / PAN India" (homepage, company profile, FM page), "ISO-aligned", "eco-friendly". None appear in the company's own PDFs. "10,000+ clients" with "50+ sites" is internally implausible. **Not removed** (business decision) — **not repeated** on any new page. **Recommend the business verifies or removes them.** |
| NAP | Site: "301, 3rd Floor, Unity Commercial, Baner, Pune 411045", phone +91 78218 44591 (primary) and +91 87887 26752 (header). PDFs: "301-302, Unity Commercial, Near Amar Business Zone, Baner, Pune 411045", phones 87887 26752 / 92262 90310. **Must be reconciled with the Google Business Profile** (business decision — not changed in code). |
| Recognition section | Homepage "Recognition" section already exists, sourced from the Company Profile p.17 with an accuracy rule (`recognitions.ts`). Verified accurate; no change needed. |
| Locality relevance | Pages mentioned only "Baner" and "PCMC". No locality pages exist (correct — no locality-specific facts are documented). |

## 5. Why "housekeeping services Pune" was not ranking (evidence-based assessment)

1. **SERP shape.** Live results for "housekeeping services Pune" are dominated by directories (IndiaMART/Justdial-style listings), a "top facility management companies in Pune" listicle and large established FMs (BVG, Supreme). A small domain competes against high-authority aggregators — **off-site authority and directory/GBP presence are a large part of the gap** (see `OFFSITE_SEO_PLAN.md`).
2. **Thin, generic target page** (≈385 words) that could describe any provider anywhere; no unique information (PURNA, transparency, society expertise) and no property-type depth.
3. **No supporting cluster** — Google had no corroborating pages showing topical depth in housekeeping.
4. **Weak internal linking** to the page (no footer links, few contextual anchors).
5. **Crawl signals diluted** by parameter URLs and soft-404 surfaces.
6. **Entity/NAP inconsistency** between website, PDFs and (likely) GBP.

## 6. Recommended fixes

All P0–P2 items above are addressed in this pass except #10 (platform-level; documented) and the business decisions in §4. See `SEO_AUDIT_AFTER.md` for what was changed and how each fix was verified.
