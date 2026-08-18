"use client";

// Configurador de compra del Sofá San Diego. Diseño original convertido a React
// y CONECTADO A NUESTRA TIENDA: el botón agrega a nuestro carrito (useCart) y
// navega a /checkout (no usa el AJAX/checkout de WordPress). Acoplado a la marca:
// título en morality, base Poppins del sitio, acentos gold/cream, sale #C0392B.

import { useState, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { SANDIEGO } from "@/lib/sandiego";
import { useCart } from "@/lib/cart";

const PRICE = 3400000;
const REAL = 3800000;
const TEX = "https://lafab.com.co/wp-content/uploads/2026/06/"; // texturas (swatches)
const FOTO = "https://lafab.com.co/wp-content/uploads/2026/07/"; // fotos por tela+color

type Color = { name: string; hex: string; img: string; foto: string };
type Fabric = { name: string; tag: string; colors: Color[] };

const FABRICS: Fabric[] = [
  {
    name: "Microfibra Mon",
    tag: "Pet Friendly · Soft velvet",
    colors: [
      { name: "Marfil", hex: "#F1ECE2", img: TEX + "mon-tela-beige.webp", foto: FOTO + "01-Mon-Marfil.webp" },
      { name: "Avellana", hex: "#D9CCB3", img: TEX + "mon-tela-avellana.webp", foto: FOTO + "02-Mon-Avellana.webp" },
      { name: "Plata", hex: "#CCD0CD", img: TEX + "mon-tela-plata.webp", foto: FOTO + "03-Mon-Plata.webp" },
      { name: "Gris", hex: "#A7AAA8", img: TEX + "mon-tela-gris.webp", foto: FOTO + "04-Mon-Gris.webp" },
    ],
  },
  {
    name: "Chenil Milan",
    tag: "Cálida · Antifluido",
    colors: [
      { name: "Marfil", hex: "#F1ECE2", img: TEX + "milan-tela-marfil.webp", foto: FOTO + "Chenil-01-Marfil.webp" },
      { name: "Beige", hex: "#E7DFCF", img: TEX + "milan-tela-beige.webp", foto: FOTO + "Chenil-02-Beige.webp" },
      { name: "Avellana", hex: "#D8CCB6", img: TEX + "milan-tela-avellana.webp", foto: FOTO + "Chenil-03-Avellana.webp" },
    ],
  },
];

const SIZES = ["170 cm", "180 cm", "190 cm", "200 cm"];
const SHIPS = [
  { label: "Medellín · Área metropolitana", cost: 0 },
  { label: "Nacional · ciudad capital", cost: 200000 },
];

const cop = (n: number) => "$" + n.toLocaleString("es-CO");

type Seal = { icon: ReactNode; t: string; s: string };
const SEALS: Seal[] = [
  { t: "IVA incluido", s: "en el precio", icon: (<><path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.4" /></>) },
  { t: "Garantía", s: "por fabricación", icon: (<><path d="M12 3 5 6v5.5c0 4.3 3 7.4 7 8.5 4-1.1 7-4.2 7-8.5V6l-7-3z" /><path d="M9 12l2.2 2.2L15.5 10" /></>) },
  { t: "Pago seguro", s: "100% protegido", icon: (<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>) },
  { t: "Envío", s: "a domicilio", icon: (<><path d="M3 7h11v8H3z" /><path d="M14 10h4l3 3v2h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></>) },
  { t: "Fabricación propia", s: "taller LaFab", icon: (<><path d="M3 21h18" /><path d="M4 21V11l6 3.5V11l6 3.5V8l4 2.2V21" /><path d="M8 21v-2.5M12 21v-2.5M16 21v-2.5" /></>) },
  { t: "Atención postventa", s: "siempre contigo", icon: (<><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="2.5" y="13" width="4" height="6" rx="1.5" /><rect x="17.5" y="13" width="4" height="6" rx="1.5" /><path d="M20 19v.4a3 3 0 0 1-3 3h-4" /></>) },
];

const CSS = `
#lf-buy,#lf-buy *{box-sizing:border-box;margin:0;padding:0;}
#lf-buy{width:100%;background:#fff;color:#151515;font-family:var(--font-poppins),system-ui,sans-serif;
  padding:clamp(56px,9vw,110px) clamp(20px,5vw,70px);}
#lf-buy .lfb-wrap{max-width:1200px;margin:0 auto;}
#lf-buy .lfb-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(28px,4vw,60px);align-items:stretch;}
#lf-buy .lfb-stage{position:relative;border-radius:22px;overflow:hidden;background:#EFECE4;
  min-height:clamp(320px,40vw,520px);box-shadow:0 18px 40px rgba(0,0,0,.08);}
#lf-buy .lfb-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
#lf-buy .lfb-cname{position:absolute;left:18px;bottom:16px;z-index:2;font-size:12px;letter-spacing:.04em;color:#3a3631;
  background:rgba(255,255,255,.85);backdrop-filter:blur(6px);padding:7px 14px;border-radius:999px;}
#lf-buy .lfb-panel{display:flex;flex-direction:column;}
#lf-buy .lfb-eyebrow{font-size:clamp(14px,1.6vw,18px);letter-spacing:3px;text-transform:uppercase;color:#7A6A45;font-weight:500;line-height:1.3;}
#lf-buy .lfb-name{font-weight:300;font-size:clamp(26px,3.2vw,40px);letter-spacing:-.01em;margin-top:10px;}
#lf-buy .lfb-tagline{font-weight:300;font-size:14px;color:#6B6B6B;margin:6px 0 26px;}
#lf-buy .lfb-field{margin-bottom:24px;}
#lf-buy .lfb-label{display:block;margin-bottom:12px;font-size:11px;letter-spacing:.24em;text-transform:uppercase;font-weight:500;color:rgba(20,20,20,.45);}
#lf-buy .lfb-opts{display:flex;flex-wrap:wrap;gap:9px;}
#lf-buy .lfb-chip,#lf-buy .lfb-ship{appearance:none;min-height:40px;padding:0 18px;background:transparent;
  border:1px solid rgba(20,20,20,.16);border-radius:5px;font-family:inherit;font-size:13px;font-weight:400;
  color:rgba(20,20,20,.72);cursor:pointer;transition:all .22s ease;}
#lf-buy .lfb-chip:hover,#lf-buy .lfb-ship:hover{border-color:rgba(20,20,20,.4);color:#151515;transform:translateY(-1px);}
#lf-buy .lfb-chip.active,#lf-buy .lfb-ship.active{background:#151515;border-color:#151515;color:#fff;}
#lf-buy .lfb-fabrics{display:flex;flex-wrap:wrap;gap:10px;}
#lf-buy .lfb-fab{appearance:none;text-align:left;padding:12px 18px;background:transparent;
  border:1px solid rgba(20,20,20,.16);border-radius:8px;cursor:pointer;font-family:inherit;
  display:flex;flex-direction:column;gap:3px;transition:all .22s ease;min-width:160px;}
#lf-buy .lfb-fab strong{font-size:14px;font-weight:500;color:#151515;}
#lf-buy .lfb-fab small{font-size:11px;color:#8A8478;letter-spacing:.02em;}
#lf-buy .lfb-fab:hover{border-color:rgba(20,20,20,.4);transform:translateY(-1px);}
#lf-buy .lfb-fab.active{border-color:#151515;box-shadow:0 0 0 1px #151515 inset;}
#lf-buy .lfb-swatches{display:flex;flex-wrap:wrap;gap:22px;}
#lf-buy .lfb-sw{appearance:none;border:0;background:transparent;padding:0;cursor:pointer;
  display:inline-flex;flex-direction:column;align-items:center;gap:9px;}
#lf-buy .lfb-sw-dot{position:relative;width:52px;height:52px;border-radius:999px;background-color:var(--c);
  background-size:cover;background-position:center;
  border:1px solid rgba(20,20,20,.14);box-shadow:inset 0 1px 2px rgba(0,0,0,.06);
  transition:transform .22s ease,box-shadow .22s ease;}
#lf-buy .lfb-sw-dot::before{content:"";position:absolute;inset:-6px;border-radius:inherit;border:1.5px solid transparent;transition:border-color .22s ease;}
#lf-buy .lfb-sw small{font-size:12px;color:rgba(20,20,20,.7);transition:color .22s ease;}
#lf-buy .lfb-sw:hover .lfb-sw-dot{transform:translateY(-2px);box-shadow:0 8px 18px rgba(0,0,0,.08);}
#lf-buy .lfb-sw.active .lfb-sw-dot::before{border-color:#151515;}
#lf-buy .lfb-sw.active small{color:#151515;font-weight:500;}
#lf-buy .lfb-disclaimer{margin-top:14px;font-size:11px;line-height:1.45;font-weight:300;color:rgba(20,20,20,.5);}
#lf-buy .lfb-buybar{margin-top:auto;padding-top:24px;border-top:1px solid rgba(20,20,20,.1);
  display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;}
#lf-buy .lfb-price-wrap{display:flex;flex-direction:column;gap:4px;}
#lf-buy .lfb-from{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7A6A45;}
#lf-buy .lfb-price{font-weight:500;font-size:clamp(28px,3vw,40px);letter-spacing:-.02em;color:#151515;white-space:nowrap;line-height:1;}
#lf-buy .lfb-real{display:flex;align-items:baseline;flex-wrap:wrap;gap:8px;
  font-size:12px;font-weight:400;color:rgba(20,20,20,.5);letter-spacing:.2px;}
#lf-buy .lfb-real s{font-size:clamp(20px,2.4vw,30px);font-weight:600;color:#C0392B;text-decoration:line-through;
  text-decoration-thickness:2px;letter-spacing:-.01em;}
#lf-buy .lfb-pricenote{font-size:11.5px;font-weight:300;color:rgba(20,20,20,.55);}
#lf-buy .lfb-btn{appearance:none;border:1px solid #151515;background:#151515;color:#fff;cursor:pointer;
  min-height:62px;padding:0 50px;border-radius:8px;font-family:inherit;font-size:14px;font-weight:600;
  letter-spacing:.2em;text-transform:uppercase;transition:transform .24s ease,background .24s ease,box-shadow .24s ease;
  animation:lfbPulse 2.4s ease-in-out infinite;}
#lf-buy .lfb-btn:hover{background:#000;transform:translateY(-2px);box-shadow:0 16px 32px rgba(0,0,0,.2);animation:none;}
#lf-buy .lfb-btn[disabled]{opacity:.6;cursor:default;transform:none;animation:none;}
@keyframes lfbPulse{
  0%,100%{box-shadow:0 8px 20px rgba(0,0,0,.14),0 0 0 0 rgba(202,187,160,.55);}
  50%{box-shadow:0 10px 26px rgba(0,0,0,.18),0 0 0 10px rgba(202,187,160,0);}
}
#lf-buy .lfb-seals{display:grid;grid-template-columns:repeat(3,1fr);gap:18px 14px;
  margin-top:24px;padding-top:24px;border-top:1px solid rgba(20,20,20,.08);}
#lf-buy .lfb-seal{display:flex;align-items:center;gap:11px;min-width:0;}
#lf-buy .lfb-seal-ic{width:40px;height:40px;flex:0 0 auto;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:rgba(202,187,160,.16);border:1px solid rgba(202,187,160,.4);color:#8A7D63;}
#lf-buy .lfb-seal-ic svg{width:21px;height:21px;display:block;}
#lf-buy .lfb-seal-tx{display:flex;flex-direction:column;line-height:1.2;min-width:0;}
#lf-buy .lfb-seal-tx strong{font-size:12.5px;font-weight:500;color:#151515;letter-spacing:.01em;}
#lf-buy .lfb-seal-tx small{font-size:10.5px;font-weight:300;color:#8A8478;}
#lf-buy .lfb-legal{margin-top:18px;font-size:11px;line-height:1.5;font-weight:300;color:rgba(20,20,20,.5);}
#lf-buy .lfb-legal strong{font-weight:500;color:rgba(20,20,20,.7);}
@media(max-width:900px){
  #lf-buy .lfb-grid{grid-template-columns:1fr;gap:20px;align-items:start;}
  #lf-buy .lfb-stage{min-height:clamp(280px,46vh,380px);}
  #lf-buy .lfb-panel{gap:0;}
  #lf-buy .lfb-eyebrow{order:1;}#lf-buy .lfb-name{order:2;}#lf-buy .lfb-tagline{order:3;}
  #lf-buy .lfb-field[data-group="fabric"]{order:4;}
  #lf-buy .lfb-field[data-group="color"]{order:5;}
  #lf-buy .lfb-field[data-group="size"]{order:6;}
  #lf-buy .lfb-field[data-group="ship"]{order:7;}
  #lf-buy .lfb-buybar{order:8;}#lf-buy .lfb-seals{order:9;}#lf-buy .lfb-legal{order:10;}
}
@media(max-width:640px){ #lf-buy .lfb-seals{grid-template-columns:repeat(2,1fr);} }
@media(max-width:520px){
  #lf-buy .lfb-buybar{flex-direction:column;align-items:stretch;}
  #lf-buy .lfb-btn{width:100%;}
  #lf-buy .lfb-fab{flex:1;min-width:0;}
}
@media(prefers-reduced-motion:reduce){ #lf-buy .lfb-btn{animation:none;} }
`;

export default function SanDiegoConfigurator() {
  const { add, remove } = useCart();
  const router = useRouter();

  const [size, setSize] = useState("180 cm");
  const [fabricName, setFabricName] = useState(FABRICS[0].name);
  const [colorName, setColorName] = useState(FABRICS[0].colors[0].name);
  const [ship, setShip] = useState(SHIPS[0]);
  const [busy, setBusy] = useState(false);

  const fabric = FABRICS.find((f) => f.name === fabricName) ?? FABRICS[0];
  const color = fabric.colors.find((c) => c.name === colorName) ?? fabric.colors[0];

  const changeFabric = (name: string) => {
    const f = FABRICS.find((x) => x.name === name)!;
    setFabricName(name);
    if (!f.colors.some((c) => c.name === colorName)) setColorName(f.colors[0].name);
  };

  const total = PRICE + ship.cost;
  const realTotal = REAL + ship.cost;

  const buy = () => {
    setBusy(true);
    // Reemplaza cualquier San Diego previo para que el carrito refleje siempre
    // la última configuración elegida (mantiene el id real del producto).
    remove(SANDIEGO.productId);
    add(
      {
        id: SANDIEGO.productId,
        name: `${SANDIEGO.name} · ${size} · ${fabric.name} · ${color.name} · Envío: ${ship.label}${ship.cost > 0 ? ` (+${cop(ship.cost)})` : " (incluido)"}`,
        slug: SANDIEGO.slug,
        image: color.foto,
        price: PRICE,
      },
      1
    );
    router.push("/checkout");
    // Failsafe: si el usuario vuelve atrás (bfcache), el botón no queda trabado.
    setTimeout(() => setBusy(false), 1500);
  };

  return (
    <div id="comprar" style={{ scrollMarginTop: "80px" }}>
      <section id="lf-buy">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="lfb-wrap">
          <div className="lfb-grid">
            <div className="lfb-stage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={color.foto}
                className="lfb-photo lf-fade"
                src={color.foto}
                alt={`Sofá San Diego ${fabric.name} ${color.name}`}
              />
              <span className="lfb-cname">{color.name}</span>
            </div>

            <div className="lfb-panel">
              <span className="lfb-eyebrow">Diseña tu sofá y cómpralo ahora</span>
              <h2 className="lfb-name">Sofá San Diego</h2>
              <p className="lfb-tagline">
                Confort superior para disfrutar todos los días.
              </p>

              {/* Medida */}
              <div className="lfb-field" data-group="size">
                <span className="lfb-label">Elige la medida</span>
                <div className="lfb-opts">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`lfb-chip${size === s ? " active" : ""}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="lfb-field" data-group="fabric">
                <span className="lfb-label">Elige el material de tapizado</span>
                <div className="lfb-fabrics">
                  {FABRICS.map((f) => (
                    <button
                      key={f.name}
                      type="button"
                      className={`lfb-fab${fabricName === f.name ? " active" : ""}`}
                      onClick={() => changeFabric(f.name)}
                    >
                      <strong>{f.name}</strong>
                      <small>{f.tag}</small>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="lfb-field" data-group="color">
                <span className="lfb-label">
                  Elige el color · {fabric.name}
                </span>
                <div className="lfb-swatches">
                  {fabric.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      aria-label={c.name}
                      className={`lfb-sw${colorName === c.name ? " active" : ""}`}
                      onClick={() => setColorName(c.name)}
                    >
                      <span
                        className="lfb-sw-dot"
                        style={
                          {
                            "--c": c.hex,
                            backgroundImage: `url('${c.img}')`,
                          } as CSSProperties
                        }
                      />
                      <small>{c.name}</small>
                    </button>
                  ))}
                </div>
                <p className="lfb-disclaimer">
                  El tono puede variar según el dispositivo y el lote de la tela.
                </p>
              </div>

              {/* Envío */}
              <div className="lfb-field" data-group="ship">
                <span className="lfb-label">Envío</span>
                <div className="lfb-opts">
                  {SHIPS.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      className={`lfb-ship${ship.label === s.label ? " active" : ""}`}
                      onClick={() => setShip(s)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Precio + comprar */}
              <div className="lfb-buybar">
                <div className="lfb-price-wrap">
                  <span className="lfb-from">Total</span>
                  <span className="lfb-price">{cop(total)}</span>
                  <span className="lfb-real">
                    Precio regular <s>{cop(realTotal)}</s>
                  </span>
                  <span className="lfb-pricenote">
                    Sofá {cop(PRICE)} · Envío{" "}
                    {ship.cost > 0 ? cop(ship.cost) : "incluido"}
                  </span>
                </div>
                <button
                  type="button"
                  className="lfb-btn"
                  onClick={buy}
                  disabled={busy}
                >
                  {busy ? "Agregando…" : "Comprar mi sofá"}
                </button>
              </div>

              {/* Sellos */}
              <div className="lfb-seals">
                {SEALS.map((s) => (
                  <div className="lfb-seal" key={s.t}>
                    <span className="lfb-seal-ic">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {s.icon}
                      </svg>
                    </span>
                    <span className="lfb-seal-tx">
                      <strong>{s.t}</strong>
                      <small>{s.s}</small>
                    </span>
                  </div>
                ))}
              </div>

              <p className="lfb-legal">
                <strong>Importante:</strong> Al realizar esta compra, el cliente
                reconoce y acepta que el producto será fabricado de manera
                personalizada conforme a las especificaciones seleccionadas
                durante el proceso de compra. En consecuencia, y de acuerdo con
                el artículo 47 de la Ley 1480 de 2011, no aplica el derecho de
                retracto ni la devolución del dinero por desistimiento o cambio
                de opinión, salvo en los casos de garantía legal por defectos de
                fabricación establecidos por la ley.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
