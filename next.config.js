/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.notion.so', // Para imágenes de Notion
      },
    ],
  },
};

module.exports = nextConfig;