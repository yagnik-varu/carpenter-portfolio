import type { NextConfig } from "next";

// PostHog cloud region ("us" or "eu") — must match the project's region.
const posthogRegion = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

const nextConfig: NextConfig = {
  // PostHog's API paths use trailing slashes; don't let Next redirect them.
  skipTrailingSlashRedirect: true,
  experimental: {
    // Quote form photos are compressed client-side and capped at 3.5 MB total (lib/quote.ts).
    // Keep this under Vercel's 4.5 MB function body limit.
    serverActions: { bodySizeLimit: "4mb" },
  },
  images: {
    // Google reviewer profile photos (Places API).
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  async rewrites() {
    // Analytics goes through our own domain (/ingest) so ad-blockers don't drop it.
    return [
      { source: "/ingest/static/:path*", destination: `https://${posthogRegion}-assets.i.posthog.com/static/:path*` },
      { source: "/ingest/array/:path*", destination: `https://${posthogRegion}-assets.i.posthog.com/array/:path*` },
      { source: "/ingest/:path*", destination: `https://${posthogRegion}.i.posthog.com/:path*` },
    ];
  },
  async redirects() {
    // No locale detection proxy: keeps hosting portable (Vercel now, Cloudflare later).
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
