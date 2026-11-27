import type { PageReview, PuneLandingPageContent } from '../../domain/types';
import { heroImages } from '../heroImages';
import { contactDetails } from '@/config/contact';

/**
 * Baner locality pages (launched 2026-11-28). Each page has one primary query and a different job:
 * housekeeping = define a written cleaning scope; security = define posts and shifts;
 * maintenance = define assets and responsibilities.
 *
 * Fact rules (same as every page — seo-audit/SEO_CONTENT_PLAN.md §0):
 *  - The only verified Baner-specific fact is the office (src/config/contact.ts). No Baner clients,
 *    society names, testimonials, ratings, local statistics, staffing numbers or visit times.
 *  - Every operating claim below is already published on the matching Pune page (security.ts,
 *    housekeeping.ts, maintenance.ts); tables marked "Illustrative" are examples, not client work.
 *  - Not claimed: PSARA licence number, certifications, response times, prices, out-of-hours terms.
 *
 * These pages are reached through contextual links from their Pune parent. `locality` keeps them
 * out of hubs, the footer and sibling lists (see clusterPages in punePages.ts).
 */

const OFFICE = contactDetails.address.display;
const BANER = { name: 'Baner', postalCode: contactDetails.address.postalCode };

const REVIEW: PageReview = {
  status: 'published',
  owner: 'Operations head (service facts) with marketing (search and copy)',
  lastReviewed: '2026-11-27',
};

