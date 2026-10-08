# Cannibalization Report

## 1. Decisions taken before writing (avoided duplicates)

| Candidate pages | Overlap | Resolution |
|---|---|---|
| facility-management-services-pune vs facility-management-company-pune | Same vendor-selection intent | **Not created.** Existing `/facility-management-company-pune` targets both; title "Facility Management in Pune", H1 "Facility Management Company in Pune" |
| housekeeping-staff-pune vs housekeeping-manpower-pune | Synonyms | **Merged** into `/housekeeping-staff-pune` ("Housekeeping Staff & Manpower Supply in Pune") |
| office-housekeeping-services-pune vs housekeeping-services-for-offices-pune | Identical | **Second not created** |
| security-guard-services-pune vs security-services-pune | Near-identical | **Not created.** Keyword mapped to `/security-services-pune`; new page targets the distinct *society* security intent |
| "best/affordable/top housekeeping Pune" variants | Modifier-only | **Not created** (scaled-content risk) |
| Locality pages | Template-swap doorway risk | **Not created** |

## 2. Remaining overlaps to monitor (deliberately differentiated)

| Pair | Shared terms | How they are differentiated | Monitor in GSC |
|---|---|---|---|
| /housekeeping-services-pune ↔ /services/soft-services/housekeeping | "housekeeping services" | Pune pillar = local commercial intent, all property types, title "Housekeeping Services in Pune"; service page = generic service detail, titled "Corporate Housekeeping Service", links to the Pune page | If the service page ranks for "housekeeping services Pune", strengthen its link to the pillar with Pune anchor text |
| /corporate-housekeeping-services-pune ↔ /services/soft-services/housekeeping (title "Corporate Housekeeping Service") | "corporate housekeeping" | Pune page = multi-floor governance, shifts, transitions; service page title predates this pass | **Recommended follow-up:** retitle the service page to "Housekeeping Service Overview" if GSC shows both pages receiving impressions for "corporate housekeeping pune" |
| /commercial-housekeeping-services-pune ↔ /commercial-facility-management-pune | "commercial", "Pune" | Housekeeping-only common-area cleaning vs. owner-level multi-service management (security + building systems) | Queries containing "facility management" should land on FM |
| /office-housekeeping-services-pune ↔ /corporate-housekeeping-services-pune | "office housekeeping" | Small/mid single-site offices (roles, daily timeline) vs large multi-floor campuses (governance, escalation) | Watch "office housekeeping pune" |
| /office-housekeeping-services-pune ↔ /office-facility-management-pune | "office" | Cleaning/pantry vs. multi-service (front desk, mailroom, helpdesk, maintenance) | — |
| /society-housekeeping-services-pune ↔ /facility-management-for-societies-pune | "society", "Pune" | Housekeeping & waste only vs. full org structure + co-op administration | Watch "society management pune" |
| /housekeeping-staff-pune ↔ /facility-staffing-services-pune | "staff", "manpower" | Housekeeping roles only vs. all facility role families | Watch "manpower services pune" |
| /facility-maintenance-services-pune ↔ /building-maintenance-services-pune | "maintenance" | System-level PPM/AMC/breakdown model (all property types) vs. resident technician team for societies/commercial buildings | Most likely pair to compete; merge if GSC shows the same queries split between them after 3 months |
| /electrical-maintenance-services-pune ↔ /services/hard-services/electrical-maintenance | "electrical maintenance" | Pune page rewritten around Pune sites (monsoon readiness, property types, asset table); explicitly links to the service page for the generic description | Was "Discovered – not indexed"; recheck after recrawl |
| /hvac-maintenance-services-pune ↔ /services/hard-services/hvac-maintenance | "HVAC maintenance" | **Not rewritten in this pass** — content is still close to the service page | **Open risk (P2):** rewrite with Pune-specific operating content, or consolidate |

## 3. Similarity check method

Titles, descriptions and H1s are machine-checked for exact duplicates by `scripts/seo/validate-metadata.ts` (build-blocking) and `scripts/seo-audit.ts`. Body similarity was controlled at authoring time: each page uses a different section sequence (table/steps/checklist/compare/cards) and page-specific FAQs. See `SEO_AUDIT_AFTER.md` §5 for the measured pairwise similarity of rendered main content.
