# Phase A — Reconnaissance, Keyword Research & Keyword-to-URL Map

**Date:** 2026-11-05 · **Scope:** read-only audit. No site code was modified in this phase.
**Build inspected:** `frontend/dist` from 2026-11-03 (matches HEAD `d239c7c` content configs).

---

## 0. Data sources and their limits (read first)

| Source | Available? | Used for |
|---|---|---|
| Keyword ranking tracker (user-supplied, 2026-11-05) | Yes, 11 rows | Ranking baseline. These are single manual observations, **not** GSC average positions |
| Google Search Console | **No** (no export in the repo, no API access in this session) | — |
| Google Keyword Planner / any volume tool | **No** | — |
| Google Autocomplete (`suggestqueries.google.com`, `gl=in`, `hl=en`, fetched 2026-11-05) | Yes | Query variants and intent signals. Raw output in `seo-audit/data/google-autocomplete-2026-11-05.txt` |
| Live Google SERPs / competitor pages | Not yet collected | Phase 11 (competitor analysis) |
| Repository + prerendered HTML | Yes | Page inventory, metadata, canonicals, robots, links, schema |

**So:** no search volume, keyword difficulty, CPC or competition figures appear in this report, because none were measured. **All prioritisation below is provisional** until GSC query and page data (3- and 6-month) is available. Autocomplete only shows that a phrase is searched often enough to be suggested. It does not show how many people search it.

---

## 1. Existing architecture (verified)

### 1.1 How pages are wired

- **Routes:** `src/App.tsx` maps static routes, `/services/:categoryId(/:serviceId)`, every entry in `punePageList` (Pune landing pages) and every entry in `guidePageList` (`/resources/*`).
- **Single source of truth:** adding a page to `src/features/pune-landing/config/pages/*.ts` wires its route, sitemap entry, prerendered HTML, Vercel rewrite, hub card and footer link (`scripts/seo/route-inventory.ts`, `punePages.ts`).
- **Metadata:** static routes use `src/features/seo/registry.ts`. Landing pages and guides use their own `seo` field. The SEO component appends ` | KARGAR Facility Management`.
- **Prerender:** `scripts/seo/prerender.ts` writes real HTML per route. Vercel rewrites each clean URL to its `.html`. Unknown URLs return a real 404 (soft-404 catch-alls were removed in October).
- **Validators already in the build:** metadata uniqueness, canonicals, headings, alt text, schema, route coverage, link check, sitemap validation, `seo-audit.ts --strict`.
- **robots.txt:** `Allow: /`, `Disallow: /admin`, sitemap referenced. **Sitemap:** 41 URLs, which matches the indexable route inventory.
- **Footer directory:** every landing page and guide is linked from every page (41 pages link to each pillar).

### 1.2 Indexable page inventory — the 13 URLs named in the brief

All 13 exist. Every one returns prerendered HTML with exactly **one H1**, a **self-referencing canonical** and `index, follow`. Word counts are approximate, from the rendered HTML, including header and footer.

