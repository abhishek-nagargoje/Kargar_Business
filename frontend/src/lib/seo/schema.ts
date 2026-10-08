import { config } from '@/config';
import { contactDetails } from '@/config/contact';
import { buildCanonicalUrl } from './canonical';
import type { BreadcrumbItem } from '@/features/services/components/Breadcrumb';
import type { Category, Service, ServiceFAQ } from '@/features/services/domain/service.types';

const ORGANIZATION_ID = `${config.siteUrl}/#organization`;
const LOCAL_BUSINESS_ID = `${config.siteUrl}/#localbusiness`;
const WEBSITE_ID = `${config.siteUrl}/#website`;
const LOGO_URL = `${config.siteUrl}/images/brand/kargar-logo.png`;

export function buildOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: config.siteName,
    // Registered name as printed on the Company Brochure (public/assets/documents).
    legalName: 'Kargar Business Services Pvt. Ltd.',
    url: config.siteUrl,
    logo: LOGO_URL,
    email: contactDetails.email,
    // Documented in KARGAR's Company Profile (p.17). Plain text only — schema.org has no
    // verifiable award type, and no other recognition is asserted here.
    award: 'Punyashlok Ahilya Devi Holkar Woman Startup Award (2024)',
    sameAs: [
      'https://in.linkedin.com/company/kargar',
      'https://www.facebook.com/people/Kargar-Facility-and-Security-Services-PVT-LTD/100076064059281/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactDetails.phone.e164,
      contactType: 'customer service',
    },
  };
}

export function buildLocalBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': LOCAL_BUSINESS_ID,
    name: config.siteName,
    url: config.siteUrl,
    image: LOGO_URL,
    telephone: contactDetails.phone.e164,
    email: contactDetails.email,
    parentOrganization: { '@id': ORGANIZATION_ID },
    // Hours as published on the contact page (contactDetails.hours) — keep the two in sync.
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    // Service area as stated on-site (Pune and PCMC). No other branches or locations are claimed.
    areaServed: [
      { '@type': 'City', name: 'Pune' },
      { '@type': 'City', name: 'Pimpri-Chinchwad' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '301, 3rd Floor, Unity Commercial, Baner',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411045',
      addressCountry: 'IN',
    },
  };
}

export function buildWebsiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: config.siteUrl,
    name: config.siteName,
    // No SearchAction: the site has no search feature, so declaring one would describe
    // functionality that does not exist (and invite crawling of /services?q= URLs).
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-IN',
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && item.href !== '#' ? { item: buildCanonicalUrl(item.href) } : {}),
    })),
  };
}

export function buildServiceSchema(service: Service, category: Category) {
  return {
    '@type': 'Service',
    '@id': `${buildCanonicalUrl(`/services/${category.slug}/${service.slug}`)}#service`,
    name: service.title,
    description: service.seo.description,
    serviceType: service.title,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: {
      '@type': 'City',
      name: 'Pune',
    },
    category: category.title,
  };
}

export function buildCategoryServiceSchema(category: Category) {
  return {
    '@type': 'Service',
    '@id': `${buildCanonicalUrl(`/services/${category.slug}`)}#service`,
    name: category.title,
    description: category.seo.description,
    serviceType: category.title,
    provider: { '@id': ORGANIZATION_ID },
  };
}

export function buildFAQSchema(faqs: ServiceFAQ[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
