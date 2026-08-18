"use client";

// Bloque unificado Telas + AquaFobiak. Original convertido a React y acoplado a
// la marca: títulos en morality (vía regla global h1..h6), cuerpo en la fuente
// del sitio (Poppins), acentos en gold (#CABBA0 / #7A6A45) y cream (#F4F1EC).
// Animación de gotas en CSS puro, activada al entrar en viewport (clase .in).

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { swatchImg } from "@/lib/sandiego";

const CSS = `
#lf-fabrics,#lf-fabrics *{box-sizing:border-box;margin:0;padding:0;}
#lf-fabrics{position:relative;width:100%;
  background:#fff;color:#151515;font-family:var(--font-poppins),system-ui,sans-serif;
  padding:clamp(56px,7vw,100px) clamp(20px,5vw,70px);overflow-x:hidden;}
#lf-fabrics .lff-wrap{max-width:1200px;margin:0 auto;}
#lf-fabrics .lff-head{text-align:center;margin:0 auto clamp(34px,4.5vw,58px);}
#lf-fabrics .lff-eyebrow{font-size:13px;letter-spacing:5px;text-transform:uppercase;color:#7A6A45;}
#lf-fabrics .lff-title{font-weight:300;font-size:clamp(24px,3.2vw,44px);letter-spacing:-.015em;margin-top:12px;color:#151515;white-space:nowrap;}
#lf-fabrics .lff-sub{font-weight:300;font-size:clamp(16px,1.6vw,18.5px);line-height:1.55;color:#6B6B6B;margin:12px auto 0;max-width:56ch;}
#lf-fabrics .lff-tag{display:inline-flex;align-items:center;gap:9px;margin-top:20px;
  padding:9px 18px;border-radius:999px;background:rgba(202,187,160,.14);
  border:1px solid rgba(202,187,160,.42);color:#8A7D63;
  font-size:12px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;}
#lf-fabrics .lff-tag svg{width:16px;height:16px;display:block;color:#CABBA0;flex:0 0 auto;}
#lf-fabrics .lff-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,60px);align-items:stretch;}
#lf-fabrics .lff-panel{display:flex;flex-direction:column;height:100%;}
#lf-fabrics .lff-panel--right{border-left:1px solid rgba(0,0,0,.08);padding-left:clamp(28px,4vw,60px);}
#lf-fabrics .lff-badge{display:inline-flex;align-items:center;gap:11px;align-self:flex-start;
  margin-bottom:20px;padding:12px 24px;border-radius:999px;
  background:#151515;border:1px solid #151515;color:#fff;
  font-size:14px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;line-height:1.1;
  box-shadow:0 8px 22px rgba(0,0,0,.22);}
#lf-fabrics .lff-badge svg{width:22px;height:22px;flex:0 0 auto;color:#CABBA0;}
#lf-fabrics .lff-name{font-weight:300;font-size:clamp(25px,2.7vw,36px);letter-spacing:-.01em;color:#151515;}
#lf-fabrics .lff-name span{font-weight:500;}
#lf-fabrics .lff-desc{font-weight:300;font-size:clamp(15.5px,1.6vw,18px);line-height:1.62;color:#555;margin:16px 0 26px;max-width:46ch;}
#lf-fabrics .lff-benefits{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:16px 22px;}
#lf-fabrics .lff-benefits li{display:flex;align-items:center;gap:11px;font-weight:300;font-size:15px;color:#2f2f2f;}
#lf-fabrics .lff-ic{color:#CABBA0;flex:0 0 auto;}
#lf-fabrics .lff-ic svg{width:23px;height:23px;display:block;}
#lf-fabrics .lff-clabel{display:block;margin:26px 0 14px;font-size:11px;letter-spacing:.22em;
  text-transform:uppercase;color:#7A6A45;font-weight:500;}
#lf-fabrics .lff-colors{display:flex;flex-wrap:wrap;gap:26px;}
#lf-fabrics .lff-swatch{display:flex;flex-direction:column;align-items:center;gap:10px;}
#lf-fabrics .lff-sw{width:58px;height:58px;border-radius:50%;background-size:cover;background-position:center;
  border:1px solid rgba(0,0,0,.12);box-shadow:inset 0 1px 2px rgba(0,0,0,.06);
  transition:transform .25s ease,box-shadow .25s ease;}
#lf-fabrics .lff-swatch:hover .lff-sw{transform:translateY(-2px);box-shadow:0 6px 14px rgba(0,0,0,.10);}
#lf-fabrics .lff-nm{font-size:13.5px;font-weight:400;color:#5F5A52;letter-spacing:.2px;}
#lf-fabrics .lff-specs{margin-top:auto;padding-top:22px;border-top:1px solid rgba(0,0,0,.07);
  font-size:13.5px;color:#948E82;letter-spacing:.3px;}
#lf-fabrics .lff-foot{max-width:64ch;margin:clamp(38px,5vw,60px) auto 0;padding-top:clamp(28px,3.5vw,42px);
  border-top:1px solid rgba(0,0,0,.08);text-align:center;font-weight:300;
  font-size:clamp(16px,1.7vw,19px);line-height:1.6;color:#6B6B6B;}
#lf-fabrics .lff-foot strong{font-weight:500;color:#151515;}
/* ===== ANTIFLUIDOS ===== */
#lf-fabrics .lfr-wrap{max-width:1200px;margin:clamp(40px,5vw,64px) auto 0;
  padding-top:clamp(36px,4.5vw,56px);border-top:1px solid rgba(0,0,0,.08);
  display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,70px);align-items:center;}
#lf-fabrics .lfr-eyebrow{font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#7A6A45;}
#lf-fabrics .lfr-title{font-weight:300;font-size:clamp(28px,3.4vw,46px);line-height:1.12;letter-spacing:-.01em;margin:14px 0 18px;color:#151515;}
#lf-fabrics .lfr-desc{font-weight:300;font-size:clamp(15px,1.6vw,18px);line-height:1.6;color:#6B6B6B;max-width:42ch;}
#lf-fabrics .lfr-desc2{margin-top:14px;}
#lf-fabrics .lfr-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px;}
#lf-fabrics .lfr-chips span{font-size:13px;color:#151515;background:#F4F1EC;border:1px solid rgba(0,0,0,.08);border-radius:999px;padding:9px 16px;}
#lf-fabrics .lfr-demo{display:flex;flex-direction:column;align-items:center;gap:14px;}
#lf-fabrics .lfr-fabric{position:relative;width:100%;max-width:440px;aspect-ratio:4/3;border-radius:20px;overflow:hidden;
  background:
    repeating-linear-gradient(45deg, rgba(0,0,0,.035) 0 1px, transparent 1px 5px),
    repeating-linear-gradient(-45deg, rgba(0,0,0,.03) 0 1px, transparent 1px 5px),
    radial-gradient(120% 120% at 50% 0%, #ECE4D5, #D6C9AF);
  border:1px solid rgba(0,0,0,.08);box-shadow:inset 0 0 50px rgba(0,0,0,.12),0 18px 45px rgba(0,0,0,.08);}
#lf-fabrics .lfr-drop{position:absolute;top:0;width:26px;height:26px;border-radius:50%;
  background:radial-gradient(circle at 35% 28%, rgba(255,255,255,.95), rgba(150,180,205,.5) 45%, rgba(90,120,150,.42) 100%);
  box-shadow:0 3px 6px rgba(80,60,30,.28),inset 0 -2px 4px rgba(255,255,255,.45);
  opacity:0;animation:lfrFall 4.2s cubic-bezier(.5,0,.5,1) infinite;animation-play-state:paused;}
#lf-fabrics.in .lfr-drop{animation-play-state:running;}
@keyframes lfrFall{
  0%{transform:translate(0,-130px) scaleX(.78) scaleY(1.35);opacity:0;}
  9%{opacity:1;}
  20%{transform:translate(0,120px) scaleX(1.2) scaleY(.8);opacity:1;}
  28%{transform:translate(0,114px) scale(1);}
  58%{transform:translate(0,114px) scale(1);}
  100%{transform:translate(110px,300px) scale(.85);opacity:0;}
}
#lf-fabrics .lfr-ripple{position:absolute;top:110px;width:34px;height:34px;margin-left:-4px;border-radius:50%;
  border:2px solid rgba(255,255,255,.75);opacity:0;transform:scale(.3);
  animation:lfrRing 4.2s linear infinite;animation-play-state:paused;}
#lf-fabrics.in .lfr-ripple{animation-play-state:running;}
@keyframes lfrRing{
  0%,17%{opacity:0;transform:scale(.3);}
  20%{opacity:.6;transform:scale(.5);}
  32%{opacity:0;transform:scale(1.6);}
  100%{opacity:0;transform:scale(1.6);}
}
#lf-fabrics .lfr-cap{font-size:12px;letter-spacing:.05em;color:#7A6A45;}
@media (max-width:860px){
  #lf-fabrics .lfr-wrap{grid-template-columns:1fr;gap:34px;}
  #lf-fabrics .lfr-demo{order:-1;}
  #lf-fabrics .lfr-desc{max-width:100%;}
}
@media (max-width:760px){
  #lf-fabrics .lff-grid{grid-template-columns:1fr;gap:38px;}
  #lf-fabrics .lff-panel{height:auto;}
  #lf-fabrics .lff-panel--right{border-left:0;padding-left:0;border-top:1px solid rgba(0,0,0,.08);padding-top:38px;}
  #lf-fabrics .lff-specs{margin-top:26px;}
}
@media (max-width:900px){
  #lf-fabrics .lff-title{white-space:normal;}
}
@media (max-width:640px){
  #lf-fabrics .lff-title{font-size:clamp(24px,6.4vw,34px);}
}
@media (max-width:520px){
  #lf-fabrics .lff-badge{font-size:12.5px;padding:11px 18px;gap:9px;}
  #lf-fabrics .lff-badge svg{width:19px;height:19px;}
}
@media (max-width:420px){
  #lf-fabrics .lff-benefits{grid-template-columns:1fr;}
}
@media (prefers-reduced-motion:reduce){
  #lf-fabrics .lfr-drop{animation:none;opacity:1;transform:translate(0,114px);}
  #lf-fabrics .lfr-ripple{display:none;}
}
`;

