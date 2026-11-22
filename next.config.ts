import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "substackcdn.com" },
      { protocol: "https", hostname: "substack-post-media.s3.amazonaws.com" },
      { protocol: "https", hostname: "testrigor.com" },
      { protocol: "https", hostname: "api.harsofts.com" },
      { protocol: "https", hostname: "graylog.org" },
      { protocol: "https", hostname: "tms-outsource.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "www.erpabsolute.com" },
      { protocol: "https", hostname: "bos.center" },
      { protocol: "https", hostname: "www.knack.com" },
      { protocol: "https", hostname: "www.spacestem.com" },
      { protocol: "https", hostname: "fireup.pro" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
