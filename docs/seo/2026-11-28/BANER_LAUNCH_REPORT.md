# Baner launch — release report

Prepared 27 November 2026 for the release target of **4:00 p.m. IST, Saturday 28 November 2026**.
Branch: `seo/baner-local-pages-2026-11-27`.

> **Status in one line:** the three Baner pages are built, tested, and ready on the branch. They are **not live yet.** Going live needs one owner action: merge to `main` (or deploy from Vercel). After that, run the production checks in section 7 and the Search Console steps in section 8.

---

## 1. What was audited

| Item | Finding |
|---|---|
| Framework | React 19 + Vite SPA. Every public route is **prerendered to static HTML** at build time (`scripts/seo/prerender.ts`). Vercel serves `/<path>` from `/<path>.html` through explicit rewrites in `frontend/vercel.json`. |
| Direct load of a service URL | Vercel rewrite → prerendered HTML file, so the response is HTTP 200 with the full copy, H1, title, canonical and links, before any JavaScript runs. Verified live on 27 Nov for all five starting URLs. |
| Content source | One typed config file per cluster (`src/features/pune-landing/config/pages/*.ts`). Adding a page there drives the route, prerender, sitemap, vercel.json rewrite and link checks. |
| Canonical host | `https://www.kargarbusinessservices.com`. No trailing slash (a slash URL returns 308 to the clean URL). The apex domain redirects to `www`. |
| Title template | The site appends ` \| KARGAR Facility Management` to every title. The suggested titles ending "\| KARGAR" would have shown the brand twice, so the page titles omit it. |
| robots / sitemap | `robots.txt` allows everything except `/admin`. The sitemap is generated from the route inventory: 40 URLs before, 43 after. |
| Structured data | A sitewide Organization/LocalBusiness entity (Baner office), plus per-page Service, FAQPage and BreadcrumbList. |
| Enquiry flow | Every CTA goes to `/contact-us#contact-form`, and the click records which page sent the visitor. The form preselects the service from that page and saves it in Supabase. A notification goes by EmailJS. GA4/Ads `contact_form_submit` fires only after the lead is saved, with no personal data. |
| Existing Baner intent | **No existing URL targets Baner.** No route, title, H1 or sitemap entry mentions it. Baner appears only as the office address and in "we operate from Baner" coverage sentences on the Pune pages. Those remain Pune pages. |
| Search Console baseline | **Not available.** No Search Console credentials exist on this machine, and no GSC connector was authorised. No baseline or search volume was recorded or estimated. |
| Vercel | **No access** from this session. The Vercel integration and the CLI both returned "forbidden / scope not accessible" for the project's team. |

### Discrepancies to resolve (owner)

1. **Office address form.** The website and schema say "301, 3rd Floor, Unity Commercial, Baner, Pune 411045". The Company Profile PDF says "301-302, Unity Commercial, Near Amar Business Zone". The Baner pages use the website version (the established contact page), consistent with the rest of the site. Confirm one form and use it everywhere, including Google Business Profile.
2. **`main` is behind production.** The live site shows `admin@kargar.co.in`, but `main` still has `bd@kargar.co.in`. Commit `9095ddd` (the email change) is on this branch's history but not on `main`, so production was deployed from something other than `main`. Merging this branch fixes that drift. Check which deployment is currently live before merging.

---

## 2. URL-to-keyword map (implemented)

| URL | Primary query | Related intent covered in copy | Title (as shown in Google) | H1 | Main CTA |
|---|---|---|---|---|---|
| `/housekeeping-services-baner` | housekeeping services in Baner | housekeeping agency in Baner; housekeeping company in Baner Pune; society and office housekeeping in Baner | Housekeeping Services in Baner \| KARGAR Facility Management | Housekeeping Services in Baner, Pune | Request a Housekeeping Site Survey |
| `/security-services-baner` | security services in Baner | security guard services / agency in Baner; society security guards in Baner | Security Guards in Baner, Pune \| KARGAR Facility Management | Security Guard Services in Baner, Pune | Request a Security Staffing Proposal |
| `/facility-maintenance-services-baner` | facility maintenance services in Baner | building / technical maintenance services in Baner; facility maintenance agency in Baner | Facility Maintenance in Baner \| KARGAR Facility Management | Facility Maintenance Services in Baner, Pune | Discuss Your Maintenance Requirements |

