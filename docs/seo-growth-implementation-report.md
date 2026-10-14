# SEO Growth — Implementation Report (Phase 2)

**Date:** 2026-10-14
**Status:** all changes are **local, uncommitted and undeployed**. The working tree also still contains the **Phase 1** fixes from `docs/seo-audit-report.md`, which are also undeployed. Deploy both together after review.
**No live rankings, indexing status or GSC metrics were observed.** Nothing here claims ranking improvement.

## 1. Initial investigation findings

| Check | Result |
|---|---|
| Prior audit | `docs/seo-audit-report.md` read. Phase 1 changes (footer hub links, 404 canonical, CategoryPage reciprocal link, validator) are present and uncommitted |
| Authoritative housekeeping page | **`/housekeeping-services-pune`**, not `/services/soft-services/housekeeping` as the brief assumed. Evidence: the content-model docs in `pune-landing/domain/types.ts` and commit `bb20519`, which removed Pune targeting from the service page to stop cannibalization. Full reasoning in `seo-keyword-map.md` |
| Search Console access | **None** (Chrome extension not connected; no API credentials) |
| Web research | Web search (US index) and direct HTTP fetch available. No keyword-volume or backlink tools |
| Canonical, robots, sitemap, Vercel | Not modified in Phase 2. No new defect found |

## 2. Changes implemented

| # | Change | Why (evidence) | File(s) |
|---|---|---|---|
| G-1 | Homepage body link "professional housekeeping services in Pune" now points to `/housekeeping-services-pune` (was `/services/soft-services/housekeeping`) | Strongest internal page was passing the primary-keyword anchor to the non-owner page. This was the only contextual exact-phrase link in the wrong direction (anchor audit across 41 pages) | `features/home/components/CompanyProfile/CompanyProfileSection.tsx` |
| G-2 | `/services/soft-services/housekeeping` title changed from "Corporate Housekeeping Service" to **"Business Housekeeping Services"** (meta keyword updated to match) | Old title collided with `/corporate-housekeeping-services-pune` and didn't match the page's own H1 ("Housekeeping Services") | `features/services/config/soft-services.ts` |
| G-3 | New "Recognition Behind the Team" section on the housekeeping pillar, generated from `recognitions.ts` | Competitor pages lead with trust proof. KARGAR's pillar had none, although KARGAR holds a documented, distinctive recognition (2024 PM-presented award; state grant). Built from the existing verified source, so no claim is reworded or invented | `features/pune-landing/config/pages/housekeeping.ts` |
| G-4 | Contact form: `type="tel"` on phone; `autocomplete` on name/email/phone/organization | Phone field opened a text keyboard on mobile; no autofill hints (also WCAG 1.3.5) | `pages/KargarSinglePage.tsx` |
| G-5 | CTA focus now moves to the first **visible** field | `querySelector('input')` matched a hidden attribution input, so focus silently failed after every "Request proposal" click (browser-verified: `focused: null` before, `name` after) | `pages/KargarSinglePage.tsx`, `features/services/hooks/useContactNavigation.ts` |
| G-6 | Subject prefill uses the last path segment of `service` | Pune CTAs pass a path, which produced "Requesting Proposal for /housekeeping Services Pune". The submitted `service` value is unchanged (attribution preserved) | `pages/KargarSinglePage.tsx` |
| G-7 | `ScrollToTop` honours URL fragments. Malformed percent-encoded fragments are treated as "no target" (added in the release review) | Pre-existing site-wide bug: it scrolled to top on initial load, overriding the browser's fragment scroll, so every `/#section` deep link landed at the top | `components/layout/ScrollToTop.tsx` |
| G-8 | Inline content links with a `#` render as plain `<a>` | Client-side `<Link>` doesn't scroll to fragments. Needed for G-3's `/#recognition` link | `features/pune-landing/components/ContentSections.tsx` |