| URL | Title tag (before the brand suffix) | H1 | ~Words | Cluster / role |
|---|---|---|---|---|
| `/housekeeping-services-pune` | Housekeeping Services in Pune | Professional Housekeeping Services in Pune | 2,137 | Housekeeping **pillar** |
| `/commercial-housekeeping-services-pune` | Commercial Housekeeping in Pune | Commercial Housekeeping Services in Pune | 1,203 | HK spoke: multi-tenant common areas |
| `/office-housekeeping-services-pune` | Office Housekeeping in Pune | Office Housekeeping Services in Pune | 1,030 | HK spoke: small/mid offices |
| `/society-housekeeping-services-pune` | Society Housekeeping in Pune | Housekeeping Services for Housing Societies in Pune | 1,170 | HK spoke |
| `/healthcare-housekeeping-services-pune` | Healthcare Housekeeping, Pune | Housekeeping for Clinics & Healthcare Facilities in Pune | 905 | HK spoke |
| `/industrial-housekeeping-services-pune` | Industrial Housekeeping, Pune | Industrial Housekeeping Services in Pune | 904 | HK spoke |
| `/facility-management-company-pune` | Facility Management in Pune | Facility Management Company in Pune | 1,348 | FM **pillar** |
| `/facility-management-for-societies-pune` | Society Facility Management | Facility Management for Housing Societies in Pune | 1,006 | FM spoke |
| `/building-maintenance-services-pune` | Building Maintenance in Pune | Building Maintenance Services in Pune | 930 | Maintenance spoke: resident technician team |
| `/facility-staffing-services-pune` | Facility Staffing in Pune | Facility Staffing & Manpower Services in Pune | 856 | FM spoke |
| `/hvac-maintenance-services-pune` | HVAC Maintenance Pune | HVAC Maintenance Services in Pune | 834 | Maintenance spoke |
| `/security-services-pune` | Security Services in Pune | Security Services in Pune | 906 | Security **pillar** |
| `/stp-operation-maintenance-pune` | STP Operation & Maintenance | STP & WTP Operation and Maintenance in Pune | 877 | Maintenance spoke |

### 1.3 Other indexable pages that matter for this brief

| URL | Role | Relevance |
|---|---|---|
| `/corporate-housekeeping-services-pune` | HK spoke: large multi-floor / multi-shift offices | **Already exists.** The brief proposes mapping "corporate housekeeping" to the office page, which conflicts with this page (see §4.2) |
| `/housekeeping-staff-pune` | HK spoke: manpower supply | Owns "housekeeping staff / manpower Pune" |
| `/school-housekeeping-services-pune` | HK spoke | Educational sector |
| `/office-facility-management-pune`, `/commercial-facility-management-pune` | FM spokes | Multi-service versions of the office and commercial pages |
| `/facility-maintenance-services-pune` | Maintenance **pillar** | Exact-match page for "facility maintenance services Pune" |
| `/electrical-maintenance-services-pune`, `/plumbing-maintenance-services-pune`, `/landscaping-services-pune`, `/society-security-services-pune` | Spokes | — |
| `/`, `/services`, `/sectors`, `/company-profile`, `/support`, `/contact-us`, `/resources` | Static | Home title = "Facility Management Company"; `/services` title = "Facility Management Services" |
| `/services/{hard,soft}-services` + 4 service-detail pages | Generic service detail (non-local) | Several carry **unverified claims** (§7) |
| `/resources/*` (4 guides) | Informational | Cost guide ranks 1st page, 3rd position |

**Not built, by earlier decision (see `SEO_CANNIBALIZATION_REPORT.md`):** `best-/top-/affordable-` modifier pages, locality pages, `/facility-management-services-pune`, `/security-guard-services-pune` and `/housekeeping-manpower-pune`. This audit agrees with those decisions.

### 1.4 Structured data (example: housekeeping pillar)

The page includes Organization, LocalBusiness (with PostalAddress, ContactPoint, OpeningHours and 3× City areaServed), WebSite, Service, BreadcrumbList and FAQPage (7 Q&A). The breadcrumb trail is Home › Services › [pillar] › page.

### 1.5 Conversion layer (verified in code)

- Every landing page has 3 contact CTAs plus header and footer phone links (`tel:+917821844591`, `tel:+918788726752`).
- CTA `href` = `/contact-us#contact-form` (parameter-free, for crawl hygiene). On click, `navigateToContact` adds `?service=<page path>&source=pune_landing_hero|pune_landing_cta`.
- The contact form puts `service`, `source`, `campaign`, `category` and `cta_position` in hidden fields and prefills the Subject from the service ("Requesting Proposal for Housekeeping Services Pune").
- Tracking includes `contact_form_submit`, which fires **only after the backend confirms the lead was saved** and also sends a Google Ads conversion. It also includes `call_click` (delegated listener for every `tel:` link, plus an Ads call conversion), `whatsapp_click` and `email_click`.

