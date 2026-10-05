import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { trackEvent } from '@/types/analytics';
import { isTrackingEnabled, trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics';

export function Analytics() {
  const location = useLocation();
  useEffect(() => {
    if (!isTrackingEnabled()) {
      return;
    }

    // Trigger page_view event on location change, including hash if present
    trackEvent('page_view', {
      page_path: `${location.pathname}${location.search}${location.hash}`,
    });
  }, [location]);

  // Global click tracker for tel:, mailto:, and whatsapp
  useEffect(() => {
    if (!isTrackingEnabled()) {
      return;
    }

    const handleGlobalClick = (e: MouseEvent) => {
      // Admin pages link to customers' numbers — staff calling a lead is not a lead.
      if (window.location.pathname.startsWith('/admin')) return;

      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href.startsWith('tel:')) {
        trackPhoneClick(href);
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', { link_url: href });
      } else if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        trackWhatsAppClick(href);
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}
