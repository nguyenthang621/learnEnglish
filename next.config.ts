import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: false,
  images: {
    domains: ["2.58.82.26"],
  },
};

export default nextConfig;
