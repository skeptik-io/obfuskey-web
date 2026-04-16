"use client";

import { useState } from "react";
import { LANGS, type Lang } from "@/lib/snippets";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/cn";

export function CodeTabs({
  render,
}: {
  render: (lang: Lang) => string;
}) {
  const [active, setActive] = useState<Lang>("ts");
  const code = render(active);

  return (
    <div className="overflow-hidden rounded-xl border border-ink-3 bg-ink-1">
      <div className="flex items-center justify-between border-b border-ink-3 bg-ink-2 px-3 py-2">
        <div className="flex items-center gap-1">
          {LANGS.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => setActive(l.key)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                active === l.key
                  ? "bg-ink-4 text-ink-10"
                  : "text-ink-7 hover:text-ink-9",
              )}
              style={
                active === l.key ? { color: l.color } : undefined
              }
            >
              {l.label}
            </button>
          ))}
        </div>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-ink-8">
        <code>{code}</code>
      </pre>
    </div>
  );
}
