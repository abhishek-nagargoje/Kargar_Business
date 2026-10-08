import { Link, Navigate, useLocation } from 'react-router';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/pages/KargarSinglePage';
import { SEO } from '@/components/seo/SEO';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ManagedImage } from '@/features/media/components/ManagedImage';
import { buttonVariants } from '@/components/ui/Button';
import { Breadcrumb } from '@/features/services/components/Breadcrumb';
import { useContactNavigation } from '@/features/services/hooks/useContactNavigation';
import { useServices } from '@/features/services/hooks/useServices';
import { config } from '@/config';
import { buildCanonicalUrl } from '@/lib/seo/canonical';
import { buildFAQSchema } from '@/lib/seo/schema';
import { buildPuneBreadcrumbs, clusterPages, punePagesByPath } from '../config/punePages';
import { ContentSections, FaqList, Inline } from '../components/ContentSections';
import { stripInline } from '../utils/inlineText';

/**
 * Single reusable renderer for every Pune local-commercial landing page. The page body is
 * driven by each entry's own `sections` list in `config/pages/*`, so pages share chrome
 * (hero, breadcrumb, FAQ, CTA) but not structure.
 */
export function PuneLandingPage() {
  const location = useLocation();
  const content = punePagesByPath[location.pathname];
  const { navigateToContact, contactHref } = useContactNavigation();
  const { getService } = useServices();

  if (!content) return <Navigate to="/404" replace />;

  // e.g. "/services/soft-services/housekeeping" -> "housekeeping". Media is tagged with the
  // Supabase catalog slug, which can differ from the URL slug.
  const detailSegments = content.serviceDetailLink?.href.split('/').filter(Boolean) ?? [];
  const urlSlug = detailSegments.length === 3 ? detailSegments[2] : undefined;
  const serviceSlug = urlSlug ? getService(urlSlug)?.catalogSlug : undefined;

  const breadcrumbItems = buildPuneBreadcrumbs(content);
  const canonicalUrl = buildCanonicalUrl(content.path);
  const siblings = clusterPages(content.cluster).filter((page) => page.path !== content.path);
  const ctaOptions = { source: 'pune_landing_cta', service: content.path };
  const heroCtaOptions = { source: 'pune_landing_hero', service: content.path };

  const serviceSchema = {
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: content.h1,
    description: content.seo.description,
    serviceType: content.serviceType,
    url: canonicalUrl,
    provider: { '@id': `${config.siteUrl}/#organization` },
    areaServed: { '@type': 'City', name: 'Pune' },
  };
  const faqSchema = buildFAQSchema(content.faqs.map((faq) => ({ question: faq.question, answer: stripInline(faq.answer) })));

  return (
    <div className="kargar-site kb-site">
      <SEO
        title={content.seo.title}
        description={content.seo.description}
        canonicalUrl={canonicalUrl}
        ogImage={`${config.siteUrl}${content.heroImage.src}`}
        breadcrumbItems={breadcrumbItems}
        schema={[serviceSchema, faqSchema]}
      />
      <Header activePath={content.path} />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative bg-navy-950 text-white overflow-hidden">
          <div className="absolute inset-0">
            <ManagedImage
              placement="hero"
              serviceSlug={serviceSlug}
              pagePath={content.path}
              fallbackSrc={content.heroImage.src}
              fallbackAlt={content.heroImage.alt}
              className="w-full h-full object-contain opacity-20"
              priority
              decorative
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/90 to-navy-950/70" />
          </div>
          <Container size="lg" className="relative z-10 pt-8 pb-16 lg:pb-24">
            <Breadcrumb items={breadcrumbItems} tone="dark" />
            <p className="text-orange-400 font-semibold tracking-wide uppercase text-sm mb-4">{content.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-[860px]">{content.h1}</h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-8">{content.heroSubtitle}</p>
            <Link
              className={buttonVariants({ variant: 'primary', size: 'lg' })}
              to={contactHref}
              onClick={(e) => { navigateToContact(heroCtaOptions, e); }}
            >
              {content.ctaLabel ?? 'Request a Quote'}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Container>
        </section>

        {/* Intro */}
        <section className="py-14 lg:py-20 bg-white">
          <Container size="md">
            {content.intro.map((paragraph, i) => (
              <p key={i} className="text-slate-700 text-lg leading-relaxed mb-6 last:mb-0">
                <Inline text={paragraph} />
              </p>
            ))}
          </Container>
        </section>

        {content.sections && <ContentSections sections={content.sections} startAlt />}

        {/* Legacy fixed blocks — still used by pages that predate `sections`. */}
        {content.whatsIncluded && (
          <section className="py-14 lg:py-20 bg-slate-50">
            <Container size="lg">
              <SectionHeading title={content.whatsIncluded.heading} align="center" className="mb-12" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {content.whatsIncluded.items.map((item) => (
                  <div key={item.title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600"><Inline text={item.description} /></p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}
        {content.whyChoose && (
          <section className="py-14 lg:py-20 bg-white">
            <Container size="lg">
              <SectionHeading title={content.whyChoose.heading} align="center" className="mb-12" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.whyChoose.items.map((item) => (
                  <div key={item.title} className="text-center">
                    <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-3" aria-hidden="true" />
                    <h3 className="text-base font-bold text-navy-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm"><Inline text={item.description} /></p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}
        {content.industries && (
          <section className="py-14 lg:py-20 bg-slate-50">
            <Container size="lg">
              <SectionHeading title={content.industries.heading} align="center" className="mb-10" />
              <ul className="flex flex-wrap justify-center gap-3">
                {content.industries.items.map((industry) => (
                  <li key={industry} className="bg-white border border-slate-200 rounded-full px-5 py-2 text-sm font-medium text-navy-900">
                    {industry}
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        {/* FAQ — every answer is in the HTML (native <details>), matching the FAQPage JSON-LD. */}
        <section className="py-14 lg:py-20 bg-slate-50">
          <FaqList faqs={content.faqs} />
        </section>

        {/* Cluster navigation: related pages + every sibling in this topic cluster */}
        <section className="py-14 lg:py-20 bg-white" aria-labelledby="related-heading">
          <Container size="lg">
            <h2 id="related-heading" className="text-2xl md:text-3xl font-bold text-navy-900 mb-6 text-center">
              Related Services in Pune
            </h2>
            <ul role="list" className="flex flex-wrap justify-center gap-3 mb-8">
              {content.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-navy-50 px-5 py-2 font-semibold text-navy-900 hover:border-orange-300 hover:text-orange-600 focus-ring"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            {siblings.length > 0 && (
              <nav aria-labelledby="topic-nav-heading" className="border-t border-slate-200 pt-6">
                <p id="topic-nav-heading" className="text-sm font-semibold uppercase tracking-wide text-slate-600 text-center mb-4">More in this topic</p>
                <ul role="list" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                  {siblings.map((page) => (
                    <li key={page.path}>
                      <Link to={page.path} className="text-navy-900 underline underline-offset-2 hover:text-orange-600 focus-ring rounded-sm">
                        {page.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {content.serviceDetailLink && (
              <p className="text-slate-600 text-center mt-6">
                For the general service description, see our{' '}
                <Link to={content.serviceDetailLink.href} className="text-orange-600 font-semibold underline underline-offset-2 hover:text-orange-700 focus-ring rounded-sm">
                  {content.serviceDetailLink.label}
                </Link>
                .
              </p>
            )}
          </Container>
        </section>

        {/* CTA */}
        <section className="py-14 lg:py-20 bg-navy-950">
          <Container size="md" className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.ctaHeading}</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{content.ctaText}</p>
            <Link
              className={buttonVariants({ variant: 'primary', size: 'lg' })}
              to={contactHref}
              onClick={(e) => { navigateToContact(ctaOptions, e); }}
            >
              {content.ctaLabel ?? 'Request a Quote'}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
