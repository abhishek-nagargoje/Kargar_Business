import { memo } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceMediaGallery } from '@/features/media/components/ServiceMediaGallery';
import { useManagedMediaList } from '@/features/media/hooks/useManagedImage';
import { useServices } from '../hooks/useServices';
import type { ServiceBlockProps } from '../registry/BlockRenderer';
import type { Service } from '../domain/service.types';

/**
 * "Real Service Work" — the published photos and videos an admin has assigned to this service's
 * `gallery` placement in the Media Library. Renders nothing until real media exists: the static
 * fallback images are illustrative, so presenting them here as "real work" would be misleading.
 * The hero keeps its own fallback, so the page never looks empty.
 */
export const ServiceMediaSection = memo(function ServiceMediaSection({ entity, block }: ServiceBlockProps) {
  const { getCategory } = useServices();
  const service = 'categoryId' in entity ? (entity as Service) : null;
  const category = service ? getCategory(service.categoryId) : undefined;

  const { items } = useManagedMediaList({
    placement: 'gallery',
    serviceSlug: service?.catalogSlug,
    pagePath: service && category ? `/services/${category.slug}/${service.slug}` : undefined,
  });

  if (!service || items.length === 0) return null;

  return (
    <section id={block.id} className="bg-slate-50 py-16 lg:py-24">
      <Container size="lg">
        <SectionHeading
          eyebrow="Real Service Work"
          title={`${service.title} at Work`}
          subtitle={`Photos and videos of KARGAR teams delivering ${service.title.toLowerCase()} on site.`}
          className="mb-10"
        />
        <ServiceMediaGallery items={items} label={service.title} />
      </Container>
    </section>
  );
});
