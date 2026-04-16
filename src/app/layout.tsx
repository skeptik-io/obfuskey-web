import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Obfuskey — Reversible integer obfuscation for Python, TS, Rust, and Ruby",
    template: "%s · Obfuskey",
  },
  description:
    "A small, cross-language library for turning integers into short, uniform keys — and back. Identical output in Python, TypeScript, Rust, and Ruby.",
  metadataBase: new URL("https://obfuskey.skeptik.io"),
  openGraph: {
    type: "website",
    url: "https://obfuskey.skeptik.io",
    title: "Obfuskey — Reversible integer obfuscation",
    description:
      "Turn integers into short, uniform keys — and back. Identical output across Python, TypeScript, Rust, and Ruby.",
    siteName: "Obfuskey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obfuskey — Reversible integer obfuscation",
    description:
      "Turn integers into short, uniform keys — and back. Identical output across Python, TypeScript, Rust, and Ruby.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetBrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