**Deliberately not changed** (with reasons):
- **Pillar copy length/structure.** Measured against 8 competitor pages, it already leads on structure, process detail and schema (`seo-competitor-analysis.md`). Adding words wasn't justified.
- **Homepage title vs FM pillar.** Possible overlap, but no GSC data to confirm. A check is defined in `seo-performance-analysis.md`.
- **Unverified claims** ("10+ years" vs 2021 incorporation, "10,000+ clients", "PAN India", "ISO") need business confirmation (`seo-local-optimization.md` L-1…L-4).
- **WhatsApp CTA.** Needs a business-confirmed WhatsApp number.
- **Lead attribution gaps:** not fixed (backend and data-flow change). The exact trace is in §6.
- **No new pages created.**

## 3. Verification (local, 2026-10-14)

| Check | Result |
|---|---|
| `npm run build` (prebuild validators, tsc, vite, Playwright prerender, postbuild) | **Pass.** canonicals, metadata, headings, alt-text, schema, check-links, route-coverage, robots, sitemap (41 URLs) |
| `validate-sitemap` on built site (incl. Phase 1 link-hygiene + 404 checks) | **Pass** |
| `npm run lint` | 0 errors; 21 warnings, identical to baseline (pre-existing unused `eslint-disable`) |
| Pillar (`dist/housekeeping-services-pune.html`) | 1 H1, 16 H2, self-canonical, JSON-LD parses, recognition copy rendered in initial HTML |
| Generic page title | `Business Housekeeping Services \| KARGAR Facility Management` |
| Homepage → pillar anchors | 3 (footer, company-profile body, Pune links section) |
| Browser test (Chromium, 390×844, `vite preview`): pillar CTA → contact | Form at viewport top, focus on Full Name, subject "Requesting Proposal for Housekeeping Services Pune", hidden `service`/`source` preserved |
| Browser test: service-page CTA and direct `?service=…#contact-form` deep link | Same, correct |
| Browser test: `/#recognition` link | Lands on section (≈100px below the top, under the sticky header) |
| Browser test: normal navigation / page without hash | Scrolls to top as before |
| JS errors | None |
| Real form submission | **Not performed**, to avoid creating a real lead. The submit handler is unchanged |
| Accessibility | See §6 (practical browser checks in the release review). No automated a11y tool (axe/Lighthouse) is installed in the repo |

## 4. Deliverables

- `docs/seo-competitor-analysis.md`: measured competitor comparison with sources
- `docs/seo-keyword-map.md`: page ownership, intent, cannibalization watch-list
- `docs/seo-performance-analysis.md`: GSC data-request checklist (no data was available)
- `docs/seo-local-optimization.md`: NAP/claim inconsistencies, GBP checklist, citations
- `docs/seo-content-calendar.md`: 5 validated topics, 3 rejected as duplicates
- this report

## 5. Remaining actions (by owner)

| Owner | Action | Priority |
|---|---|---|
| You | Review `git diff`, then deploy Phase 1 + Phase 2 together | P1 |
| You, after deploy | `cd frontend && npx tsx --tsconfig scripts/tsconfig.seo.json scripts/validate-sitemap.ts --url https://www.kargarbusinessservices.com` should pass | P1 |
| You (GSC) | URL Inspection → Request indexing for `/housekeeping-services-pune` (content changed), `/services/hard-services`, `/services/soft-services`. Export the data in `seo-performance-analysis.md` as a baseline | P1 |
| Business | Resolve claims L-1…L-4 (years of experience, client count, cities, ISO) | P1 |
| Business (GBP) | Work through the GBP checklist; align name, phone, hours, service area | P1 |
| Business | Claim and align listings on Sulekha, IndiaMART and Justdial | P2 |
| Dev | Persist lead attribution (see §6, attribution trace) as a separate, reviewed change | P2 |
| Business + Dev | Provide real site photos for the pillar; operational detail for the hard/soft hubs | P2 |
| Content | Write guide A (vendor quality audit) and B (society tendering) per the calendar | P2 |
| You, in 4–8 weeks | Re-export GSC and compare against the baseline. Judge results by impressions, clicks and qualified enquiries, not page count | P2 |

## 6. Release review (2026-10-14)

