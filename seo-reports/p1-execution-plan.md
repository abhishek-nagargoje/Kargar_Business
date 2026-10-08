# P1 Backlink Execution Plan — Verified Opportunities Only

**Status: PLAN ONLY.** No outreach has been sent, no accounts created, no links acquired, no production code changed. This is the step-by-step operational plan for when you decide to execute — every step below requires your explicit go-ahead before it happens.

**Scope discipline:** `kargar.co.in`, "Foodable", and "HAXPUNE" remain **Unverified** (per `verification-followup.md`) and are **excluded** from this plan entirely — not pursued, not outreached, not acquired. Only opportunities with confirmed, evidenced status are included below.

---

## P1 Opportunities In Scope

| # | Opportunity | Type | Verified evidence |
|---|---|---|---|
| 1 | Godrej Properties (Hillside project) | Client relationship — vendor mention/testimonial ask | `logo-manifest.json`, "Official/Verified"; godrejproperties.com confirmed live |
| 2 | Kolte-Patil Developers | Client relationship — vendor mention/testimonial ask | `logo-manifest.json`, "Official/Verified"; koltepatil.com confirmed live |
| 3 | Kumar Properties (Kumar Corp) | Client relationship — vendor mention/testimonial ask | `logo-manifest.json`, "Official/Verified"; kumarcorp.co.in confirmed live |
| 4 | MCCIA (Mahratta Chamber of Commerce, Industries & Agriculture) | Association membership | mcciapune.com confirmed live; real, 90-year-old chamber; membership dept. contact confirmed |
| 5 | Own LinkedIn + Facebook profiles → `sameAs` schema | Entity-consistency fix (not a new backlink, but directly supports the authority/entity signal every other item here feeds into) | Profiles confirmed live via search: `in.linkedin.com/company/kargar`, Kargar Facebook page |

Everything else from `link-opportunity-research.md` (Rohan Builders, Sukhwani, Majestique, Supreme Universal, Mahindra International School, Wellington College, Powercon, DCCIA, PMA, CREDAI-Pune) is P2/P3 — held for a later execution round once P1 is underway. Not included here to keep this plan actionable rather than diluted.

---

## Step-by-Step Plan

### Step 0 — Pre-work (internal, no external contact)

- [ ] Confirm internally which person/account manager at Kargar has the actual working relationship with each of Godrej, Kolte-Patil, and Kumar Properties (project managers, sales, or ops leads who dealt with these accounts directly) — outreach must come from whoever has real standing with that contact, not a generic company email.
- [ ] Confirm current, real facts before any message goes out: which specific project(s) Kargar services for each developer, approximate duration of the relationship, and whether the engagement is still active. (Do not use anything not already confirmed in this project's own data — `logo-manifest.json` gives the project names but not engagement dates/status; that must come from whoever manages the account.)
- [ ] Decide who at Kargar is authorized to approve outbound messages before send (per your standing rule that outreach requires explicit approval each time).

### Step 1 — Godrej Properties, Kolte-Patil, Kumar Properties (client relationship asks)

1. Use the draft in `outreach-templates.md` §A ("Existing client — vendor-page or testimonial ask") as the starting point — **not** to be sent as-is; each needs the brackets filled with a real name, real project, and real relationship detail from Step 0.
2. Route: internal account/project contact at each developer — not a generic "info@" or PR inbox, since these are existing relationships, not cold outreach.
3. Ask specifically for one of: (a) a short testimonial for Kargar's site, (b) a vendor/partner credit if the developer's own project page has room for one, (c) permission to write a short case study with their name attached. Do not demand a specific anchor text or backlink — per the anchor-text rules already established (`anchor-text-analysis.md` §2), let them write naturally.
4. Expected outcome per opportunity, honestly stated: a testimonial quote is the most likely realistic outcome; an actual public link back to `kargarbusinessservices.com` is possible but not guaranteed — large developers may credit vendors by name only, without a hyperlink, especially if their sites are non-CMS marketing pages (as observed during research — no existing vendor-page infrastructure was found at any of these three).
5. Track responses in `backlink-prospects.csv` (update the `Status` column for rows 4–6 as this proceeds) — do not mark any row "Kargar Link: Yes" until a link is actually live and independently verified (not just promised).

### Step 2 — MCCIA membership

1. Contact MCCIA's Membership Department (contact number publicly listed: 02025709168) to (a) start the standard membership application process, and (b) separately ask whether the "Digital Directory" member listing is public-facing/crawlable or member-login-gated only — this determines whether it has any real SEO value beyond the legitimate business-credibility value of membership itself.
2. This is a genuine business decision (joining a 90-year-old Pune chamber of commerce), not a link-building trick — treat the membership listing as a secondary benefit, not the primary reason to join.
3. No outreach template is needed here — this is a direct membership inquiry/application, not a mention/link pitch.

### Step 3 — `sameAs` schema fix (LinkedIn + Facebook)

This is a **code change**, not outreach — flagged here because it's the one P1 item that isn't external contact, and it directly strengthens the entity-consistency signal that makes every other item in this plan more valuable (a consistent `Organization` entity with real `sameAs` links is more crawlable/trustworthy than one without).

1. Add `sameAs: ["https://in.linkedin.com/company/kargar", "https://www.facebook.com/people/Kargar-Facility-and-Security-Services-PVT-LTD/100076064059281/"]` to `buildOrganizationSchema()` in `frontend/src/lib/seo/schema.ts`.
2. Per Phase 25 rules: this is a real code change and needs your explicit approval before it's made — flagged here as ready, not yet done. If approved, it's a small, low-risk, single-array addition with no other side effects (confirmed via the earlier repo read of `schema.ts`).
3. Verify both profile URLs are actually Kargar's own before committing — both were found via live search in the original audit, not assumed.

---

## Sequencing

Recommended order: **Step 3 first** (lowest risk, pure code, strengthens everything downstream) → **Step 2** (MCCIA — a business decision that can proceed independently and in parallel) → **Step 1** (client asks — needs the most internal coordination from Step 0, so start that groundwork immediately but expect it to take longest to actually land).

## What "done" looks like for this plan (tracking, not promises)

- Godrej/Kolte-Patil/Kumar Properties: a real testimonial or mention exists and is verified live (checked directly, not assumed) — update `backlink-prospects.csv` only once verified.
- MCCIA: membership application submitted/approved; directory-listing public/private status confirmed.
- Schema: `sameAs` array live in production, verified via Rich Results Test or direct page-source check after deploy.

No step in this plan is executed by this session — every outreach send, membership application, and code commit here requires your separate, explicit go-ahead.
