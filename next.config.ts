import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/wp/wp-content/uploads/**",
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
