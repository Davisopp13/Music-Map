import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // a stray lockfile in the home directory confuses workspace-root inference
  turbopack: { root: import.meta.dirname },
  // Only the DO Code Lab portfolio (and local previews of it) may show the map in a frame.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://docodelab.com https://www.docodelab.com http://localhost:*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
