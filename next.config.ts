import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: '/designs/**' },
    ],
  },
};

export default nextConfig;
