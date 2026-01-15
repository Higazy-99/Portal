import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'localhost',
      '127.0.0.1',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Optimize for Vercel
  swcMinify: true,
  // Enable compression for production
  compress: true,
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
