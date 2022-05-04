/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com', 'cdn.myanimelist.net'],
  }
}

module.exports = nextConfig
