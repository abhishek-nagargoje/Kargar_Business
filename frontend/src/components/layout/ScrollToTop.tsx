import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Global scroll restoration component.
 * Ensures that on every route change, the window scrolls to the very top — unless the URL has a
 * fragment (e.g. `/#recognition`) whose target exists, in which case that element is scrolled
 * into view, as a browser would for a normal page load.
 * This should be placed inside the Router context, usually in App.tsx or a global layout.
 */
/** Element targeted by a URL fragment, or null. Malformed percent-encoding is treated as no target. */
function findFragmentTarget(hash: string): HTMLElement | null {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // We use setTimeout to ensure React has flushed changes to the DOM.
    const timer = setTimeout(() => {
      const target = hash ? findFragmentTarget(hash) : null;
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
        return;
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 0);

    return () => { clearTimeout(timer); };
  }, [pathname, hash]);

  return null;
}
