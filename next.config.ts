import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        "@libsql/client": "commonjs @libsql/client",
      });
    }
    
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
    "@libsql/client",
    "@prisma/client",
    "prisma",
    "@prisma/adapter-libsql"
  ],
};

export default nextConfig;