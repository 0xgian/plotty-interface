/** @type {import('next').NextConfig} */
const nextConfig = {
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
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_API_HOST,
        pathname: "/media/**",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);
