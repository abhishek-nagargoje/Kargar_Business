# Technical SEO Audit — November 2026

KARGAR Facility Management · https://www.kargarbusinessservices.com · audit date 2 Nov 2026
Builds on `GSC_ISSUES_AND_FIXES.md` (Oct 2026). **Changes are local and not deployed.**

## 1. Executive summary

The site's technical foundation was already mostly sound in production. Most of the GSC issues raised
were fixed in the September and October passes, and production confirms those fixes are live. This
pass found and fixed two real problems:

1. **`/home` and `/home/` returned 404.** This is a legacy pre-React URL. It now 308-redirects to `/`.
2. **`/services/hard-services` was thin.** It had about 80 words of unique copy, listed 2 of the 8
   hard-service systems KARGAR covers, did not link to the plumbing, STP or building-maintenance
   pages, and made an unsupported "civil maintenance" claim. It now carries scope, challenges,
   engagement models, process, FAQs and contextual links. The page went from 324 to 854 words, and
   every fact on it is taken from content already published on the brochure-sourced Pune
   maintenance pages.

Everything else in the brief was tested and either already correct or correct by design. The code is
technically ready. Indexing decisions remain with Google.

## 2. Existing architecture

- React 19 + Vite SPA, React Router 7, `react-helmet-async` (`src/components/seo/SEO.tsx`).
- **Build-time prerendering.** `scripts/seo/prerender.ts` uses Playwright and writes one static HTML
  file per indexable route, so the title, meta, canonical, H1, body and JSON-LD are all in the raw
  HTML.
- **Single SEO source of truth.** `scripts/seo/seo.config.ts` and `route-inventory.ts` generate
  `vercel.json` (one explicit rewrite per route, plus redirects), `public/sitemap.xml` and
  `public/robots.txt` in `prebuild`. Validators for canonicals, metadata, headings, alt text, schema,
  links and route coverage also run in `prebuild`. `postbuild` validates `vercel.json` and checks
  that every sitemap URL returns 200, is self-canonical and is indexable.
- **Vercel:** `trailingSlash: false`. There is no SPA catch-all, so unknown URLs return a real 404.
  `/admin` has `X-Robots-Tag: noindex`.
- **Regression guard:** `scripts/seo-audit.ts --strict` uses probe assertions and runs in CI.

## 3–4. GSC issue analysis and root causes

| Issue | Original condition (production, 2 Nov) | Root cause | Fix implemented | Test result | Status |
|---|---|---|---|---|---|
| A. Alternate page with proper canonical (≈10 `/contact-us?…`) | All variants 200, canonical `/contact-us`, `index,follow`. 0 `href="/contact-us?…"` links on any page | Historic crawl of CTA links that used to carry parameters (fixed Oct 2026). Every variant renders the same contact page, and the parameters only prefill the form and record attribution | None needed. The parameters still work, because clicks go through `navigateToContact` | 7 variants: 200, canonical `/contact-us`, 0 parameter links in 41 pages | NO CHANGE REQUIRED (correct state, so do not "Validate fix") |
| B. Redirect error `/privacy-policy/` | `308 → /privacy-policy` → 200, self-canonical, indexable | Not reproducible: one hop, no loop. Likely a transient fetch failure (see Oct analysis) | Probe already in the audit | 308, 1 hop, 200, canonical OK | NEEDS MANUAL VERIFICATION (GSC Validate fix) |
| B. Redirect error `/sectors/` | `308 → /sectors` → 200, self-canonical, in sitemap | Platform trailing-slash normalisation. The page exists | None needed | 308, 1 hop, 200 | NEEDS MANUAL VERIFICATION (GSC Validate fix) |
| C. Page with redirect `/services/` | `308 → /services` → 200, in sitemap without the slash | Intentional `trailingSlash:false`. Internal links already use `/services` | None needed | 308, 1 hop, 200 | NO CHANGE REQUIRED (expected report entry) |
| D. Not found `/home/` | `/home/` 308 → `/home` **404** | Legacy pre-React homepage URL, discovered externally. Not in source, git history, sitemap or internal links | Redirect `/home → /` (permanent) | `/home` 308 → `/` (1 hop). `/home/` 308 → `/home` 308 → `/` 200 (2 hops) | FIXED AND TESTED (locally) |
| E. Discovered – not indexed `/services/hard-services` | 200, indexable, self-canonical, in sitemap, content in raw HTML, **~80 words unique copy** | Thin, low-differentiation content and weak contextual linking to the rest of the maintenance cluster | Content and internal-link upgrade (see §11) | 854 words, 1 H1, 8 content H2s, 6 contextual links, 0 console errors, no mobile overflow | FIXED AND TESTED (locally). Indexing is up to Google |
| F. Crawled – not indexed `/sitemap.xml` | 200, `application/xml`, valid `<urlset>`, 41 URLs, `X-Robots-Tag: noindex` | Expected. A sitemap is not a page | None. The header was added in Oct | XML, 200, header present | INTENTIONALLY EXCLUDED (will show as "Excluded by noindex"; do not request indexing) |
| Soft 404s `/services/foo` | 404 | Fixed Oct 2026 | None | 404 | NO CHANGE REQUIRED |

## 5–7. Files modified

| File | Change |
|---|---|
| `frontend/scripts/seo/seo.config.ts` | Added the `/home → /` permanent redirect |
| `frontend/vercel.json` | Regenerated by `prebuild`. Diff is exactly one redirect entry |
| `frontend/scripts/seo-audit.ts` | Probes for `/home`, `/home/` and two more contact-parameter variants |
| `frontend/src/features/services/config/categories.ts` | Hard-services: new SEO title and description, accurate overview (removed the "civil" claim), scope of work with links, challenges, engagement models, process, FAQs, industries (added Housing Societies, Commercial Complexes, Institutes) |
| `frontend/src/features/services/config/layoutPresets.ts` | `categoryDefault` gains an optional `scope` checklist block. It only renders when a category has `operations.scopeOfWork`, so soft-services is unchanged (verified) |
| `frontend/src/features/services/domain/service.types.ts` | `Category` now extends `ExtendedEntity`, so categories can carry the same optional blocks as services |
| `frontend/src/features/services/components/FeatureGridSection.tsx` | Checklist items take an optional `href` and render the title as an underlined `<Link>`, so the link is shown by underline as well as colour |

## 8. Sitemap and robots.txt

- `robots.txt`: `Allow: /`, `Disallow: /admin`, and the sitemap declared on the www domain. CSS and JS are
  not blocked. **No change.**
- `sitemap.xml`: 41 URLs. All `https://www`, no slashes, no parameters, no redirects, no 404s, no
  noindex URLs, no duplicates. `lastmod` comes from the git commit date of each page's content source,
  never the build date. **Byte-identical** after the rebuild. The hard-services `lastmod` will update when
  this change is committed.

## 9. Canonical status

Each of the 41 indexable pages has exactly one self-referencing canonical in the raw HTML and the same
canonical in the rendered DOM. Parameter and `.html` variants canonicalise to the clean URL. The sitemap
and canonicals agree (`validate-sitemap` PASS).

## 10. Redirect status

All host and scheme variants end on `https://www…` with 200. `http://apex` takes 2 hops, and those
domain-level hops happen at Vercel before `vercel.json`. Project redirects: `/contact`, `/about`,
`/about-us`, `/category/services`, `/amp`, and now `/home`. There are no loops. The longest chain is 3
hops, from `http://apex/x/`.

## 11. Service page indexing readiness: `/services/hard-services`

| Check | Before | After |
|---|---|---|
| Status / indexable / in sitemap | 200 / yes / yes | unchanged |
| Title | Hard Facility Management \| KARGAR… | Hard Services & MEP Maintenance \| KARGAR… |
| Description | generic "enterprise facilities" | Pune, named systems, engagement models (159 chars) |
| Body words (raw HTML) | 324 | 854 |
| Content H2s | Overview, Included Services, Industries | + Scope of Work, Business Challenges, Our Solutions, Our Process, FAQs |
| Contextual links to cluster pages | 0 (footer only) | 6 (electrical, HVAC, DG/UPS, plumbing, STP, fire/BMS) |
| Unsupported claims | "civil maintenance" | removed |

Content source: `src/features/pune-landing/config/pages/maintenance.ts`, which follows the Company
Brochure p.2 scope. No new claims were introduced.

## 12–13. Local and on-page SEO

- Housing societies, a core Pune audience that was missing from the hard-services hub, are now listed
  as an industry and named in the overview and FAQs.
