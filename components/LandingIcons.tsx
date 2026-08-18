import type { ReactNode } from "react";

const P: Record<string, ReactNode> = {
  sofa: (
    <>
      <rect x="3" y="10" width="18" height="7" rx="2" />
      <path d="M5 10V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
      <path d="M6 17v2M18 17v2" />
    </>
  ),
  gem: (
    <>
      <path d="M6 3h12l3 6-9 12L3 9z" />
      <path d="M3 9h18" />
      <path d="M9 3l3 18 3-18" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l6 4V10l6 4V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v15z" />
      <path d="M3 21h18" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  paw: (
    <>
      <circle cx="8" cy="9" r="1.6" />
      <circle cx="16" cy="9" r="1.6" />
      <circle cx="6" cy="14" r="1.4" />
      <circle cx="18" cy="14" r="1.4" />
      <path d="M9 17.5a3 3 0 0 1 6 0 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" />,
  shieldCheck: (
    <>
      <path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13l-1 8 4-2 4 2-1-8" />
    </>
  ),
  droplet: <path d="M12 3s6 6 6 10a6 6 0 0 1-12 0c0-4 6-10 6-10z" />,
  sparkles: <path d="M12 4l1.5 4L18 9.5 13.5 11 12 15l-1.5-4L6 9.5 10.5 8z" />,
  refresh: (
    <>
      <path d="M4 12a8 8 0 0 1 14-5l2 2" />
      <path d="M20 5v4h-4" />
      <path d="M20 12a8 8 0 0 1-14 5l-2-2" />
      <path d="M4 19v-4h4" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 6-14 15-14 0 9-6 15-15 14z" />
      <path d="M5 19c4-4 7-6 11-8" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12l9-9 8 8-9 9-8-8z" />
      <circle cx="8.5" cy="8.5" r="1.1" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  truck: (
    <>
      <rect x="2" y="7" width="12" height="9" rx="1" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1" />
      <rect x="17" y="13" width="4" height="6" rx="1" />
      <path d="M20 19a4 4 0 0 1-4 3h-2" />
    </>
  ),
};

export default function Ico({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {P[name] ?? null}
    </svg>
  );
}
