import type { PuneLandingPageContent } from '../../domain/types';
import { heroImages } from '../heroImages';

const PILLAR = { label: 'Facility Maintenance Pune', href: '/facility-maintenance-services-pune' };

/** Hard-services cluster. Scope strictly per Company Brochure p.2 "Hard Services" + profile technician roles. */
export const maintenancePages: PuneLandingPageContent[] = [
  // ───────────────────────────── PILLAR ─────────────────────────────
  {
    path: '/facility-maintenance-services-pune',
    cluster: 'maintenance',
    isPillar: true,
    breadcrumbLabel: 'Facility Maintenance Pune',
    summary: 'Planned preventive and breakdown maintenance of electrical, HVAC, DG, UPS, fire, plumbing and STP/WTP systems.',
    seo: {
      title: 'Facility Maintenance in Pune',
      description:
        'Facility maintenance services in Pune — planned preventive and breakdown maintenance of electrical, HVAC, DG, plumbing, fire and STP systems by KARGAR.',
      keywords: ['Facility Maintenance Services Pune', 'Commercial Maintenance Services Pune', 'Building Systems Maintenance Pune'],
    },
    eyebrow: 'Facility Maintenance',
    h1: 'Facility Maintenance Services in Pune',
    heroSubtitle:
      'The technical side of running a property — power, cooling, backup, water and fire safety — maintained on a plan, with breakdowns coordinated through one team.',
    heroImage: heroImages.technicians,
    intro: [
      'Hard services are the systems a building cannot function without. When they are maintained only after something fails, the cost shows up as downtime, emergency call-outs and shortened equipment life. KARGAR’s facility maintenance service puts those systems on a planned preventive maintenance (PPM) schedule aligned to OEM recommendations, and coordinates breakdown repairs when they happen.',
      'We maintain building systems for residential societies, offices, commercial complexes, institutes and plants across Pune, under an annual maintenance contract (AMC), on call, or as part of [integrated facility management](/facility-management-company-pune).',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Systems We Maintain',
        caption: 'Building systems covered by KARGAR facility maintenance',
        columns: ['System', 'What is covered', 'Detail page'],
        rows: [
          ['Electrical', 'LT panels, distribution boards, cabling, UPS rooms', '[Electrical maintenance in Pune](/electrical-maintenance-services-pune)'],
          ['HVAC', 'AHU, FCU, VRV/VRF systems', '[HVAC maintenance in Pune](/hvac-maintenance-services-pune)'],
          ['DG sets', 'Operation and maintenance of diesel generators', '[Electrical maintenance in Pune](/electrical-maintenance-services-pune)'],
          ['UPS and batteries', 'UPS and battery maintenance', '[Electrical maintenance in Pune](/electrical-maintenance-services-pune)'],
          ['Plumbing and water', 'Pumps, tanks, pipelines and water systems', '[Plumbing maintenance](/plumbing-maintenance-services-pune)'],
          ['STP / WTP', 'Daily operation of sewage and water treatment plants', '[STP operation and maintenance](/stp-operation-maintenance-pune)'],
          ['Fire systems', 'Fire alarm and fire-fighting systems', '[Building maintenance](/building-maintenance-services-pune)'],
          ['BMS', 'Building management system monitoring', '[Building maintenance](/building-maintenance-services-pune)'],
        ],
      },
      {
        kind: 'compare',
        heading: 'Preventive vs. Breakdown Maintenance',
        intro: 'Both are needed. The goal is to make breakdowns the exception rather than the routine.',
        left: {
          title: 'Breakdown-only maintenance',
          items: ['Work starts after a failure is noticed', 'Downtime and emergency call-out costs', 'No record of equipment condition', 'Equipment ages faster'],
        },
        right: {
          title: 'Planned preventive maintenance (PPM)',
          items: ['Scheduled per OEM recommendations', 'Faults caught during inspections', 'Maintenance history for every asset', 'Breakdowns coordinated when they still occur'],
        },
      },
      {
        kind: 'cards',
        heading: 'Engagement Models',
        columns: 3,
        items: [
          { title: 'AMC', description: 'An annual maintenance contract with a PPM calendar and agreed scope for each system.' },
          { title: 'On-call', description: 'Technician support when you need it, for sites that do not need a full-time team.' },
          { title: 'Resident technicians', description: 'Electricians, plumbers, STP operators or fire technicians deployed on site, often within a [building maintenance](/building-maintenance-services-pune) setup.' },
        ],
      },
      {
        kind: 'steps',
        heading: 'How We Start a Maintenance Contract',
        steps: [
          { title: 'Asset survey', description: 'We list the systems and equipment, their condition and any existing AMCs or OEM warranties.' },
          { title: 'PPM calendar', description: 'A preventive maintenance schedule is built from OEM recommendations and how the site is used.' },
          { title: 'Breakdown process', description: 'Escalation and coordination with OEMs or specialist vendors are agreed for faults outside PPM.' },
          { title: 'Reporting', description: 'Completed PPM, open issues and breakdowns are reported on a daily, weekly and monthly basis.' },
        ],
      },
    ],
    faqs: [
      { question: 'What does facility maintenance include?', answer: 'Maintenance of a building’s technical systems — electrical, HVAC, DG, UPS, plumbing, STP/WTP, fire systems and BMS — through preventive schedules and breakdown coordination.' },
      { question: 'Do you work with existing OEM AMCs?', answer: 'Yes. We follow OEM schedules for PPM and coordinate breakdown maintenance with OEMs or specialist vendors where their involvement is required.' },
      { question: 'Can we take only on-call support?', answer: 'Yes. Maintenance can be engaged as an AMC, on call or incidental, depending on the site.' },
      { question: 'Do you provide technicians to stay on site?', answer: 'Yes. Electricians, plumbers, STP operators, fire technicians and other technicians can be deployed on site.' },
    ],
    serviceDetailLink: { label: 'hard services overview', href: '/services/hard-services' },
    relatedLinks: [
      { label: 'Electrical Maintenance in Pune', href: '/electrical-maintenance-services-pune' },
      { label: 'Building Maintenance Services', href: '/building-maintenance-services-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
    ],
    ctaHeading: 'Request a Maintenance Assessment',
    ctaText: 'Tell us which systems your property has and how they are maintained today. We will propose a PPM plan.',
    serviceType: 'Facility Maintenance',
  },

  // ───────────────────────────── ELECTRICAL (rewritten) ─────────────────────────────
  {
    path: '/electrical-maintenance-services-pune',
    cluster: 'maintenance',
    parent: PILLAR,
    breadcrumbLabel: 'Electrical Maintenance Pune',
    summary: 'Preventive and breakdown maintenance of LT panels, DBs, cabling, UPS rooms, batteries and DG sets.',
    seo: {
      title: 'Electrical Maintenance Pune',
      description:
        'Electrical maintenance services in Pune for societies, offices and plants — LT panels, DBs, cabling, UPS, batteries and DG sets on a preventive schedule.',
      keywords: ['Electrical Maintenance Services Pune', 'Electrical AMC Pune', 'DG Set Maintenance Pune'],
    },
    eyebrow: 'Electrical Maintenance in Pune',
    h1: 'Electrical Maintenance Services in Pune',
    heroSubtitle:
      'Keeping power distribution and backup reliable for Pune properties — panels, DBs, cabling, UPS rooms and DG sets maintained before they fail, with breakdowns coordinated when they do.',
    heroImage: heroImages.technicians,
    intro: [
      'Electrical problems in a building rarely announce themselves. A loose termination in a distribution board, a battery bank past its life, or a DG set that has not been run under load only becomes visible when the power goes — and in Pune, outages tend to arrive with the monsoon, exactly when a building most needs its backup to work.',
      'KARGAR maintains electrical systems for residential societies, offices, commercial complexes and plants across Pune: LT panels, distribution boards, cabling, UPS rooms, UPS and battery systems, and DG operation and maintenance. This page covers how that works at a Pune site; for the general service description see our [electrical maintenance service details](/services/hard-services/electrical-maintenance).',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Electrical Assets and What Maintenance Looks Like',
        caption: 'Electrical maintenance activities by asset',
        columns: ['Asset', 'Preventive activities', 'Why it matters'],
        rows: [
          ['LT panels and DBs', 'Visual inspection, tightening of terminations, cleaning, checks for heating and loose connections', 'Loose or overheated connections are a common cause of failures and fire risk'],
          ['Cabling', 'Inspection of routing, insulation and cable trays', 'Damaged insulation leads to faults and tripping'],
          ['UPS rooms, UPS and batteries', 'Battery health checks, room ventilation, UPS checks per OEM schedule', 'Backup only helps if batteries hold charge when needed'],
          ['DG sets', 'Scheduled running, fuel and lubrication checks, operation during outages', 'A DG that has not been exercised may not start when the grid fails'],
        ],
      },
      {
        kind: 'cards',
        heading: 'Planning for Pune’s Monsoon',
        intro: 'Moisture, water ingress and frequent outages make June to September the hardest season for building electrics.',
        columns: 3,
        items: [
          { title: 'Before the rains', description: 'Panels and DBs inspected for water-ingress points; DG and UPS readiness checked.' },
          { title: 'During the monsoon', description: 'DG operation during outages, and closer watch on basements, pump rooms and exposed cabling.' },
          { title: 'After heavy rain', description: 'Inspection of areas where water entered before equipment is put back into normal service.' },
        ],
      },
      {
        kind: 'cards',
        heading: 'Who We Maintain Electrical Systems For',
        columns: 2,
        items: [
          { title: 'Housing societies', description: 'Common-area lighting, lift and pump supply, DG backup and solar systems maintained by society technicians. See [building maintenance](/building-maintenance-services-pune).' },
          { title: 'Offices and commercial buildings', description: 'Distribution, UPS for IT and critical loads, and DG backup, coordinated with [office facility management](/office-facility-management-pune).' },
          { title: 'Manufacturing plants', description: 'Panels, distribution and DG support for plant and utility loads, alongside [industrial housekeeping](/industrial-housekeeping-services-pune).' },
          { title: 'Institutes', description: 'Campus distribution and backup for classrooms, labs and offices.' },
        ],
      },
    ],
    faqs: [
      { question: 'How often should electrical systems be inspected?', answer: 'Preventive schedules follow OEM recommendations and how heavily the system is used. Critical items such as DG sets and UPS batteries are checked more often than general distribution.' },
      { question: 'Do you provide emergency electrical support?', answer: 'KARGAR provides 24x7 support for emergencies, with breakdowns coordinated through our escalation process.' },
      { question: 'Do you maintain DG sets?', answer: 'Yes. DG operation and maintenance is part of our hard-services scope.' },
      { question: 'Can you work alongside our OEM service contracts?', answer: 'Yes. We follow OEM schedules and coordinate with OEMs where their involvement is required.' },
    ],
    relatedLinks: [
      { label: 'Facility Maintenance Services', href: '/facility-maintenance-services-pune' },
      { label: 'HVAC Maintenance in Pune', href: '/hvac-maintenance-services-pune' },
      { label: 'Building Maintenance Services', href: '/building-maintenance-services-pune' },
    ],
    ctaHeading: 'Request an Electrical Maintenance Assessment',
    ctaText: 'Tell us about your panels, backup systems and current maintenance arrangement, and we will propose a preventive plan.',
    serviceType: 'Electrical Maintenance',
  },

  // ───────────────────────────── HVAC (existing content retained) ─────────────────────────────
  {
    path: '/hvac-maintenance-services-pune',
    cluster: 'maintenance',
    parent: PILLAR,
    breadcrumbLabel: 'HVAC Maintenance Pune',
    summary: 'Preventive and breakdown servicing of AHUs, FCUs and VRV/VRF systems for commercial and industrial facilities.',
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
    heroImage: heroImages.technicians,
    intro: [
      'Indoor air quality and temperature control directly affect occupant comfort and, in facilities running IT hardware or sensitive equipment, operational reliability. KARGAR Facility Management provides HVAC maintenance for commercial and industrial facilities across Pune — covering everything from split ACs to large commercial chillers.',
      'Our technicians handle routine servicing as well as the less routine work: system balancing, duct cleaning, and indoor air quality testing, so your HVAC systems stay efficient year-round rather than just functional. HVAC is one part of our wider [facility maintenance services in Pune](/facility-maintenance-services-pune).',
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
      { label: 'Facility Maintenance Services', href: '/facility-maintenance-services-pune' },
      { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
    ],
    ctaHeading: 'Schedule an HVAC Service Assessment',
    ctaText: 'Tell us about your facility\'s HVAC systems and our team will follow up with a tailored service plan.',
    serviceType: 'HVAC Maintenance',
  },

  // ───────────────────────────── PLUMBING ─────────────────────────────
  {
    path: '/plumbing-maintenance-services-pune',
    cluster: 'maintenance',
    parent: PILLAR,
    breadcrumbLabel: 'Plumbing Maintenance',
    summary: 'Maintenance of building plumbing and water systems — pumps, tanks, pipelines and washroom fixtures — for societies and businesses.',
    seo: {
      title: 'Plumbing Maintenance in Pune',
      description:
        'Plumbing maintenance services in Pune for societies, offices and campuses — pumps, tanks, pipelines and washroom fixtures kept working by KARGAR plumbers.',
      keywords: ['Plumbing Maintenance Services Pune', 'Building Plumbing Maintenance Pune', 'Society Plumber Services Pune'],
    },
    eyebrow: 'Plumbing & Water Systems',
    h1: 'Plumbing & Water System Maintenance in Pune',
    heroSubtitle:
      'Water reaches every flat, washroom and pantry through pumps, tanks and pipelines that someone has to look after. We maintain them for societies, offices and campuses.',
    heroImage: heroImages.technicians,
    intro: [
      'This is building plumbing, not one-off household repair. A housing society or commercial building depends on pumps lifting water to overhead tanks, sumps and tanks staying clean, pipelines and valves holding pressure, and washroom fixtures working across dozens or hundreds of points. When one part fails, the complaint arrives from every floor at once.',
      'KARGAR maintains plumbing and water systems as part of our hard services — with plumbers deployed on site or on call, and work organised on a preventive schedule rather than complaint by complaint.',
    ],
    sections: [
      {
        kind: 'checklist',
        heading: 'What Plumbing Maintenance Covers',
        groups: [
          { title: 'Water supply', items: ['Pump operation and upkeep', 'Overhead and underground tank checks', 'Valves, risers and main lines'] },
          { title: 'Fixtures and leaks', items: ['Washroom and pantry fixtures in common areas', 'Leak detection and repair', 'Blockage clearing in common drainage'] },
          { title: 'Connected systems', items: ['Coordination with [STP/WTP operation](/stp-operation-maintenance-pune)', 'Water lines for gardens and amenities', 'Fire-fighting water connections with the fire technician'] },
        ],
      },
      {
        kind: 'cards',
        heading: 'Preventive Checks That Save Repairs',
        columns: 2,
        items: [
          { title: 'Pumps', description: 'Regular checks of pump operation and alternating standby pumps, so a single failure does not cut supply.' },
          { title: 'Tanks', description: 'Periodic inspection and cleaning schedules agreed with the society or building, so water quality is not left to chance.' },
          { title: 'Leaks', description: 'Rounds of shafts, terraces and basements to catch seepage before it damages structures or wastes water.' },
          { title: 'Monsoon readiness', description: 'Terrace outlets, rainwater lines and basement drainage checked before Pune’s monsoon.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'On-Site Plumber or On-Call Support?',
        paragraphs: [
          'Large societies and campuses usually benefit from a resident plumber as part of a wider technician team — see [building maintenance services](/building-maintenance-services-pune). Smaller buildings and offices often only need on-call support. Both are available, and the choice is made on how many water points and how much equipment your property has.',
        ],
      },
    ],
    faqs: [
      { question: 'Do you do plumbing work inside individual flats?', answer: 'Our service is focused on building and common-area plumbing for societies and businesses. Work inside individual flats is agreed separately with the society.' },
      { question: 'Can a plumber be deployed at our society full time?', answer: 'Yes. Plumbers can be deployed on site as part of a technician team, or support can be on call.' },
      { question: 'Do you look after STPs too?', answer: 'Yes — see [STP and WTP operation and maintenance](/stp-operation-maintenance-pune).' },
    ],
    relatedLinks: [
      { label: 'Building Maintenance Services', href: '/building-maintenance-services-pune' },
      { label: 'STP Operation & Maintenance', href: '/stp-operation-maintenance-pune' },
      { label: 'Facility Maintenance Services', href: '/facility-maintenance-services-pune' },
    ],
    ctaHeading: 'Get Plumbing Maintenance for Your Property',
    ctaText: 'Share the number of buildings, pumps and tanks, and we will recommend on-site or on-call coverage.',
    serviceType: 'Plumbing and Water System Maintenance',
  },

  // ───────────────────────────── BUILDING MAINTENANCE ─────────────────────────────
  {
    path: '/building-maintenance-services-pune',
    cluster: 'maintenance',
    parent: PILLAR,
    breadcrumbLabel: 'Building Maintenance',
    summary: 'A resident technician team for societies and commercial buildings — electrical, plumbing, lifts, fire, solar, CCTV and parking systems.',
    seo: {
      title: 'Building Maintenance in Pune',
      description:
        'Building maintenance services in Pune for societies and commercial buildings — electricians, plumbers, lift, fire, solar and CCTV technicians from KARGAR.',
      keywords: ['Building Maintenance Services Pune', 'Society Maintenance Services Pune', 'Apartment Maintenance Company Pune'],
    },
    eyebrow: 'Building Maintenance',
    h1: 'Building Maintenance Services in Pune',
    heroSubtitle:
      'Modern Pune buildings come with lifts, solar panels, fire systems, CCTV, mechanised parking and treatment plants. We provide the technician team that keeps all of it running.',
    heroImage: heroImages.building,
    intro: [
      'A new residential tower or commercial building in Pune has far more equipment than buildings of a decade ago. Each system usually arrives with its own AMC vendor, and the managing committee or owner ends up coordinating them all. Building maintenance means having a technician team on the ground that runs the daily operation, does first-level maintenance, and coordinates the AMC vendors when specialist work is needed.',
      'KARGAR’s building maintenance teams are drawn from the technician roles in our site org structure, and scaled to the building.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Technician Roles for a Building',
        caption: 'Building maintenance technician roles',
        columns: ['Role', 'Looks after'],
        rows: [
          ['Electrician', 'Common lighting, panels, DBs, pump and lift supply, DG and UPS readiness'],
          ['Plumber', 'Pumps, tanks, pipelines, common washrooms — see [plumbing maintenance](/plumbing-maintenance-services-pune)'],
          ['STP operator', 'Daily STP/WTP operation — see [STP operation and maintenance](/stp-operation-maintenance-pune)'],
          ['Fire technician', 'Fire alarm and fire-fighting systems readiness'],
          ['Lift operator', 'Lift operation and coordination of service maintenance with the lift AMC'],
          ['Access control and CCTV operator', 'Operation and maintenance of access control and CCTV'],
          ['Solar system maintenance', 'Upkeep of rooftop solar systems'],
          ['MLCP operator', 'Operation of multi-level car parking systems'],
          ['Service maintenance', 'General repairs and upkeep across the building'],
        ],
      },
      {
        kind: 'steps',
        heading: 'How a Building Maintenance Team Works',
        steps: [
          { title: 'Daily rounds', description: 'Technicians check critical equipment — pumps, DG, fire panels, lifts, STP — every day and log readings.' },
          { title: 'Preventive schedule', description: 'PPM tasks are carried out per OEM schedules and recorded.' },
          { title: 'Complaints', description: 'Resident or tenant complaints are logged and attended, with escalation for anything outside the team’s scope.' },
          { title: 'AMC coordination', description: 'Specialist work is coordinated with AMC vendors and OEMs, and their visits are tracked.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Building Maintenance as Part of Society or Commercial FM',
        paragraphs: [
          'Most buildings combine maintenance with housekeeping and security. For housing societies this is our [society facility management](/facility-management-for-societies-pune) model; for multi-tenant buildings, it is [commercial facility management](/commercial-facility-management-pune). The technical scope on its own is described in [facility maintenance services](/facility-maintenance-services-pune).',
        ],
      },
    ],
    faqs: [
      { question: 'Do we still need AMCs for lifts and other equipment?', answer: 'Usually yes — OEM or specialist AMCs remain for work only they can do. Our team operates the equipment day to day and coordinates those vendors.' },
      { question: 'Can you maintain rooftop solar systems?', answer: 'Yes. Solar system maintenance is one of the technician roles in our building teams.' },
      { question: 'Do you operate mechanised car parking?', answer: 'Yes. MLCP operators can be part of the building team where the building has a multi-level car parking system.' },
    ],
    relatedLinks: [
      { label: 'Facility Management for Societies', href: '/facility-management-for-societies-pune' },
      { label: 'Plumbing Maintenance', href: '/plumbing-maintenance-services-pune' },
      { label: 'Facility Maintenance Services', href: '/facility-maintenance-services-pune' },
    ],
    ctaHeading: 'Plan a Technician Team for Your Building',
    ctaText: 'Tell us what equipment your building has and how it is maintained today, and we will propose the right team.',
    serviceType: 'Building Maintenance',
  },

  // ───────────────────────────── STP / WTP ─────────────────────────────
  {
    path: '/stp-operation-maintenance-pune',
    cluster: 'maintenance',
    parent: PILLAR,
    breadcrumbLabel: 'STP Operation & Maintenance',
    summary: 'Trained operators for the daily operation of sewage and water treatment plants in societies and campuses.',
    seo: {
      title: 'STP Operation & Maintenance',
      description:
        'STP operation and maintenance in Pune for housing societies and campuses — trained STP and WTP operators running daily operations with logged records.',
      keywords: ['STP Operation and Maintenance Pune', 'STP Operator Services Pune', 'WTP Maintenance Pune'],
    },
    eyebrow: 'STP & WTP Operations',
    h1: 'STP & WTP Operation and Maintenance in Pune',
    heroSubtitle:
      'Many Pune housing societies and campuses have their own sewage treatment plant. It only works if someone trained runs it every day. We provide those operators.',
    heroImage: heroImages.technicians,
    intro: [
      'A sewage treatment plant (STP) is a living process, not a machine you switch on. Blowers, pumps, dosing and sludge handling need daily attention, and a plant that is neglected for a few weeks can stop treating properly — with odour, overflow and complaints following. The same applies to water treatment plants (WTPs) that keep supply usable.',
      'STP/WTP operations are part of KARGAR’s hard services, and STP and WTP operators are part of our society and campus org structures.',
    ],
    sections: [
      {
        kind: 'checklist',
        heading: 'What an STP Operator Does',
        groups: [
          { title: 'Every day', items: ['Run and monitor pumps, blowers and dosing', 'Visual checks of each treatment stage', 'Record readings in the plant log'] },
          { title: 'Periodically', items: ['Sludge handling as per the plant’s design', 'Cleaning of screens and chambers', 'Coordinate testing as required by the society or campus'] },
          { title: 'When something goes wrong', items: ['Report faults immediately', 'Coordinate repairs with the plant’s AMC vendor or OEM', 'Keep the plant running safely in the meantime'] },
        ],
      },
      {
        kind: 'cards',
        heading: 'Why Societies Outsource STP Operation',
        columns: 3,
        items: [
          { title: 'Continuity', description: 'An STP needs attention every day, including holidays. The operator’s absence is covered by KARGAR, not by the committee.' },
          { title: 'Records', description: 'Logged readings give the committee evidence of how the plant has been run.' },
          { title: 'Treated water use', description: 'A well-run plant gives the society usable treated water, for example for gardens — see [landscaping maintenance](/landscaping-services-pune).' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Part of a Wider Technical Team',
        paragraphs: [
          'The STP operator usually works alongside a plumber and electrician, because pumps, pipelines and power supply all affect the plant. For societies we combine these roles under [building maintenance](/building-maintenance-services-pune) or full [society facility management](/facility-management-for-societies-pune).',
        ],
      },
    ],
    faqs: [
      { question: 'Do you design or build STPs?', answer: 'No. We provide operation and maintenance of existing STP and WTP plants. Design, upgrades and major repairs are coordinated with the plant’s OEM or AMC vendor.' },
      { question: 'Can you provide an STP operator for our society?', answer: 'Yes. Trained STP operators are part of our society org structure and can be deployed on their own or with a wider technician team.' },
      { question: 'Will the operator keep records?', answer: 'Yes. Daily readings and activities are recorded in the plant log for the committee or management.' },
    ],
    relatedLinks: [
      { label: 'Building Maintenance Services', href: '/building-maintenance-services-pune' },
      { label: 'Society Housekeeping in Pune', href: '/society-housekeeping-services-pune' },
      { label: 'Facility Maintenance Services', href: '/facility-maintenance-services-pune' },
    ],
    ctaHeading: 'Get an STP Operator for Your Society',
    ctaText: 'Share your plant’s capacity and current arrangement, and we will propose operator coverage.',
    serviceType: 'STP and WTP Operation and Maintenance',
  },

  // ───────────────────────────── LANDSCAPING ─────────────────────────────
  {
    path: '/landscaping-services-pune',
    // Landscaping is a soft service (Brochure p.2), so it sits under the FM pillar, not maintenance.
    cluster: 'facility-management',
    parent: { label: 'Facility Management Pune', href: '/facility-management-company-pune' },
    breadcrumbLabel: 'Landscaping Maintenance',
    summary: 'Ongoing garden and landscape upkeep for societies, campuses and commercial properties.',
    seo: {
      title: 'Landscaping Maintenance Pune',
      description:
        'Landscaping maintenance services in Pune for housing societies, campuses and commercial properties — trained gardeners and garden supervisors from KARGAR.',
      keywords: ['Landscaping Maintenance Services Pune', 'Garden Maintenance Pune', 'Society Gardener Services Pune'],
    },
    eyebrow: 'Landscaping & Horticulture',
    h1: 'Landscaping & Garden Maintenance in Pune',
    heroSubtitle:
      'Gardens, lawns and podium landscapes are among the first things residents and visitors see. We keep them maintained through every season.',
    heroImage: heroImages.building,
    intro: [
      'Landscaping and horticulture is one of KARGAR’s soft services. Our focus is ongoing maintenance of existing landscapes — the daily and seasonal work that keeps a society garden, campus lawn or commercial forecourt healthy — rather than one-off garden design.',
      'Gardeners (ladies and men) work under a garden supervisor, with garden and landscaping experts for larger properties, and the team fits into the same site structure as housekeeping and maintenance.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Garden Care Through Pune’s Seasons',
        caption: 'Seasonal landscaping tasks in Pune',
        columns: ['Season', 'Focus'],
        rows: [
          ['Summer (March–May)', 'Watering schedules, mulching, protecting lawns and young plants from heat'],
          ['Monsoon (June–September)', 'Drainage of beds and lawns, weed control, pruning of fast growth, checking for waterlogging'],
          ['Post-monsoon and winter', 'Lawn renovation, replanting, manuring, seasonal flowering beds'],
          ['Year-round', 'Mowing, hedge trimming, sweeping of garden paths, green-waste removal'],
        ],
      },
      {
        kind: 'cards',
        heading: 'Team Structure',
        columns: 3,
        items: [
          { title: 'Gardeners', description: 'Daily watering, mowing, weeding, pruning and cleaning of green areas.' },
          { title: 'Garden supervisor', description: 'Plans seasonal work, checks quality and coordinates with the committee or facility manager.' },
          { title: 'Landscaping experts', description: 'Guidance for larger landscapes, replanting and lawn renovation.' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Working with Housekeeping and STP Teams',
        paragraphs: [
          'Green waste joins the society’s wet/dry waste process managed by [society housekeeping](/society-housekeeping-services-pune), and where the society treats its own sewage, treated water from a well-run plant can be used for gardens — see [STP operation and maintenance](/stp-operation-maintenance-pune).',
        ],
      },
    ],
    faqs: [
      { question: 'Do you design new gardens?', answer: 'Our service is maintenance of existing landscapes. Larger replanting or renovation work can be planned with our landscaping experts.' },
      { question: 'Can gardeners be part of our housekeeping contract?', answer: 'Yes. Gardeners are part of our society org structure and are often combined with housekeeping.' },
      { question: 'Do you maintain campus and commercial landscapes as well?', answer: 'Yes — societies, institutes and commercial properties.' },
    ],
    relatedLinks: [
      { label: 'Society Housekeeping in Pune', href: '/society-housekeeping-services-pune' },
      { label: 'Facility Management for Societies', href: '/facility-management-for-societies-pune' },
      { label: 'School Housekeeping', href: '/school-housekeeping-services-pune' },
    ],
    ctaHeading: 'Get Garden Maintenance for Your Property',
    ctaText: 'Share the size of your green areas and what is there today, and we will propose a gardening team.',
    serviceType: 'Landscaping and Horticulture Maintenance',
  },
];
