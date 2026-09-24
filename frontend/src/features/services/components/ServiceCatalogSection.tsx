import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useServices } from '../hooks/useServices';
import { ServiceCard } from './ServiceCard';

/**
 * Services page listing: every service in the registry as a media-rich card, grouped under its
 * existing category (Hard / Soft Services). Group headers keep the internal links to each
 * category hub page that the category cards used to provide.
 */
export function ServiceCatalogSection() {
  const { categories, getServicesByCategory } = useServices();
  const groups = categories
    .filter((c) => c.showInNavigation)
    .sort((a, b) => a.priority - b.priority)
    .map((category) => ({
      category,
      services: getServicesByCategory(category.id).sort((a, b) => a.order - b.order),
    }))
    .filter((group) => group.services.length > 0);

  return (
    <section id="services" className="section-padding bg-gray-50">
      <Container size="xl">
        <SectionHeading
          align="center"
          eyebrow="What We Offer"
          title="Our Facility Management Services"
          subtitle="Explore each service to see the work our teams deliver, what is included, and how to request a proposal."
        />

        <div className="mx-auto max-w-6xl space-y-16">
          {groups.map(({ category, services }) => (
            <div key={category.id}>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-navy-900">{category.title}</h3>
                  <p className="mt-1 text-slate-600">{category.shortDescription}</p>
                </div>
                <Link
                  to={`/services/${category.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-orange-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600"
                >
                  {category.title} overview
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {services.map((service) => (
                  <li key={service.id}>
                    <ServiceCard service={service} category={category} headingLevel="h4" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
