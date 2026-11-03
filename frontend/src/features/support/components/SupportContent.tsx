import { Link } from 'react-router';
import type { ReactNode } from 'react';
import { ArrowRight, Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FaqList, Inline } from '@/features/pune-landing/components/ContentSections';
import { supportFaqs } from '../config/supportFaqs';
import { contactDetails, telHref } from '@/config/contact';
import { useBusinessPhone } from '@/hooks/useBusinessPhone';
import type { InlineText } from '@/features/pune-landing/domain/types';

const LINK_CLASS = 'text-orange-600 font-semibold underline underline-offset-2 hover:text-orange-700 focus-ring rounded-sm';

/** HR desk address as printed on the Company Brochure (p.4). */
const HR_EMAIL = 'hrdesk@kargar.co.in';

/** Which route suits which request. Escalation and reporting follow the scope in services config. */
const requestRoutes: { need: string; route: InlineText }[] = [
  {
    need: 'A new proposal or quotation',
    route: 'Use the [contact form](/contact-us) or call us during office hours. Share the details listed below so we can plan a site visit.',
  },
  {
    need: 'A day-to-day request at a site we already serve',
    route: 'Raise it with your site supervisor or your KARGAR point of contact, or through the helpdesk where helpdesk and ticket management is part of your scope.',
  },
  {
    need: 'A technical breakdown between scheduled maintenance',
    route: 'Report it through the escalation process agreed in your contract. KARGAR coordinates the repair, bringing in OEMs or specialist vendors where their involvement is required.',
  },
  {
    need: 'A concern that has not been resolved',
    route: 'Escalate above the site supervisor to your KARGAR point of contact. Performance is reviewed by KARGAR regional management and reported to you.',
  },
  {
    need: 'Jobs and careers',
    route: `Email our HR desk at ${HR_EMAIL}. The business enquiry line is for clients and prospective clients.`,
  },
];

const enquiryChecklist = [
  'Property type: housing society, office, commercial complex, institute, healthcare facility or plant',
  'Location in Pune or PCMC, and approximate built-up area',
  'Services you need: housekeeping, security, technical maintenance, or a combination',
  'Working hours or shifts the site needs covered',
  'How services are run today, and what is not working',
];

const coordinationSteps = [
  { title: 'Raise', text: 'Requests come in through the site supervisor, your point of contact or the site helpdesk.' },
  { title: 'Assign', text: 'The request is logged and passed to the right team member on site.' },
  { title: 'Resolve or escalate', text: 'Routine work is closed on site; technical faults follow the agreed escalation process.' },
  { title: 'Report', text: 'Completed work, open issues and breakdowns appear in daily, weekly and monthly reports.' },
  { title: 'Review', text: 'KARGAR regional management reviews performance with you and agrees improvements.' },
];

/** Support Services as listed in the Company Brochure (p.2). */
const supportServices = [
  { title: 'Helpdesk & ticket management', text: 'A single place for occupants and the admin team to log requests and track them to closure.' },
  { title: 'Daily, weekly & monthly reporting', text: 'Regular reports on attendance, completed tasks, open issues and maintenance.' },
  { title: 'Statutory documentation & registers', text: 'Site registers and statutory records maintained as part of the service.' },
  { title: 'Mailroom operations', text: 'Receiving, sorting and distributing mail and couriers for workplaces.' },
  { title: 'Tools, tackles & consumables', text: 'Stock of equipment and consumables managed so work is not held up.' },
];

function ChannelCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50" aria-hidden="true">
        <Icon className="h-6 w-6 text-orange-600" />
      </span>
      <h3 className="text-lg font-bold text-navy-900 mb-2">{title}</h3>
      <div className="text-slate-600 space-y-1">{children}</div>
    </div>
  );
}

/**
 * Body of /support: the customer-support landing page. Only verified facts are stated — no
 * response-time or 24x7 commitments, which are not in KARGAR's source documents.
 */
