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
            value: "localhost",
          },
        ],
        source: "/:path*",
        destination: "/landing/:path*",
      },
      {
        has: [
          {
            type: "host",
            value: "app.localhost",
          },
        ],
        source: "/:path*",
        destination: "/app/:path*",
      },
      {
        has: [
          {
            type: "host",
            value: "plotty.fi",
          },
        ],
        source: "/:path*",
        destination: "/landing/:path*",
      },
      {
        has: [
          {
            type: "host",
            value: "app.plotty.fi",
          },
        ],
        source: "/:path*",
        destination: "/app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
