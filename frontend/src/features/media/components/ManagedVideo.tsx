import { useManagedVideo } from '../hooks/useManagedImage';
import type { MediaPlacement } from '@/types';

interface ManagedVideoProps {
  placement: MediaPlacement;
  serviceSlug?: string;
  pagePath?: string;
  className?: string;
}

/**
 * Renders an admin-managed KARGAR video if one has been published and assigned to this
 * placement — otherwise renders nothing. Unlike ManagedImage, there is no legacy static video
 * anywhere on the site to fall back to, so "nothing assigned yet" correctly means "render
 * nothing" rather than showing a placeholder.
 *
 * Never autoplays (so it can never autoplay *with sound*, satisfying that requirement
 * trivially) — playback is entirely user-initiated via the native controls. `preload="metadata"`
 * keeps the initial page load light (only enough is fetched to show duration/poster, not the
 * full video) until the user actually presses play.
 */
export function ManagedVideo({ placement, serviceSlug, pagePath, className }: ManagedVideoProps) {
  const managed = useManagedVideo({ placement, serviceSlug, pagePath });

  if (!managed) return null;

  // No <track kind="captions"> here: admins don't currently have a way to attach one, and
  // fabricating a caption file that doesn't reflect the real video's audio would be worse than
  // omitting it. Flagged as a known gap in docs/MEDIA-LIBRARY.md rather than faked.
  return (
    <video
      src={managed.publicUrl}
      poster={managed.thumbnailUrl ?? undefined}
      controls
      preload="metadata"
      playsInline
      aria-label={managed.caption ?? managed.title}
      className={className}
    >
      {managed.description && <p>{managed.description}</p>}
    </video>
  );
}
