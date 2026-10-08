import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/pages/KargarSinglePage';
import { SEO } from '@/components/seo/SEO';
import { Container } from '@/components/ui/Container';
import { Breadcrumb, type BreadcrumbItem } from '@/features/services/components/Breadcrumb';
import { PuneServicesLinksSection } from '@/features/pune-landing/components/PuneServicesLinksSection';
import { getSeoEntry } from '@/features/seo/registry';
import { buildCanonicalUrl } from '@/lib/seo/canonical';
import { guidePageList } from '../config/guides';

const PATH = '/resources';

/** /resources — the single content hub for guides (no separate /blog or /insights structure). */
export function ResourcesHubPage() {
  const seo = getSeoEntry(PATH);
  const breadcrumbItems: BreadcrumbItem[] = [{ label: 'Resources', href: '#' }];

  return (
    <div className="kargar-site kb-site">
      <SEO title={seo.title} description={seo.description} canonicalUrl={buildCanonicalUrl(PATH)} breadcrumbItems={breadcrumbItems} />
      <Header activePath={PATH} />
      <main className="bg-white">
        <section className="bg-navy-950 text-white">
          <Container size="lg" className="pt-8 pb-14 lg:pb-20">
            <Breadcrumb items={breadcrumbItems} tone="dark" />
            <p className="text-orange-400 font-semibold tracking-wide uppercase text-sm mb-4">Resources</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight max-w-3xl">Facility Management Guides &amp; Resources</h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Practical guides for admin managers, facility heads and society committees planning housekeeping and facility services in Pune — written from how we scope and run sites.
            </p>
          </Container>
        </section>

        <section className="py-14 lg:py-20 bg-white" aria-labelledby="guides-heading">
          <Container size="lg">
            <h2 id="guides-heading" className="text-3xl md:text-4xl font-bold text-navy-900 mb-10 text-center">Guides</h2>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guidePageList.map((guide) => (
                <li key={guide.path}>
                  <Link
                    to={guide.path}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-orange-300 hover:shadow-md focus-ring"
                  >
                    <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-orange-600">{guide.h1}</h3>
                    <p className="text-slate-600 mb-4">{guide.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-2 font-semibold text-orange-600">
                      Read the guide
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <PuneServicesLinksSection heading="Our Services in Pune" />
      </main>
      <Footer />
    </div>
  );
}
