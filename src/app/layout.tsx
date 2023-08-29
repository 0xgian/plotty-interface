import { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              borderRadius: "0.5rem",
              color: "#fff",
              background: "#5B6BDF",
            },
          }}
        />
      </body>
    </html>
  );
}
