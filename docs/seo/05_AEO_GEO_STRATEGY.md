# 05 — AEO and GEO Strategy

**Date:** 2026-11-17

AEO and GEO make content easy to extract and attribute correctly. They **do not guarantee** featured snippets, AI Overview inclusion or citations by ChatGPT, Gemini, Perplexity or Copilot.

## 1. Answer Engine Optimisation (implemented)

**Pattern used:** a question-shaped H2 or FAQ, then a 1–2 sentence direct answer, then detail. Answers are in the HTML (native `<details>`, prerendered), and FAQPage JSON-LD is generated from the same strings (`PuneLandingPage.tsx` → `buildFAQSchema`), so markup always matches visible content.

| Question (from the brief) | Where it is answered |
|---|---|
| What are housekeeping services / what does a professional housekeeping company do? | /housekeeping-services-pune FAQ (new) |
| How much do housekeeping services cost in Pune? | Pillar FAQ + /resources/housekeeping-cost-pune (cost drivers, no invented prices) |
| What is included in commercial housekeeping? | /commercial-housekeeping-services-pune zone table |
| What is industrial housekeeping? | /industrial-housekeeping-services-pune |
| How can businesses hire housekeeping staff in Pune? | /housekeeping-staff-pune FAQ (new) |
| Difference between housekeeping and facility management? | Housekeeping pillar FAQ (new) |
| Is office housekeeping the same as office cleaning? | Office page FAQ (new) |
| What services does a security agency provide? | Security pillar H2 + FAQ (new) |
| How can a company hire security guards in Pune? | Security pillar FAQ (new) |
| What is corporate security? / What is industrial security? | Corporate and industrial page FAQs (new) |
| How many security guards does a commercial property need? | Security pillar worked-example table + FAQ (new) |
| What should businesses check before hiring a security agency? | Pillar checklist + new guide |
| Responsibilities of security personnel? | Security pillar FAQ (new) |
| What is integrated facility management? / What does FM cost in Pune? | FM pillar FAQs (new) |

**FAQ rich results:** Google currently shows FAQ rich results only for a narrow set of authoritative government and health sites. The FAQPage markup is kept because it is accurate and machine-readable, **not** because it is expected to produce rich results.

## 2. Generative Engine Optimisation

### Entity consistency (verified, already in place)
- One Organization `@id` (`https://www.kargarbusinessservices.com/#organization`) referenced by every Service node as `provider`.
- LocalBusiness with the Baner address, phone, hours and areaServed; identical NAP in the footer, contact page and schema.
- `sameAs` limited to genuine official profiles (a 404 LinkedIn URL was removed in an earlier commit).
- Consistent brand string: "KARGAR Facility Management (Kargar Business Services Pvt. Ltd.)".

### What machines can now extract about KARGAR
Who (women-led Pune FM company, award from the Hon'ble Prime Minister in 2024), what (housekeeping, security, maintenance, staffing, support), where (Baner office; Pune and PCMC), whom (societies, corporate, commercial, educational, healthcare, manufacturing), how (PURNA protocol, police verification, PF/ESIC, payroll transparency) and contact. All of these appear as plain declarative sentences on the pillars, which is the form generative systems quote most reliably.

### Claims policy (critical for GEO)
AI systems repeat what a site says. Unverified claims therefore spread further than they would through a human reader. Everything new traces to `seo-audit/SEO_CONTENT_PLAN.md` §0. Outstanding unverified items are listed in `01_SEO_AUDIT_REPORT.md` (P0-2, P1-5, P1-6).

### llms.txt (evaluated, not implemented)
- Google states that it does not use llms.txt for Search; other engines' support is inconsistent.
- The site already exposes prerendered HTML, a complete sitemap and clean structured data. These are the signals crawlers use.
- A hand-written llms.txt would drift from `punePages.ts`. **If wanted later:** generate it in `scripts/seo/index.ts` from `punePageList` + `guidePageList` (title, URL, summary), so it can never go stale. Treat it as supplementary documentation, never as an indexing mechanism.

### AI crawler access
`robots.txt` allows all user agents except `/admin`. GPTBot, Google-Extended, PerplexityBot and ClaudeBot are not blocked. Keep it that way unless the business decides otherwise.

## 3. Off-site GEO (business action)
Generative answers lean heavily on third-party corroboration: directory listings, press, reviews and "top FM companies in Pune" articles. See `06_CONTENT_ROADMAP.md` §4.