All Phase 1 and Phase 2 changes were re-verified against the code and the production build (`dist/`, served with `vercel.json` routing emulation via `scripts/seo/serve-dist.ts`), not against these reports.

**Change inventory (what is committed):**

| Group | Files |
|---|---|
| Phase 1: technical SEO | `components/seo/SEO.tsx`, `pages/NotFoundPage.tsx`, `features/services/pages/CategoryPage.tsx`, `pages/KargarSinglePage.tsx` (footer directory), `components/layout/Footer.tsx`, `scripts/validate-sitemap.ts` |
| Phase 2: growth | `features/home/components/CompanyProfile/CompanyProfileSection.tsx`, `features/services/config/soft-services.ts`, `features/pune-landing/config/pages/housekeeping.ts`, `features/pune-landing/components/ContentSections.tsx`, `components/layout/ScrollToTop.tsx`, `features/services/hooks/useContactNavigation.ts`, `pages/KargarSinglePage.tsx` (contact form) |
| Generated | `public/sitemap.xml`: regenerated by `prebuild`; now **identical to the sitemap production serves** (the tracked copy was stale). `vercel.json` and `public/robots.txt` are also regenerated by the build but are unchanged in content |
| Documentation | the 7 `docs/seo-*.md` reports |
| Unexpected | none |

**Defect found and fixed in review:** `ScrollToTop` called `decodeURIComponent` on the URL fragment without a guard, so a malformed fragment such as `/#%E0%A4` would throw an uncaught `URIError` on page load. It's now caught and treated as "no target". Browser-verified: no error, page stays at top.

**Sitemap `lastmod` (known limitation, not changed):** `generate-sitemap.ts` dates each URL by the last commit to its *source file*. Landing pages share one file per cluster and `/services/*` pages share `src/features/services/config`. After this commit, all 9 housekeeping-cluster URLs and all 6 `/services/*` URLs will carry the commit date, although only `/housekeeping-services-pune` and `/services/soft-services/housekeeping` changed substantively. The site-wide footer change touches every page's HTML, but that's a template change. Google treats `lastmod` as a hint. Per-page dating would need a generator change (e.g. a `contentUpdated` field per page config) and should be a separate task.

**Lead attribution trace** (`ContactForm` → `submitContactMessage` → Supabase `contact_messages`):

| Value | Captured in form | Passed to `submitContactMessage` | Stored in DB | In notification email |
|---|---|---|---|---|
| `source` | ✔ hidden input | ✔ | ✔ `source` column. **But** when the URL has no `source`, the empty string `''` is stored instead of the column default `'website'`, because `input.source?.trim() ?? 'website'` only falls back on null/undefined | ✘ |
| `service` | ✔ | ✔ | ✘ **not inserted** | ✔ |
| `campaign` | ✔ | ✔ | ✘ **not inserted** | ✘ (lost entirely) |
| `category` | ✔ | ✘ `onSubmit` never reads it | ✘ | ✘ |
| `cta_position` | ✔ | ✘ `onSubmit` never reads it | ✘ | ✘ |

The table already has `metadata JSONB NOT NULL DEFAULT '{}'` (`supabase/migrations/001_core_schema.sql`), and the anon INSERT policy is `WITH CHECK (true)`. A fix therefore needs **no schema change**: pass `category`/`cta_position` from `onSubmit`, write `{ service, campaign, category, cta_position }` into `metadata`, and use `input.source?.trim() || 'website'`. Not done here: it changes what is written to production lead data and should be reviewed and tested against the Supabase project separately. The GA/Ads event (`trackFormSubmission`) already receives `service`, `source` and `campaign`.

**Accessibility (practical checks, Chromium 390×844, production build):** no axe or Lighthouse tooling is installed, so these were scripted Playwright checks. They cover the changed components only and are not a full WCAG audit.

