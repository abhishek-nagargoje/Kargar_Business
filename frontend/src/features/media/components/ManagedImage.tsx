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
  enabled,
}: ManagedImageProps) {
  const managed = useManagedImage({ placement, serviceSlug, pagePath, enabled });

  return (
    <OptimizedImage
      src={managed?.publicUrl ?? fallbackSrc}
      alt={managed?.altText ?? fallbackAlt}
      className={className}
      containerClassName={containerClassName}
      sizes={sizes}
      priority={priority}
      decorative={decorative}
    />
  );
}
