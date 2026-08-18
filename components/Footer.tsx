import Link from "next/link";

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=573054602395&text=Hola%20LaFab";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lafab.com.co/wp-content/uploads/2022/12/lafab-blanco.png"
            alt="LaFab"
            className="mb-4 h-9 w-auto"
          />
          <p className="text-sm leading-relaxed text-white/60">
            Fábrica de muebles a la medida en Medellín. Diseño propio,
            materiales de calidad y acompañamiento en cada proyecto.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Explora
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-gold-light">
                Tienda
              </Link>
            </li>
            <li>
              <Link href="/espacios" className="hover:text-gold-light">
                Espacios
              </Link>
            </li>
            <li>
              <Link href="/proyectos" className="hover:text-gold-light">
                Proyectos
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:text-gold-light">
                Nosotros
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Servicios
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/showrooms" className="hover:text-gold-light">
                Showrooms
              </Link>
            </li>
            <li>
              <Link href="/preguntas-frecuentes" className="hover:text-gold-light">
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <a href={WHATSAPP} className="hover:text-gold-light">
                Reservar cita de diseño
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Contacto
          </h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>Cl. 64 #44-74, Itagüí</li>
            <li>Medellín, Colombia</li>
            <li>
              <a href={WHATSAPP} className="hover:text-gold-light">
                WhatsApp: 305 460 2395
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-4 text-sm">
            <a
              href="https://www.instagram.com/lafabricamed/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-light"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/lafabricamed"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-light"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-site px-4 py-5 text-xs text-white/40 md:px-6">
          © {year} LaFab · La Fábrica de Muebles. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
