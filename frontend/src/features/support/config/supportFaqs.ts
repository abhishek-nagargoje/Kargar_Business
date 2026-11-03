import { contactDetails } from '@/config/contact';
import type { InlineText } from '@/features/pune-landing/domain/types';

/** /support FAQs — rendered on the page and emitted as FAQPage JSON-LD. Verified facts only. */
export const supportFaqs: { question: string; answer: InlineText }[] = [
  {
    question: 'What are your office hours?',
    answer: `Our Baner office is open ${contactDetails.hours.replace('Mon - Sat:', 'Monday to Saturday,')}.`,
  },
  {
    question: 'Is site coverage limited to office hours?',
    answer: 'No. Office hours apply to enquiries. The shifts covered at your site, including nights or weekends where needed, are agreed in your contract after the site assessment.',
  },
  {
    question: 'Which areas do you serve?',
    answer: 'We serve housing societies, offices, commercial complexes, institutes, healthcare facilities and plants across Pune and Pimpri-Chinchwad (PCMC). See the [sectors we serve](/sectors).',
  },
  {
    question: 'Can we ask what the staff at our site are paid?',
    answer: 'Yes. KARGAR commits to 100% financial transparency: you have the right to ask what compensation is paid to the staff deployed at your site.',
  },
  {
    question: 'How do I find out what a service will cost?',
    answer: 'Costs depend on scope, staffing and shifts, so we quote after a site visit. Our guide to [housekeeping cost in Pune](/resources/housekeeping-cost-pune) explains what drives the price.',
  },
];