**Gaps:**
1. There is no **CTA-click event**, so you cannot see which page or CTA position starts an enquiry if the visitor abandons the form.
2. `cta_position` and `category` are in hidden fields but are **not passed to `submitContactMessage`**, so they never reach the lead record.
3. There is no visible "service of interest" selector. Service context exists only in the hidden field and the subject line.

---

## 2. Keyword research (Google Autocomplete, India, 2026-11-05)

Phrases below are verbatim suggestions. The "signal" column is an interpretation and is labelled as one.

| Seed | Notable suggestions | Signal (interpretation) |
|---|---|---|
| housekeeping services in pune | **housekeeping services in pune for office**, housekeeping company in pune, housekeeping agencies in pune, **corporate housekeeping services in pune**, best housekeeping services in pune, housekeeping services in hadapsar pune, *home cleaning services in pune (+ price list, Wagholi, Urban Company)* | The head term has **mixed B2B/B2C intent**. Home-cleaning (consumer) suggestions dominate the "housekeeping services pune" variant. The office-specific and corporate-specific B2B variants are prominent |
| housekeeping company in pune | housekeeping services provider in pune, housekeeping agencies in pune, housekeeping services pune near me | Vendor-selection vocabulary: *agency*, *provider*, *company* |
| office housekeeping pune / office cleaning services pune | office cleaning services pune (price list), office deep cleaning, **commercial cleaning services in pune**, **corporate office cleaning in pune**, small office cleaning services pune | "Office cleaning" is the more common phrasing than "office housekeeping". "Small office" supports the office page's positioning |
| corporate housekeeping | **corporate housekeeping services in pune** (top suggestion, ahead of Mumbai, Chennai and Gurgaon) | Real local demand exists for the *corporate* phrasing |
| commercial housekeeping pune | (no suggestions) | Low suggestion volume. Searchers say "commercial cleaning" instead |
| facility management pune | **property management pune**, facility services pune, facility management services pune, *Logicon, Unify, Tenon, Supreme FM pune* | **Brand-heavy, navigational SERP.** Many established FM brands compete. "Property management" sits next to FM in searchers' minds |
| facility management services/company in pune | best / top facility management companies in pune, integrated facility management services in pune, property management services/company in pune, *Properties United FM reviews* | "List of companies" intent (best/top) plus "integrated" |
| facility services pune | *ISS facility services pune*, *CLR facility services pune* | Dominated by national brands (ISS) |
| integrated facility management pune | *SMC, SMS, Diamond, Unify* (brands), integrated facility management services in pune | Brand-led |
| building maintenance pune | building maintenance **course** in pune | Weak commercial suggestion signal |
| facility maintenance pune | facility management pune, facility services pune | Searchers fold "facility maintenance" into "facility management" |
| security services in pune | **security agency in pune**, **security guards in pune**, security guard services in pune, **residential security services**, **industrial security services**, top security services in pune | "Agency" and "guards" phrasing. Residential and industrial sub-intents |
| housekeeping manpower pune | housekeeping manpower **supplier** / **agency** in pune | Matches `/housekeeping-staff-pune` |
| society housekeeping pune | **society cleaning services pune**, society housekeeping services pune | "Cleaning" is a co-equal phrasing |
| society management pune | **society management services pune**, **society management companies in pune**, **housing society management services pune** | Clear demand that matches `/facility-management-for-societies-pune`. That page's title does not use this phrasing |
| deep cleaning services pune | price list, near me, charges, car, Baner, Wakad | **Consumer (home and car) intent.** Not a B2B landing-page opportunity |
| manpower services pune | manpower consultancy, staffing services pune, manpower agency pune | Includes recruitment/consultancy intent that KARGAR does not serve |

