# Competitor Analysis — Pune Housekeeping & Facility Management

**Date:** 2026-10-14
**Method and limitations (read first):**
- SERP discovery used a web-search tool whose index is **US-region, not Google India**. Results show *who is visible for these queries*. They are **not Google.co.in rankings or positions**, and no position numbers are claimed anywhere in this document.
- On-page data (title, meta description, H1, H2s, schema types, word count, links, images, tel/WhatsApp/form presence) was **measured directly** by fetching each URL's HTML on 2026-10-14 with the repo's own `analyzeHtml` parser (`frontend/scripts/seo/crawl-utils.ts`). Word count is all visible text, including nav and footer.
- **Not available:** search volumes, keyword difficulty, backlinks, referring domains, Domain Authority. No Ahrefs/Semrush/DataForSEO/Moz credentials exist in this environment, so no such numbers are given.
- Competitor claims (years in business, client names, certifications) are **as stated by the competitor** and were not verified.

## 1. Who appears for each keyword group

| Keyword group | Observed results (domain → URL) | Type |
|---|---|---|
| housekeeping services Pune | sulekha.com/housekeeping-services/pune · m.indiamart.com (several) · business.google.com (GBP pages) · urbancompany.com/pune-home-cleaning-services · ventori-hub.lovable.app · dirtblastercleaningservices.com/housekeeping-services-pune/ · 360facility.in/housekeeping-services-in-pune/ | Directories, GBP, home-cleaning marketplace, small operators |
| housekeeping company Pune | ventori-hub.lovable.app · blog.facilitybot.co (Pune FM listicle) · IndiaMART · GBP · job boards (teamlease, Marriott careers) | Mixed; job-seeker intent leaks in |
| commercial housekeeping Pune | IndiaMART (Maxwell Facilities, V M Force, Pole Star) · krestfacilityservices.com/pune/corporate-housekeeping-services.html · hpfms.in/corporate-housekeeping-services/ · arisefacility.com/corporate-housekeeping-services-in-pune/ · viaantecs.com · sulekha.com/corporate-housekeeping-services/pune | Directories + operator service pages |
| facility management services Pune | blog.facilitybot.co listicle · linkedin.com/company/psps · IndiaMART · naiconfms.com · 360facility.in/services/ · originfms.com · hpfms.in · paradigmfms.com · ansechr.com | Listicles, operator homepages |
| facility management company Pune | blog.facilitybot.co · PSPS (LinkedIn) · arisefacility (gust.com) · CLR Facility Services · BVG India (named in listicles) | Listicles and business profiles dominate |

**Takeaways:**
1. **Directories and aggregators** (Sulekha, IndiaMART, JustDial-type, GBP) occupy a large share of these SERPs. A company website competes for the remaining organic slots *and* for the Local Pack. Being **listed on those directories** is itself a visibility channel KARGAR can use (see `seo-local-optimization.md`).
2. **"Top FM companies in Pune" listicles** (FacilityBot, SILA, Paradigm) rank for the FM-company queries. Getting genuinely included in such roundups is an off-page opportunity. Do not pay for fake placements.
3. "housekeeping services Pune" is **intent-mixed**: home cleaning (Urban Company), manpower supply (IndiaMART), and B2B/society contracts. KARGAR targets the B2B/society slice. The pillar already says so in its first sentence, which is correct.

## 2. Measured on-page comparison (housekeeping intent)

| Page | Title | H1 | H2s | Words | Schema | FAQ | tel / WA / form |
|---|---|---|---|---|---|---|---|
| **KARGAR** `/housekeeping-services-pune` | Housekeeping Services in Pune \| KARGAR… | Professional Housekeeping Services in Pune | 15 descriptive | 1620 | Organization, LocalBusiness, WebSite, BreadcrumbList, Service, **FAQPage** | Yes (7) | ✔ / ✘ / ✘ (CTA → contact page) |
| dirtblastercleaningservices.com/housekeeping-services-pune/ | Best Housekeeping Services in Pune for Office & Society | Housekeeping Services Pune | 12 (service names) | 995 | WebPage, Org, Breadcrumb | Yes | ✘ / ✘ / ✘ |
| krestfacilityservices.com/pune/corporate-housekeeping-services.html | Corporate Housekeeping Services in Pune | same | **1** | 1455 | none | Yes | ✔ / ✔ / ✔ |
| 360facility.in/housekeeping-services-in-pune/ | Professional Housekeeping Services in Pune \| 360 Facility | "Role of Corporate Housekeeping Services" (off-topic) | 5 (nav-only) | 1115 | none | No | ✔ / ✔ / ✘ |
| arisefacility.com/corporate-housekeeping-services-in-pune/ | Corporate Housekeeping Services in Pune Transform Your Space… (overlong) | Corporate Housekeeping Services In Pune | 7 (3× "Our Services") | 2029 | Article, Org, Breadcrumb | Yes | ✘ / ✔ / ✘ |
| hpfms.in/corporate-housekeeping-services/ | Corporate Housekeeping Services - HP Facility Management Services, Pune | Corporate Housekeeping Services | 17 (many are sentences) | 570 | WebPage, Org, Breadcrumb | Yes | ✔ / ✔ / ✔ |
| ventori-hub.lovable.app | Ventori Facilities — Professional Housekeeping in Pune | Professional housekeeping services across Pune | 4 | 301 | LocalBusiness, Service | No | ✔ / ✘ / ✔ |
| sulekha.com/housekeeping-services/pune (directory) | Top Housekeeping Services in Pune… | Housekeeping Services in Pune | 10 | 7431 | Org, LocalBusiness, ItemList, FAQPage | Yes | ✔ / ✔ / ✘ |

