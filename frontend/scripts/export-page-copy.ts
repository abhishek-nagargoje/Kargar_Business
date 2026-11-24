/**
 * Exports the published copy of selected Pune landing pages to Markdown, straight from the page
 * configs, so business reviewers read exactly what ships.
 *
 *   npx tsx --tsconfig scripts/tsconfig.seo.json scripts/export-page-copy.ts <out.md> [path ...]
 */
import { writeFileSync } from 'node:fs';
import { punePagesByPath } from '../src/features/pune-landing/config/punePages';
import { stripInline } from '../src/features/pune-landing/utils/inlineText';
import { enquiryServicesById } from '../src/features/enquiry/enquiryServices';
import type { ContentSection, PuneLandingPageContent } from '../src/features/pune-landing/domain/types';

const SUFFIX = ' | KARGAR Facility Management';
const md = (t: string) => t.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '[$1](https://www.kargarbusinessservices.com$2)');

function section(s: ContentSection): string[] {
  const out = [`### ${s.heading}`, ''];
  if ('intro' in s && s.intro) out.push(md(s.intro), '');
  switch (s.kind) {
    case 'prose': s.paragraphs.forEach((p) => out.push(md(p), '')); break;
    case 'cards': s.items.forEach((i) => out.push(`- **${i.title}:** ${md(i.description)}`)); out.push(''); break;
    case 'steps': s.steps.forEach((i, n) => out.push(`${n + 1}. **${i.title}:** ${md(i.description)}`)); out.push(''); break;
    case 'table':
      out.push(`| ${s.columns.join(' | ')} |`, `|${s.columns.map(() => '---').join('|')}|`);
      s.rows.forEach((r) => out.push(`| ${r.map(md).join(' | ')} |`));
      out.push('');
      if (s.note) out.push(`_${md(s.note)}_`, '');
      break;
    case 'checklist': s.groups.forEach((g) => { out.push(`**${g.title}**`); g.items.forEach((i) => out.push(`- ${md(i)}`)); out.push(''); }); break;
    case 'compare':
      out.push(`**${s.left.title}**`); s.left.items.forEach((i) => out.push(`- ${md(i)}`));
      out.push('', `**${s.right.title}**`); s.right.items.forEach((i) => out.push(`- ${md(i)}`)); out.push('');
      break;
    case 'callout': out.push(md(s.text), ''); break;
  }
  return out;
}

function words(page: PuneLandingPageContent): number {
  const text = [page.intro.join(' '), ...(page.sections ?? []).map((s) => JSON.stringify(s)), page.faqs.map((f) => `${f.question} ${f.answer}`).join(' ')]
    .join(' ');
  return stripInline(text).replace(/["{}[\],:]|kind|heading|intro|items|title|description|columns|rows|caption|steps|groups|left|right|paragraphs|text|note/g, ' ').split(/\s+/).filter(Boolean).length;
}

function page(p: PuneLandingPageContent): string {
  const enquiry = enquiryServicesById[p.enquiryService];
  const out = [
    `## ${p.h1}`,
    '',
    `URL: https://www.kargarbusinessservices.com${p.path}`,
    '',
    '| Field | Value |', '|---|---|',
    `| Title tag | ${p.seo.title}${SUFFIX} |`,
    `| Meta description (${p.seo.description.length} chars) | ${p.seo.description} |`,
    `| H1 | ${p.h1} |`,
    `| Primary CTA | ${p.ctaLabel ?? 'Request a Quote'} |`,
    `| Enquiry routing | ${enquiry.label} → ${enquiry.team} team |`,
    `| Approx. unique body words (intro, sections, FAQs) | ${words(p)} |`,
    `| Owner / last reviewed | ${p.review.owner} / ${p.review.lastReviewed} |`,
    `| Facts awaiting confirmation (kept off the page) | ${(p.review.pendingFacts ?? ['None']).join('; ')} |`,
    '',
    `**Hero:** ${p.heroSubtitle}`,
    '',
    '### Opening',
    '',
    ...p.intro.map((i) => `${md(i)}\n`),
    ...(p.sections ?? []).flatMap(section),
    '### Frequently asked questions',
    '',
    ...p.faqs.flatMap((f) => [`**${f.question}**`, md(f.answer), '']),
    `### Closing call to action`,
    '',
    `**${p.ctaHeading}** ${p.ctaText} Button: "${p.ctaLabel ?? 'Request a Quote'}"`,
    '',
    '---',
    '',
  ];
  return out.join('\n');
}

const [outFile, ...paths] = process.argv.slice(2);
if (!outFile) throw new Error('usage: export-page-copy.ts <out.md> [paths...]');
const selected = (paths.length ? paths : Object.keys(punePagesByPath)).map((path) => {
  const p = punePagesByPath[path];
  if (!p) throw new Error(`unknown page ${path}`);
  return p;
});
writeFileSync(outFile, `# Final page copy (exported from the page configs)\n\nGenerated ${new Date().toISOString().slice(0, 10)}. This is the copy that ships; edit the config, not this file.\n\n${selected.map(page).join('\n')}`);
console.log(`wrote ${selected.length} pages to ${outFile}`);
