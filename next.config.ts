import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    localPatterns: [
      { pathname: '/designs/**' },
      { pathname: '/**' },
    ],
  },
};

export default nextConfig;