/* ---- Iconos (línea, heredan color del contenedor) ---- */
const St = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);
const IcDroplet = () => (
  <St>
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
  </St>
);
const IcSparkle = () => (
  <St>
    <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
  </St>
);
const IcRefresh = () => (
  <St>
    <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" />
    <path d="M20 4v4h-4" />
    <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" />
    <path d="M4 20v-4h4" />
  </St>
);
const IcLeaf = () => (
  <St>
    <path d="M20 4c-7 0-13 4-15 12l-1 3 3-1c8-2 12-8 12-15z" />
    <path d="M16 8 6 18" />
  </St>
);
const IcLayers = () => (
  <St>
    <path d="M12 3 2.5 8 12 13l9.5-5L12 3z" />
    <path d="M2.5 12 12 17l9.5-5" />
    <path d="M2.5 16 12 21l9.5-5" />
  </St>
);
const IcShield = () => (
  <St>
    <path d="M12 3 5 6v5.5c0 4.3 3 7.4 7 8.5 4-1.1 7-4.2 7-8.5V6l-7-3z" />
  </St>
);
const IcStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 3.5l2.4 5.4 5.9.5-4.5 3.9 1.4 5.8L12 16.9l-5.6 2.2 1.4-5.8-4.5-3.9 5.9-.5z" />
  </svg>
);
const IcPaw = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="5.5" cy="12" r="1.7" />
    <circle cx="9.5" cy="8" r="1.7" />
    <circle cx="14.5" cy="8" r="1.7" />
    <circle cx="18.5" cy="12" r="1.7" />
    <path d="M12 12.8c-2.6 0-4.6 1.9-4.6 4.1 0 1.6 1.3 2.5 2.8 2.5 1 0 1.3-.5 1.8-.5s.8.5 1.8.5c1.5 0 2.8-.9 2.8-2.5 0-2.2-2-4.1-4.6-4.1z" />
  </svg>
);

