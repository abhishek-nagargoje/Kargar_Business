# KARGAR service pages and enquiry routing — delivery report (2026-11-24)

**Branch:** `seo/service-pages-and-enquiry-routing-2026-11-24` (not merged; Vercel deploys `main`, so **nothing here is live yet**).
**Verified on:** local production build (`npm run build`, 41/41 routes prerendered) served through the repo's Vercel emulation (`scripts/seo/serve-dist.ts`).

| File | Deliverable |
|---|---|
| `KARGAR_SEO_Delivery_2026-11-24.xlsx` | A inventory (before/after, decision, reason) · B keyword map incl. declined/deferred · C implemented changes · D redirects, links fixed, external refs, facts awaiting confirmation · E QA report · F baseline and 30/60/90 sheet |
| `C_FINAL_PAGE_COPY.md` | Final copy of the 7 priority pages, exported from the configs that ship |
| `../../../seo-audit/data/serp-sample-2026-11-24.md` | Dated search sample and result-type classification |

## 1. Data sources and limits

| Source | Status |
|---|---|
| Production site, sitemap, robots, homepage links | Crawled 2026-11-24 (45 URLs: 44 sitemap + 1 image) |
| Repository and build | Full access |
| Company Brochure / Company Profile PDFs | Read directly, including the org-chart images |
| Google Search Console, GA4, Google Business Profile, CRM/sales data | **Unavailable** (no access in this session). Shown as Unavailable, never 0 |
| Search volume | **Unavailable** (no tool). No volumes are stated anywhere |
| Rankings | Owner's manual tracker, 2026-11-05 (single observations, not GSC averages) |
| Public results | Web-search API sample, 2026-11-24. **Not a geolocated Google SERP from Pune**; used only to classify result types |

## 2. Findings that drove the work

**Critical enquiry failures (fixed first)**
1. **The sales notification email omitted the lead's contact details.** `email.service.ts` sent EmailJS only `name`, `message` and `time`, with no phone, email, company or requested service. The full lead summary now goes into `{{message}}`, which the live template renders, so no template change is needed for it to work.
2. **The sales team could not see which service or page an enquiry came from.** Attribution was saved in `metadata` but the admin view discarded it. The admin list and detail view now show service, team, enquiry page, first page visited and the optional quote details.
3. **The service was lost** when a visitor reached the form any way other than the page's own CTA. A first-touch landing page (path and referrer host only) is now stored per session.

**Homepage vs Pune links.** The homepage's main "Learn More" cards for electrical, HVAC, housekeeping and security went to `/services/{category}/{service}`. The Pune links lower down went to the landing pages. The two sets served the **same buyer and the same question** (KARGAR serves Pune/PCMC only). The generic pages were thinner, not local, and carried unverified claims (HT panels, transformers, chillers, cooling towers, IAQ testing). The generic HVAC page's title "Commercial HVAC Maintenance" also competed with the Pune page, which ranks #2 for that query. **Decision:** 301 the four generic pages to the Pune pages, keep the service records for cards and media, and use descriptive card anchors ("HVAC Maintenance in Pune").

**Homepage vs `/facility-management-company-pune`.** The homepage now introduces KARGAR and routes to services. The FM pillar is rewritten for a buyer evaluating an integrated contract: who owns the site relationship, the escalation path, reporting, and the move from several vendors. The homepage title ("Facility Management Company") still overlaps the pillar. It was **left unchanged on purpose**: the homepage has the most authority, and changing it without GSC data could cost more than it gains.

**Commercial vs corporate vs office housekeeping.** All three are kept, because each serves a different buyer and the copy does not overlap:
- **Commercial:** a building owner or association looking after common areas that no single tenant owns. The page is organised by zone.
- **Corporate:** an admin or FM head at a multi-floor, multi-shift office. The page covers governance, vendor changeover and payroll verification.
- **Office:** a small office manager. The page covers a one-person routine and how to size the team.

