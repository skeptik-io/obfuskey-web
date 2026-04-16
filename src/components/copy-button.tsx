"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

export function CopyButton({
  value,
  className,
  label = "Copy",
}: {
  value: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* noop */
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-md border border-ink-4 bg-ink-2 px-2 text-[11px] font-medium text-ink-7 transition-colors hover:border-ink-6 hover:text-ink-9",
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" aria-hidden />
          {label}
        </>
      )}
    </button>
  );
}
