import { recognitions, RECOGNITION_SECTION_ID } from './recognitions';

/**
 * Compact, secondary credibility line for the homepage hero. Sits below the primary CTAs and
 * links to the evidence in the Recognition section rather than competing with the CTAs.
 */
export function HeroRecognitionNote() {
  return (
    <a className="kb-hero-recognition" href={`#${RECOGNITION_SECTION_ID}`}>
      <span className="sr-only">Recognition: </span>
      {recognitions.map(({ id, shortLabel }, index) => (
        <span key={id} className="kb-hero-recognition__item">
          {index > 0 && <span className="sr-only">; </span>}
          {shortLabel}
        </span>
      ))}
    </a>
  );
}
