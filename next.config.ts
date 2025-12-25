import type { NextConfig } from "next";

const ONE_YEAR = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  async headers() {
    return [
      // ===== Images =====
      { source: "/:path*\\.png", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.jpg", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.jpeg", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.webp", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.gif", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.svg", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.ico", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },

      // ===== Video =====
      { source: "/:path*\\.mp4", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.mov", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.m4v", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },

      // ===== Fonts =====
      { source: "/:path*\\.woff", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.woff2", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.ttf", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
      { source: "/:path*\\.otf", headers: [{ key: "Cache-Control", value: ONE_YEAR }] },
    ];
  },
};

export default nextConfig;