export function SupportContent() {
  const phone = useBusinessPhone();
  const altPhone = contactDetails.alternatePhone;

  return (
    <>
      <section className="py-14 lg:py-20 bg-white" aria-labelledby="support-channels-heading">
        <Container size="lg">
          <h2 id="support-channels-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-navy-900 mb-4 text-center">
            How to Reach KARGAR Support
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10">
            Whether you run a site we already manage or are planning a new contract in Pune, these are the ways to reach
            our team.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ChannelCard icon={Phone} title="Call us">
              <p><a href={phone.href} className={LINK_CLASS}>{phone.display}</a></p>
              <p>Alternate: <a href={telHref(altPhone)} className={LINK_CLASS}>{altPhone.display}</a></p>
            </ChannelCard>
            <ChannelCard icon={Mail} title="Email us">
              <p><a href={`mailto:${contactDetails.email}`} className={LINK_CLASS}>{contactDetails.email}</a></p>
              <p className="text-sm">For proposals and client queries</p>
            </ChannelCard>
            <ChannelCard icon={Clock} title="Office hours">
              <p>{contactDetails.hours}</p>
              <p className="text-sm">Closed on Sundays</p>
            </ChannelCard>
            <ChannelCard icon={MapPin} title="Visit our office">
              <p>301, 3rd Floor, Unity Commercial, Baner, Pune, Maharashtra 411045</p>
            </ChannelCard>
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-20 bg-slate-50" aria-labelledby="support-routes-heading">
        <Container size="lg">
          <h2 id="support-routes-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-navy-900 mb-4 text-center">
            Which Route Is Right for Your Request
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10">
            Sending a request to the right place first is the quickest way to get it resolved.
          </p>
          <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {requestRoutes.map((item) => (
              <div key={item.need} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <dt className="font-bold text-navy-900 mb-2">{item.need}</dt>
                <dd className="text-slate-600 leading-relaxed">
                  <Inline text={item.route} />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-14 lg:py-20 bg-white" aria-labelledby="support-enquiry-heading">
        <Container size="md">
          <h2 id="support-enquiry-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-navy-900 mb-6">
            What to Share When You Enquire
          </h2>
          <p className="text-slate-700 text-lg leading-relaxed mb-5">
            We prepare proposals after seeing the site, not from a rate card. Including these details in your first
            message helps us plan the visit and come back with a relevant scope:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700 text-lg mb-6">
            {enquiryChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-slate-700 text-lg leading-relaxed">
            Not sure what you need yet? Our guide on{' '}
            <Link to="/resources/how-to-choose-a-housekeeping-company-pune" className={LINK_CLASS}>how to choose a housekeeping company in Pune</Link>{' '}
            lists the questions worth asking any provider, and the{' '}
            <Link to="/resources" className={LINK_CLASS}>resources hub</Link> has checklists and staffing guides.
          </p>
        </Container>
      </section>

      <section className="py-14 lg:py-20 bg-slate-50" aria-labelledby="support-coordination-heading">
        <Container size="lg">
          <h2 id="support-coordination-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-navy-900 mb-4 text-center">
            How Service Requests Are Coordinated at Your Site
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10">
            For clients, support continues after deployment. Housekeeping, security and maintenance requests follow the
            same path, under one point of contact.
          </p>
          <ol role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {coordinationSteps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-lg font-bold text-white" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="font-bold text-navy-900 mb-1">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-14 lg:py-20 bg-white" aria-labelledby="support-services-heading">
        <Container size="lg">
          <h2 id="support-services-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-navy-900 mb-4 text-center">
            Support Services We Can Run at Your Site
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10">
            Alongside{' '}
            <Link to="/services/soft-services" className={LINK_CLASS}>soft services</Link> and{' '}
            <Link to="/services/hard-services" className={LINK_CLASS}>hard services</Link>, these support services can be
            added to your contract.
          </p>
          <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportServices.map((service) => (
              <li key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-navy-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14 lg:py-20 bg-slate-50">
        <FaqList faqs={supportFaqs} heading="Support: Frequently Asked Questions" />
      </section>

      <section className="py-12 bg-white" aria-labelledby="support-related-heading">
        <Container size="lg">
          <h2 id="support-related-heading" className="text-2xl md:text-3xl font-bold text-navy-900 mb-6 text-center">
            Related Pages
          </h2>
          <ul role="list" className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Contact Us', href: '/contact-us' },
              { label: 'Facility Management Services', href: '/services' },
              { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
              { label: 'Sectors We Serve', href: '/sectors' },
              { label: 'Company Profile', href: '/company-profile' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-navy-50 px-5 py-2 font-semibold text-navy-900 hover:border-orange-300 hover:text-orange-700 focus-ring"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
