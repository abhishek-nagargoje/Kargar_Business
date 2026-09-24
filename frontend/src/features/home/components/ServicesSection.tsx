import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useStaggerReveal } from '@/hooks/animations';
import { useServices } from '@/features/services/hooks/useServices';
import { ServiceCard } from '@/features/services/components/ServiceCard';

/**
 * Homepage service showcase: every real service in the registry as its own media-rich card
 * (real KARGAR photo/video via the Media Library, falling back to the existing static image).
 * Mirrors the card used on the /services listing page rather than the old two-category-card
 * presentation, so a visitor can go straight from the homepage to a specific service page.
 */
export function ServicesSection() {
  const containerRef = useStaggerReveal();
  const { categories, getServicesByCategory } = useServices();

  const displayServices = categories
    .filter((c) => c.showInNavigation)
    .sort((a, b) => a.priority - b.priority)
    .flatMap((category) =>
      getServicesByCategory(category.id)
        .sort((a, b) => a.order - b.order)
        .map((service) => ({ service, category })),
    );

  return (
    <section id="services" className="section-padding bg-gray-50">
      <Container size="xl">
        <SectionHeading
          align="center"
          eyebrow="What We Offer"
          title="Our Facility Management Services"
        />

        <p className="-mt-8 mb-16 max-w-3xl mx-auto text-center text-gray-600">
          Complete facility solutions for every need — our integrated teams keep enterprise sites
          running safely and reliably, from technical maintenance to day-to-day site services.
        </p>

        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4"
        >
          {displayServices.map(({ service, category }) => (
            <div key={service.id} data-gsap-stagger-item className="h-full">
              <ServiceCard service={service} category={category} headingLevel="h3" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
