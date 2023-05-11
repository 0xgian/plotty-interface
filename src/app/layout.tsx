import "styles/globals.css";

export const metadata = {
  title: "Plotty | Invest, Manage, Inspire and Earn",
  description:
    "A decentralized suite of products helping you maximize earnings by creating, managing, exploring, or sharing your yield strategy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B0C13" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link rel="manifest" href="/manifest.json" /> */}

        {/* <!-- facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plotty.fi/" />
        <meta property="og:image" content="/images/preview.png" />

        {/* <!-- twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://plotty.fi/" />
        <meta property="twitter:image" content="/images/preview.png" />
      </head>

      <body>{children}</body>
    </html>
  );
}
