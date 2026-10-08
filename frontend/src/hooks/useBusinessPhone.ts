import { useSyncExternalStore } from 'react';
import { contactDetails, telHref } from '@/config/contact';
import { getForwardingPhone, subscribeForwardingPhone, type DisplayedPhone } from '@/lib/analytics';

const getNoForwardingPhone = () => null;

/**
 * The primary KARGAR phone number to show and dial. Renders the real number (as `display`) until
 * Google Ads supplies a forwarding number for an ad visitor, then switches to it so website calls
 * are attributed. Use for every visible rendering of the primary number — never in JSON-LD.
 */
export function useBusinessPhone(display: string = contactDetails.phone.display): DisplayedPhone {
  const forwardingPhone = useSyncExternalStore(subscribeForwardingPhone, getForwardingPhone, getNoForwardingPhone);
  return forwardingPhone ?? { display, href: telHref(contactDetails.phone) };
}
