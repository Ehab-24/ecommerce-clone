/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['loremflickr.com', 'res.cloudinary.com']
  },
  reactStrictMode: false,
  esmExternals: false,
}

module.exports = nextConfig
