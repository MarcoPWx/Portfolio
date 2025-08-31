/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['naturequest.dev', 'quizmentor.ai', 'devmentor.ai', 'harvest.ai', 'omni.dev'],
  },
  // If you want to deploy to a subdirectory
  // basePath: '/portfolio',
  // assetPrefix: '/portfolio/',
}

module.exports = nextConfig
