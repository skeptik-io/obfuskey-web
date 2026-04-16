"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";
import { LANGS, type Lang } from "@/lib/snippets";
import { cn } from "@/lib/cn";

const INSTALL: Record<Lang, string> = {
  py: "pip install obfuskey",
  ts: "npm install obfuskey",
  rs: "cargo add obfuskey",
  rb: "bundle add obfuskey",
};

const REPO: Record<Lang, string> = {
  py: "github.com/bnlucas/obfuskey",
  ts: "github.com/bnlucas/obfuskey-js",
  rs: "github.com/bnlucas/obfuskey-rs",
  rb: "github.com/bnlucas/obfuskey-rb",
};

export function InstallTabs() {
  const [active, setActive] = useState<Lang>("ts");
  const cmd = INSTALL[active];

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
              style={active === l.key ? { color: l.color } : undefined}
            >
              {l.label}
            </button>
          ))}
        </div>
        <CopyButton value={cmd} />
      </div>
      <div className="px-4 py-4 font-mono text-sm text-ink-8">
        <span className="text-ink-6 select-none">$ </span>
        {cmd}
      </div>
      <div className="border-t border-ink-3 bg-ink-0/60 px-4 py-2 font-mono text-[11px] text-ink-6">
        {REPO[active]}
      </div>
    </div>
  );
}