type Fabric = {
  key: string;
  badgeIcon: ReactNode;
  badge: string;
  name: [string, string];
  desc: string;
  benefits: { icon: ReactNode; text: string }[];
  colors: string[];
  specs: string;
  right?: boolean;
};

const FABRICS: Fabric[] = [
  {
    key: "milan",
    badgeIcon: <IcStar />,
    badge: "Más elegida",
    name: ["Chenil ", "Milan"],
    desc: "Textura cálida y acogedora, con backing acolchado y tratamiento antifluido. Fácil de limpiar y amigable con las mascotas.",
    benefits: [
      { icon: <IcDroplet />, text: "Antifluidos" },
      { icon: <IcSparkle />, text: "Fácil de limpiar" },
      { icon: <IcRefresh />, text: "Conserva su apariencia por más tiempo" },
      { icon: <IcLeaf />, text: "Textura cálida y agradable" },
      { icon: <IcLayers />, text: "Aspecto textil" },
    ],
    colors: ["Marfil", "Beige", "Avellana"],
    specs: "Chenil · 100% poliéster · Ancho 145 cm · Peso 350 g/m²",
  },
  {
    key: "mon",
    badgeIcon: <IcPaw />,
    badge: "Recomendada para hogares con mascotas",
    name: ["Microfibra ", "Mon"],
    desc: "Tacto suave tipo soft velvet y aspecto elegante. Repele líquidos y resiste el uso diario, ideal para hogares con mascotas.",
    benefits: [
      { icon: <IcPaw />, text: "Ideal para mascotas y niños" },
      { icon: <IcSparkle />, text: "Fácil de limpiar" },
      { icon: <IcRefresh />, text: "Conserva su apariencia más tiempo" },
      { icon: <IcLeaf />, text: "Textura suave y agradable" },
      { icon: <IcShield />, text: "Más resistente" },
    ],
    colors: ["Beige", "Avellana", "Plata", "Gris"],
    specs: "Soft velvet · 100% poliéster · Ancho 145 cm · Teñido y estampado",
    right: true,
  },
];

