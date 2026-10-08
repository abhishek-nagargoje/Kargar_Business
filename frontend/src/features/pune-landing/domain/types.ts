export interface PuneFAQ {
  question: string;
  /** Plain text, or InlineText with `[anchor](/path)` links (stripped to plain text for JSON-LD). */
  answer: InlineText;
}

export interface PuneChecklistItem {
  title: string;
  description: InlineText;
}

export interface PuneRelatedLink {
  label: string;
  href: string;
}

/**
 * Text that may contain internal links written as `[anchor text](/path)`.
 * Rendered as real <Link> elements by `renderInline`, validated by scripts/seo/check-links.ts.
 */
export type InlineText = string;

/** Topical clusters — drive hub grouping, footer links and breadcrumb parents. */
export type ClusterId = 'housekeeping' | 'facility-management' | 'maintenance' | 'security';

/**
 * Body blocks rendered in array order, so each page can have its own structure instead of
 * every page sharing one fixed template.
 */
export type ContentSection =
  | { kind: 'prose'; heading: string; paragraphs: InlineText[] }
  | { kind: 'cards'; heading: string; intro?: InlineText; items: PuneChecklistItem[]; columns?: 2 | 3 | 4 }
  | { kind: 'steps'; heading: string; intro?: InlineText; steps: PuneChecklistItem[] }
  | { kind: 'table'; heading: string; intro?: InlineText; caption: string; columns: string[]; rows: string[][]; note?: InlineText }
  | { kind: 'checklist'; heading: string; intro?: InlineText; groups: { title: string; items: InlineText[] }[] }
  | { kind: 'compare'; heading: string; intro?: InlineText; left: { title: string; items: InlineText[] }; right: { title: string; items: InlineText[] } }
  | { kind: 'callout'; heading: string; text: InlineText };

/**
 * Typed content model for a Pune local-commercial landing page.
 * Distinct from `Service`/`Category` (features/services/domain/service.types.ts) —
 * these pages target LOCAL/COMMERCIAL search intent ("housekeeping services Pune"),
 * not SERVICE DETAIL intent ("what does KARGAR housekeeping include"), so they are
 * intentionally not modeled as another `Service` entity in the services registry.
 */
export interface PuneLandingPageContent {
  /** URL path, e.g. '/housekeeping-services-pune' — no trailing slash, matches site convention. */
  path: string;
  cluster: ClusterId;
  /** True for the one page per cluster that the rest of the cluster links up to. */
  isPillar?: boolean;
  /** Breadcrumb parent (the cluster pillar). Pillars sit directly under /services. */
  parent?: PuneRelatedLink;
  breadcrumbLabel: string;
  /** One-sentence description used on hub cards and in the footer directory. */
  summary: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
  heroImage: { src: string; alt: string };
  /** Intro paragraphs — real operational description, no fabricated claims. */
  intro: InlineText[];
  sections?: ContentSection[];
  whatsIncluded?: { heading: string; items: PuneChecklistItem[] };
  whyChoose?: { heading: string; items: PuneChecklistItem[] };
  industries?: { heading: string; items: string[] };
  faqs: PuneFAQ[];
  /** Link to the existing detailed service page this local page supports (service-detail intent). */
  serviceDetailLink?: PuneRelatedLink;
  /** Links to sibling Pune landing pages / sector context, for the internal-link cluster. */
  relatedLinks: PuneRelatedLink[];
  ctaHeading: string;
  ctaText: string;
  ctaLabel?: string;
  /** Schema.org Service serviceType value. */
  serviceType: string;
}

/** Informational guide under /resources — rendered with Article schema. */
export interface GuidePageContent {
  path: string;
  breadcrumbLabel: string;
  summary: string;
  seo: { title: string; description: string; keywords: string[] };
  h1: string;
  standfirst: string;
  /** ISO dates — set to the real publish/update date, never backdated. */
  datePublished: string;
  dateModified: string;
  intro: InlineText[];
  sections: ContentSection[];
  faqs?: PuneFAQ[];
  relatedLinks: PuneRelatedLink[];
}
