/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['roughjs'],
  experimental: {
    inlineCss: true,
    viewTransition: true,
    staleTimes: {
      dynamic: 60,
      static: 300,
    },
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
