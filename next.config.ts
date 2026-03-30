import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["localhost"],
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
