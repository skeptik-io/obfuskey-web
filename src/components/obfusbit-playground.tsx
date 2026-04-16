"use client";

import { useMemo, useState } from "react";
import {
  Obfuskey,
  Obfusbit,
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
import { Plus, Trash2 } from "lucide-react";
import { ALPHABETS, findAlphabet, minKeyLength } from "@/lib/alphabets";
import { renderObfusbitSnippet, type Lang, type SchemaField } from "@/lib/snippets";
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

const DEFAULT_SCHEMA: SchemaField[] = [
  { name: "category_id", bits: 4 },
  { name: "item_id", bits: 20 },
  { name: "status", bits: 3 },
];

const DEFAULT_VALUES: Record<string, string> = {
  category_id: "5",
  item_id: "123456",
  status: "1",
};

export function ObfusbitPlayground() {
  const [alphabetKey, setAlphabetKey] = useState("BASE58");
  const [schema, setSchema] = useState<SchemaField[]>(DEFAULT_SCHEMA);
  const [values, setValues] =
    useState<Record<string, string>>(DEFAULT_VALUES);
  const [keyLength, setKeyLength] = useState<number>(5);

  const alphabetMeta = findAlphabet(alphabetKey);
  const totalBits = schema.reduce((s, f) => s + (f.bits || 0), 0);
  const minLen = minKeyLength(totalBits, alphabetMeta.base);

  const { packedBig, packedKey, unpacked, error } = useMemo(() => {
    try {
      const alpha = ALPHABET_MAP[alphabetKey];
      const obf = new Obfuskey(alpha, keyLength);
      const schemaForLib = schema.map((f) => ({
        name: f.name,
        bits: BigInt(f.bits),
      }));
      const packer = new Obfusbit(schemaForLib, obf);

      const libValues: Record<string, bigint> = {};
      for (const f of schema) {
        const raw = (values[f.name] ?? "0").trim() || "0";
        libValues[f.name] = BigInt(raw);
      }

      const big = packer.pack(libValues, false) as bigint;
      const key = packer.pack(libValues, true) as string;
      const back = packer.unpack(key, true);

      const unpackedObj: Record<string, string> = {};
      for (const [k, v] of Object.entries(back)) {
        unpackedObj[k] = (v as bigint).toString();
      }

      return { packedBig: big, packedKey: key, unpacked: unpackedObj, error: null };
    } catch (e) {
      return {
        packedBig: 0n,
        packedKey: "",
        unpacked: null,
        error: e instanceof Error ? e.message : "Unknown error",
      };
    }
  }, [alphabetKey, keyLength, schema, values]);

  const addField = () => {
    const n = schema.length + 1;
    const name = `field_${n}`;
    setSchema([...schema, { name, bits: 8 }]);
    setValues({ ...values, [name]: "0" });
  };

  const removeField = (idx: number) => {
    const removed = schema[idx];
    setSchema(schema.filter((_, i) => i !== idx));
    const next = { ...values };
    delete next[removed.name];
    setValues(next);
  };

  const updateField = (idx: number, patch: Partial<SchemaField>) => {
    const prev = schema[idx];
    const next = { ...prev, ...patch };
    const updated = schema.map((f, i) => (i === idx ? next : f));
    setSchema(updated);
    if (patch.name && patch.name !== prev.name) {
      const vs = { ...values };
      vs[next.name] = vs[prev.name] ?? "0";
      delete vs[prev.name];
      setValues(vs);
    }
  };

  const snippetRender = (lang: Lang) =>
    renderObfusbitSnippet(lang, {
      alphabet: alphabetMeta,
      keyLength,
      schema,
      values,
    });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        {/* Alphabet / key length */}
        <div className="rounded-2xl border border-ink-3 bg-ink-1 p-6">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
            <div>
              <label className="obf-label" htmlFor="bit-alphabet">
                Alphabet
              </label>
              <select
                id="bit-alphabet"
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
              <label className="obf-label" htmlFor="bit-keylen">
                Key length
              </label>
              <input
                id="bit-keylen"
                type="number"
                min={1}
                max={128}
                className="obf-input w-28"
                value={keyLength}
                onChange={(e) =>
                  setKeyLength(
                    Math.max(1, Math.min(128, Number(e.target.value) || 1)),
                  )
                }
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => setKeyLength(minLen)}
                className="h-9 rounded-md border border-ink-4 bg-ink-2 px-3 text-xs text-ink-7 transition-colors hover:border-obf hover:text-ink-10"
              >
                Use min ({minLen})
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="mono-label text-ink-6">
              Total bits: <span className="text-ink-8">{totalBits}</span>
            </span>
            <span className="mono-label text-ink-6">
              Min key length: <span className="text-ink-8">{minLen}</span>
            </span>
          </div>
        </div>

        {/* Schema fields */}
        <div className="rounded-2xl border border-ink-3 bg-ink-1 p-6">
          <div className="flex items-center justify-between">
            <span className="mono-label text-ink-6">Schema</span>
            <button
              type="button"
              onClick={addField}
              className="inline-flex h-7 items-center gap-1.5 rounded-md border border-ink-4 bg-ink-2 px-2 text-[11px] text-ink-8 transition-colors hover:border-obf hover:text-ink-10"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Add field
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {schema.map((f, idx) => {
              const maxForBits = (1n << BigInt(f.bits)) - 1n;
              const vStr = values[f.name] ?? "0";
              let fieldErr: string | null = null;
              try {
                const vv = BigInt(vStr || "0");
                if (vv < 0n) fieldErr = "Negative.";
                else if (vv > maxForBits) fieldErr = `> ${maxForBits}`;
              } catch {
                fieldErr = "Invalid.";
              }
              return (
                <div
                  key={idx}
                  className="grid grid-cols-[1.3fr_0.6fr_1.3fr_auto] gap-2"
                >
                  <input
                    className="obf-input"
                    value={f.name}
                    placeholder="name"
                    onChange={(e) => updateField(idx, { name: e.target.value })}
                  />
                  <input
                    type="number"
                    min={1}
                    max={256}
                    className="obf-input"
                    value={f.bits}
                    title="bits"
                    onChange={(e) =>
                      updateField(idx, {
                        bits: Math.max(
                          1,
                          Math.min(256, Number(e.target.value) || 1),
                        ),
                      })
                    }
                  />
                  <div>
                    <input
                      className="obf-input"
                      value={vStr}
                      placeholder="value"
                      onChange={(e) =>
                        setValues({ ...values, [f.name]: e.target.value })
                      }
                    />
                    {fieldErr && (
                      <div className="mt-1 text-[10.5px] text-rose-400 font-mono">
                        {fieldErr}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(idx)}
                    disabled={schema.length <= 1}
                    aria-label="Remove field"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-4 bg-ink-2 text-ink-6 transition-colors hover:border-rose-500 hover:text-rose-400 disabled:opacity-40 disabled:hover:border-ink-4 disabled:hover:text-ink-6"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-ink-3 bg-ink-1 p-6">
          {error ? (
            <div className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </div>
          ) : (
            <div className="space-y-3">
              <OutputRow
                label="Packed integer"
                value={packedBig.toString()}
                mono
              />
              <OutputRow label="Obfuscated key" value={packedKey} accent mono />
              {unpacked && (
                <div>
                  <span className="mono-label text-ink-6">Unpacked</span>
                  <div className="mt-1.5 rounded-md border border-ink-3 bg-ink-2 px-3 py-2 font-mono text-[12.5px] leading-relaxed text-ink-8">
                    {Object.entries(unpacked).map(([k, v]) => (
                      <div key={k}>
                        <span className="text-ink-6">{k}:</span>{" "}
                        <span className="text-ink-9">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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

function OutputRow({
  label,
  value,
  accent,
  mono,
}: {
  label: string;
  value: string;
  accent?: boolean;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="mono-label text-ink-6">{label}</span>
        {value && <CopyButton value={value} />}
      </div>
      <div
        className={
          "mt-1.5 min-h-[2.25rem] rounded-md border border-ink-4 bg-ink-2 px-3 py-2 text-sm break-all " +
          (mono ? "font-mono " : "") +
          (accent ? "text-obf" : "text-ink-9")
        }
      >
        {value || <span className="text-ink-6">—</span>}
      </div>
    </div>
  );
}
