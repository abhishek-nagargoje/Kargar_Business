/**
 * Google tag (gtag.js) — the single global loader plus lead/conversion helpers.
 *
 * One gtag.js script serves every Google destination: it is loaded once (keyed on the first
 * configured ID) and each destination (GA4, Google Ads) is added with its own `config` call,
 * per Google's multi-destination setup. Page views are sent per route by <Analytics />, so every
 * `config` here disables the automatic one to avoid double-counting the landing page.
 *
 * Google Ads conversions only fire when a conversion label is configured — a conversion action
 * must exist in Google Ads first; the label is never guessed.
 */
import { config } from '@/config';
import { trackEvent, type GtagEventParams } from '@/types/analytics';

const GTAG_SRC = 'https://www.googletagmanager.com/gtag/js';

let initialized = false;

/** Browser-only, production (or forced), at least one Google ID set, and not an automated browser. */
export function isTrackingEnabled(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  // The build-time prerender drives the real app in headless Chromium (navigator.webdriver is
  // true there). Skipping it keeps the injected <script> out of the static HTML — where it would
  // load a second time on hydration — and keeps build-machine page views out of GA4 / Google Ads.
  if (navigator.webdriver) return false;
  const { gaId, googleAdsId, forceAnalytics } = config.analytics;
  return (config.isProd || forceAnalytics) && Boolean(gaId || googleAdsId);
}

/** Loads gtag.js exactly once and configures every Google destination. Safe to call repeatedly. */
export function initGoogleTag(): void {
  if (initialized || !isTrackingEnabled()) return;
  initialized = true;

  const { gaId, googleAdsId, debugMode } = config.analytics;

  if (!document.querySelector(`script[src^="${GTAG_SRC}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `${GTAG_SRC}?id=${encodeURIComponent(gaId || googleAdsId)}`;
    document.head.appendChild(script);
  }

  const dataLayer = (window.dataLayer = window.dataLayer ?? []);
  window.gtag =
    window.gtag ??
    function gtag() {
      // gtag.js only processes `arguments` objects, not plain arrays.
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments);
    };

  window.gtag('js', new Date());
  if (gaId) {
    // GA4 treats any `debug_mode` value (even false) as debug traffic, so only send it when on.
    window.gtag('config', gaId, { send_page_view: false, ...(debugMode ? { debug_mode: true } : {}) });
  }
  if (googleAdsId) {
    window.gtag('config', googleAdsId, { send_page_view: false });
  }
}

/** Accepts either the bare conversion label or the full `AW-…/label` send_to value from Google Ads. */
function sendAdsConversion(label: string, params?: GtagEventParams): void {
  const { googleAdsId } = config.analytics;
  if (!label || !googleAdsId || !window.gtag) return;
  const sendTo = label.includes('/') ? label : `${googleAdsId}/${label}`;
  window.gtag('event', 'conversion', { ...params, send_to: sendTo });
}

/** Click on a `tel:` link. Fire-and-forget: never delays or blocks the call. */
export function trackPhoneClick(phoneHref: string): void {
  if (!isTrackingEnabled()) return;
  trackEvent('call_click', { link_url: phoneHref });
  sendAdsConversion(config.analytics.googleAdsPhoneConversionLabel);
}

/** Click on a WhatsApp link. Analytics event only — not a Google Ads conversion. */
export function trackWhatsAppClick(url: string): void {
  if (!isTrackingEnabled()) return;
  trackEvent('whatsapp_click', { link_url: url });
}

/** Call only after the backend has confirmed the lead was saved. */
export function trackFormSubmission(params: GtagEventParams): void {
  if (!isTrackingEnabled()) return;
  trackEvent('contact_form_submit', params);
  sendAdsConversion(config.analytics.googleAdsFormConversionLabel);
}
