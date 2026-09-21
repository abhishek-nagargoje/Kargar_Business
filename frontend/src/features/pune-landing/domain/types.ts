export interface PuneFAQ {
  question: string;
  answer: string;
}

export interface PuneChecklistItem {
  title: string;
  description: string;
}

export interface PuneRelatedLink {
  label: string;
  href: string;
}

/**
 * Typed content model for a Pune local-commercial-intent landing page.
 * Distinct from `Service`/`Category` (features/services/domain/service.types.ts) —
 * these pages target LOCAL/COMMERCIAL search intent ("housekeeping services Pune"),
 * not SERVICE DETAIL intent ("what does KARGAR housekeeping include"), so they are
 * intentionally not modeled as another `Service` entity in the services registry.
 */
export interface PuneLandingPageContent {
  /** URL path, e.g. '/housekeeping-services-pune' — no trailing slash, matches site convention. */
  path: string;
  breadcrumbLabel: string;
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
  intro: string[];
  whatsIncluded: { heading: string; items: PuneChecklistItem[] };
  whyChoose: { heading: string; items: PuneChecklistItem[] };
  industries?: { heading: string; items: string[] };
  faqs: PuneFAQ[];
  /** Link to the existing detailed service page this local page supports (service-detail intent). */
  serviceDetailLink: PuneRelatedLink;
  /** Links to sibling Pune landing pages / sector context, for the internal-link cluster. */
  relatedLinks: PuneRelatedLink[];
  ctaHeading: string;
  ctaText: string;
  /** Schema.org Service serviceType value. */
  serviceType: string;
}
