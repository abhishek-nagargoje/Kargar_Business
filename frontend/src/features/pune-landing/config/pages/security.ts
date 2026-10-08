import type { PuneLandingPageContent } from '../../domain/types';
import { heroImages } from '../heroImages';

const PILLAR = { label: 'Security Services Pune', href: '/security-services-pune' };

export const securityPages: PuneLandingPageContent[] = [
  // ───────────────────────────── PILLAR (existing, extended) ─────────────────────────────
  {
    path: '/security-services-pune',
    cluster: 'security',
    isPillar: true,
    breadcrumbLabel: 'Security Services Pune',
    summary: 'Trained, police-verified security guards, access control and CCTV monitoring for businesses, institutes and plants.',
    seo: {
      title: 'Security Services in Pune',
      description:
        'Security services in Pune — police-verified security guards, access control and CCTV monitoring for offices, campuses and plants, from KARGAR.',
      keywords: ['Security Services in Pune', 'Security Guard Services Pune', 'Corporate Security Pune', 'Facility Security Pune'],
    },
    eyebrow: 'Security in Pune',
    h1: 'Security Services in Pune',
    heroSubtitle:
      'KARGAR Facility Management deploys trained, police-verified security personnel and access-control support for corporate, institutional and industrial facilities across Pune, with CCTV monitoring and documented incident reporting.',
    heroImage: heroImages.security,
    intro: [
      'Facility security in Pune covers more than posting a guard at the gate — it means managed access control, documented visitor logs, and a team trained to respond to incidents rather than just observe them. KARGAR Facility Management provides security guard services, access control and CCTV surveillance monitoring for corporate offices, commercial buildings, institutes and industrial sites across Pune.',
      'Every security officer undergoes police verification and background checks before deployment, and our teams receive year-round skill, safety and behavioural training. Residential societies have different needs — gates, visitors, deliveries and parking — which we cover on a dedicated page for [society security services](/society-security-services-pune).',
    ],
    sections: [
      {
        kind: 'cards',
        heading: 'What Our Pune Security Service Covers',
        columns: 2,
        items: [
          { title: 'Manned guarding', description: 'Trained security officers for static guarding and scheduled patrols.' },
          { title: 'Access control', description: 'Managing entry and exit points to prevent unauthorised access, with visitor logs.' },
          { title: 'CCTV monitoring', description: 'Surveillance monitoring and incident recording by surveillance operators.' },
          { title: 'Emergency response', description: 'Coordination during incidents, with 24x7 support and escalation through KARGAR management.' },
        ],
      },
      {
        kind: 'steps',
        heading: 'How a Security Deployment Is Set Up',
        steps: [
          { title: 'Site assessment', description: 'We review entry points, the layout, operating hours and current arrangements with you.' },
          { title: 'Post plan', description: 'Guard posts, shifts, patrol routes and a security supervisor are defined in writing.' },
          { title: 'Deployment', description: 'Verified, trained guards are deployed with the post instructions for your site.' },
          { title: 'Records and review', description: 'Visitor logs and incident reports give you an auditable record; performance is reviewed with you.' },
        ],
      },
    ],
    faqs: [
      { question: 'Are your security guards police-verified?', answer: 'Yes. Security personnel go through police verification and background checks before deployment.' },
      { question: 'Do you provide 24/7 security coverage in Pune?', answer: 'Yes, we provide round-the-clock security coverage, planned shift by shift for your site.' },
      { question: 'What happens during a security incident?', answer: 'Our protocol is immediate containment, coordination with local authorities where needed, and documented incident reporting.' },
      { question: 'Can security services be combined with housekeeping?', answer: 'Yes. Many clients use our housekeeping and security teams together as part of [integrated facility management](/facility-management-company-pune).' },
      { question: 'How do I request a security assessment for my facility?', answer: 'Share your facility type and current security setup through our contact page, and our team will follow up with a tailored assessment.' },
    ],
    serviceDetailLink: { label: 'security service details', href: '/services/soft-services/security-services' },
    relatedLinks: [
      { label: 'Society Security Services', href: '/society-security-services-pune' },
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Facility Staffing & Manpower', href: '/facility-staffing-services-pune' },
    ],
    ctaHeading: 'Request a Security Assessment for Your Pune Facility',
    ctaText: 'Tell us about your facility and current security setup, and our team will follow up with a tailored assessment.',
    serviceType: 'Security Guard Services',
  },

  // ───────────────────────────── SOCIETY SECURITY ─────────────────────────────
  {
    path: '/society-security-services-pune',
    cluster: 'security',
    parent: PILLAR,
    breadcrumbLabel: 'Society Security',
    summary: 'Gatekeeping, visitor and delivery management, watchmen, valets and CCTV for Pune housing societies.',
    seo: {
      title: 'Society Security Services Pune',
      description:
        'Society security services in Pune — police-verified guards, watchmen and gatekeepers handling visitors, deliveries and CCTV for residential societies.',
      keywords: ['Society Security Services Pune', 'Security Guards for Housing Society Pune', 'Apartment Security Pune'],
    },
    eyebrow: 'Society Security',
    h1: 'Security Services for Housing Societies in Pune',
    heroSubtitle:
      'At a residential society, the gate is where security happens: visitors, domestic staff, deliveries, cabs and residents’ vehicles — all day, every day.',
    heroImage: heroImages.security,
    intro: [
      'Society security is different from guarding an office. The flow at a society gate never really stops, the people coming in are mostly legitimate, and the guard has to be firm with procedure while staying courteous with residents and their visitors. Most complaints committees receive about security are really about process: who was let in, why a delivery was refused, or why nobody noticed a vehicle.',
      'KARGAR provides security for Pune housing societies as part of the same site structure we use for housekeeping and maintenance, with certified, police-verified, trained security personnel.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Security Roles for a Society',
        caption: 'Society security roles and duties',
        columns: ['Role', 'Duties'],
        rows: [
          ['Watchmen and gatekeepers', 'Gate operation, visitor and delivery entry, vehicle movement'],
          ['Security guards', 'Static posts, patrols of towers, podium, parking and perimeter'],
          ['Security supervisor', 'Shift planning, post instructions, first escalation point for the committee'],
          ['Surveillance operator', 'CCTV monitoring and access-control system operation'],
          ['Security reception supervisor', 'Front-desk and visitor management at the main lobby'],
          ['Valets and bouncers', 'Parking assistance and crowd management for events, where needed'],
        ],
      },
      {
        kind: 'checklist',
        heading: 'Gate Procedures We Put in Writing',
        intro: 'Every society’s rules are different. We document them as post instructions so every guard on every shift applies them the same way.',
        groups: [
          { title: 'Visitors', items: ['How visitors are verified with residents', 'Visitor log or app entry', 'Rules for late-night entry'] },
          { title: 'Deliveries and staff', items: ['Delivery handling at the gate or to the door', 'Entry of domestic staff and drivers', 'Contractor and vendor access'] },
          { title: 'Vehicles and emergencies', items: ['Resident and visitor parking rules', 'Emergency contacts and escalation', 'Handover between shifts'] },
        ],
      },
      {
        kind: 'prose',
        heading: 'One Team for the Society',
        paragraphs: [
          'When security and housekeeping report to the same site manager, problems at the gate, in the waste room or in the parking area stop bouncing between vendors. That is the idea behind our [facility management for housing societies](/facility-management-for-societies-pune). Security can also be engaged on its own; for business premises, see our main [security services in Pune](/security-services-pune).',
        ],
      },
    ],
    faqs: [
      { question: 'Are your society security guards police-verified?', answer: 'Yes. KARGAR’s security personnel are certified, police-verified and trained before deployment.' },
      { question: 'Can you work with our visitor-management app?', answer: 'Yes. Guards are trained on the society’s visitor-management procedure, whether app-based or register-based.' },
      { question: 'Can we get valets for society events?', answer: 'Valets and bouncers are part of our security roles and can be arranged as needed.' },
      { question: 'Who does the committee contact about security issues?', answer: 'The security supervisor first, then the site manager and KARGAR management through the agreed escalation path.' },
    ],
    relatedLinks: [
      { label: 'Security Services in Pune', href: '/security-services-pune' },
      { label: 'Society Housekeeping in Pune', href: '/society-housekeeping-services-pune' },
      { label: 'Facility Management for Societies', href: '/facility-management-for-societies-pune' },
    ],
    ctaHeading: 'Request a Society Security Plan',
    ctaText: 'Tell us the number of gates, towers and current guards, and we will propose posts and shifts.',
    serviceType: 'Residential Society Security Services',
  },
];
