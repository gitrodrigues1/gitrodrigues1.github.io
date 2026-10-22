import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (gitrodrigues1.github.io)
  output: "export",
  // GitHub Pages serves static files only — no Next image optimization server
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
