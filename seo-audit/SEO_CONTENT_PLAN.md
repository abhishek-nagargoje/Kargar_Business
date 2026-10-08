# SEO Content Plan — KARGAR Pune Topical Architecture

**Date:** 2026-10-08 · **Status:** Implemented (see `SEO_AUDIT_AFTER.md` for verification)

## 0. Source-of-truth rule for every page

Every factual claim on every page below must trace to one of:

| Source | What it verifies |
|---|---|
| `frontend/public/assets/documents/Company Brochure.pdf` (p.2) | Full service list: **Soft** — housekeeping (daily/weekly/monthly + deep cleaning), pantry, waste management (wet/dry segregation), washroom hygiene, landscaping & horticulture, security guards. **Hard** — electrical (LT panels, DBs, cabling, UPS rooms), HVAC (AHU, FCU, VRV/VRF), DG O&M, UPS & battery, fire alarm & fire-fighting systems, plumbing & water systems, STP/WTP operations, BMS monitoring, PPM per OEM schedules, breakdown maintenance coordination; AMC / on-call / incidental. **Support** — mailroom, helpdesk & ticketing, statutory documentation, daily/weekly/monthly reporting, tools/tackles & consumables. Sectors: commercial, corporate, educational, healthcare, manufacturing, residential. |
| `Company Profile.pdf` p.3–9 | Residential societies as core Pune segment; org structures (facility/site manager, housekeeping execs, office boys, STP/WTP/MST operators, gardeners, OWC operator, watchmen & gatekeepers, security guards/supervisors, surveillance operators, bouncers, valets, lift operators, electrician, plumber, fire technician, solar maintenance, MLCP operator, lifeguards, gym instructors); co-op society services (registration & handover, account audit & statutory documentation, share certificates, conveyance / deemed conveyance, AGM & registrar filings); **PURNA** protocol (Prepare, Unite, Reset, Nurture, Analyse). |
| `Company Profile.pdf` p.10–11 | "100% financial transparency — you have the right to ask for compensation paid to staff deployed at your site"; year-round skill/safety/behavioural training by Field Trainers and Quality Managers; **98% client retention / 95% employee retention** (as reported by the company). |
| `Company Profile.pdf` p.17 + `recognitions.ts` | Punyashlok Ahilya Devi Holkar Woman Startup Award, 20 Sep 2024, Wardha; Government of Maharashtra grant. |
| `companyTrust.ts` | Police verification & background checks, PF & ESIC / labour-law compliance, digital reporting, attendance tracking, 24x7 emergency response & escalation. |
| `contact.ts` / profile p.18 | Baner, Pune office; phone/email. |

**Deliberately NOT used on new pages** (unverifiable from documents — flagged in `SEO_AUDIT_BEFORE.md` §6): "10+ years", "10,000+ clients", "2,000+ workforce", "50+ sites", "5+ cities", "ISO-aligned", "eco-friendly chemicals", any price, any named client, any SLA/response-time number, any certification.

## 1. Architecture

```
Home
 └─ /services (hub)                                   ← grouped cluster directory
     ├─ /housekeeping-services-pune  (PILLAR)
     │    ├─ /commercial-housekeeping-services-pune
     │    ├─ /corporate-housekeeping-services-pune
     │    ├─ /office-housekeeping-services-pune
     │    ├─ /society-housekeeping-services-pune
     │    ├─ /housekeeping-staff-pune
     │    ├─ /industrial-housekeeping-services-pune
     │    ├─ /school-housekeeping-services-pune
     │    └─ /healthcare-housekeeping-services-pune
     ├─ /facility-management-company-pune  (PILLAR — "company" + "services")
     │    ├─ /facility-management-for-societies-pune
     │    ├─ /office-facility-management-pune
     │    ├─ /commercial-facility-management-pune
     │    ├─ /facility-staffing-services-pune
     │    └─ /landscaping-services-pune        (soft service per brochure → FM cluster)
     ├─ /facility-maintenance-services-pune  (PILLAR — hard services)
     │    ├─ /electrical-maintenance-services-pune   (existing, rewritten)
     │    ├─ /hvac-maintenance-services-pune         (existing)
     │    ├─ /plumbing-maintenance-services-pune
     │    ├─ /building-maintenance-services-pune
     │    └─ /stp-operation-maintenance-pune
     └─ /security-services-pune  (PILLAR — existing)
          └─ /society-security-services-pune
 └─ /resources (hub)
      ├─ /resources/how-to-choose-a-housekeeping-company-pune
      ├─ /resources/office-housekeeping-checklist
      ├─ /resources/housekeeping-cost-pune
      └─ /resources/how-many-housekeeping-staff
```

URL policy: lowercase, hyphenated, **no trailing slash** (matches existing indexed URLs, canonicals and `vercel.json` `trailingSlash:false`). Commercial pages stay at root level beside the existing Pune pages; only informational guides live under `/resources/`.

## 2. Page briefs

