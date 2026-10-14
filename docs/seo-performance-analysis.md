# Search Console Performance Analysis

**Date:** 2026-10-14
**Status: NOT PERFORMED. No Search Console data was accessible.**

Checked in this session:
- Claude in Chrome (authenticated browser session): extension not connected.
- Search Console API credentials (service account, OAuth, `GOOGLE_APPLICATION_CREDENTIALS`): none present.
- Third-party SEO data providers (DataForSEO, Ahrefs, Moz): no credentials.

**This document contains no clicks, impressions, CTR, positions or query data, because none were seen.** Everything below is a request checklist and the analysis plan to apply once the data exists.

## Data request checklist (export from Search Console)

Property: `https://www.kargarbusinessservices.com/` → **Performance → Search results**. Use *Export → Download CSV* for each.

| # | Date range | Dimension tab | Filters | Why |
|---|---|---|---|---|
| 1 | Last 28 days **vs** previous 28 days (Compare) | Queries | none | Trend and top queries |
| 2 | Same comparison | Pages | none | Which pages gain or lose |
| 3 | Last 3 months (or 6/12 if available) | Queries | none | Enough rows for low-volume B2B queries |
| 4 | Last 3 months | Pages | none | Landing-page baseline |
| 5 | Last 3 months | Queries | Query contains `housekeeping` | Primary-keyword cluster |
| 6 | Last 3 months | Queries | Query contains `facility` | FM cluster |
| 7 | Last 3 months | Pages | Page = `/housekeeping-services-pune`, then switch to Queries | What the pillar actually ranks for |
| 8 | Last 3 months | Pages | Page = `/facility-management-company-pune` → Queries; repeat for `/` | Homepage vs FM pillar cannibalization check |
| 9 | Last 3 months | Devices | none | Mobile vs desktop CTR |
| 10 | Last 3 months | Countries | none | Share of non-India traffic |

Also screenshot or export:
- **Indexing → Pages:** indexed and not-indexed counts with reasons.
- **Sitemaps:** status and discovered URL count for `sitemap.xml`.
- **URL Inspection** for `/housekeeping-services-pune`, `/services/hard-services`, `/services/soft-services`: indexing state and Google-selected canonical.

Turn on all four metrics (Clicks, Impressions, CTR, Position) before exporting.

## Analysis plan once data arrives

| Question | How | Decision it drives |
|---|---|---|
| High impressions, weak CTR | Queries with CTR below the site's median at positions 1–10 | Rewrite that page's title/description (keep within the 21–31-char title rule in `validate-metadata.ts`) |
| Striking distance | Average position 8–20 on commercial queries | Prioritize internal links and content depth for those pages |
| Wrong page ranking | Query → Pages view shows a non-owner URL (per `seo-keyword-map.md`) | Fix anchors and titles. Don't create new pages |
| Declining pages | Page clicks down >30% period over period | Check for indexing or canonical changes first, then content |
| Device gap | Mobile CTR much lower than desktop | Check mobile SERP snippet and mobile CTA |
| Country leakage | Large non-India impressions | Usually harmless. Confirm Pune/PCMC cues in titles |

**Expectation-setting:** the Phase 1 fixes and these Phase 2 changes are **not deployed**. Any GSC data exported now is a *baseline*. Compare against an export 4–8 weeks after deployment.