The tracker shows Google ranking the office page (P2 #4) for "corporate housekeeping". **Check in GSC whether the corporate URL is indexed** before considering any merge.

**Managed housekeeping vs manpower supply.** KARGAR sells both. The manpower page contradicted itself: its meta description said "supervised by KARGAR" while the pillar said "your team directs". Both pages now say the same thing:
- **Managed contract:** a KARGAR supervisor directs the team and KARGAR owns the scope and quality checks.
- **Manpower supply:** the client directs the staff, and a KARGAR supervisor is optional.

Each model has its own enquiry option and is tagged in the lead record. The client-directs model **needs confirmation from operations**. "Housekeeping staff Pune" results are dominated by job boards, so the manpower page is now titled "Housekeeping Manpower in Pune", and job seekers are pointed to HR.

**Facility maintenance hub.** The hub stays as the parent of the electrical, HVAC, plumbing, building and STP pages. Electrical and HVAC were strengthened. HVAC was rewritten to the brochure scope (AHU, FCU, VRV/VRF), keeping its URL, title and H1 because it ranks #1–2.

**MST / "MSD".** The Company Profile org chart lists "STP / WTP / MSTs" but gives no full form, duties or contract model. **No page or copy was published.** Next step: operations confirm the term (likely Multi-Skilled Technician), the duties, and whether buyers can procure it separately. If they confirm, add a subsection to `/building-maintenance-services-pune` first.

**Footer.** The footer linked about 40 pages from every URL. It now lists the four pillars, 12 flagged priority pages and the company pages. A crawl confirmed there are no orphan pages: every page is still linked from its pillar, its sibling pages, `/services` and body copy.

## 3. Status

| Item | State |
|---|---|
| All code and copy changes | **Verified in local production build**; not deployed |
| 301s for the 4 retired URLs | Verified in Vercel emulation (308, which is Vercel's permanent redirect) |
| Mobile journey: security page → proposal → lead with service and team | Verified with Supabase and EmailJS **intercepted**. Screenshots: `qa/security-mobile-landing.png`, `qa/security-mobile-enquiry-sent.png` (scratchpad; regenerate with `scripts/qa-enquiry-journey.ts`) |
| Delivery to the real inbox / Supabase | **Not verified.** A real submission writes to the production lead table and emails the sales inbox; that needs an approved, labelled test after deploy (see §6) |
| GA4 events firing in production | Not verifiable locally (tracking is disabled outside production by design). Check in GA4 DebugView after deploy |
| Business facts (PSARA, localities, HVAC equipment, NAP, MST, …) | **Awaiting business confirmation:** sheet D |

## 4. Before merging

1. Export GSC Performance → Queries **and** Pages (last 3 months, India) into `seo-audit/data/gsc-2026-11-*.csv`. Check that none of the 4 retired `/services/*` URLs has meaningful clicks or external links that the redirect would mishandle. A 301 preserves most signals, but the brief requires this check and it could not be done here.
2. Fill sheet F's baseline columns from that export.
3. Confirm PSARA status. The security pages tell buyers to ask for a PSARA licence.

## 5. Google Business Profile: proposed corrections for the profile owner

No access was available, so these are proposals to check against the live profile.

| Field | Proposed value / action |
|---|---|
| Business name | The real-world name used on signage and documents (choose one: "KARGAR Facility Management" or "Kargar Business Services Pvt. Ltd."). No keywords added to the name |
| Primary category | Facility management company (if offered), otherwise the closest available. Secondary: Security guard service, Janitorial service / Commercial cleaning service, HVAC contractor only if HVAC is a real line of business |
| Address / service area | Baner office as the address **in the confirmed form** (site: "301, 3rd Floor, Unity Commercial, Baner"; profile PDF: "301-302, Unity Commercial, Near Amar Business Zone"). Service areas: Pune, Pimpri-Chinchwad (add localities only where confirmed) |
| Phone | One primary number used identically on the site, GBP and listings (site uses +91 78218 44591; brochure lists 87887 26752 / 92262 90310) |
| Hours | Mon–Sat 09:00–18:00 (matches the site), Sunday closed |
| Services list | Security guard services · Housekeeping contracts · Housekeeping manpower · Integrated facility management · Facility maintenance · Electrical maintenance · HVAC maintenance (AHU/FCU/VRV) · STP/WTP operation · Landscaping |
| Website link | Homepage, with UTM `?utm_source=google&utm_medium=organic&utm_campaign=gbp` so Maps traffic is reported separately from organic search |
| Photos | Real site and team photos (with consent), no stock imagery |

## 6. Live delivery test (after deploy, needs approval)

Submit one clearly labelled test per routing team from a mobile phone (name "QA TEST – please ignore", email the tester's own address):
- Security, from `/security-services-pune`
- Housekeeping, from `/housekeeping-services-pune`
- Housekeeping manpower, from `/housekeeping-staff-pune`
- Facility management, from the FM pillar
- Technical maintenance, from the HVAC page

For each test, confirm:
- the row appears in the admin contacts page with the service, team and first page visited;
- the email reaches bd@kargar.co.in with a `[Team]` subject and the full lead summary.

Then mark each lead resolved. To route by team to different inboxes, add a `to_email` variable (or one template per team) in EmailJS. The code already sends `team`.

## 7. Measurement plan

- **Organic:** non-branded GSC impressions, clicks, CTR and average position by query and landing page (sheet F) at day 30, 60 and 90. Record which URL Google shows; a different URL means cannibalisation.
- **Enquiries:** count `contact_messages` by `metadata.enquiry_service` and status. A form submission is a lead; a `call_click` shows interest, not a conversation. Report them separately.
- **Analytics:** `cta_click` (by page and position) vs `contact_form_submit` (by `enquiry_service`, `landing_page`) gives drop-off per page. No names, phones, emails or free text are sent to analytics.
- **Maps:** GBP calls, website clicks and direction requests, reported separately from organic.
- **Rank checks:** record location (e.g. Baner), device and date for each manual check. Expect weeks, not days, for re-crawling. No ranking outcome is promised.
