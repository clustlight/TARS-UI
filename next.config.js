/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['apiv2.twitcasting.tv', 'imagegw02.twitcasting.tv']
  }
}

module.exports = nextConfig
