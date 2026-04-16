import Link from "next/link";
import { ObfuskeyMark, SkeptikMark } from "@/brand/marks";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-3 bg-ink-0">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <ObfuskeyMark size={26} />
              <Wordmark className="text-lg" />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ink-6">
              Reversible integer obfuscation. Same output in Python,
              TypeScript, Rust, and Ruby.
            </p>
          </div>

          <div>
            <h3 className="mono-label text-ink-6">Repositories</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="https://github.com/bnlucas/obfuskey"
                  className="text-sm text-ink-8 transition-colors hover:text-ink-10"
                >
                  Python
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/bnlucas/obfuskey-js"
                  className="text-sm text-ink-8 transition-colors hover:text-ink-10"
                >
                  TypeScript
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/bnlucas/obfuskey-rs"
                  className="text-sm text-ink-8 transition-colors hover:text-ink-10"
                >
                  Rust
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/bnlucas/obfuskey-rb"
                  className="text-sm text-ink-8 transition-colors hover:text-ink-10"
                >
                  Ruby
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mono-label text-ink-6">From</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="https://skeptik.io"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-8 transition-colors hover:text-ink-10"
                >
                  <SkeptikMark size={14} />
                  skeptik.io
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-ink-3 pt-6 text-xs text-ink-6 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Nathan Lucas. MIT licensed.</span>
          <span className="font-mono">obfuskey.skeptik.io</span>
        </div>
      </div>
    </footer>
  );
}
