import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/**",
      },
    ],
    formats: ['image/avif', 'image/webp'], // Use modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Smaller image sizes
    minimumCacheTTL: 60, // Cache images for 60 seconds
  },
  // Optimize production builds
  swcMinify: true,
  compress: true,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', '@sanity/client'],
  },

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Rewrites for better performance
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif|mp4)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
