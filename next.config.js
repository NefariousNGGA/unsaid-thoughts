/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: "standalone", // Better for Vercel
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname); // ✅ alias for @/
    return config;
  },
};

module.exports = nextConfig;