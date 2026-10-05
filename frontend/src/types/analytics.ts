export interface GtagConfigParams {
  send_page_view?: boolean;
  page_path?: string;
  debug_mode?: boolean;
  [key: string]: unknown;
}

export type CustomEventNames = 
  | 'page_view'
  | 'scroll'
  | 'outbound_click'
  | 'download'
  | 'company_profile_preview'
  | 'company_profile_download'
  | 'contact_form_submit'
  | 'call_click'
  | 'email_click'
  | 'whatsapp_click';

export interface GtagEventParams {
  page_path?: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
}

export type GtagArgs = 
  | [command: 'js', date: Date]
  | [command: 'config', targetId: string, config?: GtagConfigParams]
  | [command: 'event', eventName: CustomEventNames | (string & {}), eventParams?: GtagEventParams]
  | [command: 'set', config: Record<string, unknown>]
  | [command: 'consent', consentArg: string, consentParams: Record<string, unknown>];

export type GtagFunction = (...args: GtagArgs) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
  }
}

/**
 * Enterprise Event Tracking Utility
 * Sends an event to every configured Google destination (GA4, Google Ads).
 * `window.gtag` is defined synchronously by initGoogleTag() (src/lib/analytics.ts) before the
 * app renders whenever tracking is enabled; when it is disabled this is a no-op.
 */
export function trackEvent(eventName: CustomEventNames | (string & {}), params?: GtagEventParams) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}
