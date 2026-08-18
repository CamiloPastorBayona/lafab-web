import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";
import Analytics from "@/components/Analytics";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lafab.com.co"),
  title: {
    default: "LaFab | Muebles a la medida en Medellín",
    template: "%s | LaFab",
  },
  description:
    "Fabricamos muebles a la medida en Medellín: sofás, comedores, camas y closets. Diseño propio, materiales de calidad y envío a todo el país.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "LaFab",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO" className={poppins.variable}>
      <head>
        {/* Adelanta la conexión (DNS + TLS) al host de imágenes para que carguen antes */}
        <link
          rel="preconnect"
          href="https://lafab.com.co"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://lafab.com.co" />
      </head>
      <body className="font-sans">
        <Analytics />
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
