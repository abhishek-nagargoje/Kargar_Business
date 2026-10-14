# Local SEO — Website Consistency & Google Business Profile Checklist

**Date:** 2026-10-14
**Access:** no Google Business Profile access (no authenticated session). **Nothing on GBP was viewed or modified.** Public company-registry pages and social profiles were checked via web search on 2026-10-14.

## 1. Business facts as the website states them (source: `frontend/src/config/contact.ts`, `src/lib/seo/schema.ts`)

| Field | Website |
|---|---|
| Brand | KARGAR Facility Management |
| Legal entity (pillar intro) | Kargar Business Services Pvt. Ltd. |
| Address | 301, 3rd Floor, Unity Commercial, Baner, Pune 411045 |
| Phone | +91 78218 44591 (alt +91 87887 26752) |
| Email | bd@kargar.co.in |
| Hours | Mon–Sat 09:00–18:00 |
| Service area (schema) | Pune, Pimpri-Chinchwad |

## 2. Inconsistencies found (business confirmation needed; nothing was changed)

| # | Where | Conflict | Evidence | Risk | Recommended owner action |
|---|---|---|---|---|---|
| L-1 | Homepage hero stats ("10+ Years of Experience"), hard-services hub ("10+ Years Experience") | The registered entity was **incorporated 29 July 2021** (CIN U74999PN2021PTC203055) | Zauba Corp, Tofler, TheCompanyCheck | **High.** A buyer or reviewer checking MCA records sees a contradiction | If "10+ years" means founders' or a predecessor firm's experience, say exactly that (e.g. "10+ years of team experience"); otherwise remove |
| L-2 | Homepage "We Operate Across India", cities Mumbai/Pune/Delhi/Bengaluru/Hyderabad; `companyTrust.ts` "PAN India" | Schema `areaServed` and all landing copy say **Pune + PCMC** only | `KargarSinglePage.tsx:116`, `schema.ts` | Medium. Mixed geographic signals and an unverified claim | Confirm actual sites outside Pune. Keep only cities with real current operations |
| L-3 | Homepage "10,000+ Happy Clients" with "50+ Sites Managed"; "2,000+ Skilled Workforce" | Internally inconsistent; Tracxn lists ~8 employees (likely excludes deployed staff) | `KargarSinglePage.tsx` heroStats; tracxn.com | Medium | Replace with documented figures from the company profile PDF |
| L-4 | `companyTrust.ts` "ISO Guidelines" | No certificate referenced anywhere | Source | Medium if read as certification | Remove, or name the actual certificate and number |
| L-5 | Facebook page title "Kargar Facility and **Security** Services PVT LTD" (same page ID shows as "Kargar Business Services Pvt. Ltd.") | Third name variant | facebook.com/people/…/100076064059281 | Low–medium (NAP consistency) | Use one public name everywhere: "KARGAR Facility Management (Kargar Business Services Pvt. Ltd.)" |
| L-6 | Email on `kargar.co.in`, website on `kargarbusinessservices.com` | Two domains | contact.ts | Low | Fine if both are owned. Ensure kargar.co.in doesn't host a competing duplicate site |
| L-7 | GBP name "Kargar Business Services" vs site brand "KARGAR Facility Management" | Different names | Brief | Low–medium | GBP must use the real-world name (Google guideline). If customers know you as "KARGAR Facility Management" and that is the trading name on signage and invoices, that's acceptable. Do not add keywords such as "Housekeeping Pune" to the GBP name |

## 3. Website local signals (status)

| Signal | Status |
|---|---|
| Company identity in body copy | ✔ Pillar intro names brand + legal entity + Baner, Pune |
| Services and customer types | ✔ Clear per page |
| Geographic coverage | ✔ Landing pages name real areas (Baner, Wakad, Hinjewadi, Kharadi, Hadapsar, PCMC). ✘ Conflicting homepage claims (L-2) |
| Contact info visible and clickable | ✔ tel: links site-wide; address on contact page |
| LocalBusiness schema | ✔ One entity (site-wide @graph), not duplicated per page. Correct |
| Trust signals | ✔ Recognition section on homepage; **added to the housekeeping pillar this phase** |
| Location pages | ✔ None fabricated. Area mentions are within the stated service area |

## 4. Google Business Profile manual checklist (for an authorized owner)

**Identity**
- [ ] Name = real-world business name only (no keywords).
- [ ] Address = 301, 3rd Floor, Unity Commercial, Baner, Pune 411045, character-for-character the same as the website. If you don't receive customers there, hide the address and set a **service area** instead.
- [ ] Primary phone = +91 78218 44591 (as on the website).
- [ ] Website = `https://www.kargarbusinessservices.com/`. Optionally use `/housekeeping-services-pune` only if housekeeping is the profile's main category. Don't add tracking parameters that create new URLs. If you need attribution, use UTM params; the site canonicalizes them.
- [ ] Hours = Mon–Sat 09:00–18:00 (match `contact.ts`).

**Categories** (choose only what is true)
- [ ] Primary: the category closest to your main revenue line. Options in GBP include "Facility management company" (if available in the picker), "House cleaning service" or "Commercial cleaning service", and "Security guard service".
- [ ] Additional: up to 9, each matching a service you actually deliver.

**Services and description**
- [ ] Services list mirrors the website service pages: housekeeping, security, electrical maintenance, HVAC maintenance, plumbing, STP O&M, landscaping, staffing.
- [ ] Description (≤750 chars): who you are, B2B and society focus, Pune + PCMC, managed model (supervision, PF/ESIC). Mention the 2024 national recognition only as worded in `recognitions.ts`. No prices, no superlatives, no URLs.

**Service areas**
- [ ] Pune, Pimpri-Chinchwad, plus specific localities you actually serve. Don't add other cities until L-2 is resolved.

**Photos**
- [ ] Logo and cover photo in KARGAR navy and orange.
- [ ] Real on-site photos of teams in uniform, supervisors with checklists, and equipment. Get consent from people shown and avoid client branding without permission.
- [ ] The award ceremony photo (already used on the site).

**Reviews**
- [ ] Ask existing clients (facility managers, society committees) for reviews with a direct review link after milestones such as a quarterly review.
- [ ] Reply to every review, briefly and professionally.
- [ ] Never buy reviews, review-swap, or post reviews from staff accounts.

**Ongoing**
- [ ] Monthly GBP post (new site onboarded, training session, recognition) with a link to the relevant service page.
- [ ] Turn on GBP messaging only if someone will answer within business hours.

## 5. Off-page and citation actions (manual, genuine only)

| Action | Notes |
|---|---|
| Claim and complete listings on Sulekha, IndiaMART and Justdial | These directories rank for the target queries (see competitor analysis). Use identical NAP |
| LinkedIn company page | Already linked in `sameAs`. Keep name, address and URL consistent |
| Facebook | Fix the name variant (L-5) |
| Local roundup inclusion | Contact authors of "top FM companies in Pune" articles with factual information. Don't pay for placement |
| Industry associations and chambers (e.g. MCCIA) | Member directories are legitimate citations if KARGAR is a member |
| Award coverage | Ask the scheme organizers or Maharashtra government pages listing awardees to link to the site, if they publish such lists |
