/**
 * Contact service — handles the complete proposal submission flow.
 *
 * Flow:
 *   1. Validate input
 *   2. Save into Supabase (source of truth — never lose a lead)
 *   3. Send email via EmailJS (best-effort)
 *   4. Return result with emailSent status
 *
 * Business rule: The database row is ALWAYS saved.
 * Email failure never loses a customer inquiry.
 */
import { supabase } from '@/supabase/client';
import type { Json } from '@/supabase/types';
import { sendProposalEmail } from '@/services/email.service';
import { enquiryServicesById, isEnquiryServiceId, type EnquiryTeam } from '@/features/enquiry/enquiryServices';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  /** Page path of the CTA that opened the form, e.g. "/security-services-pune". */
  service?: string;
  /** Enquiry taxonomy id chosen (or preselected) in the form, e.g. "security". */
  enquiryService?: string;
  /** First page of the visitor's session and its external referrer host. */
  landingPage?: string;
  referrerHost?: string;
  source?: string;
  campaign?: string;
  category?: string;
  ctaPosition?: string;
  /** Optional, service-specific quote details: label → answer. */
  details?: Record<string, string>;
  message: string;
}

/** Display form of the lead's service context, shared by the DB record and the notification email. */
export interface EnquiryContext {
  serviceLabel: string;
  team: EnquiryTeam;
  details: [string, string][];
}

const clip = (value: string | undefined, max: number): string => value?.trim().slice(0, max) ?? '';

export function resolveEnquiryContext(input: Pick<ContactSubmission, 'enquiryService' | 'details'>): EnquiryContext {
  const id = input.enquiryService && isEnquiryServiceId(input.enquiryService) ? input.enquiryService : 'other';
  const service = enquiryServicesById[id];
  const details = Object.entries(input.details ?? {})
    .map(([label, value]): [string, string] => [clip(label, 80), clip(value, 300)])
    .filter(([label, value]) => label !== '' && value !== '')
    .slice(0, 12);
  return { serviceLabel: service.label, team: service.team, details };
}

/**
 * Lead attribution stored in `contact_messages.metadata` (existing JSONB column, no migration):
 * the requested service and receiving team, the CTA page and first landing page, campaign,
 * category, CTA position and the optional quote details. Empty values are dropped.
 */
function buildMetadata(input: ContactSubmission, context: EnquiryContext): Json {
  const entries: [string, string | undefined][] = [
    ['enquiry_service', input.enquiryService],
    ['enquiry_service_label', context.serviceLabel],
    ['team', context.team],
    ['service', input.service],
    ['landing_page', input.landingPage],
    ['referrer_host', input.referrerHost],
    ['campaign', input.campaign],
    ['category', input.category],
    ['cta_position', input.ctaPosition],
  ];
  const flat = Object.fromEntries(
    entries.map(([key, value]): [string, string] => [key, clip(value, 200)]).filter(([, value]) => value !== ''),
  );
  return context.details.length ? { ...flat, details: Object.fromEntries(context.details) } : flat;
}

/** The DB requires a 10–5000 character message; a buyer may enquire with only the structured fields. */
function resolveMessage(message: string, context: EnquiryContext): string {
  const trimmed = message.trim();
  if (trimmed.length >= 10) return trimmed.slice(0, 5000);
  const fallback = `Enquiry for ${context.serviceLabel}. No additional message.`;
  return trimmed ? `${trimmed} (${fallback})` : fallback;
}

export interface ContactResult {
  success: boolean;
  emailSent: boolean;
  emailError?: string;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function submitContactMessage(input: ContactSubmission): Promise<ContactResult> {
  // ---- Validate ----
  if (!input.name.trim() || !input.email.trim()) {
    throw new Error('Name and email are required fields.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email)) {
    throw new Error('Invalid email address format.');
  }

  const context = resolveEnquiryContext(input);
  const message = resolveMessage(input.message, context);
  // Subject must be 5–200 characters (DB constraint).
  const explicitSubject = input.subject?.trim() ?? '';
  const resolvedSubject = (explicitSubject.length >= 5 ? explicitSubject : `Proposal request: ${context.serviceLabel}`).slice(0, 200);

  // ---- 1. Save to Supabase (always) ----
  const { error: dbError } = await supabase
    .from('contact_messages')
    .insert({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || null,
      company: input.company?.trim() || null,
      subject: resolvedSubject,
      message,
      status: 'new',
      priority: 'medium',
      source: input.source?.trim() || 'website',
      metadata: buildMetadata(input, context),
    }); // No .select(): the anon key cannot read rows back, by design.

  if (dbError) {
    console.error('[Contact] Database insert failed:', dbError);
    throw new Error('Unable to submit your request. Please try again.');
  }

  // ---- 2. Send email via EmailJS (best-effort) ----
  const emailResult = await sendProposalEmail({
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim(),
    company: input.company?.trim(),
    subject: resolvedSubject,
    message,
    serviceLabel: context.serviceLabel,
    team: context.team,
    details: context.details,
    ctaPage: input.service?.trim(),
    landingPage: input.landingPage?.trim(),
    referrerHost: input.referrerHost?.trim(),
  });

  if (!emailResult.success) {
    console.warn('[Contact] Email notification failed — database record preserved.');
    return {
      success: true,
      emailSent: false,
      emailError: 'Email notification is temporarily unavailable.',
    };
  }

  return { success: true, emailSent: true };
}
