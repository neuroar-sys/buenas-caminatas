/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com', // Para las imágenes de testimonios desde S3
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.notion.so', // Para imágenes de Notion
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Para imágenes de placeholder
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;