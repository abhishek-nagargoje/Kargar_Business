# Kargar Business Services — Backlink & Authority Audit

**Site:** https://www.kargarbusinessservices.com/
**Primary target page:** https://www.kargarbusinessservices.com/services/soft-services/housekeeping
**Primary keyword:** "housekeeping services Pune"
**Date:** 2026-08-27
**Audit mode:** AUDIT + STRATEGY only. No outreach sent, no links acquired, no disavows filed, no production code changed.

---

## 0. Data Access — Verified, Not Assumed

Before anything else, credentials were checked directly in this environment (not taken on faith):

| Source | Status | Evidence |
|---|---|---|
| Moz API | ❌ Not configured | `backlinks_auth.py --check --json` → `moz.available: false`, no `MOZ_API_KEY` / `backlinks-api.json` |
| Bing Webmaster Tools API | ❌ Not configured | same check → `bing.available: false` |
| DataForSEO | ❌ Not installed | No `.mcp.json`, no DataForSEO extension in this project |
| Ahrefs | ❌ Not installed | No Ahrefs MCP/extension in this project |
| Google Search Console | ❌ Not configured | `google_auth.py --check --json` → `gsc.available: false`, no OAuth token/service account |
| GA4 / PageSpeed / CrUX | ❌ Not configured | Same check, all `available: false` |
| Common Crawl (domain graph) | ✅ Returned (low-confidence, domain present but unranked) | `kargarbusinessservices.com` is present in the CC crawl (`in_crawl: true`) but `in_rankings: false` — too small/new for a PageRank score. No numeric PageRank/harmonic-centrality value exists yet. This is real, direct evidence the domain currently has very limited external link presence, but it is not a DA/DR/UR substitute. |
| Backlink verification crawler | ✅ Available | Local, works once a specific link list exists to verify — none exists yet (see §5) |
| Live Google SERP observation (WebSearch) | ✅ Available, with caveats | Non-geo-targeted, point-in-time, US-vantage search — **not** a substitute for actual Pune-local SERP rank tracking or an Ahrefs/Semrush competitor export. Used only to identify *which domains currently show up* for the target terms, not positions, DA, or click data. |

**Bottom line:** This audit has **zero verified DA / DR / UR / Spam Score / referring-domain-count / backlink-count data** for Kargar or any competitor. Every number that would normally come from Ahrefs/Moz/Semrush/GSC is stated below as `Metric unavailable with current access` per Phase 2 of the brief — never estimated or invented.

