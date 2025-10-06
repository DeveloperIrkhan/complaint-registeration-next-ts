import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
    useLightningcss:false
  },
  swcMinify: true // optional, improves performance
};

export default nextConfig;
