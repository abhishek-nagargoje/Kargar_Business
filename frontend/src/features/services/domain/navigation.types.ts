export interface ContactNavigationOptions {
  category?: string;
  service?: string;
  source?: string;
  campaign?: string;
  ctaPosition?: string;
  /** Locality of the page that opened the form (analytics only; never a URL param). */
  locality?: string;
}
