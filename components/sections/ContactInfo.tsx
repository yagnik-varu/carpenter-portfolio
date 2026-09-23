import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { business, mailHref, telHref, whatsappHref } from "@/lib/business";
import { fmt, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { TrackedLink } from "@/components/TrackedLink";
import { WhatsAppIcon } from "@/components/icons";
import { buttonStyles } from "@/components/ui/button";

const dayNames: Record<string, Record<Locale, string>> = {
  Mo: { en: "Mon", gu: "સોમ" },
  Tu: { en: "Tue", gu: "મંગળ" },
  We: { en: "Wed", gu: "બુધ" },
  Th: { en: "Thu", gu: "ગુરુ" },
  Fr: { en: "Fri", gu: "શુક્ર" },
  Sa: { en: "Sat", gu: "શનિ" },
  Su: { en: "Sun", gu: "રવિ" },
};

export function ContactInfo({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { contact, address } = business;
  return (
    <aside className="space-y-6 rounded-2xl border border-border bg-surface p-6">
      <div>
        <h2 className="font-serif text-2xl font-semibold">{t.contact.orReachUs}</h2>
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
          <a href={mailHref} className={`${buttonStyles.secondary} break-all`}>
            <Mail className="size-4 shrink-0" aria-hidden /> {contact.email}
          </a>
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 font-semibold">
          <Clock className="size-4 text-wood" aria-hidden /> {t.contact.hours}
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-fg-muted">
          {business.hours.map((h) => (
            <li key={h.days.join()} className="flex justify-between gap-4">
              <span>
                {h.days.length > 1
                  ? `${dayNames[h.days[0]][locale]} – ${dayNames[h.days.at(-1)!][locale]}`
                  : dayNames[h.days[0]][locale]}
              </span>
              <span className="tabular-nums">
                {h.opens} – {h.closes}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="flex items-center gap-2 font-semibold">
          <MapPin className="size-4 text-wood" aria-hidden /> {t.contact.serviceArea}
        </h3>
        <p className="mt-2 text-sm text-fg-muted">{business.serviceArea.join(" · ")}</p>
        <address className="mt-2 text-sm text-fg-muted not-italic">
          {address.street}, {address.city}, {address.region} {address.postalCode}
        </address>
      </div>
    </aside>
  );
}
