import { ALPHABETS } from "@/lib/alphabets";

export function AlphabetReference() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-3 bg-ink-1">
      <div className="grid grid-cols-[1.1fr_0.4fr_2fr] gap-4 border-b border-ink-3 bg-ink-2 px-5 py-3">
        <span className="mono-label text-ink-6">Alphabet</span>
        <span className="mono-label text-ink-6">Base</span>
        <span className="mono-label text-ink-6">Characters</span>
      </div>
      <ul className="divide-y divide-ink-3">
        {ALPHABETS.map((a) => (
          <li
            key={a.key}
            className="grid grid-cols-[1.1fr_0.4fr_2fr] items-start gap-4 px-5 py-3.5"
          >
            <div>
              <div className="font-mono text-[13px] text-ink-9">{a.key}</div>
              {a.note && (
                <div className="mt-0.5 text-[11px] text-ink-6">{a.note}</div>
              )}
            </div>
            <div className="font-mono text-[13px] text-obf">{a.base}</div>
            <div className="font-mono text-[12px] leading-relaxed text-ink-7 break-all">
              {a.chars}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
