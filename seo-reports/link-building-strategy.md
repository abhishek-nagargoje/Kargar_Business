# Link-Building Strategy

Built from what is actually verified (site code, live search, the prior `SEO_AUDIT_REPORT.md`) — not from backlink-tool data, which is unavailable (see `backlink-audit.md` §0).

## 1. Priority order (Phase 14)

1. **Existing client relationships** — the strongest asset Kargar has right now (§2 below). Free, legitimate, already-earned trust.
2. Existing partner/vendor relationships (none identified beyond clients in this pass — ask internally if suppliers/subcontractors exist who might reciprocally reference Kargar)
3. Genuine editorial mentions (digital PR, see `outreach-templates.md`)
4. Industry/business associations (MCCIA, DCCIA — real, verified to exist)
5. Genuine case studies (once written, from the client list in §2)
6. Digital PR / expert commentary
7. High-quality resource links (once a linkable asset exists — see §3)
8. Relevant legitimate local directories (light touch only — quality over quantity)

Explicitly avoided: mass guest posting, paid links, PBNs, link exchanges, automated directory submission, comment/forum spam — per the brief's non-negotiable rules.

## 2. Relationship Link Opportunity Table (Phase 6)

| Organization | Relationship Evidence | Potential Page | Potential Link Target | Link Type | Relevance | Contact Route | Recommended Pitch | Priority | Status |
|---|---|---|---|---|---|---|---|---|---|
| Godrej (Hillside-1) | `logo-manifest.json`, "Official/Verified" | Any public Godrej project/vendor page, if one exists | Housekeeping or company-profile page | Vendor mention / case study | Very high (large brand, real estate) | Existing account contact | Ask if Kargar can be credited as FM/housekeeping vendor on any public-facing project page | P1 | Not started |
| Kolte-Patil (KP Square, 24K Sereno) | Same source | Developer's project/amenities page | Housekeeping page | Vendor mention | Very high | Existing account contact | Same ask | P1 | Not started |
| Kumar Properties (Kumar Selena, Imperial Atria) | Same source | Project page | Housekeeping page | Vendor mention | High | Existing account contact | Same ask | P2 | Not started |
| Rohan Builders (Rohan Ananta, Rohan Prathama) | Same source | Project page | Housekeeping page | Vendor mention | High | Existing account contact | Same ask | P2 | Not started |
| Sukhwani, Signature Majestique, Supreme Universal | Same source | Project pages | Housekeeping page | Vendor mention | Medium-high | Existing account contact | Same ask | P2 | Not started |
| Mahindra International School, Wellington College, ISMS, Imperial Business College, Colours Innovation Academy, Vedh Vally World School | Same source | School "our vendors/partners" page if one exists | Company-profile or housekeeping page | Testimonial / vendor mention | Medium-high (differentiated sector — few FM competitors surface education-sector proof) | Existing account contact | Ask for a short testimonial or vendor-page credit | P2 | Not started |
| Adonmo, Karnex, HAXPUNE, Powercon, RF Bytes | Same source | Client "about/office" pages if any exist | Company-profile page | Testimonial | Medium | Existing account contact | Same ask | P3 | Not started |

**Never fabricate beyond this** — `logo-manifest.json` is the only verified relationship source found in this pass; do not invent additional relationships.

## 3. Linkable Asset Recommendation (Phase 9)

Of the ten possible assets listed in the brief, the two with the highest realistic link potential for a B2B Pune FM company, given real site content already exists on service depth (per `SEO_AUDIT_REPORT.md` §8):

1. **Office Housekeeping SOP / Checklist** — directly matches the primary target page's commercial intent, genuinely useful to facility managers and HR/admin teams at the exact companies Kargar already serves (IT parks, corporate offices — matches the "IT Parks / Corporate Offices" positioning already in `companyTrust.ts`). Natural linkers: HR/workplace-management blogs, corporate-operations resource sites.
2. **Facility Management Vendor Evaluation Checklist** — useful to the same B2B buyer persona evaluating Kargar itself; naturally links back as a "how to choose an FM vendor" resource, and doubles as content that supports the E-E-A-T signal already flagged as strong in the prior audit (real scope-of-work depth on service pages).

Do not build all ten. Do not build thin AI-filler versions — the existing site content quality is already a genuine differentiator (per `SEO_AUDIT_REPORT.md` §8); any new asset needs to match that bar.

## 4. Link Target Distribution (Phase 16)

Do not send every new link to the housekeeping page. Recommended split as real links start coming in:
- 30–40% homepage / brand
- 15–20% `/services/soft-services` (soft services hub — currently has 0 resolvable internal links per the site's own report; needs internal-link attention regardless of external links)
- 25–35% `/services/soft-services/housekeeping` (primary commercial target)
- 10–15% other genuinely relevant pages (company-profile once it has unique content, other service pages)

## 5. Internal Link Priority (Phase 11)

From the site's own `npm run seo` report (real, run during this audit):
- `/services/soft-services/housekeeping` already has 3 incoming internal links — best-linked dynamic page on the site. Good foundation, no urgent fix needed here.
- `/services/soft-services` (the hub above it) and `/services/hard-services/electrical-maintenance`, `/services/hard-services/hvac-maintenance`, `/services/soft-services/security-services` show **0** statically-resolvable incoming links. The pipeline itself flags 2 template-literal links it can't verify (`CollectionSection.tsx`, `ServiceCategoryCard.tsx`) — so manually confirm via the live site nav whether these are truly orphaned before treating as a bug.
- **Recommendation (content/code change, needs approval before implementation per Phase 25):** if `/services/soft-services` is confirmed weakly linked, add a contextual link to it from `/services` and from the homepage's services section — cheap, safe, no new page required.
