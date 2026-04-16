import type { AlphabetMeta } from "./alphabets";

export type Lang = "py" | "ts" | "rs" | "rb";

export const LANGS: { key: Lang; label: string; color: string }[] = [
  { key: "py", label: "Python", color: "var(--color-lang-py)" },
  { key: "ts", label: "TypeScript", color: "var(--color-lang-ts)" },
  { key: "rs", label: "Rust", color: "var(--color-lang-rs)" },
  { key: "rb", label: "Ruby", color: "var(--color-lang-rb)" },
];

export type ObfuskeySnippetInput = {
  alphabet: AlphabetMeta;
  keyLength: number;
  value: string;
  multiplier?: string;
};

export function renderObfuskeySnippet(
  lang: Lang,
  { alphabet, keyLength, value, multiplier }: ObfuskeySnippetInput,
): string {
  const mult = multiplier?.trim() || "";

  if (lang === "py") {
    return [
      "from obfuskey import Obfuskey, alphabets",
      "",
      mult
        ? `obf = Obfuskey(${alphabet.pyConst}, key_length=${keyLength}, multiplier=${mult})`
        : `obf = Obfuskey(${alphabet.pyConst}, key_length=${keyLength})`,
      "",
      `key = obf.get_key(${value || 0})`,
      "value = obf.get_value(key)",
    ].join("\n");
  }

  if (lang === "ts") {
    return [
      `import { Obfuskey, ${alphabet.jsConst} } from 'obfuskey';`,
      "",
      mult
        ? `const obf = new Obfuskey(${alphabet.jsConst}, ${keyLength}, ${mult}n);`
        : `const obf = new Obfuskey(${alphabet.jsConst}, ${keyLength});`,
      "",
      `const key = obf.getKey(${value || 0}n);`,
      "const value = obf.getValue(key);",
    ].join("\n");
  }

  if (lang === "rs") {
    return [
      "use obfuskey::{alphabets, Obfuskey};",
      "",
      mult
        ? `let mut obf = Obfuskey::new(${alphabet.rsConst}, Some(${keyLength}), Some(${mult})).unwrap();`
        : `let mut obf = Obfuskey::new(${alphabet.rsConst}, Some(${keyLength}), None).unwrap();`,
      "",
      `let key = obf.get_key_u64(${value || 0}).unwrap();`,
      "let value = obf.get_value_u64(&key).unwrap();",
    ].join("\n");
  }

  // ruby
  return [
    'require "obfuskey"',
    "",
    mult
      ? `obf = Obfuskey.new(${alphabet.rbConst}, key_length: ${keyLength}, multiplier: ${mult})`
      : `obf = Obfuskey.new(${alphabet.rbConst}, key_length: ${keyLength})`,
    "",
    `key = obf.get_key(${value || 0})`,
    "value = obf.get_value(key)",
  ].join("\n");
}

export type SchemaField = { name: string; bits: number };

export type ObfusbitSnippetInput = {
  alphabet: AlphabetMeta;
  keyLength: number;
  schema: SchemaField[];
  values: Record<string, string>;
};

export function renderObfusbitSnippet(
  lang: Lang,
  { alphabet, keyLength, schema, values }: ObfusbitSnippetInput,
): string {
  if (lang === "py") {
    const schemaLines = schema
      .map((f) => `    {"name": "${f.name}", "bits": ${f.bits}},`)
      .join("\n");
    const valueLines = schema
      .map((f) => `    "${f.name}": ${values[f.name] || 0},`)
      .join("\n");
    return [
      "from obfuskey import Obfuskey, Obfusbit, alphabets",
      "",
      "schema = [",
      schemaLines,
      "]",
      "",
      `obf = Obfuskey(${alphabet.pyConst}, key_length=${keyLength})`,
      "packer = Obfusbit(schema, obfuskey=obf)",
      "",
      "values = {",
      valueLines,
      "}",
      "",
      "key = packer.pack(values, obfuscate=True)",
      "unpacked = packer.unpack(key, obfuscated=True)",
    ].join("\n");
  }

  if (lang === "ts") {
    const schemaLines = schema
      .map((f) => `  { name: '${f.name}', bits: ${f.bits}n },`)
      .join("\n");
    const valueLines = schema
      .map((f) => `  ${f.name}: ${values[f.name] || 0}n,`)
      .join("\n");
    return [
      `import { Obfuskey, Obfusbit, ${alphabet.jsConst} } from 'obfuskey';`,
      "",
      "const schema = [",
      schemaLines,
      "];",
      "",
      `const obf = new Obfuskey(${alphabet.jsConst}, ${keyLength});`,
      "const packer = new Obfusbit(schema, obf);",
      "",
      "const values = {",
      valueLines,
      "};",
      "",
      "const key = packer.pack(values, true) as string;",
      "const unpacked = packer.unpack(key, true);",
    ].join("\n");
  }

  if (lang === "rs") {
    const schemaLines = schema
      .map(
        (f) =>
          `    FieldSchema { name: "${f.name}".to_string(), bits: ${f.bits} },`,
      )
      .join("\n");
    const valueLines = schema
      .map(
        (f) => `values.insert("${f.name}".to_string(), ${values[f.name] || 0}u64);`,
      )
      .join("\n");
    return [
      "use obfuskey::{alphabets, FieldSchema, Obfusbit, Obfuskey, PackedU64, UnpackDataU64};",
      "use std::collections::HashMap;",
      "",
      "let schema = vec![",
      schemaLines,
      "];",
      "",
      `let obf = Obfuskey::new(${alphabet.rsConst}, Some(${keyLength}), None).unwrap();`,
      "let mut packer = Obfusbit::new(schema, Some(obf)).unwrap();",
      "",
      "let mut values = HashMap::new();",
      valueLines,
      "",
      "let packed = packer.pack_u64(&values, true).unwrap();",
      "let key = match packed { PackedU64::Key(k) => k, _ => unreachable!() };",
      "let unpacked = packer.unpack_u64(UnpackDataU64::Key(&key), true).unwrap();",
    ].join("\n");
  }

  // ruby
  const schemaLines = schema
    .map((f) => `  { name: "${f.name}", bits: ${f.bits} },`)
    .join("\n");
  const valueLines = schema
    .map((f) => `  "${f.name}" => ${values[f.name] || 0},`)
    .join("\n");
  return [
    'require "obfuskey"',
    "",
    "schema = [",
    schemaLines,
    "]",
    "",
    `obf = Obfuskey.new(${alphabet.rbConst}, key_length: ${keyLength})`,
    "packer = Obfusbit.new(schema, obfuskey: obf)",
    "",
    "values = {",
    valueLines,
    "}",
    "",
    "key = packer.pack(values, obfuscate: true)",
    "unpacked = packer.unpack(key, obfuscated: true)",
  ].join("\n");
}
