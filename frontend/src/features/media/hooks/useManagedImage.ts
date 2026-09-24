import { useEffect, useState } from 'react';
import { fetchPublishedImages } from '@/services/media.service';
import type { MediaImage, MediaPlacement, MediaType } from '@/types';

interface UseManagedMediaOptions {
  placement: MediaPlacement;
  serviceSlug?: string;
  pagePath?: string;
  mediaType: MediaType;
}

/**
 * Shared lookup used by both useManagedImage and useManagedVideo. Returns `null` while
 * loading or when nothing is assigned yet, so callers can fall back to the existing static
 * asset — the media library starts empty, and real KARGAR media is added gradually, so most
 * placements will resolve to `null` until an admin uploads and assigns a replacement (see
 * docs/MEDIA-LIBRARY.md).
 */
function useManagedMedia(options: UseManagedMediaOptions): MediaImage | null {
  const [media, setMedia] = useState<MediaImage | null>(null);
  const { placement, serviceSlug, pagePath, mediaType } = options;

  useEffect(() => {
    let active = true;

    fetchPublishedImages({ placement, serviceSlug, pagePath, mediaType })
      .then((results) => {
        if (active) setMedia(results[0] ?? null);
      })
      .catch(() => {
        // A managed-media lookup failure must never break the page — fall back silently.
        if (active) setMedia(null);
      });

    return () => {
      active = false;
    };
  }, [placement, serviceSlug, pagePath, mediaType]);

  return media;
}

interface UseManagedImageOptions {
  placement: MediaPlacement;
  serviceSlug?: string;
  pagePath?: string;
}

/** Looks up the first published, admin-managed IMAGE for a placement. Unchanged behavior from before video support was added. */
export function useManagedImage(options: UseManagedImageOptions): MediaImage | null {
  return useManagedMedia({ ...options, mediaType: 'image' });
}

/** Looks up the first published, admin-managed VIDEO for a placement. */
export function useManagedVideo(options: UseManagedImageOptions): MediaImage | null {
  return useManagedMedia({ ...options, mediaType: 'video' });
}
