import { Fragment } from 'react';
import { Link } from 'react-router';
import { CheckCircle } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ContentSection, InlineText } from '../domain/types';
import { parseInline } from '../utils/inlineText';

const LINK_CLASS = 'text-orange-600 font-semibold underline underline-offset-2 hover:text-orange-700 focus-ring rounded-sm';

/** Renders InlineText, turning `[anchor](/path)` into crawlable <Link> elements. */
export function Inline({ text, linkClassName = LINK_CLASS }: { text: InlineText; linkClassName?: string }) {
  return (
    <>
      {parseInline(text).map((part, i) =>
        part.type === 'link' ? (
          <Link key={i} to={part.href} className={linkClassName}>
            {part.label}
          </Link>
        ) : (
          <Fragment key={i}>{part.value}</Fragment>
        ),
      )}
    </>
  );
}

const GRID_COLUMNS: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

function captionId(caption: string): string {
  return `table-${caption.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function SectionIntro({ text }: { text?: InlineText }) {
  if (!text) return null;
  return (
    <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto text-center -mt-6 mb-10">
      <Inline text={text} />
    </p>
  );
}

function SectionBody({ section }: { section: ContentSection }) {
  switch (section.kind) {
    case 'prose':
      return (
        <Container size="md">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-navy-900 mb-6">{section.heading}</h2>
          {section.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-slate-600 text-lg leading-relaxed mb-5 last:mb-0">
              <Inline text={paragraph} />
            </p>
          ))}
        </Container>
      );

    case 'cards':
      return (
        <Container size="lg">
          <SectionHeading title={section.heading} align="center" className="mb-10" />
          <SectionIntro text={section.intro} />
          <div className={`grid grid-cols-1 ${GRID_COLUMNS[section.columns ?? 2]} gap-6`}>
            {section.items.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">
                  <Inline text={item.description} />
                </p>
              </div>
            ))}
          </div>
        </Container>
      );

    case 'steps':
      return (
        <Container size="lg">
          <SectionHeading title={section.heading} align="center" className="mb-10" />
          <SectionIntro text={section.intro} />
          <ol role="list" className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0 m-0">
            {section.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 bg-white rounded-2xl border border-slate-200 p-6">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white font-bold"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-navy-900 mb-1">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="text-slate-600">
                    <Inline text={step.description} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      );

    case 'table':
      return (
        <Container size="lg">
          <SectionHeading title={section.heading} align="center" className="mb-10" />
          <SectionIntro text={section.intro} />
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white focus-ring" tabIndex={0} role="region" aria-labelledby={captionId(section.caption)}>
            <table className="w-full min-w-[560px] text-left text-sm md:text-base">
              <caption id={captionId(section.caption)} className="sr-only">{section.caption}</caption>
              <thead className="bg-navy-900 text-white">
                <tr>
                  {section.columns.map((column) => (
                    <th key={column} scope="col" className="px-4 py-3 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {section.rows.map((row) => (
                  <tr key={row[0]} className="align-top">
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-4 py-3 font-semibold text-navy-900">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className="px-4 py-3 text-slate-600">
                          <Inline text={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.columns.length > 2 && (
            <p className="text-xs text-slate-500 mt-2 sm:hidden" aria-hidden="true">
              Swipe the table sideways to see every column.
            </p>
          )}
          {section.note && (
            <p className="text-sm text-slate-500 mt-4">
              <Inline text={section.note} />
            </p>
          )}
        </Container>
      );

    case 'checklist':
      return (
        <Container size="lg">
          <SectionHeading title={section.heading} align="center" className="mb-10" />
          <SectionIntro text={section.intro} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.groups.map((group) => (
              <div key={group.title} className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-navy-900 mb-4">{group.title}</h3>
                <ul role="list" className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-slate-600">
                      <CheckCircle className="h-5 w-5 shrink-0 text-orange-600 mt-0.5" aria-hidden="true" />
                      <span>
                        <Inline text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      );

    case 'compare':
      return (
        <Container size="lg">
          <SectionHeading title={section.heading} align="center" className="mb-10" />
          <SectionIntro text={section.intro} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[section.left, section.right].map((side, sideIndex) => (
              <div
                key={side.title}
                className={sideIndex === 0 ? 'rounded-2xl border border-slate-200 bg-white p-6' : 'rounded-2xl bg-navy-900 p-6 text-white'}
              >
                <h3 className={`text-xl font-bold mb-4 ${sideIndex === 0 ? 'text-navy-900' : 'text-white'}`}>{side.title}</h3>
                <ul className="space-y-3 list-disc pl-5">
                  {side.items.map((item) => (
                    <li key={item} className={sideIndex === 0 ? 'text-slate-600' : 'text-gray-200'}>
                      {sideIndex === 0 ? <Inline text={item} /> : item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      );

    case 'callout':
      return (
        <Container size="md">
          <div className="rounded-2xl border-l-4 border-orange-600 bg-orange-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-3">{section.heading}</h2>
            <p className="text-slate-700 text-lg leading-relaxed">
              {/* navy links: orange-600 on orange-100 is below 4.5:1 */}
              <Inline text={section.text} linkClassName="text-navy-900 font-semibold underline underline-offset-2 hover:text-orange-700 focus-ring rounded-sm" />
            </p>
          </div>
        </Container>
      );
  }
}

/** Renders a page's body sections in order, alternating backgrounds (`startAlt` = first section tinted). */
export function ContentSections({ sections, startAlt = false }: { sections: ContentSection[]; startAlt?: boolean }) {
  return (
    <>
      {sections.map((section, i) => {
        const alt = (i % 2 === 0) === startAlt;
        return (
          <section key={section.heading} className={`py-14 lg:py-20 ${alt ? 'bg-slate-50' : 'bg-white'}`}>
            <SectionBody section={section} />
          </section>
        );
      })}
    </>
  );
}

/**
 * FAQ list built on native <details>/<summary>: every answer is present in the server-rendered
 * HTML (crawlable, matches the FAQPage JSON-LD) while still collapsing visually, and keyboard/
 * screen-reader behaviour comes from the browser rather than custom ARIA.
 */
export function FaqList({ faqs, heading = 'Frequently Asked Questions' }: { faqs: { question: string; answer: InlineText }[]; heading?: string }) {
  return (
    <Container size="md">
      <SectionHeading title={heading} align="center" className="mb-12" />
      <div className="max-w-3xl mx-auto divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200 px-6">
        {faqs.map((faq, i) => (
          <details key={faq.question} className="group py-1" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-navy-900 focus-ring rounded-sm [&::-webkit-details-marker]:hidden">
              <span className="text-base md:text-lg">{faq.question}</span>
              <span className="text-orange-600 text-2xl leading-none transition-transform motion-reduce:transition-none group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="text-slate-600 pb-5">
              <Inline text={faq.answer} />
            </p>
          </details>
        ))}
      </div>
    </Container>
  );
}

