# Off-site SEO Plan

On-page work cannot close the gap alone. The live SERP for "housekeeping services Pune" is dominated by directories (IndiaMART/Justdial-type listings), a "top facility management companies in Pune" listicle, and large established FMs. KARGAR needs **entity consistency, local presence and a small number of genuine, relevant links**.

This plan consolidates and prioritises the detailed research already in the repo — use those files for prospect-level detail instead of duplicating it here:

- `docs/SEO-HOUSEKEEPING-PUNE-STRATEGY.md` §10–14 — GBP settings checklist, GBP restriction recovery, review-request templates, citation table
- `seo-reports/backlink-prospects.csv`, `p2-prospects.csv` — named prospects with status
- `seo-reports/outreach-templates.md`, `90-day-link-building-plan.md`, `toxic-link-review.md`

## 0. Prerequisite — fix NAP before any listing (business decision, blocking)

The website, the Company Profile/Brochure and (probably) GBP disagree:

| Field | Website | Company PDFs |
|---|---|---|
| Address | 301, 3rd Floor, Unity Commercial, Baner, Pune 411045 | 301-302, Unity Commercial, Near Amar Business Zone, Baner, Pune 411045 |
| Phone | +91 78218 44591 (primary), +91 87887 26752 | 87887 26752 / 92262 90310 |
| Name | KARGAR Facility Management | Kargar Business Services Pvt. Ltd. / Kargar Facility Services |

**Action:** choose one public name format (recommended: "KARGAR Facility Management (Kargar Business Services Pvt. Ltd.)" where a legal-name field exists), one address string and one primary phone. Update the website (`src/config/contact.ts`, `src/lib/seo/schema.ts`, contact page, privacy page), GBP and every listing below to match **exactly**. Every inconsistent citation weakens local entity matching.

## 1. Priority actions (in order)

| # | Action | Why | Owner | Effort |
|---|---|---|---|---|
| 1 | **Google Business Profile**: verify status; primary category "Facility management company" (or "Janitorial service" if housekeeping is the main revenue line); secondary categories only for services actually sold (e.g. "Commercial cleaning service", "Security guard service"); service area = Pune + Pimpri-Chinchwad; services list mirroring the website pages; website link to the homepage; real photos of real sites/teams | GBP drives the local pack, which sits above organic results for these queries | KARGAR | 1–2 h, then ongoing |
| 2 | **Reviews**: ask existing satisfied clients (society committees, office admins) for honest Google reviews using the templates in the strategy doc §12; respond to every review | Review count/recency is a local-pack factor and a trust signal. **Never** incentivise, gate or write reviews | KARGAR | Ongoing |
| 3 | **Core citations** with identical NAP: IndiaMART, Justdial, Sulekha, Bing Places, Apple Business Connect | These directories *are* the SERP for the target query; a strong listing there captures demand even before the website ranks | KARGAR | 1 day |
| 4 | **Pune business associations**: MCCIA (and other bodies in `backlink-prospects.csv`) — genuine membership with directory listing | Real local authority, relevant to Pune B2B buyers | KARGAR leadership | Membership process |
| 5 | **Industry body**: Facility Management Association of India (FMAI) membership if eligible | Topical authority in facility management | KARGAR leadership | Membership process |
| 6 | **Listicle inclusion**: contact authors of "top facility management companies in Pune" articles with a factual company summary (services, sectors, PM-award recognition) — no payment for placement | These pages rank for the head terms | KARGAR marketing | Outreach |
| 7 | **Client & developer mentions**: with permission, ask societies/developers/clients that already work with KARGAR to list KARGAR on vendor/partner pages | Highly relevant, real relationships | Account managers | Ongoing |
| 8 | **Recognition PR**: the 2024 Punyashlok Ahilya Devi Holkar Woman Startup Award and the women-led story are genuinely newsworthy — pitch Pune business/startup media and women-entrepreneur platforms | Earned editorial links + brand searches | KARGAR | Outreach |
| 9 | **Useful content as link targets**: the `/resources` guides (cost factors, staffing method, vendor checklist) are written to be cited by property-management communities and society forums | Linkable assets | Marketing | Ongoing |

## 2. Explicitly excluded

PBNs, paid link packages, link exchanges, automated directory blasts, comment/forum spam, irrelevant guest posts, fake reviews, review gating, fake GBP locations or keyword-stuffed GBP names, foreign or non-business directories.

## 3. Measurement

Track monthly in `seo-reports/kargar-authority-dashboard.md`: GBP views/calls/direction requests, review count and average, referring domains (only from a real data source), and GSC impressions/clicks/position for the keyword map queries. Expect months, not weeks.
