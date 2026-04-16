export type AlphabetMeta = {
  key: string;
  jsConst: string;
  pyConst: string;
  rsConst: string;
  rbConst: string;
  chars: string;
  base: number;
  note?: string;
};

const rb = (k: string) => `Obfuskey::Alphabets::${k}`;

export const ALPHABETS: AlphabetMeta[] = [
  {
    key: "BASE16",
    jsConst: "BASE16_ALPHABET",
    pyConst: "alphabets.BASE16",
    rsConst: "alphabets::BASE16",
    rbConst: rb("BASE16"),
    chars: "0123456789ABCDEF",
    base: 16,
    note: "Hex.",
  },
  {
    key: "BASE32",
    jsConst: "BASE32_ALPHABET",
    pyConst: "alphabets.BASE32",
    rsConst: "alphabets::BASE32",
    rbConst: rb("BASE32"),
    chars: "234567ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    base: 32,
  },
  {
    key: "BASE36",
    jsConst: "BASE36_ALPHABET",
    pyConst: "alphabets.BASE36",
    rsConst: "alphabets::BASE36",
    rbConst: rb("BASE36"),
    chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    base: 36,
    note: "Digits + uppercase.",
  },
  {
    key: "BASE52",
    jsConst: "BASE52_ALPHABET",
    pyConst: "alphabets.BASE52",
    rsConst: "alphabets::BASE52",
    rbConst: rb("BASE52"),
    chars: "0123456789BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz",
    base: 52,
    note: "Consonants only.",
  },
  {
    key: "BASE56",
    jsConst: "BASE56_ALPHABET",
    pyConst: "alphabets.BASE56",
    rsConst: "alphabets::BASE56",
    rbConst: rb("BASE56"),
    chars: "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz",
    base: 56,
    note: "No ambiguous chars.",
  },
  {
    key: "BASE58",
    jsConst: "BASE58_ALPHABET",
    pyConst: "alphabets.BASE58",
    rsConst: "alphabets::BASE58",
    rbConst: rb("BASE58"),
    chars: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
    base: 58,
    note: "Bitcoin-style.",
  },
  {
    key: "BASE62",
    jsConst: "BASE62_ALPHABET",
    pyConst: "alphabets.BASE62",
    rsConst: "alphabets::BASE62",
    rbConst: rb("BASE62"),
    chars:
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    base: 62,
    note: "Digits + alpha.",
  },
  {
    key: "BASE64",
    jsConst: "BASE64_ALPHABET",
    pyConst: "alphabets.BASE64",
    rsConst: "alphabets::BASE64",
    rbConst: rb("BASE64"),
    chars:
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/",
    base: 64,
  },
  {
    key: "BASE64_URL_SAFE",
    jsConst: "BASE64_URL_SAFE_ALPHABET",
    pyConst: "alphabets.BASE64_URL_SAFE",
    rsConst: "alphabets::BASE64_URL_SAFE",
    rbConst: rb("BASE64_URL_SAFE"),
    chars:
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_",
    base: 64,
    note: "URL-safe.",
  },
  {
    key: "BASE94",
    jsConst: "BASE94_ALPHABET",
    pyConst: "alphabets.BASE94",
    rsConst: "alphabets::BASE94",
    rbConst: rb("BASE94"),
    chars:
      "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
    base: 94,
    note: "All printable ASCII.",
  },
  {
    key: "CROCKFORD_BASE32",
    jsConst: "CROCKFORD_BASE32_ALPHABET",
    pyConst: "alphabets.CROCKFORD_BASE32",
    rsConst: "alphabets::CROCKFORD_BASE32",
    rbConst: rb("CROCKFORD_BASE32"),
    chars: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",
    base: 32,
    note: "Crockford.",
  },
  {
    key: "ZBASE32",
    jsConst: "ZBASE32_ALPHABET",
    pyConst: "alphabets.ZBASE32",
    rsConst: "alphabets::ZBASE32",
    rbConst: rb("ZBASE32"),
    chars: "ybndrfg8ejkmcpqxot1uwisza345h769",
    base: 32,
    note: "z-base32.",
  },
];

export function findAlphabet(key: string): AlphabetMeta {
  const a = ALPHABETS.find((x) => x.key === key);
  if (!a) throw new Error(`Unknown alphabet: ${key}`);
  return a;
}

/** Minimum key length needed to cover `totalBits` given an alphabet `base`. */
export function minKeyLength(totalBits: number, base: number): number {
  if (base <= 1 || totalBits <= 0) return 1;
  return Math.ceil(totalBits / Math.log2(base));
}
