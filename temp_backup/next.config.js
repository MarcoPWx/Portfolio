/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['portfolio.dev', 'quizmentor.ai', 'platform.ai', 'harvest.ai', 'omni.dev'],
  },
  // If you want to deploy to a subdirectory
  // basePath: '/portfolio',
  // assetPrefix: '/portfolio/',
}

module.exports = nextConfig