export const banerPages: PuneLandingPageContent[] = [
  // ───────────────────────────── HOUSEKEEPING · BANER ─────────────────────────────
  {
    path: '/housekeeping-services-baner',
    cluster: 'housekeeping',
    locality: BANER,
    parent: { label: 'Housekeeping Services Pune', href: '/housekeeping-services-pune' },
    breadcrumbLabel: 'Housekeeping in Baner',
    summary: 'Supervised contract housekeeping for housing societies and offices in Baner, Pune, planned from a written scope after a site survey.',
    seo: {
      title: 'Housekeeping Services in Baner',
      description:
        'Housekeeping services in Baner for societies and offices: a written cleaning scope, supervised police-verified staff and absence cover. Request a site survey.',
      keywords: [
        'Housekeeping Services in Baner',
        'Housekeeping Agency in Baner',
        'Housekeeping Company in Baner Pune',
        'Society Housekeeping Services in Baner',
        'Office Housekeeping Services in Baner',
      ],
    },
    eyebrow: 'Housekeeping in Baner, Pune',
    h1: 'Housekeeping Services in Baner, Pune',
    heroSubtitle:
      'Contract housekeeping for housing societies, offices and commercial buildings in Baner, carried out by supervised, police-verified staff against a written scope. Request a site survey and we will walk the property with you before we quote.',
    heroImage: heroImages.brightLobby,
    intro: [
      'KARGAR Facility Management (Kargar Business Services Pvt. Ltd.) provides contract housekeeping in Baner for housing society common areas, offices and commercial buildings. We do not quote from a rate card. We survey the property and write down what is cleaned, how often and how the work is checked. Then we propose the team, supervision and materials needed to deliver that scope.',
      `Our office is at ${OFFICE}. This page explains what to agree in a housekeeping scope, what we need from you to estimate staff, and what happens after you enquire. For the full range of housekeeping we provide across the city, see [housekeeping services in Pune](/housekeeping-services-pune).`,
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Example Housekeeping Scope for a Society or Office',
        intro:
          'Illustrative only. This is not a client contract. It shows how detailed a written scope should be, so a managing committee can see what it is paying for. Your own scope is written after the site survey.',
        caption: 'Illustrative housekeeping scope: what to agree for each area and how the work is checked',
        columns: ['Area', 'What to agree', 'How the work is checked'],
        rows: [
          ['Entrance and lift lobbies', 'Sweeping, mopping and dusting: how many times a day, and at which hours', 'Supervisor’s daily checklist'],
          ['Staircases and landings', 'How often each tower is cleaned top to bottom, including handrails', 'Daily checklist, with a weekly sign-off by the supervisor'],
          ['Lift cars', 'Buttons, mirrors, walls and floor, with extra rounds at peak hours if needed', 'Supervisor’s quality inspection'],
          ['Common washrooms', 'Cleaning and restocking frequency, and who supplies the consumables', 'Daily checklist, with restocking recorded'],
          ['Waste collection points', 'Collection times, wet and dry segregation, and cleaning of bins and garbage rooms', 'Daily checklist; mixed waste is flagged to the committee'],
          ['Periodic work', 'Machine scrubbing, high-level dusting, and deep cleaning before festivals or audits', 'Dates planned in advance; reviewed by the site manager'],
        ],
        note: 'For an office, replace the lift and staircase rows with workstations, meeting rooms and the pantry. A ready-made list is in our [office housekeeping checklist](/resources/office-housekeeping-checklist).',
      },
      {
        kind: 'prose',
        heading: 'Offices in Baner: Cleaning Around Occupancy and Business Hours',
        paragraphs: [
          'In an office, how often each area is cleaned depends on how many people use it and when. Washrooms and pantries used by a full floor need attention several times a day, not once in the morning. Work that disturbs people, such as machine scrubbing or deep cleaning of meeting rooms, is usually done before opening, after closing or on weekly offs. If your office runs two shifts or works on Saturdays, each extra shift adds people to the team, not just hours.',
          'Tell us your office hours, typical headcount and the number of washrooms and pantries, and we will build the daily routine around them. Pantry support can be part of the same arrangement.',
        ],
      },
      {
        kind: 'cards',
        heading: 'Materials, Supervision and Absence Cover',
        columns: 3,
        items: [
          { title: 'Who supplies materials', description: 'Cleaning consumables, tools and machines can be supplied by KARGAR or by your society or office. The scope states which, so the quote and the responsibility match.' },
          { title: 'Who supervises', description: 'A KARGAR housekeeping supervisor directs the team, works from the daily checklist and carries out quality inspections. The survey decides whether the site needs a full-time or periodic supervisor.' },
          { title: 'Attendance and absence', description: 'Attendance is tracked and reported digitally. Staff are on KARGAR’s payroll with PF and ESIC. When someone is absent, KARGAR arranges cover, not your committee or admin team.' },
        ],
      },
      {
        kind: 'checklist',
        heading: 'What Do You Need From Us to Estimate Housekeeping Staff?',
        intro:
          'Committees ask this more than anything else. You can enquire with only the first group; the survey fills in the rest. Our guide on [how many housekeeping staff a property needs](/resources/how-many-housekeeping-staff) shows the method we use.',
        groups: [
          {
            title: 'Enough to start',
            items: ['Property type: housing society, office or commercial building', 'Number of towers or buildings, and floors in each', 'Hours you need covered, for example one day shift or two shifts'],
          },
          {
            title: 'Helpful if you know it',
            items: [
              'Approximate common-area or office floor area',
              'Number of common washrooms and pantries, and how heavily they are used',
              'Amenities such as a clubhouse, gym or podium',
              'Periodic tasks you expect, such as monthly machine scrubbing',
              'Whether you will supply materials or want them included',
            ],
          },
          { title: 'Not needed to enquire', items: ['The exact number of staff. We work it out from the scope and shifts', 'Drawings. We walk the site with you instead'] },
        ],
      },
      {
        kind: 'prose',
        heading: 'Comparing Housekeeping Agencies in Baner',
        paragraphs: [
          'When you compare housekeeping agencies in Baner, ask each one for the same three things: a written scope by area and frequency, the role that checks the work, and what happens on a day when a staff member does not turn up. If an agency cannot answer these before you sign, it is unlikely to answer them afterwards. Our [housekeeping cost guide](/resources/housekeeping-cost-pune) explains why two quotes for the same building can differ so much.',
          `Our office is in Baner, so you can meet us there during office hours (${contactDetails.hours.replace('Mon - Sat:', 'Monday to Saturday,')}) before or after the survey. If your society or office also needs guards or technicians, the same survey can cover [security guard services in Baner](/security-services-baner) or [facility maintenance in Baner](/facility-maintenance-services-baner). These services can then sit under one [integrated facility management contract](/facility-management-company-pune).`,
        ],
      },
      {
        kind: 'steps',
        heading: 'What Happens After You Request a Site Survey',
        steps: [
          { title: 'Call back', description: 'Our housekeeping team calls to understand the property and what is not working today.' },
          { title: 'Site survey', description: 'We walk the site with you and note areas, usage, hours, and any materials and machines already there.' },
          { title: 'Written scope and proposal', description: 'You receive the task list by frequency, the staffing and supervision plan, what is included, and the commercial terms.' },
          { title: 'Mobilisation', description: 'Once agreed, staff are selected, verified and briefed, and the checklists start from day one.' },
        ],
      },
    ],
    faqs: [
      { question: 'Can our society supply its own cleaning materials?', answer: 'Yes. Materials, tools and machines can be supplied by the society or by KARGAR. The choice is written into the scope and reflected in the quote, so there is no dispute later about who buys what.' },
      { question: 'Who do residents or office staff report problems to?', answer: 'The process is agreed with the committee or admin team. Usually complaints go to the KARGAR supervisor and are recorded, so you can see what was raised and what was resolved.' },
      { question: 'How do we switch from our current housekeeping agency?', answer: 'We survey the property, agree the scope with you, and plan the changeover date so common areas stay covered throughout.' },
      { question: 'Can you run our society’s organic waste converter?', answer: 'Yes. Where a society has an organic waste converter (OWC), a trained OWC operator can be deployed as part of the housekeeping and waste team.' },
    ],
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Society Housekeeping in Pune', href: '/society-housekeeping-services-pune' },
      { label: 'How Many Housekeeping Staff Do You Need?', href: '/resources/how-many-housekeeping-staff' },
      { label: 'Security Guard Services in Baner', href: '/security-services-baner' },
      { label: 'Contact Our Baner Office', href: '/contact-us' },
    ],
    ctaHeading: 'Request a Housekeeping Site Survey in Baner',
    ctaText: 'Share the property type, the number of towers or floors and the hours you need covered. We will call to arrange a survey, then send a written scope, staffing plan and proposal.',
    ctaLabel: 'Request a Housekeeping Site Survey',
    serviceType: 'Housekeeping Services',
    enquiryService: 'housekeeping',
    review: {
      ...REVIEW,
      pendingFacts: ['Office address form: website "301, 3rd Floor, Unity Commercial" vs Company Profile "301-302, Unity Commercial, Near Amar Business Zone"'],
    },
  },

  // ───────────────────────────── SECURITY · BANER ─────────────────────────────
  {
    path: '/security-services-baner',
    cluster: 'security',
    locality: BANER,
    parent: { label: 'Security Services Pune', href: '/security-services-pune' },
    breadcrumbLabel: 'Security Guards in Baner',
    summary: 'Police-verified security guards for society gates, visitor desks and office entrances in Baner, deployed to a written post-and-shift plan.',
    seo: {
      title: 'Security Guards in Baner, Pune',
      description:
        'Security guard services in Baner for societies and offices: police-verified guards, a written post-and-shift plan and supervised posts. Request a proposal.',
      keywords: [
        'Security Guard Services in Baner',
        'Security Services in Baner',
        'Security Agency in Baner',
        'Security Guard Agency in Baner Pune',
        'Society Security Guards in Baner',
      ],
    },
    eyebrow: 'Security Guards in Baner, Pune',
    h1: 'Security Guard Services in Baner, Pune',
    heroSubtitle:
      'Trained, police-verified security guards posted at housing society gates, visitor desks and office entrances in Baner. They work to a written post-and-shift plan under a security supervisor. Request a staffing proposal and we will assess your entry points first.',
    heroImage: heroImages.security,
    intro: [
      'KARGAR provides physical guarding in Baner: security guards and watchmen posted at society gates, visitor desks and office entrances, with patrols where the site needs them. Guards are police-verified KARGAR employees with PF and ESIC compliance. They follow written post instructions and are checked by a security supervisor.',
      `Our office is at ${OFFICE}. This page is for the person who has to decide how many guards a Baner society or office needs and what they should do at each post. For our full security service across the city, see [security guard services in Pune](/security-services-pune).`,
    ],
    sections: [
      {
        kind: 'steps',
        heading: 'From Site Survey to a Post-and-Shift Plan',
        intro:
          'A society with three towers does not automatically need three guards, and a property with one gate may need more cover than expected. The guard count comes from entry points and hours, not from the number of buildings. This is how we work it out.',
        steps: [
          { title: 'Walk the entry points', description: 'We note every vehicle gate, pedestrian entrance, basement ramp and service entry, and when each one is open.' },
          { title: 'Map the traffic', description: 'We look at visitor, delivery, domestic staff and vehicle movement through the day, so the busiest hours get enough cover.' },
          { title: 'Decide the posts', description: 'Each point becomes a fixed post, a part-time post or part of a patrol route. Some points can simply be closed at night; that is your decision.' },
          { title: 'Plan the shifts', description: 'Post hours are turned into shifts, with relief for weekly offs, and a supervisor where there are several posts or shifts.' },
          { title: 'Put it in writing', description: 'The post plan, post instructions and the records you will receive are set out in the proposal before anyone is deployed.' },
        ],
      },
      {
        kind: 'table',
        heading: 'Vehicle Gate, Visitor Desk and Patrol: What to Agree',
        intro: 'Illustrative. These are three common assignments, with what you and KARGAR should agree for each before deployment.',
        caption: 'Illustrative security assignments and what to agree for each',
        columns: ['Assignment', 'What the guard does', 'What you and KARGAR agree'],
        rows: [
          ['Vehicle gate', 'Operates the gate, checks resident vehicles, and logs visitor and delivery vehicles', 'Which vehicles enter without checks, visitor parking rules, and gate hours'],
          ['Visitor desk', 'Verifies visitors with the resident or host, records entries in the register or app, and handles deliveries', 'How visitors are verified, where deliveries are left, and rules for late-night entry'],
          ['Patrolling', 'Walks a set route through towers, podium, parking and perimeter at set intervals', 'The route, how often it is walked, what is checked, and how each round is recorded'],
        ],
        note: 'The written gate procedures we use for societies are on our [society security services](/society-security-services-pune) page.',
      },
      {
        kind: 'cards',
        heading: 'Supervision, Records and Escalation',
        columns: 2,
        items: [
          { title: 'Supervision', description: 'A security supervisor plans the shifts, briefs guards on the post instructions and checks that each post follows them. The supervisor is the first escalation point for your committee or admin team.' },
          { title: 'Visitor and incident records', description: 'Visitor and vehicle logs, attendance and incident reports give you a record you can audit. The proposal says how and how often they are shared with you.' },
          { title: 'Shift handover', description: 'Handover between shifts is part of the written post instructions, so the incoming guard knows what is pending.' },
          { title: 'Absence cover and escalation', description: 'Relief for weekly offs is built into the post plan, and KARGAR replaces a guard who is absent. Issues escalate from the guard to the supervisor and then to KARGAR management.' },
        ],
      },
      {
        kind: 'checklist',
        heading: 'What to Share for a Security Proposal',
        intro: 'You can enquire with only the first group. The rest helps us arrive at the assessment prepared.',
        groups: [
          {
            title: 'Enough to start',
            items: ['Property type: housing society, office or commercial building', 'Number of entrances, including pedestrian and service gates', 'Hours each entrance is open, and whether you need night cover'],
          },
          {
            title: 'Helpful if you know it',
            items: [
              'Visitor and delivery patterns, for example an evening delivery peak',
              'Your current posts and who staffs them today',
              'Society rules, gate procedures or office access procedures the guards must follow',
              'Any visitor-management app or register already in use',
            ],
          },
          { title: 'Not needed to enquire', items: ['The number of guards. We work it out from posts and shifts', 'A budget figure. The proposal shows what each option costs'] },
        ],
      },
      {
        kind: 'prose',
        heading: 'Checking a Security Agency in Baner',
        paragraphs: [
          'Whichever security agency in Baner you speak to, ask for its licence under the Private Security Agencies (Regulation) Act, 2005, its PF and ESIC registration, and police verification records for the guards it will deploy. Check these documents yourself before you sign. Our [guide to choosing a security agency in Pune](/resources/how-to-choose-a-security-agency-pune) explains each check.',
          'If your society also needs its common areas cleaned, the same survey can cover [housekeeping services in Baner](/housekeeping-services-baner). Gate and common-area staff can then report to one site manager under [integrated facility management](/facility-management-company-pune).',
        ],
      },
    ],
    faqs: [
      { question: 'How do we estimate guard cover across two entrances?', answer: 'Start with hours, not gates. If both entrances are open round the clock, each needs its own post on three 8-hour shifts, plus relief for weekly offs. If the second gate can be closed at night, it may need only a day post, or it can be covered by a patrol. We confirm this at the site assessment.' },
      { question: 'Are your security guards police-verified?', answer: 'Yes. Security personnel go through police verification and background checks before deployment.' },
      { question: 'Can your guards use our visitor-management app?', answer: 'Yes. Guards are trained on your society’s visitor procedure, whether it is app-based or register-based.' },
      { question: 'Who does the committee contact when something goes wrong?', answer: 'The security supervisor first, then the site manager and KARGAR management through the agreed escalation path.' },
    ],
    relatedLinks: [
      { label: 'Security Guard Services in Pune', href: '/security-services-pune' },
      { label: 'Society Security Services', href: '/society-security-services-pune' },
      { label: 'How to Choose a Security Agency', href: '/resources/how-to-choose-a-security-agency-pune' },
      { label: 'Housekeeping Services in Baner', href: '/housekeeping-services-baner' },
      { label: 'Contact Our Baner Office', href: '/contact-us' },
    ],
    ctaHeading: 'Request a Security Staffing Proposal for Your Baner Property',
    ctaText: 'Share the property type, number of entrances and the hours you need covered. We will assess the site and send a written post-and-shift plan with the proposal.',
    ctaLabel: 'Request a Security Staffing Proposal',
    serviceType: 'Security Guard Services',
    enquiryService: 'security',
    review: {
      ...REVIEW,
      pendingFacts: [
        'PSARA licence number and validity (page tells buyers to ask any agency for one; KARGAR licence not stated until confirmed)',
        'Office address form (see housekeeping Baner entry)',
      ],
    },
  },

  // ───────────────────────────── FACILITY MAINTENANCE · BANER ─────────────────────────────
  {
    path: '/facility-maintenance-services-baner',
    cluster: 'maintenance',
    locality: BANER,
    parent: { label: 'Facility Maintenance Pune', href: '/facility-maintenance-services-pune' },
    breadcrumbLabel: 'Facility Maintenance in Baner',
    summary: 'Technical maintenance of electrical, pump, plumbing and HVAC systems for societies and commercial buildings in Baner, with resident technicians and OEM coordination.',
    seo: {
      title: 'Facility Maintenance in Baner',
      description:
        'Facility maintenance services in Baner for societies and offices: electrical, pumps, plumbing, HVAC, on-site technicians and OEM coordination. Get a quote.',
      keywords: [
        'Facility Maintenance Services in Baner',
        'Building Maintenance Services in Baner',
        'Technical Maintenance Services in Baner',
        'Facility Maintenance Agency in Baner',
      ],
    },
    eyebrow: 'Facility Maintenance in Baner, Pune',
    h1: 'Facility Maintenance Services in Baner, Pune',
    heroSubtitle:
      'Technical maintenance for housing societies, offices and commercial buildings in Baner. We keep electrical systems, pumps, plumbing and HVAC on a preventive schedule, provide resident technicians where you need them, and coordinate breakdowns with OEMs. Tell us what your building has and we will discuss the right scope.',
    heroImage: heroImages.technicians,
    intro: [
      '“Maintenance services” can mean anything from fixing a tap in a flat to running a building’s plant room. KARGAR’s facility maintenance in Baner is the second kind. It covers the technical systems that serve a whole society or commercial building, maintained under a contract with a defined asset list, a preventive schedule and an agreed escalation path. Work inside individual flats is not part of this service unless agreed separately with the society.',
      `Our office is at ${OFFICE}. This page helps a Baner committee, facility manager or building owner decide what to put in a maintenance scope before asking for a quote. For the full list of systems we maintain across the city, see [facility maintenance services in Pune](/facility-maintenance-services-pune).`,
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Four Kinds of Maintenance Work, and Who Does Each',
        caption: 'Scheduled checks, breakdown coordination, on-site technicians and specialist work compared',
        columns: ['Type of work', 'What it means', 'Who usually does it'],
        rows: [
          ['Scheduled checks (PPM)', 'Planned preventive maintenance on a calendar built from OEM recommendations and how the building is used', 'KARGAR technicians, under the maintenance contract'],
          ['Breakdown coordination', 'Faults outside the schedule, handled through an agreed escalation path', 'KARGAR handles first-level work and brings in the OEM or a specialist vendor where needed'],
          ['On-site technical staffing', 'Electricians, plumbers, STP operators, fire technicians or lift operators based at the property for daily rounds and complaints', 'KARGAR resident technicians'],
          ['Specialist or OEM work', 'Repairs under warranty, lift servicing under the lift AMC, and work such as HT equipment or new installations, confirmed case by case', 'The OEM or specialist vendor, coordinated by KARGAR'],
        ],
      },
      {
        kind: 'table',
        heading: 'Example Asset Scope for a Baner Building',
        intro: 'Illustrative only. Your actual asset list is built with you during the survey.',
        caption: 'Illustrative asset scope: what to confirm and what we need for a quote',
        columns: ['Asset or system', 'Scope to confirm', 'Information needed for a quote'],
        rows: [
          ['Common-area electrical: LT panels, DBs, lighting', 'Preventive calendar, daily rounds, and who handles tripping and faults', 'Number of panels and DBs, common lighting areas, recent faults'],
          ['DG set and UPS', 'Scheduled running, operation during power cuts, battery checks', 'DG capacity in kVA, UPS capacity and battery count, existing OEM contract'],
          ['Water pumps and tanks', 'Pump operation and standby rotation, tank inspection and cleaning schedule', 'Number of pumps and tanks (overhead and underground), how water is supplied'],
          ['Common plumbing', 'Leak rounds, common washroom fixtures, blockage clearing in common drainage', 'Number of towers, shafts and common washrooms, areas with recurring leaks'],
          ['HVAC (offices and commercial buildings)', 'AHU, FCU or VRV/VRF upkeep on the OEM schedule', 'Equipment type, number of units, current AMC vendor'],
        ],
        note: 'Each system has its own page: [electrical maintenance](/electrical-maintenance-services-pune), [plumbing and water systems](/plumbing-maintenance-services-pune) and [HVAC maintenance](/hvac-maintenance-services-pune).',
      },
      {
        kind: 'prose',
        heading: 'What Shapes the Proposal',
        paragraphs: [
          'Five things decide the size and cost of a maintenance contract. The asset list sets what is maintained. Operating hours decide whether a technician is needed on site all day, across shifts or only on call. Existing annual maintenance contracts (AMCs) with OEMs stay in place for work only they can do, so our scope starts where theirs ends. Technician coverage, meaning which trades are resident and which are on call, sets the headcount. Escalation responsibilities decide who calls the OEM, who approves a repair and who informs the committee or owner.',
          'Societies with lifts, a DG, an STP and solar panels often need a resident technician team; see [building maintenance services](/building-maintenance-services-pune). A smaller office building may need only a preventive contract with on-call support.',
        ],
      },
      {
        kind: 'compare',
        heading: 'What Is Usually Included, and What Is Agreed Separately',
        intro: 'Exact terms vary by contract and are listed in your proposal. This is the usual split.',
        left: {
          title: 'Usually part of the maintenance contract',
          items: [
            'Labour of the technicians named in the contract, for preventive maintenance and daily rounds',
            'Breakdown coordination through the agreed escalation path',
            'A maintenance record for each asset, reported daily, weekly and monthly',
          ],
        },
        right: {
          title: 'Agreed separately or case by case',
          items: [
            'Consumables, spare parts and replacement equipment',
            'Specialist and OEM repairs, including work under warranty',
            'Out-of-hours or extra technician cover beyond the agreed shifts',
            'New installation or rewiring projects',
          ],
        },
      },
      {
        kind: 'steps',
        heading: 'How We Start a Maintenance Contract',
        steps: [
          { title: 'Asset survey', description: 'We list the systems and equipment, their condition, and any existing AMCs or OEM warranties.' },
          { title: 'PPM calendar', description: 'A preventive schedule is built from OEM recommendations and how the building is used.' },
          { title: 'Breakdown process', description: 'Escalation and coordination with OEMs or specialist vendors are agreed for faults outside the schedule.' },
          { title: 'Reporting', description: 'Completed PPM, open issues and breakdowns are reported daily, weekly and monthly.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Maintenance With Housekeeping or Security',
        paragraphs: [
          'If your building also needs cleaning or guards, maintenance can be combined with [housekeeping services in Baner](/housekeeping-services-baner) and [security guard services in Baner](/security-services-baner) under one [integrated facility management contract](/facility-management-company-pune), with one site manager responsible for all three.',
        ],
      },
    ],
    faqs: [
      { question: 'Can your team coordinate with our existing lift maintenance vendor?', answer: 'Yes. Lift servicing stays with the lift AMC. Our team operates and checks the equipment day to day, logs faults, and coordinates and tracks the AMC vendor’s visits.' },
      { question: 'Do we need to cancel our existing AMCs?', answer: 'Usually not. OEM and specialist AMCs remain for work only they can do. We follow the OEM schedules and coordinate with those vendors.' },
      { question: 'Can a technician be based at our society full time?', answer: 'Yes. Electricians, plumbers, STP operators, fire technicians and other technicians can be deployed on site, usually as a team sized to the building.' },
      { question: 'Are spare parts included in the contract?', answer: 'Spare parts and replacement equipment are agreed case by case and listed in the proposal, so you know before signing what is included.' },
    ],
    relatedLinks: [
      { label: 'Facility Maintenance in Pune', href: '/facility-maintenance-services-pune' },
      { label: 'Building Maintenance Services', href: '/building-maintenance-services-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
      { label: 'Contact Our Baner Office', href: '/contact-us' },
    ],
    ctaHeading: 'Discuss Your Building’s Maintenance Requirements',
    ctaText: 'Tell us which systems your Baner property has and how they are maintained today. We will survey the assets and propose a preventive plan and technician cover.',
    ctaLabel: 'Discuss Your Maintenance Requirements',
    serviceType: 'Facility Maintenance',
    enquiryService: 'facility-maintenance',
    review: {
      ...REVIEW,
      pendingFacts: ['Spares and consumables billing basis (stated as case by case)', 'Out-of-hours cover terms (stated as agreed separately)', 'Office address form (see housekeeping Baner entry)'],
    },
  },
];
