import type { SVGProps } from "react";

export function SkeptikMark({
  size = 28,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient
          id="sk-g"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--color-signal-bright)" />
          <stop offset="1" stopColor="var(--color-signal-deep)" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 L30 16 L16 30 L2 16 Z"
        stroke="url(#sk-g)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M16 9 L23 16 L16 23 L9 16 Z"
        fill="url(#sk-g)"
        opacity="0.9"
      />
    </svg>
  );
}

export function ObfuskeyMark({
  size = 28,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient
          id="obf-g"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--color-obf-bright)" />
          <stop offset="1" stopColor="var(--color-obf-deep)" />
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="4"
        width="24"
        height="24"
        rx="6"
        stroke="url(#obf-g)"
        strokeWidth="1.75"
        fill="none"
      />
      <path
        d="M10 16 h4 M18 16 h4 M16 10 v4 M16 18 v4"
        stroke="url(#obf-g)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
