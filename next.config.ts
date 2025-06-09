import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Prevent webpack from trying to bundle native modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    
    return config;
  },
  serverExternalPackages: [
    "@prisma/client",
    "prisma",
  ],
};

export default nextConfig;