| Check | Result |
|---|---|
| Form fields have programmatic labels (Full Name, Email, Phone, Company, Subject, Message each resolve to exactly one control) | Pass |
| Phone `type="tel"`; autocomplete `name`/`email`/`tel`/`organization` | Pass |
| Focus moves to the first visible field after a CTA | Pass |
| Footer: Tab order Services → Hard Services; focus ring appears on keyboard focus | Pass |
| Footer link contrast | 13.40:1, pass |
| Recognition section link contrast (`rgb(196,74,26)` on `rgb(248,250,252)`) | 4.62:1, passes AA for normal text (narrow margin) |
| Recognition link: focus indicator; keyboard Enter navigates to `/#recognition` and scrolls the section into view | Pass |
| No horizontal overflow at 390px on the 7 key pages | Pass |
| JS errors across all scenarios | None |

**Validation run:**

| Command / check | Result |
|---|---|
| `tsc -b` | Pass |
| `npm run build` (7 prebuild validators, vite, Playwright prerender, postbuild, `validate-sitemap` incl. new checks) | Pass |
| `npm run lint` | 0 errors, 21 warnings, **identical** to the pre-work baseline |
| Unit tests | **None exist** (`frontend/tests/` is empty; no test runner configured), so not run |
| Scripted browser verification (43 checks: routing, post-JS metadata, links, the eight improvements, a11y) | 43/43 pass |
| Real enquiry submission | Not performed (would create a production lead) |
| Secrets scan of diff and docs | Clean |

## 7. Production deployment checklist

**Deployment path:** `frontend/vercel.json` → `buildCommand: npm run build`, `outputDirectory: dist`, `framework: vite`. Deploys go through the existing Vercel Git integration, so **pushing `main` triggers a production deploy**. Don't push until the commit has been reviewed. No environment variables, DNS or Vercel settings need to change.

**Branch:** the work is committed on `seo/technical-audit-and-growth`, not `main`. Pushing that branch creates a Vercel **preview** deployment, where every check below can be run on the preview URL first. Production only changes when the branch is merged into `main` (`git checkout main && git merge --ff-only seo/technical-audit-and-growth && git push`).

**Before pushing:** review `git show --stat seo/technical-audit-and-growth`. After pushing, check that the Vercel build log shows `[validate-sitemap] PASS`. The build fails on any SEO validator error.

**After the deploy is live**, check against `https://www.kargarbusinessservices.com`:

| Area | Check | Expected |
|---|---|---|
| Full automated check | `cd frontend && npx tsx --tsconfig scripts/tsconfig.seo.json scripts/validate-sitemap.ts --url https://www.kargarbusinessservices.com` | `PASS`. Before this deploy it fails only on "404 page declares a canonical" |
| Sitemap | `curl -sI <site>/sitemap.xml` | `200`, `application/xml`; 41 `<loc>` entries |
| Robots | `curl -s <site>/robots.txt` | `Disallow: /admin` and the sitemap line |
| 404 canonical | View source of `<site>/does-not-exist` | HTTP 404, no `rel="canonical"` |
| Canonicals | View source of `/housekeeping-services-pune`, `/services/hard-services`, `/services/soft-services` | Exactly one self-referencing canonical each |
| Redirects | `curl -sI` on `/privacy-policy/`, `/services/`, `/sectors/` | Single `308` to the slash-less URL, then `200` |
| Hard / Soft Services | Footer "Company" column on any page | "Hard Services" and "Soft Services" listed under "Services"; the Hard Services hub lists the Facility Maintenance Pune page under "Serving Pune" |
| Housekeeping landing | `/housekeeping-services-pune` | "Recognition Behind the Team" section with two cards |
| Fragment navigation | Click "recognition section" on the pillar | Homepage opens scrolled to the Recognition section |
| Homepage link | Company Profile paragraph, "professional housekeeping services in Pune" | Opens `/housekeeping-services-pune` |
| Generic page title | Browser tab on `/services/soft-services/housekeeping` | "Business Housekeeping Services \| KARGAR Facility Management" |
| Contact form (**do not submit**) | On a phone: pillar "Request…" CTA | Form in view, cursor in Full Name, phone keypad on Phone, Subject "Requesting Proposal for Housekeeping Services Pune" |

**Rollback:** in the Vercel dashboard, promote the previous production deployment, or `git revert <commit>` and push.
