import Link from "next/link";
import { Phone } from "lucide-react";
import { business, telHref } from "@/lib/business";
import { href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonStyles } from "@/components/ui/button";
import { OpenNow } from "@/components/craft/OpenNow";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <div aria-hidden className="ruler-edge h-1.5 bg-fg text-inverse/40" />
      <div className="mx-auto flex h-[3.625rem] max-w-6xl items-center justify-between gap-4 px-4">
        {/* min-w-0 lets the logo shrink (name truncates) instead of widening the page on small phones. */}
        <Link href={href(locale)} className="focus-ring min-w-0 rounded-lg" aria-label={business.name}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks items={items} />
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher current={locale} label={t.nav.language} />
          <TrackedLink
            href={telHref}
            event="call_click"
            eventProps={{ location: "header" }}
            className="focus-ring hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-muted xl:flex"
          >
            <Phone className="size-4 text-wood" aria-hidden />
            {business.contact.phoneDisplay}
          </TrackedLink>
          <TrackedLink
            href={quoteHref}
            event="cta_click"
            eventProps={{ location: "header", type: "quote" }}
            className={`${buttonStyles.primary} min-h-10! px-5! py-2! max-md:hidden`}
          >
            {t.nav.getQuote}
          </TrackedLink>
          <MobileMenu
            items={[{ href: href(locale), label: t.nav.home }, ...items, { href: quoteHref, label: t.nav.contact }]}
            labels={{ menu: t.nav.menu, close: t.nav.close, getQuote: t.nav.getQuote, call: t.actions.call }}
            quoteHref={quoteHref}
            telHref={telHref}
            phoneDisplay={business.contact.phoneDisplay}
            logo={<Logo />}
            languageSwitcher={<LanguageSwitcher current={locale} label={t.nav.language} />}
            status={<OpenNow locale={locale} t={t} className="text-fg-muted" />}
          />
        </div>
      </div>
    </header>
  );
}
