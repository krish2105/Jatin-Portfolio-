import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root; a stray lockfile above this folder confuses inference.
  turbopack: { root: __dirname },
  images: {
    // Only local assets are served; these are the widths the portrait needs.
    imageSizes: [96, 128, 256, 384],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    formats: ["image/webp"],
  },
  // three.js ships untranspiled ESM examples; keep them out of the server bundle.
  serverExternalPackages: ["three"],
};

export default nextConfig;
