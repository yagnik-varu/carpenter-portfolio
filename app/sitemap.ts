import type { MetadataRoute } from "next";
import { getProjects, getServices } from "@/lib/content";
import { defaultLocale, href, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo/site";

const staticPaths = ["/", "/services", "/projects", "/about", "/reviews", "/faq", "/contact"];

/** One entry per page per language, each listing its translations (hreflang). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects] = await Promise.all([getServices(), getProjects()]);
  const paths = [
    ...staticPaths,
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ];

  return paths.flatMap((path) => {
    const languages = Object.fromEntries([
      ...locales.map((l) => [l, absoluteUrl(href(l, path))]),
      ["x-default", absoluteUrl(href(defaultLocale, path))],
    ]);
    return locales.map((locale) => ({
      url: absoluteUrl(href(locale, path)),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
      alternates: { languages },
    }));
  });
}
