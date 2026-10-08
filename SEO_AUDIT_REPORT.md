# Technical SEO Audit — KARGAR Business Services

**Site:** https://www.kargarbusinessservices.com/
**Stack:** React 19 + Vite 6 (client-rendered SPA) + `react-router` v7 + `react-helmet-async`, build-time Playwright prerendering, deployed on Vercel.
**Scope:** Full technical SEO audit (18 phases) following the prior fixes for duplicate meta descriptions, orphan `/support`, and route-level prerendering, which are confirmed intact and unmodified by this audit.

---

## 1. Issues found, severity, and fixes

### 1.1 — HIGH — Service & category detail pages had no site navigation or footer
**Severity:** High (SEO internal-linking + UX + accessibility)
**Files:** `frontend/src/features/services/pages/ServicePage.tsx`, `frontend/src/features/services/pages/CategoryPage.tsx`

**Finding:** The six pages rendered by these two components — `/services/hard-services`, `/services/soft-services`, and the four individual service pages (`electrical-maintenance`, `hvac-maintenance`, `housekeeping`, `security-services`) — are the site's primary commercial landing pages, the ones actually meant to rank for "housekeeping services Pune," "HVAC maintenance," etc. I confirmed by inspecting the **actual prerendered HTML** (`dist/services/hard-services/hvac-maintenance.html`) that these pages rendered with:
- No `<header>` element
- No main site `<nav aria-label="Main navigation">` — only a small breadcrumb `<nav aria-label="Breadcrumb">`
- No `<footer>` element

A user or crawler landing directly on one of these pages (the expected entry point from a Google search) had no way to reach Home, other services, Contact Us, or the footer/social links except via the breadcrumb's "Home" link. `ServicePage.tsx`/`CategoryPage.tsx` rendered only `<SEO/>` + the layout content — nothing else.

**Root cause:** These two page components never included `Header`/`Footer`. Every *other* page in the app does — `KargarSinglePage.tsx` renders them directly, and `PrivacyPolicyPage.tsx` already correctly imports and reuses the same `Header`/`Footer` exported from `KargarSinglePage.tsx`. `ServicePage.tsx`/`CategoryPage.tsx` were simply never updated to follow that pattern.

**Fix:** Applied the exact existing pattern from `PrivacyPolicyPage.tsx` — no new components created:
```tsx
import { Header, Footer } from '@/pages/KargarSinglePage';
...
<div className="kargar-site kb-site">
  <SEO .../>
  <Header activePath={path} />
  <main>
    <ServiceLayout .../>  {/* or CategoryLayout */}
  </main>
  <Footer />
</div>
```
Also added a `<main>` landmark, which was likewise missing (Phase 14 semantic HTML), wrapping the layout content — matching the `<Header><main>…</main><Footer>` structure used everywhere else on the site.

**Reviewed by:** accessibility-lead agent — confirmed no duplicate landmarks, no heading-order regression, single `<main>`/`<header>`/`<footer>` per page, correct `isActiveRoute` behavior. Verdict: PASS.

---

### 1.2 — MEDIUM/HIGH — LCP hero image lazy-loaded on all 6 service/category pages
**Severity:** Medium-High (Core Web Vitals — LCP)
**File:** `frontend/src/features/services/components/HeroSection.tsx`

**Finding:** The full-bleed background image in the above-the-fold hero section — almost certainly the LCP element on these pages — was rendered via `<OptimizedImage src=... alt=... className=.../>` with no `priority` prop. `OptimizedImage`'s own logic (`loading={priority ? 'eager' : 'lazy'}`) means this defaulted to `loading="lazy"`, directly contradicting the standard "never lazy-load the LCP image" guidance: lazy-loading an above-the-fold background image can delay when the browser starts fetching it, worsening LCP.

**Fix:** Added `priority` to the hero background image:
```diff
 <OptimizedImage
   src={image?.src ?? ''}
   alt={image?.alt ?? title}
   className="w-full h-full object-cover opacity-20"
+  priority
 />
```
This is a one-prop change using an option the component already exposes for exactly this case — no new logic.

---

### 1.3 — MEDIUM — Entire app shipped as a single ~2 MB JS bundle
**Severity:** Medium (Core Web Vitals — LCP/INP, especially on mobile)
**File:** `frontend/vite.config.ts`

**Finding:** `vite build` itself flagged this: a single `index-*.js` chunk of **2,012 KB (519.5 KB gzip)** was shipped to *every* route — including simple marketing pages that never touch GSAP, Swiper, Framer Motion, React Query, or Supabase. No `manualChunks` configuration existed.

**Fix:** Added vendor chunk splitting in `build.rollupOptions.output.manualChunks`, grouping by library (react/react-dom/react-router, gsap/@gsap/react/framer-motion, swiper, @tanstack/react-query + @supabase/supabase-js, react-hook-form + @hookform/resolvers + zod). Pure build-config change — no behavior change, no functionality touched.

