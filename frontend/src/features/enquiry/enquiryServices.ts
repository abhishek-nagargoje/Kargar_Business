/**
 * Enquiry taxonomy — the single source for "what did this prospect ask for, and which team
 * handles it". Every Pune landing page declares one `enquiryService`; the contact form uses it to
 * preselect the service and show that service's optional quote questions; the lead record, the
 * notification email and the analytics event all carry the same id.
 *
 * Every detail field is OPTIONAL by design: a buyer must be able to enquire before a site survey.
 * Field labels describe what affects the quote for that service — they are not copied from one
 * service to another.
 */

export type EnquiryServiceId =
  | 'security'
  | 'housekeeping'
  | 'housekeeping-manpower'
  | 'facility-management'
  | 'society-management'
  | 'facility-maintenance'
  | 'electrical'
  | 'hvac'
  | 'plumbing'
  | 'stp-wtp'
  | 'building-technicians'
  | 'landscaping'
  | 'staffing'
  | 'other';

/** Receiving team, shown in the lead record and the email subject so the right person picks it up. */
export type EnquiryTeam = 'Security' | 'Housekeeping' | 'Technical maintenance' | 'Facility management' | 'Business development';

export type EnquiryField =
  | { name: string; label: string; type: 'text'; placeholder?: string; inputMode?: 'numeric' | 'text' }
  | { name: string; label: string; type: 'select'; options: string[] }
  | { name: string; label: string; type: 'checkboxes'; options: string[] };

export interface EnquiryService {
  id: EnquiryServiceId;
  /** Shown in the "Service required" dropdown and the lead record. */
  label: string;
  team: EnquiryTeam;
  /** One-line prompt above the optional fields. */
  detailsIntro?: string;
  fields: EnquiryField[];
}

const PROPERTY_TYPES = [
  'Office or corporate campus',
  'Commercial building or complex',
  'Housing society',
  'Factory, plant or warehouse',
  'School, college or institute',
  'Hospital or clinic',
  'Other',
];

const propertyType: EnquiryField = { name: 'property_type', label: 'Property type', type: 'select', options: PROPERTY_TYPES };

const MAINTENANCE_MODEL: EnquiryField = {
  name: 'contract_model',
  label: 'Type of support you are looking for',
  type: 'select',
  options: ['Planned preventive maintenance (AMC)', 'Resident technician on site', 'Breakdown / on-call support', 'Not sure yet'],
};

const SHIFTS: EnquiryField = {
  name: 'shifts',
  label: 'Shifts to be covered',
  type: 'select',
  options: ['One day shift', 'Two shifts', 'Round the clock (24 hours)', 'Not sure yet'],
};

