"use client";

// Disuasión de descarga de imágenes (frontend). No es infalible —el navegador
// siempre descarga la imagen para mostrarla— pero frena a la gran mayoría:
// bloquea el clic derecho ("Guardar imagen como…") y el arrastre sobre <img>.
// La capa transparente sobre las fotos de producto se aplica en ProductGallery.

import { useEffect } from "react";

export default function ImageGuard() {
  useEffect(() => {
    const isImg = (t: EventTarget | null) =>
      t instanceof HTMLElement &&
      (t.tagName === "IMG" || t.closest("[data-protect-img]") !== null);

    const onContext = (e: MouseEvent) => {
      if (isImg(e.target)) e.preventDefault();
    };
    const onDrag = (e: DragEvent) => {
      if (isImg(e.target)) e.preventDefault();
    };

    document.addEventListener("contextmenu", onContext);
    document.addEventListener("dragstart", onDrag);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("dragstart", onDrag);
    };
  }, []);

  return null;
}
