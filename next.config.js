/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        has: [
          {
            type: "host",
            value: process.env.NEXT_PUBLIC_VERCEL_URL,
          },
        ],
        source: "/:path*",
        destination: "/landing/:path*",
      },
      {
        has: [
          {
            type: "host",
            value: `app.${process.env.NEXT_PUBLIC_VERCEL_URL}`,
          },
        ],
        source: "/:path*",
        destination: "/app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
