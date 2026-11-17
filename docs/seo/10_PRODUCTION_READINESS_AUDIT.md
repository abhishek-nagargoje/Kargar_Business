# 10 — Final Production-Readiness Audit

**Date:** 2026-11-17 · **Scope:** working tree (uncommitted, not deployed). The local build `frontend/dist` was built after the last source edit. Live production (`https://www.kargarbusinessservices.com`) served as the pre-change baseline.
**Method:** an automated static audit of every prerendered page, Playwright browser checks, and a field-by-field comparison of live and local pages. All network writes to Supabase and EmailJS were intercepted, with a context-wide guard aborting any unmocked write. **No real lead or email was created.**

## Verdict (updated after the remediation pass, see §Remediation)

**Engineering-ready to commit and deploy.** R1, R3, R4 and R7 are fixed; an accessibility defect found in review (A1) is fixed and guarded in the build; a skip link was added site-wide. Two items stay open because only the business can resolve them: **R2 (PSARA licence status)** and **R5 (HVAC/electrical equipment claims on the #1-ranking HVAC page)**.

## Remediation pass (2026-11-17)

| ID | Fix | Files | Verified by |
|---|---|---|---|
| R1 | `/services/soft-services/security-services` retitled **"Security Service Scope & FAQs"** with a scope-focused description and keywords, so it no longer competes with `/corporate-security-services-pune` or the security pillar | `src/features/services/config/soft-services.ts` | Regression diff: the only title change sitewide; metadata validator PASS |
| R3 | Removed "psychological profiling", "armed guards can be arranged", "Rapid Deployment … threat levels", "rapid response", "Advanced Training". Replaced with documented facts (police verification, Field Trainer/Quality Manager training, supervised posts, written post instructions, logs). Armed-guards FAQ replaced with a police-verification FAQ | `soft-services.ts` | 0 occurrences in built HTML |
| R4 | Removed "ISO-Aligned Processes", "eco-friendly / non-toxic" products, "industry-leading equipment", the eco FAQ, and the undocumented sectors IT Parks, Retail & Malls and Hotels & Hospitality on the housekeeping detail page. Replaced with PF/ESIC compliance, payroll transparency and the documented sectors | `soft-services.ts` | 0 occurrences in built HTML |
| R4b | `/services` hero tile "Sustainable Practices: Eco-friendly Solutions" → "Payroll Transparency: Staff Pay You Can Verify" (documented commitment) | `src/pages/KargarSinglePage.tsx` | Built HTML |
| R4c | Electrical detail: "certified technicians" / "Certified Technicians: Fully licensed" → "trained technicians" (documented training). Undocumented sectors IT Parks and Retail & Malls replaced on both hard-services detail pages. Unrendered `iso-compliance`/`sla-driven` capability tags removed from service data | `src/features/services/config/hard-services.ts`, `soft-services.ts` | Built HTML |
| R7 | Industrial page: "is generally treated as the principal employer" (consistent with the guide) | `src/features/pune-landing/config/pages/security.ts` | — |
| **A1** | **Accessibility defect (serious, WCAG 1.3.1/2.4.4)** from the accessibility review: the dark column of the `compare` block printed `[anchor](/path)` as raw text, losing the link. Affected `/corporate-security-services-pune` and `/housekeeping-services-pune`. It now renders through `<Inline>` with white, underlined links (contrast-safe on navy) | `src/features/pune-landing/components/ContentSections.tsx` | Browser: real `<a>`, white + underline, no raw markdown |
| A1-guard | New build gate: `postbuild` fails if any prerendered page shows raw `[text](/path)`. Proven to fail on the pre-fix build (it caught both leaks) and pass on the fixed one | `scripts/seo/postbuild.ts` | Build log |
| A2 | Skip link "Skip to main content" (WCAG 2.4.1) in the shared header; `id="main-content" tabIndex={-1}` on all 7 public `<main>` elements; dedicated CSS so it shows on focus (the project's unlayered `.sr-only` would override Tailwind's `focus:not-sr-only`) | `src/pages/KargarSinglePage.tsx`, `src/styles/index.css`, 6 page files | Keyboard test on 7 page types: first Tab shows the link; Enter moves focus to `#main-content` |
| A3 | Related/Keep Reading pill hover text orange-600 → orange-700 (4.4:1 → about 5:1 on navy-50) | `PuneLandingPage.tsx`, `GuidePage.tsx` | — |

**Re-verification on the final build:** `tsc -b` pass · ESLint 0 errors (21 pre-existing warnings) · all SEO validators PASS · build pass, 45/45 prerendered, 44/44 sitemap URLs 200 and self-canonical · strict audit 0 critical / 0 high · 0 broken internal links · titles, descriptions, canonicals and H1s unique · FAQ JSON-LD matches the visible text · all 44 pages at 320px and 375px with 0px overflow and no JS errors · CTA → form attribution and intercepted submissions pass on all new pages; the DB-failure path shows an error · regression diff: ranking pages unchanged, no H1/canonical/robots change anywhere.

**Build environment note:** one build attempt failed with "JavaScript heap out of memory" during prerendering because the machine had about 440 MB of RAM free (headless Chromium crashed). Stopping 4 orphaned Playwright `chrome-headless-shell` processes and retrying gave clean passes. Vercel build machines are not affected, but local builds need about 1 GB free.

## Still open (business decisions only)

| ID | Item | What is needed |
|---|---|---|
| R2 | PSARA licence status | Confirm before deploy. If licensed, send the licence number and validity, and a licence block plus LocalBusiness detail will be added to the security pages. If not licensed, the PSARA buyer-checklist items should be removed and legal advice taken on guard supply |
| R5 | `/hvac-maintenance-services-pune` (ranks #1–2) and the HVAC/electrical detail pages: chillers, cooling towers, split/cassette ACs, IAQ testing, HT panels, transformers; also "IT Parks" / "Retail & Malls" on the HVAC Pune page | Confirm or deny each item. Only the false strings will be edited, keeping the title, H1 and URL |
| R8 | Real photographs for the security and housekeeping pages | Upload via the admin Media Library |
| — | 13px first paragraph on 5 homepage-family pages; duplicate "Which sectors does KARGAR serve?" FAQ on `/sectors` and the FM pillar | Optional polish, pre-existing |

## Results by check

| # | Check | Result |
|---|---|---|
| 1 | New URLs | `/corporate-security-services-pune`, `/industrial-security-services-pune`, `/resources/how-to-choose-a-security-agency-pune`: each returns 200, is prerendered, has one H1, is self-canonical and `index, follow` |
| 2 | Reachability | Each new page: footer directory on 43 pages, `/services` and `/resources` hubs, plus contextual links from 8, 9 and 4 pages respectively. All 9 changed pages are linked from 11–20 pages in body content. No orphans |
| 3 | Internal links | 2,834 internal `<a href>` across 44 pages resolved against the build: **0 broken**. Breadcrumb JSON-LD targets: 0 broken |
| 4 | Title / description / canonical / H1 | All 44 pages unique on all four fields. Canonicals absolute, `www`, no trailing slash |
| 5 | Sitemap | 44 URLs = 41 live + 3 new; none dropped. All 200, self-canonical and indexable (`validate-sitemap`) |
| 6 | Prerender / indexable | 45/45 routes prerendered; every sitemap URL has static HTML with `<main>`, metadata and JSON-LD in the initial response |
| 7 | JSON-LD | Valid JSON on every page. Organization + BreadcrumbList everywhere; Service on every landing page; Article on guides. FAQPage questions and answers match the visible FAQ text (one false positive from the audit script's text matching on an untouched plumbing FAQ). No rating, licence or certification properties |
| 8 | Duplicates | No duplicate FAQ within a page. One question appears on two pages: "Which sectors does KARGAR serve?" on `/sectors` and the FM pillar (pre-existing, low risk). No duplicated paragraphs between landing pages. Repeats are limited to hub card summaries and the shared guide CTA |
| 9 | CTAs and forms | 12 new/changed pages: 2 in-page CTAs each (guide: 1, the shared guide design), 2 `tel:` links and 1 `mailto:`. Each CTA opens the form with `service` + `cta_position`. From each new page: empty and invalid-email submits are blocked; a valid submit saves `metadata` (`service`, `cta_position`), prefills the subject, shows the success toast and resets the form. Database failure shows "Unable to submit your request", keeps the input and fires no success event. WhatsApp: no WhatsApp link on these pages (unchanged from before) |
| 10 | Mobile | All 44 pages at 320px and 375px: 200, **0px horizontal overflow**, no elements overflowing outside intentional scroll regions, no JS errors. Tables scroll inside a labelled, keyboard-focusable region (existing pattern). Note: the first paragraph on `/`, `/services`, `/sectors`, `/company-profile` and `/support` renders at 13px (pre-existing homepage component, not touched) |
| 11 | Company claims | See §Claims |
| 12 | Existing rankings | Of the 41 live pages, **no title, H1, canonical or robots value changed** and **no FAQ was removed**. 33 pages are completely unchanged. Of the 9 tracked ranking pages, 7 are unchanged in every measured field. `/office-housekeeping-services-pune` has a new description and +1 FAQ; `/facility-management-company-pune` has +3 sections and +2 FAQs (title and H1 kept). Only one H2 was removed sitewide: "What Our Pune Security Service Covers" on the security pillar, replaced by the roles table and property-type sections. That page was not ranking |

## Remaining issues

| ID | Severity | Issue | Recommendation | Introduced by this work? |
|---|---|---|---|---|
| **R1** | **High (fix before deploy)** | `/services/soft-services/security-services` has the SEO title **"Corporate Security Services"**. It now competes for the same query as the new `/corporate-security-services-pune`. The validator only blocks identical titles | Retitle the detail page to a non-competing title such as "Security Guard Service Details" and adjust its description. It remains linked from the security pillar | Yes (overlap created by the new page) |
| **R2** | **High (business)** | **PSARA licence status is undocumented.** The new guide and pillar tell buyers to ask any agency for its PSARA licence and list "cannot show a PSARA licence" as a warning sign. If KARGAR cannot show one, this content works against KARGAR | Confirm before deploy if possible. If licensed, publish the licence number and validity on the security pages. If not, remove the PSARA checklist items and get legal advice on guard supply | Yes (content), but the underlying compliance question pre-dates it |
| **R3** | **High (business, pre-existing)** | Unverified security claims on `/services/soft-services/security-services`: **"psychological profiling"**, **"armed guards can be arranged"** (needs an arms-licensed agency), "Rapid Deployment … based on threat levels", "Advanced Training in conflict resolution" | Remove or confirm each one. Armed guards and psychological profiling are the most serious | No |
| R4 | Medium (pre-existing) | "ISO-Aligned Processes" on `/services/soft-services/housekeeping`. The content plan lists "ISO-aligned" as unverifiable | Remove unless there is ISO documentation | No |
| R5 | Medium (pre-existing) | HVAC/electrical claims not in the brochure (chillers, cooling towers, split/cassette ACs, IAQ testing, HT panels, transformers, "certified/fully licensed technicians", IT Parks, Retail & Malls) | Business to confirm each one. Edit only the strings that are false; `/hvac-maintenance-services-pune` ranks #1–2 | No |
| R6 | Low | Sitemap `lastmod` for the 2 new security pages shows 2026-11-02 (last commit of `security.ts`) until committed | None needed: Vercel builds from the commit and will stamp the commit date. Do not hand-edit | Yes (expected) |
| R7 | Low | Industrial page says the plant "is the principal employer"; the guide says "generally treated as". Slight inconsistency in legal phrasing | Align to "is generally treated as the principal employer" | Yes |
| R8 | Low | All four security pages share the same hero/OG image (generic stock) | Upload real KARGAR photos per page via the Media Library | Partly |
| R9 | Low (pre-existing) | Duplicate FAQ "Which sectors does KARGAR serve?" on `/sectors` and the FM pillar | Optional: reword one, or drop it from the FM pillar | No |
| R10 | Info | Office housekeeping (P2 #4 for "corporate housekeeping") has a changed meta description and +1 FAQ. Low ranking risk, since descriptions affect snippets, not rank | Watch this query in GSC for 4 weeks | Yes |

## Correction to earlier reports

`01_SEO_AUDIT_REPORT.md` finding **P1-6 ("24x7 emergency response" live) was stale.** It was carried over from the 2026-11-05 recon. `companyTrust.ts` no longer contains it, and the built HTML has no "24x7"/"24/7" anywhere (`SupportContent.tsx` only mentions it in a code comment explaining why it is excluded). P1-6 is now marked resolved.

## Accessibility note

No components, markup or styles were changed; only text inside existing components. Automated checks found 0 links without an accessible name, one H1 per page, and heading validation passing. A full manual WCAG review by the project's accessibility agent was not run in this pass.

## Not done (as instructed)

No commit, no deploy, no new pages.
