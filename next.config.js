/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    largePageDataBytes: 1024 * 1024 * 2,
  },
};

module.exports = nextConfig;