- The new title avoids cannibalising `/facility-maintenance-services-pune` ("Facility Maintenance in
  Pune"). The hub now targets *hard services / MEP*.
- Structured data is unchanged: Service, BreadcrumbList, and Organization/LocalBusiness from the
  existing generator. FAQPage schema was not added, because Google limits FAQ rich results to
  government and health sites, so the visible FAQs carry the value.

## 14. Performance findings

There were no console errors on the upgraded page at mobile (390px) or desktop width, and no horizontal
overflow. The new blocks are lazy, text-only sections with no new images or dependencies. A full CWV
audit was not repeated in this pass. See `docs/seo-performance-analysis.md`.

## 15. Test results (commands)

```bash
# Production baseline (2 Nov 2026)
curl -s -o /dev/null -L -w "%{http_code} hops=%{num_redirects} %{url_effective}\n" https://www.kargarbusinessservices.com/home/
#   -> 404 hops=1 …/home
curl -sI https://www.kargarbusinessservices.com/sitemap.xml | grep -iE "content-type|x-robots"

# Build (prebuild validators + tsc + vite + prerender + postbuild + validate-sitemap)
cd frontend && npm run build                       # EXIT 0, all validators PASS, 41/41 sitemap URLs 200/self-canonical
npx tsx --tsconfig scripts/tsconfig.seo.json scripts/seo-audit.ts --strict   # 60 URLs, 0 critical, 0 high

# Local server with production vercel.json routing
PORT=4190 npx tsx --tsconfig scripts/tsconfig.seo.json scripts/seo/serve-dist.ts
curl -sI http://127.0.0.1:4190/home                # 308 Location: /
```

| URL | Status | Location | Hops | Final | Canonical |
|---|---|---|---|---|---|
| `/` | 200 | – | 0 | 200 | `/` |
| `/home` | 308 | `/` | 1 | 200 | `/` |
| `/home/` | 308 | `/home` | 2 | 200 | `/` |
| `/services/` | 308 | `/services` | 1 | 200 | `/services` |
| `/sectors/` | 308 | `/sectors` | 1 | 200 | `/sectors` |
| `/privacy-policy/` | 308 | `/privacy-policy` | 1 | 200 | `/privacy-policy` |
| `/services/hard-services` | 200 | – | 0 | 200 | self |
| `/contact-us?…` (7 variants) | 200 | – | 0 | 200 | `/contact-us` |
| `/sitemap.xml` | 200 `application/xml`, `X-Robots-Tag: noindex` | – | 0 | 200 | – |
| `/robots.txt` | 200 `text/plain` | – | 0 | 200 | – |
| `/services/does-not-exist` | 404 | – | 0 | 404 | – |

## 16. Remaining problems / needs business input

- ~~Unverified statistics~~ **Resolved, see the addendum.**
- ~~`/services/soft-services` thin template~~ **Resolved, see the addendum.**
- Category H1s are just "Hard Services" or "Soft Services". This is acceptable because the title and
  overview carry the context. Changing the H1 means editing the shared hero, so it was left alone.
- The Fazier badge link redirects to the Fazier homepage, and the Facebook link can't be checked
  automatically. Both are carried over from the October report.
- Sitemap `lastmod` relies on git history at build time. Confirm that Vercel's clone depth gives real
  dates. If the build environment uses a shallow clone, `lastmod` may be omitted rather than wrong.

## 17. Manual GSC tasks (after deploying)

1. **URL Inspection → Test live URL** on `/`, `/services/hard-services`, `/housekeeping-services-pune`
   and `/contact-us`. Confirm "URL is available to Google", the user-declared canonical is the URL
   itself, and the rendered HTML includes the body content.
2. `/services/hard-services`: **Request indexing** once.
3. `/home/`: inspect it live and confirm "Page with redirect" pointing to `/`. **Do not** request indexing.
   Then go to Not found (404) → **Validate fix**.
4. Redirect error (`/privacy-policy/`, `/sectors/`): run `curl -sIL` on each, confirm a single 308 to a
   200, then **Validate fix**.
5. Sitemaps → resubmit `https://www.kargarbusinessservices.com/sitemap.xml` and confirm "Success" with
   41 discovered URLs.
6. Leave alone: "Alternate page with proper canonical" (contact parameters), "Page with redirect"
   (`/services/`) and the sitemap's "Crawled/Excluded by noindex". These describe correct behaviour. Do
   not request indexing of parameter, redirect or sitemap URLs.
7. Check back in 2–4 weeks. Validation and indexing are at Google's discretion and are not guaranteed.

## 18. Recommended next steps

1. Deploy, then run `npm run seo:audit -- --url https://www.kargarbusinessservices.com --strict`.
2. Resolve the unverified statistics (§16).
3. Apply the same content treatment to `/services/soft-services`, sourced from the housekeeping and
   security cluster pages.
4. Build genuine Pune citations and a Google Business Profile (see `OFFSITE_SEO_PLAN.md`). On a
   low-authority domain, crawl priority is now limited by links more than by on-site issues.

---

## Addendum: statistics verification and soft services (2 Nov 2026, second pass)

### Statistics checked against the approved sources

`Company Brochure.pdf` (4 pages) and `Company Profile.pdf` (18 pages) were checked twice: once through
the text layer (`pdftotext`), and once by rendering every page, because several pages are image-only.

| Claim on site | Found in sources? | Action |
|---|---|---|
| 10+ Years Experience (hard) | No. The profile says only "decades of experience" and "over the years" | Removed |
| 150+ Engineers (hard) | No | Removed |
| 99% SLA Compliance (hard) | No | Removed |
| 2,000+ Trained Staff (soft) | No | Removed |
| 5M+ Sq. Ft. Managed (soft) | No | Removed |
| 24/7 Support Available (soft) | Not in the PDFs (only in site config `companyTrust.ts`) | Replaced |
| **98% Client Retention / 95% Employee Retention** | Yes, Company Profile ("How do we know it works?") | Now shown on both category pages |
| **100% Financial Transparency** | Yes, Brochure and Profile ("The KARGAR Commitment") | Now shown on both category pages |

The industry lists on both category pages now match the brochure's "Sectors We Work In": Residential
(housing societies), Corporate, Commercial, Educational, Healthcare and Manufacturing. Unlisted sectors
(IT Parks, Warehouses, Retail & Malls, Hotels) were removed, and so was "pest control", which is not in
the brochure's soft-services list.

### `/services/soft-services`

| Check | Before (production) | After (local build) |
|---|---|---|
| Title | Soft Facility Management \| KARGAR… | Soft Facility Services in Pune \| KARGAR… |
| Description | mentioned "pest control" (unsupported) | brochure soft-service lines, Pune, one supervised team (159 chars) |
| Body words (raw HTML) | 330 | 1,015 |
| Sections | Overview, Included Services, Industries | + Scope of Work, Business Challenges, Our Solutions, Our Process, FAQs (6) |
| Contextual outbound links | 2 (Pune strip) | 9 (7 scope links to existing Pune pages, plus the Pune strip) |
| Contextual inbound links | 1 (`/services`) | 2 (adds the `/facility-management-company-pune` services table note) |

Angle: the hub explains soft services as **one site team instead of several vendors**. That uses the
Company Profile's stated pain points (multiple vendors, unstable teams, unmanaged expenses), its training
and transparency commitments, and its org-structure roles. Detailed housekeeping and security content
stays on the Pune pages it links to, so the hub doesn't duplicate them.

### Test results (second pass)

- `npx tsc -b`: exit 0. `npx eslint` on the changed areas: 0 errors (7 pre-existing "unused eslint-disable"
  warnings, identical before and after the change).
- `npm run build`: exit 0, all prebuild validators PASS (canonicals, metadata incl. title/description
  uniqueness, headings, alt text, schema, links, route coverage). `validate-sitemap`: 41/41 PASS.
- `seo-audit.ts --strict`: 60 URLs, 0 critical, 0 high, 0 non-200 internal links.
- Playwright at 390px and 1366px on both hubs and the FM pillar: one title, one canonical, one H1, no
  horizontal overflow, 0 console errors, stats render as 98% / 95% / 100%.
- Enquiry flow: the crawlable CTA `href` is `/contact-us#contact-form`. A click lands on
  `/contact-us?service=<category>&source=cta_section&cta_position=bottom`, and the form receives all
  three values.

---

## Addendum 2: page-by-page visual verification of the approved PDFs

Every page of `Company Brochure.pdf` (4 pages, A4) and `Company Profile.pdf` (18 slides) was rendered
at about 1400px and inspected visually. The earlier pass had used only the text layer and a
low-resolution contact sheet.

### Numerical claims

| # | Claim (as shown on site) | Source | Page | Evidence | Status |
|---|---|---|---|---|---|
| 1 | 98% Client Retention | Company Profile | 12 | "HOW DO WE KNOW IT WORKS? Because over the years we have seen **98%** Client retention &" | VERIFIED |
| 2 | 95% Employee Retention | Company Profile | 12 | "… **95%** Employee retention" | VERIFIED |
| 3 | 100% Financial Transparency | Brochure; Company Profile | B3; P11 | "02 100% FINANCIAL TRANSPARENCY: You have the right to ask for compensation paid to the staff deployed at your site" (B3); same text under "The KARGAR Commitment" (P11) | VERIFIED |
| 4 | 10+ Years Experience | Company Profile | 10, 12 | Only "Built on decades of experience, our proprietary PURNA … protocol" (P10) and "over the years" (P12). No figure, and it is unclear whose experience is meant. P17 describes KARGAR receiving a *Woman Startup* award (20 Sep 2024) | AMBIGUOUS (removed from category pages) |
| 5 | 150+ Engineers | Neither | all 22 | No headcount anywhere. The technician roles on P8 are listed without numbers | NOT FOUND (removed) |
| 6 | 99% SLA Compliance | Neither | all 22 | No SLA metric anywhere | NOT FOUND (removed) |
| 7 | 2,000+ Trained Staff | Neither | all 22 | The staff photos (P15–16) are not counts | NOT FOUND (removed) |
| 8 | 5M+ Sq. Ft. Managed | Neither | all 22 | No area figure anywhere | NOT FOUND (removed) |
| 9 | 24/7 Support Available (soft stat); "24x7 support" (hard FAQ) | Neither | all 22 | Not stated. B2 lists only "Breakdown maintenance coordination" | NOT FOUND (removed; FAQ reworded to breakdown coordination) |

**Figures in the PDFs that belong to clients, never to KARGAR:** "1995–2021, 26 Years of Excellence"
(Lila Poonawalla Foundation logo, P14), "An ISO 9001, 14001, OHSAS 18001 company" (Kirti Developers logo,
P13), "Since 1978" (Ganesh Bhel logo, B4), and the CIN on the Impact logo (P14). A site-wide search finds
none of them attributed to KARGAR.

### Non-numerical alignment made in this pass
- **Added façade cleaning** to the soft-services scope and FAQ. It is listed under Soft Services on B2 but
  was missing from the text extraction.
- **Removed from new copy** (not in the approved documents): "PF and ESIC handled in line with labour
  law", a vendor-changeover promise, "statutory dues", and "start with one service".
- **Replaced** the single-service FAQ with team sizing "in accordance with the size & complexity of your
  site" (P6).

### Still unverified elsewhere on the site (outside the category pages; needs a business decision)
- `src/pages/KargarSinglePage.tsx:819,824` (homepage section): "Built Over 10+ Years", "10+ years of
  experience, 10,000+ clients served, and 50+ sites managed". The 10+ years is AMBIGUOUS; 10,000+ clients
  and 50+ sites are NOT FOUND. The profile shows about 45 client logos.
- `src/features/seo/registry.ts:60` (`/company-profile` meta description): the same three figures.
- "24x7 emergency support" on `/electrical-maintenance-services-pune` and in `companyTrust.ts`; "PF & ESIC"
  in `companyTrust.ts`. These may be true, but the approved PDFs do not state them.
- "AMC and On Call Basis or Incidental" appears in the brochure's **Soft Services** column (B2). Applying
  on-call engagement to hard services, as the hub and the Pune maintenance pages do, is AMBIGUOUS. "AMC
  Management" is shown on P6.

### Re-test (after these edits)
`tsc -b` exit 0. ESLint 0 errors (same 7 pre-existing warnings). `npm run build` exit 0, all validators
PASS, sitemap 41/41. `seo-audit --strict`: 0 critical, 0 high. Raw HTML of both hubs: one H1, one
canonical, no unsupported terms. Playwright at 390px and 1366px: all PASS, 0 console errors, enquiry
parameters intact.
