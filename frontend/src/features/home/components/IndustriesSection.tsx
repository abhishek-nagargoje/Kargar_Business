import { Link } from 'react-router';
import { Container } from '@/components/ui/Container';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/animations';
import { sectorProfiles } from '@/features/sectors/config/sectors';

/**
 * Homepage sector grid. Sectors come from the shared, source-verified list in
 * features/sectors/config/sectors.ts (Company Brochure p.2) — the same list /sectors expands on.
 */
const sectors = sectorProfiles.map((sector) => ({
  name: sector.name,
  icon: sector.icon,
  description: sector.cardSummary,
  image: sector.image,
  href: sector.href,
}));

export function IndustriesSection() {
  const containerRef = useScrollReveal();

  return (
    <section id="sectors" ref={containerRef} className="py-24 bg-[#FFFFFF] relative overflow-hidden">
      <Container className="relative z-10">
        <div className="text-center mb-16" data-gsap-reveal="fade-up">
          <h2 className="text-[#06183a] text-4xl md:text-5xl font-[800] tracking-tight">
            Diverse sectors. Tailored solutions.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <Link
                to={sector.href}
                key={sector.name}
                data-gsap-reveal="zoom-in"
                data-gsap-delay={index * 0.1}
                className="group relative flex flex-col justify-end h-[320px] rounded-[16px] overflow-hidden bg-[#06183a] transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
              >
                {/*
                  Whole photo, never cropped: object-contain letterboxes against the card's own
                  navy background instead of cutting off the edges of the sector photo to fill
                  the fixed-height card.
                */}
                <img
                  src={sector.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06183a] via-[#06183a]/80 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                  <div className="flex flex-col flex-1 justify-end">
                    {/* Icon Box */}
                    <div className="bg-white w-12 h-12 rounded-[8px] flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                      <Icon className="w-6 h-6 text-[#ff5a0a]" strokeWidth={2.5} />
                    </div>
                    
                    {/* Title & Description */}
                    <h3 className="font-[700] text-xl text-white mb-2 tracking-tight">
                      {sector.name}
                    </h3>
                    <p className="text-sm text-gray-300 font-[500] leading-relaxed mb-6 line-clamp-3">
                      {sector.description}
                    </p>
                  </div>

                  {/* Bottom Action Row (Arrow only, active clients removed) */}
                  <div className="flex items-center justify-end mt-auto pt-4 border-t border-white/10" aria-hidden="true">
                    <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