Titles are shown before the automatic ` | KARGAR Facility Management` suffix (validator: 21–31 chars). Descriptions 140–160 chars.

### Pillar (rewritten)

| Field | /housekeeping-services-pune |
|---|---|
| Primary KW | housekeeping services Pune |
| Secondary | housekeeping company Pune, housekeeping services in Pune, professional housekeeping services Pune |
| Intent | Commercial — buyer comparing providers for any property type |
| Audience | Admin/facility managers, society managing committees, school/clinic administrators |
| Title / H1 | Housekeeping Services in Pune / Professional Housekeeping Services in Pune |
| H2s | What KARGAR's housekeeping covers · Property types (links to each sub-page) · How deployment works (PURNA) · Supervision & quality control · Staffing & compliance · Daily/weekly/monthly scope table · In-house vs outsourced · What to evaluate · FAQ |
| Links out | All 8 housekeeping sub-pages, FM pillar, security, maintenance, 3 guides, contact |
| Schema | Service (areaServed Pune), BreadcrumbList, FAQPage |
| CTA | Get a Housekeeping Proposal |
| UVP | Society + commercial + institutional coverage under one documented operating model (PURNA), payroll transparency |

### Housekeeping cluster

| URL | Primary KW | Distinct intent / angle (why it is NOT a duplicate) | Title | H1 | Unique body structure |
|---|---|---|---|---|---|
| /commercial-housekeeping-services-pune | commercial housekeeping services Pune | **Multi-tenant commercial buildings & complexes** — common areas, lobbies, washroom blocks, façade-adjacent areas, parking; buyer = building owner/association | Commercial Housekeeping in Pune | Commercial Housekeeping Services in Pune | Zones table (zone → typical tasks → frequency); shift-coverage cards; common-area vs tenant-area split |
| /corporate-housekeeping-services-pune | corporate housekeeping services Pune | **Large corporate campuses / IT-park tenants** — multi-floor, multi-shift, reporting to admin/HR, audits, visitor-facing standards | Corporate Housekeeping in Pune | Corporate Housekeeping Services in Pune | Governance/reporting section; escalation steps; meeting-room/pantry/reception standards; contract-transition steps |
| /office-housekeeping-services-pune | office housekeeping services Pune | **Small & mid-size offices** (1–3 floors, single site) — how few staff are needed, pantry/office-boy roles, consumables | Office Housekeeping in Pune | Office Housekeeping Services in Pune | "A typical office day" timeline; role cards (housekeeping exec, office boy/pantry); link to checklist guide |
| /society-housekeeping-services-pune | society housekeeping services Pune | **Co-operative housing societies** — common areas, wet/dry segregation, OWC, STP areas, gardens; buyer = managing committee | Society Housekeeping in Pune | Housekeeping Services for Housing Societies in Pune | Committee decision section; society-area checklist; waste-segregation workflow; payroll-transparency callout |
| /housekeeping-staff-pune | housekeeping staff Pune; housekeeping manpower Pune | **Manpower supply** — buyer wants people deployed on contract: roles, replacement, attendance, PF/ESIC | Housekeeping Staff in Pune | Housekeeping Staff & Manpower Supply in Pune | Roles table; what happens on absence; compliance cards; deployment steps |
| /industrial-housekeeping-services-pune | industrial housekeeping services Pune | **Manufacturing plants & warehouses** (Chakan/Bhosari/Talegaon belts) — shop floor, safety, shift-aligned cleaning | Industrial Housekeeping, Pune | Industrial Housekeeping Services in Pune | Area table (shop floor/canteen/washrooms/admin block); safety-induction section |
| /school-housekeeping-services-pune | school housekeeping services Pune | **Educational institutes** — classrooms, washrooms used by children, timing around school hours, vacation deep cleans | School Housekeeping in Pune | Housekeeping for Schools & Educational Institutes in Pune | School-calendar timing table; child-safe conduct section |
| /healthcare-housekeeping-services-pune | hospital/healthcare housekeeping Pune | **Clinics & healthcare facilities** — non-clinical & patient-area hygiene following the facility's own infection-control protocol (KARGAR does not claim BMW handling) | Healthcare Housekeeping, Pune | Housekeeping for Clinics & Healthcare Facilities in Pune | Responsibility split table (facility vs KARGAR); protocol-alignment steps |

### Facility management cluster

