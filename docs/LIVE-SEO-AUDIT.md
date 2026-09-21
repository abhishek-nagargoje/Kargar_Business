# Live Production SEO Verification — KARGAR Facility Management

**Date:** 2026-09-21
**Domain:** https://www.kargarbusinessservices.com/
**Scope:** Verification of the internal-linking deploy already live in production, a full brand-consistency sweep of both production output and source code, and re-diagnosis of all previously reported GSC issues against live URLs. No broad new SEO work was done — this is a targeted verification + fix pass, per instruction.

---

## 1. Critical finding: brand-name casing did not fully deploy — root cause is a Vercel environment variable

**Status: FIX REQUIRED (code fixed and ready; one manual Vercel action still needed)**

Live production still shows the old casing **"Kargar Facility Management"** (not "KARGAR Facility Management") in:
- `<title>` on every page (e.g. `Facility Management Company | Kargar Facility Management`)
- `og:title`, `twitter:title`
- JSON-LD `Organization.name` (`"name":"Kargar Facility Management"`)

This happens **even though** the code-level default (`config.siteName` in `frontend/src/config/index.ts`) was already changed to `"KARGAR Facility Management"` in the earlier session and that commit is live (confirmed — the internal-linking changes from the same commit, like the homepage service links and the privacy-policy footer link, are all live).

**Root cause, verified:** `getEnvVar('VITE_SITE_NAME', 'KARGAR Facility Management')` reads `import.meta.env.VITE_SITE_NAME` first and only falls back to the code default if that env var is unset. `frontend/.env.example` documents `VITE_SITE_NAME=Kargar Facility Management` (old casing) as the value to set — this is almost certainly literally set in the Vercel project's environment variables (Project Settings → Environment Variables), baked into the production build at build time, silently overriding the code default. This is **not a bug in the pushed code** — it's a project-level config value that lives outside the git repo (env vars are correctly not committed) and therefore couldn't be fixed by any commit.

**What was fixed in this pass:**
- `frontend/.env.example` updated: `VITE_SITE_NAME=KARGAR Facility Management` (documentation fix, so a future fresh setup gets the right default).
- **Manual action required from you:** In the Vercel dashboard, open the project deploying this site → Settings → Environment Variables → find `VITE_SITE_NAME` → change its value to `KARGAR Facility Management` → redeploy (env var changes require a new build; a redeploy of the existing commit is enough, no code change needed). I do not have access to that Vercel project from this session's connected account (confirmed — see prior conversation) and cannot make this change myself.

**Validation once fixed:** re-run `curl -s https://www.kargarbusinessservices.com/ | grep -o '<title>[^<]*</title>'` — should read `...| KARGAR Facility Management`.

---

## 2. Brand consistency sweep

Searched all of production-rendered HTML (13 routes) and the full source tree for `Kargar Business Services`, `Kargar Business`, and bare `Kargar`.

### 2a. Old full brand name ("Kargar Business Services")
**Status: PASS** — zero occurrences anywhere in source or rendered output, except:
- `frontend/public/assets/documents/Company Brochure.pdf` — a binary PDF, cannot be safely text-edited by this tooling. **Action required from you:** regenerate/re-export this PDF from its original source file with the updated brand name.

### 2b. Real bug found and fixed: wrong company name entirely
**Status: FIX REQUIRED → FIXED**
`frontend/src/features/reviews/components/ReviewSubmissionForm.tsx` had a review-consent checkbox reading *"I allow **Kargar Construction** to use my review and media for marketing purposes..."* — a completely different company name, unrelated to facility management, almost certainly copy-pasted from another project's template. This is legal/consent text on the public review submission form. **Fixed** to "I allow KARGAR Facility Management to use my review and media...".

### 2c. Bare "Kargar" (correct company, inconsistent casing)
**Status: FIX REQUIRED → FIXED.** ~25 occurrences of bare `Kargar` (not the old full name, just inconsistent title-case) were found and standardized to `KARGAR` across: header/footer aria-labels, the BrandLogo alt text, all 4 social-link aria-labels, the sectors-page intro copy, service-page CTA/feature-section headings, review-carousel copy, FAQ questions, document download filenames, and review-list fallback labels. Full file list in §6.

**Left unchanged, correctly:**
- `x.com/Kargar_Business` and the Facebook profile URL slug `Kargar-Facility-and-Security-Services-PVT-LTD` — these are the actual external social-profile URLs/handles; renaming the visible label text doesn't require (and must not touch) the real external URL.
- Code identifiers (`KargarSinglePage`, `KargarButton`, `kb-logo` CSS class, etc.) — internal symbol names, not rendered text, out of scope.
- `frontend/src/features/people/mentors/*` — this feature is not routed anywhere in `App.tsx` (unreachable, dead code); left untouched.
- `frontend/src/components/layout/Footer.tsx` and `Navbar.tsx` — unused/unimported components (dead code, confirmed via repo-wide import search); left untouched.