(viaantecs.com failed to fetch.)

### FM intent (measured)

| Page | Title | H1 | Words | Schema |
|---|---|---|---|---|
| **KARGAR** `/facility-management-company-pune` | Facility Management in Pune | Facility Management Company in Pune | 1032 | Org, LocalBusiness, Service, FAQPage, Breadcrumb |
| naiconfms.com/integrated-facility-management-services-in-pune/ | Integrated Facility Management Services In Pune \| Naicon FMS | (blog-style headline) | 1160 | BlogPosting, LocalBusiness, FAQPage |
| ansechr.com | ANSEC HR \| Integrated Facility Management Services | **none** | 513 | WebPage, Breadcrumb |

## 3. Qualitative findings (observed vs. stated)

| Dimension | Competitors (as stated on their pages) | KARGAR today |
|---|---|---|
| Services presented | Mostly lists of service names (sofa, carpet, office, bathroom cleaning) | Scope by **frequency table** (daily/weekly/monthly), with who checks each item. More useful to a buyer |
| Industry content | Short property-type mentions; 360facility names specific IT parks it serves | 8 property-type cards, each linking to a dedicated page |
| Pune-specific info | City name in headings; Krest/Maxwell state "since 2012/2014"; 360facility names IT parks | Named service areas (Baner, Wakad, Hinjewadi, Kharadi, Hadapsar, PCMC), Baner base |
| Process / QC | Rarely described beyond "trained staff" | PURNA 5-step protocol, supervisor checklists, inspections, attendance, PF/ESIC transparency |
| Trust signals | Years in business, client logos/names, ISO / PSARA licence claims, testimonials | *Before this phase:* none specific on the pillar. *Added:* national recognition (PM-presented award, 2024) and state grant, sourced from `recognitions.ts` |
| CTAs | tel + WhatsApp + inline form common | tel link + "Request proposal" → `/contact-us#contact-form`. No WhatsApp. No inline form |
| Images | Many (Dirtblaster 136, Sulekha 57) | 4 on the pillar; all have alt text |
| Structured data | Absent or generic on most operator pages | Most complete of the set (Service + FAQPage + LocalBusiness) |

## 4. Conclusions

1. **On-page, KARGAR's pillar already meets or exceeds the sampled operator pages** on structure, specificity, schema and helpfulness. Rewriting or lengthening it is not justified by this evidence.
2. **Real gaps against competitors:**
   - Visible, verifiable **trust proof** on the commercial page (now addressed with the sourced recognition block).
   - **Contact friction on mobile:** WhatsApp and click-to-chat are common in this market and absent on KARGAR. Recommended, not implemented: it needs a business-confirmed WhatsApp number.
   - **Off-page:** directory presence, GBP strength, inclusion in local roundups, domain age (KARGAR's entity was incorporated 2021). These likely explain most of the ranking gap but **cannot be measured here** without backlink data.
3. **Do not copy competitor tactics** that rely on unverifiable claims ("Fortune 500 clients", "since 20XX", ISO) unless KARGAR has documents to back them.

## Sources (fetched or observed 2026-10-14)
- https://www.sulekha.com/housekeeping-services/pune · https://www.sulekha.com/corporate-housekeeping-services/pune
- https://www.dirtblastercleaningservices.com/housekeeping-services-pune/
- https://www.krestfacilityservices.com/pune/corporate-housekeeping-services.html
- https://360facility.in/housekeeping-services-in-pune/ · https://360facility.in/services/
- https://arisefacility.com/corporate-housekeeping-services-in-pune/
- http://www.hpfms.in/corporate-housekeeping-services/ · https://www.hpfms.in/
- https://naiconfms.com/integrated-facility-management-services-in-pune/
- https://ansechr.com/ · https://originfms.com/services/ · https://paradigmfms.com/top-facility-management-companies-in-pune/
- https://ventori-hub.lovable.app/
- https://blog.facilitybot.co/blog/top-facility-management-companies-in-pune/
- https://m.indiamart.com/maxwellfacilities/services.html · https://dir.indiamart.com/pune/housekeeping-manpower-services.html
- https://www.urbancompany.com/pune-home-cleaning-services
- https://silagroup.co.in/2025/05/19/behind-the-scenes-what-facility-management-companies-in-pune-really-do/
