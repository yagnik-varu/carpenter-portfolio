import { business } from "@/lib/business";
import { getProject, getProjects } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { l, type Locale } from "@/lib/i18n";
import { ogContentType, ogSize, renderOgImage } from "@/lib/seo/og";

// Pre-render at build time, one image per locale × project.
export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = business.name;

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params;
  // English text only: the OG renderer (Satori) cannot shape Gujarati script correctly.
  const lang: Locale = "en";
  const [t, project] = await Promise.all([getDictionary(lang), getProject(slug)]);
  return renderOgImage({
    eyebrow: project ? `${t.nav.projects} · ${project.location}` : t.nav.projects,
    title: project ? l(project.title, lang) : business.name,
    subtitle: project ? l(project.summary, lang) : undefined,
  });
}
