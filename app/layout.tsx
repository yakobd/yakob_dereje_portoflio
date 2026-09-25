import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { MotionProvider } from "@/components/Reveal";
import { themeInitScript } from "@/lib/theme";
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
      // The theme script adds .dark before hydration.
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        {/* First in <body>, so it runs before anything paints (no theme flash).
            Not in <head>: Next 14 drops a layout <head> on notFound() renders. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-full bg-foreground text-sm font-medium text-background focus:not-sr-only focus:fixed focus:px-5 focus:py-3 focus:left-4 focus:top-3 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <MotionProvider>{children}</MotionProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
