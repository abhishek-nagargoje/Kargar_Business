# 09 — SEO Baseline and Tracking

**Date:** 2026-11-17

## 1. Baseline available today

**Google Search Console, GA4 and GBP data were not accessible in this session.** The only ranking data is the user-supplied manual tracker from 2026-11-05. These are single observations, **not** GSC average positions.

| Keyword | URL | Position (2026-11-05) |
|---|---|---|
| Building Maintenance Services in Pune | /building-maintenance-services-pune | Page 1, #3 |
| Corporate Housekeeping Services in Pune | /office-housekeeping-services-pune (not the corporate page) | Page 2, #4 |
| Facility Staffing & Manpower Services in Pune | /facility-staffing-services-pune | Page 1, #1 |
| Housekeeping Services for Housing Societies in Pune | /society-housekeeping-services-pune | Page 1, #1 |
| Facility Maintenance Services in Pune | /facility-management-company-pune | Page 1, #1 |
| Housekeeping Cost in Pune | /resources/housekeeping-cost-pune | Page 1, #3 |
| Healthcare Housekeeping Pune | /healthcare-housekeeping-services-pune | Page 1, #2 |
| Facility Management Pune | /facility-management-company-pune | Page 3, #5 |
| HVAC Maintenance Pune | /hvac-maintenance-services-pune | Page 1, #1 |
| Commercial HVAC Maintenance Pune | /hvac-maintenance-services-pune | Page 1, #2 |
| Society Facility Management Pune | /facility-management-for-societies-pune | Page 1, #2 |
| Housekeeping / Security services in Pune (per brief) | — | Not in the first 10 pages (user observation) |

Technical baseline (verified 2026-11-17, live): 41 sitemap URLs, all 200; prerendered metadata present; `/llms.txt` 404; unknown URLs return real 404s.

## 2. Capture before deploying (≈15 minutes in GSC)

GSC → Performance → Search results, **last 3 months** and **last 6 months**, export both **Queries** and **Pages**. Save the files to `seo-audit/data/gsc-YYYY-MM-DD-*.csv`. This export becomes the official baseline. Also note the total of Indexing → Pages "Indexed / Not indexed".

## 3. Tracked keyword set

| Cluster | Keyword | Target URL |
|---|---|---|
| Housekeeping | housekeeping services pune | /housekeeping-services-pune |
| | housekeeping company pune | /housekeeping-services-pune |
| | office housekeeping services pune · office cleaning services pune | /office-housekeeping-services-pune |
| | commercial housekeeping pune · commercial cleaning services pune | /commercial-housekeeping-services-pune |
| | corporate housekeeping services pune | /corporate-housekeeping-services-pune |
| | industrial housekeeping pune | /industrial-housekeeping-services-pune |
| Security | security services pune | /security-services-pune |
| | security agency pune · security guard services pune | /security-services-pune |
| | corporate security pune | /corporate-security-services-pune |
| | industrial security pune | /industrial-security-services-pune |
| | society security services pune | /society-security-services-pune |
| FM | facility management services pune · facility management company pune | /facility-management-company-pune |
| | integrated facility management pune | /facility-management-company-pune |

For every keyword, record: impressions, clicks, CTR, average position, **and which URL Google shows**. A wrong URL means cannibalisation.

## 4. Monitoring cadence

| When | What |
|---|---|
| Week 1 after deploy | URL Inspection: the 3 new URLs are "URL is on Google"? If "Discovered/Crawled – not indexed", request indexing again and check internal links |
| Weekly, weeks 2–8 | GSC Queries filtered on `security`, `housekeeping`, `cleaning`, `agency`, `guard`: new queries appearing = relevance gained |
| Monthly | Compare against the 3-month baseline: impressions, non-branded clicks, indexed pages, landing-page performance |
| Monthly | GA4: `cta_click` by `page_path` and `cta_position` vs `contact_form_submit` by `service` (enquiry drop-off per page); leads by `metadata.service` in Supabase |
| Quarterly | Re-check cannibalisation pairs in `02_KEYWORD_RESEARCH.md` §E |

## 5. Expectations

New and expanded pages usually take several weeks to be crawled, indexed and settle. Head terms such as "security services in Pune" and "housekeeping services in Pune" depend heavily on the off-site programme (`06_CONTENT_ROADMAP.md` §4). **No ranking outcome is promised**, and no improvement should be reported without GSC data.
