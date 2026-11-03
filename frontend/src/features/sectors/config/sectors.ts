import { Building2, Factory, GraduationCap, Home, PlusSquare, Store, type LucideIcon } from 'lucide-react';
import type { InlineText } from '@/features/pune-landing/domain/types';

/**
 * The sectors KARGAR serves — single source of truth for the /sectors page and the homepage
 * sector grid.
 *
 * Scope is strictly the six sectors in the Company Brochure p.2 ("Sectors We Work In":
 * Commercial, Corporate, Educational, Healthcare, Manufacturing, Residential) and Company
 * Profile p.3-4. Every service named below is from Brochure p.2 (soft / hard / support services)
 * or Profile p.6-11 (org structures, co-op society services, PURNA, training, transparency).
 * Do not add sectors, clients, figures or capabilities without a documented source.
 */
export interface SectorProfile {
  /** Anchor id on /sectors. */
  id: string;
  name: string;
  icon: LucideIcon;
  /** One-line card text on the homepage grid. */
  cardSummary: string;
  /**
   * Illustrative stock photo of the sector (Unsplash), NOT a KARGAR client site. It is rendered
   * as decorative (alt="", aria-hidden) and must never be captioned or described as KARGAR's work.
   */
  image: string;
  /** Most relevant Pune page for this sector (homepage card destination). */
  href: string;
  overview: string;
  challenges: string[];
  housekeeping: InlineText;
  security: InlineText;
  technical: InlineText;
  approach: InlineText;
}

export const sectorProfiles: SectorProfile[] = [
  {
    id: 'housing-societies',
    name: 'Housing Societies',
    icon: Home,
    cardSummary: 'Complete society teams for housekeeping, security, gardens and technical upkeep, run for the managing committee.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    href: '/facility-management-for-societies-pune',
    overview:
      'A residential society is run by a volunteer managing committee, not a facilities department. Committee members change after elections, residents expect the same standard every day, and every rupee of the maintenance fund can be questioned at the AGM. That is why we approach a society as one property to be set up as a whole, with an org structure sized to the site, rather than as a list of separate staff to be supplied.',
    challenges: [
      'Separate agencies for cleaning, security and gardening, each with its own supervisor and invoice',
      'Staff turnover that means residents keep meeting new faces at the gate',
      'Committees that cannot see what the deployed staff are actually paid',
    ],
    housekeeping:
      'Daily cleaning of lobbies, staircases, podiums and parking, washroom upkeep in common areas, and wet and dry waste segregation, with OWC operators where organic waste is processed on site. See [society housekeeping in Pune](/society-housekeeping-services-pune).',
    security:
      'Police-verified watchmen, gatekeepers and security supervisors for gates, visitor entry and patrols. See [society security services in Pune](/society-security-services-pune).',
    technical:
      'Pumps, water tanks and plumbing, common-area electrical systems, DG sets where the society has backup power, and daily operation of the sewage treatment plant. See [STP operation and maintenance](/stp-operation-maintenance-pune).',
    approach:
      'One org structure covering housekeeping staff, gardeners, watchmen and technicians, reporting to the committee through a single point of contact. For co-operative societies we can also support registration and handover, statutory documentation, conveyance and deemed conveyance, and AGM conduct and registrar filings. See [facility management for housing societies](/facility-management-for-societies-pune).',
  },
  {
    id: 'corporate-offices',
    name: 'Corporate Offices',
    icon: Building2,
    cardSummary: 'Workplace housekeeping, pantry and front-desk support, security and HVAC upkeep, planned around office hours.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80',
    href: '/office-facility-management-pune',
    overview:
      'In an office, facility services are judged by employees, who notice a missed washroom round, a warm meeting room or an unattended reception within minutes. The admin or facilities team answers to management for cost and to employees for the experience, so it needs services that run around working hours without constant follow-up.',
    challenges: [
      'Washrooms, pantries and meeting rooms that need attention several times a day, not once',
      'Cooling and power problems that stop work and land on the admin team',
      'No single report showing what was done, what was missed and what was escalated',
    ],
    housekeeping:
      'Work-floor cleaning before and during office hours, washroom hygiene rounds, pantry services and office-boy support, with periodic deep cleaning. See [office housekeeping services in Pune](/office-housekeeping-services-pune).',
    security:
      'Trained security guards for reception, access points and after-hours cover, with front desk staff where the office needs them. See [security services in Pune](/security-services-pune).',
    technical:
      'Scheduled maintenance of [HVAC systems](/services/hard-services/hvac-maintenance) such as AHUs, FCUs and VRV/VRF units, UPS rooms and [electrical distribution](/services/hard-services/electrical-maintenance), plus BMS monitoring where a system is installed.',
    approach:
      'A site team set up around your working hours, with helpdesk and ticket management, mailroom operations and daily, weekly and monthly reporting available as support services. See [office facility management in Pune](/office-facility-management-pune).',
  },
  {
    id: 'commercial-complexes',
    name: 'Commercial Complexes',
    icon: Store,
    cardSummary: 'Common-area cleaning, façade care, security and shared building systems for multi-tenant complexes.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    href: '/commercial-facility-management-pune',
    overview:
      'A commercial complex has many occupiers, from shops to offices and clinics, sharing common areas that belong to everyone and are therefore easy to neglect. Footfall rises and falls through the day and week, visitors outnumber regular occupants, and the shared building systems serve every tenant at once.',
    challenges: [
      'Heavy, uneven footfall in lobbies, corridors and public washrooms',
      'Shared systems such as water, backup power and fire safety that affect every occupier when they fail',
      'A façade and common areas that shape how every tenant’s customers see the building',
    ],
    housekeeping:
      'Common-area cleaning scheduled to footfall, public washroom hygiene, waste collection with wet and dry segregation, and façade cleaning as a periodic task. See [commercial housekeeping services in Pune](/commercial-housekeeping-services-pune).',
    security:
      'Security guards for entrances, parking and common areas, managing visitor movement across a building with many occupiers.',
    technical:
      'DG operation, fire alarm and fire-fighting system upkeep, plumbing and water systems, and STP/WTP operation for the shared building. See [building maintenance services in Pune](/building-maintenance-services-pune).',
    approach:
      'One team for the shared areas and systems, managed for the owner, association or maintenance company, with planned preventive maintenance following OEM schedules. See [commercial facility management in Pune](/commercial-facility-management-pune).',
  },
  {
    id: 'educational-institutes',
    name: 'Educational Institutes',
    icon: GraduationCap,
    cardSummary: 'Campus housekeeping around the timetable, gate security, grounds care and building upkeep for institutes.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800',
    href: '/school-housekeeping-services-pune',
    overview:
      'Schools, colleges and institutes run to a timetable. Cleaning has to fit before, between and after sessions, campuses are busiest at arrival and dismissal, and the institution is answerable for the safety of the students using the space. Larger campuses also carry grounds, gardens and canteens alongside classrooms.',
    challenges: [
      'Cleaning windows limited to the gaps in the timetable',
      'Arrival and dismissal peaks at the gates, with visitors and vehicles mixed in',
      'Grounds and gardens that need regular, not occasional, care',
    ],
    housekeeping:
      'Classrooms, corridors, washrooms and staff rooms cleaned around the timetable, with heavier deep cleaning moved to vacations, and [landscaping and horticulture](/landscaping-services-pune) for campus grounds. See [school housekeeping services in Pune](/school-housekeeping-services-pune).',
    security:
      'Police-verified security guards for gates and visitor entry, with deployment planned around arrival and dismissal times.',
    technical:
      'Electrical systems, plumbing and water systems, and fire alarm and fire-fighting systems maintained on a preventive schedule rather than after a failure. See [facility maintenance services in Pune](/facility-maintenance-services-pune).',
    approach:
      'Shifts, checklists and SOPs agreed with the administration after a campus walk-through, so routine work stays inside the timetable and disruptive work is planned for holidays.',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: PlusSquare,
    cardSummary: 'Supervised housekeeping that follows your infection-control protocols, with records your facility can audit.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
    href: '/healthcare-housekeeping-services-pune',
    overview:
      'In a clinic or hospital, housekeeping is part of patient safety, and the rules around it belong to the facility: which procedure applies in which area, which chemicals are approved and how waste is segregated. What the facility needs from a partner is consistent execution of those protocols on every shift, and records it can audit.',
    challenges: [
      'Protocols that must be followed the same way on every shift',
      'Waste segregation that has to match the facility’s authorised disposal arrangement',
      'Continuous public footfall in waiting areas, corridors and washrooms',
    ],
    housekeeping:
      'Trained staff working to your infection-control protocols, with supervised rounds and checklist records. Biomedical waste disposal stays with the facility’s authorised arrangement; our staff follow your segregation rules. See [healthcare housekeeping in Pune](/healthcare-housekeeping-services-pune).',
    security:
      'Security guards for entrances, visitor movement and public waiting areas.',
    technical:
      'HVAC systems, backup power through DG sets, UPS and batteries, and plumbing and water systems maintained on planned schedules. Medical equipment is not part of our hard-services scope.',
    approach:
      'Clinical decisions stay with your facility. We review your protocols, brief and train staff on them before deployment, and supervise rounds so execution and documentation stay consistent.',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    cardSummary: 'Shift-aligned plant housekeeping, gate and perimeter security, and electrical, DG and STP maintenance.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    href: '/industrial-housekeeping-services-pune',
    overview:
      'A manufacturing plant runs on production shifts, and facility services have to work around them. Shop floors, canteens, amenities and admin blocks each need a different standard, contractor staff must follow the plant’s safety rules, and a power or cooling failure costs output, not just comfort.',
    challenges: [
      'Cleaning that has to fit production shifts and shop-floor safety rules',
      'Power distribution and backup that production depends on',
      'Large perimeters, gates and shift changes to secure',
    ],
    housekeeping:
      'Shift-aligned cleaning of shop floors, canteens, amenities and admin blocks, with wet and dry waste segregation. See [industrial housekeeping services in Pune](/industrial-housekeeping-services-pune).',
    security:
      'Trained, police-verified security guards and supervisors for gates, perimeters and shift changes.',
    technical:
      '[Electrical maintenance](/electrical-maintenance-services-pune) of LT panels, distribution boards and cabling, DG and UPS maintenance, and STP/WTP operation, with breakdowns coordinated with OEMs or specialist vendors where needed.',
    approach:
      'Staff receive skill, safety and behavioural training round the year from KARGAR Field Trainers and Quality Managers, and tools, tackles and consumables can be managed as a support service. See [hard services](/services/hard-services).',
  },
];

