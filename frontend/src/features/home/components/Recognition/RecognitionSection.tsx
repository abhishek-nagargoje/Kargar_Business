import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { RecognitionCard } from './RecognitionCard';
import { credibilityMarkers, recognitions, RECOGNITION_SECTION_ID } from './recognitions';
import './recognition.css';

/**
 * Homepage credibility bridge: national recognition and state government support presented as
 * evidence (fact → context → significance), then a hand-off back into the operating business.
 * Placed directly after the hero so the differentiator is seen before the service catalogue.
 */
export function RecognitionSection() {
  // Reveal is purely presentational and never gates visibility (see recognition.css). Threshold 0
  // so it fires on any viewport height or zoom level; without IntersectionObserver it counts as seen.
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0, fallbackInView: true });

  return (
    <section
      ref={ref}
      id={RECOGNITION_SECTION_ID}
      className="kb-recognition"
      aria-labelledby="recognition-heading"
      data-revealed={inView ? 'true' : 'false'}
    >
      <div className="kb-container">
        <header className="kb-recognition__head" data-recognition-reveal>
          <div>
            <p className="kb-eyebrow kb-eyebrow--line">Recognition &amp; Impact</p>
            <h2 id="recognition-heading">Recognized for breaking barriers.</h2>
          </div>
          <div className="kb-recognition__intro">
            <p>
              KARGAR’s journey has been recognized at the national level and supported at the state level —
              a reflection of what it takes to build a 100% women-led company in a traditionally male-dominated
              industry.
            </p>
            <ul className="kb-recognition__markers" aria-label="Recognition summary">
              {credibilityMarkers.map((marker) => (
                <li key={marker}>{marker}</li>
              ))}
            </ul>
          </div>
        </header>

        <div className="kb-recognition__grid">
          {recognitions.map((recognition, index) => (
            <RecognitionCard key={recognition.id} recognition={recognition} index={index} />
          ))}
        </div>

        <div className="kb-recognition__bridge" data-recognition-reveal>
          <p>
            <strong>Recognition is one part of the story.</strong> The real story is what we are building —
            housekeeping, security, maintenance and workforce solutions run by trained teams on every site we manage.
          </p>
          <a className="kb-recognition__bridge-link" href="#services">
            Explore our services
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