The repository's metadata validator limits titles to 31 characters before the brand suffix. That is why the security and maintenance titles are shorter than the suggested ones. The full primary phrase is in each H1 and meta description.

**What each page focuses on**

- **Housekeeping:** helps a committee write a cleaning scope. Includes an illustrative scope table (Area / What to agree / How the work is checked), office cleaning by occupancy and hours, who supplies materials, supervision and absence cover, and "What do you need from us to estimate housekeeping staff?".
- **Security:** helps a buyer define posts and shifts. Covers the survey-to-post-plan steps, an illustrative table for vehicle gate, visitor desk and patrol, supervision, records, handover and escalation, what to share for a proposal, and agency checks.
- **Maintenance:** helps a buyer define assets and who does what. Covers four kinds of work (PPM, breakdown coordination, on-site technicians, specialist/OEM work), an illustrative asset table, what shapes the proposal, and what is included versus agreed separately.

**Local evidence used:** only the verified Baner office address and office hours. There are no Baner clients, society names, testimonials, ratings, staffing numbers, visit times or landmark lists. All example tables are labelled "Illustrative".

**Facts deliberately not stated** (recorded in `review.pendingFacts` in `baner.ts`):
- KARGAR's PSARA licence number and validity. The page tells buyers to ask *any* agency for a licence, but it does not claim KARGAR has one until this is confirmed.
- Spares and consumables billing (stated as "case by case").
- Out-of-hours technician terms (stated as "agreed separately").

---

## 3. Changed files

| File | Change |
|---|---|
| `frontend/src/features/pune-landing/config/pages/baner.ts` | **New.** Content for the three Baner pages. |
| `frontend/src/features/pune-landing/config/punePages.ts` | Registers the Baner pages. `clusterPages()` excludes locality pages, so the homepage, `/services` hub, footer and "More in this topic" lists are **unchanged**. |
| `frontend/src/features/pune-landing/domain/types.ts` | Optional `locality` field. |
| `frontend/src/features/pune-landing/pages/PuneLandingPage.tsx` | Locality pages: `areaServed` = Baner (contained in Pune) instead of a new branch; curated related links only; CTA analytics carry `locality`. |
| `frontend/src/features/enquiry/components/EnquiryForm.tsx` | The Locality field is pre-filled ("Baner") when the visitor arrives from a Baner page (editable). `contact_form_submit` carries `locality`. |
| `frontend/src/features/services/hooks/useContactNavigation.ts`, `domain/navigation.types.ts` | `cta_click` event carries `locality` (analytics only, never in the URL). |
| `frontend/src/features/pune-landing/config/pages/housekeeping.ts`, `security.ts`, `maintenance.ts` | **One sentence with one link added** to each Pune parent (see section 4). Nothing else changed. |
| `frontend/scripts/seo/generate-sitemap.ts` | Sitemap `lastmod` for Baner pages comes from the last commit to `baner.ts`. |
| `frontend/public/sitemap.xml`, `frontend/vercel.json` | Regenerated by the build: +3 sitemap URLs, +3 rewrites. |
| `frontend/scripts/qa-enquiry-journey.ts` | QA now also covers the Baner pages, crawl links from Pune parents, trailing slashes and the locality pre-fill. |

---

## 4. Internal link audit

Final status = verified in the local production build (prerendered HTML, plain `<a href>`). All destinations return 200 locally and are self-canonical.

**Links into the Baner pages**

| Source URL | Anchor text | Destination | Status |
|---|---|---|---|
| /housekeeping-services-pune ("Where We Work in Pune") | housekeeping services in Baner | /housekeeping-services-baner | OK (in initial HTML) |
| /security-services-pune ("Where We Provide Security in Pune") | security guard services in Baner | /security-services-baner | OK |
| /facility-maintenance-services-pune ("What to Send for a Maintenance Quote") | facility maintenance services in Baner | /facility-maintenance-services-baner | OK |
| /housekeeping-services-baner | security guard services in Baner | /security-services-baner | OK |
| /housekeeping-services-baner | facility maintenance in Baner | /facility-maintenance-services-baner | OK |
| /security-services-baner | housekeeping services in Baner | /housekeeping-services-baner | OK |
| /facility-maintenance-services-baner | housekeeping services in Baner / security guard services in Baner | the two Baner pages | OK |

