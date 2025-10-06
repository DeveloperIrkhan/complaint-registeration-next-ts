import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false // ✅ must be inside 'experimental'
  },
  swcMinify: true // optional, improves performance
};

export default nextConfig;
