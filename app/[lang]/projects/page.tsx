import type { Metadata } from "next";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { getCategories, getProjects } from "@/lib/content";
import { l, type Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/Section";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectFilter } from "@/components/sections/ProjectFilter";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const t = await getDictionary((await params).lang as Locale);
  return {
    title: `${t.projects.title} — ${business.address.city}`,
    description: t.projects.subtitle,
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const lang = (await params).lang as Locale;
  const [t, projects, categories] = await Promise.all([getDictionary(lang), getProjects(), getCategories()]);

  // Only offer chips for categories that actually have projects.
  const used = categories.filter((c) => projects.some((p) => p.category === c.id));

  return (
    <>
      <PageHeader title={t.projects.title} subtitle={t.projects.subtitle} />
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <ProjectFilter
          categories={used.map((c) => ({ id: c.id, label: l(c.label, lang) }))}
          labels={{ all: t.projects.all, filter: t.projects.filterLabel, empty: t.projects.empty }}
          items={projects.map((project, i) => ({
            slug: project.slug,
            category: project.category,
            node: (
              <ProjectCard
                project={project}
                category={categories.find((c) => c.id === project.category)}
                locale={lang}
                index={i}
                masonry
              />
            ),
          }))}
        />
      </div>
      <CtaBand locale={lang} t={t} />
    </>
  );
}