**Links out of the Baner pages** (body copy, plus breadcrumb and related links)

| Source | Anchor text | Destination | Status |
|---|---|---|---|
| Housekeeping Baner | housekeeping services in Pune (intro); breadcrumb "Housekeeping Services Pune" | /housekeeping-services-pune | OK |
| Housekeeping Baner | office housekeeping checklist | /resources/office-housekeeping-checklist | OK |
| Housekeeping Baner | how many housekeeping staff a property needs | /resources/how-many-housekeeping-staff | OK (answers the staff-estimate question) |
| Housekeeping Baner | housekeeping cost guide | /resources/housekeeping-cost-pune | OK (explains why quotes differ) |
| Housekeeping Baner | integrated facility management contract | /facility-management-company-pune | OK |
| Housekeeping Baner | Society Housekeeping in Pune; Contact Our Baner Office (related) | /society-housekeeping-services-pune; /contact-us | OK |
| Security Baner | security guard services in Pune (intro); breadcrumb | /security-services-pune | OK |
| Security Baner | society security services | /society-security-services-pune | OK |
| Security Baner | guide to choosing a security agency in Pune | /resources/how-to-choose-a-security-agency-pune | OK |
| Security Baner | integrated facility management | /facility-management-company-pune | OK |
| Maintenance Baner | facility maintenance services in Pune (intro); breadcrumb | /facility-maintenance-services-pune | OK |
| Maintenance Baner | electrical maintenance / plumbing and water systems / HVAC maintenance | the three Pune detail pages | OK (each system is discussed in the asset table) |
| Maintenance Baner | building maintenance services | /building-maintenance-services-pune | OK |
| Maintenance Baner | integrated facility management contract | /facility-management-company-pune | OK |
| All three | hero and bottom CTA buttons | /contact-us#contact-form | OK (service and Baner pre-filled) |

Sitewide check: `/`, `/services`, `/contact-us`, `/sectors`, `/resources` and the footer contain **no** Baner links. No locality keyword block was added anywhere.

**External links: none added (decision recorded).**
- Office map: the live contact page has no verified map link to reuse, and creating one would add an unverified destination. Skipped.
- PSARA / government source: the security page mentions the Act only as something buyers should check. A regulator link would not prove anything about KARGAR, and the official destination was not verified in this session. Skipped.
- No backlinks or directory submissions.

---

## 5. Pune pages: before and after

The live HTML from 27 Nov was compared with the new build.

| Page | URL | Title | H1 | Canonical | Main copy |
|---|---|---|---|---|---|
| /housekeeping-services-pune | same | same | same | same | +1 sentence with a link |
| /security-services-pune | same | same | same | same | +1 sentence with a link |
| /facility-maintenance-services-pune | same | same | same | same | +1 sentence with a link |
| /facility-management-company-pune | same | same | same | same | no change |

---

## 6. Tests run (local production build)

| Check | Result |
|---|---|
| `tsc -b` type check | Pass |
| ESLint on changed files | Pass |
| SEO pipeline (governance, canonicals, metadata, headings, alt text, schema, link check, route coverage) | Pass |
| `npm run build` with prerender | Pass: 44/44 routes prerendered |
| Postbuild (vercel.json, no raw markdown links) | Pass |
| Sitemap validator: every sitemap URL is 200, self-canonical and indexable | Pass (43 URLs) |
| QA harness `scripts/qa-enquiry-journey.ts` | **111/111 pass** |
| ...at 360px and 1280px: HTTP 200 on direct load, 1 H1, self canonical, no horizontal overflow, visible CTA, tel link | Pass, all 3 Baner pages |
| ...raw HTML without JavaScript contains title, copy and links | Pass (about 1,060 to 1,240 words in `<main>`, including FAQ and links) |
| ...trailing slash `/…-baner/` returns 308 to the clean URL | Pass |
| ...Pune parent links to the Baner page in initial HTML | Pass, all 3 |
| ...enquiry journey from each Baner page: service preselected, **Baner pre-filled**, lead saved with page + team, email summary, success message, no personal data in analytics | Pass, all 3 (Supabase and EmailJS intercepted, **no real leads created**) |
| ...empty submit blocked; database failure shows an error | Pass |
| Accessibility review of the changed UI (headings, tables, link text, form label) | Pass: no WCAG 2.2 AA issues found |

