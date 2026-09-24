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
  priority?: boolean;
  /** Passed through to OptimizedImage — true for purely atmospheric background images. */
  decorative?: boolean;
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
  priority,
  decorative,
}: ManagedImageProps) {
  const managed = useManagedImage({ placement, serviceSlug, pagePath });

  return (
    <OptimizedImage
      src={managed?.publicUrl ?? fallbackSrc}
      alt={managed?.altText ?? fallbackAlt}
      className={className}
      priority={priority}
      decorative={decorative}
    />
  );
}
