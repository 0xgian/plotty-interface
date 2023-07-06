/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    const envUrl = process.env.NEXT_PUBLIC_URL;
    return envUrl
      ? [
          {
            has: [
              {
                type: "host",
                value: envUrl,
              },
            ],
            source: "/:path*",
            destination: "/landing/:path*",
          },
          {
            has: [
              {
                type: "host",
                value: `app.${envUrl}`,
              },
            ],
            source: "/:path*",
            destination: "/app/:path*",
          },
        ]
      : [
          {
            source: "/app/:path*",
            destination: "/:path*",
          },
        ];
  },
};

module.exports = nextConfig;