**Measured result:**
| | Before | After |
|---|---|---|
| Main chunk (raw) | 2,012 KB | 1,357 KB |
| Main chunk (gzip) | 519.5 KB | 322.6 KB |
| Vendor chunks | 0 (all inlined) | 5 separately cacheable chunks (react 42 KB, swiper 70 KB, forms 83 KB, animation 199 KB, data 256 KB, gzip'd smaller) |

Main payload cut by ~33% (gzip), and the vendor chunks are now independently browser-cacheable across page navigations/deploys.

---

## 2. Confirmed correct — no changes needed (verified, not assumed)

| Phase | Area | Verification method | Result |
|---|---|---|---|
| 2/3/4 | Duplicate meta description/canonical/title | Real headless-Chrome load of prerendered HTML, post-hydration DOM query (`document.querySelectorAll(...)`) across all 13 indexable routes | Exactly 1 of each, everywhere (fixed in prior session, reverified here unchanged) |
| 6 | `/support` orphan status | grep across `src/`, then rendered HTML | Fixed in prior session; nav link confirmed present |
| 6 | `/services/soft-services`, `/services/hard-services`, `hvac-maintenance`, `security-services` "orphan" flags | The repo's own static link-scanner (`scripts/seo/check-links.ts`) still flags these because it can't resolve template-literal `href={\`/services/${x}\`}` — I verified the **actual rendered HTML** (`grep href=... dist/services/*.html`) and found real, legitimate incoming links from `ServiceCategoryCard` and each category's "Included Services" block | Not orphans; false positives of the static scanner. Left unmodified per explicit instruction. Now *additionally* reachable via the header nav added in 1.1. |
| 7 | Structured data (JSON-LD) | Read `src/lib/seo/schema.ts` | Organization, LocalBusiness, WebSite, BreadcrumbList, Service, FAQPage — all built from real site data, no fabricated reviews/ratings/awards/locations. Breadcrumb schema shares a single source of truth (`buildServiceBreadcrumbs`) with the visible breadcrumb UI, so they can't drift. Valid JSON-LD (single `@graph` per page, confirmed via hydrated DOM: 1 `<script type="application/ld+json">` per page). |
| 8 | Sitemap generation | Read `scripts/seo/generate-sitemap.ts` | Built from the same single route-inventory source of truth as canonicals; only indexable (non-noindex) pages; absolute HTTPS URLs matching canonicals exactly; no duplicates, no redirect targets, no 404s. `lastmod` is set to the build date for every URL (not per-page content-change tracking) — flagged as a minor, low-priority item in §4. |
| 9 | robots.txt | Read `scripts/seo/generate-robots.ts` + generated `public/robots.txt` | `Allow: /`, only `/admin` disallowed, sitemap correctly referenced, no CSS/JS blocked. |
| 10 | URL architecture | `src/lib/seo/canonical.ts`, `src/config/index.ts`, `vercel.json` | Consistent HTTPS + `www` domain, trailing slashes stripped consistently (`trailingSlash: false` in `vercel.json` matches `buildCanonicalUrl`'s stripping), all lowercase paths, `/contact`/`/about`/`/about-us` 301-redirected to canonical equivalents. |
| 11 | Images | `find public/images` sizes, `OptimizedImage.tsx`, `src/config/images.ts` | All photographic images already WebP, largest 216 KB (reasonable); descriptive filenames; alt text descriptive and non-keyword-stuffed (validated by the pipeline's own `validate-alt-text.ts`); lazy-loading correct everywhere *except* the one case fixed in §1.2; hero images are absolutely-positioned inside height-constrained containers, so missing explicit `width`/`height` on those specific decorative full-bleed images does not cause CLS. |
| 12 | Fonts / third-party scripts | `index.html` | Google Fonts preconnected + `display=swap` (no invisible-text blocking); GA + Ahrefs analytics both `async` (non-render-blocking). |
| 13 | Open Graph / Twitter | Hydrated-DOM check across all 13 routes | Exactly 1 `og:description` and 1 `twitter:description` per page, correct page-specific `og:title`/`og:url`/`og:image`. |
| 14 | Semantic HTML (other pages) | `KargarSinglePage.tsx`, `PrivacyPolicyPage.tsx` | `<header>`, `<nav>`, `<main>`, `<footer>` already correctly used; nav is real `<a>`/`<Link>` elements, not JS-only click handlers. |
| — | 404 handling | `NotFoundPage.tsx` | Correctly `noindex, nofollow`, single `<h1>`, provides a real recovery link back into the site rather than a dead end. |
| — | Redirects | `scripts/seo/seo.config.ts` `REDIRECTS`, `vercel.json` | `/contact→/contact-us`, `/about`,`/about-us`→`/company-profile`, `/category/services`→`/services`, `/amp`→`/`, all 301/permanent. |

---

## 3. Files changed in this pass

| File | Change |
|---|---|
| `frontend/src/features/services/pages/ServicePage.tsx` | Added `Header`/`Footer`/`<main>` wrapper (see §1.1) |
| `frontend/src/features/services/pages/CategoryPage.tsx` | Added `Header`/`Footer`/`<main>` wrapper (see §1.1) |
| `frontend/src/features/services/components/HeroSection.tsx` | Added `priority` to the hero background image (see §1.2) |
| `frontend/vite.config.ts` | Added `manualChunks` vendor splitting (see §1.3) |

No content, copy, routes, business information, or structured data were changed. No new dependencies installed. No existing SEO fixes (prerendering, `/support` nav link, canonical/meta architecture) were touched or reverted.

---

## 4. Remaining recommendations (not implemented — require judgment calls, real data, or bigger scope)

1. **Further bundle reduction** — the main chunk is still ~1.36 MB (322 KB gzip) after vendor splitting. The next step would be route-level code-splitting of `CategoryPage`/`ServicePage`/`CollectionSection` (similar to how admin routes are already `lazy()`-loaded), but that risks interacting with `scripts/seo/prerender.ts`'s hydration-wait logic (`waitForHydration` waits for an `<h1>` and JSON-LD script tag) and needs its own testing pass — flagged, not attempted here to avoid destabilizing the prerender pipeline blindly.
2. **Sitemap `lastmod` accuracy** — currently set to the build date for every URL rather than true last-content-change dates. Would need git-history-based tracking per route; low priority since `lastmod` is a soft signal to crawlers.
3. **Bing Webmaster Tools verification** — `index.html` has a commented-out placeholder (`<meta name="msvalidate.01" .../>`). Needs a real token from your Bing Webmaster account; cannot be fabricated.
4. **LocalBusiness schema enhancement** — could add `openingHours`, `geo` coordinates, `priceRange` if you want richer local-pack eligibility, but only with real business data you provide — not invented here per the "no fabricated business information" constraint.
5. **Nav active-state on service/category subpages** — `isActiveRoute()` in `KargarSinglePage.tsx` doesn't highlight "Services" as active when a visitor is on a category/service detail page (e.g. `/services/hard-services/hvac-maintenance`). Purely cosmetic (shared logic touching every nav item), left unmodified per the "don't make unrelated changes" instruction — flagging for a future, deliberate pass if desired.
6. **Deployment/GSC verification** — this audit validates the generated HTML in a local production-equivalent build. It cannot confirm what Google/Bing currently have indexed, crawl-budget behavior, or real-world Core Web Vitals field data — those require Google Search Console / Bing Webmaster Tools / CrUX, which are outside this codebase's reach.

---

## 5. Validation results

| Check | Result |
|---|---|
| `npm run lint` | **0 errors**, 22 pre-existing warnings (unrelated files, not touched by this audit) |
| `npm run type-check` (`tsc -b`) | **PASS**, no errors |
| `npm run build` (SEO validators → type-check → vite build → prerender → postbuild) | **PASS**, 14/14 routes prerendered |
| SEO pipeline (`validate-canonicals`, `validate-metadata`, `validate-headings`, `validate-alt-text`, `validate-schema`, `check-links`, `validate-route-coverage`) | **All PASS** |
| robots.txt | Valid |
| sitemap.xml | Valid, 13 URLs, matches route inventory exactly |
| Hydrated DOM check (real headless Chrome, all 13 indexable routes, post-JS-execution, on the final build including all 3 fixes) | `meta[name="description"]`, `link[rel="canonical"]`, `title`, `h1`, page-level `header.kb-header`, `main`, `nav[aria-label="Main navigation"]` — exactly 1 each, on every one of the 13 routes. `og:description`/`twitter:description` also exactly 1 each (rechecked from the prior session's fix, unaffected by this pass). `a[href="/support"]` present on every route. |
| Static prerendered HTML spot-check (`dist/services/hard-services/hvac-maintenance.html` etc.) | `header=1 nav[aria-label="Main navigation"]=1 footer=1 main=1` on all 6 previously-broken service/category pages; hero image now `loading="eager" fetchpriority="high"` |
| False-positive caught and corrected during verification | Initial hydrated-DOM check flagged `header`/`footer` counts of 4 on the homepage. Investigated before reporting anything: traced to `ReviewSkeleton.tsx`'s loading-placeholder cards, which legitimately use `<header>`/`<footer>` as nested sectioning-content headers (valid HTML — they're demoted from banner/contentinfo ARIA roles because they're nested inside cards, not direct `<body>` descendants). The one real page-level `<header className="kb-header">` was confirmed present exactly once. Not a bug; re-verified with a landmark-specific query. |
| Accessibility review (accessibility-lead agent, both structural changes — nav item addition in the prior session, Header/Footer/main addition in this one) | **PASS** on both — no duplicate landmarks, no heading-order regression, correct focus/active-state handling |
| Tests | No test runner configured in this project (`package.json` has no `test` script) — nothing to run |
| Git status | `frontend/vercel.json` shows in `git status` due to line-ending mode only — `git diff` confirms zero content change |

---

## 6. Not yet live

All changes in this report are committed to the working tree / branch used in this session. Whether they've been merged to `main` and deployed to production depends on the state of that branch at the time you read this — check git log / Vercel deployment history for the actual live status before assuming these are in production.
