import Link from "next/link";
import Ico from "@/components/LandingIcons";

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=573054602395&text=Hola%20LaFab";
const CATALOGO =
  "https://api.whatsapp.com/send/?phone=573054602395&text=Hola%20LaFab,%20quiero%20solicitar%20el%20cat%C3%A1logo";

const SEALS = [
  { t: "Garantía", s: "por fabricación", icon: "shieldCheck" },
  { t: "Pago seguro", s: "100% protegido", icon: "lock" },
  { t: "Fabricación propia", s: "taller LaFab", icon: "factory" },
  { t: "Envíos nacionales", s: "a todo el país", icon: "truck" },
  { t: "Respaldo LaFab", s: "marca confiable", icon: "award" },
];

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const col = "space-y-3 text-sm";
  const head =
    "mb-5 text-sm font-medium uppercase tracking-[0.2em] text-white/50";
  const link = "text-white/75 transition-colors hover:text-gold-light";

  return (
    <footer className="bg-[#0a0a0a] text-white/80">
      <div className="mx-auto max-w-site px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png"
              alt="LaFab"
              className="mb-5 h-9 w-auto"
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              Muebles hechos a tu medida, pensados para durar toda la vida.
            </p>
            <div className="mt-6 flex gap-3">
              <Social
                href="https://www.instagram.com/lafabricamed/"
                label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </Social>
              <Social
                href="https://www.facebook.com/LaFabricaMed"
                label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3H13.5V9.7c0-.4.3-.7.7-.7z" />
                </svg>
              </Social>
            </div>
          </div>

          {/* Explora */}
          <div className={col}>
            <h4 className={head}>Explora</h4>
            <Link href="/shop" className={`block ${link}`}>Productos</Link>
            <Link href="/proyectos" className={`block ${link}`}>Proyectos</Link>
            <Link href="/nosotros" className={`block ${link}`}>Nosotros</Link>
            <a href={CATALOGO} target="_blank" rel="noopener noreferrer" className={`block ${link}`}>
              Solicitar catálogo
            </a>
          </div>

          {/* Servicios */}
          <div className={col}>
            <h4 className={head}>Servicios</h4>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`block ${link}`}>
              Agenda tu cita
            </a>
            <Link href="/espacios" className={`block ${link}`}>Diseño de interiores</Link>
            <Link href="/preguntas-frecuentes" className={`block ${link}`}>Preguntas frecuentes</Link>
            <a
              href="https://lafab.com.co/poliza-de-garantia/"
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${link}`}
            >
              Póliza de garantía
            </a>
          </div>

          {/* Contacto */}
          <div className={col}>
            <h4 className={head}>Contacto</h4>
            <a href="mailto:info@lafab.com.co" className={`block ${link}`}>
              info@lafab.com.co
            </a>
            <a href="tel:+573054602395" className={`block ${link}`}>(305) 460 2395</a>
            <a href="tel:+573053298641" className={`block ${link}`}>(305) 329 8641</a>
            <p className="pt-1 text-white/55">
              Cl. 64 #44-74, Barrio La Esmeralda
              <br />
              Itagüí, Antioquia
            </p>
          </div>
        </div>

        {/* Sellos */}
        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3 lg:grid-cols-5">
          {SEALS.map((s) => (
            <div key={s.t} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-gold">
                <Ico name={s.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">{s.t}</p>
                <p className="text-xs text-white/45">{s.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barra legal */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-4 py-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between md:px-6">
          <span>
            © {year} LaFab · Inversiones Correa Rua S.A.S. · NIT 901.606.662-6
          </span>
          <span className="flex gap-5">
            <Link href="/terminos-y-condiciones" className="hover:text-gold-light">
              Términos y condiciones
            </Link>
            <Link href="/politica-de-datos" className="hover:text-gold-light">
              Política de datos
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