---

## 3. Live route-by-route verification

All 13 routes requested directly against production (`curl`), not source code.

| Route | HTTP | Canonical | Robots | Title (brand suffix pending env-var fix) | H1 present | JSON-LD | Sitemap |
|---|---|---|---|---|---|---|---|
| `/` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/services` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/sectors` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/services/hard-services` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/services/hard-services/electrical-maintenance` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/services/hard-services/hvac-maintenance` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/services/soft-services` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/services/soft-services/housekeeping` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/services/soft-services/security-services` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/company-profile` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/contact-us` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/support` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |
| `/privacy-policy` | 200 | self | index,follow | ✓ | ✓ | 1 node | ✓ |

All 13 routes: **PASS** on status/canonical/robots/H1/JSON-LD/sitemap. Title text is correct in structure, pending only the brand-suffix env-var fix in §1.

No trailing-slash inconsistency: every internal link in the rendered HTML uses the no-slash form; only externally-initiated trailing-slash requests hit the (correct, single-hop) redirect.

No broken internal links found (every `href`/`to` in the 13 pages resolves to a real, `200` route — cross-checked against `scripts/seo/check-links.ts`, which fails the build on any unknown target and currently passes).

No tracking-parameter URLs found as **primary** navigation destinations — confirmed the main nav's "Contact Us" link is the clean `/contact-us` (fixed in the prior session), while CTA buttons intentionally retain `source=`/`cta_position=` params for attribution, none of which appear in `sitemap.xml` or as a `canonical` target anywhere.

---

## 4. Contact-us parameter audit (Phase 4)

| Link location | URL pattern | Correct? |
|---|---|---|
| Main site nav "Contact Us" | `/contact-us` (clean) | ✅ Correct — primary navigation |
| Header "Request Proposal" button | `/contact-us?source=header&cta_position=navbar#contact-form` | ✅ Correct — CTA attribution, not primary nav, not in sitemap, self-canonicalizes |
| Homepage hero CTA | `/contact-us?source=homepage&cta_position=hero#contact-form` | ✅ Correct — same pattern |
| Support-band CTA | `/contact-us?source=support_band&cta_position=footer-cta#contact-form` | ✅ Correct |
| Category cards (hard/soft) | `/contact-us?category=hard&source=category_card_hard#contact-form` etc. | ✅ Correct |

All parameterized variants self-canonicalize to `/contact-us` (verified live) and are absent from `sitemap.xml` (verified live). No change needed — this matches the brief's own Phase 8 allowance for technically-necessary attribution parameters.

---

## 5. Sitemap verification (Phase 5)

```
GET /sitemap.xml → 200, Content-Type: application/xml
```
Contents (13 URLs, verified live): `/`, `/services`, `/sectors`, `/company-profile`, `/support`, `/contact-us`, `/privacy-policy`, `/services/hard-services`, `/services/soft-services`, and the 4 leaf service pages. No redirects, no 404s, no parameter URLs, no duplicates — every entry matches its page's live self-canonical exactly. `robots.txt` correctly references it (`Sitemap: https://www.kargarbusinessservices.com/sitemap.xml`), verified live. **PASS.**

---

## 6. Internal link graph (Phase 8) — production, verified live

Downloaded all 13 indexable pages' live rendered HTML and counted real `href` occurrences (not source-code guesses):

| Route | Incoming link occurrences | Distinct source pages |
|---|---|---|
| `/` | 35 | 12 |
| `/services` | 20 | 12 |
| `/sectors` | 13 | 12 |
| `/company-profile` | 12 | 12 |
| `/support` | 12 | 12 |
| `/contact-us` | 12 | 12 |
| `/privacy-policy` | 12 | 12 |
| `/services/hard-services` | 6 | 5 |
| `/services/soft-services` | 3 | 3 |
| `/services/hard-services/electrical-maintenance` | 4 | 3 |
| `/services/hard-services/hvac-maintenance` | 5 | 4 |
| `/services/soft-services/housekeeping` | 10 | 6 |
| `/services/soft-services/security-services` | 5 | 4 |

**Orphan pages:** none. **Pages with only 1 incoming link:** none. **Pages deeper than 2 clicks from Home:** none. **Broken internal links:** none found. **Redirecting internal links:** none (all internal `href`s point directly to the no-slash canonical form). **Canonical-mismatch links:** none. **Parameterized links used as primary destinations:** none (only CTA buttons, correctly). This confirms the internal-linking fixes from the prior deploy (`hvac-maintenance`, `security-services`, and `/privacy-policy` previously being shallow/orphaned) are live and working as designed.

---

## 7. Hard Services deep-dive (Phase 7)

