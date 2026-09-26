import { business } from "@/lib/business";
import { getService, getServices } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { l, type Locale } from "@/lib/i18n";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

// Pre-render at build time, one image per locale × service.
export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = business.name;

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params;
  // English text only: the OG renderer (Satori) cannot shape Gujarati script correctly.
  const lang: Locale = "en";
  const [t, service] = await Promise.all([getDictionary(lang), getService(slug)]);
  return renderOgImage({
    eyebrow: `${t.nav.services} · ${business.address.city}`,
    title: service ? l(service.title, lang) : business.name,
    subtitle: service ? l(service.summary, lang) : undefined,
  });
}
