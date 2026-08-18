// Badge compacto de calificación (estrellas + "4.9 · 29 reseñas en Google").
// Reutilizable junto al precio, en cabeceras, etc. Enlaza a las reseñas de Google.
import { REVIEWS_SUMMARY, GOOGLE_REVIEW_URL } from "@/lib/content";

export default function ReviewsBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-ink ${className}`}
      aria-label={`${REVIEWS_SUMMARY.rating} de 5 estrellas, ${REVIEWS_SUMMARY.count} reseñas en Google`}
    >
      <span className="text-star" aria-hidden="true">
        ★★★★★
      </span>
      <span>
        <strong className="font-semibold text-ink">
          {REVIEWS_SUMMARY.rating.toFixed(1)}
        </strong>{" "}
        · {REVIEWS_SUMMARY.count} reseñas en Google
      </span>
    </a>
  );
}