export default function SanDiegoFabrics() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => el.classList.toggle("in", e.isIntersecting));
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div id="telas" style={{ scrollMarginTop: "80px" }}>
      <section id="lf-fabrics" ref={ref}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="lff-wrap">
          <header className="lff-head">
            <span className="lff-eyebrow">Telas</span>
            <h2 className="lff-title">Elige la tela ideal para tu hogar.</h2>
            <p className="lff-sub">
              Estas son las dos telas disponibles para compra online. Tejidos
              premium pensados para el uso real: elige el que mejor se adapta a
              tu día a día.
            </p>
            <span className="lff-tag">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Disponibles para compra online
            </span>
          </header>

          <div className="lff-grid">
            {FABRICS.map((f) => (
              <div
                key={f.key}
                className={`lff-panel${f.right ? " lff-panel--right" : ""}`}
              >
                <span className="lff-badge">
                  {f.badgeIcon}
                  {f.badge}
                </span>
                <h3 className="lff-name">
                  {f.name[0]}
                  <span>{f.name[1]}</span>
                </h3>
                <p className="lff-desc">{f.desc}</p>
                <ul className="lff-benefits">
                  {f.benefits.map((b, i) => (
                    <li key={i}>
                      <span className="lff-ic">{b.icon}</span>
                      {b.text}
                    </li>
                  ))}
                </ul>
                <span className="lff-clabel">Colores disponibles</span>
                <div className="lff-colors">
                  {f.colors.map((c) => (
                    <div className="lff-swatch" key={c}>
                      <span
                        className="lff-sw"
                        style={{
                          backgroundImage: `url('${swatchImg(f.key, c)}')`,
                        }}
                      />
                      <span className="lff-nm">{c}</span>
                    </div>
                  ))}
                </div>
                <p className="lff-specs">{f.specs}</p>
              </div>
            ))}
          </div>

          <p className="lff-foot">
            Todas nuestras telas son seleccionadas por su{" "}
            <strong>comodidad</strong>, <strong>resistencia</strong> y{" "}
            <strong>facilidad de mantenimiento</strong>.
          </p>
        </div>

        {/* AquaFobiak */}
        <div className="lfr-wrap">
          <div className="lfr-text">
            <span className="lfr-eyebrow">Tecnología AquaFobiak®</span>
            <h2 className="lfr-title">
              Los líquidos resbalan.
              <br />
              La tela queda intacta.
            </h2>
            <p className="lfr-desc">
              Café, vino, jugo o salsa. Los líquidos permanecen en la superficie
              durante unos instantes, permitiendo retirarlos fácilmente antes de
              que sean absorbidos.
            </p>
            <p className="lfr-desc lfr-desc2">
              Siempre se recomienda limpiar inmediatamente para conservar el
              tratamiento protector.
            </p>
            <div className="lfr-chips">
              <span>Repele líquidos</span>
              <span>Fácil limpieza</span>
              <span>Pet friendly</span>
            </div>
          </div>
          <div className="lfr-demo">
            <div className="lfr-fabric">
              <span className="lfr-drop" style={{ left: "28%", animationDelay: "0s" }} />
              <span className="lfr-ripple" style={{ left: "28%", animationDelay: "0s" }} />
              <span className="lfr-drop" style={{ left: "54%", animationDelay: "1.4s" }} />
              <span className="lfr-ripple" style={{ left: "54%", animationDelay: "1.4s" }} />
              <span className="lfr-drop" style={{ left: "74%", animationDelay: "2.8s" }} />
              <span className="lfr-ripple" style={{ left: "74%", animationDelay: "2.8s" }} />
            </div>
            <span className="lfr-cap">Tela antifluidos</span>
          </div>
        </div>
      </section>
    </div>
  );
}
