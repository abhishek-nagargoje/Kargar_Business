import type { BreadcrumbItem } from '@/features/services/components/Breadcrumb';
import type { ClusterId, PuneLandingPageContent } from '../domain/types';
import { housekeepingPages } from './pages/housekeeping';
import { facilityManagementPages } from './pages/facilityManagement';
import { maintenancePages } from './pages/maintenance';
import { securityPages } from './pages/security';

/**
 * Single source of truth for the Pune local-commercial landing pages.
 * Routes (App.tsx), the SEO route inventory (sitemap, prerender, vercel.json rewrites), hub
 * links and the footer directory are all derived from this list — adding a page here is the
 * only wiring step. See docs/SEO-LANDING-PAGE-ARCHITECTURE.md.
 */
export const punePageList: PuneLandingPageContent[] = [
  ...housekeepingPages,
  ...facilityManagementPages,
  ...maintenancePages,
  ...securityPages,
];

export const punePagesByPath: Record<string, PuneLandingPageContent> = Object.fromEntries(
  punePageList.map((page) => [page.path, page]),
);

export interface ClusterMeta {
  id: ClusterId;
  label: string;
  pillarPath: string;
}

/** Display order of clusters on hubs and in the footer. */
export const clusters: ClusterMeta[] = [
  { id: 'housekeeping', label: 'Housekeeping', pillarPath: '/housekeeping-services-pune' },
  { id: 'facility-management', label: 'Facility Management', pillarPath: '/facility-management-company-pune' },
  { id: 'maintenance', label: 'Maintenance', pillarPath: '/facility-maintenance-services-pune' },
  { id: 'security', label: 'Security', pillarPath: '/security-services-pune' },
];

/** Pages in a cluster, pillar first. */
export function clusterPages(id: ClusterId): PuneLandingPageContent[] {
  const pages = punePageList.filter((page) => page.cluster === id);
  return [...pages.filter((p) => p.isPillar), ...pages.filter((p) => !p.isPillar)];
}

/** Home › Services › [pillar] › page — the same trail feeds the visible breadcrumb and BreadcrumbList. */
export function buildPuneBreadcrumbs(content: PuneLandingPageContent): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: 'Services', href: '/services' }];
  if (content.parent) items.push({ label: content.parent.label, href: content.parent.href });
  items.push({ label: content.breadcrumbLabel, href: '#' });
  return items;
}
