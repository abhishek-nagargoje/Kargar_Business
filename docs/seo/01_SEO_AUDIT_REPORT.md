# 01 — SEO Audit Report

**Date:** 2026-11-17 · **Site:** https://www.kargarbusinessservices.com · **Repo HEAD at audit:** `d239c7c`
**Related:** `seo-audit/PHASE_A_RECON_KEYWORD_MAP_2026-11-05.md` (read-only recon, 2026-11-05), `seo-audit/SEO_CANNIBALIZATION_REPORT.md`, `seo-audit/SEO_CONTENT_PLAN.md` (§0 = source-of-truth rule for every claim).

## 1. Summary

The technical foundation is **production-grade and was preserved**: build-time Playwright prerendering of every route, one source of truth for landing pages (`punePages.ts`) that drives routes, sitemap, rewrites, hub and footer links, build-blocking validators (metadata, canonicals, headings, alt text, schema, links, route coverage), git-derived `lastmod`, and real 404s.

The housekeeping cluster was already deep: a pillar plus eight spokes, three guides, and several page-1 rankings. **The weakest area for the business problem was security.** It had a ~745-word pillar and one spoke, with no pages for the corporate or industrial security intent that searchers use, and no "security agency" content. The rest of the visibility gap for head terms such as "housekeeping services in Pune" is most likely **off-site authority and local-entity signals** (backlinks, directories, Google Business Profile). On-page content cannot close that alone. See §4.

## 2. Architecture (verified)

| Area | Implementation | Status |
|---|---|---|
| Framework | React 19, Vite 6, React Router 7, TypeScript 5.7 (`frontend/package.json`) | OK |
| Rendering | `scripts/seo/prerender.ts`: every indexable route written to static HTML at build time; Vercel rewrites clean URL → `.html` | OK. Title, canonical, robots, H1, body and JSON-LD all present in raw HTML (verified on live and new pages) |
| Metadata | `react-helmet-async` via `components/seo/SEO.tsx`; static routes in `features/seo/registry.ts`; landing pages/guides from their config | OK. Validator enforces unique titles (21–31 chars + brand suffix) and descriptions (140–160) |
| Canonicals | Self-referencing, absolute, `www`, no trailing slash (`trailingSlash:false`) | OK |
| robots.txt | Generated; `Allow: /`, `Disallow: /admin`, sitemap declared | OK |
| Sitemap | Generated from route inventory; `lastmod` = last git commit of the content file | OK. 44 URLs after this work, all 200, self-canonical and indexable (`validate-sitemap`) |
| Structured data | Organization, LocalBusiness (Baner address, phone, hours, areaServed), WebSite, Service, BreadcrumbList, FAQPage, and Article on guides | OK, and matches visible content |
| Internal links | Crawlable `<Link>`/`<a href>`; contact CTAs use a parameter-free href (fixes earlier GSC duplicate issue); sitewide footer directory | OK. No orphans |
| Redirects | Generated into `vercel.json`; regression-audited | OK |
| Analytics | GA4 + Google Ads tag, call/WhatsApp/email/form events, Ads conversions | OK. CTA-click gap fixed (§3) |
| Images | WebP, alt text validated, hero images explicitly labelled as illustrative stock | P2: no real KARGAR site photographs on landing pages |
| llms.txt | Not present (404) | Optional. See `05_AEO_GEO_STRATEGY.md` |

## 3. Findings

