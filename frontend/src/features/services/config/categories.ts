import type { Category } from '../domain/service.types';


/**
 * The only numerical company claims in the approved source documents (Company Profile p.10-11:
 * "98% Client retention & 95% Employee retention"; "100% financial transparency"). Unsourced
 * figures (headcount, SLA %, sq. ft., years) must not be shown.
 */
const VERIFIED_COMPANY_STATISTICS = [
  { value: '98%', label: 'Client Retention' },
  { value: '95%', label: 'Employee Retention' },
  { value: '100%', label: 'Financial Transparency' },
];

/** Sectors listed in the Company Brochure ("Sectors We Work In"). */
const BROCHURE_SECTORS = [
  { title: 'Housing Societies', iconKey: 'home' },
  { title: 'Corporate Offices', iconKey: 'building' },
  { title: 'Commercial Complexes', iconKey: 'store' },
  { title: 'Educational Institutes', iconKey: 'graduation-cap' },
  { title: 'Healthcare', iconKey: 'plus-square' },
  { title: 'Manufacturing', iconKey: 'factory' },
];

export const serviceCategories: Record<string, Category> = {
  hard: {
    id: 'hard',
    slug: 'hard-services',
    title: 'Hard Services',
    shortDescription: 'Reliable engineering and maintenance solutions for seamless operations.',
    // Scope strictly per Company Brochure p.2 "Hard Services", matching the Pune maintenance cluster
    // (src/features/pune-landing/config/pages/maintenance.ts). Do not add systems outside that scope.
    overview: 'Hard services are the technical systems a building cannot run without: power distribution and backup, cooling and ventilation, water, sewage treatment and fire safety. KARGAR maintains these systems for housing societies, offices, commercial complexes, institutes and manufacturing plants across Pune. Instead of waiting for equipment to fail, we put each system on a planned preventive maintenance (PPM) schedule built from OEM recommendations and how the site is actually used, and we coordinate breakdown repairs, with OEMs or specialist vendors where needed, when faults still occur. Hard services can be taken on their own under an annual maintenance contract, on call, or as part of integrated facility management alongside our soft services.',
    iconKey: 'wrench',
    imageKey: 'hardServices',
    seo: {
      title: 'Hard Services & MEP Maintenance',
      description: 'Hard services in Pune by KARGAR: planned maintenance of electrical, HVAC, DG, UPS, plumbing, STP and fire systems under an AMC, on call or with resident staff.',
      keywords: ['Hard Services Pune', 'Hard Facility Management', 'MEP Maintenance Pune', 'Preventive Maintenance'],
    },
    showInNavigation: true,
    priority: 1,
    layoutPreset: 'categoryDefault',
    statistics: VERIFIED_COMPANY_STATISTICS,
    operations: {
      scopeOfWork: [
        { title: 'Electrical Maintenance', description: 'LT panels, distribution boards, cabling and UPS rooms, inspected and maintained before faults cause outages.', href: '/services/hard-services/electrical-maintenance' },
        { title: 'HVAC Maintenance', description: 'AHUs, FCUs and VRV/VRF systems serviced on schedule, with system balancing and duct cleaning.', href: '/services/hard-services/hvac-maintenance' },
        { title: 'DG Sets, UPS & Batteries', description: 'Operation and maintenance of diesel generators, and UPS and battery checks, so backup power works when the grid fails.', href: '/electrical-maintenance-services-pune' },
        { title: 'Plumbing & Water Systems', description: 'Pumps, tanks, pipelines and water systems maintained by trained plumbers.', href: '/plumbing-maintenance-services-pune' },
        { title: 'STP / WTP Operation', description: 'Daily operation of sewage and water treatment plants by STP operators.', href: '/stp-operation-maintenance-pune' },
        { title: 'Fire Systems & BMS', description: 'Fire alarm and fire-fighting systems, and building management system monitoring.', href: '/building-maintenance-services-pune' },
      ],
    },
    challenges: [
      { title: 'Unplanned Downtime', description: 'When systems are serviced only after they fail, the cost shows up as downtime, emergency call-outs and shorter equipment life.', iconKey: 'alert-triangle' },
      { title: 'Backup That Fails When Needed', description: 'A DG set that has not been run under load, or a battery bank past its life, only shows its weakness during an outage.', iconKey: 'battery-warning' },
      { title: 'No Asset History', description: 'Without maintenance records, it is hard to know which equipment is at risk or what was last serviced.', iconKey: 'file-question' },
    ],
    solutions: [
      { title: 'Annual Maintenance Contract', description: 'A PPM calendar and agreed scope for each system, with breakdowns coordinated under the same contract.', iconKey: 'calendar-check' },
      { title: 'On-Call Support', description: 'Technician support when you need it, for sites that do not need a full-time team.', iconKey: 'phone-call' },
      { title: 'Resident Technicians', description: 'Electricians, plumbers, STP operators or fire technicians deployed on site.', iconKey: 'hard-hat' },
    ],
    industries: BROCHURE_SECTORS,
    process: [
      { title: 'Asset Survey', description: 'We list your systems and equipment, their condition, and any existing AMCs or OEM warranties.' },
      { title: 'PPM Calendar', description: 'A preventive maintenance schedule is drawn up from OEM recommendations and how the site is used.' },
      { title: 'Breakdown Escalation', description: 'We agree how faults outside the PPM schedule are escalated and when OEMs or specialist vendors are brought in.' },
      { title: 'Reporting', description: 'Completed PPM, open issues and breakdowns are reported daily, weekly and monthly.' },
    ],
    faqs: [
      { question: 'What is the difference between hard services and soft services?', answer: 'Hard services cover the building’s technical systems: electrical, HVAC, DG and UPS, plumbing, STP/WTP, fire systems and BMS. Soft services cover the people-driven work that keeps a property clean, safe and running day to day, such as housekeeping and security.' },
      { question: 'Do you work alongside our existing OEM contracts?', answer: 'Yes. We follow OEM schedules for preventive maintenance and coordinate with OEMs or specialist vendors when their involvement is required.' },
      { question: 'Can we take only on-call support instead of an AMC?', answer: 'Yes. Hard services can be engaged as an annual maintenance contract, on call, or with resident technicians, depending on the site.' },
      { question: 'What happens when something breaks down between scheduled maintenance?', answer: 'Breakdown maintenance is coordinated by KARGAR through an agreed escalation process, with OEMs or specialist vendors brought in where their involvement is required.' },
      { question: 'Which areas do you cover?', answer: 'We maintain building systems for housing societies, offices, commercial complexes, institutes and plants across Pune.' },
    ],
  },
  soft: {
    id: 'soft',
    slug: 'soft-services',
    title: 'Soft Services',
    shortDescription: 'Housekeeping, hygiene, landscaping and security teams for your property, run as one managed service.',
    // Scope strictly per Company Brochure p.2 "Soft Services" and Company Profile (org structures,
    // pain points, training, transparency). Detail lives on the Pune pages linked from scopeOfWork;
    // keep this hub as the overview so it does not duplicate them.
    overview: 'Soft services are the people-driven work that keeps a property usable every day: cleaning, washroom hygiene, pantry support, waste handling, gardens and security. Many properties in Pune buy these from several agencies, each with its own supervisor, staff turnover and invoice. KARGAR takes them on as a single site team. We work out the roles, shifts, checklists and SOPs your site needs, deploy and train the staff, and report to the managing committee or admin team through one point of contact. Housing societies, corporate offices, commercial complexes, educational institutes, healthcare facilities and manufacturing plants can take one service or the full set, on an annual contract, on call or for a one-off job.',
    iconKey: 'brush',
    imageKey: 'softServices',
    seo: {
      title: 'Soft Facility Services in Pune',
      description: 'Soft services in Pune from KARGAR: housekeeping, washroom hygiene, pantry, waste segregation, landscaping and security guards, run by one supervised site team.',
      keywords: ['Soft Services Pune', 'Soft Facility Management', 'Integrated Soft Services', 'Housekeeping and Security Pune'],
    },
    showInNavigation: true,
    priority: 2,
    layoutPreset: 'categoryDefault',
    statistics: VERIFIED_COMPANY_STATISTICS,
    operations: {
      scopeOfWork: [
        { title: 'Housekeeping & Deep Cleaning', description: 'Daily, weekly and monthly cleaning schedules, with periodic deep cleaning, supervised against checklists.', href: '/housekeeping-services-pune' },
        { title: 'Façade Cleaning', description: 'Cleaning of the building’s external façade, as part of the soft-services scope.' },
        { title: 'Washroom Hygiene & Pantry', description: 'Washroom cleaning and restocking, plus pantry services and office-boy support for workplaces.', href: '/office-housekeeping-services-pune' },
        { title: 'Waste Management', description: 'Wet and dry waste segregation, and OWC operators for societies that process organic waste on site.', href: '/society-housekeeping-services-pune' },
        { title: 'Landscaping & Horticulture', description: 'Gardeners and garden supervisors for lawns, podiums and campus landscapes.', href: '/landscaping-services-pune' },
        { title: 'Security Guards', description: 'Police-verified, trained security guards and supervisors for offices, campuses and plants.', href: '/security-services-pune' },
        { title: 'Society Gates & Visitors', description: 'Watchmen, gatekeepers and security staff for residential society entrances.', href: '/society-security-services-pune' },
        { title: 'Front Desk & Site Staff', description: 'Front desk, lift operators, valets and other on-site roles, staffed and managed by KARGAR.', href: '/facility-staffing-services-pune' },
      ],
    },
    challenges: [
      { title: 'Too Many Vendors', description: 'Separate agencies for cleaning, security and gardening mean separate supervisors, separate invoices and no single party accountable when something is missed.', iconKey: 'users' },
      { title: 'Unstable Teams', description: 'When staff keep changing, residents and employees keep seeing new faces, and every replacement has to learn the site again.', iconKey: 'refresh-cw' },
      { title: 'Unclear Spending', description: 'Committees and admin teams often cannot see what the deployed staff are actually paid, so expenses go unmanaged.', iconKey: 'receipt' },
    ],
    solutions: [
      { title: 'One Site Team', description: 'Housekeeping, security, gardening and support roles set up under one org structure, with one point of contact for the property.', iconKey: 'network' },
      { title: 'Trained, Stable Staff', description: 'Skill, safety and behavioural training round the year by Field Trainers and Quality Managers, so staff stay longer and know the site.', iconKey: 'graduation-cap' },
      { title: '100% Financial Transparency', description: 'You have the right to ask what compensation is paid to the staff deployed at your site.', iconKey: 'badge-check' },
    ],
    industries: BROCHURE_SECTORS,
    process: [
      { title: 'Site Walk-Through', description: 'We visit the property with the committee or admin team to see the areas, footfall, timings and how services are run today.' },
      { title: 'Roles, Shifts & Checklists', description: 'We propose the team for each service, their shifts, and the checklists and SOPs they will work to.' },
      { title: 'Deployment & Handover', description: 'Trained staff are deployed with a site supervisor, and security personnel are police-verified before they start.' },
      { title: 'Supervision & Review', description: 'Supervisors check work against the checklists, and KARGAR regional management reviews performance and reports to you, as set out in our PURNA protocol.' },
    ],
    faqs: [
      { question: 'What do soft services include?', answer: 'At KARGAR, soft services cover housekeeping (daily, weekly, monthly and deep cleaning), façade cleaning, washroom hygiene, pantry services, waste management with wet/dry segregation, landscaping and horticulture, and security guards. Support roles such as front desk and lift operators can be added to the same team.' },
      { question: 'Do we need a separate vendor for cleaning, security and gardening?', answer: 'No. KARGAR can run all of them as one site team under one org structure, so the property deals with one supervisor and one point of contact instead of several agencies.' },
      { question: 'How is the team sized for our property?', answer: 'The site team and its org structure are set up in accordance with the size and complexity of your property, from a small office to a large residential society.' },
      { question: 'Can soft services be taken on call or for a one-off job?', answer: 'Yes. Soft services can be engaged on an annual contract, on call, or on an incidental basis, for example a one-time deep clean.' },
      { question: 'How are staff trained?', answer: 'Staff receive skill, safety and behavioural training round the year from KARGAR Field Trainers and Quality Managers. Security personnel are police-verified before deployment.' },
      { question: 'Do you work with housing societies in Pune?', answer: 'Yes. Residential societies are a core part of our work in Pune. We set up the full society team, from housekeeping staff and gardeners to watchmen and gatekeepers, and also support co-operative societies with registration, statutory documentation, conveyance and AGM filings.' },
    ],
  },
};
