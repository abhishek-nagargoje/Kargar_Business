# Keyword Map — KARGAR Facility Management

**Date:** 2026-10-14
**No search-volume or difficulty data was available** (no keyword-tool credentials). Priority is based on business relevance and commercial intent, not volume. Once GSC access exists, re-rank using actual impressions (see `seo-performance-analysis.md`).

## Architecture decision: who owns "housekeeping services Pune"

The brief named `/services/soft-services/housekeeping` as the authoritative housekeeping URL. The repository shows that is **not** the intended owner of the Pune keyword:

- `frontend/src/features/pune-landing/domain/types.ts` documents that Pune landing pages target **local/commercial intent** ("housekeeping services Pune"), while `/services/*` pages target **service-detail intent**.
- Commit `bb20519` (2026-09-28) removed Pune targeting from `/services/soft-services/housekeeping` *specifically because* it was cannibalizing `/housekeeping-services-pune`.
- `/housekeeping-services-pune` is the most complete page on the site for this intent (1,620 words, FAQPage, 8 property-type spokes), and 78 internal anchors already point to it with "housekeeping services (in) Pune" text.

**Decision:** `/housekeeping-services-pune` owns the primary keyword. `/services/soft-services/housekeeping` stays the generic service-scope page. Its title changed from "Corporate Housekeeping Service" to **"Business Housekeeping Services"**, so it no longer competes with `/corporate-housekeeping-services-pune`. Re-targeting the service page at "housekeeping services Pune" would recreate the cannibalization that was deliberately removed.

## Primary keyword per landing page

Intent: **C** = commercial investigation, **T** = transactional/enquiry, **L** = local, **S** = service-specific, **I** = informational.

| Page | Primary keyword | Intent | Supporting keywords | Coverage | Gap / action | Priority |
|---|---|---|---|---|---|---|
| `/housekeeping-services-pune` | housekeeping services Pune | C+T+L | housekeeping company Pune, professional housekeeping services Pune | Strong | Trust proof added this phase. Homepage contextual link repointed here | **P1** |
| `/commercial-housekeeping-services-pune` | commercial housekeeping services Pune | C+L | commercial building housekeeping Pune | Good | None | P1 |
| `/corporate-housekeeping-services-pune` | corporate housekeeping services Pune | C+L | corporate campus housekeeping | Good | Generic page no longer competes with it | P1 |
| `/office-housekeeping-services-pune` | office housekeeping services Pune | C+L | office cleaning services Pune | Good | None | P1 |
| `/society-housekeeping-services-pune` | society housekeeping services Pune | C+L | housing society cleaning Pune | Good | None | P2 |
| `/housekeeping-staff-pune` | housekeeping staff Pune | T+L | housekeeping manpower supply Pune | Good | Competes with IndiaMART manpower listings | P2 |
| `/industrial-housekeeping-services-pune` | industrial housekeeping services Pune | C+L | factory housekeeping Pune | Good | None | P2 |
| `/school-…` / `/healthcare-housekeeping-services-pune` | school / hospital housekeeping Pune | C+L | — | Good | None | P3 |
| `/facility-management-company-pune` | facility management company Pune | C+L | facility management services Pune, integrated FM Pune | Good | Watch overlap with homepage (below) | **P1** |
| `/office-…`, `/commercial-…`, `/facility-management-for-societies-pune` | office / commercial / society facility management Pune | C+L | — | Good | None | P2 |
| `/security-services-pune` | security services Pune | C+L | security guard services Pune | Good | None | P1 |
| `/society-security-services-pune` | society security services Pune | C+L | — | Good | None | P2 |
| `/electrical-maintenance-services-pune` | electrical maintenance services Pune | C+L | — | Good (differentiated in `82d9441`) | None | P2 |
| `/hvac-maintenance-services-pune` | HVAC maintenance Pune | C+L | AC maintenance contract Pune | Good | None | P2 |
| `/facility-maintenance-services-pune` | facility maintenance services Pune | C+L | technical maintenance services Pune | Good | Now linked back from hard-services hub | P2 |
| `/plumbing-…`, `/building-…`, `/stp-…`, `/landscaping-…`, `/facility-staffing-services-pune` | respective service + Pune | C+L | staffing services Pune (staffing page) | Good | None | P3 |
| `/services/hard-services` | hard services facility management | S/I | MEP maintenance | Thin hub (456 words) | Expand only with real operational detail (business input) | P2 |
| `/services/soft-services` | soft services facility management | S/I | — | Thin hub (468 words) | Same | P2 |
| `/services/soft-services/housekeeping` | business housekeeping services | S | housekeeping scope of work | Good | Title fixed this phase | P2 |
| `/services/soft-services/security-services` | corporate security services | S | — | OK | None | P3 |
| `/services/hard-services/{electrical,hvac}-maintenance` | electrical / commercial HVAC maintenance (non-local) | S | — | OK | None | P3 |
| `/` | KARGAR facility management (brand) + facility management company | Navigational + C | — | Strong | See overlap note | P1 |
| `/services` | facility management services (catalog) | C | — | OK | None | P2 |
| `/resources/*` (4 guides) | how to choose a housekeeping company Pune · housekeeping cost Pune · how many housekeeping staff · office housekeeping checklist | I | — | Good | See content calendar | P2 |
| `/contact-us` | (conversion page, not a ranking target) | T | — | — | Mobile form fix this phase | P1 |

## Cannibalization watch-list

| Pair | Risk | Status |
|---|---|---|
| `/` ("Facility Management Company") vs `/facility-management-company-pune` (H1 "Facility Management Company in Pune") | Medium. Google localizes generic FM queries | **Unverified.** In GSC, filter query `facility management company pune` and check which URL gets impressions. If the homepage takes most of them and the pillar gets few, change the homepage title to brand-led ("KARGAR Facility Management – Pune") rather than altering the pillar |
| `/services/soft-services/housekeeping` vs `/housekeeping-services-pune` | Was medium | **Fixed:** homepage body link with the pillar's anchor text now points to the pillar; generic page retitled |
| `/services/soft-services/housekeeping` vs `/corporate-housekeeping-services-pune` | Was medium (both titled "Corporate Housekeeping…") | **Fixed** by retitle |
| `/services/hard-services/electrical-maintenance` vs `/electrical-maintenance-services-pune` | Low | Differentiated in `82d9441`; monitor |
| `/services` ("Facility Management Services") vs `/facility-management-company-pune` | Low | Catalog vs local page; monitor |

## Keywords deliberately not targeted

- **Home cleaning / deep cleaning for flats** (Urban Company territory). KARGAR's documented offering is B2B and societies.
- **Housekeeping jobs Pune** (job-seeker intent). A careers page would attract applicants, not buyers.
- **Other cities** (Mumbai, Delhi, Bengaluru, Hyderabad). Not targeted until the business confirms genuine service capability there (see local SEO doc).
