/**
 * Pure helpers for `InlineText` (`[anchor](/path)` link syntax). No React or Vite imports, so the
 * Node-side SEO pipeline (scripts/seo) can reuse the exact same parsing rules as the UI.
 */
export const INLINE_LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export type InlinePart = { type: 'text'; value: string } | { type: 'link'; label: string; href: string };

export function parseInline(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(INLINE_LINK_RE)) {
    const index = match.index;
    if (index > lastIndex) parts.push({ type: 'text', value: text.slice(lastIndex, index) });
    parts.push({ type: 'link', label: match[1] ?? '', href: match[2] ?? '/' });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ type: 'text', value: text.slice(lastIndex) });
  return parts;
}

/** Plain-text form for JSON-LD and meta usage. */
export function stripInline(text: string): string {
  return text.replace(INLINE_LINK_RE, '$1');
}

/** Every internal href referenced by a piece of InlineText. */
export function inlineHrefs(text: string): string[] {
  return [...text.matchAll(INLINE_LINK_RE)].map((m) => m[2] ?? '');
}
