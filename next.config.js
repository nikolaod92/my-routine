/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['d205bpvrqc9yn1.cloudfront.net'],
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com',
      },
      {
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
}

module.exports = nextConfig
