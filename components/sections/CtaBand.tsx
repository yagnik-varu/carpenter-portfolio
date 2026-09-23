import { Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/lib/business";
import { fmt, href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { TrackedLink } from "@/components/TrackedLink";
import { WhatsAppIcon } from "@/components/icons";
import { buttonStyles } from "@/components/ui/button";

export function CtaBand({
  locale,
  t,
  title = t.home.ctaTitle,
  subtitle = t.home.ctaSubtitle,
  service,
}: {
  locale: Locale;
  t: Dictionary;
  title?: string;
  subtitle?: string;
  /** Service slug to prefill on the quote form. */
  service?: string;
}) {
  const quote = href(locale, "/contact") + (service ? `?service=${service}` : "");
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="wood-grain tone-walnut relative overflow-hidden rounded-3xl px-6 py-10 text-white md:px-12 md:py-14">
        <div className="absolute inset-0 bg-black/35" aria-hidden />
        <div className="relative max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">{title}</h2>
          <p className="mt-3 text-white/85 md:text-lg">{subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href={quote}
              event="cta_click"
              eventProps={{ location: "cta_band", type: "quote", service }}
              className={buttonStyles.light}
            >
              {t.nav.getQuote}
            </TrackedLink>
            <TrackedLink
              href={whatsappHref(fmt(t.actions.whatsappMessage, { name: business.name }))}
              event="whatsapp_click"
              eventProps={{ location: "cta_band", service }}
              className={buttonStyles.whatsapp}
            >
              <WhatsAppIcon className="size-5" /> {t.actions.whatsapp}
            </TrackedLink>
            <TrackedLink
              href={telHref}
              event="call_click"
              eventProps={{ location: "cta_band" }}
              className={buttonStyles.ghostLight}
            >
              <Phone className="size-4" aria-hidden /> {business.contact.phoneDisplay}
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
