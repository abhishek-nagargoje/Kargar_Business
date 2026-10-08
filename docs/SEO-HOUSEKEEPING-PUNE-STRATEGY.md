# Housekeeping Services Pune — Full SEO Strategy & Audit

**Date:** 2026-09-23
**Primary target:** "housekeeping services pune"
**Page:** `https://www.kargarbusinessservices.com/housekeeping-services-pune`

This document consolidates the audit, on-page status, and off-page strategy (GBP, citations, backlinks, content) for the primary Housekeeping Pune keyword cluster. It does not claim rankings, does not fabricate reviews/citations/backlinks, and marks anything requiring your manual verification explicitly.

---

## 1. Executive Summary

The on-page/technical foundation for `/housekeeping-services-pune` was already built and validated across prior work this session (routing, metadata, canonical, schema, internal linking, sitemap, prerender) — **re-verified clean in this pass, no code changes were required**. The one new finding is a NAP inconsistency in two dead/unused component files (`Footer.tsx`, `Navbar.tsx` — confirmed unreferenced anywhere in the live app) containing placeholder contact info; the live site's actual NAP (phone, email, address) is 100% consistent everywhere it renders. The remaining, larger gap is entirely **off-page**: no citations, no GBP optimization confirmed, no backlinks — none of which can be built from this codebase. This document gives you the concrete, non-fabricated plan for that work.

---

## 2. What Was Audited (this pass)

- Full internal-link graph across all 18 live indexable pages (re-confirmed clean — see prior audit in this session)
- Robots.txt, sitemap.xml, canonical/title/description uniqueness, JSON-LD validity (re-confirmed clean)
- NAP (name/address/phone/email) across the entire `src/` tree — **new finding below**
- `/housekeeping-services-pune` on-page structure against this brief's Phase 2–8 requirements
- Real Google search results landscape for "housekeeping services Pune company" (via live web search)

## 3. What Was Changed

**Nothing in code.** The audit found the existing implementation already satisfies the on-page/technical requirements in Phases 1–8, 18, 20 of this brief (see §6 below for the point-by-point check). No files were modified.

## 4. Files Modified

None.

## 5. Files Created

- `docs/SEO-HOUSEKEEPING-PUNE-STRATEGY.md` (this file)

---

## 6. Housekeeping Pune SEO Status (Phase 2–8, 18 checklist)

| Requirement | Status | Detail |
|---|---|---|
| Self-canonical | ✅ | `https://www.kargarbusinessservices.com/housekeeping-services-pune` |
| Unique title | ✅ | "Housekeeping Services in Pune \| KARGAR Facility Management" |
| Unique meta description | ✅ | Mentions housekeeping, Pune, corporate/IT park/commercial/industrial applicability, brand |
| Exactly one H1 | ✅ | "Housekeeping Services in Pune" |
| `index, follow` | ✅ | No noindex anywhere on the page |
| Structured data | ✅ | `Service` (areaServed: Pune), `FAQPage` (5 real FAQs matching visible content), `BreadcrumbList` matching visible breadcrumb, `Organization`/`LocalBusiness`/`WebSite` — no fake reviews/ratings |
| Content sections | ✅ | Hero, intro (2 paragraphs), "what's included" (4 items: daily janitorial, restroom hygiene, deep cleaning, consumables), "why choose KARGAR" (4 items), industries served (7), FAQ (5), related links, dual CTA |
| Internal links in | ✅ | Homepage, `/services`, `/sectors`, `/services/soft-services/housekeeping`, `/services/soft-services` (5+ distinct source pages, verified in rendered HTML) |
| Internal links out | ✅ | `/services/soft-services/housekeeping` (service detail), `/facility-management-company-pune`, `/security-services-pune`, `/services/soft-services`, `/contact-us` |
| Cannibalization vs. `/services/soft-services/housekeeping` | ✅ | Resolved earlier this session — service-detail page retitled "Corporate Housekeeping Service" (product-detail intent); Pune page owns the local-commercial title/intent. Verified: 0 duplicate titles across 18 pages |
| Prerendered HTML | ✅ | Static HTML confirmed to contain title/meta/canonical/H1/body/JSON-LD without relying on client JS (verified via direct `dist/` inspection in a prior pass this session) |
| No keyword stuffing | ✅ | Reviewed the actual copy — no unnatural repeated-keyword paragraphs; local relevance conveyed through Baner/PCMC/Pune Metropolitan Region mentions and sector-specific language, not list-stuffing |
| No fabricated claims | ✅ | Every factual claim (address, PCMC coverage, years/clients/sites stats) is drawn from data already used consistently elsewhere on the site, not invented for this page |