/** How requirements differ by sector — rendered as a comparison table on /sectors. */
export const sectorComparison: { sector: string; reportsTo: string; scheduling: string; priority: string }[] = [
  { sector: 'Housing Societies', reportsTo: 'Managing committee', scheduling: 'Every day, including weekends', priority: 'Gates, water, STP, common areas' },
  { sector: 'Corporate Offices', reportsTo: 'Admin or facilities team', scheduling: 'Around office hours', priority: 'Washrooms, pantry, HVAC, UPS' },
  { sector: 'Commercial Complexes', reportsTo: 'Owner, association or maintenance company', scheduling: 'To footfall peaks', priority: 'Common areas, façade, DG, fire systems' },
  { sector: 'Educational Institutes', reportsTo: 'Institute administration', scheduling: 'Around the timetable and vacations', priority: 'Classrooms, gates, grounds' },
  { sector: 'Healthcare', reportsTo: 'Facility and infection-control team', scheduling: 'To the facility’s protocols', priority: 'Patient-area hygiene, waste segregation' },
  { sector: 'Manufacturing', reportsTo: 'Plant admin and EHS team', scheduling: 'Around production shifts', priority: 'Shop floor, power, perimeter' },
];

export const sectorFaqs: { question: string; answer: InlineText }[] = [
  {
    question: 'Which sectors does KARGAR serve?',
    answer:
      'We serve six sectors in Pune and PCMC: housing societies, corporate offices, commercial complexes, educational institutes, healthcare facilities and manufacturing plants.',
  },
  {
    question: 'Can one contract cover housekeeping, security and maintenance?',
    answer:
      'Yes. Soft services such as housekeeping and security, and hard services such as electrical, HVAC and STP maintenance, can run as one integrated team with one point of contact. See our [facility management services](/services).',
  },
  {
    question: 'Can we take just one service instead of the full set?',
    answer:
      'Yes. Any service can be taken on its own, on an annual contract, on call, or for a one-off job such as a deep clean.',
  },
  {
    question: 'How is the team sized for our property?',
    answer:
      'We walk the property with you first, then propose the roles, shifts, checklists and SOPs it needs. The org structure is set up in accordance with the size and complexity of the site.',
  },
  {
    question: 'Our property type is not listed. Can you still help?',
    answer:
      'The six sectors above are the ones we work in. If your property is similar in how it is used, such as a mixed-use building, [contact us](/contact-us) with the details and we will tell you honestly whether it is a fit.',
  },
  {
    question: 'Do you serve properties outside Pune?',
    answer:
      'Our office is in Baner, and we serve properties across Pune and Pimpri-Chinchwad (PCMC).',
  },
];
