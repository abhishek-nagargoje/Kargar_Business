# SEO Technical Architecture

## 1. URL policy (one rule, everywhere)

| Rule | Value | Enforced by |
|---|---|---|
| Protocol / host | `https://www.kargarbusinessservices.com` | Vercel domain settings (http→https, apex→www, 308) |
| Trailing slash | **None** (except `/`) | `vercel.json` `trailingSlash:false` (308); `buildCanonicalUrl`; `validate-canonicals.ts`; `validate-sitemap.ts` |
| Case | Lowercase only; other case → 404 (no duplicate) | Route definitions; `validate-sitemap.ts` |
| Query strings | Never canonical, never in sitemap, never in crawlable `href`s | `CONTACT_LINK_HREF`; canonical built from pathname only; `seo-audit.ts` flags parameter links |
| Commercial pages | Root level: `/<service>-pune` | Content configs |
| Informational | `/resources/<slug>` (the only content hub — no /blog or /insights) | `features/resources` |

Why no trailing slash: all 18 already-indexed URLs, every canonical and the Vercel config use the no-slash form. Switching would 308 every indexed URL for no ranking benefit.

## 2. Single source of truth

```
features/pune-landing/config/pages/*.ts  ─┐
features/resources/config/guides.ts       ├─► App.tsx routes (map)
features/seo/registry.ts (static pages)   │   scripts/seo/route-inventory.ts ─► sitemap.xml
features/services/config/* (service pages)┘                                    ─► vercel.json rewrites
                                                                               ─► prerender list
                                                                               ─► validators
                                           ─► hub sections, footer directory, cluster nav, breadcrumbs
```

Adding a Pune page = adding one object to a `config/pages/*.ts` file. Routing, prerendering, rewrite, sitemap entry, footer link, hub link, sibling links and breadcrumb are derived automatically.

## 3. Rendering & HTTP

1. `vite build` → SPA bundle.
2. `prerender.ts` boots `vite preview`, loads every inventory route in headless Chromium, waits for `<h1>` + JSON-LD, saves the DOM to `dist/<route>.html`. Googlebot receives full HTML (title, meta, canonical, H1, body, links, JSON-LD) in the first response; users receive the same file and the app hydrates. **Same content for bots and users — no cloaking.**
3. `vercel.json` rewrites each route to its file. The only SPA fallback is `/admin(/*)`. Anything else that is not a file → `404.html` with **HTTP 404** (the previous `/services/:categoryId` catch-alls that produced soft 404s were removed).
4. Headers: `X-Robots-Tag: noindex, nofollow` on `/admin` and `/admin/*`; `X-Robots-Tag: noindex` on `/sitemap.xml` (Google still processes it as a sitemap; it just stops being reported as a page).

## 4. Metadata system (`src/components/seo/SEO.tsx`)

Every page renders exactly one: `<title>` ("{title} | KARGAR Facility Management"), meta description, meta robots, canonical, hreflang en-IN + x-default (self), `og:type/site_name/locale/url/title/description/image`, `twitter:card/url/title/description/image` (now `name=` attributes), and one JSON-LD `@graph`.

| Page type | JSON-LD in the @graph |
|---|---|
| All | Organization (legalName from brochure, logo, sameAs, award, contactPoint), LocalBusiness (address, phone, email, published hours, areaServed Pune + Pimpri-Chinchwad), WebSite (no fake SearchAction), BreadcrumbList |
| Pune landing | + Service (serviceType, provider, areaServed Pune) + FAQPage (answers present in HTML via `<details>`) |
| Guides | + Article (organization author/publisher, real datePublished/dateModified) + FAQPage when FAQs exist |
| Service detail / category | + Service (+ FAQPage) — unchanged |

FAQPage note: Google currently shows FAQ rich results only for well-known government and health sites, so this markup is not expected to produce rich results; it remains valid, matches visible content, and is consumed by other search engines.

## 5. Contact CTAs and tracking

- Crawlable link: `href="/contact-us#contact-form"` (constant `CONTACT_LINK_HREF`).
- On a normal click, `navigateToContact(options, e)` prevents default and navigates to `buildContactUrl(options)` = `/contact-us?source=…&service=…&cta_position=…#contact-form`. The contact form reads these params (prefill + lead attribution) exactly as before, and GA page views still carry them.
- Middle-click / open-in-new-tab follows the clean href (loses attribution only in that case).
- Existing parameter URLs remain `200` with `canonical=/contact-us` — correct; they will age out of the "Alternate page with proper canonical tag" report as Google stops discovering new ones.

## 6. Internal linking model

| Mechanism | Scope |
|---|---|
| Footer "Site directory" (every page) | Every Pune page (grouped by cluster), every guide, company pages |
| Hub section (Home, /services, /resources) | Cluster pillars with summaries + all supporting pages |
| Breadcrumbs (visible + BreadcrumbList) | Home › Services › Pillar › Page; Home › Resources › Guide |
| "More in this topic" nav (every Pune page) | All sibling pages in the cluster |
| Contextual `[anchor](/path)` links in content | Descriptive anchors, validated at build by `check-links.ts` |
| Service detail ↔ Pune page | Existing two-way links (`serviceDetailLink`) |

## 7. Quality gates

| Stage | Check | Fails build? |
|---|---|---|
| prebuild (`npm run seo`) | canonicals, metadata length/uniqueness/keyword, headings, alt text, schema data, link targets (JSX + content configs), route coverage | Yes |
| build | `tsc -b`, prerender of every route | Yes |
| postbuild | no wildcard rewrite; **`validate-sitemap.ts`**: every sitemap URL 200, no redirect, self-canonical, not noindex, one title, one H1, https/www/no slash/no query/lowercase/no duplicates; robots.txt references sitemap | Yes |
| CI | `seo-audit.ts --strict`: crawl via emulated Vercel routing; fails on missing title/description/canonical/H1, non-200 sitemap URLs, broken internal links, canonical → non-200 | Yes |
| Manual / periodic | `npm run seo:audit -- --url https://www.kargarbusinessservices.com` against production | — |

`scripts/seo/serve-dist.ts` emulates Vercel's routing order (slash strip → redirects → filesystem → rewrites → 404) so these checks see real status codes locally. It is a test harness only.

## 8. Known platform limitations

- **Redirect chains on legacy hosts/paths** (e.g. `http://kargarbusinessservices.com/about-us/` = 4 hops). Vercel performs http→https, apex→www and the trailing-slash strip before project redirects, so these hops cannot be collapsed in `vercel.json`. Google follows them; final targets are correct. Mitigation: never link to non-canonical forms; ask external sites to link to the canonical `https://www.` form.
- **`/services.html` etc.** are reachable (Vercel serves files). They carry the clean canonical and are never linked. `cleanUrls` was not enabled because it would change how every rewrite and the Google verification file are served — not worth the risk for an unlinked duplicate.
