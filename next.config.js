/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.imgur.com','tailwindui.com', 'github.com'],
  },
}

module.exports = nextConfig
