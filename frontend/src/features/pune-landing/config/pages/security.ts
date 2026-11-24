import type { PuneLandingPageContent } from '../../domain/types';
import { heroImages } from '../heroImages';
import { REVIEWED_2026_11_17, REVIEWED_2026_11_24 } from '../review';

const PILLAR = { label: 'Security Services Pune', href: '/security-services-pune' };

/**
 * Security cluster. Every KARGAR-specific claim must trace to the Company Brochure / Company
 * Profile PDFs or companyTrust.ts — see seo-audit/SEO_CONTENT_PLAN.md §0.
 *
 * Verified security facts: security guards (brochure soft services); watchmen & gatekeepers,
 * security guards & supervisors, surveillance operators, bouncers and valets (profile org
 * structures); police verification & background checks, PF/ESIC compliance, attendance tracking
 * and digital reporting (companyTrust.ts); year-round training by Field Trainers and Quality
 * Managers and payroll transparency (profile p.10–11).
 *
 * NOT claimed anywhere until the business supplies documents: PSARA licence number, armed
 * guards, ex-servicemen, ISO or any certification, guard counts, response times, prices.
 * The PSARA Act is mentioned only as buyer guidance (what to check with any agency).
 */
export const securityPages: PuneLandingPageContent[] = [
  // ───────────────────────────── PILLAR ─────────────────────────────
  {
    path: '/security-services-pune',
    cluster: 'security',
    isPillar: true,
    breadcrumbLabel: 'Security Services Pune',
    summary: 'Police-verified security guards, supervisors and CCTV operators for offices, plants, institutes and housing societies in Pune.',
    seo: {
      title: 'Security Guard Services in Pune',
      description:
        'Security guard services in Pune for offices, plants, institutes and societies: police-verified guards, supervised posts and incident records. Get a proposal.',
      keywords: ['Security Guard Services in Pune', 'Security Services in Pune', 'Security Agency in Pune', 'Security Guards in Pune'],
    },
    eyebrow: 'Security in Pune',
    h1: 'Security Guard Services in Pune',
    heroSubtitle:
      'Police-verified, trained security guards for offices, commercial buildings, plants, institutes and housing societies, deployed to a written post plan under a security supervisor.',
    heroImage: heroImages.security,
    intro: [
      'KARGAR provides security guard services in Pune and Pimpri-Chinchwad for corporate offices, commercial buildings, factories and warehouses, institutes and housing societies. We assess your site, propose the posts and shifts it needs, deploy police-verified guards under a security supervisor, and keep visitor, attendance and incident records you can audit. To start, [request a security staffing proposal](/contact-us#contact-form) with your property type, locality and hours of coverage. We confirm everything else during the site assessment.',
      'Security services in Pune means more than a guard at the gate. A working arrangement has the right posts on the right shifts, written instructions for each post, a supervisor who checks them, and cover when a guard is absent. Guards are KARGAR employees with PF and ESIC compliance, so you do not carry the employer risk of a directly hired guard, and they receive year-round skill, safety and behavioural training from our Field Trainers and Quality Managers.',
    ],
    sections: [
      {
        kind: 'cards',
        heading: 'Security Services by Type of Property',
        intro: 'The basic job is the same everywhere: control who and what comes in and goes out, and respond properly when something goes wrong. How that is done depends on the property.',
        columns: 2,
        items: [
          { title: 'Corporate offices and commercial buildings', description: 'Reception and visitor management, access control, parking, after-hours patrols and asset movement. See [corporate security services in Pune](/corporate-security-services-pune).' },
          { title: 'Factories, plants and warehouses', description: 'Main and material gates, gate-pass checks, contractor labour entry, perimeter patrols and shift changeovers. See [industrial security services in Pune](/industrial-security-services-pune).' },
          { title: 'Housing societies', description: 'Gatekeeping, visitors, deliveries, domestic staff and resident parking, run to the committee’s rules. See [society security services in Pune](/society-security-services-pune).' },
          { title: 'Institutes and healthcare facilities', description: 'Campus entry, visitor and vendor control, and patrols planned around the institute’s working hours, using the same post-plan method described below.' },
        ],
      },
      {
        kind: 'table',
        heading: 'Security Roles We Deploy',
        intro: 'These are the security roles in KARGAR’s site organisation structures. A site usually needs a few of them, not all.',
        caption: 'Security roles provided by KARGAR and what each role does',
        columns: ['Role', 'What the role does', 'Typical use'],
        rows: [
          ['Security guard', 'Static posts, access control, patrols and incident reporting', 'Every site'],
          ['Watchman / gatekeeper', 'Gate operation, visitor and vehicle entry, gate registers', 'Societies, plants, campuses'],
          ['Security supervisor', 'Shift planning, post checks, guard briefings, first escalation point', 'Sites with several posts or shifts'],
          ['Surveillance operator', 'CCTV monitoring and access-control system operation', 'Sites with a CCTV or control room'],
          ['Bouncer', 'Crowd management at events and high-footfall entrances', 'Events, as needed'],
          ['Valet', 'Parking assistance for visitors and events', 'Commercial buildings, societies, events'],
        ],
      },
      {
        kind: 'steps',
        heading: 'How a Security Deployment Is Set Up',
        intro: 'This is the same sequence whether the site needs one gate post or a full multi-shift team.',
        steps: [
          { title: 'Site assessment', description: 'We walk the site with you: entry and exit points, perimeter, parking, working hours, visitor volume, valuables and what is going wrong today.' },
          { title: 'Post plan', description: 'Guard posts, shifts, patrol routes, the supervisor role and relief cover are written down and agreed with you before deployment.' },
          { title: 'Post instructions', description: 'Each post gets written instructions covering visitor checks, vehicle rules, material movement, emergency contacts and what to escalate.' },
          { title: 'Deployment and briefing', description: 'Verified, trained guards are deployed and briefed on your site’s instructions. The supervisor checks that each post follows them.' },
          { title: 'Records and review', description: 'Visitor logs, attendance and incident reports give you an auditable record. Performance is reviewed with you and the post plan is updated when the site changes.' },
        ],
      },
      {
        kind: 'table',
        heading: 'How Many Security Guards Does a Property Need?',
        intro: 'There is no fixed guards-per-square-foot ratio. The count comes from posts and hours. This worked example shows the method for one post covered round the clock.',
        caption: 'Worked example: staffing one round-the-clock security post',
        columns: ['Step', 'Assumption', 'Result'],
        rows: [
          ['Posts', 'One main gate that must always be manned', '1 post'],
          ['Shifts', 'Three 8-hour shifts cover 24 hours', '3 guards on duty per day'],
          ['Weekly off', 'Each guard works 6 days a week, the post runs 7 days', 'About 1 extra guard for relief'],
          ['Supervision', 'A supervisor is added once there are several posts or shifts', 'Planned per site'],
        ],
        note: 'Multiply by the number of posts, then adjust for patrols, peak hours and day-only posts. We work out the count with you during the site assessment.',
      },
      {
        kind: 'table',
        heading: 'What the Guarding Proposal Includes',
        intro: 'After the site assessment you receive a written proposal. It sets out what will be deployed and how it will be run, so you can compare it line by line with your current arrangement.',
        caption: 'Contents of a KARGAR security staffing proposal',
        columns: ['Section', 'What it tells you'],
        rows: [
          ['Post plan', 'Each guard post, its hours, the patrol routes and which posts run at night or on weekends'],
          ['Staffing', 'Guards per shift, relief cover for weekly offs, and whether a security supervisor or surveillance operator is included'],
          ['Post instructions', 'The written rules for each post: visitor checks, vehicle entry, material movement, emergency contacts and what to escalate'],
          ['Records you receive', 'Visitor and vehicle logs, attendance, and incident reports, and how and how often they are shared with you'],
          ['Supervision and escalation', 'Who checks the posts, and the escalation path from guard to supervisor to KARGAR management'],
          ['Your responsibilities', 'What the site provides, for example a guard cabin, registers or access-control equipment, agreed case by case'],
          ['Commercial terms', 'The charges for the agreed staffing and what they include. No rates are quoted before the post plan is agreed'],
        ],
      },
      {
        kind: 'cards',
        heading: 'Screening, Training and Supervision',
        columns: 2,
        items: [
          { title: 'Police verification', description: 'Security personnel go through police verification and background checks before they are deployed to any site.' },
          { title: 'Year-round training', description: 'Skill, safety and behavioural training is run throughout the year by KARGAR’s Field Trainers and Quality Managers, not only at induction.' },
          { title: 'Attendance and reporting', description: 'Attendance is tracked and reporting is digital, so you can see who was on duty and what was recorded on each shift.' },
          { title: 'Compliance and payroll transparency', description: 'Guards are on KARGAR’s payroll with PF and ESIC compliance. Under our 100% financial transparency commitment, you can ask what compensation is paid to the staff at your site.' },
        ],
      },
      {
        kind: 'checklist',
        heading: 'What to Send Us for a Useful Proposal',
        intro: 'You can enquire with only the first group. The rest helps us arrive at the assessment prepared.',
        groups: [
          { title: 'Enough to start', items: ['Property type, for example office, plant, society or campus', 'Locality in Pune or PCMC', 'Hours you need covered: day, night or round the clock'] },
          { title: 'Helpful if you know it', items: ['Number of entry points or guard posts you have in mind', 'Your current setup: no guards, direct hires or another agency', 'Problems you want solved, such as unlogged visitors or asset movement'] },
          { title: 'Not needed to enquire', items: ['The exact number of guards. We work it out from posts and shifts', 'Floor plans or drawings. We walk the site with you instead', 'A budget figure. The proposal shows what each option costs'] },
        ],
      },
      {
        kind: 'checklist',
        heading: 'What to Check Before Hiring a Security Agency in Pune',
        intro: 'Whichever agency you choose, ask for these in writing. Our [guide to choosing a security agency in Pune](/resources/how-to-choose-a-security-agency-pune) explains each check.',
        groups: [
          { title: 'Legal and compliance', items: ['A current licence under the Private Security Agencies (Regulation) Act, 2005', 'PF and ESIC registration, with proof that contributions are paid', 'Police verification records for deployed guards'] },
          { title: 'Operations', items: ['A written post plan with shifts and relief cover', 'Post instructions for each post', 'Who supervises, and how often posts are checked'] },
          { title: 'Accountability', items: ['How absences and replacements are handled', 'What records you receive: visitor logs, incident reports, attendance', 'A named escalation path above the supervisor'] },
        ],
      },
      {
        kind: 'prose',
        heading: 'Where We Provide Security in Pune',
        paragraphs: [
          'We operate from Baner and deploy security teams across Pune and Pimpri-Chinchwad (PCMC). That includes offices and commercial buildings in the western and eastern business districts, residential societies across the city, and industrial sites in the PCMC belt. Guards for a site are deployed to that site, so coverage is confirmed per property during the assessment rather than drawn on a fixed map.',
          'Security often works best alongside other site services. When security and [housekeeping services in Pune](/housekeeping-services-pune) report to the same site manager, gate, parking and common-area issues stop bouncing between vendors. Security can also be combined with maintenance and support staff under our [integrated facility management in Pune](/facility-management-company-pune), or supplied as part of [facility staffing and manpower](/facility-staffing-services-pune).',
        ],
      },
    ],
    faqs: [
      { question: 'What services does a security agency provide?', answer: 'A security agency supplies verified, trained security personnel and manages them on site. That covers deployment to agreed posts and shifts, supervision, replacement during absences, payroll and statutory compliance, visitor and incident records, and escalation when something goes wrong.' },
      { question: 'Are your security guards police-verified?', answer: 'Yes. Security personnel go through police verification and background checks before deployment.' },
      { question: 'What hours can security cover?', answer: 'Coverage hours, guard posts and shifts are agreed with you during the site assessment and written into the post plan for your site, including night and weekend posts where you need them.' },
      { question: 'What happens during a security incident?', answer: 'The guard acts on the post instructions and the site’s emergency procedure, informs the supervisor, and the incident is recorded. It escalates to KARGAR management and, where needed, the local authorities.' },
      { question: 'Can security services be combined with housekeeping?', answer: 'Yes. Many clients use our housekeeping and security teams together as part of [integrated facility management](/facility-management-company-pune), with one point of contact.' },
      { question: 'Are you hiring security guards?', answer: 'This page is for organisations that need security services. If you are looking for a security guard job, email your details to our HR desk at hrdesk@kargar.co.in rather than using the proposal form.' },
    ],
    relatedLinks: [
      { label: 'Corporate Security Services', href: '/corporate-security-services-pune' },
      { label: 'Industrial Security Services', href: '/industrial-security-services-pune' },
      { label: 'Society Security Services', href: '/society-security-services-pune' },
      { label: 'How to Choose a Security Agency', href: '/resources/how-to-choose-a-security-agency-pune' },
    ],
    ctaHeading: 'Request a Security Staffing Proposal',
    ctaText: 'Share your property type, locality and the hours you need covered. Entry points and your current setup help but are optional. We confirm them at the site assessment and send a written post plan.',
    ctaLabel: 'Request a Security Staffing Proposal',
    serviceType: 'Security Guard Services',
    enquiryService: 'security',
    review: { ...REVIEWED_2026_11_24, pendingFacts: ['PSARA licence number and validity (buyer checklist tells buyers to ask for one)'] },
  },

  // ───────────────────────────── CORPORATE & COMMERCIAL ─────────────────────────────
  {
    path: '/corporate-security-services-pune',
    cluster: 'security',
    parent: PILLAR,
    breadcrumbLabel: 'Corporate Security',
    summary: 'Reception, visitor management, access control, after-hours patrols and asset movement for corporate offices and commercial buildings in Pune.',
    seo: {
      title: 'Corporate Security in Pune',
      description:
        'Corporate security services in Pune for offices and commercial buildings: visitor management, access control, after-hours patrols and police-verified guards.',
      keywords: ['Corporate Security Services Pune', 'Office Security Services Pune', 'Commercial Security Services Pune', 'Corporate Security Guards Pune'],
    },
    eyebrow: 'Corporate Security',
    h1: 'Corporate Security Services in Pune',
    heroSubtitle:
      'For admin, facility and HR teams running offices and commercial buildings in Pune: security that manages visitors and access, protects assets after hours, and gives you records you can rely on.',
    heroImage: heroImages.security,
    intro: [
      'Corporate security is mostly about controlled access. An office building has employees, visitors, interview candidates, couriers, vendors and housekeeping staff coming through the same doors all day. Laptops, documents and equipment move in and out. Floors stay lit long after most people leave. Most security failures in offices are not dramatic. They are an unchecked visitor, an asset that left without a gate pass, or a floor nobody patrolled at night.',
      'KARGAR provides corporate security services in Pune for single-occupier offices and for multi-tenant commercial buildings. Police-verified, trained guards work to written post instructions under a security supervisor, and visitor and incident records are kept so your admin team can answer questions with evidence.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Security Posts in a Typical Office Building',
        intro: 'Every building is different. This is the starting framework we adapt during the site assessment.',
        caption: 'Common security posts in office and commercial buildings and their duties',
        columns: ['Post', 'Main duties'],
        rows: [
          ['Main entrance and reception', 'Visitor registration, host confirmation, visitor passes, courier and delivery handling'],
          ['Lift lobby or floor access', 'Access-card or turnstile supervision, tailgating checks, directing visitors'],
          ['Parking and basement', 'Vehicle entry and exit logging, parking allocation, patrols of lower levels'],
          ['Service and loading entry', 'Vendor and housekeeping staff entry, material in and out against gate passes'],
          ['CCTV or control room', 'Camera monitoring by a surveillance operator, access-control system operation'],
          ['After-hours patrol', 'Floor rounds, doors and windows checked, lights and equipment noted, incidents logged'],
        ],
      },
      {
        kind: 'steps',
        heading: 'How Visitor and Access Management Works',
        intro: 'The visitor process is where office security is won or lost, so it is written down and followed the same way on every shift.',
        steps: [
          { title: 'Registration', description: 'Every visitor is recorded in your register or visitor-management system with name, contact, host and purpose.' },
          { title: 'Host confirmation', description: 'The guard or reception confirms with the host before the visitor goes beyond the lobby.' },
          { title: 'Pass and escort rules', description: 'A visitor pass is issued, and restricted areas follow your escort rules.' },
          { title: 'Exit logging', description: 'Exit time is recorded and the pass returned, so the register shows who is still inside at any point.' },
          { title: 'Material check', description: 'Laptops and equipment leaving the building are checked against your gate-pass procedure.' },
        ],
      },
      {
        kind: 'cards',
        heading: 'What Corporate Clients Usually Ask Us to Cover',
        columns: 2,
        items: [
          { title: 'After-hours and weekend security', description: 'Patrol rounds with recorded checks when the office is empty, plus controlled entry for staff working late or on weekends.' },
          { title: 'Asset and material movement', description: 'Gate-pass checks for IT equipment, furniture and stock, with outward and inward entries logged.' },
          { title: 'Professional front-of-house conduct', description: 'Guards at reception are trained to be courteous with clients and candidates while still applying procedure firmly.' },
          { title: 'Emergency procedures', description: 'Guards follow the building’s emergency and evacuation plan, help keep exits clear and escalate through the supervisor.' },
        ],
      },
      {
        kind: 'compare',
        heading: 'Single-Occupier Office or Multi-Tenant Commercial Building?',
        intro: 'Both are covered on this page, but the security set-up is planned differently.',
        left: {
          title: 'Single-occupier corporate office',
          items: [
            'Security reports to your admin or facilities team',
            'Visitor rules follow your company policy',
            'Access control is tied to your employee cards',
            'Often combined with [corporate housekeeping](/corporate-housekeeping-services-pune) under one contract',
          ],
        },
        right: {
          title: 'Multi-tenant commercial building',
          items: [
            'Security reports to the owner, property manager or association',
            'Common areas, parking and the main gate are covered for all tenants',
            'Each tenant’s visitor rules have to be supported at one reception',
            'Often combined with common-area services under [commercial facility management](/commercial-facility-management-pune)',
          ],
        },
      },
      {
        kind: 'callout',
        heading: 'Records your compliance team can use',
        text: 'Visitor registers, attendance records and incident reports are maintained for your site. When an internal audit or an incident review asks who entered, when, and what the guard did, the answer is on record. KARGAR guards are also on our payroll with PF and ESIC compliance.',
      },
    ],
    faqs: [
      { question: 'What is corporate security?', answer: 'Corporate security is the protection of an organisation’s offices, people and assets. Day to day, that means controlling access, managing visitors, checking material movement, patrolling after hours and responding to incidents under a written procedure.' },
      { question: 'Can your guards work with our access-card and visitor-management systems?', answer: 'Yes. Guards are trained on your site’s procedure, whether it uses access cards, turnstiles, a visitor app or a register. Surveillance operators can monitor CCTV and operate access-control systems.' },
      { question: 'Do you provide security for multi-tenant commercial buildings?', answer: 'Yes. For commercial buildings the contract is usually with the owner, property manager or association, and covers the main entrance, common areas and parking for all tenants.' },
      { question: 'Can security cover nights and weekends only?', answer: 'Yes. Posts and shifts are planned around when you need cover. Some offices only need after-hours and weekend security, which is written into the post plan.' },
      { question: 'Can you take over from our current security agency?', answer: 'Yes. We assess the site, write the post plan and instructions before the changeover date, and plan the handover so no post is left uncovered.' },
    ],
    relatedLinks: [
      { label: 'Security Services in Pune', href: '/security-services-pune' },
      { label: 'Corporate Housekeeping in Pune', href: '/corporate-housekeeping-services-pune' },
      { label: 'Office Facility Management', href: '/office-facility-management-pune' },
      { label: 'How to Choose a Security Agency', href: '/resources/how-to-choose-a-security-agency-pune' },
    ],
    ctaHeading: 'Plan Security for Your Office or Commercial Building',
    ctaText: 'Share the number of floors and entrances, working hours, visitor volume and current arrangement. We will propose posts, shifts and post instructions.',
    ctaLabel: 'Discuss Office Security',
    serviceType: 'Corporate Security Services',
    enquiryService: 'security',
    showInFooter: true,
    review: REVIEWED_2026_11_17,
  },

  // ───────────────────────────── INDUSTRIAL ─────────────────────────────
  {
    path: '/industrial-security-services-pune',
    cluster: 'security',
    parent: PILLAR,
    breadcrumbLabel: 'Industrial Security',
    summary: 'Gate control, material gate passes, contractor labour entry, perimeter patrols and shift changeovers for factories and warehouses around Pune.',
    seo: {
      title: 'Industrial Security in Pune',
      description:
        'Industrial security services in Pune for factories and warehouses: gate control, material gate passes, contractor entry, patrols and police-verified guards.',
      keywords: ['Industrial Security Services Pune', 'Factory Security Services Pune', 'Warehouse Security Services Pune', 'Industrial Security Guards Pune'],
    },
    eyebrow: 'Industrial Security',
    h1: 'Industrial Security Services in Pune',
    heroSubtitle:
      'For plant heads, admin and HR managers at manufacturing units and warehouses: security built around gates, gate passes, shifts and large perimeters.',
    heroImage: heroImages.security,
    intro: [
      'Industrial security is about movement: people, vehicles and material crossing the plant boundary all day, across shifts. A manufacturing unit has permanent employees, contract labour, transporters, vendors and visitors, often through different gates. Raw material comes in and finished goods, scrap and returnable items go out. Losses in a plant rarely come from a break-in. They come from material leaving without a valid gate pass, unchecked vehicles, or a perimeter nobody patrolled on the night shift.',
      'KARGAR provides industrial security services for manufacturing sites and warehouses around Pune. Police-verified, trained guards work to written post instructions that follow your plant’s own procedures, under a security supervisor who owns each shift. Industrial sites often run housekeeping through the same provider. Our [industrial housekeeping services in Pune](/industrial-housekeeping-services-pune) work alongside the security team.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'Industrial Security Posts and What Each One Does',
        intro: 'The posts depend on your layout. This is the framework we start from during the site assessment.',
        caption: 'Common security posts at factories and warehouses and their duties',
        columns: ['Post', 'Main duties'],
        rows: [
          ['Main gate', 'Employee and visitor entry, visitor registration, vehicle entry and exit logs'],
          ['Material gate', 'Inward and outward material checked against gate passes, challans and your procedure; returnable items tracked'],
          ['Contractor and labour gate', 'Identity and entry checks for contract workers, entry and exit records matched to shifts'],
          ['Perimeter patrol', 'Boundary-wall and fence rounds, especially at night, with recorded checkpoints'],
          ['Stores and scrap yard', 'Access restricted to authorised staff, movements recorded'],
          ['CCTV room', 'Camera monitoring by a surveillance operator, with incidents logged'],
        ],
      },
      {
        kind: 'steps',
        heading: 'Shift Changeover: Where Industrial Security Slips',
        intro: 'Plants run in shifts, and so does security. The handover between shifts is a common weak point, so it follows a fixed routine.',
        steps: [
          { title: 'Post-by-post handover', description: 'The outgoing guard briefs the incoming guard at the post itself, not in the guard room.' },
          { title: 'Register check', description: 'Open visitor entries, vehicles still inside and pending gate passes are reviewed and signed over.' },
          { title: 'Incident briefing', description: 'Anything unusual from the previous shift is passed on and recorded.' },
          { title: 'Supervisor round', description: 'The shift supervisor checks every post early in the shift and records the check.' },
        ],
      },
      {
        kind: 'checklist',
        heading: 'Plant Procedures We Write Into the Post Instructions',
        intro: 'Your plant already has rules. Our job is to make every guard on every shift apply them the same way.',
        groups: [
          { title: 'Material', items: ['Gate-pass formats and who may sign them', 'Returnable and non-returnable material rules', 'Scrap and finished-goods dispatch checks'] },
          { title: 'Vehicles', items: ['Transporter and truck entry procedure', 'Vehicle checking rules as set by the plant', 'Parking and loading-bay movement'] },
          { title: 'People', items: ['Contract-labour entry and identity checks', 'Visitor registration and your safety-induction requirement', 'Restricted areas and escort rules'] },
        ],
      },
      {
        kind: 'prose',
        heading: 'Security for Pune’s Manufacturing Belts',
        paragraphs: [
          'Much of Pune’s manufacturing sits in industrial areas such as Chakan, Talegaon, Bhosari and the Pimpri-Chinchwad MIDC zones. Sites there often run round the clock, cover large plots with long boundary walls, and handle heavy transporter traffic. These factors drive the number of posts and patrols far more than the built-up area does. We confirm coverage and staffing for each site during the assessment.',
          'Because KARGAR also provides housekeeping, technicians and support staff, a plant can bring security together with other services under one provider. See our [facility staffing and manpower services](/facility-staffing-services-pune) or the main [security services in Pune](/security-services-pune) page for other property types.',
        ],
      },
      {
        kind: 'callout',
        heading: 'Contractor compliance matters to the principal employer',
        text: 'When a plant outsources security, the plant is generally treated as the principal employer for labour-law purposes. KARGAR guards are on our payroll with PF and ESIC compliance, and under our 100% financial transparency commitment you can ask what compensation is paid to the staff deployed at your site.',
      },
    ],
    faqs: [
      { question: 'What is industrial security?', answer: 'Industrial security protects manufacturing units, warehouses and their material, people and assets. In practice it means gate control, material gate-pass checks, vehicle and contractor entry records, perimeter patrols and incident reporting across every shift.' },
      { question: 'Can your guards follow our plant’s gate-pass procedure?', answer: 'Yes. Your gate-pass formats, signing authorities and vehicle-checking rules are written into the post instructions, and guards are briefed on them before deployment.' },
      { question: 'Do you provide security for warehouses as well as factories?', answer: 'Yes. Warehouses need the same core controls of gate, vehicle and material checks and patrols. The posts are planned around loading bays and dispatch timings.' },
      { question: 'Can security be planned around three production shifts?', answer: 'Yes. Posts, guard shifts and supervisor coverage are planned to match your production shifts, with a fixed handover routine at each changeover.' },
      { question: 'Do you also provide housekeeping for industrial sites?', answer: 'Yes. Shop floors, canteens and amenities can be covered by our [industrial housekeeping](/industrial-housekeeping-services-pune) team under the same provider.' },
    ],
    relatedLinks: [
      { label: 'Security Services in Pune', href: '/security-services-pune' },
      { label: 'Industrial Housekeeping in Pune', href: '/industrial-housekeeping-services-pune' },
      { label: 'Facility Staffing & Manpower', href: '/facility-staffing-services-pune' },
      { label: 'How to Choose a Security Agency', href: '/resources/how-to-choose-a-security-agency-pune' },
    ],
    ctaHeading: 'Plan Security for Your Plant or Warehouse',
    ctaText: 'Share the number of gates, shifts, plot size and current security arrangement. We will propose posts, patrols and post instructions for your site.',
    ctaLabel: 'Discuss Plant Security',
    serviceType: 'Industrial Security Services',
    enquiryService: 'security',
    showInFooter: true,
    review: REVIEWED_2026_11_17,
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
      'KARGAR provides security for Pune housing societies as part of the same site structure we use for housekeeping and maintenance, with police-verified, trained security personnel.',
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
      { question: 'Are your society security guards police-verified?', answer: 'Yes. KARGAR’s security personnel are police-verified and trained before deployment.' },
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
    enquiryService: 'security',
    showInFooter: true,
    review: REVIEWED_2026_11_17,
  },
];