**No further code changes are recommended for this page at this time.**

---

## 7. NAP Consistency Audit (Phase 9) — new finding

| Field | Live/rendered value (consistent everywhere) | Where it appears |
|---|---|---|
| Business name | KARGAR Facility Management | Every visible page, JSON-LD Organization/LocalBusiness, meta |
| Phone | +91-7821844591 / +91 78218 44591 | Header, homepage, contact page, privacy policy, `LocalBusiness` schema (updated 2026-09-23 — consolidated to a single number site-wide, replacing the prior primary/secondary pair) |
| Email | bd@kargar.co.in | Header, contact page, privacy policy |
| Address | 301, 3rd Floor, Unity Commercial, Baner, Pune, Maharashtra 411045, India | Contact page, privacy policy, `LocalBusiness` schema (identical string in all three) |

**✅ NAP is fully consistent on the live, rendered site.**

⚠️ **Finding (not live, low priority):** `frontend/src/components/layout/Footer.tsx` and `frontend/src/components/layout/Navbar.tsx` — both confirmed unused/unimported anywhere in the app (dead code, verified via repo-wide import search) — contain a **generic placeholder phone (`+91 98765 43210`) and a different email (`info@kargarfm.com`)**, neither matching the real business info. Since these components never render, this does not affect the live site, GBP, schema, or any crawlable page. Recommend either deleting these two dead files or updating their placeholder data if they're ever reactivated — flagging rather than silently fixing, since deleting files wasn't requested and touching dead code is out of this task's stated scope.

**[REQUIRES VERIFICATION]** Whether `bd@kargar.co.in` and both phone numbers above are the exact, current, officially-preferred contact details for public-facing local SEO purposes (vs. e.g. a dedicated sales line) — I can't verify this against your actual business records.

---

## 8. Technical SEO Status (Phase 20)

Re-confirmed in this session's prior audit passes (all live, all still true): robots.txt clean, sitemap.xml valid (18 URLs), no broken internal links, no duplicate canonicals, no duplicate titles, no accidental noindex, HTTPS + `www` host consistent, no trailing-slash inconsistency (single-hop 308 redirect by design, documented in `docs/GSC-REMEDIATION.md`), JSON-LD valid JSON on all 18 pages. **No changes needed.**

**[REQUIRES VERIFICATION — outside this codebase]:** Core Web Vitals field data (LCP/INP/CLS) requires real Chrome UX Report / PageSpeed Insights data, which this session has no access to. The prior session's audit (`SEO_AUDIT_REPORT.md`, pre-existing) found and fixed a lazy-loaded LCP hero image and added vendor bundle splitting — no new performance work identified in this pass.

---

## 9. Structured Data Status

Valid, matches visible content, no fabricated reviews/ratings/offers (verified — see §6). **[REQUIRES VERIFICATION]** Google Rich Results Test / Search Console's own Structured Data report is the authoritative validator — this session can only confirm the JSON parses correctly and matches the schema.org vocabulary; it cannot confirm Google will render a rich result (Google never guarantees this regardless of validity).

---

## 10. Google Business Profile Optimization Checklist (Phase 10–11)

**I have no access to your GBP dashboard — every "current value" below is [REQUIRES VERIFICATION]. This is a checklist for you to work through, not a report of confirmed state.**

