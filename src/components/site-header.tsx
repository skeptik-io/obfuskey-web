import Link from "next/link";
import { Github } from "lucide-react";
import { ObfuskeyMark } from "@/brand/marks";
import { Wordmark } from "./wordmark";

const NAV = [
  { label: "Playground", href: "#playground" },
  { label: "Packing", href: "#packing" },
  { label: "Alphabets", href: "#alphabets" },
  { label: "Install", href: "#install" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-3 bg-ink-0/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="obfuskey home"
        >
          <ObfuskeyMark size={26} />
          <Wordmark className="text-lg" />
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-ink-7 transition-colors hover:text-ink-9"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="https://github.com/bnlucas/obfuskey"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-ink-4 px-3 py-1.5 text-sm text-ink-8 transition-colors hover:border-ink-6 hover:text-ink-10"
          >
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}
