import type { RobotsDirective } from '@/components/seo/SEO';

export interface RouteSEOEntry {
  path: string;
  /** Passed as-is to <SEO title>; the SEO component appends " | {siteName}" automatically. */
  title: string;
  description: string;
  keywords?: string[];
  robots?: RobotsDirective;
}

const homeEntry: RouteSEOEntry = {
  path: '/',
  title: 'Facility Management Company',
  description:
    'KARGAR is a Pune-based facility management company providing housekeeping, security and maintenance for housing societies, offices, institutes and plants.',
  keywords: ['Facility Management Company', 'Integrated Facility Management', 'Housekeeping and Security Services'],
};

const adminEntry: RouteSEOEntry = {
  path: '/admin',
  title: 'Admin',
  description: 'KARGAR internal admin console.',
  robots: { index: false, follow: false },
};

/**
 * Single source of truth for metadata on every STATIC route.
 * Pune landing pages (features/pune-landing/config) and /resources guides
 * (features/resources/config) carry their own `seo` field and are NOT duplicated here.
 * Dynamic service/category routes are NOT duplicated here either — they already carry their
 * own `seo` field in features/services/config/{categories,hard-services,soft-services}.ts,
 * which stays their source of truth.
 */
export const seoRegistry: Record<string, RouteSEOEntry> = {
  '/': homeEntry,
  '/services': {
    path: '/services',
    title: 'Facility Management Services',
    description:
      'Explore KARGAR facility management services: soft services like housekeeping and security, plus hard services like electrical and HVAC maintenance.',
    keywords: ['Facility Management Services', 'Soft Services', 'Hard Services'],
  },
  '/sectors': {
    path: '/sectors',
    title: 'Sectors We Serve in Pune',
    description:
      'Facility management for Pune housing societies, offices, commercial complexes, institutes, clinics and plants: housekeeping, security and maintenance by sector.',
    keywords: [
      'Facility Management Pune',
      'Facility Management for Housing Societies Pune',
      'Industries We Serve',
      'Sectors We Serve',
    ],
  },
  '/company-profile': {
    path: '/company-profile',
    title: 'Company Profile in Pune',
    description:
      'KARGAR Facility Management company profile: a facility management company in Baner, Pune, running housekeeping, security and maintenance on its PURNA protocol.',
    keywords: [
      'Company Profile',
      'Facility Management Company Pune',
    ],
  },
  '/support': {
    path: '/support',
    title: 'Facility Support Services',
    description:
      'Reach KARGAR support in Pune: phone, email and office hours, how to raise housekeeping, security or maintenance requests, and helpdesk services for your site.',
    keywords: [
      'Facility Support Services',
      'Facility Helpdesk Pune',
    ],
  },
  '/contact-us': {
    path: '/contact-us',
    title: 'Contact Us in Baner, Pune',
    description:
      'Contact KARGAR Facility Management at our Baner, Pune office. Call, email or request a proposal for housekeeping, security or maintenance in Pune and PCMC.',
    keywords: [
      'Contact KARGAR Facility Management',
      'Facility Management Company Pune',
    ],
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Website Privacy Policy',
    description:
      'Privacy Policy for KARGAR Facility Management explaining how user enquiry and contact information submitted through this website is collected and protected.',
    keywords: ['Privacy Policy'],
  },
  '/resources': {
    path: '/resources',
    title: 'Facility Management Resources',
    description:
      'Guides from KARGAR on choosing a housekeeping company, office housekeeping checklists, housekeeping costs and staffing for Pune offices and societies.',
    keywords: ['Facility Management Resources', 'Housekeeping Guides'],
  },
  '/404': {
    path: '/404',
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found. Return to our services page to keep browsing KARGAR facility management solutions.',
    robots: { index: false, follow: false },
  },
  '/admin': adminEntry,
};

/** Resolves the closest registry entry for a pathname, falling back to the homepage entry. */
export function getSeoEntry(pathname: string): RouteSEOEntry {
  if (pathname.startsWith('/admin')) return adminEntry;
  return seoRegistry[pathname] ?? homeEntry;
}
