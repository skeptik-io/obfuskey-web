import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { ObfuskeyMark } from "@/brand/marks";
import { ObfuskeyPlayground } from "@/components/obfuskey-playground";
import { ObfusbitPlayground } from "@/components/obfusbit-playground";
import { AlphabetReference } from "@/components/alphabet-reference";
import { InstallTabs } from "@/components/install-tabs";

const FEATURES = [
  {
    label: "Reversible",
    title: "It's encoding, not hashing.",
    body:
      "Every key round-trips back to its original integer. Pure arithmetic — no lookup tables, no secret state beyond the multiplier.",
  },
  {
    label: "Uniform length",
    title: "Every key is the same width.",
    body:
      "Pick an alphabet and a length; every value from 0 to the max produces a key of exactly that many characters. No leading-zero weirdness.",
  },
  {
    label: "Cross-language",
    title: "Same bytes in Python, TS, Rust, and Ruby.",
    body:
      "A key encoded in one language decodes cleanly in the other three, given the same alphabet, length, and multiplier.",
  },
  {
    label: "Bit-packed IDs",
    title: "Pack multiple fields into one key.",
    body:
      "Obfusbit lets you describe a schema of named integer fields and pack them into a single short, obfuscated string.",
  },
];

const REPOS = [
  {
    lang: "Python",
    pkg: "obfuskey",
    href: "https://github.com/bnlucas/obfuskey",
    color: "var(--color-lang-py)",
  },
  {
    lang: "TypeScript",
    pkg: "obfuskey",
    href: "https://github.com/bnlucas/obfuskey-js",
    color: "var(--color-lang-ts)",
  },
  {
    lang: "Rust",
    pkg: "obfuskey",
    href: "https://github.com/bnlucas/obfuskey-rs",
    color: "var(--color-lang-rs)",
  },
  {
    lang: "Ruby",
    pkg: "obfuskey",
    href: "https://github.com/bnlucas/obfuskey-rb",
    color: "var(--color-lang-rb)",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 0%, color-mix(in srgb, var(--color-obf) 14%, transparent), transparent 65%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-20 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-3 bg-ink-1 px-3 py-1">
              <ObfuskeyMark size={14} />
              <span className="mono-label text-ink-7">
                Integer obfuscation · Python · TS · Rust · Ruby
              </span>
            </div>
            <h1 className="display text-5xl text-ink-10 md:text-6xl lg:text-[4.75rem]">
              Integers in,
              <br />
              short keys{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-obf-bright), var(--color-obf-deep))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                out.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-7">
              A tiny, reversible encoder for turning integers into fixed-length
              keys — and back. Same output in Python, TypeScript, Rust, and
              Ruby.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#playground"
                className="rounded-md bg-obf px-4 py-2 text-sm font-semibold text-ink-0 transition-colors hover:bg-obf-bright"
              >
                Try it live
              </Link>
              <Link
                href="https://github.com/bnlucas/obfuskey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-ink-4 px-4 py-2 text-sm font-medium text-ink-9 transition-colors hover:border-ink-6"
              >
                <Github className="h-4 w-4" aria-hidden />
                View source
              </Link>
            </div>
          </div>

          {/* Language strip */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-3 bg-ink-3 md:grid-cols-4">
            {REPOS.map((r) => (
              <Link
                key={r.lang}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 bg-ink-1 px-4 py-4 transition-colors hover:bg-ink-2"
              >
                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: r.color }}
                  >
                    {r.lang}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-ink-6">
                    {r.pkg}
                  </div>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 text-ink-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-9"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Install */}
      <section
        id="install"
        className="relative border-t border-ink-3 py-20 scroll-mt-20"
      >
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <div className="mono-label text-obf">Install</div>
            <h2 className="display mt-3 text-3xl text-ink-10 md:text-4xl">
              Add it to your project.
            </h2>
          </div>
          <div className="mt-8">
            <InstallTabs />
          </div>
        </div>
      </section>

      {/* Playground */}
      <section
        id="playground"
        className="relative border-t border-ink-3 py-20 scroll-mt-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mono-label text-obf">Playground</div>
            <h2 className="display mt-3 text-4xl text-ink-10 md:text-5xl">
              Encode an integer.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-7">
              Tweak the alphabet, key length, and multiplier. The code tabs
              regenerate in every language as you edit.
            </p>
          </div>

          <div className="mt-10">
            <ObfuskeyPlayground />
          </div>
        </div>
      </section>

      {/* Packing (Obfusbit) */}
      <section
        id="packing"
        className="relative border-t border-ink-3 py-20 scroll-mt-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mono-label text-obf">Bit-packing</div>
            <h2 className="display mt-3 text-4xl text-ink-10 md:text-5xl">
              Pack multiple fields.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-7">
              Describe a schema of named integer fields. Obfusbit packs them
              into a single big integer, then runs it through Obfuskey for a
              compact string.
            </p>
          </div>

          <div className="mt-10">
            <ObfusbitPlayground />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-ink-3 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mono-label text-obf">What it is</div>
            <h2 className="display mt-3 text-4xl text-ink-10 md:text-5xl">
              Encoding, not hashing.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink-3 bg-ink-3 md:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.label} className="bg-ink-1 p-8">
                <div className="mono-label text-obf">{f.label}</div>
                <h3 className="mt-2 text-lg font-semibold text-ink-10">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-7">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alphabets */}
      <section
        id="alphabets"
        className="border-t border-ink-3 py-20 scroll-mt-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mono-label text-obf">Reference</div>
            <h2 className="display mt-3 text-4xl text-ink-10 md:text-5xl">
              Built-in alphabets.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-7">
              Or pass your own string — any unique-character set becomes a
              valid alphabet.
            </p>
          </div>

          <div className="mt-10">
            <AlphabetReference />
          </div>
        </div>
      </section>
    </>
  );
}