`/services/hard-services`: **PASS.**
- Indexable: `robots: index, follow`, canonical self-referencing, in sitemap.
- Title/description/H1: all present, correct, unique.
- Incoming links: 6 occurrences / 5 distinct source pages (up from a single incoming link before the fix) — homepage services grid, homepage "Most Requested" card list, both child pages' breadcrumbs, and the Company Profile page.
- Outgoing links: to `/services/hard-services/electrical-maintenance` and `/services/hard-services/hvac-maintenance` (its two real children), confirmed live.
- Click depth: 1 click from Home.

**Conclusion: the previously-reported weak internal-link depth is confirmed fixed and live.** Remaining "Discovered — currently not indexed" status in GSC (if still showing) is a stale report awaiting recrawl, not a live technical issue — see `GSC-REMEDIATION.md`.

---

## 8. Pune SEO landing pages (Phase 9) — inspection only, none created

Checked live production for all 6 proposed Pune pages — **none exist** (all return `404`):
`/housekeeping-services-pune`, `/commercial-housekeeping-services-pune`, `/corporate-housekeeping-services-pune`, `/industrial-housekeeping-services-pune`, `/society-housekeeping-services-pune`, `/facility-management-company-pune`.

Per explicit instruction, **no pages were created in this pass.** This matches the scope decision from the prior session (deferred pending your go-ahead, since each page requires ~1,500–2,500 words of genuine, non-duplicated operational content — not something to generate speculatively). If/when you want to proceed, the existing `/services/soft-services/housekeeping` page already targets "Housekeeping Services in Pune" as its primary keyword — a dedicated `/housekeeping-services-pune` page would need a clearly distinct search intent (e.g., broader/more location-specific than the product-page-style housekeeping service page) to avoid cannibalizing that existing ranking page, per the brief's own Phase 33 anti-cannibalization rule.

---

## 9. Test results

```
npm run build   → PASS (SEO pipeline validators: canonicals, metadata, headings, alt-text,
                  schema, links, route-coverage — all PASS; 14/14 routes prerendered)
npm run lint     → PASS (0 errors, 22 pre-existing warnings, unrelated to this session's files)
npx tsc -b       → PASS (no type errors)
```

---

## 10. Exact files changed in this pass

- `frontend/.env.example` — documented `VITE_SITE_NAME` corrected to `KARGAR Facility Management`
- `frontend/src/features/seo/registry.ts` — 7 meta descriptions: bare "Kargar" → "KARGAR"; FAQ question casing on soft-services (see below)
- `frontend/src/features/reviews/components/ReviewSubmissionForm.tsx` — fixed wrong company name "Kargar Construction" → "KARGAR Facility Management" in review-consent text
- `frontend/src/pages/KargarSinglePage.tsx` — 5 aria-labels/alt text + 1 visible sectors-page sentence, casing fixed
- `frontend/src/config/socialLinks.ts` — 4 social-link aria-labels, casing fixed
- `frontend/src/components/ui/BrandLogo.tsx` — logo alt text, casing fixed
- `frontend/src/services/reviews.service.ts`, `frontend/src/services/admin.service.ts` — review fallback label "Kargar client" → "KARGAR client"
- `frontend/src/config/documents.ts` — 2 download filenames, casing fixed
- `frontend/src/features/admin/pages/AdminReviewsPage.tsx` — admin-only recommendation label, casing fixed
- `frontend/src/features/reviews/components/ReviewsCarousel.tsx` — visible copy, casing fixed
- `frontend/src/features/services/components/FeatureGridSection.tsx` — visible section heading, casing fixed
- `frontend/src/features/services/components/CTASection.tsx` — visible CTA copy, casing fixed
- `frontend/src/features/home/components/CompanyProfile/DocumentShowcaseCard.tsx` — visible decorative label, casing fixed
- `frontend/src/features/services/config/soft-services.ts` — 3 FAQ question strings, casing fixed

**Not changed:** any route, redirect, canonical rule, sitemap generator, or robots.txt logic — all of those were verified correct against live production, not modified. No new pages created.

---

## 11. Exact URLs affected

All 13 indexable routes get the corrected `<title>`/OG/Twitter/JSON-LD brand name once the Vercel env var is updated and redeployed (§1). The `/` homepage, `/services`, `/sectors`, `/support`, `/contact-us`, and the `soft-services/housekeeping` FAQ block additionally get corrected body-copy casing (`KARGAR` instead of `Kargar`) once this commit is deployed. The review-submission form (rendered wherever `ReviewSubmissionForm` appears, e.g. on the reviews section) gets the corrected consent text.

---

## 12. Remaining GSC issues (none are code bugs)

See `docs/GSC-REMEDIATION.md` for the full table. Summary: **0 issues requiring further code changes.** All 7 originally-reported issue groups are either `PASS` (working as intended) or `MONITOR` (correct behavior, waiting on Google's recrawl to clear a stale report). **1 manual GSC action** recommended (request indexing on 3 specific URLs) and **1 manual Vercel action required** (the `VITE_SITE_NAME` env var, §1) — neither is a code fix.

I am not claiming Google has indexed or re-evaluated any of these URLs — that requires your own Search Console data, which this session has no access to.
