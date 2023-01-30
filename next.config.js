/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    urlImports: [
      'https://prod.spline.design',
    ],
  },
}

module.exports = nextConfig
