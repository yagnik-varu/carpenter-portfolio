import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, MapPin, Tag, Trees } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { getCategories, getProject, getProjects, getServices } from "@/lib/content";
import { href, l, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";
import { Breadcrumbs, Section } from "@/components/ui/Section";
import { SpecSheet } from "@/components/craft/SpecSheet";
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

      <div className="graph-paper relative border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 pb-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end md:pt-12 md:pb-16">
          <div>
            <Breadcrumbs
              items={[
                { label: t.nav.home, href: href(lang) },
                { label: t.nav.projects, href: href(lang, "/projects") },
                { label: l(project.title, lang) },
              ]}
            />
            <h1 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-6xl md:leading-[1.05]">
              {l(project.title, lang)}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-fg-muted">{l(project.summary, lang)}</p>
          </div>
          <div className="rounded-2xl bg-surface px-5 py-2 shadow-card ring-1 ring-border/60">
            <SpecSheet
              rows={facts.map(({ icon: Icon, label, value }) => ({
                label,
                value,
                icon: <Icon className="size-3.5 text-wood" aria-hidden />,
              }))}
            />
          </div>
        </div>
        <div aria-hidden className="ruler-edge absolute inset-x-0 bottom-0 -scale-y-100" />
      </div>

      {project.beforeAfter ? (
        <Section title={t.projects.beforeAfter}>
          <div className="mx-auto max-w-4xl rounded-3xl shadow-lift">
            <BeforeAfter
              before={project.beforeAfter.before}
              after={project.beforeAfter.after}
              locale={lang}
              labels={{ before: t.projects.before, after: t.projects.after, hint: t.projects.dragHint }}
            />
          </div>
        </Section>
      ) : (
        <div className="mx-auto max-w-6xl px-4 pt-10">
          <Media media={project.cover} locale={lang} preload aspect="aspect-[16/9]" className="rounded-3xl shadow-lift" sizes="(min-width: 1152px) 1152px, 100vw" />
        </div>
      )}

      <Section title={t.projects.gallery}>
        <Gallery
          images={project.gallery}
          locale={lang}
          labels={{ previous: t.projects.previous, next: t.projects.next, close: t.nav.close, open: t.projects.openImage }}
        />
      </Section>

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

      <CtaBand locale={lang} t={t} title={t.projects.similar} service={service?.slug} />
    </>
  );
}
