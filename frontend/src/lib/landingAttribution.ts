/**
 * First-touch landing attribution for the current browser session.
 *
 * Records the first page a visitor opened on the site (path only, no query string) and the
 * referring site's hostname, so an enquiry keeps its origin even when the visitor reaches the
 * contact form through the header or another page instead of the landing page's own CTA.
 *
 * Privacy: no personal data. Only a site path and a referrer hostname are stored, in
 * sessionStorage (cleared when the tab closes), and they are never sent to analytics as anything
 * other than a path.
 */

const KEY = 'kargar_landing_v1';

export interface LandingAttribution {
  /** First path viewed this session, e.g. "/security-services-pune". */
  landingPage: string;
  /** Hostname of the external referrer, e.g. "www.google.com"; empty for direct visits. */
  referrerHost: string;
}

function safeStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.sessionStorage : null;
  } catch {
    return null; // Storage blocked (privacy mode, sandboxed iframe)
  }
}

/** Call on every route view; only the first call in a session is stored. */
export function captureLandingPage(pathname: string): void {
  const storage = safeStorage();
  if (!storage || storage.getItem(KEY)) return;
  let referrerHost = '';
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.host !== window.location.host) referrerHost = ref.hostname;
  } catch {
    referrerHost = '';
  }
  const value: LandingAttribution = { landingPage: pathname.slice(0, 200), referrerHost: referrerHost.slice(0, 120) };
  try {
    storage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Quota or access error: attribution is best-effort and never blocks the page.
  }
}

export function getLandingAttribution(): LandingAttribution | null {
  const raw = safeStorage()?.getItem(KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<LandingAttribution>;
    return typeof parsed.landingPage === 'string'
      ? { landingPage: parsed.landingPage, referrerHost: typeof parsed.referrerHost === 'string' ? parsed.referrerHost : '' }
      : null;
  } catch {
    return null;
  }
}
