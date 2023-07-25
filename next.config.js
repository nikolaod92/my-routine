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
      {
        hostname: 'btblvqgynzaghxyzqsry.supabase.co',
      },
      { hostname: 'edb-4rme8.ondigitalocean.app' },
    ],
  },
}

module.exports = nextConfig
