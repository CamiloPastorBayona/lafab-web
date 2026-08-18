"use client";

// Ficha técnica (tabla de especificaciones + imagen) con reveal al entrar en
// viewport. Acoplado a la marca: título morality, base Poppins, eyebrow gold
// (#7A6A45), hover/acentos en gold-light (#CABBA0).

import { useEffect, useRef } from "react";

const CSS = `
#lafab-sd-specs,#lafab-sd-specs *{box-sizing:border-box;margin:0;padding:0;}
#lafab-sd-specs{width:100%;background:#fff;font-family:var(--font-poppins),system-ui,sans-serif;color:#151515;
  padding:clamp(56px,9vw,110px) clamp(20px,5vw,70px);}
#lafab-sd-specs .ls-wrap{max-width:1200px;margin:0 auto;}
#lafab-sd-specs .ls-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(28px,4vw,64px);align-items:stretch;}
#lafab-sd-specs .ls-eyebrow{display:block;font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#7A6A45;margin-bottom:12px;}
#lafab-sd-specs .ls-title{font-weight:300;font-size:clamp(26px,3.2vw,40px);letter-spacing:-.01em;margin-bottom:26px;}
#lafab-sd-specs .ls-table{border-top:1px solid rgba(20,20,20,.14);}
#lafab-sd-specs .ls-row{display:grid;grid-template-columns:160px 1fr;gap:24px;align-items:baseline;
  padding:15px 6px;border-bottom:1px solid rgba(20,20,20,.09);transition:background .25s ease;}
#lafab-sd-specs .ls-row:hover{background:rgba(202,187,160,.07);}
#lafab-sd-specs .ls-key{font-size:11px;letter-spacing:.24em;text-transform:uppercase;font-weight:500;color:rgba(20,20,20,.45);}
#lafab-sd-specs .ls-val{font-size:15px;line-height:1.55;font-weight:300;color:#2A2A2A;}
#lafab-sd-specs .ls-val strong{font-weight:500;color:#151515;}
#lafab-sd-specs .ls-fabwrap{display:flex;flex-direction:column;gap:16px;}
#lafab-sd-specs .ls-fab{font-size:15px;font-weight:300;color:#2A2A2A;line-height:1.5;}
#lafab-sd-specs .ls-fab strong{font-weight:500;color:#151515;}
#lafab-sd-specs .ls-fabdesc{display:block;margin-top:4px;font-size:13.5px;color:#6B6B6B;line-height:1.55;}
#lafab-sd-specs .ls-note{margin-top:18px;font-size:11px;line-height:1.5;font-weight:300;color:rgba(20,20,20,.5);max-width:60ch;}
#lafab-sd-specs .ls-badges{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px;}
#lafab-sd-specs .ls-badge{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:500;color:#151515;
  padding:11px 20px;border:1px solid rgba(20,20,20,.18);border-radius:999px;transition:border-color .25s ease,background .25s ease;}
#lafab-sd-specs .ls-badge:hover{border-color:#CABBA0;background:rgba(202,187,160,.12);}
#lafab-sd-specs .ls-right{position:relative;border-radius:20px;overflow:hidden;min-height:520px;box-shadow:0 20px 44px rgba(0,0,0,.10);}
#lafab-sd-specs .ls-right img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
#lafab-sd-specs .ls-left,#lafab-sd-specs .ls-right{opacity:0;transform:translateY(20px);
  transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1);}
#lafab-sd-specs.in .ls-left{opacity:1;transform:none;}
#lafab-sd-specs.in .ls-right{opacity:1;transform:none;transition-delay:.12s;}
@media(max-width:860px){
  #lafab-sd-specs .ls-grid{grid-template-columns:1fr;gap:28px;}
  #lafab-sd-specs .ls-right{min-height:340px;order:-1;}
}
@media(max-width:640px){
  #lafab-sd-specs .ls-row{grid-template-columns:1fr;gap:7px;padding:14px 2px;}
  #lafab-sd-specs .ls-key{letter-spacing:.2em;}
  #lafab-sd-specs .ls-val{font-size:14px;}
}
@media(prefers-reduced-motion:reduce){
  #lafab-sd-specs .ls-left,#lafab-sd-specs .ls-right{opacity:1;transform:none;transition:none;}
}
`;

