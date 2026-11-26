import { type SyntheticEvent, useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import toast from 'react-hot-toast';
import { Lock, Send } from 'lucide-react';
import { submitContactMessage } from '@/services/contact.service';
import { trackFormSubmission } from '@/lib/analytics';
import { getLandingAttribution } from '@/lib/landingAttribution';
import { contactDetails } from '@/config/contact';
import { punePagesByPath } from '@/features/pune-landing/config/punePages';
import {
  LOCALITY_FIELD,
  enquiryServices,
  enquiryServicesById,
  isEnquiryServiceId,
  type EnquiryField,
  type EnquiryServiceId,
} from '../enquiryServices';

/** react-hot-toast has its own live region; the inline status already announces the result. */
const SILENT_TOAST = { ariaProps: { role: 'status' as const, 'aria-live': 'off' as const } };

/** Lower-cases the first letter for use mid-sentence, but keeps acronyms such as "HVAC" or "STP". */
function inSentence(label: string): string {
  return /^[A-Z][a-z]/.test(label) ? label.charAt(0).toLowerCase() + label.slice(1) : label;
}

function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

/** Preselect the service from the page that opened the form (its path is the `service` param). */
function resolveInitialService(serviceParam: string, enquiryParam: string): EnquiryServiceId | '' {
  if (isEnquiryServiceId(enquiryParam)) return enquiryParam;
  const page = punePagesByPath[serviceParam];
  return page ? page.enquiryService : '';
}

/** Collects the optional, service-specific answers as label → value, skipping blanks. */
function collectDetails(formData: FormData, fields: EnquiryField[]): Record<string, string> {
  const details: Record<string, string> = {};
  const locality = formString(formData, LOCALITY_FIELD.name);
  if (locality) details[LOCALITY_FIELD.label] = locality;
  for (const field of fields) {
    const value =
      field.type === 'checkboxes'
        ? formData.getAll(field.name).filter((v): v is string => typeof v === 'string').join(', ')
        : formString(formData, field.name);
    if (value) details[field.label] = value;
  }
  return details;
}

function DetailField({ field, idPrefix }: { field: EnquiryField; idPrefix: string }) {
  const id = `${idPrefix}-${field.name}`;
  if (field.type === 'checkboxes') {
    return (
      <fieldset className="kb-enquiry-checks">
        <legend>{field.label}</legend>
        <div>
          {field.options.map((option) => (
            <label key={option} className="kb-enquiry-check">
              <input type="checkbox" name={field.name} value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }
  if (field.type === 'select') {
    return (
      <label htmlFor={id}>
        {field.label}
        <select id={id} name={field.name} defaultValue="">
          <option value="">Select (optional)</option>
          {field.options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  }
  return (
    <label htmlFor={id}>
      {field.label}
      <input id={id} name={field.name} inputMode={field.inputMode} placeholder={field.placeholder} autoComplete="off" />
    </label>
  );
}

/**
 * The enquiry form on /contact-us. Required: name, email, phone and the service. Everything that
 * shapes the quote (property type, posts, area, equipment...) is optional, so a buyer can enquire
 * before a site survey. The service is preselected from the landing page that opened the form,
 * and the lead carries that service, its receiving team and the visitor's first landing page.
 */
export function EnquiryForm() {
  const idPrefix = useId();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ tone: 'success' | 'error'; text: string } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const serviceParam = searchParams.get('service') ?? '';
  const sourceParam = searchParams.get('source') ?? '';
  const campaignParam = searchParams.get('campaign') ?? '';
  const categoryParam = searchParams.get('category') ?? '';
  const ctaPosition = searchParams.get('cta_position') ?? '';
  const initialService = resolveInitialService(serviceParam, searchParams.get('enquiry') ?? '');
  const [selected, setSelected] = useState<EnquiryServiceId | ''>(initialService);

  // A new CTA click while already on /contact-us changes the params without remounting.
  useEffect(() => { setSelected(initialService); }, [initialService]);

  useEffect(() => {
    if (window.location.hash !== '#contact-form' && !serviceParam) return;
    const timer = window.setTimeout(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById('contact-form')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      headingRef.current?.focus({ preventScroll: true });
    }, 100);
    return () => { window.clearTimeout(timer); };
  }, [serviceParam]);

  const service = selected ? enquiryServicesById[selected] : null;

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    // aria-disabled (not disabled) keeps focus on the button while sending; this guard blocks
    // a double submit.
    if (isSubmitting) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const enquiryService = formString(formData, 'enquiry_service');
    const chosen = isEnquiryServiceId(enquiryService) ? enquiryServicesById[enquiryService] : enquiryServicesById.other;
    const landing = getLandingAttribution();

    setIsSubmitting(true);
    setStatus(null);
    try {
      const result = await submitContactMessage({
        name: formString(formData, 'name'),
        email: formString(formData, 'email'),
        phone: formString(formData, 'phone'),
        company: formString(formData, 'company'),
        service: formString(formData, 'service'),
        enquiryService: chosen.id,
        landingPage: landing?.landingPage,
        referrerHost: landing?.referrerHost,
        source: formString(formData, 'source'),
        campaign: formString(formData, 'campaign'),
        category: formString(formData, 'category'),
        ctaPosition: formString(formData, 'cta_position'),
        details: collectDetails(formData, chosen.fields),
        message: formString(formData, 'message'),
      });

      const text = `Thank you. Your enquiry for ${inSentence(chosen.label)} has been sent to our ${inSentence(chosen.team)} team. We will contact you to discuss the next step, usually a site visit.`;
      setStatus({ tone: 'success', text });
      toast.success(result.emailSent ? 'Enquiry sent. Our team will contact you shortly.' : 'Enquiry received. Our team has your request.', SILENT_TOAST);

      // Only reached after the lead is saved. No personal data: ids and site paths only.
      trackFormSubmission({
        service: formString(formData, 'service'),
        enquiry_service: chosen.id,
        team: chosen.team,
        landing_page: landing?.landingPage,
        source: formString(formData, 'source'),
        campaign: formString(formData, 'campaign'),
        cta_position: formString(formData, 'cta_position'),
      });

      form.reset();
      setSelected(initialService);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to submit request. Please try again.';
      setStatus({ tone: 'error', text: `${message} You can also call us or email ${contactDetails.email}.` });
      toast.error(message, SILENT_TOAST);
    } finally {
      setIsSubmitting(false);
      statusRef.current?.focus();
    }
  };

  return (
    <form className="kb-contact-form" id="contact-form" onSubmit={onSubmit} aria-describedby={`${idPrefix}-intro`}>
      <input type="hidden" name="category" value={categoryParam} />
      <input type="hidden" name="service" value={serviceParam} />
      <input type="hidden" name="source" value={sourceParam} />
      <input type="hidden" name="campaign" value={campaignParam} />
      <input type="hidden" name="cta_position" value={ctaPosition} />

      <h2 ref={headingRef} tabIndex={-1}>Request a Proposal</h2>
      <p id={`${idPrefix}-intro`}>
        Fields marked <b aria-hidden="true">*</b><span className="sr-only">with an asterisk</span> are required. The optional details help us prepare a useful proposal; skip anything you do not know yet.
      </p>

      <div className="kb-form-grid">
        <label htmlFor={`${idPrefix}-name`}>
          <span>Full name <b aria-hidden="true">*</b></span>
          <input id={`${idPrefix}-name`} name="name" autoComplete="name" required minLength={2} maxLength={100} />
        </label>
        <label htmlFor={`${idPrefix}-phone`}>
          <span>Phone number <b aria-hidden="true">*</b></span>
          <input id={`${idPrefix}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={8} maxLength={20} aria-describedby={`${idPrefix}-phone-hint`} />
          <small id={`${idPrefix}-phone-hint`} className="kb-field-hint">10-digit mobile, or with +91</small>
        </label>
        <label htmlFor={`${idPrefix}-email`}>
          <span>Email address <b aria-hidden="true">*</b></span>
          <input id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" required maxLength={160} />
        </label>
        <label htmlFor={`${idPrefix}-company`}>
          Company or society name
          <input id={`${idPrefix}-company`} name="company" autoComplete="organization" maxLength={150} />
        </label>
      </div>

      <div className="kb-form-grid">
        <label htmlFor={`${idPrefix}-service`}>
          <span>Service required <b aria-hidden="true">*</b></span>
          <select
            id={`${idPrefix}-service`}
            name="enquiry_service"
            required
            aria-describedby={`${idPrefix}-service-hint`}
            value={selected}
            onChange={(e) => { setSelected(isEnquiryServiceId(e.target.value) ? e.target.value : ''); }}
          >
            <option value="">Select a service</option>
            {enquiryServices.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <small id={`${idPrefix}-service-hint`} className="kb-field-hint">Optional questions for the chosen service appear below. Changing the service clears them.</small>
        </label>
        <label htmlFor={`${idPrefix}-locality`}>
          {LOCALITY_FIELD.label}
          <input id={`${idPrefix}-locality`} name={LOCALITY_FIELD.name} placeholder={LOCALITY_FIELD.placeholder} autoComplete="address-level3" maxLength={120} />
        </label>
      </div>

      {service && service.fields.length > 0 && (
        // Keyed by service so switching services clears answers that no longer apply.
        <fieldset key={service.id} className="kb-enquiry-details" aria-describedby={service.detailsIntro ? `${idPrefix}-details-intro` : undefined}>
          <legend>Optional details for {inSentence(service.label)}</legend>
          {service.detailsIntro && <p id={`${idPrefix}-details-intro`}>{service.detailsIntro}</p>}
          <div className="kb-form-grid">
            {service.fields.map((field) => (
              <DetailField key={field.name} field={field} idPrefix={idPrefix} />
            ))}
          </div>
        </fieldset>
      )}

      <label htmlFor={`${idPrefix}-message`}>
        Anything else we should know?
        <textarea id={`${idPrefix}-message`} name="message" rows={4} maxLength={4000} placeholder="Current setup, timelines, or questions for our team" />
      </label>

      <button className="kb-btn kb-btn--primary" type="submit" aria-disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Enquiry'} <Send size={18} aria-hidden="true" />
      </button>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className={status ? `kb-enquiry-status kb-enquiry-status--${status.tone}` : 'sr-only'}>
        {status?.text}
      </div>

      <small><Lock size={15} aria-hidden="true" /> We use these details only to respond to your enquiry. See our <a href="/privacy-policy">privacy policy</a>.</small>
    </form>
  );
}
