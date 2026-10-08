import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { clusterPages, clusters } from '../config/punePages';

/**
 * Hub link block into the Pune topic clusters: one column per cluster, pillar page first with
 * its summary, then every supporting page. Generated from `config/punePages.ts`, so a new page
 * is linked from the homepage and /services automatically — no separate link list to maintain.
 */
export function PuneServicesLinksSection({ heading = 'Facility Services Across Pune' }: { heading?: string }) {
  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <Container size="xl">
        <SectionHeading
          eyebrow="Local Coverage"
          title={heading}
          subtitle="Detailed pages for each service and property type we support in Pune and PCMC."
          align="center"
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {clusters.map((cluster) => {
            const [pillar, ...children] = clusterPages(cluster.id);
            if (!pillar) return null;
            return (
              <div key={cluster.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-orange-600 mb-3">{cluster.label}</h3>
                <Link
                  to={pillar.path}
                  className="group mb-2 flex items-start justify-between gap-3 text-lg font-bold text-navy-900 hover:text-orange-600 focus-ring rounded-sm"
                >
                  {pillar.h1}
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-orange-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <p className="text-sm text-slate-600 mb-4">{pillar.summary}</p>
                <ul role="list" className="space-y-2 border-t border-slate-100 pt-4">
                  {children.map((page) => (
                    <li key={page.path}>
                      <Link to={page.path} className="text-sm text-navy-800 underline-offset-2 hover:text-orange-600 hover:underline focus-ring rounded-sm">
                        {page.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="text-center mt-10">
          <Link to="/resources" className="font-semibold text-orange-600 underline underline-offset-2 hover:text-orange-700 focus-ring rounded-sm">
            Read our facility management guides
          </Link>
        </p>
      </Container>
    </section>
  );
}