const ROWS_TOP: { key: string; val: React.ReactNode }[] = [
  { key: "Largo", val: "Disponible en 170 cm · 180 cm · 190 cm · 200 cm" },
  { key: "Fondo", val: "100 cm" },
  { key: "Altura", val: "90 cm con cojines · 78 cm espaldar sin cojines" },
  { key: "Brazos", val: "Ancho 21 cm · Fondo 96 cm · Alto 62 cm" },
  { key: "Patas", val: "Roble macizo · 20 × 20 cm · alto 5 cm · acabado natural" },
  { key: "Estructura", val: "Pino inmunizado y Roble natural · ensambles reforzados" },
  {
    key: "Confort",
    val: "Asientos en espumas Croydon® + Penta® certificadas · espaldares sueltos en fibra siliconada de alta recuperación",
  },
];

const ROWS_BOTTOM: { key: string; val: React.ReactNode }[] = [
  {
    key: "Tela · técnica",
    val: (
      <>
        100% poliéster · tecnología antifluidos <strong>AquaFobiak®</strong> ·
        +25.000 ciclos Martindale · OEKO-TEX® Standard 100
      </>
    ),
  },
  { key: "Colores", val: "Tonos según la tela · Marfil, Beige, Avellana, Plata y Gris" },
  { key: "Garantía", val: "3 años en estructura · 1 año por desajustes" },
  {
    key: "Envíos",
    val: (
      <>
        Nacional · ciudades capitales: <strong>incluido</strong>
        <br />
        Local entre La Estrella y Bello (Ant.): <strong>incluido</strong>
      </>
    ),
  },
];

const BADGES = [
  "Fabricación propia",
  "Garantía 3 años",
  "Envíos nacionales",
  "Pago seguro",
  "100% personalizable",
  "Espuma certificada",
];

export default function SanDiegoSpecs() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="lafab-sd-specs" ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ls-wrap">
        <div className="ls-grid">
          <div className="ls-left">
            <span className="ls-eyebrow">Ficha técnica</span>
            <h2 className="ls-title">Especificaciones y Garantía</h2>
            <div className="ls-table">
              {ROWS_TOP.map((r) => (
                <div className="ls-row" key={r.key}>
                  <span className="ls-key">{r.key}</span>
                  <span className="ls-val">{r.val}</span>
                </div>
              ))}
              <div className="ls-row">
                <span className="ls-key">Telas</span>
                <div className="ls-val ls-fabwrap">
                  <div className="ls-fab">
                    <strong>Microfibra Mon</strong> · Pet Friendly
                    <span className="ls-fabdesc">
                      Suave al tacto, antifluidos y Pet Friendly: facilita la
                      limpieza diaria y reduce el enganche de pelos. Ideal para
                      hogares con mascotas.
                    </span>
                  </div>
                  <div className="ls-fab">
                    <strong>Chenil Milan</strong> · Antifluido
                    <span className="ls-fabdesc">
                      Textura cálida y apariencia acogedora, con protección
                      antifluidos para limpiar derrames con facilidad y un
                      mantenimiento sencillo.
                    </span>
                  </div>
                </div>
              </div>
              {ROWS_BOTTOM.map((r) => (
                <div className="ls-row" key={r.key}>
                  <span className="ls-key">{r.key}</span>
                  <span className="ls-val">{r.val}</span>
                </div>
              ))}
            </div>
            <p className="ls-note">
              La garantía cubre defectos de fabricación bajo condiciones normales
              de uso. No cubre mal uso, humedad, exposición prolongada al sol,
              limpiezas inadecuadas, modificaciones por terceros ni desgaste
              natural. Tela y espumas: según condiciones del proveedor,
              gestionadas por LaFab con diagnóstico previo.
            </p>
            <div className="ls-badges">
              {BADGES.map((b) => (
                <span className="ls-badge" key={b}>
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="ls-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lafab.com.co/wp-content/uploads/2026/06/sofa3.webp"
              alt="Sofá San Diego de LaFab"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
