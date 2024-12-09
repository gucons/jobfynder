import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "placehold.co",
      },
      { hostname: "utfs.io" },
    ],

    // "images.pexels.com", "placehold.co"],
  },
};

export default nextConfig;
