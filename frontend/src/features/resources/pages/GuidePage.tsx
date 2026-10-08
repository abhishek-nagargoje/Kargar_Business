import { Link, Navigate, useLocation } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/pages/KargarSinglePage';
import { SEO } from '@/components/seo/SEO';
import { Container } from '@/components/ui/Container';
import { buttonVariants } from '@/components/ui/Button';
import { Breadcrumb, type BreadcrumbItem } from '@/features/services/components/Breadcrumb';
import { useContactNavigation } from '@/features/services/hooks/useContactNavigation';
import { ContentSections, FaqList, Inline } from '@/features/pune-landing/components/ContentSections';
import { stripInline } from '@/features/pune-landing/utils/inlineText';
import { config } from '@/config';
import { buildCanonicalUrl } from '@/lib/seo/canonical';
import { buildFAQSchema } from '@/lib/seo/schema';
import { guidePagesByPath } from '../config/guides';

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Renders an informational guide under /resources, with Article structured data. */
export function GuidePage() {
  const { pathname } = useLocation();
  const guide = guidePagesByPath[pathname];
  const { navigateToContact, contactHref } = useContactNavigation();

  if (!guide) return <Navigate to="/404" replace />;

  const canonicalUrl = buildCanonicalUrl(guide.path);
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Resources', href: '/resources' },
    { label: guide.breadcrumbLabel, href: '#' },
  ];

  // Authorship is the organization itself — KARGAR does not publish named authors for guides,
  // and inventing a person would be a fabricated E-E-A-T signal.
  const articleSchema = {
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: guide.h1,
    description: guide.seo.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    inLanguage: 'en-IN',
    mainEntityOfPage: canonicalUrl,
    image: `${config.siteUrl}/images/brand/kargar-logo.png`,
    author: { '@id': `${config.siteUrl}/#organization` },
    publisher: { '@id': `${config.siteUrl}/#organization` },
  };
  const schema: object[] = [articleSchema];
  if (guide.faqs?.length) {
    schema.push(buildFAQSchema(guide.faqs.map((faq) => ({ question: faq.question, answer: stripInline(faq.answer) }))));
  }

  return (
    <div className="kargar-site kb-site">
      <SEO
        title={guide.seo.title}
        description={guide.seo.description}
        canonicalUrl={canonicalUrl}
        breadcrumbItems={breadcrumbItems}
        schema={schema}
        ogType="article"
      />
      <Header activePath={guide.path} />
      <main className="bg-white">
        <section className="bg-navy-950 text-white">
          <Container size="md" className="pt-8 pb-14 lg:pb-20">
            <Breadcrumb items={breadcrumbItems} tone="dark" />
            <p className="text-orange-400 font-semibold tracking-wide uppercase text-sm mb-4">Guide</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">{guide.h1}</h1>
            <p className="text-lg text-gray-300 mb-6">{guide.standfirst}</p>
            <p className="text-sm text-gray-400">
              By <Link to="/company-profile" className="text-white underline underline-offset-2 hover:text-orange-300 focus-ring rounded-sm">KARGAR Facility Management</Link>
              {' · '}Published <time dateTime={guide.datePublished}>{formatDate(guide.datePublished)}</time>
              {guide.dateModified !== guide.datePublished && (
                <>
                  {' · '}Updated <time dateTime={guide.dateModified}>{formatDate(guide.dateModified)}</time>
                </>
              )}
            </p>
          </Container>
        </section>

        <section className="py-12 lg:py-16 bg-white">
          <Container size="md">
            {guide.intro.map((paragraph, i) => (
              <p key={i} className="text-slate-700 text-lg leading-relaxed mb-5 last:mb-0">
                <Inline text={paragraph} />
              </p>
            ))}
          </Container>
        </section>

        <ContentSections sections={guide.sections} startAlt />

        {guide.faqs && guide.faqs.length > 0 && (
          <section className="py-14 lg:py-20 bg-slate-50">
            <FaqList faqs={guide.faqs} heading="Common Questions" />
          </section>
        )}

        <section className="py-14 lg:py-20 bg-white" aria-labelledby="guide-related-heading">
          <Container size="md" className="text-center">
            <h2 id="guide-related-heading" className="text-2xl md:text-3xl font-bold text-navy-900 mb-6">Keep Reading</h2>
            <ul role="list" className="flex flex-wrap justify-center gap-3">
              {guide.relatedLinks.map((link) => (
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
            <p className="mt-6">
              <Link to="/resources" className="text-orange-600 font-semibold underline underline-offset-2 hover:text-orange-700 focus-ring rounded-sm">
                All facility management guides
              </Link>
            </p>
          </Container>
        </section>

        <section className="py-14 lg:py-20 bg-navy-950">
          <Container size="md" className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Talk to KARGAR About Your Property</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              We survey the site, write the scope and staffing, and send a proposal you can compare line by line.
            </p>
            <Link
              className={buttonVariants({ variant: 'primary', size: 'lg' })}
              to={contactHref}
              onClick={(e) => { navigateToContact({ source: 'guide_cta', service: guide.path }, e); }}
            >
              Talk to KARGAR
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
