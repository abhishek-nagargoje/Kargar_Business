import { memo } from 'react';
import { Link } from 'react-router';
import { Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button, buttonVariants } from '@/components/ui/Button';
import { ManagedImage } from '@/features/media/components/ManagedImage';
import { useManagedVideo } from '@/features/media/hooks/useManagedImage';
import { contactDetails, telHref } from '@/config/contact';
import { Breadcrumb } from './Breadcrumb';
import { useContactNavigation } from '../hooks/useContactNavigation';
import { useServices } from '../hooks/useServices';
import { useDocument } from '../../../shared/hooks/useDocument';
import { serviceImages } from '../config/images';
import { buildServiceBreadcrumbs } from '@/lib/seo/breadcrumbs';
import type { ServiceBlockProps } from '../registry/BlockRenderer';
import type { Category, Service } from '../domain/service.types';

export const HeroSection = memo(function HeroSection({ entity, block }: ServiceBlockProps) {
  const image = serviceImages[entity.imageKey] ?? serviceImages.hardServices;
  const { navigateToContact, buildContactUrl } = useContactNavigation();
  const { getCategory } = useServices();
  const { doc, isDownloading, handleDownload } = useDocument('brochure', {
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    ctaPosition: 'hero',
    service: entity.title
  });

  const service = 'categoryId' in entity ? (entity as Service) : null;
  const category = service ? getCategory(service.categoryId) : undefined;
  const breadcrumbs = buildServiceBreadcrumbs(entity as Category | Service);
  const pagePath = service && category ? `/services/${category.slug}/${service.slug}` : `/services/${entity.slug}`;

  // Media Library lookups use the Supabase catalog slug. Category hubs have no service row, and
  // an unscoped lookup would match any service's hero media, so they keep their static image.
  const mediaServiceSlug = service?.catalogSlug;
  const heroVideo = useManagedVideo({ placement: 'hero', serviceSlug: mediaServiceSlug, pagePath, enabled: !!service });

  const eyebrow = category?.title ?? 'Services';
  const tagline = entity.marketing?.headline;
  const summary = entity.marketing?.summary ?? ('shortDescription' in entity ? (entity as { shortDescription: string }).shortDescription : '');

  const contactOptions = {
    source: 'hero',
    service: entity.slug,
    category: service?.categoryId,
    ctaPosition: 'hero',
  };

  return (
    <section id={block.id} className="relative bg-navy-900 overflow-hidden py-14 md:py-20">
      <div className="absolute inset-0 z-0 bg-linear-to-br from-navy-900 via-navy-900 to-navy-800" aria-hidden="true" />

      <Container size="xl" className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="min-w-0 max-w-2xl">
          <div className="mb-6 text-white/80 [&_a]:text-white/80 [&_span]:text-white">
            <Breadcrumb items={breadcrumbs} className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden" />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-orange-300">{eyebrow}</p>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            {entity.title}
          </h1>

          {tagline && tagline !== entity.title && (
            <p className="text-xl md:text-2xl font-semibold text-white/90 mb-4 leading-snug">{tagline}</p>
          )}

          {summary && (
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {summary}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            <Link
              className={buttonVariants({ variant: 'primary', size: 'lg', className: 'shadow-lg hover:shadow-orange-500/20' })}
              to={buildContactUrl(contactOptions)}
              onClick={(e) => { navigateToContact(contactOptions, e); }}
            >
              Request a Proposal
            </Link>
            <a
              href={telHref(contactDetails.phone)}
              className={buttonVariants({ variant: 'outline', size: 'lg', className: 'text-white border-white/40 hover:bg-white/10 hover:text-white' })}
              aria-label={`Talk to our team: call ${contactDetails.phone.display}`}
            >
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
              Talk to Our Team
            </a>
            {doc.available && doc.downloadEnabled && (
              <Button
                size="lg"
                variant="outline"
                onClick={handleDownload}
                disabled={isDownloading}
                className="text-white border-white/20 hover:bg-white/10"
              >
                {isDownloading ? 'Downloading...' : 'Download Brochure'}
              </Button>
            )}
          </div>
        </div>

        {/* Hero media: an assigned managed video, else the managed hero image, else the existing static image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-navy-800 shadow-2xl">
          {heroVideo ? (
            <video
              src={heroVideo.publicUrl}
              poster={heroVideo.thumbnailUrl ?? undefined}
              controls
              preload="metadata"
              playsInline
              aria-label={heroVideo.caption ?? heroVideo.altText}
              className="h-full w-full bg-black object-cover"
            />
          ) : (
            <ManagedImage
              placement="hero"
              serviceSlug={mediaServiceSlug}
              pagePath={pagePath}
              enabled={!!service}
              fallbackSrc={image?.src ?? ''}
              fallbackAlt={image?.alt ?? entity.title}
              containerClassName="h-full w-full"
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          )}
        </div>
      </Container>
    </section>
  );
});
