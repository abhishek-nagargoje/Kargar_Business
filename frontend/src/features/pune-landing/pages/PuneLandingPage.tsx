import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { CheckCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/pages/KargarSinglePage';
import { SEO } from '@/components/seo/SEO';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { buttonVariants } from '@/components/ui/Button';
import { Breadcrumb, type BreadcrumbItem } from '@/features/services/components/Breadcrumb';
import { useContactNavigation } from '@/features/services/hooks/useContactNavigation';
import { config } from '@/config';
import { buildCanonicalUrl } from '@/lib/seo/canonical';
import { buildFAQSchema } from '@/lib/seo/schema';
import { punePages } from '../config/punePages';

/**
 * Single reusable template for every Pune local-commercial landing page — driven entirely by
 * the typed content in `config/punePages.ts`. Renders the current route's page by matching
 * `location.pathname` against each entry's `path`, so no per-page component or route param
 * plumbing is needed beyond the route registration in App.tsx.
 */
export function PuneLandingPage() {
  const location = useLocation();
  const content = Object.values(punePages).find((p) => p.path === location.pathname);
  const { navigateToContact, buildContactUrl } = useContactNavigation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!content) return <Navigate to="/404" replace />;

  const breadcrumbItems: BreadcrumbItem[] = [{ label: content.breadcrumbLabel, href: '#' }];

  const serviceSchema = {
    '@type': 'Service',
    '@id': `${buildCanonicalUrl(content.path)}#service`,
    name: content.h1,
    description: content.seo.description,
    serviceType: content.serviceType,
    provider: { '@id': `${config.siteUrl}/#organization` },
    areaServed: { '@type': 'City', name: 'Pune' },
  };

  return (
    <div className="kargar-site kb-site">
      <SEO
        title={content.seo.title}
        description={content.seo.description}
        canonicalUrl={buildCanonicalUrl(content.path)}
        ogImage={`${config.siteUrl}${content.heroImage.src}`}
        breadcrumbItems={breadcrumbItems}
        schema={[serviceSchema, buildFAQSchema(content.faqs)]}
      />
      <Header activePath={content.path} />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative bg-navy-950 text-white overflow-hidden">
          <div className="absolute inset-0">
            <OptimizedImage src={content.heroImage.src} alt={content.heroImage.alt} className="w-full h-full object-cover opacity-20" priority decorative />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/90 to-navy-950/70" />
          </div>
          <Container size="lg" className="relative z-10 pt-8 pb-20 lg:pb-28">
            <Breadcrumb items={breadcrumbItems} className="text-gray-300 [&_svg]:text-gray-500 [&_span]:text-white" />
            <p className="text-orange-400 font-semibold tracking-wide uppercase text-sm mb-4">{content.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-[800px]">{content.h1}</h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-8">{content.heroSubtitle}</p>
            <Link
              className={buttonVariants({ variant: 'primary', size: 'lg' })}
              to={buildContactUrl({ source: 'pune_landing_hero', service: content.path })}
              onClick={(e) => { navigateToContact({ source: 'pune_landing_hero', service: content.path }, e); }}
            >
              Request a Proposal
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Container>
        </section>

        {/* Intro */}
        <section className="py-16 lg:py-20 bg-white">
          <Container size="md">
            {content.intro.map((paragraph, i) => (
              <p key={i} className="text-slate-600 text-lg leading-relaxed mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </Container>
        </section>

        {/* What's included */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <Container size="lg">
            <SectionHeading title={content.whatsIncluded.heading} align="center" className="mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.whatsIncluded.items.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Why choose */}
        <section className="py-16 lg:py-20 bg-white">
          <Container size="lg">
            <SectionHeading title={content.whyChoose.heading} align="center" className="mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.whyChoose.items.map((item) => (
                <div key={item.title} className="text-center">
                  <CheckCircle className="h-8 w-8 text-orange-500 mx-auto mb-3" aria-hidden="true" />
                  <h3 className="text-base font-bold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Industries */}
        {content.industries && (
          <section className="py-16 lg:py-20 bg-slate-50">
            <Container size="lg">
              <SectionHeading title={content.industries.heading} align="center" className="mb-10" />
              <div className="flex flex-wrap justify-center gap-3">
                {content.industries.items.map((industry) => (
                  <span key={industry} className="bg-white border border-slate-200 rounded-full px-5 py-2 text-sm font-medium text-navy-900">
                    {industry}
                  </span>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Related service detail + Pune cluster links */}
        <section className="py-16 lg:py-20 bg-white">
          <Container size="md" className="text-center">
            <p className="text-slate-600 mb-4">
              For full operational detail on this service, see our{' '}
              <Link to={content.serviceDetailLink.href} className="text-orange-600 font-semibold hover:text-orange-700 underline underline-offset-2 focus-ring rounded-sm">
                {content.serviceDetailLink.label}
              </Link>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
              {content.relatedLinks.map((link) => (
                <Link key={link.href} to={link.href} className="text-navy-900 font-medium hover:text-orange-600 underline underline-offset-2 focus-ring rounded-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <Container size="md">
            <SectionHeading title="Frequently Asked Questions" align="center" className="mb-12" />
            <div className="max-w-3xl mx-auto divide-y divide-slate-200 bg-white rounded-2xl border border-slate-100 px-6">
              {content.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={faq.question}>
                    <h3 className="m-0">
                      <button
                        type="button"
                        onClick={() => { setOpenFaq(isOpen ? null : i); }}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between py-5 text-left font-semibold text-navy-900 focus-ring rounded-sm"
                      >
                        {faq.question}
                        <ChevronDown className={`h-5 w-5 shrink-0 ml-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                    </h3>
                    {isOpen && <p className="text-slate-600 pb-5">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-navy-950">
          <Container size="md" className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.ctaHeading}</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{content.ctaText}</p>
            <Link
              className={buttonVariants({ variant: 'primary', size: 'lg' })}
              to={buildContactUrl({ source: 'pune_landing_cta', service: content.path })}
              onClick={(e) => { navigateToContact({ source: 'pune_landing_cta', service: content.path }, e); }}
            >
              Get Facility Management Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
