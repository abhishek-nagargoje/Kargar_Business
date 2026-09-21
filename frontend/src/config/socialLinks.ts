/**
 * Official social media configuration for KARGAR Facility Management.
 * Centralized social URLs and accessibility metadata.
 */

export interface SocialPlatform {
  id: 'instagram' | 'facebook' | 'linkedin' | 'x';
  name: string;
  url: string;
  ariaLabel: string;
  title: string;
}

export const OFFICIAL_SOCIAL_LINKS: readonly SocialPlatform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/kargar.facility/',
    ariaLabel: 'Follow KARGAR on Instagram',
    title: 'Instagram',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    // Verified Kargar Facebook profile URL found in the codebase repository schema:
    url: 'https://www.facebook.com/people/Kargar-Facility-and-Security-Services-PVT-LTD/100076064059281/',
    ariaLabel: 'Follow KARGAR on Facebook',
    title: 'Facebook',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/kargar-facility-services-pvt-ltd/?viewAsMember=true',
    ariaLabel: 'Follow KARGAR on LinkedIn',
    title: 'LinkedIn',
  },
  {
    id: 'x',
    name: 'X',
    url: 'https://x.com/Kargar_Business',
    ariaLabel: 'Follow KARGAR on X',
    title: 'X',
  },
] as const;
