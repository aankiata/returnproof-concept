/**
 * Two build modes.
 *
 * Local (default): ordinary Next.js build. `npm run dev` and `npm run start` work as before.
 *
 * GitHub Pages: set GITHUB_PAGES=true to produce a static export in ./out. PAGES_BASE_PATH is the repository
 * path GitHub Pages serves under (for example "/returnproof-concept"). Leave it empty for a user site.
 */
const isPagesBuild = process.env.GITHUB_PAGES === "true";
const basePath = isPagesBuild ? (process.env.PAGES_BASE_PATH ?? "") : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isPagesBuild ? { output: "export", basePath } : {}),
};

export default nextConfig;
