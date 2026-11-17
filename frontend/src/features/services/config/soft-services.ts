import type { Service } from '../domain/service.types';


export const softServices: Record<string, Service> = {
  housekeeping: {
    id: 'housekeeping',
    categoryId: 'soft',
    slug: 'housekeeping',
    catalogSlug: 'housekeeping-services',
    title: 'Housekeeping Services',
    shortDescription: 'Professional housekeeping services for corporate offices and commercial facilities.',
    overview: 'KARGAR Facility Management provides professional housekeeping services for corporate offices, commercial facilities, and workplaces. We deliver comprehensive cleaning solutions tailored to each facility\'s needs, from daily janitorial housekeeping to specialized deep cleaning. Our trained, police-verified housekeeping staff work from written checklists under regular supervision to maintain consistent standards of cleanliness and hygiene. Our teams support office housekeeping for corporate offices and campuses, commercial housekeeping for commercial buildings and complexes, and industrial housekeeping for manufacturing plants and warehouses, with the same operating standards in every environment.',
    iconKey: 'sparkles',
    imageKey: 'housekeeping',
    seo: {
      title: 'Business Housekeeping Services',
      description: 'Housekeeping services for corporate, commercial and industrial facilities: police-verified, trained staff, written checklists and on-site supervision by KARGAR.',
      keywords: ['Housekeeping Services', 'Business Housekeeping Services', 'Commercial Housekeeping', 'Industrial Housekeeping', 'Office Housekeeping Services']
    },
    serviceType: 'cleaning',
    layoutPreset: 'enterpriseCleaning',
    marketing: {
      headline: 'A Spotless, Hygienic Workplace, Every Day',
      summary: 'Ensure a spotless, hygienic, and welcoming workplace for your employees and visitors, with trained, police-verified housekeeping staff.',
      ctaText: 'Request a Consultation'
    },
    operations: {
      scopeOfWork: [
        { title: 'Daily Janitorial', description: 'Dusting, vacuuming, and trash removal.' },
        { title: 'Restroom Hygiene', description: 'Strict sanitization protocols to prevent cross-contamination.' },
        { title: 'Deep Cleaning', description: 'Intensive periodic cleaning for specialized surfaces.' },
        { title: 'Consumables Management', description: 'Refilling soap, paper towels, and sanitizers.' }
      ],
      deliverables: [
        { title: 'Daily Cleaning Checklist', description: 'Signed logs of all daily cleaning tasks.' },
        { title: 'Monthly Hygiene Report', description: 'Detailed analysis of facility cleanliness.' }
      ]
    },
    capabilities: ['police-verified'],
    compliance: [
      { title: 'Verified Workforce', description: 'All housekeeping personnel undergo thorough police verification and background checks before deployment.', iconKey: 'shield-check' },
      { title: 'PF & ESIC Compliance', description: 'Housekeeping staff are employed on KARGAR’s payroll with PF and ESIC compliance, and you can ask what the staff at your site are paid.', iconKey: 'file-check' },
      { title: 'Structured Service Delivery', description: 'Daily cleaning checklists and monthly hygiene reports provide measurable, deliverable-driven tracking.', iconKey: 'clipboard-check' }
    ],
    process: [
      { step: 1, title: 'Enquiry & Consultation', description: 'Share your facility\'s housekeeping requirements through our contact page. Our team follows up to understand your site and cleaning needs.' },
      { step: 2, title: 'Service Plan & Staff Deployment', description: 'We deploy trained housekeeping staff covering daily janitorial work, restroom hygiene, deep cleaning, and consumables management based on your facility.' },
      { step: 3, title: 'Ongoing Supervision', description: 'Supervisors conduct regular unannounced inspections to maintain consistent quality standards.' },
      { step: 4, title: 'Reporting & Quality Tracking', description: 'Cleaning activity is tracked through daily cleaning checklists and monthly hygiene reports.' }
    ],
    whyChooseUs: [
      { title: 'Payroll Transparency', description: 'You have the right to ask what compensation is paid to the staff deployed at your site.', iconKey: 'file-check' },
      { title: 'Trained Personnel', description: 'Year-round skill, safety and behavioural training by Field Trainers and Quality Managers.', iconKey: 'users' },
      { title: 'Quality Assurance', description: 'Regular unannounced inspections by supervisors.', iconKey: 'check-circle' }
    ],
    industries: [
      { title: 'Corporate Offices', iconKey: 'building' },
      { title: 'Commercial Buildings', iconKey: 'building-2' },
      { title: 'Residential Societies', iconKey: 'home' },
      { title: 'Educational Institutes', iconKey: 'graduation-cap' },
      { title: 'Healthcare', iconKey: 'plus-square' },
      { title: 'Warehouses', iconKey: 'package' },
      { title: 'Manufacturing', iconKey: 'factory' }
    ],
    faqs: [
      { question: 'Does KARGAR provide housekeeping staff for corporate offices?', answer: 'Yes, we provide trained housekeeping staff for corporate offices, commercial facilities, and workplace environments, with regular supervision and quality checks.' },
      { question: 'What is included in daily housekeeping?', answer: 'Tasks include emptying trash, vacuuming, mopping, cleaning restrooms, and wiping surfaces.' },
      { question: 'Do you supply cleaning materials and machines?', answer: 'They can be included. Consumables, tools and tackles can be managed by KARGAR as part of the contract or supplied by you, and this is agreed in the scope.' },
      { question: 'Are your housekeeping staff background-checked?', answer: 'Absolutely. All our personnel undergo thorough police verification and background checks.' },
      { question: 'Does KARGAR provide commercial and industrial housekeeping services?', answer: 'Yes. Beyond corporate offices, our housekeeping teams support commercial buildings and complexes, as well as industrial environments including manufacturing plants and warehouses.' },
      { question: 'What information do you need to prepare a housekeeping services proposal?', answer: 'Typically your facility type, site size, operating hours, and current staffing needs. Share these through our contact page and our team will follow up with a tailored proposal.' }
    ],
    relationships: {
      relatedServices: ['security']
    },
    order: 1,
  },
  security: {
    id: 'security',
    categoryId: 'soft',
    slug: 'security-services',
    catalogSlug: 'security-services',
    title: 'Security Services',
    shortDescription: 'Comprehensive manned guarding and surveillance solutions.',
    overview: 'Safeguard your assets, employees, and visitors with our robust security services. We offer highly trained security personnel, access control management, and surveillance monitoring. Every guard works to written post instructions under a security supervisor, and visitor logs and incident reports give you an auditable record of each shift.',
    iconKey: 'shield',
    imageKey: 'security',
    seo: {
      // Deliberately service-detail intent: commercial queries ("security services Pune",
      // "corporate security Pune") belong to the /security-services-pune cluster pages.
      title: 'Security Service Scope & FAQs',
      description: 'Security service scope at KARGAR: manned guarding, access control, CCTV monitoring, visitor logs and incident reports, delivered by police-verified guards.',
      keywords: ['Security Service Scope', 'Manned Guarding', 'Access Control', 'CCTV Monitoring'],
    },
    serviceType: 'security',
    layoutPreset: 'enterpriseTechnical',
    marketing: {
      headline: 'Uncompromising Protection for Your Business.',
      summary: 'Deter threats and ensure peace of mind with our highly trained security personnel.',
      ctaText: 'Request Security Assessment'
    },
    operations: {
      scopeOfWork: [
        { title: 'Manned Guarding', description: 'Trained security officers for static guarding and patrols.' },
        { title: 'Access Control', description: 'Managing entry and exit points to prevent unauthorized access.' },
        { title: 'CCTV Monitoring', description: 'Surveillance monitoring and incident recording by surveillance operators.' },
        { title: 'Incident Response', description: 'Guards act on the site’s emergency procedure and escalate through the supervisor and KARGAR management.' }
      ],
      deliverables: [
        { title: 'Visitor Logs', description: 'Digital or physical logs of all facility visitors.' },
        { title: 'Incident Reports', description: 'Detailed documentation of any security breaches.' }
      ]
    },
    capabilities: ['police-verified'],
    whyChooseUs: [
      { title: 'Verified Personnel', description: 'Police verification and background checks before any guard is deployed.', iconKey: 'shield-check' },
      { title: 'Year-Round Training', description: 'Skill, safety and behavioural training by KARGAR’s Field Trainers and Quality Managers.', iconKey: 'graduation-cap' },
      { title: 'Supervised Posts', description: 'A security supervisor checks posts and is your first escalation point.', iconKey: 'clipboard-check' }
    ],
    faqs: [
      { question: 'Are your security guards police-verified?', answer: 'Yes. Security personnel go through police verification and background checks before deployment.' },
      { question: 'What hours can security cover?', answer: 'Coverage hours, guard posts and shifts are agreed with you during the site assessment.' },
      { question: 'What is your response protocol for emergencies?', answer: 'Immediate containment, coordination with local authorities, and rapid incident reporting.' }
    ],
    relationships: {
      relatedServices: ['housekeeping']
    },
    order: 2,
  }
};
