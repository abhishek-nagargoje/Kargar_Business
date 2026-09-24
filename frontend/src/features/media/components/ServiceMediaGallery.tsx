import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, TouchEvent } from 'react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight, Expand, Play } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import type { MediaImage } from '@/types';

interface ServiceMediaGalleryProps {
  items: MediaImage[];
  /** Used in accessible labels, e.g. "Housekeeping Services media". */
  label: string;
}

const SWIPE_THRESHOLD_PX = 50;

function mediaLabel(item: MediaImage): string {
  return item.caption ?? item.altText;
}

/**
 * Native video player for one managed video. Only ever mounted for the *active* item, so a
 * gallery never downloads more than one video at a time; `preload="metadata"` keeps even that
 * light until the visitor presses play. Never autoplays.
 */
function GalleryVideo({ item, className }: { item: MediaImage; className?: string }) {
  // No <track kind="captions">: the Media Library has no caption upload yet, and a fabricated
  // track would misrepresent the real audio (known gap, docs/MEDIA-LIBRARY.md).
  return (
    <video
      key={item.id}
      src={item.publicUrl}
      poster={item.thumbnailUrl ?? undefined}
      controls
      preload="metadata"
      playsInline
      aria-label={mediaLabel(item)}
      className={className}
    >
      {item.description && <p>{item.description}</p>}
    </video>
  );
}

/**
 * Mixed image/video gallery for real KARGAR service media: a large active item, previous/next
 * controls, a horizontally scrollable thumbnail strip, and a lightbox for enlarged viewing.
 * Only thumbnails/posters are rendered for inactive items — never extra video players.
 */
export function ServiceMediaGallery({ items, label }: ServiceMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // Set when navigation starts from inside the stage, so focus survives the stage's content
  // being swapped (e.g. the image button unmounting when a video becomes active).
  const keepStageFocus = useRef(false);

  const count = items.length;
  const safeIndex = Math.min(activeIndex, Math.max(count - 1, 0));
  const active = items[safeIndex];

  const go = useCallback(
    (delta: number) => {
      keepStageFocus.current = !!stageRef.current?.contains(document.activeElement);
      setActiveIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!keepStageFocus.current) return;
    keepStageFocus.current = false;
    const stage = stageRef.current;
    if (stage && !stage.contains(document.activeElement)) stage.focus();
  }, [safeIndex]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    // The Modal returns focus to the button that opened it; if navigation inside the lightbox
    // replaced that button (image -> video), focus would be lost, so land on the stage instead.
    setTimeout(() => {
      const el = document.activeElement;
      if (!el || el === document.body || !el.isConnected || el.closest('[role="dialog"]')) {
        stageRef.current?.focus();
      }
    }, 0);
  }, []);

  // Arrow keys navigate inside the lightbox (the Modal itself owns Escape and the focus trap).
  useEffect(() => {
    if (!lightboxOpen || count < 2) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.target instanceof HTMLVideoElement) return; // arrows seek inside a focused player
      if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); };
  }, [lightboxOpen, count, go]);

  if (!active) return null;

  const onStageKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (count < 2 || e.target instanceof HTMLVideoElement) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  };

  // Swipe only on images — on a video, horizontal drags belong to the scrubber.
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = active.mediaType === 'image' ? (e.touches[0]?.clientX ?? null) : null;
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchStartX.current;
    const end = e.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (start === null || end === undefined || count < 2) return;
    const delta = end - start;
    if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) go(delta < 0 ? 1 : -1);
  };

  const navButtonClass =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy-900 shadow-md transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2';

  return (
    <div className="flex flex-col gap-4" role="region" aria-roledescription="gallery" aria-label={`${label} media`}>
      {/* Active item */}
      <div
        ref={stageRef}
        tabIndex={-1}
        className="relative overflow-hidden rounded-xl border border-slate-200 bg-navy-900 shadow-sm focus:outline-none"
        onKeyDown={onStageKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="aspect-video w-full">
          {active.mediaType === 'video' ? (
            <GalleryVideo item={active} className="h-full w-full bg-black object-contain" />
          ) : (
            <button
              type="button"
              onClick={() => { setLightboxOpen(true); }}
              className="group relative block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-orange-600"
              aria-label={`View larger: ${mediaLabel(active)}`}
            >
              <img
                key={active.id}
                src={active.publicUrl}
                alt={active.altText}
                width={active.width ?? undefined}
                height={active.height ?? undefined}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-navy-900/80 px-2.5 py-1.5 text-xs font-semibold text-white opacity-90 group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5" aria-hidden="true" /> View larger
              </span>
            </button>
          )}
        </div>

        {count > 1 && (
          <>
            <button type="button" onClick={() => { go(-1); }} className={clsx(navButtonClass, 'left-3')} aria-label="Previous media">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => { go(1); }} className={clsx(navButtonClass, 'right-3')} aria-label="Next media">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-navy-900">{active.caption ?? active.title}</p>
        {count > 1 && (
          <p className="text-sm text-slate-600" aria-live={lightboxOpen ? 'off' : 'polite'}>
            {safeIndex + 1} of {count}
            <span className="sr-only">: {mediaLabel(active)}</span>
          </p>
        )}
      </div>

      {/* Thumbnails — posters only, never extra players */}
      {count > 1 && (
        <ul className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2" aria-label={`${label} media thumbnails`}>
          {items.map((item, i) => {
            const thumbSrc = item.mediaType === 'video' ? item.thumbnailUrl : item.publicUrl;
            const isActive = i === safeIndex;
            return (
              <li key={item.id} className="shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => { setActiveIndex(i); }}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Show ${item.mediaType} ${i + 1} of ${count}: ${mediaLabel(item)}`}
                  className={clsx(
                    'relative block h-20 w-32 overflow-hidden rounded-lg border-2 bg-navy-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 sm:h-24 sm:w-40',
                    isActive ? 'border-orange-600' : 'border-transparent hover:border-slate-300',
                  )}
                >
                  {thumbSrc && (
                    <img src={thumbSrc} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
                  )}
                  {item.mediaType === 'video' && (
                    <span className="absolute inset-0 flex items-center justify-center bg-navy-900/35" aria-hidden="true">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-navy-900">
                        <Play className="ml-0.5 h-4 w-4" />
                      </span>
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Modal
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        title={active.title}
        description={active.caption ?? undefined}
        maxWidth="full"
        className="lg:max-w-6xl"
      >
        <div className="flex flex-col items-center gap-4">
          {active.mediaType === 'video' ? (
            <GalleryVideo item={active} className="max-h-[70vh] w-full rounded-lg bg-black object-contain" />
          ) : (
            <img
              key={active.id}
              src={active.publicUrl}
              alt={active.altText}
              className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain"
            />
          )}
          {count > 1 && (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => { go(-1); }}
                className="flex h-11 items-center gap-1 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-navy-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous
              </button>
              <span className="text-sm text-slate-600" aria-live="polite">
                {safeIndex + 1} of {count}
                <span className="sr-only">: {mediaLabel(active)}</span>
              </span>
              <button
                type="button"
                onClick={() => { go(1); }}
                className="flex h-11 items-center gap-1 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-navy-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
              >
                Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
