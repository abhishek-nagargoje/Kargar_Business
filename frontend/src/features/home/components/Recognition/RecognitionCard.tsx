import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Recognition } from './recognitions';

/**
 * One recognition proof point. Cards with an image render the photograph as evidence (uncropped,
 * linked to its full-resolution rendition so placard text can be read); cards without one are
 * typographic — no stand-in seals, certificates or illustrations are ever drawn.
 */
export function RecognitionCard({ recognition, index }: { recognition: Recognition; index: number }) {
  const { id, category, title, summary, details, tone, image } = recognition;
  const headingId = `${id}-title`;

  return (
    <article
      className={`kb-recognition-card kb-recognition-card--${tone}${image ? ' kb-recognition-card--media' : ''}`}
      aria-labelledby={headingId}
      data-recognition-reveal
      style={{ '--reveal-delay': `${120 + index * 120}ms` } as CSSProperties}
    >
      {image && (
        <figure className="kb-recognition-card__figure">
          <a
            className="kb-recognition-card__image-link"
            href={image.fullSizeHref}
            target="_blank"
            rel="noopener"
          >
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="(min-width: 1080px) 760px, (min-width: 760px) 46vw, calc(100vw - 28px)"
              width={image.width}
              height={image.height}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
            <span className="kb-recognition-card__zoom">
              View full size <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
          <figcaption>{image.caption}</figcaption>
        </figure>
      )}

      <div className="kb-recognition-card__body">
        <p className="kb-recognition-card__category">{category}</p>
        <h3 id={headingId}>{title}</h3>
        <p className="kb-recognition-card__summary">{summary}</p>
        <dl className="kb-recognition-card__details">
          {details.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