### 2.1 Intent conclusions

1. **"Housekeeping services Pune"** is KARGAR's top target but has **no ranking in the tracker**. Its SERP is likely mixed with home-cleaning (B2C) results. The pillar should signal B2B clearly (offices, societies, buildings, *agency/provider*) so it qualifies leads rather than chasing home-cleaning traffic.
2. **"Office cleaning"** and **"commercial cleaning"** are common phrasings that the office and commercial pages barely use. Their titles and H1s say "housekeeping" only.
3. **"Facility management Pune"** is a crowded, brand-led SERP. A page-3 position there is not evidence that the page is broken.
4. **"Society management services Pune"** is a real query family that is mapped but under-targeted.
5. **Security** queries use "agency" and "guards".
6. **Not targeted** (verified intent mismatch): home or deep cleaning for flats, cars, jobs, courses, recruitment consultancy and "property management" (rental). See §8.

---

## 3. Existing ranking analysis (tracker, 2026-11-05)

| Keyword | URL recorded in the tracker | Recorded position | Dedicated page for this keyword | Observation |
|---|---|---|---|---|
| Building Maintenance Services in Pune | /building-maintenance-services-pune | P1 #3 | Same | Correct page. **Protect** |
| Corporate Housekeeping Services in Pune | /office-housekeeping-services-pune | P2 #4 | **/corporate-housekeeping-services-pune** | ⚠ Google is showing the *office* page, not the dedicated *corporate* page. See §4.2 |
| Facility Staffing & Manpower Services in Pune | /facility-staffing-services-pune | P1 #1 | Same | **Protect** (exact H1 match) |
| Housekeeping Services for Housing Societies in Pune | /society-housekeeping-services-pune | P1 #1 | Same | **Protect** (exact H1 match) |
| Facility Maintenance Services in Pune | /facility-management-company-pune | P1 #1 | **/facility-maintenance-services-pune** | ⚠ The FM pillar ranks instead of the dedicated maintenance pillar. See §4.1 |
| Housekeeping Cost in Pune | /resources/housekeeping-cost-pune | P1 #3 | Same | **Protect** |
| Healthcare Housekeeping Pune | /healthcare-housekeeping-services-pune | P1 #2 | Same | **Protect** |
| Facility Management Pune | /facility-management-company-pune | P3 #5 | Same | Underperforming head term. See §4.1 |
| HVAC Maintenance Pune | /hvac-maintenance-services-pune | P1 #1 | Same | **Protect**, but the page has unverified claims (§7). Handle carefully |
| Commercial HVAC Maintenance Pune | /hvac-maintenance-services-pune | P1 #2 | Same | Same page. The generic `/services/hard-services/hvac-maintenance` is titled "Commercial HVAC Maintenance": a mild overlap |
| Society Facility Management Pune | /facility-management-for-societies-pune | P1 #2 | Same | **Protect** |

**Missing from the tracker (should be added before any changes, to give a baseline):** housekeeping services in Pune · housekeeping company in Pune · office housekeeping services Pune · office cleaning services Pune · commercial housekeeping / commercial cleaning services Pune · facility management services Pune · facility management company in Pune · facility services Pune · security services Pune · security agency in Pune · society management services Pune · housekeeping manpower supplier Pune.

---

## 4. Why related keywords rank differently for the same URL

### 4.1 `/facility-management-company-pune`: 1st position for "facility maintenance services" but page 3 for "facility management"

These are hypotheses, ordered by the strength of the evidence. **H1 and H3 need GSC to confirm.**

