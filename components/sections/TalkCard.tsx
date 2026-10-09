import { Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/lib/business";
import { fmt, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { TrackedLink } from "@/components/TrackedLink";
import { WhatsAppIcon } from "@/components/icons";
import { buttonStyles } from "@/components/ui/button";
import { OpenNow } from "@/components/craft/OpenNow";

/** "Prefer to talk?" card: call + WhatsApp + open-now status. */
export function TalkCard({
  locale,
  t,
  location,
  title,
  text,
  className = "",
}: {
  locale: Locale;
  t: Dictionary;
  /** Analytics location for the click events. */
  location: string;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`graph-paper rounded-2xl bg-surface p-6 shadow-card ring-1 ring-border/60 ${className}`}>
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-fg-muted">{text}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <TrackedLink href={telHref} event="call_click" eventProps={{ location }} className={buttonStyles.primary}>
          <Phone className="size-4" aria-hidden /> {business.contact.phoneDisplay}
        </TrackedLink>
        <TrackedLink
          href={whatsappHref(fmt(t.actions.whatsappMessage, { name: business.name }))}
          event="whatsapp_click"
          eventProps={{ location }}
          className={buttonStyles.whatsapp}
        >
          <WhatsAppIcon className="size-5" /> {t.actions.whatsapp}
        </TrackedLink>
      </div>
      <OpenNow locale={locale} t={t} className="mt-4 text-fg-muted" />
    </div>
  );
}
