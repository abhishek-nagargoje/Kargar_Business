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
    'KARGAR is a trusted integrated facility management company delivering housekeeping, security, and maintenance services for corporate offices across India.',
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
 * Dynamic service/category routes are NOT duplicated here — they already carry their
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
    title: 'Facility Management by Sector',
    description:
      'KARGAR delivers commercial facility management, industrial facility management, and corporate facility management solutions for manufacturing plants.',
    keywords: [
      'Commercial Facility Management',
      'Industrial Facility Management',
      'Corporate Facility Management',
      'Facility Management for Manufacturing Plants',
    ],
  },
  '/company-profile': {
    path: '/company-profile',
    title: 'Trusted Facility Management',
    description:
      'KARGAR Facility Management is a trusted facility management company with 10+ years of experience serving 10,000+ clients across 50+ sites in India.',
    keywords: ['Trusted Facility Management Company', 'Professional Facility Management Company'],
  },
  '/support': {
    path: '/support',
    title: 'Facility Support Services',
    description:
      'Get fast response and expert coordination from KARGAR support team for facility management, housekeeping, security, and maintenance service requests nationwide.',
    keywords: ['Facility Support Services', 'Workplace Management Services'],
  },
  '/contact-us': {
    path: '/contact-us',
    title: 'Get Facility Management Quote',
    description:
      'Contact KARGAR, a facility management company for corporate offices in Pune, Baner. Request a proposal for housekeeping, security, or maintenance services.',
    keywords: ['Facility Management Company for Corporate Offices'],
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Website Privacy Policy',
    description:
      'Privacy Policy for KARGAR Facility Management explaining how user enquiry and contact information submitted through this website is collected and protected.',
    keywords: ['Privacy Policy'],
  },
  '/housekeeping-services-pune': {
    path: '/housekeeping-services-pune',
    title: 'Housekeeping Services in Pune',
    description:
      'Professional housekeeping services in Pune for corporate offices, IT parks, and commercial and industrial facilities, from KARGAR Facility Management.',
    keywords: ['Housekeeping Services in Pune', 'Commercial Housekeeping Pune', 'Corporate Housekeeping Pune', 'Housekeeping Company Pune'],
  },
  '/security-services-pune': {
    path: '/security-services-pune',
    title: 'Security Services in Pune',
    description:
      'Trained security guards, access control, and 24/7 CCTV surveillance monitoring for corporate and industrial facilities in Pune, from KARGAR Facility Management.',
    keywords: ['Security Services in Pune', 'Security Guard Services Pune', 'Corporate Security Pune', 'Facility Security Pune'],
  },
  '/electrical-maintenance-services-pune': {
    path: '/electrical-maintenance-services-pune',
    title: 'Electrical Maintenance Pune',
    description:
      'Preventive and emergency electrical maintenance for LT/HT panels, transformers, and backup generators at corporate and industrial facilities in Pune.',
    keywords: ['Electrical Maintenance Pune', 'Electrical AMC Pune', 'LT HT Panel Maintenance Pune', 'DG Set Maintenance Pune'],
  },
  '/hvac-maintenance-services-pune': {
    path: '/hvac-maintenance-services-pune',
    title: 'HVAC Maintenance Pune',
    description:
      'Preventive HVAC servicing for chillers, AHUs, VRV/VRF systems, and cooling towers at facilities in Pune. Schedule service with KARGAR Facility Management.',
    keywords: ['HVAC Maintenance Pune', 'AC Maintenance Pune', 'Chiller Maintenance Pune', 'Commercial HVAC Pune'],
  },
  '/facility-management-company-pune': {
    path: '/facility-management-company-pune',
    title: 'Facility Management Pune',
    description:
      'KARGAR Facility Management delivers integrated housekeeping, security, electrical, and HVAC maintenance for corporate facilities across Pune, Maharashtra.',
    keywords: ['Facility Management Pune', 'Facility Management Company Pune', 'Integrated Facility Management Pune'],
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
