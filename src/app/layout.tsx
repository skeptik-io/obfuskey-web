import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Github } from "lucide-react";
import { SiteHeader, SiteFooter } from "@skeptik/ui";
import { ObfuskeyMark } from "@/brand/marks";
import { Wordmark } from "@/components/wordmark";
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

const logo = (
  <>
    <ObfuskeyMark size={26} />
    <Wordmark className="text-lg" />
  </>
);

const nav = [
  { href: "#playground", label: "Playground" },
  { href: "#packing", label: "Packing" },
  { href: "#alphabets", label: "Alphabets" },
  { href: "#install", label: "Install" },
];

const footerLinkGroups = [
  {
    title: "Repositories",
    links: [
      { href: "https://github.com/bnlucas/obfuskey", label: "Python", external: true },
      { href: "https://github.com/bnlucas/obfuskey-js", label: "TypeScript", external: true },
      { href: "https://github.com/bnlucas/obfuskey-rs", label: "Rust", external: true },
      { href: "https://github.com/bnlucas/obfuskey-rb", label: "Ruby", external: true },
    ],
  },
  {
    title: "From",
    links: [
      { href: "https://skeptik.io", label: "skeptik.io", external: true },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${dmSans.variable} ${jetBrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <SiteHeader
          logo={logo}
          nav={nav}
          actions={[
            { href: "https://github.com/bnlucas/obfuskey", label: "GitHub", variant: "outline", external: true, icon: <Github className="h-4 w-4" aria-hidden /> },
          ]}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter
          logo={logo}
          description="Reversible integer obfuscation. Same output in Python, TypeScript, Rust, and Ruby."
          linkGroups={footerLinkGroups}
          legal={{ holder: "Nathan Lucas", notice: "MIT licensed" }}
          trailingText="obfuskey.skeptik.io"
        />
        <Analytics />
      </body>
    </html>
  );
}
