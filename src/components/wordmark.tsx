import { cn } from "@/lib/cn";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn("font-semibold tracking-tight text-ink-9", className)}
    >
      obfuskey
      <span className="text-obf">.</span>
    </span>
  );
}
