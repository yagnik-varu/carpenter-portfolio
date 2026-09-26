import type { Metadata } from "next";
import { defaultLocale, href, locales, type Locale } from "@/lib/i18n";

type Options = {
  lang: Locale;
  /** Path without locale, e.g. "/services/decks-fences" or "/" for home. */
  path: string;
  title: string | { absolute: string };
  description: string;
  noindex?: boolean;
};

/** Page metadata with canonical URL, hreflang alternates and Open Graph basics. */
export function pageMetadata({ lang, path, title, description, noindex }: Options): Metadata {
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, href(l, path)]));
  languages["x-default"] = href(defaultLocale, path);
  const ogTitle = typeof title === "string" ? title : title.absolute;

  return {
    title,
    description,
    alternates: { canonical: href(lang, path), languages },
    openGraph: {
      title: ogTitle,
      description,
      url: href(lang, path),
      locale: lang === "gu" ? "gu_IN" : "en_CA",
      alternateLocale: lang === "gu" ? ["en_CA"] : ["gu_IN"],
      type: "website",
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
