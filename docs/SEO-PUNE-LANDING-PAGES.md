# SEO Pune Landing Pages — Content & Validation Map

**Status:** Implemented, committed (`8d21612`), pushed to `main`, and verified live in production as of 2026-09-23.

This is the requested per-page reference table. For the full architecture rationale (why 5 pages and not 15, why they're a decoupled content model, the anti-doorway/anti-cannibalization reasoning), see `docs/SEO-LANDING-PAGE-ARCHITECTURE.md`. For the original technical validation run (build/lint/prerender/SEO-pipeline results), see `docs/SEO-LANDING-PAGE-AUDIT.md`.

---

## 1. Housekeeping Services Pune

| Field | Value |
|---|---|
| **Page** | `/housekeeping-services-pune` |
| **Primary keyword** | Housekeeping Services Pune |
| **Search intent** | Local commercial — "who do I hire for housekeeping in Pune" |
| **Existing related page** | `/services/soft-services/housekeeping` (service-detail intent — retitled to "Corporate Housekeeping Service" to remove a title collision with this page) |
| **Canonical** | `https://www.kargarbusinessservices.com/housekeeping-services-pune` (self-referencing) |
| **Title** | Housekeeping Services in Pune \| KARGAR Facility Management |
| **H1** | Housekeeping Services in Pune |
| **Meta description** | "Professional housekeeping services in Pune for corporate offices, IT parks, and commercial and industrial facilities, from KARGAR Facility Management." |
| **Internal links in** | Homepage, `/services`, `/sectors`, `/services/soft-services/housekeeping`, `/services/soft-services` (category hub) |
| **Internal links out** | `/services/soft-services/housekeeping` (service detail), sibling Pune pages (`facility-management-company-pune`, `security-services-pune`), `/services/soft-services`, `/contact-us` |
| **Schema** | `Service` (areaServed: Pune, provider → Organization `@id`), `FAQPage` (5 real FAQs), `BreadcrumbList` |
| **Sitemap** | ✅ Included |
| **Prerender** | ✅ Static HTML verified — title/meta/canonical/H1/JSON-LD/body content all present |
| **Validation status** | PASS |

## 2. Security Services Pune

| Field | Value |
|---|---|
| **Page** | `/security-services-pune` |
| **Primary keyword** | Security Services Pune |
| **Search intent** | Local commercial |
| **Existing related page** | `/services/soft-services/security-services` (service-detail intent, unchanged) |
| **Canonical** | `https://www.kargarbusinessservices.com/security-services-pune` |
| **Title** | Security Services in Pune \| KARGAR Facility Management |
| **H1** | Security Services in Pune |
| **Meta description** | "Trained security guards, access control, and 24/7 CCTV surveillance monitoring for corporate and industrial facilities in Pune, from KARGAR Facility Management." |
| **Internal links in** | Homepage, `/services`, `/sectors`, `/services/soft-services/security-services`, `/services/soft-services` |
| **Internal links out** | `/services/soft-services/security-services`, sibling Pune pages, `/services/soft-services`, `/contact-us` |
| **Schema** | `Service`, `FAQPage` (5 FAQs), `BreadcrumbList` |
| **Sitemap** | ✅ Included |
| **Prerender** | ✅ Verified |
| **Validation status** | PASS |

## 3. Electrical Maintenance Services Pune

| Field | Value |
|---|---|
| **Page** | `/electrical-maintenance-services-pune` |
| **Primary keyword** | Electrical Maintenance Services Pune |
| **Search intent** | Local commercial |
| **Existing related page** | `/services/hard-services/electrical-maintenance` |
| **Canonical** | `https://www.kargarbusinessservices.com/electrical-maintenance-services-pune` |
| **Title** | Electrical Maintenance Pune \| KARGAR Facility Management |
| **H1** | Electrical Maintenance Services in Pune |
| **Meta description** | "Preventive and emergency electrical maintenance for LT/HT panels, transformers, and backup generators at corporate and industrial facilities in Pune." |
| **Internal links in** | Homepage, `/services`, `/services/hard-services/electrical-maintenance`, `/services/hard-services` (category hub) |
| **Internal links out** | `/services/hard-services/electrical-maintenance`, `hvac-maintenance-services-pune`, `/services/hard-services`, `/contact-us` |
| **Schema** | `Service`, `FAQPage` (4 FAQs), `BreadcrumbList` |
| **Sitemap** | ✅ Included |
| **Prerender** | ✅ Verified |
| **Validation status** | PASS |

## 4. HVAC Maintenance Services Pune

| Field | Value |
|---|---|
| **Page** | `/hvac-maintenance-services-pune` |
| **Primary keyword** | HVAC Maintenance Services Pune |
| **Search intent** | Local commercial |
| **Existing related page** | `/services/hard-services/hvac-maintenance` |
| **Canonical** | `https://www.kargarbusinessservices.com/hvac-maintenance-services-pune` |
| **Title** | HVAC Maintenance Pune \| KARGAR Facility Management |
| **H1** | HVAC Maintenance Services in Pune |
| **Meta description** | "Preventive HVAC servicing for chillers, AHUs, VRV/VRF systems, and cooling towers at facilities in Pune. Schedule service with KARGAR Facility Management." |
| **Internal links in** | Homepage, `/services`, `/services/hard-services/hvac-maintenance`, `/services/hard-services`, `/sectors` (Corporate Offices card) |
| **Internal links out** | `/services/hard-services/hvac-maintenance`, `electrical-maintenance-services-pune`, `/services/hard-services`, `/contact-us` |
| **Schema** | `Service`, `FAQPage` (4 FAQs), `BreadcrumbList` |
| **Sitemap** | ✅ Included |
| **Prerender** | ✅ Verified |
| **Validation status** | PASS |

## 5. Facility Management Company Pune

| Field | Value |
|---|---|
| **Page** | `/facility-management-company-pune` |
| **Primary keyword** | Facility Management Company Pune |
| **Search intent** | Local commercial, company-level ("who to hire" rather than a specific service) |
| **Existing related page** | `/services` (full catalog hub) and `/company-profile` (company narrative) |
| **Canonical** | `https://www.kargarbusinessservices.com/facility-management-company-pune` |
| **Title** | Facility Management Pune \| KARGAR Facility Management |
| **H1** | Facility Management Company in Pune |
| **Meta description** | "KARGAR Facility Management delivers integrated housekeeping, security, electrical, and HVAC maintenance for corporate facilities across Pune, Maharashtra." |
| **Internal links in** | Homepage, `/services`, `/company-profile` |
| **Internal links out** | `/services` (full catalog), all 4 other Pune pages, `/company-profile`, `/contact-us` |
| **Schema** | `Service` (serviceType: Integrated Facility Management), `FAQPage` (4 FAQs), `BreadcrumbList` |
| **Sitemap** | ✅ Included |
| **Prerender** | ✅ Verified |
| **Validation status** | PASS |

---

## Keyword-to-page mapping (cannibalization guard)

| Keyword intent | Owns it | Does NOT own it |
|---|---|---|
| "Housekeeping services Pune" (local/commercial) | `/housekeeping-services-pune` | `/services/soft-services/housekeeping` (retitled to own "Corporate Housekeeping Service" / service-detail intent instead) |
| "Security services Pune" | `/security-services-pune` | `/services/soft-services/security-services` (service-detail intent, distinct title) |
| "Electrical maintenance Pune" | `/electrical-maintenance-services-pune` | `/services/hard-services/electrical-maintenance` |
| "HVAC maintenance Pune" | `/hvac-maintenance-services-pune` | `/services/hard-services/hvac-maintenance` |
| "Facility management company Pune" | `/facility-management-company-pune` | `/services` (broad hub, no location targeting), `/company-profile` (company narrative, no primary keyword targeting) |

No two indexable pages target an identical primary keyword — verified by the build pipeline's own `validate-metadata` duplicate-title/description check, which currently passes with 18 indexed pages.

## Company statistics used (source of truth, reconciled)

All company-wide figures referenced on `/facility-management-company-pune` (the only one of the 5 pages that cites company-wide stats — the other 4 are service-specific and don't) use the reconciled canonical set: **10+ years, 2,000+ skilled workforce, 10,000+ happy clients, 50+ sites managed, 5+ cities pan India**. No numeric claim on any of the 5 pages was invented — all are drawn from this same set already used consistently across `/`, `/services`, and `/company-profile`.

## Deliberately not built (anti-doorway decision)

Per the brief's own anti-doorway rules, no location-sub-variant pages (`/housekeeping-services-hinjewadi`, `/housekeeping-services-wakad`, etc.) or service-segment variants (`/commercial-housekeeping-services-pune`, `/security-guard-services-pune`, `/facility-management-services-pune`, `/soft-services-pune`, `/hard-services-pune`, etc.) were created — see `docs/SEO-LANDING-PAGE-ARCHITECTURE.md` §3 for the full reasoning per cluster.

## Production verification (2026-09-23)

All 5 URLs re-checked directly against live production:

```
/housekeeping-services-pune              → 200
/security-services-pune                  → 200
/electrical-maintenance-services-pune    → 200
/hvac-maintenance-services-pune          → 200
/facility-management-company-pune        → 200
```

**Note:** production titles currently render with the brand suffix "Kargar Facility Management" (old casing) rather than "KARGAR Facility Management" — this is the previously-identified, still-open `VITE_SITE_NAME` Vercel environment variable issue (documented in `docs/LIVE-SEO-AUDIT.md` §1), unrelated to this page set's implementation. It requires a manual Vercel dashboard change and redeploy, which is outside this codebase's reach.
