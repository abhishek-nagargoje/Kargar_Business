/**
 * Email service — sends emails via EmailJS (frontend-only, no backend required).
 *
 * Responsibilities:
 * - Initialize EmailJS with the public key from centralized config
 * - Export a single function: sendProposalEmail()
 * - No UI, no toast, no DOM logic
 */
import emailjs from '@emailjs/browser';
import { config } from '@/config';

// ---------------------------------------------------------------------------
// Initialization (lazy — runs once on first send)
// ---------------------------------------------------------------------------

let initialized = false;

function ensureInitialized(): void {
  if (initialized) return;
  if (!config.emailjs.publicKey) {
    console.warn('[EmailJS] Public key is missing — emails will not be sent.');
    return;
  }
  emailjs.init(config.emailjs.publicKey);
  initialized = true;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProposalEmailInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  serviceLabel: string;
  team: string;
  details: [string, string][];
  /** Page whose CTA opened the form. */
  ctaPage?: string;
  /** First page of the visitor's session. */
  landingPage?: string;
  referrerHost?: string;
}

/**
 * The full lead as plain text. Placed in `{{message}}` — the one body variable the live EmailJS
 * template renders — so the sales inbox always receives the contact details and the requested
 * service, whatever the template contains. (Before 2026-11-24 the email carried only the name
 * and free-text message: no phone, email, company or service.)
 */
export function composeLeadSummary(input: ProposalEmailInput): string {
  const line = (label: string, value?: string) => (value ? `${label}: ${value}` : null);
  return [
    line('Service requested', input.serviceLabel),
    line('Team', input.team),
    '',
    line('Name', input.name),
    line('Email', input.email),
    line('Phone', input.phone),
    line('Company / society', input.company),
    ...(input.details.length ? ['', 'Enquiry details:', ...input.details.map(([label, value]) => `- ${label}: ${value}`)] : []),
    '',
    'Message:',
    input.message,
    '',
    line('Enquiry page', input.ctaPage),
    line('First page visited', input.landingPage),
    line('Referred by', input.referrerHost),
  ]
    .filter((row): row is string => row !== null)
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
}

export interface EmailResult {
  success: boolean;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function sendProposalEmail(input: ProposalEmailInput): Promise<EmailResult> {
  ensureInitialized();

  const { serviceId, templateId, publicKey } = config.emailjs;

  if (!serviceId || !templateId || !publicKey) {
    console.error('[EmailJS] Missing configuration — serviceId, templateId, or publicKey is empty.');
    return { success: false };
  }

  const now = new Date();

  // Variables must match the {{variable_name}} syntax in your EmailJS template
  // `name`, `message` and `time` are what the live template uses today. The remaining variables
  // are available for a richer template ({{service}}, {{team}}, {{reply_to}}, ...) and are ignored
  // by EmailJS until the template references them.
  const templateParams = {
    name: input.name,
    message: composeLeadSummary(input),
    subject: `[${input.team}] ${input.subject ?? input.serviceLabel}`,
    service: input.serviceLabel,
    team: input.team,
    email: input.email,
    reply_to: input.email,
    phone: input.phone ?? '',
    company: input.company ?? '',
    enquiry_page: input.ctaPage ?? '',
    landing_page: input.landingPage ?? '',
    time: now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams);
    console.log('[EmailJS] Email sent:', response.status, response.text);
    return { success: response.status === 200 };
  } catch (error) {
    console.error('[EmailJS] Send failed:', error);
    return { success: false };
  }
}