| # | Hypothesis | Evidence | How to confirm |
|---|---|---|---|
| H1 | **Competition differs by orders of magnitude.** "Facility management Pune" is a brand-led SERP. "Facility maintenance services in Pune" is a thin long-tail phrase | Autocomplete for "facility management pune" returns 8+ named FM brands (Logicon, Unify, Tenon, Supreme, ISS, CLR, SMS, SMC, Properties United, Diamond). "Facility maintenance pune" returns none, and Google rewrites it toward "facility management" | Phase 11 SERP review |
| H2 | **The tracker URL for "facility maintenance" may be the wrong URL, or Google prefers the FM pillar over the exact-match maintenance pillar** | A dedicated `/facility-maintenance-services-pune` (title, H1 and 18 anchors all "facility maintenance") exists. If Google ranks the FM pillar for that query, the two pillars overlap: the FM pillar's hard-services row lists the same systems | GSC → Performance → query "facility maintenance services in pune" → Pages tab |
| H3 | **Three site URLs claim "Facility Management" in the title:** `/` ("Facility Management Company"), `/services` ("Facility Management Services") and the pillar ("Facility Management in Pune"). The homepage holds the most authority and may be the URL Google tests for the head term, splitting signals | `seoRegistry` titles. `docs/seo-keyword-map.md` already flags `/` vs the pillar as "unverified" | GSC → query "facility management pune" → which pages get impressions |
| H4 | **The pillar is thinner on Pune and integrated-FM content than the housekeeping pillar** | The FM pillar has no Pune/PCMC service-area section (the HK pillar does). It has no plain-language soft/hard/support explanation, no transition or onboarding section and no cost FAQ. It uses 1,348 words against the HK pillar's 2,137 | Content diff (done) |

**Recommended direction:** do not rebuild the FM pillar. Add the missing sections (H4), keep the title and H1, and only change the homepage or `/services` titles if GSC confirms H3.

### 4.2 "Corporate Housekeeping Services in Pune" ranks the **office** page (page 2) instead of `/corporate-housekeeping-services-pune`

| # | Hypothesis | How to confirm |
|---|---|---|
| H1 | `/corporate-housekeeping-services-pune` is **not indexed**, or was only recently indexed | GSC URL Inspection |
| H2 | The office page has stronger corporate/office signals: its body says "office" throughout, it receives 41 sitewide "Office Housekeeping" anchors, and searchers treat "corporate" and "office" as synonyms | GSC Pages tab for this query |
| H3 | Leftover signal from the old `/services/soft-services/housekeeping` title "Corporate Housekeeping Service" (retitled in October) | GSC: does that page still get impressions? |

**Decision needed from you (see §9, Q1).** The brief proposes making the office page the target for corporate keywords. The repo already has a dedicated corporate page, differentiated by size: large multi-floor, multi-shift offices versus small and mid-size offices. Autocomplete shows "corporate housekeeping services in pune" as a distinct, popular phrasing. **My recommendation is to keep both pages.** Make the corporate page the clear owner of "corporate", add "office cleaning" vocabulary to the office page, and cross-link them with descriptive anchors. Consolidate only if GSC shows that the corporate page gets no impressions after it is indexed.

### 4.3 Remaining overlaps (from the earlier cannibalization report, still open)

