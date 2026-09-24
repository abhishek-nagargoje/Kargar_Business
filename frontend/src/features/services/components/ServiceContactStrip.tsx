import { Mail, Phone } from 'lucide-react';
import { contactDetails, telHref } from '@/config/contact';

/** Direct call/email options, rendered on dark (navy) backgrounds. */
export function ServiceContactStrip() {
  const { phone, alternatePhone, email, hours } = contactDetails;
  const linkClass =
    'font-semibold text-white underline-offset-4 hover:text-orange-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-sm';

  return (
    <div className="mt-12 grid gap-6 border-t border-white/15 pt-10 text-left sm:grid-cols-2">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-orange-300" aria-hidden="true">
          <Phone className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">Call Us</p>
          <p className="mt-1">
            <a href={telHref(phone)} className={linkClass}>{phone.display}</a>
            <span className="text-gray-300"> · </span>
            <a href={telHref(alternatePhone)} className={linkClass}>{alternatePhone.display}</a>
          </p>
          <p className="mt-1 text-sm text-gray-300">{hours}</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-orange-300" aria-hidden="true">
          <Mail className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">Email Us</p>
          <p className="mt-1">
            <a href={`mailto:${email}`} className={linkClass}>{email}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