export const enquiryServices: EnquiryService[] = [
  {
    id: 'security',
    label: 'Security guard services',
    team: 'Security',
    detailsIntro: 'These help us plan posts and shifts. Skip anything you do not know yet; we confirm it during the site assessment.',
    fields: [
      propertyType,
      { name: 'entry_points', label: 'Entry points or known guard posts', type: 'text', placeholder: 'e.g. 1 main gate, 1 service gate', inputMode: 'text' },
      { name: 'coverage_hours', label: 'Hours of coverage', type: 'select', options: ['Day only', 'Night only', 'Round the clock (24 hours)', 'Not sure yet'] },
      { name: 'current_setup', label: 'Current security setup', type: 'select', options: ['No security today', 'Directly hired guards', 'Another security agency', 'Not sure'] },
    ],
  },
  {
    id: 'housekeeping',
    label: 'Housekeeping contract (managed service)',
    team: 'Housekeeping',
    detailsIntro: 'Area, footfall and consumables drive the housekeeping quote. Rough figures are fine.',
    fields: [
      propertyType,
      { name: 'area_sqft', label: 'Approximate area to be cleaned (sq ft)', type: 'text', placeholder: 'e.g. 12,000', inputMode: 'numeric' },
      { name: 'daily_footfall', label: 'People on site on a typical day', type: 'text', placeholder: 'e.g. 150', inputMode: 'numeric' },
      { name: 'operating_hours', label: 'Operating hours', type: 'select', options: ['Office hours only', 'Two shifts', 'Round the clock (24 hours)', 'Not sure yet'] },
      { name: 'consumables', label: 'Cleaning materials and machines', type: 'select', options: ['Include them in the contract', 'We will supply them', 'Not sure yet'] },
    ],
  },
  {
    id: 'housekeeping-manpower',
    label: 'Housekeeping staff (manpower supply)',
    team: 'Housekeeping',
    detailsIntro: 'Tell us the roles and who will direct the team day to day.',
    fields: [
      { name: 'roles_needed', label: 'Roles and numbers needed', type: 'text', placeholder: 'e.g. 3 housekeeping staff, 1 pantry staff' },
      SHIFTS,
      { name: 'supervision', label: 'Day-to-day supervision', type: 'select', options: ['Our own team will supervise', 'Include a KARGAR supervisor', 'Not sure yet'] },
    ],
  },
  {
    id: 'facility-management',
    label: 'Integrated facility management',
    team: 'Facility management',
    detailsIntro: 'Which services would you like one provider to run?',
    fields: [
      propertyType,
      { name: 'services_to_combine', label: 'Services to include', type: 'checkboxes', options: ['Housekeeping', 'Security', 'Technical maintenance', 'Support staff (front desk, mailroom, helpdesk)'] },
      { name: 'current_vendors', label: 'Vendors running the site today', type: 'select', options: ['None yet (new site)', 'One vendor', 'Two or three vendors', 'Four or more vendors'] },
    ],
  },
  {
    id: 'society-management',
    label: 'Housing society management',
    team: 'Facility management',
    detailsIntro: 'A few details about the society help us size the team.',
    fields: [
      { name: 'society_size', label: 'Number of flats or wings', type: 'text', placeholder: 'e.g. 240 flats, 6 wings' },
      { name: 'services_to_combine', label: 'Services needed', type: 'checkboxes', options: ['Housekeeping', 'Security', 'Technicians (STP, plumbing, electrical)', 'Society administration and accounts'] },
    ],
  },
  {
    id: 'facility-maintenance',
    label: 'Facility maintenance (building systems)',
    team: 'Technical maintenance',
    detailsIntro: 'List the systems you want maintained. An asset list helps, but is not needed to enquire.',
    fields: [
      propertyType,
      { name: 'systems', label: 'Systems to be maintained', type: 'checkboxes', options: ['Electrical', 'HVAC', 'DG set', 'UPS and batteries', 'Plumbing and water', 'STP / WTP', 'Fire alarm and fire-fighting', 'BMS'] },
      MAINTENANCE_MODEL,
    ],
  },
  {
    id: 'electrical',
    label: 'Electrical maintenance',
    team: 'Technical maintenance',
    detailsIntro: 'Your main electrical assets and how you want them looked after.',
    fields: [
      propertyType,
      { name: 'systems', label: 'Electrical systems on site', type: 'checkboxes', options: ['LT panels and DBs', 'UPS and batteries', 'DG set', 'Cabling', 'Not sure'] },
      { name: 'asset_list', label: 'Key equipment and quantities, if known', type: 'text', placeholder: 'e.g. 1 DG set, 2 UPS units, 4 LT panels' },
      MAINTENANCE_MODEL,
    ],
  },
  {
    id: 'hvac',
    label: 'HVAC maintenance',
    team: 'Technical maintenance',
    detailsIntro: 'Equipment type and quantity decide the visit plan. Approximate numbers are fine.',
    fields: [
      propertyType,
      { name: 'equipment', label: 'HVAC equipment on site', type: 'checkboxes', options: ['AHU', 'FCU', 'VRV / VRF', 'Other or not sure'] },
      { name: 'unit_count', label: 'Approximate number of units', type: 'text', placeholder: 'e.g. 4 AHUs, 30 FCUs', inputMode: 'text' },
      { name: 'visit_scope', label: 'What you need', type: 'select', options: ['Planned preventive servicing', 'Breakdown support', 'Both', 'Not sure yet'] },
    ],
  },
  {
    id: 'plumbing',
    label: 'Plumbing and water systems',
    team: 'Technical maintenance',
    fields: [
      propertyType,
      { name: 'systems', label: 'Systems involved', type: 'checkboxes', options: ['Pumps', 'Overhead and underground tanks', 'Pipelines and fixtures', 'Not sure'] },
      MAINTENANCE_MODEL,
    ],
  },
  {
    id: 'stp-wtp',
    label: 'STP / WTP operation',
    team: 'Technical maintenance',
    fields: [
      propertyType,
      { name: 'plant_details', label: 'Plant type and capacity, if known', type: 'text', placeholder: 'e.g. STP, 150 KLD' },
      { name: 'operation_scope', label: 'What you need', type: 'select', options: ['Daily operation by an operator', 'Maintenance support', 'Both', 'Not sure yet'] },
    ],
  },
  {
    id: 'building-technicians',
    label: 'Building maintenance technicians',
    team: 'Technical maintenance',
    fields: [
      propertyType,
      { name: 'roles_needed', label: 'Technician roles needed', type: 'text', placeholder: 'e.g. 1 electrician, 1 plumber' },
      SHIFTS,
    ],
  },
  {
    id: 'landscaping',
    label: 'Landscaping and garden maintenance',
    team: 'Facility management',
    fields: [
      propertyType,
      { name: 'garden_area', label: 'Approximate garden or landscaped area', type: 'text', placeholder: 'e.g. 5,000 sq ft' },
    ],
  },
  {
    id: 'staffing',
    label: 'Facility staffing (several roles)',
    team: 'Facility management',
    fields: [
      { name: 'roles_needed', label: 'Roles and numbers needed', type: 'text', placeholder: 'e.g. 4 guards, 3 housekeeping, 1 electrician' },
      SHIFTS,
    ],
  },
  {
    id: 'other',
    label: 'Not sure yet / something else',
    team: 'Business development',
    fields: [propertyType],
  },
];

export const enquiryServicesById: Record<EnquiryServiceId, EnquiryService> = Object.fromEntries(
  enquiryServices.map((service) => [service.id, service]),
) as Record<EnquiryServiceId, EnquiryService>;

export function isEnquiryServiceId(value: string): value is EnquiryServiceId {
  return value in enquiryServicesById;
}

/** Common, optional field shown for every service: where the property is. */
export const LOCALITY_FIELD = {
  name: 'locality',
  label: 'Locality or area',
  placeholder: 'e.g. Baner, Hinjewadi, Chakan',
} as const;
