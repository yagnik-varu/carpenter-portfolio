import { business } from "@/lib/business";

/** Absolute site origin without trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || business.url).replace(/\/$/, "");

/**
 * Search engines are blocked unless ALLOW_INDEXING=true — the test deployment holds dummy
 * data that must not end up in Google before launch.
 */
export const allowIndexing = process.env.ALLOW_INDEXING === "true";

export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
