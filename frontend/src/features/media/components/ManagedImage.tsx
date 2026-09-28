import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useManagedImage } from '../hooks/useManagedImage';
import type { MediaPlacement } from '@/types';

interface ManagedImageProps {
  placement: MediaPlacement;
  serviceSlug?: string;
  pagePath?: string;
  /** The existing static image, used until an admin uploads and assigns a real replacement. */
  fallbackSrc: string;
  fallbackAlt: string;
  className?: string;
  /** Classes for OptimizedImage's wrapper div (e.g. `h-full` when the image must fill a sized box). */
  containerClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Passed through to OptimizedImage — true for purely atmospheric background images. */
  decorative?: boolean;
  /**
   * Overrides OptimizedImage's safe "show the whole photo" default. Only pass 'cover' for a
   * genuinely decorative, non-content background (e.g. a low-opacity atmospheric backdrop behind
   * a gradient and real text) — never for an image the visitor is meant to actually look at.
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /** False renders the fallback without querying the Media Library. */
  enabled?: boolean;
}

/**
 * Renders an admin-managed KARGAR photograph if one has been published and assigned to this
 * placement, otherwise renders the existing static fallback image unchanged — so pages never
 * show a broken or blank image while the media library is gradually populated.
 */
export function ManagedImage({
  placement,
  serviceSlug,
  pagePath,
  fallbackSrc,
  fallbackAlt,
  className,
  containerClassName,
  sizes,
  priority,
  decorative,
  objectFit,
  enabled,
}: ManagedImageProps) {
  const managed = useManagedImage({ placement, serviceSlug, pagePath, enabled });

  return (
    <OptimizedImage
      src={managed?.publicUrl ?? fallbackSrc}
      alt={managed?.altText ?? fallbackAlt}
      width={managed?.width ?? undefined}
      height={managed?.height ?? undefined}
      className={className}
      containerClassName={containerClassName}
      sizes={sizes}
      priority={priority}
      decorative={decorative}
      objectFit={objectFit}
    />
  );
}