- `/facility-maintenance-services-pune` ↔ `/building-maintenance-services-pune`: flagged as "most likely to compete". The tracker shows building maintenance ranking correctly (P1 #3). Monitor.
- `/hvac-maintenance-services-pune` ↔ `/services/hard-services/hvac-maintenance`: "Commercial HVAC Maintenance" is the generic page's title, while the Pune page ranks #2 for "commercial HVAC maintenance Pune". This is low risk while the Pune page wins.

---

## 5. Master keyword-to-page map

Priority: **P1** = highest commercial value or most at risk · **P2** = clear gain, lower urgency · **P3** = maintain.
Intent codes: **C** = commercial investigation · **T** = transactional (enquiry) · **L** = local · **I** = informational.

| Primary keyword | Secondary keywords | Intent | Target URL (existing) | New URL? | Priority | Recommended action |
|---|---|---|---|---|---|---|
| housekeeping services in Pune | housekeeping company Pune, housekeeping agency/agencies Pune, housekeeping services provider Pune, professional/contract housekeeping Pune, best housekeeping services Pune (in copy only) | C+T+L | `/housekeeping-services-pune` | No | **P1** | Improve, don't rebuild: state the B2B scope early ("for offices, societies and buildings, not home cleaning"); add a section on contract (managed) housekeeping vs manpower supply; add a "deep cleaning for business premises" block (deep cleaning is in the brochure); use agency/provider vocabulary; add an FAQ on contract terms. Keep the title and H1 |
| office housekeeping services Pune | housekeeping services in Pune for office, office cleaning services Pune, office cleaning company/contractors Pune, small office cleaning, office janitorial services, office housekeeping staff Pune | C+T+L | `/office-housekeeping-services-pune` | No | **P1** | Add "office cleaning" phrasing to the description, intro and one H2. Add a scope-of-work table for offices (desks, washrooms, pantry, meeting rooms, glass), a "switching from a part-time cleaner" section, and FAQs on contract minimums and timings. Keep the URL, title and H1 |
| corporate housekeeping services Pune | corporate office cleaning Pune, corporate cleaning services Pune, IT-park/campus housekeeping | C+T+L | `/corporate-housekeeping-services-pune` | No | **P1** | Pending Q1: confirm indexing in GSC first; strengthen the corporate page (multi-floor shift table, transition plan, reporting sample); cross-link office ↔ corporate with descriptive anchors; remove the "IT Park Housekeeping Pune" keyword (IT parks are not one of the six documented sectors, although "corporate offices" is) |
| commercial housekeeping services Pune | commercial cleaning services Pune, commercial building cleaning Pune, commercial complex housekeeping | C+L | `/commercial-housekeeping-services-pune` | No | P2 | Add "commercial cleaning" phrasing to the description and intro. Keep the multi-tenant angle |
| society housekeeping services Pune | housekeeping services for housing societies Pune, society cleaning services Pune, apartment housekeeping | C+L | `/society-housekeeping-services-pune` | No | P3 (protect) | Minimal: add "society cleaning" once, in natural copy. No structural change |
| housekeeping staff / manpower Pune | housekeeping manpower supplier/agency Pune | T+L | `/housekeeping-staff-pune` | No | P2 | Add "supplier/agency" phrasing to the description and an FAQ |
| healthcare / industrial / school housekeeping Pune | hospital housekeeping, factory housekeeping, college housekeeping | C+L | existing spokes | No | P3 (protect) | Healthcare ranks P1 #2: leave it. Industrial and school: no change now |
| facility management services Pune | facility management company Pune, facility services Pune, integrated facility management Pune, FM contractors Pune, soft/hard services Pune | C+T+L | `/facility-management-company-pune` | No | **P1** | Add a Pune/PCMC service-area section, a plain soft/hard/support explanation, a contract transition and onboarding section, and FAQs (cost drivers, single vs integrated contract, minimum scope). Keep the title and H1. Review homepage and `/services` title overlap **only after GSC** |
| facility management for housing societies Pune | society facility management Pune, **society management services Pune**, society management companies Pune, housing society management services Pune, residential facility management Pune | C+T+L | `/facility-management-for-societies-pune` | No | P2 (protect rank) | Use "society management services" in the description and intro. Title change (adding "Pune") is optional and should be gated on GSC, because the page already ranks P1 #2 |
| building maintenance services Pune | commercial building maintenance Pune, building maintenance company Pune, society maintenance services | C+L | `/building-maintenance-services-pune` | No | P3 (protect) | No rewrite. Add a short preventive-maintenance FAQ and a link to the maintenance pillar with a descriptive anchor |
| facility maintenance services Pune | preventive maintenance services Pune, technical maintenance Pune, MEP maintenance Pune | C+L | `/facility-maintenance-services-pune` | No | P2 | Confirm in GSC which URL ranks (§4.1 H2). If the FM pillar keeps winning, leave it; do not de-optimise the FM pillar |
| HVAC maintenance Pune | commercial HVAC maintenance Pune, AC maintenance contract Pune | C+L | `/hvac-maintenance-services-pune` | No | **P1 (correctness)** | Remove unverified claims (chillers, cooling towers, split/cassette ACs, IAQ testing, "IT Parks", "Retail & Malls") and replace them with the brochure scope (AHU, FCU, VRV/VRF; PPM per OEM; breakdown coordination). **Keep the title, H1 and URL** to protect the #1 position |
| electrical / DG / UPS maintenance Pune | DG set maintenance Pune, UPS maintenance Pune, electrical AMC Pune | C+L | `/electrical-maintenance-services-pune` | No | P3 | No change. DG and UPS are already covered there |
| plumbing maintenance Pune | — | C+L | `/plumbing-maintenance-services-pune` | No | P3 | No change |
| STP operation and maintenance Pune | STP operator services Pune, WTP maintenance Pune | C+L | `/stp-operation-maintenance-pune` | No | P3 | No change |
| security services Pune | **security agency in Pune**, **security guards in Pune**, security guard services Pune, industrial security services Pune | C+T+L | `/security-services-pune` | No | **P1** | Add "security agency" and "security guards" phrasing to the description, intro and an FAQ. Add an "offices, plants and campuses" use-case section; residential intent goes to `/society-security-services-pune` |
| residential / society security services Pune | apartment security, security guards for housing society | C+L | `/society-security-services-pune` | No | P3 | No change |
| facility staffing / manpower services Pune | facility manpower supply Pune, staffing services Pune | T+L | `/facility-staffing-services-pune` | No | P3 (protect, #1) | No change |
| housekeeping cost Pune | housekeeping services price Pune, office cleaning price list Pune | I→C | `/resources/housekeeping-cost-pune` | No | P3 (protect) | No change. Do not publish prices (none verified) |

**Net result: no new URLs are justified at this stage.** Every priority intent already has a dedicated page; the gaps are vocabulary (*cleaning*, *agency*, *society management*), content depth on the two pillars, and factual correctness.

---

## 6. New-page assessment (Phase G pre-check)

| Candidate | Verdict | Reason |
|---|---|---|
| `/best-housekeeping-services-pune` | ✗ | Modifier only. Same intent as the pillar; scaled-content risk |
| `/office-cleaning-services-pune` | ✗ (for now) | Same buyer and task as the office page. Cover it with vocabulary. Revisit only if GSC shows the office page getting "office cleaning" impressions but failing to rank |
| `/commercial-cleaning-services-pune` | ✗ | Same as the commercial page |
| `/facility-management-services-pune` | ✗ | Already rejected. Identical intent to the FM pillar |
| `/society-management-services-pune` | ✗ | The societies FM page already covers co-op administration and full site management |
| `/security-agency-pune`, `/security-guards-pune` | ✗ | Same intent as `/security-services-pune` |
| `/deep-cleaning-services-pune` | ✗ | The SERP is consumer (home and car) intent. KARGAR's documented deep cleaning is part of business and society contracts |
| `/property-management-pune` | ✗ (business question) | Strong autocomplete signal, but in Pune this usually means rental/NRI property management, which is **not a documented KARGAR service**. See Q4 |
| Locality pages (Hinjewadi, Kharadi, PCMC…) | ✗ | Doorway risk. The HK pillar already names service areas in one prose section |

---

## 7. Factual-verification findings (must be fixed before SEO polish)

Source of truth: Company Brochure p.2 and Company Profile, as summarised in `seo-audit/SEO_CONTENT_PLAN.md` §0. The following claims are **live but not supported** by those documents.

| Location | Unverified claim | Brochure scope |
|---|---|---|
| `pune-landing/config/pages/maintenance.ts` (HVAC Pune page: description, hero, whyChoose, industries, FAQs, keywords) | chillers, cooling towers, split/cassette ACs, "large-scale commercial chillers", indoor-air-quality testing, "IT Parks", "Retail & Malls" | HVAC = AHU, FCU, VRV/VRF. Sectors = residential, corporate, commercial, educational, healthcare, manufacturing |
| `services/config/hard-services.ts` (HVAC detail) | chillers, cooling towers, "split ACs to massive commercial chillers", IT Parks, Retail & Malls | as above |
| `services/config/hard-services.ts` (electrical detail) + `images.ts` alt text | HT panels, transformers | Electrical = LT panels, DBs, cabling, UPS rooms; DG O&M; UPS & battery |
| `services/config/soft-services.ts` (housekeeping detail) | "eco-friendly / sustainable, non-toxic cleaning agents" (the content plan lists this as unverifiable), IT Parks, Retail & Malls | — |
| HVAC "system balancing" and "duct cleaning" (HVAC Pune page, `categories.ts`, `hard-services.ts`) | Not in the brochure list | **Needs business confirmation** |
| `companyTrust.ts`: "24x7 emergency response & escalation" | The brief forbids 24x7 claims without documentary evidence. The earlier content plan cites `companyTrust.ts` (code), not a company document | **Needs business confirmation** |
| `/corporate-housekeeping-services-pune` keywords | "IT Park Housekeeping Pune" | Not a documented sector (the meta keywords tag is not used by Google; this is a hygiene fix) |

**HVAC page risk note:** the page ranks #1 and #2. The fix should change **only** the unverified items. Keep the URL, title, H1, heading structure and every verified sentence, so ranking signals stay as stable as possible while the page becomes accurate.

---

## 8. Keywords deliberately not targeted

home cleaning / deep cleaning for flats · cleaning price lists · car cleaning · housekeeping jobs or courses · manpower *consultancy* (recruitment) · property management (rental), pending Q4 · cyber security / security *systems* · other cities.

---

## 9. Decisions needed before Phase B

| # | Question | Recommendation |
|---|---|---|
| Q1 | Corporate keywords: keep `/corporate-housekeeping-services-pune` as the owner (and strengthen it), or consolidate it into the office page as the brief suggests? | **Keep both.** Confirm the corporate page's index status in GSC first |
| Q2 | Can you share a GSC export (Performance → Queries **and** Pages, last 3 and 6 months), or URL Inspection results for `/corporate-housekeeping-services-pune` and `/facility-maintenance-services-pune`? | Needed to confirm §4 and to move priorities from provisional to measured |
| Q3 | Do the company documents support HVAC **duct cleaning / system balancing** and **24x7 emergency response**? | If not confirmed, remove them along with the other §7 items |
| Q4 | Does KARGAR offer **property management** (rental/tenant management) in any form? | If not, keep excluding it |

---

## 10. Proposed execution order (from Phase B)

1. **B: housekeeping pillar.** B2B qualification, contract-vs-manpower section, business deep-cleaning block, agency/provider vocabulary, FAQs.
2. **C: FM pillar.** Pune/PCMC service area, soft/hard/support explainer, transition section, FAQs.
3. **D: office and corporate (per Q1), then commercial.** Cleaning vocabulary, office scope table, cross-links.
4. **E: correctness pass on the HVAC Pune page and the `/services/*` detail pages (§7),** plus small additions to building maintenance.
5. **F: metadata descriptions** (security, societies FM, housekeeping staff), contextual anchors, the CTA-click event and passing `cta_position`/`category` into the lead record. UI changes go through accessibility review.
6. **G: no new pages,** unless GSC data changes §6.
7. **H: full validation.** `tsc`, ESLint, `git diff --check`, `npm run build` with `PRERENDER_CONCURRENCY=1`, sitemap and strict SEO audit, raw-HTML checks, desktop and mobile Playwright, mocked enquiry flow.
