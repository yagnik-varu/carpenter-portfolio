import { Phone } from "lucide-react";
import type { Media as MediaType } from "@/content/types";
import { business, telHref, whatsappHref } from "@/lib/business";
import { fmt, href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { TrackedLink } from "@/components/TrackedLink";
import { WhatsAppIcon } from "@/components/icons";
import { buttonStyles } from "@/components/ui/button";
import { Media } from "@/components/ui/Media";
import { Eyebrow } from "@/components/craft/Eyebrow";
import { OpenNow } from "@/components/craft/OpenNow";
import { TrustSeal } from "@/components/craft/TrustSeal";

export function CtaBand({
  locale,
  t,
  title = t.home.ctaTitle,
  subtitle = t.home.ctaSubtitle,
  service,
  image,
}: {
  locale: Locale;
  t: Dictionary;
  title?: string;
  subtitle?: string;
  /** Service slug to prefill on the quote form. */
  service?: string;
  /** Background photo; falls back to the wood-grain texture when unset or empty. */
  image?: MediaType;
}) {
  const quote = href(locale, "/contact") + (service ? `?service=${service}` : "");
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="wood-grain tone-walnut relative overflow-hidden rounded-3xl px-6 pt-12 pb-10 text-inverse shadow-lift md:px-12 md:pt-16 md:pb-14">
        {image?.src && (
          <Media
            media={image}
            locale={locale}
            aspect=""
            className="absolute! inset-0"
            sizes="(min-width: 1152px) 1152px, 100vw"
          />
        )}
        <div className={`absolute inset-0 ${image?.src ? "bg-gradient-to-r from-black/80 via-black/60 to-black/30" : "bg-black/40"}`} aria-hidden />
        <div aria-hidden className="ruler-edge absolute inset-x-0 top-0 text-inverse/40" />
        <TrustSeal
          id="cta"
          locale={locale}
          t={t}
          filled={false}
          className="absolute top-1/2 right-10 hidden size-44 -translate-y-1/2 text-inverse/80 lg:block"
        />
        <div className="relative max-w-2xl">
          <Eyebrow className="text-inverse/75">{t.home.ctaEyebrow}</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-5xl md:leading-[1.08]">{title}</h2>
          <p className="mt-3 text-inverse/85 md:text-lg">{subtitle}</p>
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
          <OpenNow locale={locale} t={t} className="mt-6 text-inverse/90" />
        </div>
      </div>
    </section>
  );
}
