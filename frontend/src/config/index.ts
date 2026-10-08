/**
 * Application configuration — centralized environment variable access.
 * All env vars are validated here at import time.
 * If a required variable is missing, the app fails fast with a clear error.
 */

function getEnvVar(key: string, fallback?: string, required = false): string {
  const value = import.meta.env[key] as string | undefined;
  if (!value && fallback === undefined && required) {
    console.warn(`[Config] Missing required environment variable: ${key}`);
    return '';
  }
  return value ?? fallback ?? '';
}

export const config = {
  /** Supabase browser client configuration */
  supabase: {
    url: getEnvVar('VITE_SUPABASE_URL', undefined, true),
    anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY', undefined, true),
  },

  /** EmailJS email delivery configuration */
  emailjs: {
    publicKey: getEnvVar('VITE_EMAILJS_PUBLIC_KEY', ''),
    serviceId: getEnvVar('VITE_EMAILJS_SERVICE_ID', ''),
    templateId: getEnvVar('VITE_EMAILJS_TEMPLATE_ID', ''),
  },

  /** Public site URL */
  siteUrl: getEnvVar('VITE_SITE_URL', 'https://www.kargarbusinessservices.com'),

  /** Site name */
  siteName: getEnvVar('VITE_SITE_NAME', 'KARGAR Facility Management'),

  /** Analytics — empty string means disabled */
  analytics: {
    gaId: getEnvVar('VITE_GA_MEASUREMENT_ID', ''),
    /** Google Ads tag ID — a public identifier, not a secret. Set the env var to empty to disable. */
    googleAdsId: getEnvVar('VITE_GOOGLE_ADS_ID', 'AW-18494930780'),
    /** Conversion labels from Google Ads → Goals → Conversions. Empty = conversion not sent. */
    googleAdsPhoneConversionLabel: getEnvVar('VITE_GOOGLE_ADS_PHONE_CONVERSION_LABEL', ''),
    googleAdsFormConversionLabel: getEnvVar('VITE_GOOGLE_ADS_FORM_CONVERSION_LABEL', ''),
    /**
     * "Calls from website visits" conversion (`AW-…/label`) and the number it tracks, exactly as
     * entered in that Google Ads conversion action. Empty conversion = no forwarding number.
     */
    googleAdsCallConversion: getEnvVar('VITE_GOOGLE_ADS_CALL_CONVERSION', 'AW-18494930780/DQNpCILlqpUdENz-iPNE'),
    googleAdsCallNumber: '7821844591',
    gtmId: getEnvVar('VITE_GTM_ID', ''),
    clarityId: getEnvVar('VITE_CLARITY_ID', ''),
    hotjarId: getEnvVar('VITE_HOTJAR_ID', ''),
    sentryDsn: getEnvVar('VITE_SENTRY_DSN', ''),
    forceAnalytics: getEnvVar('VITE_FORCE_ANALYTICS', 'false') === 'true',
    debugMode: getEnvVar('VITE_GA_DEBUG_MODE', 'false') === 'true',
  },

  /** Whether we're in production */
  isProd: import.meta.env.PROD,
} as const;