Screenshots are in the QA output folder (not committed).

---

## 7. Release status (one row per page)

| Production URL | Primary query | Live HTTP status | Canonical | Sitemap presence | Verified incoming link | Enquiry CTA result | Indexing request | Observed Google index status |
|---|---|---|---|---|---|---|---|---|
| https://www.kargarbusinessservices.com/housekeeping-services-baner | housekeeping services in Baner | **404 today (not deployed)** | self (local build) | in built sitemap (local) | /housekeeping-services-pune (local) | pass (local, mocked backend) | **not submitted** | not checked: page not live |
| https://www.kargarbusinessservices.com/security-services-baner | security services in Baner | **404 today (not deployed)** | self (local build) | in built sitemap (local) | /security-services-pune (local) | pass (local, mocked backend) | **not submitted** | not checked: page not live |
| https://www.kargarbusinessservices.com/facility-maintenance-services-baner | facility maintenance services in Baner | **404 today (not deployed)** | self (local build) | in built sitemap (local) | /facility-maintenance-services-pune (local) | pass (local, mocked backend) | **not submitted** | not checked: page not live |

Published, submitted, indexed and ranked are separate facts. As of this report, **none** of the three is true for production.

### After deployment: production checks (about 5 minutes)

For each Baner URL:
1. Open the URL directly, then refresh. It should load the page, not a 404.
2. Run `curl -sI <url>` and confirm `HTTP/2 200` with no `X-Robots-Tag: noindex`.
3. View the page source. The H1, the copy, `<link rel="canonical" href="<same url>">` and the link back to the Pune page should all be in the HTML.
4. Open `https://www.kargarbusinessservices.com/sitemap.xml` and confirm the three URLs are listed.
5. On the Pune parent page, click the new Baner link. Then on the Baner page, click the CTA. The form should show the right service and "Baner". **Do not submit a test lead on production.**

---

## 8. Search Console (owner action)

This session had no Search Console access, so nothing was inspected or submitted. After the production checks pass, for **each** URL above:

**URL Inspection → paste URL → Test Live URL → (if available) Request Indexing.** Do this once per URL; repeating the request does not help.

Then open **Sitemaps** and confirm `https://www.kargarbusinessservices.com/sitemap.xml` shows a recent "Last read" date. If it doesn't, resubmit the sitemap.

Record the date and time of each request in the table in section 7.

---

## 9. Measurement plan

Do not change the pages before day 28 unless something is broken.

| Day (after go-live) | Search Console (Performance → filter Page = exact URL) | Analytics |
|---|---|---|
| 7 | Is each page indexed (URL Inspection)? Any impressions yet? Note the queries. | `cta_click` events where `page_path` is a Baner URL |
| 14 | Impressions, clicks, CTR and average position per Baner page. Query filter "baner": which URL appears for each query, the Baner page or the Pune page? | `contact_form_submit` with `locality = Baner` |
| 28 | Same metrics. Compare the Pune pages over the same 28 days against the 28 days before launch. Are city queries still landing on the Pune pages? | Qualified enquiries (form submissions confirmed by sales) kept **separate** from call and WhatsApp clicks |

Use data before recommending changes. If a Baner query still shows the Pune page after 28 days, check the internal links and content overlap before rewriting anything.

---

## 10. Next localities (planning only)

These are candidates, not commitments. Each one needs evidence before a page is built.

| Candidate | Why it is a candidate | Missing evidence |
|---|---|---|
| Balewadi | Next to Baner, close to the office | Search Console demand; actual enquiries or sites there |
| Aundh | Next to Baner | Same |
| Wakad / Hinjewadi | West-side business district (the pages already say "western business districts"; the form placeholder names Hinjewadi) | Demand data; confirmation of active sites |
| Kharadi | East-side business district (the pages say "eastern business districts") | Demand data; confirmation that KARGAR serves it |

**Before the next batch:** export Search Console queries containing locality names, and export the "Locality or area" values from saved leads (Supabase `contact_messages.metadata.details`). Build pages only where both demand and real delivery exist. Do not generate every service-by-locality combination.
