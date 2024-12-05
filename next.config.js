/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  // This ensures that the site works when accessed from subpaths
  trailingSlash: true,
}

module.exports = nextConfig
