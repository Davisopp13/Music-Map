import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // a stray lockfile in the home directory confuses workspace-root inference
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
