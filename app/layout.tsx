import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

// Fraunces is a variable font: loading it without fixed weights keeps the
// full weight axis available (we use 340–600), plus the optical-size axis.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    title: siteTitle,
    description: siteDescription,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexSans.variable} scroll-pt-16 scroll-smooth`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
