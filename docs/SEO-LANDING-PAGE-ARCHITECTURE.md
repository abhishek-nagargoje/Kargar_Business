# SEO Landing Page Architecture — Pune Local-Commercial Pages

**Date:** 2026-09-21

## 1. Repository audit summary (Phase 0)

Before writing any code, the existing SEO architecture was inventoried:

| Concern | Existing source of truth | Reused as-is? |
|---|---|---|
| Routing | `src/App.tsx` (React Router `<Routes>`) | Extended — 5 new `<Route>` entries |
| Static-page metadata | `src/features/seo/registry.ts` (`seoRegistry`) | Extended — 5 new entries |
| Dynamic service/category metadata | `src/features/services/config/{categories,hard-services,soft-services}.ts` | Left untouched |
| Node-pipeline route list | `scripts/seo/seo.config.ts` (`STATIC_ROUTES`, `PAGE_IMAGES`) | Extended — 5 new paths + images |
| Route inventory (sitemap/robots/prerender/rewrites all read this) | `scripts/seo/route-inventory.ts` (`buildRouteInventory()`) | **Not modified** — it already merges `STATIC_ROUTES` × `seoRegistry`, so the 5 new pages flow through automatically |
| Sitemap generator | `scripts/seo/generate-sitemap.ts` | Not modified — reads `buildRouteInventory()` |
| Robots generator | `scripts/seo/generate-robots.ts` | Not modified |
| Vercel rewrites/redirects | `scripts/seo/generate-redirects.ts` | Not modified — auto-derives rewrites from `buildRouteInventory()` |
| Prerender | `scripts/seo/prerender.ts` | Not modified — iterates `buildRouteInventory()` |
| Canonical URL builder | `src/lib/seo/canonical.ts` (`buildCanonicalUrl`) | Reused directly |
| JSON-LD builders | `src/lib/seo/schema.ts` | `buildFAQSchema` reused directly; a plain inline `Service` schema object was written per page (see §4) rather than adding a new builder, since the existing `buildServiceSchema`/`buildCategoryServiceSchema` are typed specifically against the `Service`/`Category` domain objects and these new pages are intentionally a different, decoupled content model (see §2) |
| `<SEO>` component (title/meta/OG/Twitter/canonical/hreflang/JSON-LD) | `src/components/seo/SEO.tsx` | Reused directly, unmodified |
| Breadcrumb (visible UI + schema) | `src/features/services/components/Breadcrumb.tsx` | Reused directly, unmodified |
| No-trailing-slash URL convention | `vercel.json` (`trailingSlash: false`), `buildCanonicalUrl` | Preserved — new URLs follow the identical convention (e.g. `/housekeeping-services-pune`, no trailing slash) |

**Result: no second SEO system, no second sitemap system, no second routing system was introduced.** The only new pipeline-facing additions are entries in the two arrays/registries (`STATIC_ROUTES`, `seoRegistry`) that already existed for exactly this purpose.

## 2. Why these pages are a separate content model, not new `Service` entities

The existing `Service`/`Category` domain type (`src/features/services/domain/service.types.ts`) is tightly coupled to the `/services/:categoryId/:serviceId` taxonomy: `categoryId`, `slug`-based routing, `relationships.relatedServices` referencing sibling service IDs, and consumption by `getServicesByCategory`, `ServiceCategoryCard`, the homepage services grid, etc. Modeling a Pune page as a fake `Service` would have required either a fake `categoryId` (polluting real category listings — a real risk of "damaging existing SEO," explicitly disallowed) or non-trivial changes to every consumer of that registry.

Instead, per section 26/27 of the brief (existing pages = **service-detail intent**, new pages = **local/commercial intent**), a small, decoupled, typed content model was created:

- `src/features/pune-landing/domain/types.ts` — `PuneLandingPageContent` interface
- `src/features/pune-landing/config/punePages.ts` — the single source of truth for all 5 pages' content (title, description, hero copy, FAQs, links)
- `src/features/pune-landing/pages/PuneLandingPage.tsx` — **one** reusable page component, matched to content by `location.pathname`, so adding a 6th page in the future means adding one config entry + one route + one registry entry, not a new component
- `src/features/pune-landing/components/PuneServicesLinksSection.tsx` — the homepage/services-hub link block, generated from `punePageList`, so it never drifts from the config

This is "prefer reusable layout + typed configuration" (brief §30) without forcing an unrelated domain model to fit.

## 3. Keyword architecture — why 5 pages, not 15

The brief's own §8 ("no doorway pages") and §28 (cannibalization audit) were applied against the initial 15-URL wishlist. Result:

| Keyword cluster | Pages built | Pages explicitly NOT built | Why not |
|---|---|---|---|
| Housekeeping | `/housekeeping-services-pune` | `/commercial-housekeeping-services-pune`, `/corporate-housekeeping-services-pune`, `/industrial-housekeeping-services-pune`, `/society-housekeeping-services-pune` | No real, differentiated operational content exists for these sub-segments beyond what's already stated on the one housekeeping page ("corporate offices, IT parks... commercial housekeeping for retail... industrial housekeeping for manufacturing"). Four near-clone pages differing only by a swapped noun phrase is the literal definition of a doorway page (§8) |
| Security | `/security-services-pune` | `/security-guard-services-pune`, `/facility-security-services-pune` | Same reasoning — no distinct content or search intent beyond phrasing |
| Facility management | `/facility-management-company-pune` | `/facility-management-services-pune`, `/commercial-facility-management-pune`, `/industrial-facility-management-pune`, `/corporate-facility-management-pune` | "Company" (who to hire) vs. "services" (what they offer) is too close an intent split to justify two pages without duplicating most of the content; the 3 segment variants have the same doorway-page problem as housekeeping's segment variants |
| Electrical / HVAC | `/electrical-maintenance-services-pune`, `/hvac-maintenance-services-pune` | — | Built as proposed; each has genuinely distinct, real operational content (from `hard-services.ts`) |
| Soft/hard services | — | `/soft-services-pune`, `/hard-services-pune` | These would duplicate the **existing** `/services/soft-services` and `/services/hard-services` category hub pages almost exactly — appending "-pune" to a URL doesn't create a different page when the content and search intent are identical to an already-indexed, already-working page |

