import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // No locale detection proxy: keeps hosting portable (Vercel now, Cloudflare later).
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
