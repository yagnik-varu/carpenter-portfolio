// Content access layer. Pages only talk to these functions, so the file-based
// source can later be swapped for a CMS (e.g. Sanity) without touching the UI.
import { categories, services } from "@/content/services";
import { projects } from "@/content/projects";
import { fallbackReviews } from "@/content/reviews";
import { business } from "@/lib/business";
import { fetchGoogleReviews } from "@/lib/server/google-reviews";
import type { CategoryId, ReviewsData } from "@/content/types";

export async function getServices() {
  return services;
}

export async function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function getCategories() {
  return categories;
}

export async function getProjects(opts: { category?: CategoryId; featured?: boolean } = {}) {
  return projects.filter(
    (p) =>
      (!opts.category || p.category === opts.category) &&
      (opts.featured === undefined || p.featured === opts.featured),
  );
}

export async function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Live Google reviews when configured, otherwise the local fallback list. */
export async function getReviews(): Promise<ReviewsData> {
  const google = await fetchGoogleReviews(business.google.placeId);
  if (google) return { ...google, url: google.url || business.social.google };
  return {
    rating: business.stats.rating,
    count: business.stats.reviewCount,
    reviews: fallbackReviews,
    url: business.social.google,
    source: "fallback",
  };
}
