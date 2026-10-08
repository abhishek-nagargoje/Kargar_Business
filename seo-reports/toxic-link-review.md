# Toxic / Suspicious Backlink Review

**Status:** No backlink data source (Moz/Ahrefs/DataForSEO/Bing) is configured — see `backlink-audit.md` §0. **No toxic links have been identified, because no link data exists to review.** This file is a ready-to-populate tracking table, not a finding.

| Domain | URL | Reason Flagged | Evidence | Risk Level | Recommended Action |
|---|---|---|---|---|---|
| *(none — no data source available)* | | | | | |

## One item flagged for manual (non-tool) verification

- **`kargar.co.in`** — a second live domain under the Kargar name, found via live Google search, distinct from the canonical `kargarbusinessservices.com`. Already independently flagged in `SEO_AUDIT_REPORT.md` §4.3 as a NAP inconsistency (the `/contact-us` page displays `kargar.co.in` as the company website field). This is **not** classified as toxic — it may simply be a legitimate legacy/secondary domain. **Action required:** confirm internally whether Kargar owns/operates `kargar.co.in`. If yes, it should either 301 to the canonical domain or be clearly designated (not presented as the primary site on the contact page). If no, no action needed. Do not disavow or flag anything about it until ownership is confirmed.

## Rules this file follows (per Phase 12/22 of the brief)

- Never recommend disavow without verified evidence of harm.
- A low-authority backlink is not automatically toxic.
- If Google Search Console (once configured) shows no manual action, and a link is merely weak/low-authority, the default recommendation is **ignore**, not disavow.
- This table will be populated the moment a real data source (Moz Spam Score, DataForSEO, or a manually supplied list run through the verification crawler) becomes available.
