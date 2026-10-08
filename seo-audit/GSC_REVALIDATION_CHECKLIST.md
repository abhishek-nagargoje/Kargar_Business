# Google Search Console Revalidation Checklist

Do these **after** the changes are deployed to production and `npm run seo:audit -- --url https://www.kargarbusinessservices.com --strict` passes against the live site.

## Day 0 (deploy day)

| # | Area | Action | Expected |
|---|---|---|---|
| 1 | Sitemaps | Sitemaps → resubmit `https://www.kargarbusinessservices.com/sitemap.xml` | Status "Success", **41** discovered URLs (was 18) |
| 2 | URL Inspection | Live test the homepage | "URL is available to Google", canonical = user-declared |
| 3 | URL Inspection | Live test + **Request indexing**, one at a time, in this order: `/housekeeping-services-pune`, `/facility-management-company-pune`, `/commercial-housekeeping-services-pune`, `/corporate-housekeeping-services-pune`, `/office-housekeeping-services-pune`, `/society-housekeeping-services-pune`, `/electrical-maintenance-services-pune`, `/security-services-pune`, `/facility-maintenance-services-pune`, `/resources` | Each: 200, indexable, Google-selected canonical = self, rendered HTML shows H1 and body. Respect the daily quota; do **not** re-request the same URL repeatedly — the sitemap covers the rest |
| 4 | URL Inspection | View "Tested page → HTML" for `/housekeeping-services-pune` | Contains the FAQ answers, the footer directory links and the JSON-LD |
| 5 | Manual Actions / Security Issues | Open both reports | "No issues detected" |
| 6 | HTTPS | Experience → HTTPS | No non-HTTPS URLs |

## Week 1–2

| # | Report | Action | Expected |
|---|---|---|---|
| 7 | Pages → "Alternate page with proper canonical tag" | **Do not "Validate fix"** — this is a correct state | Count stops growing (no new `?source=` URLs discovered); older ones age out slowly |
| 8 | Pages → "Page with redirect" (`/services/`, `/sectors/`) | No action needed — correct 308s to canonical | Informational; may persist |
| 9 | Pages → "Not found (404)" (`/category/services/`) | Click **Validate fix** | Now 308 → `/services` (2 hops, platform-ordered) |
| 10 | Pages → "Redirect error" | Open the report to get the exact URL; run `curl -sIL <url>`; if it is a legacy http/apex/slash variant it now resolves in ≤4 hops to a 200 → **Validate fix**. If it is something else, add the URL to `PROBES` in `scripts/seo-audit.ts` and investigate | Resolved |
| 11 | Pages → "Crawled – currently not indexed" (`/sitemap.xml`) | No action | Moves to "Excluded by noindex tag" (header added) — expected and harmless |
| 12 | Pages → "Discovered – currently not indexed" (`/electrical-maintenance-services-pune`, `/services/hard-services`) | Inspect each; request indexing once for the electrical page | Electrical page was rewritten and now has many more internal links. If still not indexed after 4 weeks, see §"If pages stay unindexed" |
| 13 | Enhancements → Breadcrumbs | Check | Valid items for all Pune/guide pages, with the Services › Pillar hierarchy |
| 14 | Enhancements → Structured data (Unparsable / any errors) | Check | 0 errors |

## Week 4–8

| # | Report | What to look at |
|---|---|---|
| 15 | Performance → Search results | Filter Page = each pillar; Queries tab → map real queries to `SEO_KEYWORD_MAP.md`, fill the "Current ranking" column |
| 16 | Performance → Queries | Check cannibalization pairs listed in `SEO_CANNIBALIZATION_REPORT.md` §2 (same query, two URLs) |
| 17 | Core Web Vitals | Mobile + desktop; investigate any "Poor" URL group (LCP is the most likely issue given bundle size) |
| 18 | Pages → indexed count | Expect gradual growth toward the 41 sitemap URLs; **do not chase 100%** — investigate only strategically important pages |
| 19 | Links report | Top linked pages internally should be the pillars |

## If pages stay unindexed after ~6 weeks

1. URL Inspection → confirm 200, indexable, canonical = self, content present in rendered HTML.
2. Run `npm run seo:audit -- --url https://www.kargarbusinessservices.com` and check the page's word count and inbound links.
3. Improve the page with genuinely new information (real site photos via the Media Library, real anonymised examples) rather than re-requesting indexing.
4. If two pages split the same queries, merge the weaker into the stronger with a 301 (add to `REDIRECTS` in `scripts/seo/seo.config.ts` and remove the content entry).
