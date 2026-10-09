import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { business, mailHref, telHref, whatsappHref } from "@/lib/business";
import { hoursRows } from "@/lib/hours";
import { fmt, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { TrackedLink } from "@/components/TrackedLink";
import { WhatsAppIcon } from "@/components/icons";
import { buttonStyles } from "@/components/ui/button";
import { OpenNow } from "@/components/craft/OpenNow";
import { SpecSheet } from "@/components/craft/SpecSheet";

export function ContactInfo({ locale, t, className = "" }: { locale: Locale; t: Dictionary; className?: string }) {
  const { contact, address } = business;
  return (
    <aside className={`space-y-7 rounded-3xl bg-surface p-6 shadow-card ring-1 ring-border/60 ${className}`}>
      <div className="hidden lg:block">
        <h2 className="font-serif text-2xl font-semibold">{t.contact.orReachUs}</h2>
        <OpenNow locale={locale} t={t} className="mt-2 text-fg-muted" />
        <div className="mt-4 grid gap-3">
          <TrackedLink href={telHref} event="call_click" eventProps={{ location: "contact_page" }} className={buttonStyles.primary}>
            <Phone className="size-4" aria-hidden /> {contact.phoneDisplay}
          </TrackedLink>
          <TrackedLink
            href={whatsappHref(fmt(t.actions.whatsappMessage, { name: business.name }))}
            event="whatsapp_click"
            eventProps={{ location: "contact_page" }}
            className={buttonStyles.whatsapp}
          >
            <WhatsAppIcon className="size-5" /> {t.actions.whatsapp}
          </TrackedLink>
        </div>
      </div>

      <a href={mailHref} className={`${buttonStyles.secondary} w-full break-all`}>
        <Mail className="size-4 shrink-0" aria-hidden /> {contact.email}
      </a>

      <div>
        <h3 className="label-mono flex items-center gap-2 text-wood">
          <Clock className="size-4" aria-hidden /> {t.contact.hours}
        </h3>
        <SpecSheet className="mt-2" rows={hoursRows(locale).map((row) => ({ label: row.days, value: row.time }))} />
      </div>

      <div>
        <h3 className="label-mono flex items-center gap-2 text-wood">
          <MapPin className="size-4" aria-hidden /> {t.contact.serviceArea}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {business.serviceArea.map((area) => (
            <li key={area} className="rounded-full border border-border px-3 py-1 text-sm">
              {area}
            </li>
          ))}
        </ul>
        <address className="mt-3 text-sm text-fg-muted not-italic">
          {address.street}, {address.city}, {address.region} {address.postalCode}
        </address>
      </div>
    </aside>
  );
}
