/* eslint-disable @next/next/no-page-custom-font, @next/next/google-font-display */
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sayee-portfolio.pages.dev'),
  title: "Sayee Kinjavdekar | Design that Speaks",
  description: "A loud, bold, and impactful design portfolio by Sayee Kinjavdekar.",
  openGraph: {
    title: "Sayee Kinjavdekar | Design that Speaks",
    description: "A loud, bold, and impactful design portfolio by Sayee Kinjavdekar.",
    url: "https://sayee-portfolio.pages.dev",
    siteName: "Sayee Kinjavdekar Portfolio",
    images: [
      {
        url: "/sayee-home-bg.png",
        width: 1200,
        height: 630,
        alt: "Sayee Kinjavdekar Portfolio",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayee Kinjavdekar | Design that Speaks",
    description: "A loud, bold, and impactful design portfolio by Sayee Kinjavdekar.",
    images: ["/sayee-home-bg.png"],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700,800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
          rel="stylesheet"
        />

      </head>
      <body
        className={`${plusJakartaSans.variable} ${caveat.variable} font-body-md text-brand-black bg-brand-cream overflow-x-hidden selection:bg-brand-coral selection:text-white antialiased`}
      >
        <Toaster richColors position="bottom-right" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
