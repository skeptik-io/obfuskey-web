"use client";

import { useMemo, useState } from "react";
import {
  Obfuskey,
  BASE16_ALPHABET,
  BASE32_ALPHABET,
  BASE36_ALPHABET,
  BASE52_ALPHABET,
  BASE56_ALPHABET,
  BASE58_ALPHABET,
  BASE62_ALPHABET,
  BASE64_ALPHABET,
  BASE64_URL_SAFE_ALPHABET,
  BASE94_ALPHABET,
  CROCKFORD_BASE32_ALPHABET,
  ZBASE32_ALPHABET,
  type ObfuskeyAlphabet,
} from "obfuskey";
import { ArrowLeftRight } from "lucide-react";
import { ALPHABETS, findAlphabet } from "@/lib/alphabets";
import { renderObfuskeySnippet, type Lang } from "@/lib/snippets";
import { CopyButton } from "./copy-button";
import { CodeTabs } from "./code-tabs";

const ALPHABET_MAP: Record<string, ObfuskeyAlphabet> = {
  BASE16: BASE16_ALPHABET,
  BASE32: BASE32_ALPHABET,
  BASE36: BASE36_ALPHABET,
  BASE52: BASE52_ALPHABET,
  BASE56: BASE56_ALPHABET,
  BASE58: BASE58_ALPHABET,
  BASE62: BASE62_ALPHABET,
  BASE64: BASE64_ALPHABET,
  BASE64_URL_SAFE: BASE64_URL_SAFE_ALPHABET,
  BASE94: BASE94_ALPHABET,
  CROCKFORD_BASE32: CROCKFORD_BASE32_ALPHABET,
  ZBASE32: ZBASE32_ALPHABET,
};

export function ObfuskeyPlayground() {
  const [alphabetKey, setAlphabetKey] = useState("BASE62");
  const [keyLength, setKeyLength] = useState(8);
  const [multiplier, setMultiplier] = useState("");
  const [integer, setInteger] = useState("1234567890");

  const alphabetMeta = findAlphabet(alphabetKey);

  const { key, error, maxValue } = useMemo(() => {
    try {
      const alpha = ALPHABET_MAP[alphabetKey];
      const mult = multiplier.trim() ? BigInt(multiplier.trim()) : undefined;
      const obf = new Obfuskey(alpha, keyLength, mult);
      const max = obf.maximumValue;
      if (!integer.trim()) {
        return { key: "", error: null, maxValue: max };
      }
      const v = BigInt(integer.trim());
      if (v < 0n) {
        return { key: "", error: "Value must be non-negative.", maxValue: max };
      }
      if (v > max) {
        return {
          key: "",
          error: `Value exceeds maximum (${max.toString()}).`,
          maxValue: max,
        };
      }
      return { key: obf.getKey(v), error: null, maxValue: max };
    } catch (e) {
      return {
        key: "",
        error: e instanceof Error ? e.message : "Unknown error",
        maxValue: 0n,
      };
    }
  }, [alphabetKey, keyLength, multiplier, integer]);

  const snippetRender = (lang: Lang) =>
    renderObfuskeySnippet(lang, {
      alphabet: alphabetMeta,
      keyLength,
      value: integer || "0",
      multiplier,
    });

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      {/* Controls */}
      <div className="rounded-2xl border border-ink-3 bg-ink-1 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="obf-label" htmlFor="alphabet">
              Alphabet
            </label>
            <select
              id="alphabet"
              className="obf-input"
              value={alphabetKey}
              onChange={(e) => setAlphabetKey(e.target.value)}
            >
              {ALPHABETS.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.key} · base {a.base}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="obf-label" htmlFor="keylength">
              Key length
            </label>
            <input
              id="keylength"
              type="number"
              min={1}
              max={64}
              className="obf-input"
              value={keyLength}
              onChange={(e) =>
                setKeyLength(Math.max(1, Math.min(64, Number(e.target.value) || 1)))
              }
            />
          </div>

          <div>
            <label className="obf-label" htmlFor="multiplier">
              Multiplier <span className="text-ink-6">(optional, odd)</span>
            </label>
            <input
              id="multiplier"
              type="text"
              inputMode="numeric"
              placeholder="auto-generated"
              className="obf-input"
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <div className="rounded-md border border-ink-3 bg-ink-2 px-3 py-2 text-[11px] text-ink-6">
              <span className="mono-label mr-2 text-ink-6">Max value</span>
              <span className="font-mono text-ink-8 break-all">
                {maxValue.toString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div>
            <label className="obf-label" htmlFor="integer">
              Integer
            </label>
            <input
              id="integer"
              type="text"
              inputMode="numeric"
              className="obf-input"
              value={integer}
              onChange={(e) => setInteger(e.target.value)}
            />
          </div>

          <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-ink-4 bg-ink-2 text-ink-6">
            <ArrowLeftRight className="h-4 w-4" aria-hidden />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="obf-label mb-0" htmlFor="key">
                Obfuscated key
              </label>
              {key && <CopyButton value={key} />}
            </div>
            <div className="mt-1.5 min-h-[2.5rem] rounded-md border border-ink-4 bg-ink-2 px-3 py-2 font-mono text-sm text-obf break-all">
              {error ? (
                <span className="text-rose-400">{error}</span>
              ) : (
                key || <span className="text-ink-6">—</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Code */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="mono-label text-ink-6">Code</span>
          <span className="mono-label text-ink-6">Cross-language</span>
        </div>
        <CodeTabs render={snippetRender} />
      </div>
    </div>
  );
}