**To unlock real data**, the fastest free path:
1. Moz API — free signup, 2,500 rows/month → DA/PA/Spam Score/anchor text/linking domains
2. Bing Webmaster Tools — free, requires site verification → registered-property backlinks
3. Google Search Console — free, requires site verification → real position/impression/click/CTR data for "housekeeping services Pune" and variants (this is the single highest-value credential to add, since it's *actual* Google performance data, not a third-party estimate)
4. DataForSEO or Ahrefs extension (paid) — full backlink/competitor/SERP data

---

## 1. Site Authority Map (Phase 1 — verified by reading the repo)

```
Homepage (/)
 ├── /services
 │    ├── /services/hard-services            (1 incoming internal link — ⚠ weak)
 │    │    ├── /services/hard-services/electrical-maintenance   (0 static internal links — orphan risk)
 │    │    └── /services/hard-services/hvac-maintenance         (0 static internal links — orphan risk)
 │    └── /services/soft-services            (0 static internal links — orphan risk)
 │         ├── /services/soft-services/housekeeping   ← PRIMARY TARGET (3 incoming internal links — best-linked page on the site)
 │         └── /services/soft-services/security-services (0 static internal links — orphan risk)
 ├── /sectors            (duplicate body content of "/" — see SEO_AUDIT_REPORT.md §4.1)
 ├── /company-profile    (duplicate body content of "/" — same issue)
 ├── /support             (duplicate body content of "/" — same issue)
 └── /contact-us
```

Source: `npm run seo` pipeline report, run live during this audit (`frontend/scripts/seo/seo-report.ts`). 13 URLs in sitemap. The housekeeping page already has more resolvable internal links than any other service/category page (3), which is a real, verified, positive signal already in place before any new backlink work begins — internal authority is already being funneled toward the priority page.

**Known gap (repo-verified, not an SEO tool claim):** `/services/soft-services` and `/services/hard-services/*` show 0 statically-resolved internal links; the pipeline itself notes 2 additional links exist as unresolvable template literals (`CollectionSection.tsx`, `ServiceCategoryCard.tsx`) so this is *not* proof of true orphaning, just of a scanner limitation — see Phase 11 recommendations below.

## 2. Baseline Metrics (Phase 2)

### Domain
| Metric | Value |
|---|---|
| Moz DA | Metric unavailable with current access |
| Moz Spam Score | Metric unavailable with current access |
| Ahrefs DR | Metric unavailable with current access |
| Total referring domains | Metric unavailable with current access |
| Dofollow referring domains | Metric unavailable with current access |
| Total backlinks | Metric unavailable with current access |
| Estimated organic traffic | Metric unavailable with current access |
| Ranking keywords | Metric unavailable with current access |

### Homepage
| Metric | Value |
|---|---|
| Ahrefs UR | Metric unavailable with current access |
| Referring domains | Metric unavailable with current access |
| Backlinks | Metric unavailable with current access |
| Strongest backlinks | Metric unavailable with current access |
| Internal links | 7 outbound to top-level nav (verified, `seo-report.ts`) |

### Housekeeping page (`/services/soft-services/housekeeping`)
| Metric | Value |
|---|---|
| UR | Metric unavailable with current access |
| Backlinks | Metric unavailable with current access |
| Referring domains | Metric unavailable with current access |
| Internal links | **3 incoming** (verified — highest of any dynamic page on the site) |
| Ranking position for "housekeeping services Pune" | Metric unavailable with current access — requires Search Console or geo-targeted rank tracker |
| Impressions / Clicks / CTR | Metric unavailable with current access — requires Search Console |
| Indexed status | Not verified live (no GSC/URL Inspection access); page exists in `sitemap.xml`, is not `noindex`, and is a normal static-generated route — no known indexing blocker found in code |

**This section will stay mostly empty until Moz/Bing/GSC credentials exist. That is the single highest-leverage next action before more backlink strategy work is useful** — see §9.

## 3. Backlink Inventory (Phase 3)

No inventory could be built — no source returned any actual referring URLs (Moz/Bing/DataForSEO/Ahrefs unavailable; Common Crawl domain-graph query did not complete in this session; the verification crawler only checks URLs it's given, and none are known yet). Nothing is fabricated here.

**What exists instead:** a list of Kargar's own known external touchpoints, found by direct inspection, which are candidate seeds to feed into `verify_backlinks.py` once specific outbound-linking pages are identified:
- `https://in.linkedin.com/company/kargar` — LinkedIn company page (real, found via live search)
- `https://www.facebook.com/people/Kargar-Facility-and-Security-Services-PVT-LTD/100076064059281/` — Facebook page (real, found via live search)
- `https://www.kargar.co.in/` — a second live domain under the "Kargar" name (see §12 — flagged for manual review, not assumed malicious)
- Third-party business-database listings that mention Kargar without confirmed backlinks: ZoomInfo, Tracxn, ZaubaCorp (statutory/company-registry data, not editorial), SalesZhark — these are auto-generated aggregator profiles, not evidence of an editorial backlink; each would need individual verification before being counted as anything but a directory-tier mention.

None of these have been confirmed to carry a live, followed hyperlink back to `kargarbusinessservices.com` — that requires either a manual check of each page or the verification crawler once URLs are collected. **Do not treat this list as a backlink inventory** — it is a mention-inventory seed list only (feeds Phase 18, not Phase 3).

## 4. Anchor Text Audit (Phase 4)

No anchor text data exists without Moz/Ahrefs/DataForSEO (Bing Webmaster also unavailable). Cannot report a real distribution. See `anchor-text-analysis.md` for the forward-looking anchor *strategy* (what to use once real link building starts), which does not require backlink data to define responsibly.

## 5. Competitor Backlink Gap (Phase 5)

No backlink API access means no true backlink gap table (columns like "Linking Domain," "Referring Domains," "Authority" cannot be populated without Ahrefs/Moz/DataForSEO/Semrush). What **is** real and verifiable right now: which domains actually surface in live Google search results for the target terms. This is SERP presence, not a backlink gap — do not conflate the two.

**Method:** Live web search (non-geo-targeted, India-vantage not guaranteed, point-in-time 2026-08-27) for:
- "housekeeping services Pune"
- "commercial housekeeping services Pune company"
- "industrial housekeeping services Pune corporate"
- "facility management company Pune"

**Domains observed appearing for one or more of these queries** (competitor identification only — not a gap table, not DA/DR data):

| Domain | Appears for | Type |
|---|---|---|
| arisefacilitysolutions.in / arisefacility.com | housekeeping services Pune, commercial, industrial | Direct FM competitor |
| jssgroupindia.com | housekeeping services Pune, commercial, industrial | Direct FM/housekeeping competitor |
| unicareservices.in | housekeeping services Pune, facility management company Pune | Direct FM competitor |
| pdfpl.com | commercial housekeeping | Direct competitor |
| dirtblastercleaningservices.com | housekeeping services Pune | Direct competitor (residential+commercial) |
| residenso.com | housekeeping services Pune | Residential-leaning competitor |
| r3spl.com | commercial housekeeping | Direct competitor |
| clenexindia.com | commercial/corporate housekeeping | Direct competitor |
| broomees.com | commercial housekeeping | Residential-leaning competitor |
| apollofms.in | facility management company Pune | Direct FM competitor (IFM) |
| originfms.com | facility management company Pune | Direct FM competitor |
| mastersfms.com | facility management company Pune | Direct FM competitor |
| hpfms.in | facility management company Pune | Direct FM competitor |
| corpx.in | industrial housekeeping | Direct FM competitor (Chakan/Talegaon industrial belt) |
| splendourgroup.com | industrial/corporate housekeeping | Direct FM competitor |
| sulekha.com/housekeeping-services/pune, dir.indiamart.com, justdial.com | multiple | Aggregator/marketplace listings, not editorial competitors — Kargar being *listed* here (if not already) is a legitimate low-effort local-directory action, not a "backlink gap" to chase aggressively |

**What this table cannot tell you** (be explicit about the limit): which of these actually rank #1–10 in Pune specifically, their real DA/DR/UR, their actual referring-domain counts, or which domains link to 2+ of them (the true "intersection" signal from Phase 20). All of that requires Moz/Ahrefs/DataForSEO/Semrush + a geo-targeted rank tracker. Treat this list as **"who to study next," not "who to copy links from."**

**Recommended immediate real action that needs no paid tool:** manually open 3–4 of the direct competitors above (Arise, JSS Group, Unicare, Origin FMS) and read their site — real content depth, real service pages, whether they claim ISO/certifications, whether they list real named clients — and compare against Kargar's own content (which, per `SEO_AUDIT_REPORT.md`, is already genuinely good on service pages). This is free competitive intelligence available today.

## 6. Real-Life Link Assets (Phase 6 — the strongest actionable finding in this audit)

Kargar's own codebase contains a **verified, "Official/Verified"-labeled list of real named clients** (`frontend/public/logos/logo-manifest.json`), used for the trust-logo strip on the site. This is genuine business data, not a hypothesis — and it is the single best backlink opportunity Kargar has, because these are proven, real relationships:

| Organization | Sector | Type |
|---|---|---|
| Godrej (Hillside-1) | Real estate developer | Major national brand |
| Kolte-Patil (KP Square, 24K Sereno) | Real estate developer | Regional Pune developer |
| Kumar Properties (Kumar Selena, Imperial Atria) | Real estate developer | Regional Pune developer |
| Signature Majestique | Real estate developer | Regional developer |
| Rohan Builders (Rohan Ananta, Rohan Prathama) | Real estate developer | Regional Pune developer |
| Sukhwani (Sukhwani Skyline) | Real estate developer | Regional Pune developer |
| Supreme Universal (Supreme Villagio, Supreme Office) | Real estate developer | Regional Pune developer |
| Mahindra International School, Wellington College, Vedh Vally World School, ISMS, Imperial Business College, Colours Innovation Academy | Education | Schools/colleges |
| Adonmo, Karnex Software Solutions, HAXPUNE, Powercon Ventures, RF Bytes | Corporate/tech | Office clients |
| Foodable, Say Samosa | Food/hospitality | Commercial clients |

See `RELATIONSHIP LINK OPPORTUNITY TABLE` in `link-building-strategy.md` §2 for the full pitch-by-pitch breakdown. **Do not fabricate a relationship beyond what this file already documents as "Official/Verified"** — treat this list as the ground truth and nothing more.

## 7. Local SEO Link Opportunities (Phase 7)

Verified via live search (not fabricated) — genuine, real, currently-operating Pune business organizations:

| Organization | Relevance | Notes |
|---|---|---|
| Mahratta Chamber of Commerce, Industries & Agriculture (MCCIA) | High — Pune's oldest, largest chamber (est. 1934, 3,000+ members) | mcciapune.com — membership directory/profile is a legitimate, editorially real placement, not a spam directory |
| DCCIA Pune (Dalit Indian Chamber of Commerce & Industry, Pune chapter) | Medium-high — active industrial-belt chamber, 150-180 members | dcciapune.org |
| Pune Management Association (PMA) | Medium — professional body, not FM-specific | punemanagementassociation.org |

No dedicated "Facility Management Association — Pune" was found to exist; do not invent one. If a national body (e.g., ISSA India, FM industry bodies) is relevant, that needs a separate verified search — not included here to avoid guessing.

## 8. Toxic/Suspicious Backlink Review (Phase 12)

**No backlink data exists to review.** Zero toxic links can be identified, confirmed, or disproven without Moz Spam Score, Ahrefs, or DataForSEO data. **No disavow action of any kind is recommended** — there is nothing to act on, and Phase 12/22's own rule against disavowing without evidence applies doubly hard when there's no data at all. See `toxic-link-review.md` for the (currently empty) tracking table, ready to populate once real data exists.

**One item worth a manual, non-tool check:** `kargar.co.in` (found via live search, distinct from the canonical `kargarbusinessservices.com`) is either (a) a legitimate legacy/secondary domain Kargar still owns, in which case it should 301 to the canonical domain rather than operate as an independent site, or (b) unrelated. This was already flagged independently in `SEO_AUDIT_REPORT.md` §4.3 as a NAP mismatch (the contact page displays `kargar.co.in` as the company website). **Action:** confirm internally who owns `kargar.co.in` before treating it as either an asset or a risk — do not guess.

## 9. What This Audit Actually Delivers vs. What It Cannot (be honest about the gap)

**Delivered, verified, real:**
- Confirmed current tool-access state (none of Moz/Bing/DataForSEO/Ahrefs/GSC/GA4 configured)
- Real internal-link/crawl-depth map from the site's own build pipeline
- Real list of currently-visible competitor domains in live Google search for the target terms
- Real, "Official/Verified" client list already in the codebase — genuine relationship link opportunities
- Real local Pune business associations that exist today
- A responsible anchor-text, link-target-distribution, and 90-day strategy that does not depend on backlink-tool data to be useful

**Cannot deliver without real API/GSC access (explicitly not fabricated):**
- Any DA/DR/UR/Spam Score number, for Kargar or any competitor
- Actual referring-domain counts, backlink counts, or backlink inventory rows
- Real anchor-text distribution
- True competitor backlink-gap or link-intersection tables
- Actual ranking position / impressions / clicks / CTR for "housekeeping services Pune" or its variants
- Any claim that a link has been "acquired" (none has)

The single highest-leverage next step is not more backlink strategy — it's getting free Moz + Bing Webmaster keys and free Google Search Console verification set up (15 minutes, zero cost), so the *next* run of this audit has real numbers instead of "unavailable" in every metric cell.
