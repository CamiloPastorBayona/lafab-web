"use client";

// Botón flotante de WhatsApp, visible en todo el sitio. Dispara evento de
// contacto (GA4 generate_lead + Pixel Contact) al hacer clic.

import { WHATSAPP } from "@/lib/content";
import { trackContact } from "@/lib/analytics";

export default function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContact("whatsapp_fab")}
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        ¿Hablamos?
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <svg
          viewBox="0 0 32 32"
          className="relative h-7 w-7 fill-white"
          aria-hidden="true"
        >
          <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.463 1.71 6.404L3.2 28.8l6.57-1.68a12.74 12.74 0 0 0 6.23 1.612h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.053A12.72 12.72 0 0 0 16.003 3.2zm0 23.36h-.004a10.6 10.6 0 0 1-5.4-1.48l-.388-.23-4.003 1.024 1.07-3.9-.253-.4a10.55 10.55 0 0 1-1.62-5.594c0-5.87 4.777-10.646 10.65-10.646 2.844 0 5.516 1.108 7.527 3.12a10.57 10.57 0 0 1 3.117 7.53c0 5.87-4.777 10.646-10.647 10.646zm5.84-7.976c-.32-.16-1.894-.934-2.188-1.04-.294-.107-.508-.16-.72.16-.214.32-.827 1.04-1.014 1.254-.187.213-.374.24-.694.08-.32-.16-1.35-.498-2.57-1.586-.95-.847-1.592-1.894-1.78-2.214-.186-.32-.02-.494.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.214.053-.4-.027-.56-.08-.16-.72-1.734-.987-2.374-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.294.32-1.12 1.094-1.12 2.667 0 1.574 1.146 3.094 1.306 3.307.16.214 2.255 3.443 5.464 4.828.764.33 1.36.527 1.824.674.767.244 1.464.21 2.015.127.615-.092 1.894-.774 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.134-.294-.214-.614-.374z" />
        </svg>
      </span>
    </a>
  );
}