| Setting | Current value | Recommended value | Why | Risk | Action |
|---|---|---|---|---|---|
| Business name | [REQUIRES VERIFICATION] | "KARGAR Facility Management" (exact real-world registered/operating name only) | Consistency with website/schema; do not add keywords unless that's genuinely the business's real name | Adding keywords to the GBP name violates Google's guidelines and risks suspension | Verify current name in GBP dashboard against official business documents |
| Primary category | [REQUIRES VERIFICATION] | "Facility Management Company" or "Cleaning Service" (whichever most accurately reflects primary revenue) | Category drives which searches you're eligible for | Wrong category = invisible for relevant local-pack searches | Check current category; confirm it matches actual primary service |
| Secondary categories | [REQUIRES VERIFICATION] | Consider "Commercial Cleaning Service," "Janitorial Service," "Security Guard Service" — only those genuinely offered | Broader (accurate) discoverability | Irrelevant categories are a guideline violation | Audit and add only genuinely-offered categories |
| Address | [REQUIRES VERIFICATION] | 301, 3rd Floor, Unity Commercial, Baner, Pune, Maharashtra 411045 (must match website exactly) | NAP consistency is a local-ranking signal | Mismatch confuses Google's entity matching | Confirm GBP address matches website verbatim |
| Service area | [REQUIRES VERIFICATION] | Pune + PCMC + Pune Metropolitan Region — only areas genuinely served | Google requires accurate service-area representation | Overclaiming service area is a policy violation | Set service area to match what's stated on the website (Baner, Pune, PCMC, Pune Metropolitan Region) |
| Phone | [REQUIRES VERIFICATION] | +91-7821844591 (match website's number) | NAP consistency | Mismatch | Confirm |
| Website URL | [REQUIRES VERIFICATION] | `https://www.kargarbusinessservices.com/` (homepage) or `https://www.kargarbusinessservices.com/housekeeping-services-pune` for a service-specific link if GBP supports it | Direct users to the strongest relevant page | Low | Confirm current URL field |
| Hours | [REQUIRES VERIFICATION] | Match "Mon – Sat: 09:00 AM – 06:00 PM" (used on the contact page) | Consistency | Low | Confirm |
| Services list | [REQUIRES VERIFICATION] | Housekeeping Services, Commercial Housekeeping, Office Housekeeping, Corporate Housekeeping, Security Services, Electrical Maintenance, HVAC Maintenance — only what's genuinely offered (see §11) | Matches real offerings, aids category-level matching | Overclaiming risks policy violation | Populate/audit GBP Services tab |
| Business description | [REQUIRES VERIFICATION] | Should mirror the accurate, non-keyword-stuffed language already used on `/company-profile` and `/facility-management-company-pune` | Consistency, avoids duplicate/spammy phrasing | Low | Draft from existing website copy, don't write new claims |
| Photos/videos | [REQUIRES VERIFICATION] | Real photos of actual work/staff/sites only | Trust signal | Stock/generic photos reduce trust and may violate authenticity guidelines | Audit current photo count/quality |
| Reviews | [REQUIRES VERIFICATION] | See §12 legitimate review strategy — never fabricate | Trust/ranking signal | Fake reviews = suspension risk | Use the request templates in §12 |
| Review responses | [REQUIRES VERIFICATION] | Respond to all reviews professionally | Signals active management | Low | Use templates in §12 |
| Attributes | [REQUIRES VERIFICATION] | Only accurate attributes (e.g. "Identifies as women-owned" only if true) | Accuracy | Misrepresentation risk | Audit |
| Posts | **RESTRICTED per your note** | Do not post until restriction is resolved | — | Repeating rejected content risks further restriction | See §11 below |

## 11. GBP Restriction / Policy Actions (Phase 10, critical)

Per your note: the GBP previously received a warning/restriction after a post containing contact information.

**Do NOT, under any circumstances (per this brief's own explicit rules, which I am following):**
- Republish the same or similar rejected content
- Create a new GBP to bypass the restriction
- Attempt to work around the posting restriction technically

**Recommended recovery checklist (manual, for you to execute — I cannot access your GBP):**
1. Open Google Business Profile Manager and check the **Business Profile status** / **Notifications** panel for the exact policy reason cited.
2. Check **Edit profile → Info** for any "pending edits" awaiting Google review.
3. Confirm verification status is still "Verified" (not "Suspended" or "Needs re-verification").
4. Gather official business evidence in advance in case an appeal is needed: GST certificate, business registration/incorporation document, a recent utility/bank statement showing the Baner address, and photos of a business sign/premises if available.
5. If the profile shows "suspended" (not just "post rejected"), use Google's official **Business Profile Help → Appeal** flow — do not use third-party "GBP recovery" services.
6. **Once posting is restored**, use compliant post templates with no phone number, no email, and no direct "call us" CTA in the post body — link to the website's `/contact-us` page instead, which carries the phone/email:

   **Compliant post template (once restored):**
   > "Keeping Pune's offices and facilities running smoothly — our housekeeping teams handle daily cleaning, restroom hygiene, and deep cleaning for corporate offices and commercial spaces across the city. Learn more about our approach → [website link]"

   No phone number, no email address, no urgency language — just informational content with a link.

---

## 12. Review Strategy (Phase 12) — legitimate acquisition only

**Never:** fabricate reviews, offer incentives for positive reviews, condition a review request on sentiment, or write reviews yourselves.

**1. In-person / post-service verbal ask:** "If you were happy with the service, a short Google review would really help us — here's the link." (Send the link separately, don't dictate content.)

**2. WhatsApp request template:**
> "Hi [Name], thank you for choosing KARGAR Facility Management for [service]. If you have a moment, we'd really appreciate an honest review of your experience: [GBP review link]. Thank you!"

**3. Email request template:**
> Subject: How was your experience with KARGAR?
> "Hi [Name], we hope your [service] has been running smoothly. Your honest feedback helps us improve and helps other Pune businesses find reliable facility management support. If you have two minutes, please share a review here: [GBP review link]. Thank you for your trust."

**4. Post-service (structured) request:** trigger this message 3–5 days after a completed service milestone (not immediately, to allow the client to actually assess the work).

**5. Review response templates:**
- Positive: "Thank you, [Name] — we're glad the team could keep [site/facility] running smoothly. We'll pass this along to the crew."
- Negative: "Thank you for the feedback, [Name]. This isn't the standard we hold ourselves to — please reach out to us directly at bd@kargar.co.in so we can address this properly." (Never argue publicly; always offer an offline path.)

**6. Monitoring workflow:** check GBP reviews weekly; respond within 48 hours; log recurring complaint themes for internal quality review.

---

## 13. Local Citation Plan (Phase 13, 31)

Only legitimate, India/Pune/facility-management-relevant platforms. NAP must match the website exactly on every submission.

| Platform | URL | Category | Pune relevance | Industry relevance | Priority | Risk |
|---|---|---|---|---|---|---|
| Google Business Profile | business.google.com | Local | Direct | Direct | P0 | None (already exists — restore first) |
| Justdial | justdial.com | General directory | High (India-wide, strong Pune presence) | Direct (facility/housekeeping category exists) | P1 | Low |
| Sulekha | sulekha.com | General directory | High | Direct (has a dedicated Pune housekeeping category — appeared in search results above) | P1 | Low |
| IndiaMART | indiamart.com | B2B directory | Medium | Direct (B2B services, common for facility management) | P1 | Low |
| Bing Places | bingplaces.com | Local | Direct | Direct | P1 | None |
| Apple Business Connect | businessconnect.apple.com | Local | Direct | Direct | P2 | None |
| MCA / GST public listings | mca.gov.in | Legal/registry | N/A | N/A | P2 (verification only, not marketing) | None |
| Pune-specific chamber (e.g. MCCIA — Mahratta Chamber of Commerce, Industries and Agriculture) | mccia.com | Industry association | Direct | Indirect (general commerce, but Pune-specific and credible) | P2 | Low — **[REQUIRES VERIFICATION]** whether KARGAR is eligible/willing to join as a member (this is a paid membership, not a free listing) |
| Facility Management Association of India (FMAI) | fmaindia.org | Industry association | Indirect (national) | Direct | P2 | Low — **[REQUIRES VERIFICATION]** membership requirements/cost |

**Explicitly not recommended:** generic global "SEO directory" submission services, bulk/automated directory blasts, any directory that doesn't allow a real business page with verifiable NAP, and any foreign directory with no India relevance.

---

## 14. Backlink / Digital PR Plan (Phase 14–15, 32)

**Legitimate opportunity types only** — no purchased links, no PBNs, no bulk guest posts, no link exchanges.

| Opportunity type | Example target category | Acquisition method | Anchor guidance | Link attribute |
|---|---|---|---|---|
| Local business directories (see §13) | Justdial, Sulekha, IndiaMART | Direct submission with real NAP | Business name / branded | Typically nofollow (directory norm) — acceptable, these are for discovery/NAP consistency, not link equity |
| Industry association membership | FMAI, MCCIA | Formal membership application | N/A (member directory listing) | Follow, if genuinely offered |
| Client testimonial / case study exchange | An actual client's own website, only with their permission | Ask a satisfied client if they'd be willing to name KARGAR in a vendor/partner mention | Branded | Follow or nofollow, client's choice |
| Local business press/interview | Pune business publications (**[REQUIRES VERIFICATION]** — specific outlets require real research, not guessed) | Pitch a genuine story angle (see §15) — real outreach, not paid placement | Branded/contextual | Editorial discretion |
| Supplier/partner cross-linking | Any genuine equipment supplier, uniform provider, or subcontractor KARGAR actually works with | Mutual "our partners" page mention, only if the relationship is real | Branded | Follow, natural |

**Outreach email template (for a genuine PR pitch, e.g. to a local business publication):**
> Subject: Facility management insight for Pune businesses — [specific angle]
> "Hi [Name], I'm reaching out from KARGAR Facility Management, a Pune-based (Baner) facility management company. We've noticed [specific, genuine observation about the local market — e.g. a recurring operational challenge]. I thought this might be a useful angle for [publication]'s readers — happy to share our operational perspective if it's of interest. No pitch attached, just flagging in case it's useful. Best, [Name]."

**Why this works:** it's a genuine offer of expertise, not a link request — publications respond better to real insight than to "please link to us."

**[REQUIRES VERIFICATION]:** Specific named Pune business publications, real estate/property-management communities, and chamber events — I don't have verified, current contact details for these and won't invent placeholder names. This requires manual research (searching Pune business news sites, LinkedIn groups for Pune facility/property managers, and local chamber event calendars).

---

## 15. Ten Digital PR / Content Angles (Phase 15)

| # | Title | Target keyword | Target URL (internal link) |
|---|---|---|---|
| 1 | How to Choose a Housekeeping Service Provider in Pune | housekeeping company pune | `/housekeeping-services-pune` |
| 2 | Commercial Housekeeping Checklist for Pune Offices | commercial housekeeping services pune | `/housekeeping-services-pune` |
| 3 | Office Housekeeping vs. Full Facility Management: What's the Difference | facility management company pune | `/facility-management-company-pune` |
| 4 | What a Facility Management Proposal Should Include | facility management services pune | `/facility-management-company-pune` |
| 5 | Preventive Electrical Maintenance: Why It Matters for Commercial Buildings | electrical maintenance pune | `/electrical-maintenance-services-pune` |
| 6 | HVAC Maintenance Schedules for Commercial Properties | hvac maintenance pune | `/hvac-maintenance-services-pune` |
| 7 | Security Staffing Considerations for Corporate Offices | security services pune | `/security-services-pune` |
| 8 | Housekeeping Staff Training and Supervision Standards | housekeeping staff pune | `/housekeeping-services-pune` |
| 9 | Integrated Facility Management: One Vendor vs. Multiple Vendors | integrated facility management pune | `/facility-management-company-pune` |
| 10 | Hygiene Standards for Corporate Offices Post-Pandemic | office housekeeping services pune | `/housekeeping-services-pune` |

Each requires KARGAR's own genuine operational knowledge to write — none of these should be outsourced to generic AI content. **Not written in this pass** — see §16 for prioritization criteria before committing to any of them.

---

## 16. Content Cluster & Cannibalization Map (Phase 16, 18)

**Pillar:** `/housekeeping-services-pune`

| Keyword | Search intent | Primary URL | Secondary supporting URL | Reason |
|---|---|---|---|---|
| housekeeping services pune | Local commercial | `/housekeeping-services-pune` | `/services/soft-services/housekeeping` | Pillar owns local intent; service page owns product-detail intent |
| corporate housekeeping service | Product/service detail | `/services/soft-services/housekeeping` | — | Retitled this session specifically to own this non-local intent |
| facility management company pune | Local commercial, company-level | `/facility-management-company-pune` | `/company-profile` | Pillar owns "who to hire"; company-profile owns brand narrative |
| security services pune | Local commercial | `/security-services-pune` | `/services/soft-services/security-services` | Same pattern as housekeeping |
| electrical maintenance pune | Local commercial | `/electrical-maintenance-services-pune` | `/services/hard-services/electrical-maintenance` | Same pattern |
| hvac maintenance pune | Local commercial | `/hvac-maintenance-services-pune` | `/services/hard-services/hvac-maintenance` | Same pattern |

**Before publishing any of the 10 content ideas in §15:** run this same check — does the proposed article's primary keyword already have an owner above? If yes, the article must support that page (internal link into it) rather than compete with it. None of the 10 ideas above currently collide with an existing page's primary keyword.

**Do not create:** dedicated pages for individual Pune neighborhoods (Hinjawadi, Wakad, Baner, Kharadi, etc.) unless a specific one has a genuine, substantial, non-duplicate reason to exist — per this brief's own explicit instruction. Neighborhood mentions belong inside existing content as natural context, not as new thin pages.

---

## 17. 90-Day Content Plan (Phase 33)

| Week | Content type | Title | Target keyword | Target URL | Status |
|---|---|---|---|---|---|
| 1–2 | GBP recovery | Resolve posting restriction (§11) | — | GBP | Not started — manual, your action |
| 1–2 | Citations | Submit/verify Justdial, Sulekha, IndiaMART, Bing Places (§13) | — | — | Not started — manual, your action |
| 3–4 | Article | How to Choose a Housekeeping Service Provider in Pune (§15 #1) | housekeeping company pune | `/housekeeping-services-pune` | Not started |
| 5–6 | Article | Commercial Housekeeping Checklist for Pune Offices (§15 #2) | commercial housekeeping services pune | `/housekeeping-services-pune` | Not started |
| 7–8 | Outreach | First 2–3 genuine PR pitches using §14 template | — | — | Not started |
| 9–10 | Article | Facility Management Proposal guide (§15 #4) | facility management services pune | `/facility-management-company-pune` | Not started |
| 11–12 | Review push | Begin structured post-service review requests (§12) | — | GBP | Not started |
| 13 | GSC review | Check indexing/performance data for the 5 Pune pages (§18) | — | — | Not started |

This is a **plan**, not a commitment — pacing depends on your team's real capacity to write genuinely useful content (per this brief's explicit anti-filler instruction) and to execute the manual GBP/citation work.

---

## 18. Google Search Console Action Plan (Phase 29)

1. **Sitemap:** confirm `https://www.kargarbusinessservices.com/sitemap.xml` is submitted in GSC (Sitemaps report). If not already submitted, submit it once.
2. **URL Inspection:** inspect `/housekeeping-services-pune` specifically. Check: "URL is on Google," crawl allowed, indexing allowed, Google-selected canonical matches the declared canonical.
3. **Test Live URL:** use the "Test Live URL" button in the inspection tool to confirm current live rendering matches what's expected (title, content).
4. **Request Indexing:** only if the inspection shows the page is not yet indexed, or after a meaningful content change — **not repeatedly**, per this brief's own rule.
5. **Pages report:** monitor for any new "Excluded" entries; compare against `docs/GSC-REMEDIATION.md`'s existing baseline.
6. **Performance report:** filter by query containing "housekeeping" and by page `/housekeeping-services-pune` — track impressions/clicks/CTR/position over time (data will only start appearing once Google has crawled and begun serving the page in results).
7. **Core Web Vitals report:** monitor at the site level; no page-specific action needed unless a regression appears.
8. Do not claim ranking success until this report actually shows query/position data — no such data exists yet in this session.

---

## 19. Validation Results

```
npx tsc -b                          → PASS (no code changed, re-confirmed clean from prior pass)
npm run lint                        → PASS (0 errors, 22 pre-existing warnings)
SEO validator pipeline               → PASS (canonicals, metadata, headings, alt-text, schema,
                                        links, route-coverage, sitemap, robots — all PASS,
                                        confirmed earlier this session)
Live production checks               → All 18 pages verified 200, unique titles/canonicals,
                                        valid JSON-LD, no orphans, no broken links
                                        (re-confirmed in the immediately prior audit this session)
```
No new build was run in this pass since no code changed.

---

## 20. Final SEO Scorecard

| Area | Status | Issues | Notes |
|---|---|---|---|
| **Technical SEO** | ✅ Strong | None found | Sitemap, robots, canonicals, prerender all clean |
| **On-page SEO** | ✅ Strong | None found | `/housekeeping-services-pune` meets all Phase 2–8 requirements |
| **Local SEO (on-site)** | ✅ Strong | Minor: dead-code NAP placeholder (§7, not live) | Real NAP fully consistent |
| **Local SEO (off-site / GBP)** | ⚠️ Unknown / needs manual work | Posting restriction unresolved; profile completeness unverified | See §10–11, entirely manual |
| **Content** | ⚠️ Foundation only | No supporting content published yet | See §15–17 for planned articles |
| **Internal linking** | ✅ Strong | None found | Re-confirmed clean this session |
| **Citations** | ❌ Not started | Zero confirmed citations | See §13 |
| **Backlinks** | ❌ Not started | Zero confirmed backlinks | See §14 |
| **Structured data** | ✅ Strong | None found | Valid, accurate, no fabrication |
| **GSC** | ⚠️ Unknown | No data available to this session | See §18 |
| **Performance** | ✅ Prior fixes in place | No new issues found | LCP/bundle fixes already shipped in a prior session |

---

## 21. Remaining Manual Tasks

1. Resolve the GBP posting restriction (§11) — cannot be done from this codebase.
2. Verify and complete the full GBP profile against the checklist in §10.
3. Submit citations per §13's priority order.
4. Begin genuine outreach per §14–15 (requires real research into specific Pune publications — flagged as [REQUIRES VERIFICATION], not guessed).
5. Write and publish supporting content per §17's pacing, only when genuinely ready (not rushed to hit a calendar date).
6. Run the GSC checks in §18 once the current deployment has had time to be recrawled.
7. Consider deleting or fixing the two dead-code files with placeholder NAP data (§7) — optional, no live impact.

## 22. Risks

- Publishing GBP posts before the restriction is confirmed lifted could worsen the restriction.
- Any temptation to accelerate results via purchased links, fake reviews, or directory spam would violate Google's spam policies and risk the opposite of the intended outcome — explicitly not recommended anywhere in this plan.
- Content published purely to "hit" the 90-day calendar without genuine operational insight will underperform and risks looking like AI filler — pacing should flex to actual content quality, not the calendar.

## 23. Next Priorities

1. GBP restriction recovery (§11) — highest-leverage, zero-cost, entirely manual.
2. GBP profile completeness (§10).
3. First 2 citation submissions (Justdial, Sulekha) — quick, legitimate, real NAP consistency signal.
4. First supporting article (§15 #1) once ready to write it properly.
