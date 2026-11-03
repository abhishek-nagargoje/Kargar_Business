import { Link } from 'react-router';
import { ArrowRight, Brush, ShieldCheck, Wrench } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqList, Inline } from '@/features/pune-landing/components/ContentSections';
import { sectorComparison, sectorFaqs, sectorProfiles } from '../config/sectors';

const LINK_CLASS = 'text-orange-600 font-semibold underline underline-offset-2 hover:text-orange-700 focus-ring rounded-sm';

/** PURNA protocol stages, as defined in the Company Profile (p.10). */
const purnaStages = [
  { letter: 'P', title: 'Prepare', text: 'Scope, checklists and SOPs written for the site, reflecting the sector it belongs to.' },
  { letter: 'U', title: 'Unite', text: 'Manpower, machines and management brought under one org structure.' },
  { letter: 'R', title: 'Reset', text: 'Processes and teams reset so related functions work together as one service.' },
  { letter: 'N', title: 'Nurture', text: 'Employees and associated vendors trained and retained, so the team stays stable.' },
  { letter: 'A', title: 'Analyse', text: 'Performance reviewed through feedback systems and KARGAR regional management, then reported to you.' },
];

/**
 * Body of /sectors: an introduction, one profile per documented sector (challenges and how
 * housekeeping, security and technical maintenance apply), a comparison table, the delivery
 * approach and FAQs. Content lives in ../config/sectors.ts.
 */
