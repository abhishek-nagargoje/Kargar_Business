# Kargar Authority Dashboard (template — populate monthly once credentials exist)

**How to fill this in:** run the `seo-backlinks` skill's `backlinks_auth.py --check` (for Moz/Bing/DataForSEO) and `google_auth.py --check` (for GSC/GA4/PSI/CrUX) at the start of each month. Only enter a number if a real source returned it — never estimate.

## Domain

| Metric | This month | Last month | Source | Confidence |
|---|---|---|---|---|
| DA | unavailable | — | — | — |
| DR | unavailable | — | — | — |
| Spam Score | unavailable | — | — | — |
| Referring Domains | unavailable | — | — | — |
| Dofollow Referring Domains | unavailable | — | — | — |
| Backlinks | unavailable | — | — | — |

## Housekeeping Page (`/services/soft-services/housekeeping`)

| Metric | This month | Last month | Source | Confidence |
|---|---|---|---|---|
| UR | unavailable | — | — | — |
| Referring Domains | unavailable | — | — | — |
| Backlinks | unavailable | — | — | — |
| Internal links (verified) | 3 | — | `npm run seo` report | Verified/direct |
| Ranking Position — "housekeeping services Pune" | unavailable | — | needs GSC | — |
| Impressions | unavailable | — | needs GSC | — |
| Clicks | unavailable | — | needs GSC | — |
| CTR | unavailable | — | needs GSC | — |

## Google (needs GSC — currently unconfigured)

| Query | Position | Impressions | Clicks | CTR |
|---|---|---|---|---|
| housekeeping services Pune | unavailable | unavailable | unavailable | unavailable |
| housekeeping services in Pune | unavailable | unavailable | unavailable | unavailable |
| housekeeping company Pune | unavailable | unavailable | unavailable | unavailable |
| housekeeping agency Pune | unavailable | unavailable | unavailable | unavailable |

## Business

| Metric | This month | Source |
|---|---|---|
| Organic leads | unavailable — needs GA4/CRM data | — |
| Contact-form submissions | check Supabase `contact.service.ts` data directly — real data exists in the app's own DB, just wasn't queried in this pass | Internal |
| Phone leads | unavailable | — |
| Proposal requests | unavailable | — |

## Success criteria reminder (Phase 24 — not "N backlinks")

Track direction of travel, not absolute counts: more *relevant* referring domains, stronger internal authority distribution to the housekeeping page, improved ranking position, increased qualified impressions/clicks, increased organic leads, and a clean (not necessarily huge) backlink profile.
