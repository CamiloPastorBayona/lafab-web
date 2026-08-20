// Bullets de "destacados" del producto (editables por ACF). Se muestran bajo la
// descripción corta, en la columna de información. Server component.

export default function ProductHighlights({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[15px] text-ink/80">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-dark"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