export function SectorsContent() {
  return (
    <>
      <section className="py-14 lg:py-20 bg-white" aria-labelledby="sectors-intro-heading">
        <Container size="md">
          <h2 id="sectors-intro-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-navy-900 mb-6">
            Facility Management Shaped by How Your Property Is Used
          </h2>
          <p className="text-slate-700 text-lg leading-relaxed mb-5">
            The tasks in a facility contract look similar on paper: cleaning, security, electrical and HVAC upkeep. What
            differs is who you answer to, when the work can happen and which failures hurt most. A housing society
            reports to a committee; a plant works around production shifts; a clinic follows its own infection-control
            rules. KARGAR scopes each site with that in mind before deploying a team.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed mb-8">
            From our office in Baner, we serve six sectors across Pune and PCMC. Below, each one is described with its
            common challenges and how our{' '}
            <Link to="/housekeeping-services-pune" className={LINK_CLASS}>housekeeping services in Pune</Link>,{' '}
            <Link to="/security-services-pune" className={LINK_CLASS}>security services</Link> and{' '}
            <Link to="/building-maintenance-services-pune" className={LINK_CLASS}>building maintenance</Link> apply to it.
          </p>
          <nav aria-label="Sectors on this page">
            <ul role="list" className="flex flex-wrap gap-3">
              {sectorProfiles.map((sector) => (
                <li key={sector.id}>
                  <a
                    href={`#${sector.id}`}
                    className="inline-flex items-center rounded-full border border-navy-100 bg-navy-50 px-4 py-2 text-sm font-semibold text-navy-900 hover:border-orange-300 hover:text-orange-700 focus-ring"
                  >
                    {sector.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {sectorProfiles.map((sector, index) => {
        const Icon = sector.icon;
        const headingId = `${sector.id}-heading`;
        return (
          <section
            key={sector.id}
            id={sector.id}
            aria-labelledby={headingId}
            className={`scroll-mt-28 py-14 lg:py-20 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
          >
            <Container size="lg">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm border border-slate-200" aria-hidden="true">
                  <Icon className="h-6 w-6 text-orange-600" strokeWidth={2.5} />
                </span>
                <h2 id={headingId} className="text-3xl md:text-4xl font-bold tracking-tight text-navy-900">
                  {sector.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">{sector.overview}</p>
                  <h3 className="text-lg font-bold text-navy-900 mb-3">Common challenges</h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-6">
                    {sector.challenges.map((challenge) => (
                      <li key={challenge}>{challenge}</li>
                    ))}
                  </ul>
                  <h3 className="text-lg font-bold text-navy-900 mb-3">How KARGAR applies</h3>
                  <p className="text-slate-700 leading-relaxed">
                    <Inline text={sector.approach} />
                  </p>
                </div>
                <dl className="lg:col-span-2 space-y-4">
                  {[
                    { label: 'Housekeeping', icon: Brush, text: sector.housekeeping },
                    { label: 'Security', icon: ShieldCheck, text: sector.security },
                    { label: 'Technical maintenance', icon: Wrench, text: sector.technical },
                  ].map(({ label, icon: RowIcon, text }) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <dt className="flex items-center gap-2 font-bold text-navy-900 mb-2">
                        <RowIcon className="h-5 w-5 text-orange-600" aria-hidden="true" />
                        {label}
                      </dt>
                      <dd className="text-slate-600 text-sm leading-relaxed">
                        <Inline text={text} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="py-14 lg:py-20 bg-white" aria-labelledby="sector-compare-heading">
        <Container size="lg">
          <h2 id="sector-compare-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-navy-900 mb-4 text-center">
            What Changes From Sector to Sector
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10">
            The same services are planned differently depending on who the team reports to, when work can be done and
            which areas or systems matter most.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200" tabIndex={0} role="region" aria-labelledby="sector-compare-heading">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">How facility management requirements differ across the six sectors KARGAR serves</caption>
              <thead className="bg-navy-950 text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Sector</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Team reports to</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Work is scheduled</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Priority areas and systems</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {sectorComparison.map((row) => (
                  <tr key={row.sector}>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy-900">{row.sector}</th>
                    <td className="px-4 py-3 text-slate-700">{row.reportsTo}</td>
                    <td className="px-4 py-3 text-slate-700">{row.scheduling}</td>
                    <td className="px-4 py-3 text-slate-700">{row.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-20 bg-slate-50" aria-labelledby="sector-approach-heading">
        <Container size="lg">
          <SectionHeading
            title="One Delivery Approach, Adapted to Each Sector"
            align="center"
            className="mb-6"
            id="sector-approach-heading"
          />
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto text-center mb-10">
            Every site runs on PURNA, KARGAR’s facility management protocol. The stages stay the same; what goes into
            them depends on the sector. Staff receive skill, safety and behavioural training round the year, security
            personnel are police-verified, and you have the right to ask what the staff at your site are paid.
          </p>
          <ol role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {purnaStages.map((stage) => (
              <li key={stage.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white" aria-hidden="true">
                  {stage.letter}
                </span>
                <h3 className="font-bold text-navy-900 mb-1">{stage.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{stage.text}</p>
              </li>
            ))}
          </ol>
          <p className="text-center mt-8">
            <Link to="/company-profile" className={`${LINK_CLASS} inline-flex items-center gap-2`}>
              Read more in our company profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </Container>
      </section>

      <section className="py-14 lg:py-20 bg-white" aria-labelledby="sector-services-heading">
        <Container size="lg">
          <h2 id="sector-services-heading" className="text-2xl md:text-3xl font-bold text-navy-900 mb-6 text-center">
            Services Used Across These Sectors
          </h2>
          <ul role="list" className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Facility Management Company in Pune', href: '/facility-management-company-pune' },
              { label: 'Housekeeping Services in Pune', href: '/housekeeping-services-pune' },
              { label: 'Security Services in Pune', href: '/security-services-pune' },
              { label: 'Building Maintenance Services in Pune', href: '/building-maintenance-services-pune' },
              { label: 'Electrical Maintenance in Pune', href: '/electrical-maintenance-services-pune' },
              { label: 'HVAC Maintenance in Pune', href: '/hvac-maintenance-services-pune' },
              { label: 'Facility Staffing in Pune', href: '/facility-staffing-services-pune' },
              { label: 'Security Services (service overview)', href: '/services/soft-services/security-services' },
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

      <section className="py-14 lg:py-20 bg-slate-50">
        <FaqList faqs={sectorFaqs} heading="Sectors: Frequently Asked Questions" />
      </section>
    </>
  );
}
