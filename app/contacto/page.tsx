"use client";

import { useState } from "react";
import { SHOWROOM } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

const PHONE = "573054602395";

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", mensaje: "" });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const sendWhatsApp = () => {
    const text = `Hola LaFab, soy ${form.nombre || "un cliente"}. ${form.mensaje}`;
    window.open(
      `https://api.whatsapp.com/send/?phone=${PHONE}&text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  const field =
    "w-full rounded-xl border border-ink/15 px-4 py-3 text-ink outline-none transition-colors focus:border-gold";

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos"
        subtitle="¿Tienes una idea o una duda? Escríbenos y te asesoramos para diseñar el mueble perfecto para tu espacio."
        image="https://lafab.com.co/wp-content/uploads/2026/07/6.webp"
      />

      <section className="mx-auto grid max-w-site gap-10 px-4 py-14 md:grid-cols-2 md:px-6">
        {/* Datos */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
              WhatsApp
            </p>
            <a
              href={`https://api.whatsapp.com/send/?phone=${PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-lg text-ink hover:text-gold-dark"
            >
              305 460 2395
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
              Showroom
            </p>
            <p className="mt-1 text-ink/75">
              {SHOWROOM.address}
              <br />
              {SHOWROOM.city}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
              Horarios
            </p>
            <ul className="mt-1 space-y-1 text-ink/75">
              {SHOWROOM.hours.map((h) => (
                <li key={h.day}>
                  <span className="font-medium text-ink">{h.day}:</span> {h.time}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
              Síguenos
            </p>
            <div className="mt-1 flex gap-4">
              <a
                href="https://www.instagram.com/lafabricamed/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-gold-dark"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/lafabricamed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-gold-dark"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Formulario → WhatsApp */}
        <div className="rounded-2xl bg-cream p-6 md:p-8">
          <h2 className="text-xl font-semibold text-ink">Envíanos un mensaje</h2>
          <div className="mt-5 space-y-4">
            <input
              className={field}
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={set("nombre")}
            />
            <textarea
              className={field}
              rows={5}
              placeholder="¿En qué te podemos ayudar?"
              value={form.mensaje}
              onChange={set("mensaje")}
            />
            <button
              onClick={sendWhatsApp}
              className="w-full rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Enviar por WhatsApp
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
