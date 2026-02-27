import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavbarMain from "@/components/navbar/NavbarMain";
import FooterMain from "@/components/Footer/FooterMain";

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
  title: "Fluxon Infotech | IT Solutions That Drive Growth",
  description:
    "Fluxon Infotech delivers end-to-end IT services, from software development to cloud infrastructure, tailored to your business needs.",
  keywords: [
    "IT services",
    "software development",
    "cloud infrastructure",
    "Fluxon Infotech",
    "web development",
    "digital transformation",
  ],
  authors: [{ name: "Fluxon Infotech" }],
  openGraph: {
    title: "Fluxon Infotech | IT Solutions That Drive Growth",
    description:
      "Transforming ideas into digital reality. End-to-end IT services tailored to your business needs.",
    type: "website",
    siteName: "Fluxon Infotech",
  },
  icons: {
    icon: "/Fluxon_Logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${plusJakarta.variable} antialiased bg-white text-[#3d3d3d]`}
      >
        <NavbarMain />
        <main className="pt-[90px]">{children}</main>
        <FooterMain />
      </body>
    </html>
  );
}