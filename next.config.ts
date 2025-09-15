import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ 
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignores ESLint errors & warnings in build
  },
};

export default nextConfig;
