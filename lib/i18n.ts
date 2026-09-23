export const locales = ["en", "gu"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  gu: "ગુજરાતી",
};

/** A string with one value per locale — used in content files. */
export type Localized = Record<Locale, string>;

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Pick the value for a locale, falling back to English. */
export function l(value: Localized, locale: Locale): string {
  return value[locale] || value[defaultLocale];
}

/** Replace {placeholders} in a message: fmt("Hi {name}", { name: "Ann" }). */
export function fmt(message: string, vars: Record<string, string | number>): string {
  return message.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}

/** Build a locale-prefixed path: href("gu", "/services") -> "/gu/services". */
export function href(locale: Locale, path = "/"): string {
  return `/${locale}${path === "/" ? "" : path}`;
}
