/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages (no Node server at runtime).
  output: "export",
  reactStrictMode: true,
  // Pages serves /route/ as /route/index.html — trailing slashes keep links clean.
  trailingSlash: true,
  // next/image optimization needs a server; emit plain <img> for a static export.
  images: { unoptimized: true },
};

export default nextConfig;
