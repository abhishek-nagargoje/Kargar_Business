import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/pages/KargarSinglePage';
import { SEO } from '@/components/seo/SEO';
import { Container } from '@/components/ui/Container';
import { Breadcrumb, type BreadcrumbItem } from '@/features/services/components/Breadcrumb';
import { PuneServicesLinksSection } from '@/features/pune-landing/components/PuneServicesLinksSection';
import { getSeoEntry } from '@/features/seo/registry';
import { buildCanonicalUrl } from '@/lib/seo/canonical';
import { buildFAQSchema } from '@/lib/seo/schema';
import { FaqList } from '@/features/pune-landing/components/ContentSections';
import { stripInline } from '@/features/pune-landing/utils/inlineText';
import type { InlineText } from '@/features/pune-landing/domain/types';
import { guidePageList } from '../config/guides';

const PATH = '/resources';

const LINK_CLASS = 'text-orange-600 font-semibold underline underline-offset-2 hover:text-orange-700 focus-ring rounded-sm';

/**
 * Guides grouped by the decision a reader is facing. Paths must exist in guidePageList; any
 * guide not listed in a topic falls into "More Guides" so a new guide can never go missing.
 */
const topics: { id: string; heading: string; intro: string; paths: string[] }[] = [
  {
    id: 'choosing',
    heading: 'Choosing and Budgeting for a Provider',
    intro: 'For committees and admin teams comparing housekeeping vendors or reviewing a quote: what to check before signing, and what actually drives the monthly cost.',
    paths: ['/resources/how-to-choose-a-housekeeping-company-pune', '/resources/housekeeping-cost-pune'],
  },
  {
    id: 'planning',
    heading: 'Planning Scope and Staffing',
    intro: 'For facility heads defining the work itself: which tasks happen daily, weekly and monthly, and how to estimate the team needed to cover them.',
    paths: ['/resources/office-housekeeping-checklist', '/resources/how-many-housekeeping-staff'],
  },
];

const hubFaqs: { question: string; answer: InlineText }[] = [
  {
    question: 'What is the difference between soft services and hard services?',
    answer: 'Soft services are the people-driven work that keeps a property clean, safe and usable, such as housekeeping and security. Hard services cover the technical systems: electrical, HVAC, DG and UPS, plumbing, STP and fire systems. See [soft services](/services/soft-services) and [hard services](/services/hard-services).',
  },
  {
    question: 'Where should I start if I am outsourcing housekeeping for the first time?',
    answer: 'Write down what the property needs first, using the [office housekeeping checklist](/resources/office-housekeeping-checklist), then estimate headcount with the [staffing guide](/resources/how-many-housekeeping-staff) before you request quotes.',
  },
  {
    question: 'Why do housekeeping quotes for the same property differ so much?',
    answer: 'Quotes usually differ in scope, supervision, materials and statutory compliance rather than in the cleaning itself. The [housekeeping cost guide](/resources/housekeeping-cost-pune) explains how to compare them on the same basis.',
  },
  {
    question: 'Do these guides apply to housing societies as well as offices?',
    answer: 'Yes. The selection, cost and staffing guides apply to both; the checklist is written for offices but the method carries over. For society-specific services, see [facility management for housing societies](/facility-management-for-societies-pune).',
  },
];

/** /resources — the single content hub for guides (no separate /blog or /insights structure). */
export function ResourcesHubPage() {
  const seo = getSeoEntry(PATH);
  const breadcrumbItems: BreadcrumbItem[] = [{ label: 'Resources', href: '#' }];
  const grouped = new Set(topics.flatMap((topic) => topic.paths));
  const ungrouped = guidePageList.filter((guide) => !grouped.has(guide.path));
  const sections = [
    ...topics.map((topic) => ({ ...topic, guides: guidePageList.filter((guide) => topic.paths.includes(guide.path)) })),
    ...(ungrouped.length > 0 ? [{ id: 'more', heading: 'More Guides', intro: '', paths: [], guides: ungrouped }] : []),
  ];
  const faqSchema = buildFAQSchema(hubFaqs.map((faq) => ({ question: faq.question, answer: stripInline(faq.answer) })));

  return (
    <div className="kargar-site kb-site">
      <SEO title={seo.title} description={seo.description} canonicalUrl={buildCanonicalUrl(PATH)} breadcrumbItems={breadcrumbItems} schema={[faqSchema]} />
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

        <section className="py-14 lg:py-20 bg-white" aria-labelledby="resources-intro-heading">
          <Container size="md">
            <h2 id="resources-intro-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-navy-900 mb-6">
              Plan Facility Services With Fewer Surprises
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-5">
              Most problems with outsourced housekeeping and facility services start before the contract is signed: a scope
              nobody wrote down, a headcount based on a guess, or a quote that leaves out supervision or statutory
              compliance. These guides cover those decisions in the order you usually face them.
            </p>
            <p className="text-slate-700 text-lg leading-relaxed">
              They are written for admin managers, facility heads and housing society committees in Pune and PCMC, and
              they are useful whichever provider you choose. When you are ready to talk about your own property, our{' '}
              <Link to="/housekeeping-services-pune" className={LINK_CLASS}>housekeeping services in Pune</Link> and{' '}
              <Link to="/facility-management-company-pune" className={LINK_CLASS}>facility management services</Link> pages
              explain how we scope and run sites.
            </p>
          </Container>
        </section>

        {sections.map((topic, index) => (
          <section
            key={topic.id}
            className={`py-14 lg:py-20 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
            aria-labelledby={`${topic.id}-heading`}
          >
            <Container size="lg">
              <h2 id={`${topic.id}-heading`} className="text-3xl md:text-4xl font-bold text-navy-900 mb-4 text-center">{topic.heading}</h2>
              {topic.intro && <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10">{topic.intro}</p>}
              <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topic.guides.map((guide) => (
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
        ))}

        <section className="py-14 lg:py-20 bg-white" aria-labelledby="company-docs-heading">
          <Container size="md" className="text-center">
            <h2 id="company-docs-heading" className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">Evaluating KARGAR as a Provider</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Our company profile document sets out who we serve, how we set up site teams, and the PURNA operating
              protocol. You can preview and download it on the{' '}
              <Link to="/company-profile" className={LINK_CLASS}>company profile page</Link>, and the{' '}
              <Link to="/sectors" className={LINK_CLASS}>sectors page</Link> explains how services differ by property type.
            </p>
          </Container>
        </section>

        <section className="py-14 lg:py-20 bg-slate-50">
          <FaqList faqs={hubFaqs} heading="Resources: Frequently Asked Questions" />
        </section>

        <PuneServicesLinksSection heading="Our Services in Pune" />
      </main>
      <Footer />
    </div>
  );
}
