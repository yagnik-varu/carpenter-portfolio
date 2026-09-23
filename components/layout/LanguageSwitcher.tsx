"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";

function Switcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <nav aria-label={label} className="flex rounded-full border border-border bg-surface p-0.5 text-sm">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${rest}${search ? `?${search}` : ""}`}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === current ? "true" : undefined}
          onClick={() => track("language_switch", { to: locale })}
          className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
            locale === current ? "bg-primary text-primary-fg" : "text-fg-muted hover:text-fg"
          }`}
        >
          {locale === "en" ? "EN" : localeNames[locale].slice(0, 3)}
        </Link>
      ))}
    </nav>
  );
}

export function LanguageSwitcher(props: { current: Locale; label: string }) {
  // useSearchParams needs a Suspense boundary on statically rendered pages.
  return (
    <Suspense fallback={<div className="h-9 w-24" />}>
      <Switcher {...props} />
    </Suspense>
  );
}
