import type { GuidePageContent } from '@/features/pune-landing/domain/types';

/**
 * Informational guides under /resources. Authored by "KARGAR Facility Management" (organization),
 * never an invented person. Dates are the real publish/update dates — update dateModified only
 * when the content materially changes.
 */
export const guidePageList: GuidePageContent[] = [
  // ───────────────────────────── CHOOSING A COMPANY ─────────────────────────────
  {
    path: '/resources/how-to-choose-a-housekeeping-company-pune',
    breadcrumbLabel: 'Choosing a Housekeeping Company',
    summary: 'The questions, documents and red flags that separate a reliable housekeeping contract from a staffing headache.',
    seo: {
      title: 'Choosing a Housekeeping Company',
      description:
        'How to choose a housekeeping company in Pune: what to check on staff verification, supervision, PF/ESIC compliance, scope and contracts before you sign.',
      keywords: ['How to Choose a Housekeeping Company', 'Housekeeping Vendor Selection Pune', 'Housekeeping Contract Checklist'],
    },
    h1: 'How to Choose a Housekeeping Company in Pune',
    standfirst: 'A practical checklist for admin managers, facility heads and society committees comparing housekeeping vendors.',
    datePublished: '2026-10-08',
    dateModified: '2026-10-08',
    intro: [
      'Most housekeeping contracts that go wrong do not fail on cleaning skill. They fail on staffing continuity, supervision and compliance — the things that are hard to see in a sales meeting. This guide lists what to check, what to ask for in writing, and the warning signs to watch for, whichever company you choose.',
    ],
    sections: [
      {
        kind: 'steps',
        heading: 'Step-by-Step Selection Process',
        steps: [
          { title: 'Write down your requirement', description: 'Property type, approximate area, washrooms, working hours and shifts, and whether you want staff only or a managed service. Our [staffing guide](/resources/how-many-housekeeping-staff) helps estimate headcount.' },
          { title: 'Shortlist providers who serve your property type', description: 'A vendor experienced with offices may not understand a housing society’s committee, waste process or residents — and the reverse.' },
          { title: 'Insist on a site survey', description: 'A proposal written without seeing the site is a guess. Good providers walk the property before quoting.' },
          { title: 'Compare written scopes, not just prices', description: 'Line up what each quote includes: tasks and frequencies, supervision, materials, machines, consumables. See [what drives housekeeping cost](/resources/housekeeping-cost-pune).' },
          { title: 'Check compliance documents', description: 'Ask how PF and ESIC are paid and how you can verify it. Compliance gaps can become the principal employer’s problem.' },
          { title: 'Agree how performance will be measured', description: 'Checklists, inspections, reporting and escalation should be in the contract, not just promised.' },
        ],
      },
      {
        kind: 'checklist',
        heading: 'Questions to Ask Every Vendor',
        groups: [
          {
            title: 'Staff',
            items: [
              'Are staff police-verified and background-checked before deployment?',
              'What training do they get, and who delivers it?',
              'How are absences and leave covered?',
              'What is your staff turnover?',
            ],
          },
          {
            title: 'Supervision and quality',
            items: [
              'Who supervises, how often, and are inspections recorded?',
              'Do you use daily checklists? Can I see a sample from a live site?',
              'What reports will I receive, and how often?',
              'Who do I escalate to above the supervisor?',
            ],
          },
          {
            title: 'Contract and money',
            items: [
              'Are PF and ESIC paid on actual wages, and can you prove it?',
              'Can I see what the deployed staff are actually paid?',
              'Which materials, machines and consumables are included?',
              'What are the notice and transition terms?',
            ],
          },
        ],
      },
      {
        kind: 'compare',
        heading: 'Green Flags and Red Flags',
        left: {
          title: 'Red flags',
          items: [
            'A per-person rate that looks far below the market, with no breakdown',
            'Vague answers about PF, ESIC or wages',
            'No site visit before the quote',
            'No named supervisor or escalation contact',
            'Scope described as “complete cleaning” with no task list',
          ],
        },
        right: {
          title: 'Green flags',
          items: [
            'A written scope with daily, weekly and monthly tasks',
            'Verification and training explained clearly',
            'Willingness to show what staff are paid',
            'Sample checklists and reports from live sites',
            'A transition plan from your current vendor',
          ],
        },
      },
      {
        kind: 'prose',
        heading: 'Managed Service or Manpower Supply?',
        paragraphs: [
          'Decide early whether you want a provider to own the outcome (a managed housekeeping service with scope, supervision and quality responsibility) or only to supply people who work under your direction (manpower supply). Both are legitimate, but they should be priced and contracted differently. KARGAR offers both: [managed housekeeping services in Pune](/housekeeping-services-pune) and [housekeeping staff and manpower supply](/housekeeping-staff-pune).',
        ],
      },
      {
        kind: 'callout',
        heading: 'How KARGAR answers these questions',
        text: 'KARGAR deploys police-verified, trained staff with supervision and daily checklists, handles PF and ESIC, and — under its 100% financial transparency commitment — gives clients the right to ask what the deployed staff are paid. If you are comparing vendors, [request a proposal](/contact-us) and hold us to this list.',
      },
    ],
    faqs: [
      { question: 'Should I always choose the lowest quote?', answer: 'Not without comparing scope and compliance. A low quote can mean fewer staff than needed, no materials, or wages and statutory contributions that are not being paid properly.' },
      { question: 'Is a trial period a good idea?', answer: 'It can be, as long as the scope and performance measures for the trial are written down so the result can be judged fairly.' },
      { question: 'What documents should a housekeeping company provide?', answer: 'A written scope, a commercial breakdown, and evidence of statutory compliance such as PF and ESIC payments for deployed staff, in addition to standard company registration details.' },
    ],
    relatedLinks: [
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
      { label: 'What Determines Housekeeping Cost', href: '/resources/housekeeping-cost-pune' },
      { label: 'How Many Housekeeping Staff Do You Need?', href: '/resources/how-many-housekeeping-staff' },
    ],
  },

  // ───────────────────────────── OFFICE CHECKLIST ─────────────────────────────
  {
    path: '/resources/office-housekeeping-checklist',
    breadcrumbLabel: 'Office Housekeeping Checklist',
    summary: 'Daily, weekly and monthly housekeeping tasks for offices, organised by area — ready to adapt for your own site.',
    seo: {
      title: 'Office Housekeeping Checklist',
      description:
        'An office housekeeping checklist with daily, weekly and monthly tasks for work areas, washrooms, pantries and meeting rooms — free to adapt for your office.',
      keywords: ['Office Housekeeping Checklist', 'Office Cleaning Checklist', 'Daily Housekeeping Checklist'],
    },
    h1: 'Office Housekeeping Checklist: Daily, Weekly and Monthly Tasks',
    standfirst: 'A working checklist you can adapt for your own office, whether housekeeping is done in-house or by a vendor.',
    datePublished: '2026-10-08',
    dateModified: '2026-10-08',
    intro: [
      'A checklist does two jobs: it tells housekeeping staff exactly what to do, and it gives the office manager something concrete to check against. The lists below are organised by frequency and area. Remove what does not apply to your office, add what is specific to it, and have the supervisor sign off each list.',
    ],
    sections: [
      {
        kind: 'checklist',
        heading: 'Daily Tasks',
        groups: [
          { title: 'Work areas', items: ['Sweep and mop floors; vacuum carpets', 'Dust desks, cabinets and window sills', 'Empty bins and replace liners', 'Segregate wet and dry waste'] },
          { title: 'Washrooms', items: ['Clean and disinfect toilets, urinals and basins', 'Clean mirrors and wipe fixtures', 'Refill soap, tissue and hand towels', 'Mop floors and check for odour; repeat on a fixed round'] },
          { title: 'Pantry and common areas', items: ['Clean counters, sinks and appliances', 'Wash crockery and clear dish racks', 'Wipe reception, lift lobby and door handles', 'Reset meeting rooms after use'] },
        ],
      },
      {
        kind: 'checklist',
        heading: 'Weekly Tasks',
        groups: [
          { title: 'Surfaces', items: ['Clean glass partitions and doors', 'Wipe chairs and furniture in detail', 'Dust phones, keyboards and shared equipment (as permitted)'] },
          { title: 'Washrooms and pantry', items: ['Descale taps, basins and tiles', 'Clean refrigerator and microwave interiors', 'Deep-clean waste bins'] },
          { title: 'Checks', items: ['Inventory of consumables', 'Report damaged fixtures or lights', 'Review the week’s checklist gaps with the supervisor'] },
        ],
      },
      {
        kind: 'checklist',
        heading: 'Monthly and Periodic Tasks',
        groups: [
          { title: 'Floors', items: ['Machine scrubbing of hard floors', 'Shampooing or deep vacuuming of carpets (periodic)'] },
          { title: 'High and hidden areas', items: ['High-level dusting of ducts, vents and light fittings', 'Cleaning behind and under furniture', 'Fan and fixture cleaning'] },
          { title: 'Back of house', items: ['Storerooms and pantry storage', 'Server-room surroundings (as permitted by IT)', 'Fire exits and staircases'] },
        ],
      },
      {
        kind: 'table',
        heading: 'How to Use the Checklist',
        caption: 'Checklist governance for office housekeeping',
        columns: ['Who', 'Responsibility'],
        rows: [
          ['Housekeeping staff', 'Complete tasks and mark them on the checklist during the shift'],
          ['Supervisor', 'Inspect a sample of tasks, sign off, and note gaps'],
          ['Office or admin manager', 'Review sign-offs weekly and raise issues with the vendor'],
        ],
        note: 'Not sure how many people it takes to complete this list? Read [how many housekeeping staff your building needs](/resources/how-many-housekeeping-staff).',
      },
      {
        kind: 'prose',
        heading: 'When a Checklist Is Not Enough',
        paragraphs: [
          'A checklist only works if someone supervises against it. If the lists are being ticked but the office still is not clean, the issue is usually staffing or supervision rather than the list. KARGAR’s [office housekeeping services in Pune](/office-housekeeping-services-pune) are built around supervised checklists like these; larger offices may need [corporate housekeeping](/corporate-housekeeping-services-pune) with shift-wise supervision.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Office Housekeeping in Pune', href: '/office-housekeeping-services-pune' },
      { label: 'How to Choose a Housekeeping Company', href: '/resources/how-to-choose-a-housekeeping-company-pune' },
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
    ],
  },

  // ───────────────────────────── COST ─────────────────────────────
  {
    path: '/resources/housekeeping-cost-pune',
    breadcrumbLabel: 'Housekeeping Cost in Pune',
    summary: 'What actually drives the price of a housekeeping contract in Pune, and how to compare quotes fairly.',
    seo: {
      title: 'Housekeeping Cost in Pune',
      description:
        'What determines housekeeping cost in Pune: staff count, shifts, wages, statutory contributions, materials, machines and supervision — and how to compare quotes.',
      keywords: ['Housekeeping Cost in Pune', 'Housekeeping Services Price Pune', 'Housekeeping Contract Cost'],
    },
    h1: 'What Determines the Cost of Housekeeping Services in Pune',
    standfirst: 'There is no honest single price for housekeeping. Here is what goes into a quote, so you can compare them properly.',
    datePublished: '2026-10-08',
    dateModified: '2026-10-08',
    intro: [
      'Ask ten housekeeping companies in Pune for a price and you will get ten different numbers, often quoted per person per month. The differences usually come from what is — and is not — included. This guide explains the components of a housekeeping quote so you can see why prices differ and which differences matter. We deliberately do not publish rates: any figure without your scope would be misleading.',
    ],
    sections: [
      {
        kind: 'table',
        heading: 'The Main Cost Drivers',
        caption: 'Housekeeping cost drivers and their effect',
        columns: ['Driver', 'Why it changes the cost'],
        rows: [
          ['Number of staff', 'The largest single factor. It follows from area, footfall, washroom count and scope — see our [staffing guide](/resources/how-many-housekeeping-staff)'],
          ['Shifts and hours', 'Extended hours, night shifts and seven-day coverage need more people and relief staff for weekly offs'],
          ['Wages', 'Statutory minimum wages are notified by the Government of Maharashtra and revised periodically; skill level of the role also matters'],
          ['Statutory contributions', 'Employer contributions such as PF and ESIC, plus bonus and leave entitlements, are legally required costs'],
          ['Supervision', 'A dedicated on-site supervisor costs more than visiting supervision, and is worth it for larger teams'],
          ['Materials and consumables', 'Chemicals, liners, tissue and soap may be included or billed separately'],
          ['Machines', 'Scrubbers, vacuum cleaners and other equipment may be provided, rented or excluded'],
          ['Periodic deep cleaning', 'Frequency of deep cleaning and specialised jobs adds to cost'],
          ['Management fee', 'The provider’s margin for recruitment, training, replacement, compliance and management'],
        ],
      },
      {
        kind: 'callout',
        heading: 'Why the cheapest quote can cost more',
        text: 'If a quote is far below others for the same scope, something has to give: fewer staff than needed, no materials, no supervision — or wages and statutory contributions that are not being paid properly. Under Indian labour law, the principal employer can be exposed when a contractor fails on these, so it is worth asking how compliance is evidenced.',
      },
      {
        kind: 'checklist',
        heading: 'How to Compare Quotes Fairly',
        groups: [
          { title: 'Normalise the scope', items: ['Same number of staff and shifts', 'Same task list and frequencies', 'Same supervision level'] },
          { title: 'Check inclusions', items: ['Materials and consumables', 'Machines and equipment', 'Uniforms and safety gear'] },
          { title: 'Check compliance', items: ['Wages at or above statutory minimums', 'PF and ESIC on actual wages', 'How you will be able to verify payments'] },
        ],
      },
      {
        kind: 'prose',
        heading: 'Ways to Control Cost Without Cutting Quality',
        paragraphs: [
          'The most effective lever is scope design: concentrating staff at peak times, scheduling heavy work outside business hours, and using machines where they replace manual effort on large floors. Combining services can also help — one provider running housekeeping alongside security or maintenance can share supervision across functions, which is part of the case for [integrated facility management](/facility-management-company-pune).',
          'KARGAR quotes after a site survey and, under our 100% financial transparency commitment, clients can ask what the deployed staff are paid. To get a costed proposal, see [housekeeping services in Pune](/housekeeping-services-pune) or [contact our team](/contact-us).',
        ],
      },
    ],
    faqs: [
      { question: 'Why do housekeeping companies quote per person per month?', answer: 'Because staff wages and statutory costs make up most of the cost, and they scale with headcount. Materials, machines and supervision should still be shown clearly in the quote.' },
      { question: 'Can I get a price without a site visit?', answer: 'You can get an indicative figure, but an accurate quote depends on area, footfall, hours and scope, which is why a site survey is normally needed.' },
      { question: 'Does KARGAR publish its rates?', answer: 'No. Every quote is built from the site’s scope after a survey, so a published rate would not reflect what you would actually pay.' },
    ],
    relatedLinks: [
      { label: 'How Many Housekeeping Staff Do You Need?', href: '/resources/how-many-housekeeping-staff' },
      { label: 'How to Choose a Housekeeping Company', href: '/resources/how-to-choose-a-housekeeping-company-pune' },
      { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
    ],
  },

  // ───────────────────────────── STAFFING ─────────────────────────────
  {
    path: '/resources/how-many-housekeeping-staff',
    breadcrumbLabel: 'How Many Housekeeping Staff?',
    summary: 'A step-by-step method for estimating housekeeping headcount from tasks, hours and coverage.',
    seo: {
      title: 'How Many Housekeeping Staff?',
      description:
        'How many housekeeping staff does a building need? A step-by-step method to estimate headcount from areas, tasks, shifts and relief for offices and societies.',
      keywords: ['How Many Housekeeping Staff', 'Housekeeping Staff Calculation', 'Housekeeping Manpower Planning'],
    },
    h1: 'How Many Housekeeping Staff Does Your Building Need?',
    standfirst: 'There is no universal ratio per square foot. Here is the method we use to work out headcount from the work itself.',
    datePublished: '2026-10-08',
    dateModified: '2026-10-08',
    intro: [
      'Square-foot ratios are popular because they are easy, but they ignore what really drives workload: how many washrooms there are, how many people use the space, how long it is open, and what standard is expected. Two buildings of the same size can need very different teams. The method below builds headcount up from the tasks instead.',
    ],
    sections: [
      {
        kind: 'steps',
        heading: 'The Five-Step Method',
        steps: [
          { title: 'List areas and tasks', description: 'Break the property into areas (work floors, washrooms, pantry, lobbies, stairs, parking, grounds) and list the daily tasks for each. Our [office housekeeping checklist](/resources/office-housekeeping-checklist) is a starting point.' },
          { title: 'Estimate time per task', description: 'Estimate how long each task takes and how many times a day it is repeated. Washroom rounds and lobby cleaning are repeated; desk dusting usually is not.' },
          { title: 'Add up daily person-hours', description: 'Multiply and total to get the person-hours of work needed per day, split by shift if the property runs more than one.' },
          { title: 'Divide by productive hours per person', description: 'A shift is not all productive time — allow for breaks, movement and material handling. Divide daily person-hours by realistic productive hours per person per shift.' },
          { title: 'Add relief and supervision', description: 'Add relief cover for weekly offs and leave if the property needs cleaning every day, then decide whether supervision is on-site or visiting.' },
        ],
      },
      {
        kind: 'table',
        heading: 'Illustrative Example',
        intro: 'The numbers below are assumptions chosen to show the arithmetic — not a benchmark for any real property.',
        caption: 'Illustrative housekeeping headcount calculation',
        columns: ['Step', 'Assumption', 'Result'],
        rows: [
          ['Daily work', 'Tasks across all areas add up to 30 person-hours per day', '30 person-hours'],
          ['Productive time', 'About 7 productive hours in an 8-hour shift', '30 ÷ 7 ≈ 4.3, rounded up to 5 people on duty'],
          ['Relief', 'Property is cleaned 7 days a week; each person works 6 days', 'About 1 extra person for weekly-off cover'],
          ['Supervision', 'Team of six is large enough for a working supervisor', 'Supervisor role defined within or above the team'],
        ],
        note: 'Change any assumption and the answer changes — which is exactly why a site survey matters.',
      },
      {
        kind: 'cards',
        heading: 'What Pushes Headcount Up or Down',
        columns: 2,
        items: [
          { title: 'Pushes it up', description: 'High footfall, many washroom blocks, long or multiple shifts, seven-day operation, food service, strict hygiene standards (schools, healthcare).' },
          { title: 'Pushes it down', description: 'Machine scrubbing of large floors, scheduling heavy work outside business hours, compact layouts, limited operating hours.' },
          { title: 'Societies specifically', description: 'Number of towers and lifts, amenities like clubhouses and pools, and the waste process — see [society housekeeping](/society-housekeeping-services-pune).' },
          { title: 'Offices specifically', description: 'Headcount, pantry use and meeting-room turnover — see [office housekeeping](/office-housekeeping-services-pune).' },
        ],
      },
      {
        kind: 'prose',
        heading: 'Getting a Headcount for Your Property',
        paragraphs: [
          'Headcount is the biggest driver of housekeeping cost (see [what determines housekeeping cost in Pune](/resources/housekeeping-cost-pune)), so it is worth getting right. KARGAR works out staffing during a site survey using this method, and supplies the team either as a managed service or as [housekeeping manpower](/housekeeping-staff-pune).',
        ],
      },
    ],
    faqs: [
      { question: 'Is there a standard ratio of cleaners per square foot?', answer: 'Not a reliable one. Footfall, washroom count, hours and expected standard matter more than area alone, which is why task-based estimation is more accurate.' },
      { question: 'Why add relief staff?', answer: 'If the property must be cleaned every day but each person works six days a week, someone has to cover weekly offs and leave, or the property goes short-staffed.' },
    ],
    relatedLinks: [
      { label: 'Housekeeping Staff & Manpower', href: '/housekeeping-staff-pune' },
      { label: 'What Determines Housekeeping Cost', href: '/resources/housekeeping-cost-pune' },
      { label: 'Office Housekeeping Checklist', href: '/resources/office-housekeeping-checklist' },
    ],
  },
];

export const guidePagesByPath: Record<string, GuidePageContent> = Object.fromEntries(
  guidePageList.map((guide) => [guide.path, guide]),
);
