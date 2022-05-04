/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com', 'cdn.myanimelist.net'],
  },
  ignoreDuringBuilds: true,
}

module.exports = nextConfig
