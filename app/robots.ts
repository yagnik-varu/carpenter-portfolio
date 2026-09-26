import type { MetadataRoute } from "next";
import { absoluteUrl, allowIndexing } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    // Pre-launch / test deployments: keep everything out of search engines.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/*/contact/thanks"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
