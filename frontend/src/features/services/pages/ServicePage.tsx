import { useParams, Navigate, Link } from 'react-router';
import { useServices } from '../hooks/useServices';
import { ServiceLayout } from '../layouts/ServiceLayout';
import { SEO } from '@/components/seo/SEO';
import { Header, Footer } from '@/pages/KargarSinglePage';
import { config } from '@/config';
import { buildCanonicalUrl } from '@/lib/seo/canonical';
import { buildServiceBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildServiceSchema, buildFAQSchema } from '@/lib/seo/schema';
import { serviceImages } from '../config/images';
import { punePageList } from '@/features/pune-landing/config/punePages';
import { Container } from '@/components/ui/Container';

/** Maps a service-detail path (this page's own served-in-Pune equivalent, per punePages' serviceDetailLink) back to that Pune page. */
function findPunePageFor(servicePath: string) {
  return punePageList.find((p) => p.serviceDetailLink.href === servicePath);
}

export function ServicePage() {
  const { categoryId, serviceId } = useParams<{ categoryId: string; serviceId: string }>();
  const { getService, getCategory, getRelatedServices } = useServices();

  if (!serviceId || !categoryId) return <Navigate to="/services" replace />;

  const service = getService(serviceId);
  const category = getCategory(categoryId);

  if (!service || !category) return <Navigate to="/404" replace />;

  const relatedServices = getRelatedServices(service.id);
  const heroImage = serviceImages[service.imageKey];
  const path = `/services/${category.slug}/${service.slug}`;
  const punePage = findPunePageFor(path);

  return (
    <div className="kargar-site kb-site">
      <SEO
        title={service.seo.title}
        description={service.seo.description}
        canonicalUrl={buildCanonicalUrl(path)}
        ogImage={heroImage ? `${config.siteUrl}${heroImage.src}` : undefined}
        breadcrumbItems={buildServiceBreadcrumbs(service)}
        schema={[
          buildServiceSchema(service, category),
          ...(service.faqs && service.faqs.length > 0 ? [buildFAQSchema(service.faqs)] : []),
        ]}
      />
      <Header activePath={path} />
      <main>
        <ServiceLayout
          service={service}
          category={category}
          relatedServices={relatedServices}
        />
        {punePage && (
          <section className="py-12 bg-white border-t border-slate-100">
            <Container size="md" className="text-center">
              <p className="text-slate-600">
                Looking for {service.title.toLowerCase()} specifically in Pune? See our{' '}
                <Link to={punePage.path} className="text-orange-600 font-semibold hover:text-orange-700 underline underline-offset-2">
                  {punePage.h1}
                </Link>{' '}
                page for local coverage and FAQs.
              </p>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