| URL | Primary KW | Distinct intent | Title | H1 | Unique structure |
|---|---|---|---|---|---|
| /facility-management-company-pune (rewritten pillar) | facility management company Pune; facility management services Pune | Vendor selection for integrated FM | Facility Management in Pune | Facility Management Company in Pune | Soft/hard/support service matrix; PURNA steps; sectors; how to evaluate an FM company |
| /facility-management-for-societies-pune | facility management for housing societies Pune | **Society management** incl. co-op administration (registration, audit, conveyance, AGM) — KARGAR's documented core offering | Society Facility Management | Facility Management for Housing Societies in Pune | Org-structure section; co-op services list; committee FAQs |
| /office-facility-management-pune | office facility management Pune | **Single-occupier office** — support services (front desk, mailroom, helpdesk, pantry) + soft + minor hard | Office Facility Management Pune | Office Facility Management in Pune | Service-desk/ticket flow steps; "one point of contact" structure |
| /commercial-facility-management-pune | commercial facility management Pune | **Commercial building owners/associations** — multi-tenant, common-area MEP, vendor consolidation | Commercial Facility Management | Commercial Facility Management in Pune | Owner vs tenant responsibility table; vendor consolidation section |
| /facility-staffing-services-pune | facility staffing Pune; manpower services Pune | **Multi-role manpower** (housekeeping, security, technicians, front desk, pantry) on KARGAR payroll | Facility Staffing in Pune | Facility Staffing & Manpower Services in Pune | Role-family table; compliance (PF/ESIC); payroll transparency |

### Maintenance & security cluster

| URL | Primary KW | Distinct intent | Title | H1 |
|---|---|---|---|---|
| /facility-maintenance-services-pune (new pillar) | facility maintenance services Pune; commercial maintenance services Pune | Hard-services umbrella: PPM vs breakdown, AMC vs on-call, multi-trade technicians | Facility Maintenance in Pune | Facility Maintenance Services in Pune |
| /electrical-maintenance-services-pune (rewritten) | electrical maintenance services Pune | Pune-specific electrical upkeep: panels, DBs, UPS rooms, DG, earthing; monsoon considerations | Electrical Maintenance Pune | Electrical Maintenance Services in Pune |
| /plumbing-maintenance-services-pune | plumbing maintenance services Pune | Building plumbing & water systems: pumps, tanks, leakage, water audits — B2B, not household repair | Plumbing Maintenance in Pune | Plumbing & Water System Maintenance in Pune |
| /building-maintenance-services-pune | building maintenance services Pune | Residential & commercial **building upkeep** — common-area MEP, lifts (operators), fire systems, MLCP, solar | Building Maintenance in Pune | Building Maintenance Services in Pune |
| /stp-operation-maintenance-pune | STP operation and maintenance Pune | Daily STP/WTP operation by trained operators for societies & campuses | STP Operation & Maintenance | STP & WTP Operation and Maintenance in Pune |
| /landscaping-services-pune | landscaping maintenance services Pune | Ongoing garden/landscape upkeep for societies & campuses (not one-off design) | Landscaping Maintenance Pune | Landscaping & Garden Maintenance in Pune |
| /society-security-services-pune | society security services Pune | Gatekeeping, visitor management, watchmen, valets for residential societies (vs corporate security pillar) | Society Security Services Pune | Security Services for Housing Societies in Pune |

### Resources (informational, Article schema, organization authorship — no invented authors)

| URL | Primary KW | Intent | Title | H1 |
|---|---|---|---|---|
| /resources | facility management resources | Hub | Facility Management Resources | Facility Management Guides & Resources |
| /resources/how-to-choose-a-housekeeping-company-pune | how to choose housekeeping company Pune | Commercial investigation | Choosing a Housekeeping Company | How to Choose a Housekeeping Company in Pune |
| /resources/office-housekeeping-checklist | office housekeeping checklist | Informational (template) | Office Housekeeping Checklist | Office Housekeeping Checklist: Daily, Weekly and Monthly Tasks |
| /resources/housekeeping-cost-pune | housekeeping services cost Pune | Commercial investigation — explains cost drivers, **no prices** | Housekeeping Cost in Pune | What Determines the Cost of Housekeeping Services in Pune |
| /resources/how-many-housekeeping-staff | how many housekeeping staff needed | Informational (planning method) | How Many Housekeeping Staff? | How Many Housekeeping Staff Does Your Building Need? |

## 3. Rejected / merged ideas (cannibalization control)

| Proposed in brief | Decision | Reason |
|---|---|---|
| /facility-management-services-pune | **Merged** into /facility-management-company-pune | SERP intent for "services Pune" and "company Pune" is the same vendor-selection intent; two pages would split signals |
| /housekeeping-manpower-pune | **Merged** into /housekeeping-staff-pune | "staff" and "manpower" are synonyms for the same contract-deployment intent in Indian usage |
| /housekeeping-services-for-offices-pune | **Dropped** | Same intent as /office-housekeeping-services-pune |
| /security-guard-services-pune | **Mapped** to existing /security-services-pune; new page targets *society* security instead | "security guard services Pune" ≈ "security services Pune" |
| Locality pages (Wakad, Baner, Hinjewadi…) | **Not created** | No locality-specific operational facts are documented; template-swapped locality pages would be doorway pages. Localities are referenced in context on the pillars instead |
| "Best / Affordable / Top housekeeping Pune" variants | **Not created** | Modifier-only variants of the pillar = scaled duplicate content |
| Deep-cleaning page | **Not created** | SERP is dominated by household (B2C) deep cleaning; KARGAR is B2B — mismatch |
