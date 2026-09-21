import type { PuneLandingPageContent } from '../domain/types';

/**
 * Single source of truth for the Pune local-commercial landing pages.
 * Each entry here must be added to STATIC_ROUTES + seoRegistry (Node-side pipeline) and
 * to App.tsx (React Router) — see docs/SEO-LANDING-PAGE-ARCHITECTURE.md for the full wiring.
 */
export const punePages: Record<string, PuneLandingPageContent> = {
  housekeeping: {
    path: '/housekeeping-services-pune',
    breadcrumbLabel: 'Housekeeping Services Pune',
    seo: {
      title: 'Housekeeping Services in Pune',
      description:
        'Professional housekeeping services in Pune for corporate offices, IT parks, and commercial and industrial facilities, from KARGAR Facility Management.',
      keywords: ['Housekeeping Services in Pune', 'Commercial Housekeeping Pune', 'Corporate Housekeeping Pune', 'Housekeeping Company Pune'],
    },
    eyebrow: 'Housekeeping in Pune',
    h1: 'Housekeeping Services in Pune',
    heroSubtitle:
      'KARGAR Facility Management provides trained, supervised housekeeping teams for corporate offices, IT parks, commercial properties, and industrial sites across Pune and the wider Pune Metropolitan Region, including PCMC.',
    heroImage: { src: '/images/services/housekeeping-services.webp', alt: 'Housekeeping staff cleaning a corporate office in Pune' },
    intro: [
      'If you manage a corporate office, IT park campus, retail space, or industrial facility in Pune, consistent housekeeping standards directly affect how your workplace looks, feels, and functions for employees, clients, and visitors. KARGAR Facility Management is based in Baner, Pune, and deploys trained, police-verified housekeeping staff to facilities across the city and the wider Pune Metropolitan Region, including PCMC.',
      'Our housekeeping teams are supervised, not just deployed — every site follows a daily cleaning checklist and is tracked through a monthly hygiene report, so facility managers get measurable, accountable service rather than an unsupervised contract.',
    ],
    whatsIncluded: {
      heading: 'What Our Pune Housekeeping Service Covers',
      items: [
        { title: 'Daily Janitorial', description: 'Dusting, vacuuming, and trash removal across workstations, common areas, and pantries.' },
        { title: 'Restroom Hygiene', description: 'Strict sanitization protocols to prevent cross-contamination in high-traffic washrooms.' },
        { title: 'Deep Cleaning', description: 'Intensive periodic cleaning for floors, upholstery, and specialized surfaces.' },
        { title: 'Consumables Management', description: 'Refilling soap, paper towels, and sanitizers so facilities never run short.' },
      ],
    },
    whyChoose: {
      heading: 'Why Facility Managers in Pune Choose KARGAR',
      items: [
        { title: 'Police-Verified Staff', description: 'Every housekeeping team member undergoes police verification and background checks before deployment.' },
        { title: 'Eco-Friendly Cleaning', description: 'We use sustainable, non-toxic cleaning agents across every site.' },
        { title: 'Unannounced Inspections', description: 'Supervisors conduct regular unannounced quality checks, not just scheduled visits.' },
        { title: 'ISO-Aligned Processes', description: 'Housekeeping operations follow ISO process guidelines for consistent standards site to site.' },
      ],
    },
    industries: {
      heading: 'Facilities We Support Across Pune',
      items: ['Corporate Offices', 'IT Parks', 'Healthcare Facilities', 'Retail & Malls', 'Hotels & Hospitality', 'Warehouses', 'Manufacturing Plants'],
    },
    faqs: [
      { question: 'Which areas of Pune do you serve for housekeeping?', answer: 'We operate out of Baner, Pune, and serve corporate and industrial facilities across Pune and the wider Pune Metropolitan Region, including PCMC.' },
      { question: 'Are your housekeeping staff background-checked?', answer: 'Yes. All housekeeping personnel undergo police verification and background checks before deployment to any site.' },
      { question: 'Do you handle both corporate offices and industrial sites?', answer: 'Yes. Our housekeeping teams support corporate offices and IT parks as well as industrial environments like manufacturing plants and warehouses, with consistent standards across every environment.' },
      { question: 'How is housekeeping quality tracked?', answer: 'Every site follows a daily cleaning checklist and is reviewed through a monthly hygiene report, so you get measurable, documented service rather than an unsupervised contract.' },
      { question: 'How do I get a housekeeping quote for my Pune facility?', answer: 'Share your facility type, site size, operating hours, and staffing needs through our contact page, and our team will follow up with a tailored proposal.' },
    ],
    serviceDetailLink: { label: 'housekeeping service details', href: '/services/soft-services/housekeeping' },
    relatedLinks: [
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
      { label: 'Security Services in Pune', href: '/security-services-pune' },
      { label: 'Soft Services', href: '/services/soft-services' },
    ],
    ctaHeading: 'Get a Housekeeping Proposal for Your Pune Facility',
    ctaText: 'Share your facility details and our team will follow up with a tailored housekeeping proposal.',
    serviceType: 'Commercial Housekeeping',
  },

  security: {
    path: '/security-services-pune',
    breadcrumbLabel: 'Security Services Pune',
    seo: {
      title: 'Security Services in Pune',
      description:
        'Trained security guards, access control, and 24/7 CCTV surveillance monitoring for corporate and industrial facilities in Pune, from KARGAR Facility Management.',
      keywords: ['Security Services in Pune', 'Security Guard Services Pune', 'Corporate Security Pune', 'Facility Security Pune'],
    },
    eyebrow: 'Security in Pune',
    h1: 'Security Services in Pune',
    heroSubtitle:
      'KARGAR Facility Management deploys trained, vetted security personnel and access-control support for corporate and industrial facilities across Pune, backed by 24/7 CCTV monitoring and documented incident reporting.',
    heroImage: { src: '/images/services/security-services.webp', alt: 'Trained security guard on duty at a Pune corporate facility' },
    intro: [
      'Facility security in Pune covers more than posting a guard at the gate — it means managed access control, documented visitor logs, and a team trained to respond to incidents rather than just observe them. KARGAR Facility Management provides manned guarding, access control, and CCTV surveillance monitoring for corporate offices and industrial sites across Pune.',
      'Every security officer undergoes strict background checks before deployment, and our teams are trained in conflict resolution and emergency response, not just static guarding.',
    ],
    whatsIncluded: {
      heading: 'What Our Pune Security Service Covers',
      items: [
        { title: 'Manned Guarding', description: 'Trained security officers for static guarding and scheduled patrols.' },
        { title: 'Access Control', description: 'Managing entry and exit points to prevent unauthorized access.' },
        { title: 'CCTV Monitoring', description: '24/7 surveillance monitoring and incident recording.' },
        { title: 'Emergency Response', description: 'Rapid deployment and coordination during critical incidents.' },
      ],
    },
    whyChoose: {
      heading: 'Why Facility Managers in Pune Choose KARGAR',
      items: [
        { title: 'Vetted Professionals', description: 'Strict background checks before any officer is deployed to your site.' },
        { title: 'Advanced Training', description: 'Trained in conflict resolution and emergency response, not just static guarding.' },
        { title: 'Documented Reporting', description: 'Visitor logs and incident reports give you an auditable record, not just a verbal handover.' },
        { title: 'Rapid Deployment', description: 'Security presence can be scaled up quickly based on your facility\'s threat level or event needs.' },
      ],
    },
    faqs: [
      { question: 'Are your security guards armed or unarmed?', answer: 'We primarily provide unarmed personnel; armed guards can be arranged depending on regulatory requirements.' },
      { question: 'Do you provide 24/7 security coverage in Pune?', answer: 'Yes, we provide round-the-clock security coverage for corporate and industrial facilities in Pune.' },
      { question: 'What happens during a security incident?', answer: 'Our protocol is immediate containment, coordination with local authorities where needed, and rapid, documented incident reporting.' },
      { question: 'Can security services be combined with housekeeping?', answer: 'Yes. Many of our Pune clients use both our housekeeping and security teams together as part of an integrated facility management arrangement.' },
      { question: 'How do I request a security assessment for my facility?', answer: 'Share your facility type and current security setup through our contact page, and our team will follow up with a tailored assessment.' },
    ],
    serviceDetailLink: { label: 'security service details', href: '/services/soft-services/security-services' },
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
      { label: 'Soft Services', href: '/services/soft-services' },
    ],
    ctaHeading: 'Request a Security Assessment for Your Pune Facility',
    ctaText: 'Tell us about your facility and current security setup, and our team will follow up with a tailored assessment.',
    serviceType: 'Corporate Security Services',
  },

  electrical: {
    path: '/electrical-maintenance-services-pune',
    breadcrumbLabel: 'Electrical Maintenance Pune',
    seo: {
      title: 'Electrical Maintenance Pune',
      description:
        'Preventive and emergency electrical maintenance for LT/HT panels, transformers, and backup generators at corporate and industrial facilities in Pune.',
      keywords: ['Electrical Maintenance Pune', 'Electrical AMC Pune', 'LT HT Panel Maintenance Pune', 'DG Set Maintenance Pune'],
    },
    eyebrow: 'Electrical Maintenance in Pune',
    h1: 'Electrical Maintenance Services in Pune',
    heroSubtitle:
      'KARGAR Facility Management provides certified electrical maintenance — from routine LT/HT panel inspections to 24/7 emergency repairs — for corporate offices, IT parks, and industrial facilities in Pune.',
    heroImage: { src: '/images/services/hard-services.webp', alt: 'Electrical maintenance technician servicing an LT panel in Pune' },
    intro: [
      'Unplanned electrical downtime is expensive and, in facilities like data-dependent IT parks or manufacturing plants, can halt operations entirely. KARGAR Facility Management provides certified electrical maintenance for corporate offices, IT parks, and industrial sites across Pune — covering LT/HT panels, transformers, backup generators, and general power distribution.',
      'Our approach is preventive first: scheduled inspections are designed to catch failures before they happen, backed by a 24/7 emergency response team for the incidents that can\'t be prevented.',
    ],
    whatsIncluded: {
      heading: 'What Our Electrical Maintenance Service Covers',
      items: [
        { title: 'Preventive Maintenance', description: 'Regular inspections to identify potential issues before they cause downtime.' },
        { title: 'Emergency Repairs', description: '24/7 rapid response for critical electrical failures.' },
        { title: 'System Upgrades', description: 'Modernization of outdated electrical panels and distribution systems.' },
        { title: 'Energy Optimization', description: 'Practical solutions to reduce overall power consumption.' },
      ],
    },
    whyChoose: {
      heading: 'Why Facility Managers in Pune Choose KARGAR',
      items: [
        { title: 'Certified Technicians', description: 'Fully licensed and trained to current electrical safety standards.' },
        { title: 'Rapid Response', description: '24/7 emergency support for critical electrical failures.' },
        { title: 'Full Equipment Coverage', description: 'LT panels, HT panels, transformers, DG synchronization, cabling, and earthing.' },
      ],
    },
    industries: {
      heading: 'Facilities We Serve',
      items: ['Corporate Offices', 'IT Parks', 'Manufacturing Plants', 'Warehouses', 'Retail & Malls'],
    },
    faqs: [
      { question: 'How often should electrical systems be inspected?', answer: 'We recommend comprehensive inspections at least annually, with more frequent checks for critical systems like backup generators and HT panels.' },
      { question: 'Do you provide emergency electrical support in Pune?', answer: 'Yes, our team is available 24/7 for emergency electrical troubleshooting and repairs across Pune.' },
      { question: 'Do you maintain backup generators?', answer: 'Yes, generator maintenance and DG synchronization are a core part of our electrical maintenance service.' },
      { question: 'Can you handle HT panel and transformer maintenance for industrial sites?', answer: 'Yes, our technicians service LT and HT panels, transformers, and associated cabling and earthing for industrial and commercial facilities.' },
    ],
    serviceDetailLink: { label: 'electrical maintenance service details', href: '/services/hard-services/electrical-maintenance' },
    relatedLinks: [
      { label: 'HVAC Maintenance in Pune', href: '/hvac-maintenance-services-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
      { label: 'Hard Services', href: '/services/hard-services' },
    ],
    ctaHeading: 'Request an Electrical Maintenance Assessment',
    ctaText: 'Tell us about your facility\'s electrical infrastructure and our team will follow up with a tailored maintenance plan.',
    serviceType: 'Electrical Maintenance',
  },

  hvac: {
    path: '/hvac-maintenance-services-pune',
    breadcrumbLabel: 'HVAC Maintenance Pune',
    seo: {
      title: 'HVAC Maintenance Pune',
      description:
        'Preventive HVAC servicing for chillers, AHUs, VRV/VRF systems, and cooling towers at facilities in Pune. Schedule service with KARGAR Facility Management.',
      keywords: ['HVAC Maintenance Pune', 'AC Maintenance Pune', 'Chiller Maintenance Pune', 'Commercial HVAC Pune'],
    },
    eyebrow: 'HVAC Maintenance in Pune',
    h1: 'HVAC Maintenance Services in Pune',
    heroSubtitle:
      'KARGAR Facility Management provides preventive and breakdown HVAC servicing for chillers, AHUs, VRV/VRF systems, and cooling towers at commercial and industrial facilities across Pune.',
    heroImage: { src: '/images/services/hard-services.webp', alt: 'HVAC technician servicing a commercial cooling system in Pune' },
    intro: [
      'Indoor air quality and temperature control directly affect occupant comfort and, in facilities running IT hardware or sensitive equipment, operational reliability. KARGAR Facility Management provides HVAC maintenance for commercial and industrial facilities across Pune — covering everything from split ACs to large commercial chillers.',
      'Our technicians handle routine servicing as well as the less routine work: system balancing, duct cleaning, and indoor air quality testing, so your HVAC systems stay efficient year-round rather than just functional.',
    ],
    whatsIncluded: {
      heading: 'What Our HVAC Maintenance Service Covers',
      items: [
        { title: 'Scheduled Servicing', description: 'Routine cleaning, lubrication, and calibration of HVAC equipment.' },
        { title: 'Air Quality Testing', description: 'Monitoring and improving indoor air quality.' },
        { title: 'System Balancing', description: 'Ensuring even temperature distribution across the facility.' },
        { title: 'Duct Cleaning', description: 'Thorough duct cleaning to improve airflow and efficiency.' },
      ],
    },
    whyChoose: {
      heading: 'Why Facility Managers in Pune Choose KARGAR',
      items: [
        { title: 'Energy Efficiency', description: 'We tune systems to operate at peak efficiency, reducing energy costs.' },
        { title: 'Full Equipment Coverage', description: 'VRV/VRF systems, chillers, cooling towers, AHU & FCU, cassette and split ACs.' },
        { title: 'Health & Safety Focus', description: 'Indoor air quality testing prioritizes occupant well-being, not just cooling performance.' },
      ],
    },
    industries: {
      heading: 'Facilities We Serve',
      items: ['Corporate Offices', 'IT Parks', 'Healthcare Facilities', 'Retail & Malls', 'Manufacturing Plants'],
    },
    faqs: [
      { question: 'What does routine HVAC maintenance include?', answer: 'Changing filters, cleaning coils, checking refrigerant levels, and testing controls.' },
      { question: 'Do you service commercial chiller systems in Pune?', answer: 'Yes, our technicians are experienced in servicing large-scale commercial chillers as well as smaller split and cassette AC systems.' },
      { question: 'How can HVAC maintenance improve indoor air quality?', answer: 'Regular duct cleaning, upgrading to high-efficiency filters, and proper ventilation checks all contribute to better indoor air quality.' },
      { question: 'Do you handle VRV/VRF systems?', answer: 'Yes, VRV/VRF systems are part of our standard equipment coverage alongside chillers, cooling towers, and AHU/FCU units.' },
    ],
    serviceDetailLink: { label: 'HVAC maintenance service details', href: '/services/hard-services/hvac-maintenance' },
    relatedLinks: [
      { label: 'Electrical Maintenance in Pune', href: '/electrical-maintenance-services-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
      { label: 'Hard Services', href: '/services/hard-services' },
    ],
    ctaHeading: 'Schedule an HVAC Service Assessment',
    ctaText: 'Tell us about your facility\'s HVAC systems and our team will follow up with a tailored service plan.',
    serviceType: 'HVAC Maintenance',
  },

  company: {
    path: '/facility-management-company-pune',
    breadcrumbLabel: 'Facility Management Company Pune',
    seo: {
      title: 'Facility Management Pune',
      description:
        'KARGAR Facility Management delivers integrated housekeeping, security, electrical, and HVAC maintenance for corporate facilities across Pune, Maharashtra.',
      keywords: ['Facility Management Pune', 'Facility Management Company Pune', 'Integrated Facility Management Pune'],
    },
    eyebrow: 'Facility Management in Pune',
    h1: 'Facility Management Company in Pune',
    heroSubtitle:
      'KARGAR Facility Management is based in Baner, Pune, delivering integrated housekeeping, security, electrical, and HVAC maintenance for corporate offices and commercial facilities — with 10+ years of experience serving 10,000+ clients across 50+ sites in India.',
    heroImage: { src: '/images/page/hero-building.webp', alt: 'KARGAR Facility Management office building in Baner, Pune' },
    intro: [
      'Choosing a facility management company in Pune means choosing a single point of accountability for the services that keep a workplace running: cleaning, security, and technical maintenance. KARGAR Facility Management is based in Baner, Pune, and delivers all of these as one integrated service — housekeeping, security, electrical maintenance, and HVAC maintenance — rather than requiring facility managers to coordinate separate vendors for each.',
      'Every service line is built around the same operating principles: trained, verified staff; documented, supervised delivery; and a single point of contact for your facility, backed by 10+ years of experience serving 10,000+ clients across 50+ sites in India.',
    ],
    whatsIncluded: {
      heading: 'Our Integrated Facility Management Services',
      items: [
        { title: 'Housekeeping', description: 'Daily janitorial, deep cleaning, and restroom hygiene for corporate and commercial facilities.' },
        { title: 'Security Services', description: 'Manned guarding, access control, and 24/7 CCTV surveillance monitoring.' },
        { title: 'Electrical Maintenance', description: 'Preventive and emergency maintenance for LT/HT panels, transformers, and backup generators.' },
        { title: 'HVAC Maintenance', description: 'Preventive servicing for chillers, AHUs, VRV/VRF systems, and cooling towers.' },
      ],
    },
    whyChoose: {
      heading: 'Why Businesses in Pune Choose KARGAR',
      items: [
        { title: 'One Integrated Provider', description: 'Housekeeping, security, and technical maintenance under a single point of accountability.' },
        { title: 'Verified, Trained Staff', description: 'Police-verified housekeeping and security personnel, certified electrical and HVAC technicians.' },
        { title: 'Documented Service Delivery', description: 'Daily checklists, monthly reports, and incident logs give facility managers an auditable record.' },
        { title: 'Established Track Record', description: '10+ years of experience serving 10,000+ clients across 50+ sites in India.' },
      ],
    },
    industries: {
      heading: 'Industries We Serve',
      items: ['Corporate Offices', 'IT Parks', 'Healthcare Facilities', 'Manufacturing Plants', 'Retail & Malls', 'Warehouses', 'Hotels & Hospitality'],
    },
    faqs: [
      { question: 'What facility management services does KARGAR provide in Pune?', answer: 'We provide integrated housekeeping, security, electrical maintenance, and HVAC maintenance for corporate offices and commercial facilities across Pune.' },
      { question: 'Where is KARGAR Facility Management based?', answer: 'We are based in Baner, Pune, and serve facilities across Pune and the wider Pune Metropolitan Region, including PCMC.' },
      { question: 'Can I use KARGAR for just one service, like housekeeping or security?', answer: 'Yes. While many clients use our integrated facility management model, each service — housekeeping, security, electrical, and HVAC maintenance — can also be engaged independently.' },
      { question: 'How do I request a facility management proposal?', answer: 'Share your facility type, size, and service requirements through our contact page, and our team will follow up with a tailored proposal.' },
    ],
    serviceDetailLink: { label: 'our full range of services', href: '/services' },
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Security Services in Pune', href: '/security-services-pune' },
      { label: 'Electrical Maintenance in Pune', href: '/electrical-maintenance-services-pune' },
      { label: 'HVAC Maintenance in Pune', href: '/hvac-maintenance-services-pune' },
      { label: 'Company Profile', href: '/company-profile' },
    ],
    ctaHeading: 'Get a Facility Management Proposal',
    ctaText: 'Tell us about your facility and service requirements, and our team will follow up with a tailored proposal.',
    serviceType: 'Integrated Facility Management',
  },
};

export const punePageList: PuneLandingPageContent[] = Object.values(punePages);
