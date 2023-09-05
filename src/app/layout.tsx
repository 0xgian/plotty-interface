import RootInitializer from "components/RootInitializer";
import { Metadata } from "next";
import { ReactNode } from "react";
import "styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Plotty",
    default: "Plotty | Plot Approachable On-chain Data",
  },
  description: "Plot Approachable On-chain Data",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
        <link rel="manifest" href="/manifest.json" />

        {/* <!-- facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plotty.fi/" />
        <meta property="og:image" content="/images/preview.png" />

        {/* <!-- twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://plotty.fi/" />
        <meta property="twitter:image" content="/images/preview.png" />
      </head>

      <body>
        {children}
        <RootInitializer />
      </body>
    </html>
  );
}
