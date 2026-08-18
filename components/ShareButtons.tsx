"use client";

import { useState } from "react";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  const e = encodeURIComponent;
  const wa = `https://api.whatsapp.com/send?text=${e(`${title} ${url}`)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`;
  const tw = `https://twitter.com/intent/tweet?text=${e(title)}&url=${e(url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-gold hover:text-gold-dark";

  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
        Compartir
      </p>
      <div className="flex gap-2">
        <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Compartir en WhatsApp" className={btn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.1-.3.2-.5.1-.7-.3-1.3-.6-1.9-1.4-.2-.3.2-.3.5-.9.1-.1 0-.3 0-.4 0-.1-.5-1.3-.7-1.7-.2-.4-.3-.4-.5-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 3.9 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.5-.3z" />
          </svg>
        </a>
        <a href={fb} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Facebook" className={btn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3H13.5V9.7c0-.4.3-.7.7-.7z" />
          </svg>
        </a>
        <a href={tw} target="_blank" rel="noopener noreferrer" aria-label="Compartir en X" className={btn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.8 22H2l8-9.2L1.5 2h6.9l4.8 6.4L18.9 2zm-2.4 18h1.9L7.6 4H5.6l10.9 16z" />
          </svg>
        </a>
        <button onClick={copy} aria-label="Copiar enlace" className={btn}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
            <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
          </svg>
        </button>
      </div>
      {copied && <p className="mt-2 text-xs text-gold-dark">¡Enlace copiado!</p>}
    </div>
  );
}
