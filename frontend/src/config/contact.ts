/**
 * Canonical KARGAR contact details for new UI. Values mirror what the header, contact page,
 * and LocalBusiness schema currently publish — change them here, not in individual components.
 */
export interface PhoneNumber {
  /** E.164 form for `tel:` links. */
  e164: string;
  /** Human-readable form shown on screen. */
  display: string;
}

export const contactDetails = {
  phone: { e164: '+917821844591', display: '+91 78218 44591' } satisfies PhoneNumber,
  alternatePhone: { e164: '+918788726752', display: '+91 87887 26752' } satisfies PhoneNumber,
  email: 'bd@kargar.co.in',
  hours: 'Mon - Sat: 09:00 AM - 06:00 PM',
  contactPagePath: '/contact-us',
} as const;

export function telHref(phone: PhoneNumber): string {
  return `tel:${phone.e164}`;
}
