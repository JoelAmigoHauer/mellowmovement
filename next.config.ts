import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Ensure the /api/seed route can read the bundled images from disk at runtime
  // (standalone tracing otherwise omits public/ assets from the function).
  outputFileTracingIncludes: {
    "/api/seed": ["./public/images/**/*"],
  },
};

export default nextConfig;
