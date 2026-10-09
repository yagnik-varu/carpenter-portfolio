import Link from "next/link";
import type { Category, Project } from "@/content/types";
import { href, l, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";

const aspects = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]"];

/** Home-page bento tiles: fixed aspect on mobile, fill the grid cell from lg. */
const sizeStyles = {
  lg: {
    aspect: "aspect-[4/3] lg:aspect-auto lg:h-full",
    sizes: "(min-width: 1024px) 50vw, 100vw",
    title: "text-xl lg:text-2xl",
    meta: "",
    chip: "inline-block",
  },
  sm: {
    aspect: "aspect-square lg:aspect-auto lg:h-full",
    sizes: "(min-width: 1024px) 25vw, 50vw",
    title: "text-base leading-snug lg:text-lg",
    meta: "hidden sm:block",
    chip: "hidden sm:inline-block",
  },
};

export function ProjectCard({
  project,
  category,
  locale,
  index = 0,
  masonry = false,
  size,
}: {
  project: Project;
  category?: Category;
  locale: Locale;
  index?: number;
  /** Vary aspect ratios for a masonry layout. */
  masonry?: boolean;
  /** Bento tile size (home page). Overrides `masonry`. */
  size?: "lg" | "sm";
}) {
  const styles = size && sizeStyles[size];
  return (
    <Link
      href={href(locale, `/projects/${project.slug}`)}
      className={`group relative block overflow-hidden rounded-2xl ${styles ? "lg:h-full" : ""}`}
    >
      <Media
        media={project.cover}
        locale={locale}
        tone={index}
        aspect={styles?.aspect ?? (masonry ? aspects[index % aspects.length] : "aspect-[4/3]")}
        sizes={styles?.sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
        className="transition-transform duration-500 group-hover:scale-[1.03]"
        compact
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-white">
        {category && (
          <span className={`mb-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs backdrop-blur ${styles?.chip ?? "inline-block"}`}>
            {l(category.label, locale)}
          </span>
        )}
        <h3 className={`font-serif font-semibold ${styles?.title ?? "text-lg"}`}>{l(project.title, locale)}</h3>
        <p className={`text-sm text-white/75 ${styles?.meta ?? ""}`}>
          {project.location} · {project.year}
        </p>
      </div>
    </Link>
  );
}
