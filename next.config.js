const withFonts = require('next-fonts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: process.env.DOTENV_IDAX_PROD ? true : false,
  reactStrictMode: true,
  experimental: {
    urlImports: [
      'https://prod.spline.design',
    ],
  },
  images: {
    unoptimized: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
}

module.exports = withFonts(nextConfig)
