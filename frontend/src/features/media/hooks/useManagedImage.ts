import { useQuery } from '@tanstack/react-query';
import { fetchPublishedImages } from '@/services/media.service';
import type { MediaImage, MediaPlacement, MediaType } from '@/types';

interface UseManagedMediaListOptions {
  placement: MediaPlacement;
  /** The Supabase `services` slug (Service.catalogSlug), not the URL slug. */
  serviceSlug?: string;
  pagePath?: string;
  /** Omit to accept both images and videos. */
  mediaType?: MediaType;
  /** Pass false to skip the lookup entirely (the result is then always empty). */
  enabled?: boolean;
}

interface ManagedMediaList {
  items: MediaImage[];
}

/**
 * Published, admin-managed media for a placement, already in priority order (exact page first,
 * then featured, then display order — see fetchPublishedImages). The media library starts empty
 * and is populated gradually, so an empty list is the normal case and callers must fall back to
 * the existing static asset (see docs/MEDIA-LIBRARY.md). A failed lookup also yields an empty
 * list: managed media must never break a page.
 *
 * Backed by React Query so identical lookups from several components share one request.
 */
export function useManagedMediaList(options: UseManagedMediaListOptions): ManagedMediaList {
  const { placement, serviceSlug, pagePath, mediaType, enabled = true } = options;

  const query = useQuery({
    queryKey: ['managed-media', placement, serviceSlug ?? null, pagePath ?? null, mediaType ?? 'any'],
    queryFn: () => fetchPublishedImages({ placement, serviceSlug, pagePath, mediaType }),
    retry: false,
    enabled,
  });

  return { items: query.data ?? [] };
}

type UseManagedImageOptions = Omit<UseManagedMediaListOptions, 'mediaType'>;

/** The highest-priority published, admin-managed IMAGE for a placement, or `null`. */
export function useManagedImage(options: UseManagedImageOptions): MediaImage | null {
  return useManagedMediaList({ ...options, mediaType: 'image' }).items[0] ?? null;
}

/** The highest-priority published, admin-managed VIDEO for a placement, or `null`. */
export function useManagedVideo(options: UseManagedImageOptions): MediaImage | null {
  return useManagedMediaList({ ...options, mediaType: 'video' }).items[0] ?? null;
}
