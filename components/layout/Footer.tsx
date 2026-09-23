import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { business, mailHref, telHref } from "@/lib/business";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { navItems } from "./Header";
import { Logo } from "./Logo";

const socialLabels: Record<string, string> = {
  google: "Google",
  instagram: "Instagram",
  facebook: "Facebook",
  houzz: "Houzz",
};

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { address, contact } = business;
  const socials = Object.entries(business.social).filter(([, url]) => url);

  return (
    <footer className="mt-16 bg-fg text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo inverted />
          <p className="text-sm">{business.description[locale]}</p>
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-white">{t.footer.quickLinks}</h2>
          <ul className="space-y-2 text-sm">
            {navItems(locale, t).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-semibold text-white">{t.footer.contact}</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={telHref} className="flex items-center gap-2 hover:text-white">
                <Phone className="size-4 shrink-0" aria-hidden /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={mailHref} className="flex items-center gap-2 break-all hover:text-white">
                <Mail className="size-4 shrink-0" aria-hidden /> {contact.email}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <address className="not-italic">
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </address>
            </li>
          </ul>
        </div>

        {socials.length > 0 && (
          <div>
            <h2 className="mb-3 font-semibold text-white">{t.footer.followUs}</h2>
            <ul className="flex flex-wrap gap-2 text-sm">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-white/20 px-3 py-1.5 hover:border-white hover:text-white"
                  >
                    {socialLabels[key] ?? key}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.legalName}. {t.footer.rights}
          </p>
          <div className="flex gap-4">
            {locale === "gu" && <span>{t.footer.translationNote}</span>}
            <Link href={href(locale, "/privacy")} className="hover:text-white">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
