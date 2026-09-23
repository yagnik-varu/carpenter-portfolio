import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Quote form photos are compressed client-side and capped at 3.5 MB total (lib/quote.ts).
    // Keep this under Vercel's 4.5 MB function body limit.
    serverActions: { bodySizeLimit: "4mb" },
  },
  async redirects() {
    // No locale detection proxy: keeps hosting portable (Vercel now, Cloudflare later).
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
