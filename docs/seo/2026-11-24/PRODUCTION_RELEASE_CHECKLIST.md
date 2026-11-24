# Production release checklist: `seo/service-pages-and-enquiry-routing-2026-11-24`

Reviewed head: `c90e66c` · Production branch: `main` (`6aae149` at time of writing) · Vercel project: `kargar1/kargar-business` (deploys `main` automatically)

## A. Gates before merge (all must be ticked)

- [ ] **Pull request created** (base `main`, head this branch) and reviewed by a second person.
- [ ] **Preview checked** by someone with access to the `kargar1` Vercel team. Use deployment `4dCF5E7HayQ1eS2uzgSxhLg2kQKX` (Vercel dashboard → Deployments → this branch → Visit). Pass criteria are in section B.
- [ ] **Search Console check for the 4 redirects** (section C). Record the numbers in sheet F of `KARGAR_SEO_Delivery_2026-11-24.xlsx`.
- [ ] **Baseline exported:** GSC Performance → Queries and Pages, last 3 months, Country = India, saved to `seo-audit/data/gsc-YYYY-MM-DD-*.csv`.
- [ ] **PSARA licence status decided.** If KARGAR holds a licence, plan a follow-up PR adding the licence number and validity to the security pages. If not, take legal advice before the next release: the buyer checklist and guide (already live) tell buyers to ask for one.
- [ ] The release owner approves the merge in writing.

## B. Preview test script (no real enquiries)

| # | Check | Pass |
|---|---|---|
| 1 | `/`: the four service cards read "… in Pune" and open the Pune pages | No `/services/hard-services/…` or `/services/soft-services/…` links |
| 2 | `/security-services-pune`: H1 "Security Guard Services in Pune"; CTA "Request a Security Staffing Proposal" | CTA opens `/contact-us` with Security preselected |
| 3 | `/housekeeping-services-pune`, `/facility-management-company-pune`, `/electrical-maintenance-services-pune`, `/hvac-maintenance-services-pune` | Each CTA preselects the matching service. HVAC H1 still "HVAC Maintenance Services in Pune" |
| 4 | `/contact-us`: changing the service shows its optional fields; empty submit is blocked | Do **not** submit |
| 5 | View source on each page above | One `<link rel="canonical">` pointing to `https://www.kargarbusinessservices.com/<path>`; `robots` = `index, follow` |
| 6 | `/sitemap.xml` | 40 URLs; none under `/services/*/…` |
| 7 | `/robots.txt` | `Allow: /`, `Disallow: /admin`, sitemap line |
| 8 | The 4 retired URLs | Each returns 308 to its Pune page in a single hop (`curl -I`) |
| 9 | Phone width (~375 px) for items 1–4 | No sideways scrolling; CTA and phone link visible |
| 10 | Browser console on each page | No errors (preview noise from blocked analytics is OK) |

## C. Search Console checks for the retired URLs (manual)

For each URL:
- `https://www.kargarbusinessservices.com/services/hard-services/electrical-maintenance`
- `…/services/hard-services/hvac-maintenance`
- `…/services/soft-services/housekeeping`
- `…/services/soft-services/security-services`

Run these checks:
1. **Performance → Search results → + New → Page → "URL is exactly"**, last 16 months, then last 3 months. Record clicks, impressions, CTR, average position. Then open the **Queries** tab and note the top queries.
2. **URL Inspection:** note "URL is on Google" or not, the Google-selected canonical, and the last crawl date.
3. **Links → Top linked pages (external):** is the URL listed, and from which sites?
4. **Decision rule:**
   - **Proceed** if a URL has few clicks and no external links, or if its top queries are the same ones its Pune destination targets.
   - **Pause and review that URL** if it has meaningful clicks for queries the destination page does not answer, or if a reputable external site links to it. In that case, merge the missing content into the destination before redirecting.

## D. Deploy (after approval)

1. Merge the PR into `main` with a merge commit, not a squash, so the merge can be reverted as one unit. Vercel builds production automatically.
2. Watch the build in Vercel. It must show `SEO pipeline passed`, `41/41 routes prerendered` and `validate-sitemap PASS`.

## E. Post-deploy verification (within 1 hour)

- [ ] `curl -I` each retired URL: `308` with `Location:` set to its Pune page.
- [ ] `/sitemap.xml` has 40 URLs, and every one returns 200.
- [ ] Spot-check items 1–3 and 5 from section B on production.
- [ ] **Labelled live tests (approved procedure):** one submission each for Security, Housekeeping contract, Housekeeping staff, Facility management and HVAC.
  - Name: `QA TEST – please ignore`. Email: the tester's own address.
  - Confirm each one:
    - (a) appears in `/admin/contacts` with Service, Team and First page visited;
    - (b) arrives at bd@kargar.co.in with a `[Team]` subject and the full details;
    - (c) shows `contact_form_submit` with `enquiry_service` in GA4 DebugView.
  - Mark the test leads resolved.
- [ ] GSC: submit `sitemap.xml`. Use URL Inspection → Request indexing for the security, housekeeping, FM, electrical and HVAC pages.

## F. Monitoring

- Weekly for 4 weeks: GSC impressions, clicks and position for the tracked queries (sheet F); check which URL Google shows for HVAC and security queries.
- Days 30, 60 and 90: fill sheet F. Count leads by `metadata.enquiry_service`.
- Expected: the retired URLs move to "Page with redirect" in GSC indexing reports, and positions may wobble for 2–4 weeks.

## G. Rollback

**Trigger:** any of the following.
- Enquiry submissions fail.
- Admin can't load leads.
- A priority page returns non-200.
- Redirect loops.
- A sustained drop in leads or clicks on the HVAC or security pages that GSC ties to this release, after 2–3 weeks.

**Fast, at the platform level (seconds):**
1. Vercel → `kargar-business` → Deployments → select the last production deployment before the merge (built from `6aae149`).
2. Choose **Instant Rollback**.

**Source of truth, at the code level:**
```
git checkout main && git pull
git revert -m 1 <merge-commit-sha>
git push origin main        # Vercel redeploys the previous state
```
Redirects, sitemap and rewrites are generated from config at build time, so a revert restores the four `/services/*` pages and the 44-URL sitemap automatically. There is no database migration in this release (lead attribution uses the existing `metadata` JSONB column), so no data rollback is needed. Leads saved while the release was live remain in the table.
