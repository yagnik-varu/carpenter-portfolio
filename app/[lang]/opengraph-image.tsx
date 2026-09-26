import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { fmt, l, locales, type Locale } from "@/lib/i18n";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

// Pre-render at build time (no runtime font reads — keeps the Cloudflare move simple).
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = business.name;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  // English text only: the OG renderer (Satori) cannot shape Gujarati script correctly.
  const lang: Locale = "en";
  const t = await getDictionary(lang);
  return renderOgImage({
    eyebrow: fmt(t.hero.eyebrow, { city: business.address.city }),
    title: t.hero.title,
    subtitle: l(business.tagline, lang),
  });
}
