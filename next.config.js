/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Better for Vercel
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig