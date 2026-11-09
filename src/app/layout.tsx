import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavbarMain from "@/components/navbar/NavbarMain";
import FooterMain from "@/components/Footer/FooterMain";
import SplashScreen from "@/components/SplashScreen";
import StructuredData from "@/components/StructuredData";
import { SHARE_IMAGE } from "@/lib/seo";
import { SITE } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Fluxon Infotech | IT Company in Morbi, Gujarat",
    template: "%s | Fluxon Infotech",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "IT company in Morbi",
    "best IT company in Morbi",
    "website development in Morbi",
    "website design in Morbi",
    "web developer in Morbi",
    "software company in Morbi",
    "IT company in Gujarat",
    "website development company in Gujarat",
    "web development",
    "AI solutions",
    "cloud solutions",
    "Fluxon Infotech",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    url: "/",
    title: "Fluxon Infotech | IT Company in Morbi, Gujarat",
    description: SITE.description,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluxon Infotech | IT Company in Morbi, Gujarat",
    description: SITE.description,
    images: [SHARE_IMAGE.url],
  },
  // Google Search Console "HTML tag" verification: set GOOGLE_SITE_VERIFICATION in Vercel, then redeploy.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Morbi, Gujarat, India",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${dmSans.variable} ${plusJakarta.variable} antialiased bg-white text-[#3d3d3d]`}
      >
        <StructuredData />
        <SplashScreen>
          <NavbarMain />
          <main className="pt-[90px]">{children}</main>
          <FooterMain />
        </SplashScreen>
      </body>
    </html>
  );
}
