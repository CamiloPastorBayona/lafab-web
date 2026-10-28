"use client";

// Compartir la ficha de producto. Mucha venta nuestra empieza con alguien que
// le manda el enlace a su pareja o a la mamá por WhatsApp, así que el enlace
// tiene que estar a un clic y no obligar a copiar la barra del navegador.
//
// Instagram no tiene un enlace para compartir desde la web: solo se puede desde
// su app. Por eso en el celular ofrecemos el menú del sistema, que sí lista
// Instagram, Messenger y lo que el visitante tenga instalado, y en todos lados
// dejamos "Copiar enlace", que es lo que sirve para pegarlo en una historia.

import { useEffect, useState } from "react";

type Props = { url: string; title: string; className?: string };

const ICONOS: Record<string, React.ReactNode> = {
  whatsapp: (
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.08c-.24.68-1.42 1.32-1.95 1.37-.52.05-1 .24-3.37-.7-2.85-1.12-4.65-4.03-4.79-4.22-.14-.19-1.14-1.52-1.14-2.9 0-1.38.72-2.06.98-2.34.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.17-.3.37-.42.5-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.41.28.14.45.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.66.78 1.95.93.28.14.47.21.54.33.07.12.07.68-.17 1.35Z" />
  ),
  telegram: (
    <path d="M21.9 4.3 18.6 20c-.25 1.1-.9 1.37-1.82.85l-5.03-3.71-2.43 2.34c-.27.27-.5.5-1.02.5l.36-5.13 9.34-8.44c.4-.36-.09-.56-.63-.2L5.83 13.47.86 11.92c-1.08-.34-1.1-1.08.23-1.6L20.5 2.75c.9-.33 1.69.2 1.4 1.55Z" />
  ),
  facebook: (
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  ),
  x: (
    <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-5.9l-4.62-6.04L5.94 21H2.92l7.06-8.07L2.5 3h6.05l4.18 5.52L17.53 3Zm-1.06 16.2h1.67L7.6 4.71H5.81l10.66 14.49Z" />
  ),
  correo: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" fill="none" strokeWidth="1.8" />
      <path d="m3.5 6.5 8.5 6 8.5-6" fill="none" strokeWidth="1.8" />
    </>
  ),
  enlace: (
    <>
      <path d="M10 13a4 4 0 0 0 5.66 0l2.5-2.5a4 4 0 0 0-5.66-5.66l-1.1 1.1" fill="none" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 11a4 4 0 0 0-5.66 0l-2.5 2.5a4 4 0 0 0 5.66 5.66l1.1-1.1" fill="none" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  compartir: (
    <>
      <circle cx="18" cy="5" r="2.6" fill="none" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="2.6" fill="none" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="2.6" fill="none" strokeWidth="1.8" />
      <path d="m8.4 10.8 7.2-4.2M8.4 13.2l7.2 4.2" fill="none" strokeWidth="1.8" />
    </>
  ),
};

function Icono({ nombre, relleno }: { nombre: string; relleno: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      fill={relleno ? "currentColor" : "none"}
      stroke={relleno ? "none" : "currentColor"}
    >
      {ICONOS[nombre]}
    </svg>
  );
}

const boton =
  "flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-ink/40 hover:bg-cream hover:text-ink";

export default function ShareButtons({ url, title, className = "" }: Props) {
  const [copiado, setCopiado] = useState(false);
  const [nativo, setNativo] = useState(false);

  useEffect(() => {
    setNativo(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    if (!copiado) return;
    const t = setTimeout(() => setCopiado(false), 2000);
    return () => clearTimeout(t);
  }, [copiado]);

  const texto = `${title} — LaFab`;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(texto);

  const redes = [
    { k: "whatsapp", label: "Compartir por WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, relleno: true },
    { k: "telegram", label: "Compartir por Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, relleno: true },
    { k: "facebook", label: "Compartir en Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, relleno: true },
    { k: "x", label: "Compartir en X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, relleno: true },
    { k: "correo", label: "Compartir por correo", href: `mailto:?subject=${t}&body=${u}`, relleno: false },
  ];

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
    } catch {
      // Safari sin permiso de portapapeles: se abre el menú del sistema.
      if (navigator.share) navigator.share({ title: texto, url }).catch(() => {});
    }
  };

  const compartirNativo = () => {
    navigator.share({ title: texto, text: texto, url }).catch(() => {});
  };

  return (
    <div className={className}>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
        Compartir
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {redes.map((r) => (
          <a
            key={r.k}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={r.label}
            title={r.label}
            className={boton}
          >
            <Icono nombre={r.k} relleno={r.relleno} />
          </a>
        ))}

        <button
          type="button"
          onClick={copiar}
          aria-label="Copiar el enlace"
          title={copiado ? "¡Enlace copiado!" : "Copiar el enlace"}
          className={boton}
        >
          <Icono nombre="enlace" relleno={false} />
        </button>

        {nativo && (
          <button
            type="button"
            onClick={compartirNativo}
            aria-label="Compartir con otra aplicación"
            title="Compartir con otra aplicación (Instagram, Messenger…)"
            className={boton}
          >
            <Icono nombre="compartir" relleno={false} />
          </button>
        )}
      </div>

      <p
        className={`mt-2 text-xs text-gold-dark transition-opacity ${
          copiado ? "opacity-100" : "opacity-0"
        }`}
        role="status"
      >
        Enlace copiado. Ya lo puedes pegar donde quieras.
      </p>
    </div>
  );
}
