import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.dayfey.store',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'food-resturant-back-end.onrender.com',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // matches e.g. res.cloudinary.com, a-res.cloudinary.com
        port: '',
        pathname: '/**', // allow any path under Cloudinary
      },
    ],
  },
};

export default nextConfig;
