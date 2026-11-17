# 04 — SEO Page Architecture

**Date:** 2026-11-17 · **Indexable URLs:** 44 (was 41)

## How a page is wired (unchanged)

Adding an entry to `frontend/src/features/pune-landing/config/pages/*.ts` (or `features/resources/config/guides.ts`) automatically creates the route (`App.tsx`), sitemap entry, prerendered HTML, Vercel rewrite, hub card, footer link, breadcrumb and Service/FAQPage/BreadcrumbList JSON-LD. There is no other wiring step. The build fails if metadata, links, headings, schema or route coverage are invalid.

## Tree (★ = new in this release, ▲ = materially expanded)

```
/  (home)
└─ /services  (hub)
    ├─ /housekeeping-services-pune ▲ ............ PILLAR  "housekeeping services in Pune"
    │   ├─ /commercial-housekeeping-services-pune ▲ (vocabulary)
    │   ├─ /corporate-housekeeping-services-pune ▲ (corrected sector, cross-link)
    │   ├─ /office-housekeeping-services-pune ▲ (office cleaning vocabulary, FAQ)
    │   ├─ /society-housekeeping-services-pune
    │   ├─ /housekeeping-staff-pune ▲ (supplier/agency vocabulary, FAQ)
    │   ├─ /industrial-housekeeping-services-pune ▲ (cross-link to industrial security)
    │   ├─ /school-housekeeping-services-pune
    │   └─ /healthcare-housekeeping-services-pune
    ├─ /facility-management-company-pune ▲ ...... PILLAR  "facility management company/services Pune"
    │   ├─ /facility-management-for-societies-pune
    │   ├─ /office-facility-management-pune
    │   ├─ /commercial-facility-management-pune
    │   ├─ /facility-staffing-services-pune
    │   └─ /landscaping-services-pune
    ├─ /facility-maintenance-services-pune ....... PILLAR  (electrical, HVAC, plumbing, building, STP spokes, unchanged)
    └─ /security-services-pune ▲ ................ PILLAR  "security services / agency / guards in Pune"
        ├─ /corporate-security-services-pune ★ ..... "corporate / office / commercial security Pune"
        ├─ /industrial-security-services-pune ★ .... "industrial / factory / warehouse security Pune"
        └─ /society-security-services-pune ▲ (unverified "certified" removed)
└─ /resources  (hub)
    ├─ … 4 existing housekeeping guides
    └─ /resources/how-to-choose-a-security-agency-pune ★  "how to choose a security agency"
```

Click depth: every page is reachable in ≤2 clicks from the home page (footer directory + /services hub), and pillars link to every spoke contextually.

## New pages: primary and secondary keywords

| URL | Title (+ " \| KARGAR Facility Management") | H1 | Primary | Secondary | Schema |
|---|---|---|---|---|---|
| /corporate-security-services-pune | Corporate Security in Pune | Corporate Security Services in Pune | corporate security services Pune | office security services Pune, commercial security services Pune, corporate security guards Pune | Service, FAQPage, BreadcrumbList |
| /industrial-security-services-pune | Industrial Security in Pune | Industrial Security Services in Pune | industrial security services Pune | factory security services Pune, warehouse security Pune, industrial security guards Pune | Service, FAQPage, BreadcrumbList |
| /resources/how-to-choose-a-security-agency-pune | Choosing a Security Agency | How to Choose a Security Agency in Pune | how to choose a security agency | security agency selection Pune, hiring security guards checklist | Article, FAQPage, BreadcrumbList |

## Why each new page is not a duplicate

| Page | Distinct buyer | Distinct body structure |
|---|---|---|
| Corporate security | Admin/HR of an office, or owner/association of a commercial building | Office post table (reception, floor access, parking, loading, CCTV, after-hours); 5-step visitor and access procedure; single-occupier vs multi-tenant comparison |
| Industrial security | Plant head, HR, warehouse manager | Plant post table (main, material and contractor gates, perimeter, stores/scrap, CCTV); shift-changeover routine; gate-pass/vehicle/labour SOP checklist; manufacturing-belt context; principal-employer compliance |
| Security agency guide | Anyone comparing agencies (MOFU) | Selection steps; documents to request; question/good-answer table; warning vs good signs; compliance explainer; guard-count method |
| Security pillar | Any security buyer (umbrella) | Agency definition; property-type router; roles table; deployment steps; guard-count worked example; screening and training; hiring checklist; coverage |

## Proposed but deliberately not built

`/security-guard-services-pune` (same intent as the pillar), `/facility-management-services-pune` (same as the FM pillar), `/office-cleaning-services-pune` and `/commercial-cleaning-services-pune` (vocabulary on existing pages), `/housekeeping-manpower-services-pune` (= `/housekeeping-staff-pune`), all locality pages (doorway risk). See `02_KEYWORD_RESEARCH.md` §E.
