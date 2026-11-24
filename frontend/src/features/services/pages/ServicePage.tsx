import { useParams, Navigate } from 'react-router';
import { useServices } from '../hooks/useServices';
import { ServiceLayout } from '../layouts/ServiceLayout';
import { SEO } from '@/components/seo/SEO';
import { Header, Footer } from '@/pages/KargarSinglePage';
import { config } from '@/config';
import { buildCanonicalUrl } from '@/lib/seo/canonical';
import { buildServiceBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildServiceSchema, buildFAQSchema } from '@/lib/seo/schema';
import { serviceImages } from '../config/images';
import { SERVICE_LANDING_PATHS } from '../config/landingPaths';

export function ServicePage() {
  const { categoryId, serviceId } = useParams<{ categoryId: string; serviceId: string }>();
  const { getService, getCategory, getRelatedServices } = useServices();

  if (!serviceId || !categoryId) return <Navigate to="/services" replace />;

  // Consolidated into a Pune landing page: the server answers with a 301 (vercel.json); this
  // covers in-app navigation to an old URL.
  const landingPath = SERVICE_LANDING_PATHS[serviceId];
  if (landingPath) return <Navigate to={landingPath} replace />;

  const service = getService(serviceId);
  const category = getCategory(categoryId);

  if (!service || !category) return <Navigate to="/404" replace />;

  const relatedServices = getRelatedServices(service.id);
  const heroImage = serviceImages[service.imageKey];
  const path = `/services/${category.slug}/${service.slug}`;

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
      <main id="main-content" tabIndex={-1}>
        <ServiceLayout service={service} category={category} relatedServices={relatedServices} />
      </main>
      <Footer />
    </div>
  );
}
