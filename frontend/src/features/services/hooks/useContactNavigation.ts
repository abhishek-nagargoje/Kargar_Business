import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import type { ContactNavigationOptions } from '../domain/navigation.types';
import { buildContactUrl, CONTACT_LINK_HREF } from '../utils/contactNavigation';
import { trackCtaClick } from '@/lib/analytics';

/**
 * Layer 2: React Hook for Contact Navigation
 * Handles routing, analytics, scrolling, and focus.
 */
export function useContactNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToContact = useCallback(
    (options?: ContactNavigationOptions, e?: React.MouseEvent) => {
      // Record every CTA click, including modifier/new-tab clicks the browser handles itself.
      trackCtaClick({
        page_path: location.pathname,
        source: options?.source,
        service: options?.service,
        category: options?.category,
        cta_position: options?.ctaPosition,
      });

      // If it's a left click without modifiers, we can handle it
      if (e && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
        e.preventDefault();
      } else if (e) {
        // Let browser handle middle-click/new tab naturally since we use <Link>
        return;
      }

      const url = buildContactUrl(options);
      
      const isAlreadyOnContact = location.pathname === '/contact' || location.pathname === '/contact-us';

      if (isAlreadyOnContact) {
        // Just update search params without reloading
        void navigate(url, { replace: true });
        
        // Wait for next frame for state update, then scroll and focus
        requestAnimationFrame(() => {
          const form = document.getElementById('contact-form');
          if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Focus the first input field
            const firstInput = form.querySelector<HTMLInputElement>('input:not([type="hidden"])');
            if (firstInput) {
              firstInput.focus();
            }
          }
        });
      } else {
        void navigate(url);
      }
    },
    [navigate, location.pathname]
  );

  return { navigateToContact, buildContactUrl, contactHref: CONTACT_LINK_HREF };
}
