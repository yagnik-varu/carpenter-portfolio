import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { business, mailHref, telHref } from "@/lib/business";
import { hoursRows } from "@/lib/hours";
import { fmt, href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { Emphasis } from "@/components/craft/Emphasis";
import { OpenNow } from "@/components/craft/OpenNow";
import { Signature } from "@/components/craft/Signature";
import { navItems } from "./Header";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "@/components/analytics/ConsentBanner";

const socialLabels: Record<string, string> = {
  google: "Google",
  instagram: "Instagram",
  facebook: "Facebook",
  houzz: "Houzz",
};

const linkClass = "focus-ring rounded-sm transition-colors hover:text-inverse";
const headingClass = "label-mono mb-4 text-wood-light";

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { address, contact } = business;
  const socials = Object.entries(business.social).filter(([, url]) => url);

  return (
    <footer className="relative bg-fg text-inverse-muted">
      <div aria-hidden className="ruler-edge text-inverse/30" />

      {/* Sign-off */}
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 md:pt-20">
        <div className="flex flex-col gap-8 border-b border-inverse-line pb-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl font-serif text-4xl leading-[1.1] font-semibold text-balance text-inverse md:text-6xl">
            <Emphasis text={fmt(t.footer.signoff, { city: address.city })} className="text-wood-light" />
          </p>
          <Signature role={t.owner.role} inverse />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo inverted />
          <p className="text-sm">{business.description[locale]}</p>
          <OpenNow locale={locale} t={t} className="text-inverse" />
        </div>

        <div>
          <h2 className={headingClass}>{t.footer.quickLinks}</h2>
          <ul className="space-y-2.5 text-sm">
            {navItems(locale, t).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={href(locale, "/contact")} className={linkClass}>
                {t.nav.getQuote}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>{t.footer.contact}</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={telHref} className={`${linkClass} flex items-center gap-2`}>
                <Phone className="size-4 shrink-0 text-wood-light" aria-hidden /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={mailHref} className={`${linkClass} flex items-center gap-2 break-all`}>
                <Mail className="size-4 shrink-0 text-wood-light" aria-hidden /> {contact.email}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-wood-light" aria-hidden />
              <address className="not-italic">
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </address>
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className={headingClass}>{t.footer.hours}</h2>
            <dl className="space-y-1.5 text-sm">
              {hoursRows(locale).map((row) => (
                <div key={row.days} className="flex justify-between gap-4">
                  <dt>{row.days}</dt>
                  <dd className="font-mono text-xs leading-5 text-inverse">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          {socials.length > 0 && (
            <div>
              <h2 className={headingClass}>{t.footer.followUs}</h2>
              <ul className="flex flex-wrap gap-2 text-sm">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex min-h-9 items-center rounded-full border border-inverse-line px-3.5 transition-colors hover:border-inverse hover:text-inverse"
                    >
                      {socialLabels[key] ?? key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-inverse-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.legalName}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {locale === "gu" && <span>{t.footer.translationNote}</span>}
            <Link href={href(locale, "/privacy")} className={linkClass}>
              {t.footer.privacy}
            </Link>
            <CookieSettingsButton label={t.footer.cookieSettings} />
          </div>
        </div>
      </div>
    </footer>
  );
}
