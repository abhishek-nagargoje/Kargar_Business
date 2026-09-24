import { memo } from 'react';
import { Link } from 'react-router';
import { Container } from '@/components/ui/Container';
import { buttonVariants } from '@/components/ui/Button';
import { contactDetails } from '@/config/contact';
import type { ServiceBlockProps } from '../registry/BlockRenderer';
import { useContactNavigation } from '../hooks/useContactNavigation';
import { ServiceContactStrip } from './ServiceContactStrip';

export const CTASection = memo(function CTASection({ entity }: ServiceBlockProps) {
  const { navigateToContact, buildContactUrl } = useContactNavigation();

  const isService = 'categoryId' in entity;
  const categoryId = isService ? (entity as { categoryId: string }).categoryId : undefined;
  const contactOptions = {
    source: 'cta_section',
    service: entity.slug,
    category: categoryId,
    ctaPosition: 'bottom',
  };

  return (
    <section className="py-24 bg-navy-900 relative overflow-hidden">
      {/* Abstract Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <Container size="md" className="relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Need {entity.title} for your facility?
        </h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
          Talk to the KARGAR team about your requirements. Our experts are ready to design a tailored solution for your specific needs.
        </p>
        <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <Link
            className={buttonVariants({ variant: 'primary', size: 'lg', className: 'shadow-lg hover:shadow-orange-500/20 px-8' })}
            to={buildContactUrl(contactOptions)}
            onClick={(e) => { navigateToContact(contactOptions, e); }}
          >
            Request a Proposal
          </Link>
          <Link
            className={buttonVariants({ variant: 'outline', size: 'lg', className: 'px-8 text-white border-white/40 hover:bg-white/10 hover:text-white' })}
            to={contactDetails.contactPagePath}
          >
            Contact Us
          </Link>
        </div>
        <ServiceContactStrip />
      </Container>
    </section>
  );
});
