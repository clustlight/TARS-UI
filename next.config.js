/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['apiv2.twitcasting.tv', 'imagegw02.twitcasting.tv']
  }
}

module.exports = nextConfig
