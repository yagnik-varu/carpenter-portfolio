import Link from "next/link";
import type { Category, Project } from "@/content/types";
import { href, l, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";

const aspects = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]"];

export function ProjectCard({
  project,
  category,
  locale,
  index = 0,
  masonry = false,
}: {
  project: Project;
  category?: Category;
  locale: Locale;
  index?: number;
  /** Vary aspect ratios for a masonry layout. */
  masonry?: boolean;
}) {
  return (
    <Link
      href={href(locale, `/projects/${project.slug}`)}
      className="group relative block overflow-hidden rounded-2xl"
    >
      <Media
        media={project.cover}
        locale={locale}
        tone={index}
        aspect={masonry ? aspects[index % aspects.length] : "aspect-[4/3]"}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="transition-transform duration-500 group-hover:scale-[1.03]"
        compact
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-white">
        {category && (
          <span className="mb-1 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs backdrop-blur">
            {l(category.label, locale)}
          </span>
        )}
        <h3 className="font-serif text-lg font-semibold">{l(project.title, locale)}</h3>
        <p className="text-sm text-white/75">
          {project.location} · {project.year}
        </p>
      </div>
    </Link>
  );
}
