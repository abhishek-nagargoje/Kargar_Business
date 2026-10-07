/**
 * Recognition & institutional support — the single source of truth for every claim shown in the
 * homepage hero note and the Recognition section.
 *
 * ACCURACY RULE: every string here must trace back to a verified source. Do not add award names,
 * dates, amounts, departments or rankings that are not documented.
 *   - National recognition: award name, date, place and presenter are taken from KARGAR's own
 *     Company Profile (public/assets/documents/Company Profile.pdf, p.17 "A recognition we're
 *     proud of"); the reason for the recognition is as stated by KARGAR's leadership.
 *   - Government support: as stated by KARGAR's leadership. No grant amount, scheme or
 *     department is documented, so none is shown.
 */

export interface RecognitionDetail {
  label: string;
  value: string;
}

export interface RecognitionImage {
  src: string;
  srcSet: string;
  /** Intrinsic size of the largest rendition; reserves space to avoid layout shift. */
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Full-resolution rendition so readable placards can be inspected. */
  fullSizeHref: string;
}

export interface Recognition {
  id: string;
  category: string;
  /** Short form used in the hero credibility note. */
  shortLabel: string;
  title: string;
  summary: string;
  details: RecognitionDetail[];
  tone: 'light' | 'navy';
  image?: RecognitionImage;
}

export const recognitions: Recognition[] = [
  {
    id: 'national-recognition',
    category: 'National Recognition',
    shortLabel: 'Awarded by the Hon’ble Prime Minister of India',
    title: 'Recognized by the Hon’ble Prime Minister of India',
    summary:
      'KARGAR was recognized for becoming the first 100% women-led company to make a mark in a traditionally male-dominated industry.',
    details: [
      { label: 'Award', value: 'Punyashlok Ahilya Devi Holkar Woman Startup Award' },
      { label: 'Presented by', value: 'Hon’ble Prime Minister Shri Narendra Modi ji' },
      { label: 'Date & place', value: '20 September 2024, Wardha, Maharashtra' },
    ],
    tone: 'light',
    image: {
      src: '/images/recognition/pm-award-2024-1128w.webp',
      srcSet:
        '/images/recognition/pm-award-2024-720w.webp 720w, /images/recognition/pm-award-2024-1128w.webp 1128w',
      width: 1128,
      height: 843,
      alt: 'Award ceremony in Wardha, Maharashtra, on 20 September 2024: the stage banner for the Punyashlok Ahilyadevi Holkar Mahila Startup Yojana, award recipients holding the scheme winners’ placard, and a group photograph of the winners.',
      caption: 'Award ceremony, Wardha, Maharashtra — 20 September 2024',
      fullSizeHref: '/images/recognition/pm-award-2024-1128w.webp',
    },
  },
  {
    id: 'government-support',
    category: 'Government Support',
    shortLabel: 'Grant recipient, Government of Maharashtra',
    title: 'Supported by the Government of Maharashtra',
    summary:
      'KARGAR received a grant from the Government of Maharashtra during the tenure of then Chief Minister Shri Eknath Shinde ji.',
    details: [
      { label: 'Support', value: 'Grant' },
      { label: 'Awarded by', value: 'Government of Maharashtra' },
      { label: 'Period', value: 'Tenure of then Chief Minister Shri Eknath Shinde ji' },
    ],
    tone: 'navy',
  },
];

/** Factual one-line credibility markers. Keep these strictly descriptive — no rankings or "verified" badges. */
export const credibilityMarkers = ['National Recognition', 'Women-Led Enterprise', 'Government Grant Supported'];

export const RECOGNITION_SECTION_ID = 'recognition';
