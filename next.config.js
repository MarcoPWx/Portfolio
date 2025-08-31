const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  analyzerMode: 'static',
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Helps Next find the correct workspace root in multi-lockfile environments
  outputFileTracingRoot: __dirname,
  // Ensure HMR/transpile for local workspace packages
  transpilePackages: ['@naturequest/ecosystem-widget'],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['naturequest.dev', 'quizmentor.ai', 'devmentor.ai', 'harvest.ai', 'omni.dev'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // If you want to deploy to a subdirectory
  // basePath: '/portfolio',
  // assetPrefix: '/portfolio/',
};

module.exports = withBundleAnalyzer(nextConfig);
