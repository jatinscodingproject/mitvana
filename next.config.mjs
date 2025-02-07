/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mitvana.com',
        pathname: '/uploads/**', // Adjust based on your API response
      },
      {
        protocol: 'http',
        hostname: '89.116.33.140',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
