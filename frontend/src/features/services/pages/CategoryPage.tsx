import { useParams, Navigate, Link } from 'react-router';
import { useServices } from '../hooks/useServices';
import { CategoryLayout } from '../layouts/CategoryLayout';
import { SEO } from '@/components/seo/SEO';
import { Header, Footer } from '@/pages/KargarSinglePage';
import { config } from '@/config';
import { buildCanonicalUrl } from '@/lib/seo/canonical';
import { buildServiceBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildCategoryServiceSchema } from '@/lib/seo/schema';
import { serviceImages } from '../config/images';
import { footerClusterPages } from '@/features/pune-landing/config/punePages';
import type { ClusterId } from '@/features/pune-landing/domain/types';
import { Container } from '@/components/ui/Container';

const CATEGORY_CLUSTERS: Record<string, ClusterId[]> = {
  'hard-services': ['maintenance'],
  'soft-services': ['housekeeping', 'security'],
};

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { getCategory, getServicesByCategory } = useServices();

  if (!categoryId) return <Navigate to="/services" replace />;

  const category = getCategory(categoryId);
  if (!category) return <Navigate to="/404" replace />;

  const services = getServicesByCategory(category.id);
  const heroImage = serviceImages[category.imageKey];
  const path = `/services/${category.slug}`;
  // The Pune pages for this category's clusters (pillar plus priority pages), so each hub routes
  // buyers to the detailed local pages.
  const clusterIds = CATEGORY_CLUSTERS[category.slug] ?? [];
  const categoryPunePages = clusterIds.flatMap((id) => footerClusterPages(id));

  return (
    <div className="kargar-site kb-site">
      <SEO
        title={category.seo.title}
        description={category.seo.description}
        canonicalUrl={buildCanonicalUrl(path)}
        ogImage={heroImage ? `${config.siteUrl}${heroImage.src}` : undefined}
        breadcrumbItems={buildServiceBreadcrumbs(category)}
        schema={[buildCategoryServiceSchema(category)]}
      />
      <Header activePath={path} />
      <main id="main-content" tabIndex={-1}>
        <CategoryLayout category={category} services={services} />
        {categoryPunePages.length > 0 && (
          <section className="py-12 bg-white border-t border-slate-100">
            <Container size="md" className="text-center">
              <p className="text-slate-600">
                Serving Pune: {categoryPunePages.map((p, i) => (
                  <span key={p.path}>
                    {i > 0 && ' · '}
                    <Link to={p.path} className="text-orange-600 font-semibold hover:text-orange-700 underline underline-offset-2">
                      {p.h1}
                    </Link>
                  </span>
                ))}
              </p>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
