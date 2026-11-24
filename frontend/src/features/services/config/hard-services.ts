import type { Service } from '../domain/service.types';


export const hardServices: Record<string, Service> = {
  electrical: {
    id: 'electrical',
    categoryId: 'hard',
    slug: 'electrical-maintenance',
    catalogSlug: 'electrical-systems-maintenance',
    title: 'Electrical Maintenance',
    shortDescription: 'Preventive and breakdown maintenance of LT panels, DBs, cabling, UPS systems and DG sets.',
    overview: 'Planned preventive maintenance of LT panels, distribution boards, cabling, UPS rooms, UPS and battery systems, with DG operation and maintenance and coordinated breakdown support, for societies, offices, commercial buildings and plants in Pune.',
    iconKey: 'zap',
    imageKey: 'electrical',
    seo: {
      title: 'Electrical Maintenance',
      description: 'Electrical maintenance for LT panels, DBs, cabling, UPS rooms, batteries and DG sets: preventive schedules per OEM and coordinated breakdown support.',
      keywords: ['Electrical Maintenance', 'LT Panels', 'DG Maintenance', 'Preventive Maintenance'],
    },
    serviceType: 'technical',
    layoutPreset: 'enterpriseTechnical',
    marketing: {
      headline: 'Uninterrupted Power for Uninterrupted Business.',
      summary: 'Keep your operations running safely with planned electrical maintenance and coordinated breakdown support.',
      ctaText: 'Request an Electrical Audit'
    },
    operations: {
      scopeOfWork: [
        { title: 'Preventive Maintenance', description: 'Regular inspections to identify potential issues.' },
        { title: 'Breakdown Coordination', description: 'Faults outside the preventive schedule handled through an agreed escalation process.' },
        { title: 'DG Operation', description: 'Operation and maintenance of diesel generator sets.' },
        { title: 'UPS and Battery Care', description: 'UPS and battery maintenance per OEM schedules.' }
      ],
      equipmentMaintained: [
        { name: 'LT Panels', iconKey: 'server' },
        { name: 'Distribution Boards', iconKey: 'server' },
        { name: 'UPS & Batteries', iconKey: 'zap' },
        { name: 'DG Sets', iconKey: 'power' },
        { name: 'Cabling', iconKey: 'activity' }
      ]
    },
    capabilities: ['preventive-maintenance'],
    whyChooseUs: [
      { title: 'Trained Technicians', description: 'Skill and safety training throughout the year, delivered by KARGAR’s Field Trainers and Quality Managers.', iconKey: 'award' },
      { title: 'OEM-Aligned Maintenance', description: 'Preventive maintenance follows OEM schedules for each asset.', iconKey: 'clipboard-check' },
      { title: 'Breakdown Coordination', description: 'Faults outside the schedule handled through an agreed escalation path, with OEMs where needed.', iconKey: 'trending-down' }
    ],
    industries: [
      { title: 'Corporate Offices', iconKey: 'building' },
      { title: 'Commercial Buildings', iconKey: 'building-2' },
      { title: 'Residential Societies', iconKey: 'home' },
      { title: 'Manufacturing', iconKey: 'factory' },
      { title: 'Educational Institutes', iconKey: 'package' }
    ],
    faqs: [
      { question: 'How often should electrical maintenance be performed?', answer: 'Preventive schedules follow OEM recommendations and how heavily each system is used; DG sets and UPS batteries are usually checked more often than general distribution.' },
      { question: 'What happens if there is an electrical breakdown?', answer: 'Breakdowns are coordinated through an agreed escalation process, with OEMs or specialist vendors brought in where required.' },
      { question: 'Do you handle backup generator maintenance?', answer: 'Yes, generator maintenance is a key part of our electrical services to ensure reliable backup power.' }
    ],
    relationships: {
      relatedServices: ['hvac'],
      crossSellServices: ['hvac']
    },
    order: 1,
  },
  hvac: {
    id: 'hvac',
    categoryId: 'hard',
    slug: 'hvac-maintenance',
    catalogSlug: 'hvac-maintenance',
    title: 'HVAC Maintenance',
    shortDescription: 'Planned servicing and breakdown coordination for AHUs, FCUs and VRV/VRF systems.',
    overview: 'Planned preventive maintenance of air handling units (AHU), fan coil units (FCU) and VRV/VRF systems on OEM schedules, with breakdown repairs coordinated with the OEM or a specialist vendor where needed.',
    iconKey: 'wind',
    imageKey: 'hvac',
    seo: {
      title: 'HVAC Maintenance Scope',
      description: 'HVAC maintenance for AHUs, FCUs and VRV/VRF systems: planned preventive servicing per OEM schedules and coordinated breakdown support.',
      keywords: ['HVAC Maintenance', 'Mechanical Maintenance', 'Commercial Maintenance', 'Preventive Maintenance'],
    },
    serviceType: 'technical',
    layoutPreset: 'enterpriseTechnical',
    marketing: {
      headline: 'Planned HVAC Care, Not Breakdown Calls.',
      summary: 'Keep AHUs, FCUs and VRV/VRF systems on a preventive schedule, with breakdowns coordinated through one team.',
      ctaText: 'Schedule HVAC Service'
    },
    operations: {
      scopeOfWork: [
        { title: 'Planned Servicing', description: 'Preventive maintenance of AHUs, FCUs and VRV/VRF systems per OEM schedules.' },
        { title: 'Service Records', description: 'Each visit recorded against the asset list.' },
        { title: 'Breakdown Coordination', description: 'Faults handled through an agreed escalation path, with the OEM or a specialist where needed.' }
      ],
      equipmentMaintained: [
        { name: 'VRV / VRF Systems', iconKey: 'wind' },
        { name: 'Air Handling Units (AHU)', iconKey: 'fan' },
        { name: 'Fan Coil Units (FCU)', iconKey: 'box' }
      ]
    },
    capabilities: ['preventive-maintenance'],
    whyChooseUs: [
      { title: 'OEM-Aligned Schedules', description: 'Visit frequency follows OEM recommendations and how the site is used.', iconKey: 'battery-charging' },
      { title: 'Trained Technicians', description: 'Skill and safety training throughout the year from KARGAR’s Field Trainers and Quality Managers.', iconKey: 'heart' },
      { title: 'One Maintenance Team', description: 'HVAC can sit in the same contract as electrical, DG, plumbing and STP maintenance.', iconKey: 'maximize' }
    ],
    industries: [
      { title: 'Corporate Offices', iconKey: 'building' },
      { title: 'Commercial Buildings', iconKey: 'building-2' },
      { title: 'Healthcare', iconKey: 'plus-square' },
      { title: 'Educational Institutes', iconKey: 'graduation-cap' },
      { title: 'Manufacturing', iconKey: 'factory' }
    ],
    faqs: [
      { question: 'Which HVAC equipment do you maintain?', answer: 'Air handling units (AHU), fan coil units (FCU) and VRV/VRF systems.' },
      { question: 'How are HVAC breakdowns handled?', answer: 'Through an agreed escalation path, with the OEM or a specialist vendor brought in where their involvement is required.' }
    ],
    relationships: {
      relatedServices: ['electrical']
    },
    order: 2,
  }
};
