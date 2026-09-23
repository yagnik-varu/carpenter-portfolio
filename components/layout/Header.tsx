import Link from "next/link";
import { Phone } from "lucide-react";
import { business, telHref } from "@/lib/business";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { TrackedLink } from "@/components/TrackedLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

export function navItems(locale: Locale, t: Dictionary) {
  return [
    { href: href(locale, "/services"), label: t.nav.services },
    { href: href(locale, "/projects"), label: t.nav.projects },
    { href: href(locale, "/about"), label: t.nav.about },
    { href: href(locale, "/reviews"), label: t.nav.reviews },
    { href: href(locale, "/faq"), label: t.nav.faq },
  ];
}

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const items = navItems(locale, t);
  const quoteHref = href(locale, "/contact");

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={href(locale)} className="shrink-0" aria-label={business.name}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-fg-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} label={t.nav.language} />
          <TrackedLink
            href={telHref}
            event="call_click"
            eventProps={{ location: "header" }}
            className="hidden items-center gap-2 px-2 text-sm font-semibold lg:flex"
          >
            <Phone className="size-4" aria-hidden />
            {business.contact.phoneDisplay}
          </TrackedLink>
          <TrackedLink
            href={quoteHref}
            event="cta_click"
            eventProps={{ location: "header", type: "quote" }}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg transition-colors hover:bg-primary-hover md:inline-block"
          >
            {t.nav.getQuote}
          </TrackedLink>
          <MobileMenu
            items={[{ href: href(locale), label: t.nav.home }, ...items, { href: quoteHref, label: t.nav.contact }]}
            labels={{ menu: t.nav.menu, close: t.nav.close, getQuote: t.nav.getQuote, call: t.actions.call }}
            quoteHref={quoteHref}
            telHref={telHref}
            phoneDisplay={business.contact.phoneDisplay}
          />
        </div>
      </div>
    </header>
  );
}
