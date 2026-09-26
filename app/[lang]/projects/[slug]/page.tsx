import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, MapPin, Tag, Trees } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { getCategories, getProject, getProjects, getServices } from "@/lib/content";
import { href, l, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { TrackView } from "@/components/TrackView";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Gallery } from "@/components/sections/Gallery";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const lang = rawLang as Locale;
  return pageMetadata({
    lang,
    path: `/projects/${slug}`,
    title: `${l(project.title, lang)} — ${project.location}`,
    description: l(project.summary, lang),
  });
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Locale;
  const project = await getProject(slug);
  if (!project) notFound();

  const [t, categories, sameCategory, services] = await Promise.all([
    getDictionary(lang),
    getCategories(),
    getProjects({ category: project.category }),
    getServices(),
  ]);
  const category = categories.find((c) => c.id === project.category);
  const service = services.find((s) => s.category === project.category);
  const more = sameCategory.filter((p) => p.slug !== project.slug).slice(0, 3);

  const facts = [
    { icon: MapPin, label: t.projects.location, value: project.location },
    { icon: Tag, label: t.projects.category, value: category ? l(category.label, lang) : "" },
    { icon: Clock, label: t.projects.duration, value: l(project.duration, lang) },
    { icon: Trees, label: t.projects.materials, value: l(project.materials, lang) },
  ];

  return (
    <>
      <TrackView event="project_view" props={{ project: project.slug, category: project.category }} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: href(lang) },
          { name: t.nav.projects, path: href(lang, "/projects") },
          { name: l(project.title, lang), path: href(lang, `/projects/${project.slug}`) },
        ])}
      />

      <div className="mx-auto max-w-6xl px-4 pt-6 md:pt-10">
        <Link href={href(lang, "/projects")} className="mb-4 inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg">
          <ChevronLeft className="size-4" aria-hidden /> {t.nav.projects}
        </Link>
        <h1 className="font-serif text-4xl font-semibold md:text-5xl">{l(project.title, lang)}</h1>
        <p className="mt-3 max-w-3xl text-lg text-fg-muted">{l(project.summary, lang)}</p>

        <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl border border-border bg-surface p-4">
              <dt className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-fg-muted uppercase">
                <Icon className="size-4 text-wood" aria-hidden /> {label}
              </dt>
              <dd className="mt-1 font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {project.beforeAfter ? (
        <Section title={t.projects.beforeAfter}>
          <div className="mx-auto max-w-3xl">
            <BeforeAfter
              before={project.beforeAfter.before}
              after={project.beforeAfter.after}
              locale={lang}
              labels={{ before: t.projects.before, after: t.projects.after, hint: t.projects.dragHint }}
            />
            <p className="mt-2 text-center text-sm text-fg-muted">{t.projects.dragHint}</p>
          </div>
        </Section>
      ) : (
        <div className="mx-auto max-w-6xl px-4 pt-8">
          <Media media={project.cover} locale={lang} priority aspect="aspect-[16/9]" className="rounded-3xl" sizes="(min-width: 1152px) 1152px, 100vw" />
        </div>
      )}

      <Section title={t.projects.gallery}>
        <Gallery
          images={project.gallery}
          locale={lang}
          labels={{ previous: t.projects.previous, next: t.projects.next, close: t.nav.close, open: t.projects.openImage }}
        />
      </Section>

      <CtaBand locale={lang} t={t} title={t.projects.similar} service={service?.slug} />

      {more.length > 0 && (
        <Section title={t.services.relatedProjects}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => (
              <li key={p.slug}>
                <ProjectCard project={p} category={category} locale={lang} index={i + 1} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
