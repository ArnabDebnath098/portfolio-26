import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    qualities: [75, 90],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  outputFileTracingExcludes: {
    "*": [
      "public/images/**",
      "public/**/*.png",
      "public/**/*.jpg",
      "public/**/*.jpeg",
      "public/**/*.webp",
      "public/**/*.avif",
      "public/**/*.svg",
    ],
  },
};

export default nextConfig;