| # | Finding | Sev. | Current | Business impact | Correction | Files | Status |
|---|---|---|---|---|---|---|---|
| P0-1 | **Head-term visibility is an authority/entity problem, not a missing-page problem.** "Housekeeping services in Pune" and "Security services in Pune" both have dedicated, indexable, prerendered pages | P0 | Pages exist and pass all technical checks | The biggest lead-volume keywords stay out of reach | Off-site programme: GBP, citations, directories, PR from the PM/Woman Startup award, sector partnerships (`06_CONTENT_ROADMAP.md` §4) | — | **Needs business action** |
| P0-2 | **PSARA licence not shown or documented.** Under the Private Security Agencies (Regulation) Act, 2005, an agency supplying private security guards needs a state licence. Competitors in the security SERP display theirs | P0 | No licence information anywhere on the site | Trust and conversion gap on every security page. Legal exposure if the licence is missing | Business to confirm the licence status. If licensed, add the licence number and validity to the security pages and LocalBusiness schema | `security.ts` | **Needs business verification.** The new pages make no licence claim; the PSARA Act is mentioned only as buyer guidance |
| P1-1 | Security cluster too thin for its commercial value | P1 | Pillar ~745 words, 1 spoke | No page matches corporate or industrial security intent; weak topical signal | Pillar expanded; `/corporate-security-services-pune`, `/industrial-security-services-pune` and a security-agency guide added | `security.ts`, `guides.ts` | **Done** |
| P1-2 | Searcher vocabulary missing: "office cleaning", "commercial cleaning", "agency/supplier", "security agency/guards" | P1 | Titles/H1s used "housekeeping" only | Missed query matching | Vocabulary added to descriptions, intros and FAQs. Titles and H1s kept to protect existing rankings | `housekeeping.ts`, `security.ts` | **Done** |
| P1-3 | Lead attribution lost: `service`, `campaign`, `category` and `cta_position` were never saved to the lead record | P1 | Only `source` saved | Cannot tell which landing page produced a lead | Saved into the existing `contact_messages.metadata` JSONB (no migration) | `contact.service.ts`, `KargarSinglePage.tsx` | **Done**, verified with an intercepted submit |
| P1-4 | No CTA-click event | P1 | `console.log` only | Abandoned enquiries invisible | `cta_click` GA4 event (analytics only, no Ads conversion) with page, source, service and position | `lib/analytics.ts`, `useContactNavigation.ts` | **Done** |
| P1-5b | Unverified claims on the service detail pages (psychological profiling, armed guards, ISO-aligned, eco-friendly, certified/fully licensed technicians, undocumented sectors) and the `/services` "Eco-friendly" tile | P1 | Live | Accuracy and trust risk | Replaced with documented facts | `soft-services.ts`, `hard-services.ts`, `KargarSinglePage.tsx` | **Done** (remediation pass) |
| P1-5 | Unverified equipment claims on the HVAC pages (chillers, cooling towers, split/cassette ACs, IAQ testing, "IT Parks", "Retail & Malls") and electrical detail (HT panels, transformers, "fully licensed") | P1 | Live | Accuracy and trust risk | **Not changed.** `/hvac-maintenance-services-pune` ranks #1–2, and these items are *absent* from the brochure, not proven false. Business to confirm or deny each one, then edit only those strings | `maintenance.ts`, `services/config/hard-services.ts` | **Needs business verification** |
| P1-6 | "24x7 emergency response & escalation" (reported in the 2026-11-05 recon) | — | **Not live**: removed from `companyTrust.ts` before this audit; 0 occurrences in built HTML | — | None | — | **Resolved** (stale finding, corrected in `10_PRODUCTION_READINESS_AUDIT.md`) |
| P2-1 | "certified" security personnel (society security page): no certification documented | P2 | Live | Unverified claim | Word removed | `security.ts` | **Done** |
| P2-2 | "IT Park Housekeeping" keyword and "IT-park campuses" copy: not a documented sector | P2 | Live | Unverified sector claim | Replaced with "corporate campuses" | `housekeeping.ts` | **Done** |
| P2-3 | FM pillar lacked a Pune/PCMC coverage section, a plain soft/hard/support explanation, a transition section and cost FAQs | P2 | ~1,166 words | Weaker on "facility management services Pune" | Added; title and H1 kept | `facilityManagement.ts` | **Done** |
| P2-4 | No real photographs, case studies or named testimonials on landing pages | P2 | Stock hero images (honestly labelled) | E-E-A-T and conversion | Upload real site photos via the admin Media Library (`ManagedImage` already supports per-page overrides); publish verified case studies only with client consent | — | **Needs business assets** |
| P2-5 | `/services/soft-services/security-services` has only 1 incoming link | P3 | — | Low | Linked from the security pillar. Leave as is | — | Accepted |

## 4. Why KARGAR is absent for some head terms (hypotheses, ordered by evidence)

| # | Hypothesis | Evidence | Confirm with |
|---|---|---|---|
| H1 | Authority gap: the SERPs are crowded with IndiaMART/Justdial listings, long-established agencies and heavy self-publishing (Blogspot, Hashnode, Notion posts) | SERP sampling 2026-11-17 (`03_COMPETITOR_GAP_ANALYSIS.md`); autocomplete is brand-heavy for FM | Backlink tool (Ahrefs/Semrush/GSC Links report) |
| H2 | Mixed intent: "housekeeping services pune" autocomplete is dominated by home cleaning (B2C) | `seo-audit/data/google-autocomplete-2026-11-05.txt` | GSC queries for the pillar |
| H3 | Security cluster thinness (fixed in this release) | 745 words, 1 spoke before | GSC impressions for security queries, 4–8 weeks after deploy |
| H4 | GBP category/services may not include "Security guard service" or "Janitorial service" | Not inspectable from here | GBP dashboard |

**No ranking improvement is claimed.** Measure against `09_SEO_BASELINE_AND_TRACKING.md`.
