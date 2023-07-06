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
          /** To set the focus path, modify the NEXT_PUBLIC_PREVIEW_PATH */
          {
            source: "/:path*",
            destination: `${
              process.env.NEXT_PUBLIC_PREVIEW_PATH ?? "/app"
            }/:path*`,
          },
        ];
  },
};

module.exports = nextConfig;