This matches the brief's own §51 success criteria ("measure success by... no doorway-page behavior... no cannibalization" — not "number of pages created").

## 4. Metadata, canonical, robots

Every new page:
- Has a **self-referencing canonical** via `buildCanonicalUrl(content.path)` (no trailing slash, matching site convention)
- Renders `index, follow` (no `robots` override passed to `<SEO>`, so `SEO.tsx`'s default applies)
- Has a unique `<title>` (21–31 raw chars, validated) and unique meta description (140–160 chars, validated) — see `scripts/seo/validate-metadata.ts`
- Has exactly one `<h1>` (verified in rendered output, §7)
- Carries a `Service` JSON-LD node (`name`, `description`, `serviceType`, `provider: {"@id": ".../#organization"}`, `areaServed: Pune`) plus an `FAQPage` node built from `buildFAQSchema` (reused, not reimplemented) — no fabricated ratings, reviews, or offers
- Carries `BreadcrumbList` JSON-LD via the same `<SEO breadcrumbItems>` mechanism every other page uses, so the visible breadcrumb and the schema can never drift

**Real cannibalization caught and fixed during implementation:** `/services/soft-services/housekeeping`'s existing SEO title was literally `"Housekeeping Services in Pune"` — identical to the new page's title. The `validate-metadata` duplicate-title check (which already existed in the pipeline) caught this immediately. Fixed by re-titling the existing service-detail page to `"Corporate Housekeeping Service"` (service-detail intent) and letting the new page own the local-commercial title, per brief §28's explicit resolution options ("adjust metadata... differentiate content intent"). Its `keywords[0]` and description were left otherwise unchanged (both still validate).

## 5. Internal-link strategy (§17–18)

No page was left without real incoming links from actual site content:

```
Homepage (/)
 └── "Facility Management Services Across Pune" block (PuneServicesLinksSection)
      → all 5 Pune pages

/services (hub)
 └── same PuneServicesLinksSection block
      → all 5 Pune pages

/company-profile
 └── one contextual sentence link
      → /facility-management-company-pune

/sectors
 └── two contextual sentence links
      → /housekeeping-services-pune, /security-services-pune

/services/soft-services/housekeeping  ←→  /housekeeping-services-pune
/services/soft-services/security-services  ←→  /security-services-pune
/services/hard-services/electrical-maintenance  ←→  /electrical-maintenance-services-pune
/services/hard-services/hvac-maintenance  ←→  /hvac-maintenance-services-pune
   (each service-detail page gets one contextual "Looking for X in Pune? See our Y page" link;
    each Pune page's `serviceDetailLink` links back — genuine bidirectional pairing)

/services/hard-services (category hub)  → electrical-maintenance-services-pune + hvac-maintenance-services-pune
/services/soft-services (category hub)  → housekeeping-services-pune + security-services-pune

Each Pune page → its `relatedLinks` (sibling Pune pages + the relevant category hub)
Each Pune page → its `serviceDetailLink` (the service-detail page)
Each Pune page → /contact-us (hero + closing CTA, via the existing `buildContactUrl`/`useContactNavigation` — attribution parameters preserved, exactly as every other CTA on the site already works)
```

Click depth: every new page is reachable in **1 click from Home** (via the homepage block) and **1 click from /services**. No page relies on the sitemap alone for discovery (§18's explicit requirement).

Anchor text is descriptive and varies by context (e.g., "housekeeping services in Pune" on `/sectors`, the page's own H1 text on the homepage block, "Looking for [service] specifically in Pune?" on service-detail pages) — no "click here," no single anchor repeated verbatim everywhere.

Footer was deliberately **not** touched — no Pune links added there, per §39's explicit instruction against a keyword-stuffed footer.

## 6. Sitemap / prerender / build integration

All 5 pages flow through the existing pipeline automatically because they're in `STATIC_ROUTES` + `seoRegistry`:
- `generate-sitemap.ts` → included in `sitemap.xml` (18 URLs total, up from 13)
- `generate-robots.ts` → not disallowed (only `/admin` is)
- `generate-redirects.ts` → 5 new explicit Vercel rewrites (`/path` → `/path.html`) auto-added to `vercel.json`
- `prerender.ts` → all 5 get real static HTML with hydrated title/meta/canonical/H1/JSON-LD, same as every other route

## 7. Future expansion rules

If/when additional Pune pages are considered:
1. Write the content in `punePages.ts` first — if you can't fill every section with genuinely distinct, factual content (not just swapped nouns), don't build the page.
2. Run the cannibalization check mentally against every existing page's title/keywords before adding — the `validate-metadata` duplicate-title/description check will catch exact duplicates, but near-duplicates (different words, same intent) require human judgment.
3. Add: `punePages.ts` entry → `STATIC_ROUTES` → `seoRegistry` entry → `<Route>` in `App.tsx` → `PAGE_IMAGES` entry (if a new image is needed) → at least one real incoming link from an existing indexed page (not just the auto-generated `PuneServicesLinksSection`, which will pick it up automatically, but ideally also a contextual link from a relevant service-detail or sector page).
4. Run the full pipeline (`npm run build`) — it will fail loudly on a duplicate title, a broken link, a missing canonical, or a missing route registration before anything ships.
