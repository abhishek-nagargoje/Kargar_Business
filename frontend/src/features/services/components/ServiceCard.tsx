import { memo } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useManagedMediaList } from '@/features/media/hooks/useManagedImage';
import { serviceIcons } from '../config/icons';
import { serviceImages } from '../config/images';
import { SERVICES_PAGE_PATH } from '../config';
import type { Category, Service } from '../domain/service.types';

interface ServiceCardProps {
  service: Service;
  category: Category;
  /** Heading level for the service name, so the card fits the surrounding outline. */
  headingLevel?: 'h3' | 'h4';
}

/**
 * Services-page card for one real registry service. Media comes from the Media Library
 * (`service-card` placement, preferring media scoped to /services) and falls back to the
 * service's existing static image. The whole card is clickable via the "Learn More" link's
 * stretched hit area; a video sits above that area so its native controls stay usable.
 */
export const ServiceCard = memo(function ServiceCard({ service, category, headingLevel = 'h3' }: ServiceCardProps) {
  const Icon = serviceIcons[service.iconKey];
  const Heading = headingLevel;
  const href = `/services/${category.slug}/${service.slug}`;
  const fallback = serviceImages[service.imageKey] ?? serviceImages.hardServices;
  const highlights = (service.operations?.scopeOfWork ?? []).slice(0, 3);

  const { items } = useManagedMediaList({
    placement: 'service-card',
    serviceSlug: service.catalogSlug,
    pagePath: SERVICES_PAGE_PATH,
  });
  const media = items[0];
  const isVideo = media?.mediaType === 'video';

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {isVideo ? (
          // Above the stretched link so the native controls receive clicks. Poster-only
          // (preload="none") when a poster exists, so a grid of cards never pulls video data.
          <video
            src={media.publicUrl}
            poster={media.thumbnailUrl ?? undefined}
            controls
            preload={media.thumbnailUrl ? 'none' : 'metadata'}
            playsInline
            aria-label={media.caption ?? media.altText}
            className="relative z-10 h-full w-full bg-black object-cover"
          />
        ) : (
          <OptimizedImage
            // The small auto-generated preview keeps card grids fast; the full photo is what
            // opens in the hero/lightbox elsewhere, so nothing is ever shown downscaled there.
            src={media?.thumbnailUrl ?? media?.publicUrl ?? fallback?.src ?? ''}
            alt={media?.altText ?? fallback?.alt ?? service.title}
            sizes="(min-width: 768px) 50vw, 100vw"
            containerClassName="h-full w-full"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-md bg-navy-900/90 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          {isVideo ? 'Video' : 'Image'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-3">
          {Icon && (
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-700" aria-hidden="true">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
          )}
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">{category.title}</p>
        </div>

        <Heading className="text-xl font-bold text-navy-900">{service.title}</Heading>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.shortDescription}</p>

        {highlights.length > 0 && (
          <ul className="mt-5 space-y-2">
            {highlights.map((item) => (
              <li key={item.title} className="flex items-start gap-2 text-sm text-navy-900">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" aria-hidden="true" />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        )}

        <Link
          to={href}
          aria-label={`Learn more about ${service.title}`}
          className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-sm font-bold text-orange-700 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-orange-800"
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
});
