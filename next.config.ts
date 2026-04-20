import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["obfuskey", "@skeptik/ui"],
};

export default nextConfig;
