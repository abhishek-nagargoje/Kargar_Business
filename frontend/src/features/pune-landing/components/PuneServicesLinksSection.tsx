import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { punePageList } from '../config/punePages';

/**
 * Strategic homepage/services-hub link block into the Pune local-commercial landing pages.
 * Renders one card per page in `config/punePages.ts` — adding a new Pune page here is
 * automatic, no separate link list to maintain.
 */
export function PuneServicesLinksSection() {
  return (
    <section className="py-16 lg:py-20 bg-slate-50">
      <Container size="xl">
        <SectionHeading
          eyebrow="Local Coverage"
          title="Facility Management Services Across Pune"
          align="center"
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {punePageList.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="group flex items-center justify-between bg-white rounded-xl border border-slate-200 px-5 py-4 hover:border-orange-300 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <span className="font-semibold text-navy-900">{page.h1}</span>
              <ArrowRight className="h-4 w-4 text-orange-500 shrink-0 ml-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
