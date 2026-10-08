import type { PuneLandingPageContent } from '../../domain/types';
import { heroImages } from '../heroImages';

const PILLAR = { label: 'Facility Management Pune', href: '/facility-management-company-pune' };

/** Facility management cluster — see seo-audit/SEO_CONTENT_PLAN.md for intent boundaries. */
export const facilityManagementPages: PuneLandingPageContent[] = [
  // ───────────────────────────── PILLAR ─────────────────────────────
  {
    path: '/facility-management-company-pune',
    cluster: 'facility-management',
    isPillar: true,
    breadcrumbLabel: 'Facility Management Pune',
    summary: 'Integrated soft, hard and support services for societies, offices, institutes and plants, run on KARGAR’s PURNA protocol.',
    seo: {
      title: 'Facility Management in Pune',
      description:
        'KARGAR is a facility management company in Pune providing integrated housekeeping, security, maintenance and support services for societies and businesses.',
      keywords: ['Facility Management Company Pune', 'Facility Management Services Pune', 'Integrated Facility Management Pune'],
    },
    eyebrow: 'Facility Management in Pune',
    h1: 'Facility Management Company in Pune',
    heroSubtitle:
      'One accountable partner for the people and systems that keep a property running — housekeeping, security, technical maintenance and support services — organised under a single site structure.',
    heroImage: heroImages.building,
    intro: [
      'KARGAR Facility Management (Kargar Business Services Pvt. Ltd.) is an integrated facility management company based in Baner, Pune. We serve residential societies, commercial complexes, corporate offices, educational institutes, healthcare facilities and manufacturing sites — and we were recognised by the Hon’ble Prime Minister of India in 2024 with the Punyashlok Ahilya Devi Holkar Woman Startup Award as a women-led company in a traditionally male-dominated industry.',
      'The reason clients move to integrated facility management is simple: dealing with multiple vendors, unstable teams and unmanaged expenses costs time, money and effort. We replace that with one organisation for the site — the right mix of skilled, semi-skilled and white-collar roles under a facility or site manager — and one point of accountability.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Facility Management Services We Provide',
        caption: 'KARGAR facility management services by category',
        columns: ['Category', 'Services'],
        rows: [
          ['Soft services', 'Housekeeping (daily, weekly, monthly and deep cleaning), pantry services, waste management with wet/dry segregation, washroom hygiene, landscaping and horticulture, security guards'],
          ['Hard services', 'Electrical systems (LT panels, DBs, cabling, UPS rooms), HVAC (AHU, FCU, VRV/VRF), DG operation and maintenance, UPS and battery maintenance, fire alarm and fire-fighting systems, plumbing and water systems, STP/WTP operations, BMS monitoring, PPM as per OEM schedules, breakdown maintenance coordination'],
          ['Support services', 'Mailroom operations, helpdesk and ticket management, statutory documentation, daily/weekly/monthly reporting, tools, tackles and consumables management'],
          ['Engagement models', 'Full integrated FM, single-service contracts, AMC, on-call or incidental support'],
        ],
        note: 'Explore each area: [housekeeping](/housekeeping-services-pune), [security](/security-services-pune), [facility maintenance](/facility-maintenance-services-pune) and [facility staffing](/facility-staffing-services-pune).',
      },
      {
        kind: 'steps',
        heading: 'The PURNA Protocol: How Every Site Is Run',
        intro: 'PURNA is the essence of KARGAR’s integrated facility operations — a five-stage method applied to every site we take on.',
        steps: [
          { title: 'Prepare', description: 'Scope, checklists and SOPs for the site, covering manpower, machines and management (including concierge) requirements under one cohesive org structure.' },
          { title: 'Unite', description: 'All essential teams are brought together into a one-stop shop so related functions work with clockwork precision.' },
          { title: 'Reset', description: 'Processes and teams — including your associated vendors — are aligned for a stable, long-term association.' },
          { title: 'Nurture', description: 'Employees are trained and retained to bring stability to their lives and to your site.' },
          { title: 'Analyse', description: 'Performance is reviewed through feedback systems and KARGAR’s regional management, reported to you, and improved.' },
        ],
      },
      {
        kind: 'cards',
        heading: 'Facility Management by Property Type',
        columns: 2,
        items: [
          { title: 'Housing societies', description: 'A complete site organisation plus co-operative society administration. See [facility management for housing societies](/facility-management-for-societies-pune).' },
          { title: 'Offices', description: 'Housekeeping, front desk, mailroom, helpdesk and upkeep for a single occupier. See [office facility management](/office-facility-management-pune).' },
          { title: 'Commercial buildings', description: 'Common areas, building services and vendor consolidation for owners and associations. See [commercial facility management](/commercial-facility-management-pune).' },
          { title: 'Institutes, healthcare and plants', description: 'Sector-specific housekeeping and maintenance — for example [school housekeeping](/school-housekeeping-services-pune) and [industrial housekeeping](/industrial-housekeeping-services-pune).' },
        ],
      },
      {
        kind: 'cards',
        heading: 'How KARGAR Is Different',
        columns: 3,
        items: [
          { title: '100% financial transparency', description: 'You have the right to ask for the compensation paid to the staff deployed at your site.' },
          { title: 'Holistic employee development', description: 'Skill, safety and behavioural training round the year, delivered by Field Trainers and Quality Managers.' },
          { title: 'Dignity of work', description: 'Regular employee engagement, reward and recognition, and respect for every person deployed — which is how the company reports 98% client retention and 95% employee retention.' },
        ],
      },
      {
        kind: 'checklist',
        heading: 'How to Evaluate a Facility Management Company in Pune',
        groups: [
          { title: 'Structure', items: ['Is there a named site or facility manager?', 'Is the org structure sized to your property?', 'Who escalates above the site team?'] },
          { title: 'Proof', items: ['Can they show checklists and reports from live sites?', 'Can they speak to client retention and staff turnover?', 'Are PF and ESIC deposits provable?'] },
          { title: 'Fit', items: ['Do they serve your property type already?', 'Can services start small and expand?', 'Is the transition from your current vendors planned?'] },
        ],
      },
    ],
    faqs: [
      { question: 'What does a facility management company do?', answer: 'It runs the services that keep a property working — cleaning, security, technical maintenance and support — through its own staff and processes, so the owner or occupier manages one partner instead of many vendors.' },
      { question: 'Can I use KARGAR for just one service?', answer: 'Yes. Housekeeping, security, maintenance and staffing can be engaged individually or combined into integrated facility management.' },
      { question: 'Which sectors does KARGAR serve?', answer: 'Residential societies, commercial complexes, corporate offices, educational institutes, healthcare facilities and manufacturing.' },
      { question: 'Where is KARGAR based?', answer: 'Our office is in Unity Commercial, near Amar Business Zone, Baner, Pune. We deploy teams to sites across Pune and Pimpri-Chinchwad.' },
      { question: 'How do I request a facility management proposal?', answer: 'Share your property type, size and the services you need through our contact page. We will arrange a site survey and send a written proposal.' },
    ],
    serviceDetailLink: { label: 'our full range of services', href: '/services' },
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Facility Management for Societies', href: '/facility-management-for-societies-pune' },
      { label: 'Facility Maintenance Services', href: '/facility-maintenance-services-pune' },
      { label: 'Company Profile', href: '/company-profile' },
    ],
    ctaHeading: 'Get a Facility Management Proposal',
    ctaText: 'Tell us about your property and the services you need. We will survey the site and propose an org structure and scope.',
    ctaLabel: 'Contact Our Facility Team',
    serviceType: 'Integrated Facility Management',
  },

  // ───────────────────────────── SOCIETIES ─────────────────────────────
  {
    path: '/facility-management-for-societies-pune',
    cluster: 'facility-management',
    parent: PILLAR,
    breadcrumbLabel: 'Society Facility Management',
    summary: 'Complete site organisation and co-operative society administration for Pune housing societies.',
    seo: {
      title: 'Society Facility Management',
      description:
        'Facility management for housing societies in Pune — housekeeping, security, technicians and co-op society administration under one KARGAR site manager.',
      keywords: ['Facility Management for Housing Societies Pune', 'Society Management Services Pune', 'Society Maintenance Company Pune'],
    },
    eyebrow: 'Housing Societies',
    h1: 'Facility Management for Housing Societies in Pune',
    heroSubtitle:
      'The best-run residential societies in Pune are managed holistically, not in piecemeal. KARGAR sets up a complete organisation for your society — sized to its scale and complexity.',
    heroImage: heroImages.building,
    intro: [
      'KARGAR understands Pune’s residential societies and the challenges their managing committees face: separate contracts for housekeeping, security, gardening, STP and lifts; staff who keep changing; and accounts, audits and legal formalities that volunteers have to chase. Our answer is an end-to-end, process-centric approach to society management.',
      'Society management is where KARGAR built its practice, and our clients include some of Pune’s most premium residential societies.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'A Complete Org Structure for Your Society',
        intro: 'Every role reports into one facility or site manager. The structure is scaled to the society — not every society needs every role.',
        caption: 'Society organisation structure by team',
        columns: ['Team', 'Roles'],
        rows: [
          ['Administration', 'Administration manager, admin supervisor, site manager, site supervisor, front desk, security reception supervisor'],
          ['Housekeeping', 'Housekeeping executives, janitors, office boys, specialised cleaning, waste management, OWC operator, gardeners'],
          ['Technicians', 'STP operator, electrician, plumber, service maintenance, solar system maintenance, fire technician, lift operators, access control and CCTV operators, MLCP operator'],
          ['Security', 'Security supervisor, security guards, watchmen and gatekeepers, surveillance operator, bouncers, valets'],
          ['Amenities', 'Gym instructors, lifeguards, garden and landscaping supervisors'],
          ['Finance and legal', 'Finance management, accounts head and executive, auditor, AMC management, stakeholder management, legal advisor'],
        ],
      },
      {
        kind: 'checklist',
        heading: 'Co-operative Society Administration Services',
        intro: 'Beyond the physical upkeep of the property, KARGAR supports the statutory side of running a co-operative housing society.',
        groups: [
          { title: 'Formation and handover', items: ['Society registration and handover from the developer', 'Share certificate allocation and documentation'] },
          { title: 'Accounts and compliance', items: ['Society account audit', 'Statutory documentation and compliances'] },
          { title: 'Property and governance', items: ['Execution of conveyance deed and deemed conveyance', 'AGM conduct and registrar filings', 'Maintenance management services'] },
        ],
      },
      {
        kind: 'prose',
        heading: 'Why Committees Choose One Partner',
        paragraphs: [
          'When housekeeping, security and maintenance are separate contracts, every problem that sits between them becomes the committee’s problem. With one partner, the site manager owns those gaps. Committees still decide the budget and scope; KARGAR runs the day-to-day and reports back.',
          'Each part of this model also stands on its own: [society housekeeping](/society-housekeeping-services-pune), [society security](/society-security-services-pune), [STP operation and maintenance](/stp-operation-maintenance-pune), [building maintenance](/building-maintenance-services-pune) and [landscaping maintenance](/landscaping-services-pune).',
        ],
      },
      {
        kind: 'callout',
        heading: 'Transparency the committee can show residents',
        text: 'Society money is residents’ money. KARGAR’s 100% financial transparency commitment gives the committee the right to ask what compensation is paid to staff deployed at the society — and PF/ESIC compliance is handled in line with labour law.',
      },
    ],
    faqs: [
      { question: 'Do we have to hand over everything at once?', answer: 'No. Many societies start with one or two services and expand. The org structure grows with the scope.' },
      { question: 'Can you help a new society take handover from the builder?', answer: 'Yes. Society registration and handover is one of our co-operative society services.' },
      { question: 'Do you help with conveyance and deemed conveyance?', answer: 'Yes. Execution of conveyance deed and deemed conveyance are part of our co-op society services.' },
      { question: 'Who does the committee deal with day to day?', answer: 'The facility or site manager KARGAR assigns to the society, with KARGAR’s regional management above them.' },
    ],
    relatedLinks: [
      { label: 'Society Housekeeping in Pune', href: '/society-housekeeping-services-pune' },
      { label: 'Society Security Services', href: '/society-security-services-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
    ],
    ctaHeading: 'Talk to Us About Managing Your Society',
    ctaText: 'Share the number of buildings, flats and amenities, and what your committee wants to hand over. We will propose a structure.',
    ctaLabel: 'Talk to KARGAR',
    serviceType: 'Residential Society Facility Management',
  },

  // ───────────────────────────── OFFICE FM ─────────────────────────────
  {
    path: '/office-facility-management-pune',
    cluster: 'facility-management',
    parent: PILLAR,
    breadcrumbLabel: 'Office Facility Management',
    summary: 'Housekeeping, front desk, mailroom, helpdesk and upkeep for single-occupier offices under one contract.',
    seo: {
      title: 'Office Facility Management Pune',
      description:
        'Office facility management in Pune — housekeeping, pantry, front desk, mailroom, helpdesk and maintenance coordinated by one KARGAR team for your office.',
      keywords: ['Office Facility Management Pune', 'Office Support Services Pune', 'Office Administration Services Pune'],
    },
    eyebrow: 'Office Facility Management',
    h1: 'Office Facility Management in Pune',
    heroSubtitle:
      'For admin managers who want the office to simply work: cleaning, pantry, reception, mail, service requests and small repairs handled by one team with one point of contact.',
    heroImage: heroImages.meeting,
    intro: [
      'In most offices, the admin manager ends up coordinating a housekeeping agency, a separate pantry arrangement, a receptionist, an electrician on call and a list of repair contacts. Office facility management brings these under one provider.',
      'KARGAR combines soft services (housekeeping, pantry, washroom hygiene), support services (front desk, mailroom, helpdesk and ticket management, reporting, consumables) and coordination of hard services (electrical, HVAC, plumbing) for single-occupier offices in Pune.',
    ],
    sections: [
      {
        kind: 'steps',
        heading: 'How a Service Request Is Handled',
        intro: 'Helpdesk and ticket management is one of our support services. It turns “someone please fix this” into a tracked request.',
        steps: [
          { title: 'Raised', description: 'An employee or the admin team raises the request with the helpdesk.' },
          { title: 'Logged and assigned', description: 'It is logged as a ticket and assigned to the right person: housekeeping, a technician or an external OEM.' },
          { title: 'Resolved', description: 'The work is completed, or breakdown maintenance is coordinated with the relevant vendor.' },
          { title: 'Reported', description: 'Open and closed tickets appear in daily, weekly and monthly reporting to the admin team.' },
        ],
      },
      {
        kind: 'cards',
        heading: 'What One Contract Can Cover',
        columns: 3,
        items: [
          { title: 'Workplace upkeep', description: 'Housekeeping, washroom hygiene and pantry services. See [office housekeeping](/office-housekeeping-services-pune).' },
          { title: 'Front of house', description: 'Front desk and reception support, visitor handling and mailroom operations.' },
          { title: 'Technical upkeep', description: 'Electrical, HVAC and plumbing maintenance coordinated through [facility maintenance services](/facility-maintenance-services-pune).' },
          { title: 'Consumables', description: 'Tools, tackles and consumables managed so supplies never run out.' },
          { title: 'Statutory documentation', description: 'Records and documentation for outsourced staff maintained as part of the contract.' },
          { title: 'Reporting', description: 'Daily, weekly and monthly reports so the admin team can see service delivery at a glance.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Is Office Facility Management Right for You?',
        paragraphs: [
          'If you only need cleaning, a housekeeping contract is simpler. Office facility management makes sense when the admin team is spending real time coordinating several vendors, or when service requests regularly fall through the cracks. Large multi-floor campuses with heavy housekeeping needs may want to start with [corporate housekeeping](/corporate-housekeeping-services-pune) and add support services over time.',
        ],
      },
    ],
    faqs: [
      { question: 'Do you provide receptionists and front-desk staff?', answer: 'Yes. Front desk and reception support can be part of an office facility management contract.' },
      { question: 'Can you manage our existing AMC vendors?', answer: 'Yes. Breakdown maintenance coordination and AMC management are part of how we run hard services.' },
      { question: 'Is there a minimum office size?', answer: 'No fixed minimum. We scope the roles to the office; smaller offices usually start with housekeeping and pantry and add services later.' },
    ],
    relatedLinks: [
      { label: 'Office Housekeeping in Pune', href: '/office-housekeeping-services-pune' },
      { label: 'Corporate Housekeeping', href: '/corporate-housekeeping-services-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
    ],
    ctaHeading: 'Simplify How Your Office Is Run',
    ctaText: 'Tell us which vendors and roles you currently manage, and we will propose a single, combined scope.',
    serviceType: 'Office Facility Management',
  },

  // ───────────────────────────── COMMERCIAL FM ─────────────────────────────
  {
    path: '/commercial-facility-management-pune',
    cluster: 'facility-management',
    parent: PILLAR,
    breadcrumbLabel: 'Commercial Facility Management',
    summary: 'Common-area services and building systems for owners and associations of multi-tenant commercial buildings.',
    seo: {
      title: 'Commercial Facility Management',
      description:
        'Commercial facility management in Pune for building owners and associations — common-area housekeeping, security and building systems run by one KARGAR team.',
      keywords: ['Commercial Facility Management Pune', 'Commercial Building Management Pune', 'Commercial Property Maintenance Pune'],
    },
    eyebrow: 'Commercial Buildings',
    h1: 'Commercial Facility Management in Pune',
    heroSubtitle:
      'For owners, developers and associations of commercial buildings: the shared services tenants depend on — clean common areas, secure entry, working lifts, power and water — managed as one operation.',
    heroImage: heroImages.building,
    intro: [
      'Commercial complexes are one of the sectors KARGAR serves. In a multi-tenant building, the owner or association is responsible for everything outside the tenants’ premises, and every tenant notices when something in that shared space fails.',
      'Commercial facility management puts one team in charge of those shared services, so the owner deals with one partner and tenants see one consistent standard.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Owner and Tenant Responsibilities',
        intro: 'Exact boundaries depend on your leases. This is the typical split we plan around.',
        caption: 'Typical responsibility split in a commercial building',
        columns: ['Area', 'Building owner / association (our scope)', 'Individual tenants'],
        rows: [
          ['Cleaning', 'Lobbies, corridors, common washrooms, parking, surroundings', 'Inside their own premises'],
          ['Security', 'Gates, entrances, CCTV of common areas, visitor access', 'Their own access policies'],
          ['Electrical and DG', 'Main panels, common lighting, DG and UPS for common services', 'Fit-out wiring within their premises'],
          ['Water and plumbing', 'Pumps, tanks, common washroom plumbing, STP/WTP where present', 'Fixtures within their premises'],
          ['Fire systems', 'Building fire alarm and fire-fighting systems', 'Compliance of their own fit-out'],
        ],
      },
      {
        kind: 'cards',
        heading: 'Services We Combine for Commercial Buildings',
        columns: 2,
        items: [
          { title: 'Common-area housekeeping', description: 'Zone-wise cleaning of shared spaces. See [commercial housekeeping services](/commercial-housekeeping-services-pune).' },
          { title: 'Security', description: 'Guards, access control and CCTV monitoring of entrances and common areas. See [security services in Pune](/security-services-pune).' },
          { title: 'Building systems', description: 'Electrical, DG, UPS, HVAC for common areas, plumbing, fire systems and STP/WTP. See [building maintenance](/building-maintenance-services-pune).' },
          { title: 'Vendor consolidation', description: 'AMC management and breakdown coordination with OEMs, so the owner is not chasing multiple vendors.' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Taking Over a Building',
        steps: [
          { title: 'Building audit', description: 'We walk the building and list the systems, existing AMCs and current service arrangements.' },
          { title: 'Structure and scope', description: 'We propose a site team and scope under the PURNA protocol.' },
          { title: 'Vendor alignment', description: 'Existing vendors and AMCs are aligned or consolidated so responsibilities are clear.' },
          { title: 'Operate and report', description: 'Daily operation with reporting to the owner or association.' },
        ],
      },
    ],
    faqs: [
      { question: 'Do you work for building owners or for tenants?', answer: 'Commercial facility management is usually for the owner, developer or association. Tenants can engage us separately for [office housekeeping](/office-housekeeping-services-pune) or [office facility management](/office-facility-management-pune).' },
      { question: 'Can you manage our existing AMC contracts?', answer: 'Yes. AMC management and breakdown maintenance coordination are part of our hard-services model.' },
      { question: 'Can you start with only housekeeping and security?', answer: 'Yes. Services can be added as the owner chooses.' },
    ],
    relatedLinks: [
      { label: 'Commercial Housekeeping in Pune', href: '/commercial-housekeeping-services-pune' },
      { label: 'Building Maintenance Services', href: '/building-maintenance-services-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
    ],
    ctaHeading: 'Request a Building Audit',
    ctaText: 'Share your building size, tenant count and current vendor arrangements, and we will plan a combined scope.',
    serviceType: 'Commercial Facility Management',
  },

  // ───────────────────────────── STAFFING ─────────────────────────────
  {
    path: '/facility-staffing-services-pune',
    cluster: 'facility-management',
    parent: PILLAR,
    breadcrumbLabel: 'Facility Staffing & Manpower',
    summary: 'Verified facility manpower across housekeeping, security, technical and front-office roles, on KARGAR’s payroll.',
    seo: {
      title: 'Facility Staffing in Pune',
      description:
        'Facility staffing services in Pune — housekeeping, security, technician and front-office manpower, police-verified and on KARGAR’s compliant payroll.',
      keywords: ['Facility Staffing Services Pune', 'Manpower Services Pune', 'Facility Manpower Supply Pune'],
    },
    eyebrow: 'Facility Staffing',
    h1: 'Facility Staffing & Manpower Services in Pune',
    heroSubtitle:
      'Skilled, semi-skilled and white-collar facility roles, recruited, verified and employed by KARGAR — so your site has stable people without the administration.',
    heroImage: heroImages.meeting,
    intro: [
      'A facility needs many kinds of people: housekeeping staff, guards, technicians, operators, front-desk staff and supervisors. Hiring each directly means separate recruitment, verification, payroll, PF and ESIC — and starting again whenever someone leaves.',
      'KARGAR provides facility staffing in Pune across these roles. We employ the staff, handle compliance and attendance, and keep them trained, so the site keeps a stable team. Our company profile reports 95% employee retention, which is the part clients feel most: the same faces at your site.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Role Families We Staff',
        caption: 'Facility staffing role families and examples',
        columns: ['Role family', 'Examples'],
        rows: [
          ['Housekeeping', 'Housekeeping executives, janitors, office boys, pantry staff, specialised cleaning — see [housekeeping staff](/housekeeping-staff-pune)'],
          ['Security', 'Security guards, watchmen and gatekeepers, security supervisors, surveillance operators, bouncers, valets'],
          ['Technical', 'Electricians, plumbers, STP operators, fire technicians, lift operators, access control and CCTV operators, MLCP operators'],
          ['Amenities and grounds', 'Gardeners, garden supervisors, gym instructors, lifeguards'],
          ['Office and administration', 'Front desk, admin supervisors, site supervisors, mailroom and helpdesk staff'],
        ],
      },
      {
        kind: 'compare',
        heading: 'Direct Hiring vs. Facility Staffing',
        left: {
          title: 'Hiring directly',
          items: ['Separate recruitment for every role', 'Your team runs verification and payroll', 'PF, ESIC and labour-law compliance sit with you', 'Every exit restarts the process'],
        },
        right: {
          title: 'Staffing through KARGAR',
          items: ['One provider for all facility roles', 'Police verification and background checks done before deployment', 'PF, ESIC and labour-law compliance handled by KARGAR', 'Training and retention managed by KARGAR'],
        },
      },
      {
        kind: 'callout',
        heading: 'Know what your staff are paid',
        text: 'Under KARGAR’s 100% financial transparency commitment, you have the right to ask for the compensation paid to the staff deployed at your site — a common concern with manpower contracts that we address up front.',
      },
    ],
    faqs: [
      { question: 'Is facility staffing the same as facility management?', answer: 'No. Staffing supplies people who work under your direction; [facility management](/facility-management-company-pune) means KARGAR also owns the scope, supervision and outcomes.' },
      { question: 'Can I hire different roles under one contract?', answer: 'Yes. Housekeeping, security, technical and front-office roles can all be part of one staffing agreement.' },
      { question: 'Who handles PF and ESIC?', answer: 'KARGAR, as the employer of the deployed staff, in line with labour law.' },
    ],
    relatedLinks: [
      { label: 'Housekeeping Staff & Manpower', href: '/housekeeping-staff-pune' },
      { label: 'Security Services in Pune', href: '/security-services-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
    ],
    ctaHeading: 'Request Facility Manpower',
    ctaText: 'Share the roles, headcount and shifts you need, and we will send a staffing proposal.',
    ctaLabel: 'Request Manpower Proposal',
    serviceType: 'Facility Staffing',
  },
];
