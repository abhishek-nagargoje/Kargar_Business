import type { PuneLandingPageContent } from '../../domain/types';
import { heroImages } from '../heroImages';

const PILLAR = { label: 'Housekeeping Services Pune', href: '/housekeeping-services-pune' };

/**
 * Housekeeping cluster. Every KARGAR-specific claim must trace to the Company Profile / Brochure
 * PDFs or companyTrust.ts — see seo-audit/SEO_CONTENT_PLAN.md §0. No prices, client names,
 * headcounts, response-time promises or certifications.
 */
export const housekeepingPages: PuneLandingPageContent[] = [
  // ───────────────────────────── PILLAR ─────────────────────────────
  {
    path: '/housekeeping-services-pune',
    cluster: 'housekeeping',
    isPillar: true,
    breadcrumbLabel: 'Housekeeping Services Pune',
    summary: 'Supervised housekeeping teams for offices, commercial buildings, housing societies, schools, clinics and plants across Pune and PCMC.',
    seo: {
      title: 'Housekeeping Services in Pune',
      description:
        'Professional housekeeping services in Pune for offices, housing societies, commercial buildings, schools and plants — trained, supervised staff from KARGAR.',
      keywords: ['Housekeeping Services in Pune', 'Housekeeping Company Pune', 'Professional Housekeeping Services Pune'],
    },
    eyebrow: 'Housekeeping in Pune',
    h1: 'Professional Housekeeping Services in Pune',
    heroSubtitle:
      'KARGAR deploys trained, police-verified housekeeping teams — with on-site supervision, attendance tracking and documented checklists — for offices, commercial buildings, housing societies, educational institutes, healthcare facilities and manufacturing sites across Pune and PCMC.',
    heroImage: heroImages.lobbyScrubbing,
    intro: [
      'KARGAR Facility Management (Kargar Business Services Pvt. Ltd.) is a housekeeping and integrated facility management company based in Baner, Pune. We provide housekeeping as a managed service: we recruit, verify, train and deploy the staff, supervise their work on site, manage attendance and payroll, and report on the results — so the person responsible for the property deals with one accountable team instead of individual workers or several vendors.',
      'Our housekeeping work in Pune covers premium residential societies, corporate and commercial offices, commercial complexes, schools and educational institutes, healthcare facilities and manufacturing plants. The scope is built around your site: daily, weekly and monthly cleaning, deep cleaning, washroom hygiene, pantry support, wet/dry waste segregation and consumables management.',
    ],
    sections: [
      {
        kind: 'cards',
        heading: 'Housekeeping for Every Type of Pune Property',
        intro: 'The same operating model, adapted to how each property is actually used. Each link below explains that property type in detail.',
        columns: 4,
        items: [
          { title: 'Housing societies', description: 'Lobbies, staircases, lifts, podiums, clubhouses, gardens and waste areas, run for the managing committee. See [society housekeeping in Pune](/society-housekeeping-services-pune).' },
          { title: 'Commercial buildings', description: 'Shared lobbies, washroom blocks, corridors and parking in multi-tenant buildings. See [commercial housekeeping services](/commercial-housekeeping-services-pune).' },
          { title: 'Corporate campuses', description: 'Multi-floor, multi-shift offices with admin-led reporting and audits. See [corporate housekeeping in Pune](/corporate-housekeeping-services-pune).' },
          { title: 'Small and mid-size offices', description: 'One to a few floors, often with pantry and office-boy support. See [office housekeeping services](/office-housekeeping-services-pune).' },
          { title: 'Schools and institutes', description: 'Classrooms, washrooms and grounds cleaned around the academic timetable. See [school housekeeping](/school-housekeeping-services-pune).' },
          { title: 'Plants and warehouses', description: 'Shop floors, canteens and amenities cleaned around production shifts. See [industrial housekeeping in Pune](/industrial-housekeeping-services-pune).' },
          { title: 'Clinics and healthcare', description: 'Supervised housekeeping that follows your facility’s infection-control protocols. See [healthcare housekeeping](/healthcare-housekeeping-services-pune).' },
          { title: 'Staff only', description: 'Prefer to direct the team yourself? We also supply verified [housekeeping staff and manpower](/housekeeping-staff-pune) on our payroll.' },
        ],
      },
      {
        kind: 'table',
        heading: 'What Our Housekeeping Scope Typically Includes',
        intro: 'Every site gets its own written scope. This is the starting framework we tailor during the site survey.',
        caption: 'Typical housekeeping tasks by frequency',
        columns: ['Frequency', 'Typical tasks', 'Who checks it'],
        rows: [
          ['Daily', 'Sweeping and mopping, dusting of work and common areas, washroom cleaning and restocking, trash removal, pantry upkeep, wet/dry waste segregation', 'Housekeeping supervisor on the daily checklist'],
          ['Weekly', 'Glass and partition cleaning, high-touch fixture sanitisation, detailed washroom descaling, furniture and upholstery vacuuming', 'Supervisor with a weekly sign-off'],
          ['Monthly', 'Machine scrubbing of hard floors, high-level dusting, fan and light-fixture cleaning, storage and back-of-house areas', 'Site/facility manager review'],
          ['Periodic / on request', 'Deep cleaning before events, audits, festivals or move-ins; post-renovation cleaning', 'Planned with the client in advance'],
        ],
        note: 'Want a ready-made version for your office? Use our [office housekeeping checklist](/resources/office-housekeeping-checklist).',
      },
      {
        kind: 'steps',
        heading: 'How We Set Up Housekeeping at Your Site (PURNA)',
        intro: 'PURNA is KARGAR’s operating protocol for every site we manage — the same five steps whether it is a 3-person office team or a full society deployment.',
        steps: [
          { title: 'Prepare', description: 'We survey the site and write the scope, checklists and SOPs: which areas, which frequencies, how many people on which shifts, and what materials are needed.' },
          { title: 'Unite', description: 'Manpower, machines and management are brought under one org structure for the site — staff, a supervisor and an escalation contact — so nothing depends on a single person.' },
          { title: 'Reset', description: 'Processes and teams are aligned with any existing vendors at the site so related functions (security, maintenance, waste pickup) work together rather than around each other.' },
          { title: 'Nurture', description: 'Staff are trained and retained. Year-round skill, safety and behavioural training is run by our Field Trainers and Quality Managers.' },
          { title: 'Analyse', description: 'Performance is reviewed through feedback systems and KARGAR’s regional management, and reported to you with improvements identified.' },
        ],
      },
      {
        kind: 'cards',
        heading: 'Supervision, Quality Control and Staffing',
        columns: 2,
        items: [
          { title: 'Verified, trained staff', description: 'Housekeeping personnel go through police verification and background checks before deployment, then continuous on-the-job training.' },
          { title: 'Supervision you can see', description: 'Supervisors work from daily cleaning checklists and carry out quality inspections — not just a monthly visit from a sales contact.' },
          { title: 'Attendance and digital reporting', description: 'Attendance is tracked and reporting is digital, so you can see who was on site and what was completed. Read how to size a team in our [staffing guide](/resources/how-many-housekeeping-staff).' },
          { title: 'Compliance and payroll transparency', description: 'Staff are covered for PF and ESIC in line with labour law. Under KARGAR’s 100% financial transparency commitment, you can ask what compensation is paid to the staff deployed at your site. More on [housekeeping staff in Pune](/housekeeping-staff-pune).' },
        ],
      },
      {
        kind: 'compare',
        heading: 'In-House Cleaners or an Outsourced Housekeeping Company?',
        intro: 'Many Pune properties start with directly hired cleaners. This is what typically changes when housekeeping is outsourced to a managed provider.',
        left: {
          title: 'Directly hired staff',
          items: [
            'You recruit, verify and replace people yourself',
            'Attendance, leave and payroll compliance sit with you',
            'Quality depends on whoever is on duty that day',
            'Materials and machines are bought and tracked separately',
          ],
        },
        right: {
          title: 'Managed housekeeping with KARGAR',
          items: [
            'One provider is accountable for staffing and continuity',
            'PF/ESIC compliance and payroll handled by KARGAR',
            'Checklists, supervision and inspections define quality',
            'Consumables, tools and tackles managed as part of scope',
          ],
        },
      },
      {
        kind: 'prose',
        heading: 'Where We Work in Pune',
        paragraphs: [
          'We operate from Baner and deploy teams across Pune and Pimpri-Chinchwad (PCMC) — from the western residential and IT belt around Baner, Balewadi, Aundh, Wakad and Hinjewadi to the eastern business districts around Kharadi, Viman Nagar, Hadapsar and Magarpatta, as well as industrial areas in PCMC. Because the staff for a site are deployed to that site, coverage is planned per property during the survey rather than by a fixed map.',
          'If housekeeping is one of several services you need, it can be combined with [security services](/security-services-pune), [facility maintenance](/facility-maintenance-services-pune) and support staff under our [integrated facility management in Pune](/facility-management-company-pune).',
        ],
      },
      {
        kind: 'checklist',
        heading: 'What to Evaluate Before Hiring a Housekeeping Company',
        intro: 'Whichever provider you choose, these are the questions that separate a reliable contract from a staffing headache. Our full [guide to choosing a housekeeping company in Pune](/resources/how-to-choose-a-housekeeping-company-pune) goes deeper.',
        groups: [
          { title: 'People', items: ['Are staff police-verified before deployment?', 'Who trains them, and how often?', 'How are absences and replacements handled?'] },
          { title: 'Process', items: ['Is there a written scope with daily, weekly and monthly tasks?', 'Who supervises, and how is quality inspected?', 'What reports will you receive?'] },
          { title: 'Commercials', items: ['Are PF and ESIC paid and provable?', 'Can you see what the deployed staff are actually paid?', 'What is included: materials, machines, consumables? See [what drives housekeeping cost](/resources/housekeeping-cost-pune).'] },
        ],
      },
    ],
    faqs: [
      { question: 'Which types of properties does KARGAR provide housekeeping for in Pune?', answer: 'Residential societies, corporate and commercial offices, commercial complexes, educational institutes, healthcare facilities and manufacturing sites. Scope and staffing are planned separately for each property.' },
      { question: 'How much do housekeeping services cost in Pune?', answer: 'There is no single rate — cost depends mainly on the number of staff, shifts and working hours, the area and its usage, the frequency of deep cleaning, and whether materials and machines are included. We quote after a site survey. Our [housekeeping cost guide](/resources/housekeeping-cost-pune) explains each factor.' },
      { question: 'How many housekeeping staff will my property need?', answer: 'It depends on the cleanable area, footfall, washroom count, operating hours and the scope you choose. We work this out during the survey; our [staffing guide](/resources/how-many-housekeeping-staff) shows the method.' },
      { question: 'Are your housekeeping staff verified?', answer: 'Yes. Personnel go through police verification and background checks before deployment, and receive ongoing skill, safety and behavioural training.' },
      { question: 'Do you supply cleaning materials and machines?', answer: 'Consumables, tools and tackles can be managed by KARGAR as part of the contract, or supplied by you — this is agreed in the scope so cost and responsibility are clear.' },
      { question: 'Can housekeeping be combined with security or maintenance?', answer: 'Yes. Many clients run housekeeping alongside security and technical maintenance under one [facility management contract](/facility-management-company-pune), with one point of contact.' },
      { question: 'How do I get a housekeeping proposal?', answer: 'Share your property type, approximate area, working hours and current setup through our contact page. We follow up to arrange a site survey and then send a written proposal.' },
    ],
    serviceDetailLink: { label: 'housekeeping service details', href: '/services/soft-services/housekeeping' },
    relatedLinks: [
      { label: 'Society Housekeeping in Pune', href: '/society-housekeeping-services-pune' },
      { label: 'Corporate Housekeeping in Pune', href: '/corporate-housekeeping-services-pune' },
      { label: 'Housekeeping Staff & Manpower', href: '/housekeeping-staff-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
    ],
    ctaHeading: 'Get a Housekeeping Proposal for Your Pune Property',
    ctaText: 'Tell us the property type, area and working hours. We will arrange a site survey and send a written scope and proposal.',
    ctaLabel: 'Get Housekeeping Proposal',
    serviceType: 'Housekeeping Services',
  },

  // ───────────────────────────── COMMERCIAL ─────────────────────────────
  {
    path: '/commercial-housekeeping-services-pune',
    cluster: 'housekeeping',
    parent: PILLAR,
    breadcrumbLabel: 'Commercial Housekeeping',
    summary: 'Common-area housekeeping for multi-tenant commercial buildings and complexes: lobbies, washroom blocks, corridors and parking.',
    seo: {
      title: 'Commercial Housekeeping in Pune',
      description:
        'Commercial housekeeping services in Pune for multi-tenant buildings and complexes — lobbies, washroom blocks, corridors and parking, supervised by KARGAR.',
      keywords: ['Commercial Housekeeping Services Pune', 'Commercial Building Cleaning Pune', 'Commercial Complex Housekeeping Pune'],
    },
    eyebrow: 'Commercial Housekeeping',
    h1: 'Commercial Housekeeping Services in Pune',
    heroSubtitle:
      'Housekeeping for the shared spaces of commercial buildings and complexes — the areas every tenant and visitor judges the building by, and that no single tenant is responsible for.',
    heroImage: heroImages.brightLobby,
    intro: [
      'In a multi-tenant commercial building, each tenant usually looks after its own office. Everything in between — the entrance lobby, lift lobbies, corridors, staircases, common washroom blocks, parking levels and the building surroundings — belongs to the owner, developer or association. Those areas carry the heaviest footfall and are the first thing a prospective tenant notices.',
      'KARGAR provides commercial housekeeping for these shared areas. The buyer is typically a building owner, a property manager or a commercial complex association, and the job is to keep common areas consistently presentable through the whole business day, not just at opening time.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Commercial Building Zones and How Each Is Covered',
        caption: 'Housekeeping coverage by zone in a commercial building',
        columns: ['Zone', 'What is done', 'Typical rhythm'],
        rows: [
          ['Entrance and lift lobbies', 'Floor mopping and machine scrubbing, glass doors, reception counters, lift interiors and buttons', 'Opening clean, then repeat rounds through the day'],
          ['Common washroom blocks', 'Cleaning, sanitising, restocking soap and paper, odour control, checklist sign-off', 'Several rounds per shift based on footfall'],
          ['Corridors and staircases', 'Sweeping, mopping, handrail wiping, fire-exit routes kept clear of debris', 'Daily, with spot cleaning'],
          ['Parking and driveways', 'Sweeping, oil-spot treatment, litter pickup, ramp cleaning', 'Daily sweep, periodic wash'],
          ['Waste collection points', 'Wet/dry segregation, bin cleaning, handover to the collection agency', 'Daily'],
          ['Façade-level glass (ground floor)', 'Shopfront and entrance glass reachable without access equipment', 'Weekly or as agreed'],
        ],
      },
      {
        kind: 'cards',
        heading: 'Planning Coverage Around Business Hours',
        columns: 3,
        items: [
          { title: 'Before opening', description: 'The heavy work — floor scrubbing, washroom deep clean, waste clearance — is done before tenants and visitors arrive.' },
          { title: 'During the day', description: 'Roving staff keep lobbies, lifts and washrooms presentable as footfall peaks around office arrival, lunch and exit times.' },
          { title: 'After hours', description: 'Where the building permits, periodic jobs like machine scrubbing and high-level dusting are scheduled when common areas are empty.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Why Common Areas Need a Different Approach from Offices',
        paragraphs: [
          'Office housekeeping is planned around one occupier’s team. Common-area housekeeping has to work for many tenants at once, with complaints arriving from several directions. That is why we put a supervisor and a written zone-wise checklist at the centre of every commercial deployment: when a tenant raises an issue, there is a record of what was done and when, and one person responsible for fixing it.',
          'Commercial complexes also tend to combine housekeeping with other building services. If your building needs security at the gates or technical upkeep of lifts, pumps and electrical rooms, these can be coordinated together under [commercial facility management](/commercial-facility-management-pune) rather than as separate contracts.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Getting Started',
        steps: [
          { title: 'Walk-through', description: 'We walk the common areas with your property manager and note footfall, problem spots and existing arrangements.' },
          { title: 'Zone-wise scope', description: 'We write the zones, tasks and frequencies, and the staffing per shift needed to deliver them.' },
          { title: 'Deployment', description: 'Verified, trained staff are deployed with a supervisor and the agreed checklists.' },
          { title: 'Reporting', description: 'Daily checklist records and periodic reporting give the owner or association a clear view of service delivery.' },
        ],
      },
    ],
    faqs: [
      { question: 'Do you clean individual tenant offices in a commercial building?', answer: 'Our commercial housekeeping contract usually covers common areas for the owner or association. Individual tenants can engage us separately for their own premises — see [office housekeeping services](/office-housekeeping-services-pune).' },
      { question: 'Can you take over from an existing housekeeping vendor?', answer: 'Yes. We plan the transition with the property manager so common areas are not left uncovered during the changeover.' },
      { question: 'Do you handle waste segregation in commercial complexes?', answer: 'Yes. Wet/dry waste segregation and handover to the collection agency are part of our waste management scope.' },
      { question: 'Are cleaning materials included?', answer: 'They can be. Consumables, tools and tackles can be managed by KARGAR or supplied by the building — this is set out in the scope.' },
    ],
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Commercial Facility Management', href: '/commercial-facility-management-pune' },
      { label: 'Corporate Housekeeping', href: '/corporate-housekeeping-services-pune' },
    ],
    ctaHeading: 'Plan Common-Area Housekeeping for Your Building',
    ctaText: 'Share the building size, number of floors and tenants, and current arrangements. We will propose a zone-wise scope.',
    serviceType: 'Commercial Housekeeping',
  },

  // ───────────────────────────── CORPORATE ─────────────────────────────
  {
    path: '/corporate-housekeeping-services-pune',
    cluster: 'housekeeping',
    parent: PILLAR,
    breadcrumbLabel: 'Corporate Housekeeping',
    summary: 'Multi-floor, multi-shift housekeeping for corporate offices and IT-park campuses, with admin-led reporting and escalation.',
    seo: {
      title: 'Corporate Housekeeping in Pune',
      description:
        'Corporate housekeeping services in Pune for multi-floor offices and IT-park campuses — shift-based teams, supervisor checklists and reporting to your admin.',
      keywords: ['Corporate Housekeeping Services Pune', 'IT Park Housekeeping Pune', 'Corporate Office Cleaning Pune'],
    },
    eyebrow: 'Corporate Housekeeping',
    h1: 'Corporate Housekeeping Services in Pune',
    heroSubtitle:
      'For admin and facility teams running large offices in Pune: housekeeping organised by floor and shift, measured against checklists, and reported in a way you can take to your own management.',
    heroImage: heroImages.lobbyScrubbing,
    intro: [
      'Corporate housekeeping is less about cleaning techniques and more about governance. A large office has many floors, meeting rooms, pantries and washrooms, often more than one shift, visiting clients, and an admin or HR team that has to answer for the workplace experience. What that team needs from a housekeeping partner is predictability: the same standard every day, a clear owner when something slips, and records that hold up in an internal audit.',
      'KARGAR works with corporate offices in Pune on that basis. Housekeeping teams are deployed with supervisors, daily checklists and attendance tracking, and the contract is managed through a single escalation path.',
    ],
    sections: [
      {
        kind: 'cards',
        heading: 'Standards for the Spaces People Notice',
        columns: 2,
        items: [
          { title: 'Reception and visitor areas', description: 'Kept presentable throughout the day, with attention timed around client visits and peak arrival hours.' },
          { title: 'Meeting and conference rooms', description: 'Reset between meetings where the schedule allows: tables wiped, waste cleared, chairs arranged.' },
          { title: 'Pantries and cafeterias', description: 'Counters, sinks and appliances cleaned, crockery handled and consumables refilled as part of pantry services.' },
          { title: 'Washrooms', description: 'Cleaned and restocked on a fixed round, signed off on a checklist so gaps are visible rather than discovered by employees.' },
        ],
      },
      {
        kind: 'steps',
        heading: 'Governance: How the Contract Is Run',
        steps: [
          { title: 'Written scope and SOPs', description: 'Floor-wise and shift-wise scope, agreed before deployment and updated when your office layout or headcount changes.' },
          { title: 'Supervisor ownership', description: 'A supervisor owns each shift’s checklist and is the first point of contact for your admin team.' },
          { title: 'Inspections', description: 'Quality inspections check the work against the checklist; issues are recorded and closed, not just verbally passed on.' },
          { title: 'Reporting and review', description: 'Daily, weekly and monthly reporting, with KARGAR regional management reviewing performance and improvements with you.' },
          { title: 'Escalation', description: 'A defined escalation path above the supervisor, with 24x7 support for urgent issues.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Changing Housekeeping Vendors Without Disruption',
        paragraphs: [
          'Most corporate clients come to us from an existing vendor. The risk in a changeover is the gap between one team leaving and the next settling in. We plan transitions around the PURNA protocol: the scope and checklists are prepared before day one, and where existing staff are performing well, we discuss retaining them so the office keeps people who already know the site.',
          'If your office also needs front-desk, mailroom or helpdesk support, those support services can be added under [office facility management](/office-facility-management-pune). For smaller single-floor offices, our [office housekeeping service](/office-housekeeping-services-pune) is usually a better fit.',
        ],
      },
      {
        kind: 'callout',
        heading: 'Payroll you can verify',
        text: 'Corporate compliance teams often ask whether outsourced staff are being paid properly. KARGAR’s 100% financial transparency commitment means you have the right to ask what compensation is paid to staff deployed at your site, and PF and ESIC are handled in line with labour law.',
      },
    ],
    faqs: [
      { question: 'Can you provide housekeeping across multiple shifts?', answer: 'Yes. Staffing and supervision are planned per shift, so night or extended-hours operations have their own checklist and supervisor coverage.' },
      { question: 'What reports do corporate clients receive?', answer: 'Checklist records and attendance, with daily, weekly and monthly reporting reviewed with your admin or facilities team.' },
      { question: 'Do you provide pantry and office-boy staff as well?', answer: 'Yes. Pantry services and office-boy roles can be included alongside housekeeping in the same contract.' },
      { question: 'How do you handle a complaint from our employees?', answer: 'It goes to the shift supervisor first, is recorded and closed, and escalates to KARGAR management if it is not resolved.' },
    ],
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Office Facility Management', href: '/office-facility-management-pune' },
      { label: 'How to Choose a Housekeeping Company', href: '/resources/how-to-choose-a-housekeeping-company-pune' },
    ],
    ctaHeading: 'Talk to Us About Your Corporate Office',
    ctaText: 'Share your floors, headcount, shifts and current vendor arrangement, and we will propose a governed housekeeping setup.',
    serviceType: 'Corporate Housekeeping',
  },

  // ───────────────────────────── OFFICE ─────────────────────────────
  {
    path: '/office-housekeeping-services-pune',
    cluster: 'housekeeping',
    parent: PILLAR,
    breadcrumbLabel: 'Office Housekeeping',
    summary: 'Right-sized housekeeping, pantry and office-boy support for small and mid-size offices in Pune.',
    seo: {
      title: 'Office Housekeeping in Pune',
      description:
        'Office housekeeping services in Pune for small and mid-size offices — trained housekeeping and pantry staff, daily checklists and consumables managed by KARGAR.',
      keywords: ['Office Housekeeping Services Pune', 'Office Cleaning Staff Pune', 'Office Boy Services Pune'],
    },
    eyebrow: 'Office Housekeeping',
    h1: 'Office Housekeeping Services in Pune',
    heroSubtitle:
      'For offices of one to a few floors: one or a few well-trained people, a clear daily routine, and someone accountable when they are absent.',
    heroImage: heroImages.officeCleaning,
    intro: [
      'A small or mid-size office rarely needs a large housekeeping team. It needs the right person or two, doing a consistent routine — and a provider that makes sure the office is not left without cover when that person is on leave. That is where most directly hired arrangements break down.',
      'KARGAR provides office housekeeping in Pune with trained, verified staff, a written daily routine, and supervision from our side. Pantry support and office-boy duties can be part of the same arrangement, so the office manager has one provider for the whole day-to-day upkeep of the workplace.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'A Typical Office Housekeeping Day',
        caption: 'Example daily routine for office housekeeping staff',
        columns: ['Time of day', 'Focus'],
        rows: [
          ['Before staff arrive', 'Floors swept and mopped, desks and common surfaces dusted, washrooms cleaned and restocked, bins emptied'],
          ['Morning', 'Pantry set up, tea/coffee service where included, meeting rooms checked'],
          ['Midday', 'Washroom round, pantry and lunch-area cleaning, waste segregation'],
          ['Afternoon', 'Meeting-room resets, spot cleaning, consumables check'],
          ['Close of day', 'Final washroom round, pantry closed down, bins cleared, checklist completed'],
        ],
        note: 'The full task list by day, week and month is in our free [office housekeeping checklist](/resources/office-housekeeping-checklist).',
      },
      {
        kind: 'cards',
        heading: 'Roles We Provide for Offices',
        columns: 3,
        items: [
          { title: 'Housekeeping executive', description: 'Cleaning of work areas, washrooms and common spaces to the agreed checklist.' },
          { title: 'Office boy / pantry staff', description: 'Pantry upkeep, tea and coffee service, document movement and general office support.' },
          { title: 'Supervisor (visiting or on-site)', description: 'Checks work against the checklist and is your point of contact for changes or issues.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Sizing Housekeeping for a Smaller Office',
        paragraphs: [
          'The number of staff depends more on how the office is used than on its size alone: how many washrooms there are, whether there is a pantry, how many people come in, and the working hours. A compact office with one washroom block may need only one person on a single shift, while an office with a busy pantry and long hours may need housekeeping and pantry roles separated. Our [staffing guide](/resources/how-many-housekeeping-staff) explains the method we use.',
          'Growing offices often move from a single housekeeper to a structured team. When that happens, the same contract can expand into [corporate housekeeping](/corporate-housekeeping-services-pune) with shift-based supervision.',
        ],
      },
    ],
    faqs: [
      { question: 'Can I hire just one housekeeping person for my office?', answer: 'Yes. Many small offices start with one person. The value of going through KARGAR is supervision, compliance and continuity when that person is absent.' },
      { question: 'Do your staff also handle the pantry?', answer: 'They can. Pantry services and office-boy duties can be combined with housekeeping or provided as a separate role.' },
      { question: 'Who buys cleaning supplies?', answer: 'Either you or KARGAR — consumables management can be included in the scope so supplies never run out.' },
      { question: 'How quickly can staff start?', answer: 'After the site visit and agreement on scope, we deploy verified staff. Timelines depend on the role and are confirmed in the proposal.' },
    ],
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Office Housekeeping Checklist', href: '/resources/office-housekeeping-checklist' },
      { label: 'Office Facility Management', href: '/office-facility-management-pune' },
    ],
    ctaHeading: 'Get Housekeeping for Your Office',
    ctaText: 'Tell us your office size, team size and working hours, and we will recommend the right staffing.',
    serviceType: 'Office Housekeeping',
  },

  // ───────────────────────────── SOCIETY ─────────────────────────────
  {
    path: '/society-housekeeping-services-pune',
    cluster: 'housekeeping',
    parent: PILLAR,
    breadcrumbLabel: 'Society Housekeeping',
    summary: 'Housekeeping for Pune housing societies: common areas, lifts, clubhouses, gardens and wet/dry waste, run for the managing committee.',
    seo: {
      title: 'Society Housekeeping in Pune',
      description:
        'Society housekeeping services in Pune — common areas, lifts, clubhouses and waste segregation for housing societies, with transparent payroll and supervision.',
      keywords: ['Society Housekeeping Services Pune', 'Housing Society Cleaning Pune', 'Apartment Housekeeping Pune'],
    },
    eyebrow: 'Society Housekeeping',
    h1: 'Housekeeping Services for Housing Societies in Pune',
    heroSubtitle:
      'Residential societies are where KARGAR started. We run housekeeping for some of Pune’s premium residential societies — organised around the managing committee, the residents, and the realities of a society budget.',
    heroImage: heroImages.brightLobby,
    intro: [
      'A housing society’s managing committee is made up of volunteers who already have full-time jobs. Housekeeping problems reach them as resident complaints: a dirty lift, an overflowing waste room, a staircase nobody cleaned. What the committee needs is a provider that takes ownership of the whole picture — staff, supervision, materials and records — and gives the committee clear information instead of more work.',
      'KARGAR provides society housekeeping in Pune as part of a structured site organisation: a housekeeping team with a supervisor, staff for waste management and specialised cleaning, and where needed, gardeners and STP operators — all reporting to a facility or site manager.',
    ],
    sections: [
      {
        kind: 'checklist',
        heading: 'Society Areas We Look After',
        groups: [
          { title: 'Buildings', items: ['Entrance lobbies and lift lobbies', 'Lift cars, buttons and mirrors', 'Staircases, handrails and landings', 'Terrace and refuge areas'] },
          { title: 'Amenities', items: ['Clubhouse and gym', 'Party hall and common rooms', 'Swimming-pool surrounds', 'Children’s play area'] },
          { title: 'Grounds and services', items: ['Internal roads, podium and parking', 'Garbage rooms and collection points', 'Security cabins and gates', 'Gardens — see [landscaping maintenance](/landscaping-services-pune)'] },
        ],
      },
      {
        kind: 'steps',
        heading: 'Wet and Dry Waste: How We Run It',
        intro: 'Waste is the most common source of resident complaints. Our waste management team handles it as a daily process, not an afterthought.',
        steps: [
          { title: 'Collection', description: 'Waste is collected from floors or collection points at fixed times agreed with the committee.' },
          { title: 'Segregation', description: 'Wet and dry waste are kept separate and any mixed waste is flagged so residents can be reminded.' },
          { title: 'Processing or handover', description: 'Where the society has an organic waste converter (OWC), it can be run by a trained OWC operator; otherwise segregated waste is handed to the collection agency.' },
          { title: 'Cleaning the waste areas', description: 'Bins and garbage rooms are cleaned so the problem does not move from the floors to the basement.' },
        ],
      },
      {
        kind: 'callout',
        heading: 'Transparency for the committee',
        text: 'Society funds belong to the residents, so committees are right to ask where the money goes. Under KARGAR’s 100% financial transparency commitment, the society can ask what compensation is paid to the staff deployed on its premises — and PF and ESIC are handled in line with labour law.',
      },
      {
        kind: 'prose',
        heading: 'Beyond Housekeeping: Running the Whole Society',
        paragraphs: [
          'Many committees start with housekeeping and later hand over more. KARGAR’s society model can include security staff such as watchmen, gatekeepers and security guards ([society security services](/society-security-services-pune)), technicians for STP, plumbing and electrical upkeep, and co-operative society administration.',
          'When a society wants one provider for all of it, we set up a complete site organisation under a facility manager — explained on our [facility management for housing societies](/facility-management-for-societies-pune) page.',
        ],
      },
    ],
    faqs: [
      { question: 'Do you only work with large societies?', answer: 'No. The team is sized to the society: the number of buildings, floors, lifts, amenities and the scope the committee chooses.' },
      { question: 'Can residents raise complaints directly?', answer: 'The process is agreed with the committee. Typically complaints go to the on-site supervisor, and are recorded so the committee can see what was raised and resolved.' },
      { question: 'Do you run organic waste converters?', answer: 'Yes, where a society has one, a trained OWC operator can be deployed as part of the housekeeping and waste team.' },
      { question: 'Can we see what the staff are being paid?', answer: 'Yes. You have the right to ask for the compensation paid to the staff deployed at your society.' },
      { question: 'How do we switch from our current housekeeping agency?', answer: 'We survey the society, agree a scope with the committee, and plan the changeover date so common areas are covered throughout.' },
    ],
    relatedLinks: [
      { label: 'Facility Management for Societies', href: '/facility-management-for-societies-pune' },
      { label: 'Society Security Services', href: '/society-security-services-pune' },
      { label: 'STP Operation & Maintenance', href: '/stp-operation-maintenance-pune' },
    ],
    ctaHeading: 'Request a Housekeeping Proposal for Your Society',
    ctaText: 'Share the number of buildings, flats and amenities, and we will arrange a survey with your committee.',
    serviceType: 'Residential Society Housekeeping',
  },

  // ───────────────────────────── STAFF / MANPOWER ─────────────────────────────
  {
    path: '/housekeeping-staff-pune',
    cluster: 'housekeeping',
    parent: PILLAR,
    breadcrumbLabel: 'Housekeeping Staff & Manpower',
    summary: 'Verified housekeeping manpower on KARGAR’s payroll — housekeeping executives, janitors, office boys and supervisors.',
    seo: {
      title: 'Housekeeping Staff in Pune',
      description:
        'Hire verified housekeeping staff in Pune on contract — housekeeping manpower with PF/ESIC compliance, attendance tracking and supervision from KARGAR.',
      keywords: ['Housekeeping Staff Pune', 'Housekeeping Manpower Pune', 'Housekeeping Manpower Supply Pune'],
    },
    eyebrow: 'Housekeeping Manpower',
    h1: 'Housekeeping Staff & Manpower Supply in Pune',
    heroSubtitle:
      'Contract housekeeping manpower for businesses, institutions and societies — verified, trained and on KARGAR’s payroll, so you get the people without the employment administration.',
    heroImage: heroImages.officeCleaning,
    intro: [
      'Some clients do not want a fully managed service — they want reliable people. A housekeeping manpower contract means KARGAR recruits, verifies, trains and employs the staff, handles statutory compliance and payroll, and deploys them to your premises under your day-to-day direction or our supervision.',
      'This page is about that staffing model specifically. If you are looking for a complete managed service with scope and quality ownership, start with our [housekeeping services in Pune](/housekeeping-services-pune).',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Housekeeping Roles We Supply',
        caption: 'Housekeeping roles and responsibilities',
        columns: ['Role', 'Responsibilities', 'Typical setting'],
        rows: [
          ['Housekeeping executive', 'Cleaning of work and common areas, washrooms, waste segregation', 'Offices, societies, institutes'],
          ['Janitor (ladies and men)', 'Washroom and floor cleaning, restocking', 'Societies, commercial buildings'],
          ['Office boy / pantry staff', 'Pantry upkeep, beverage service, office errands', 'Offices'],
          ['Specialised cleaning staff', 'Machine scrubbing, deep cleaning, high-level dusting', 'Large lobbies, periodic jobs'],
          ['Waste management staff / OWC operator', 'Waste collection, segregation, organic waste converter operation', 'Societies, campuses'],
          ['Housekeeping supervisor', 'Shift planning, checklists, quality checks, first point of contact', 'Any multi-person deployment'],
        ],
      },
      {
        kind: 'cards',
        heading: 'What You Get with KARGAR Manpower',
        columns: 2,
        items: [
          { title: 'Verification before deployment', description: 'Police verification and background checks are completed before anyone is placed at your site.' },
          { title: 'Statutory compliance', description: 'PF, ESIC and labour-law compliance are handled by KARGAR as the employer.' },
          { title: 'Attendance tracking', description: 'Attendance is tracked and reported, so billing reflects the people actually on site.' },
          { title: 'Training and retention', description: 'Year-round skill, safety and behavioural training — KARGAR’s company profile reports 95% employee retention, which means fewer new faces at your site.' },
        ],
      },
      {
        kind: 'steps',
        heading: 'From Requirement to Deployment',
        steps: [
          { title: 'Requirement', description: 'You share the roles, number of people, shifts and working hours.' },
          { title: 'Site visit', description: 'We confirm the work involved so the right people with the right training are selected.' },
          { title: 'Selection and verification', description: 'Staff are selected, verified and briefed on your site and its rules.' },
          { title: 'Deployment and review', description: 'Staff join with attendance tracking in place, and performance is reviewed with you.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Need More Than Housekeeping Staff?',
        paragraphs: [
          'The same employment model applies to security guards, technicians, front-desk and other facility roles. If you need people across several functions, see [facility staffing and manpower services in Pune](/facility-staffing-services-pune).',
        ],
      },
    ],
    faqs: [
      { question: 'Whose payroll are the housekeeping staff on?', answer: 'KARGAR’s. We employ the staff and handle PF, ESIC and labour-law compliance; you pay KARGAR under the contract.' },
      { question: 'What happens when a staff member is absent?', answer: 'Continuity of staffing is KARGAR’s responsibility under the contract. How absences are covered is agreed in the proposal for your site.' },
      { question: 'Can I ask for a staff member to be replaced?', answer: 'Yes. If someone is not the right fit for your site, raise it with your KARGAR contact and it will be addressed.' },
      { question: 'Can I check what the staff are paid?', answer: 'Yes. Under KARGAR’s financial transparency commitment, you can ask for the compensation paid to the staff deployed at your site.' },
    ],
    relatedLinks: [
      { label: 'Facility Staffing & Manpower', href: '/facility-staffing-services-pune' },
      { label: 'How Many Housekeeping Staff Do You Need?', href: '/resources/how-many-housekeeping-staff' },
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
    ],
    ctaHeading: 'Request Housekeeping Manpower',
    ctaText: 'Tell us the roles, headcount and shifts you need, and we will come back with a staffing proposal.',
    ctaLabel: 'Request Manpower Proposal',
    serviceType: 'Housekeeping Manpower Supply',
  },

  // ───────────────────────────── INDUSTRIAL ─────────────────────────────
  {
    path: '/industrial-housekeeping-services-pune',
    cluster: 'housekeeping',
    parent: PILLAR,
    breadcrumbLabel: 'Industrial Housekeeping',
    summary: 'Shift-aligned housekeeping for manufacturing plants and warehouses around Pune: shop floors, canteens, amenities and admin blocks.',
    seo: {
      title: 'Industrial Housekeeping, Pune',
      description:
        'Industrial housekeeping services in Pune for manufacturing plants and warehouses — shop floors, canteens and amenities cleaned around your production shifts.',
      keywords: ['Industrial Housekeeping Services Pune', 'Factory Housekeeping Pune', 'Plant Cleaning Services Pune'],
    },
    eyebrow: 'Industrial Housekeeping',
    h1: 'Industrial Housekeeping Services in Pune',
    heroSubtitle:
      'Pune’s manufacturing belts run on shifts. Housekeeping in a plant has to fit around production, respect safety rules on the shop floor, and keep amenities usable for every shift.',
    heroImage: heroImages.technicians,
    intro: [
      'Manufacturing is one of the sectors KARGAR serves. Industrial housekeeping differs from office cleaning in three ways: the work is organised around production shifts, the shop floor has safety rules that housekeeping staff must follow, and the amenities — canteens, washrooms, change rooms — are used intensively by large numbers of workers in short windows.',
      'We provide housekeeping teams for plants and warehouses around Pune, including the industrial areas of Pimpri-Chinchwad, with staffing, supervision and checklists planned around how your plant actually runs.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Plant Areas and Housekeeping Focus',
        caption: 'Industrial housekeeping by plant area',
        columns: ['Area', 'Housekeeping focus'],
        rows: [
          ['Shop floor and aisles', 'Sweeping and scrubbing of walkways, keeping marked aisles and emergency routes clear, as permitted by the plant’s safety rules'],
          ['Canteen and dining', 'Cleaning between meal shifts, table and floor cleaning, waste segregation'],
          ['Washrooms and change rooms', 'High-frequency cleaning and restocking timed to shift changes'],
          ['Admin and office block', 'Office-standard housekeeping for administration, meeting and visitor areas'],
          ['Warehouse and stores', 'Floor cleaning and dust control around racking and loading areas'],
          ['Plant surroundings', 'Internal roads, security gate areas and green areas'],
        ],
      },
      {
        kind: 'cards',
        heading: 'Working Safely Inside an Operating Plant',
        columns: 3,
        items: [
          { title: 'Site induction', description: 'Staff are briefed on your plant’s safety rules, restricted zones and PPE requirements before they start.' },
          { title: 'Safety training', description: 'Safety is one of the three tracks of KARGAR’s year-round training, alongside skill and behavioural training.' },
          { title: 'Shift-aligned schedules', description: 'Cleaning is planned around shift changes and production windows so it never gets in the way of operations.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Combining Housekeeping with Plant Upkeep',
        paragraphs: [
          'Plants often need more than cleaning: security at the gates, electrical and DG upkeep, and support staff. These can be combined with housekeeping under one [facility management contract](/facility-management-company-pune), or the technical side can be covered by our [facility maintenance services](/facility-maintenance-services-pune).',
        ],
      },
    ],
    faqs: [
      { question: 'Can you provide housekeeping for all three shifts?', answer: 'Yes. Staffing and supervision are planned per shift based on how your plant operates.' },
      { question: 'Will your staff follow our plant safety rules?', answer: 'Yes. Staff are inducted on your safety rules and PPE requirements before deployment and receive ongoing safety training.' },
      { question: 'Do you clean machinery?', answer: 'Our scope covers housekeeping of areas, amenities and surroundings. Any cleaning of machinery is agreed specifically with your plant team, following your own procedures.' },
    ],
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Facility Maintenance Services', href: '/facility-maintenance-services-pune' },
      { label: 'Facility Staffing & Manpower', href: '/facility-staffing-services-pune' },
    ],
    ctaHeading: 'Discuss Housekeeping for Your Plant',
    ctaText: 'Share your plant size, shifts and the areas to be covered, and we will plan a shift-aligned team.',
    serviceType: 'Industrial Housekeeping',
  },

  // ───────────────────────────── SCHOOLS ─────────────────────────────
  {
    path: '/school-housekeeping-services-pune',
    cluster: 'housekeeping',
    parent: PILLAR,
    breadcrumbLabel: 'School Housekeeping',
    summary: 'Housekeeping for schools, colleges and institutes, planned around the academic timetable and vacations.',
    seo: {
      title: 'School Housekeeping in Pune',
      description:
        'School housekeeping services in Pune for schools, colleges and institutes — classrooms, washrooms and campus cleaning planned around the academic timetable.',
      keywords: ['School Housekeeping Services Pune', 'College Housekeeping Pune', 'Educational Institute Cleaning Pune'],
    },
    eyebrow: 'Educational Institutes',
    h1: 'Housekeeping for Schools & Educational Institutes in Pune',
    heroSubtitle:
      'Clean classrooms and safe washrooms for students, with housekeeping work timed around the school day, exams and vacations.',
    heroImage: heroImages.officeCleaning,
    intro: [
      'Educational institutes are one of the core sectors KARGAR serves. A school campus has a rhythm unlike any office: hundreds of children arrive at once, washrooms are used heavily in short breaks, classrooms have to be ready before the first period, and the long vacations are the only real window for deep cleaning.',
      'We plan housekeeping for schools and institutes around that rhythm, with verified staff, supervision, and a conduct standard appropriate for working where children are present.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Housekeeping Around the Academic Calendar',
        caption: 'School housekeeping schedule by period',
        columns: ['Period', 'What housekeeping focuses on'],
        rows: [
          ['Before school starts', 'Classrooms, corridors and washrooms cleaned and ready; drinking-water areas checked'],
          ['During school hours', 'Washroom rounds after each break, spill response, staff room and office upkeep'],
          ['After dismissal', 'Classroom cleaning, waste clearance, preparing for the next day'],
          ['Exams and events', 'Halls and auditoriums prepared before and cleaned after'],
          ['Vacations', 'Deep cleaning of classrooms, labs, furniture and high-level areas'],
        ],
      },
      {
        kind: 'cards',
        heading: 'Standards for Working Around Students',
        columns: 2,
        items: [
          { title: 'Verified staff', description: 'Police verification and background checks before anyone is deployed on campus.' },
          { title: 'Behavioural training', description: 'KARGAR’s year-round training includes a behavioural track alongside skill and safety, which matters on a school campus.' },
          { title: 'Supervised deployment', description: 'A supervisor oversees the team and coordinates with the school administration.' },
          { title: 'Washroom hygiene', description: 'Washroom hygiene management is part of our soft-services scope — the area parents notice most.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Campus Services Beyond Cleaning',
        paragraphs: [
          'Larger campuses often also need gate security, garden upkeep and maintenance of electrical and plumbing systems. These can be combined with housekeeping — see [security services in Pune](/security-services-pune), [landscaping maintenance](/landscaping-services-pune) and [building maintenance](/building-maintenance-services-pune).',
        ],
      },
    ],
    faqs: [
      { question: 'Can housekeeping be scheduled outside school hours?', answer: 'Yes. Most classroom cleaning is done before school starts and after dismissal, with washroom rounds during the day.' },
      { question: 'Do you provide deep cleaning during vacations?', answer: 'Yes. Deep cleaning of classrooms, furniture and high-level areas is usually planned for vacation periods.' },
      { question: 'Are staff verified for working around children?', answer: 'All staff go through police verification and background checks before deployment and receive behavioural training.' },
    ],
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Security Services in Pune', href: '/security-services-pune' },
      { label: 'Landscaping Maintenance', href: '/landscaping-services-pune' },
    ],
    ctaHeading: 'Plan Housekeeping for Your Campus',
    ctaText: 'Share your campus size, student strength and timings, and we will propose a schedule that fits the academic year.',
    serviceType: 'School and Educational Institute Housekeeping',
  },

  // ───────────────────────────── HEALTHCARE ─────────────────────────────
  {
    path: '/healthcare-housekeeping-services-pune',
    cluster: 'housekeeping',
    parent: PILLAR,
    breadcrumbLabel: 'Healthcare Housekeeping',
    summary: 'Housekeeping for clinics and healthcare facilities, working to the facility’s own infection-control protocols.',
    seo: {
      title: 'Healthcare Housekeeping, Pune',
      description:
        'Healthcare housekeeping in Pune for clinics and hospitals — trained staff working to your infection-control protocols, with supervision and checklists.',
      keywords: ['Healthcare Housekeeping Pune', 'Hospital Housekeeping Services Pune', 'Clinic Cleaning Services Pune'],
    },
    eyebrow: 'Healthcare Facilities',
    h1: 'Housekeeping for Clinics & Healthcare Facilities in Pune',
    heroSubtitle:
      'In a healthcare facility, housekeeping is part of patient safety. Our teams work to your infection-control protocols, under supervision, with every round recorded.',
    heroImage: heroImages.brightLobby,
    intro: [
      'Healthcare is one of the sectors KARGAR serves. The difference from other housekeeping is not the cleaning itself but the rules around it: which areas need which procedure, which chemicals are approved, how often patient areas are cleaned, and how waste is segregated. Those rules belong to the facility and its infection-control team.',
      'Our role is to provide trained, supervised housekeeping staff who follow those protocols consistently and keep a record that the facility can audit. We say this plainly because it matters: clinical decisions stay with your facility; disciplined execution and documentation are what we bring.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Who Is Responsible for What',
        intro: 'Agreeing this split before deployment avoids the most common gaps in outsourced healthcare housekeeping.',
        caption: 'Responsibility split between the healthcare facility and KARGAR',
        columns: ['Topic', 'Healthcare facility', 'KARGAR'],
        rows: [
          ['Cleaning protocols and approved chemicals', 'Defines and approves', 'Trains staff and follows them'],
          ['Patient-area cleaning frequency', 'Sets the frequency', 'Schedules staff and records each round'],
          ['Biomedical waste', 'Owns the authorised disposal arrangement', 'Follows the facility’s segregation rules within housekeeping scope'],
          ['Waiting areas, corridors, washrooms, offices', 'Agrees the standard', 'Delivers and supervises to the checklist'],
          ['Audits', 'Conducts or commissions', 'Provides checklist records and attendance'],
        ],
      },
      {
        kind: 'steps',
        heading: 'Aligning Our Team to Your Protocols',
        steps: [
          { title: 'Protocol review', description: 'We review your housekeeping SOPs and infection-control requirements with your team.' },
          { title: 'Staff briefing and training', description: 'Staff are trained on your protocols before deployment, in addition to KARGAR’s skill, safety and behavioural training.' },
          { title: 'Supervised rounds', description: 'A supervisor checks rounds against the checklist, with attention on high-risk and high-traffic areas.' },
          { title: 'Records for audit', description: 'Checklist records and attendance are maintained so your facility can audit housekeeping at any time.' },
        ],
      },
    ],
    faqs: [
      { question: 'Do you handle biomedical waste disposal?', answer: 'Disposal of biomedical waste is managed through the facility’s authorised arrangement. Our staff follow your segregation rules within the housekeeping scope.' },
      { question: 'Can you work with our infection-control team?', answer: 'Yes. Our teams are trained on and follow your facility’s protocols; the protocols themselves remain with your infection-control team.' },
      { question: 'Do you provide round-the-clock housekeeping?', answer: 'Staffing can be planned for multiple shifts where the facility operates around the clock.' },
    ],
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'Housekeeping Staff & Manpower', href: '/housekeeping-staff-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
    ],
    ctaHeading: 'Discuss Housekeeping for Your Facility',
    ctaText: 'Share your facility type, size and operating hours, and we will plan a team around your protocols.',
    serviceType: 'Healthcare Facility Housekeeping',
  },
];
