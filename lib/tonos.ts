// Claridad real de cada tela, medida sobre el retazo que el CMS trae con
// cada variación: 100 es blanco y 0 negro. Sirve para ordenar los círculos
// de color de más claro a más oscuro, que es como se leen de un vistazo.
// Se regenera midiendo de nuevo los retazos si entra una tela nueva; una que
// falte no rompe nada, solo se va al final de la fila.

export const TONO: Record<string, number> = {
  "Cuero|Azul": 13.0,
  "Cuero|Chocolate": 10.6,
  "Cuero|Ebano": 30.5,
  "Cuero|Gris Claro": 59.0,
  "Cuero|Marfil": 74.9,
  "Cuero|Marron Oscuro": 8.4,
  "Cuero|Miel Claro": 37.8,
  "Cuero|Zafiro": 11.9,
  "Lino|Amore Beige": 77.8,
  "Lino|Amore Crudo": 88.1,
  "Lino|Amore Marfil": 82.2,
  "Lino|Amore Nuez": 68.5,
  "Lino|Bait Aluminio": 68.9,
  "Lino|Bait Arena": 77.4,
  "Lino|Bait Beige": 75.4,
  "Lino|Bait Marfil": 87.4,
  "Lino|Bait Navy": 18.3,
  "Lino|Bait Taupe": 62.0,
  "Lino|Ferrero Crema": 83.1,
  "Lino|Ferrero Lino": 73.8,
  "Lino|Ferrero Marfil": 82.6,
  "Lino|France Camel": 64.2,
  "Lino|France Crudo": 85.1,
  "Lino|France Gris": 54.2,
  "Lino|France Marfil": 84.8,
  "Lino|France Nuez": 72.7,
  "Lino|France Oceano": 25.1,
  "Lino|France Plata": 75.5,
  "Lino|Layla Crudo": 91.6,
  "Lino|Layla Gris": 50.5,
  "Lino|Layla Sand": 81.2,
  "Lino|Majestic Almendra": 74.8,
  "Lino|Majestic Crema": 92.1,
  "Lino|Majestic Plata": 61.6,
  "Lino|Majestic Plomo": 9.3,
  "Lino|Marfil": 86.0,
  "Lino|Zajari Beige": 62.7,
  "Lino|Zajari Gris Light": 80.4,
  "Lino|Zajari Sand": 77.2,
  "Madera|Duratex Amaretto": 63.6,
  "Madera|Duratex Arena": 79.7,
  "Madera|Flormorado": 67.0,
  "Madera|Graffo": 34.6,
  "Madera|Koa": 30.7,
  "Madera|Roble Natural": 62.4,
  "Microfibra|Galicia Crema": 73.5,
  "Microfibra|Galicia Gris": 15.6,
  "Microfibra|Galicia Marfil": 80.2,
  "Microfibra|Galicia Plata": 66.0,
  "Microfibra|Gris": 62.5,
  "Microfibra|Licia Azul": 16.3,
  "Microfibra|Licia Crema": 73.5,
  "Microfibra|Licia Taupe": 53.0,
  "Microfibra|Montana Cocoa": 54.4,
  "Microfibra|Montana Perla": 82.7,
  "Microfibra|Montana Plata": 61.9,
  "Microfibra|Pompeya Almendra": 68.1,
  "Microfibra|Pompeya Cenizo": 34.8,
  "Microfibra|Pompeya Marfil": 81.8,
  "Microfibra|Pompeya Nuez": 52.8,
  "Microfibra|Pompeya Plata": 73.7,
  "Microfibra|Rossi Cocoa": 75.5,
  "Microfibra|Rossi Esmeralda": 11.7,
  "Microfibra|Rossi Humo": 24.7,
  "Microfibra|Rossi Nieve": 84.8,
  "Microfibra|Rossi Plata": 69.3,
};

/** Claridad de un color; 101 para los que no están medidos, para que no se
  * cuelen delante de los que sí. */
export function tonoDe(material: string, color: string): number {
  const exacto = TONO[`${material}|${color}`];
  if (exacto !== undefined) return exacto;
  // Por si el material viene con otro nombre: se busca solo por el color.
  for (const [clave, v] of Object.entries(TONO)) {
    if (clave.endsWith(`|${color}`)) return v;
  }
  return 101;
}

// Con qué material y color abre cada ficha. La regla: el material más
// económico (para que el precio coincida con el de la tienda) y, dentro de
// él, el color que de verdad se parece a la foto principal del producto.
// Se calculó comparando los grupos de color dominantes del centro de cada
// foto contra el retazo de cada tela, y se revisó una por una: las cinco que
// el cálculo no acertó están corregidas a mano.
export const COLOR_INICIAL: Record<string, { material: string; color: string }> = {
  "alcoba-abba": { material: "Microfibra", color: "Galicia Crema" },
  "alcoba-atenea": { material: "Microfibra", color: "Pompeya Almendra" },
  "alcoba-barbados": { material: "Microfibra", color: "Pompeya Nuez" },
  "alcoba-gales": { material: "Microfibra", color: "Galicia Marfil" },
  "alcoba-kenia": { material: "Madera", color: "Duratex Arena" },
  "alcoba-luau": { material: "Madera", color: "Roble Natural" },
  "alcoba-lucca": { material: "Microfibra", color: "Rossi Cocoa" },
  "alcoba-nova": { material: "Microfibra", color: "Pompeya Almendra" },
  "alcoba-santa-rosa": { material: "Madera", color: "Roble Natural" },
  "alcoba-varsovia": { material: "Madera", color: "Koa" },
  "comedor-bonn": { material: "Microfibra", color: "Pompeya Marfil" },
  "comedor-dokko": { material: "Microfibra", color: "Pompeya Marfil" },
  "comedor-ekko": { material: "Microfibra", color: "Pompeya Almendra" },
  "comedor-enzo": { material: "Microfibra", color: "Montana Perla" },
  "comedor-hakka": { material: "Microfibra", color: "Galicia Marfil" },
  "comedor-khuma": { material: "Microfibra", color: "Montana Plata" },
  "comedor-regatta": { material: "Microfibra", color: "Galicia Plata" },
  "comedor-witten": { material: "Microfibra", color: "Pompeya Marfil" },
  "comedor-zell": { material: "Microfibra", color: "Pompeya Almendra" },
  "poltrona-ares": { material: "Microfibra", color: "Pompeya Almendra" },
  "poltrona-charles": { material: "Microfibra", color: "Pompeya Almendra" },
  "poltrona-irvine": { material: "Microfibra", color: "Rossi Nieve" },
  "poltrona-kinley": { material: "Microfibra", color: "Pompeya Almendra" },
  "poltrona-metz": { material: "Microfibra", color: "Pompeya Almendra" },
  "poltrona-montpellier": { material: "Microfibra", color: "Pompeya Almendra" },
  "poltrona-ruan": { material: "Microfibra", color: "Rossi Nieve" },
  "poltrona-saint": { material: "Microfibra", color: "Galicia Plata" },
  "poltrona-trixie": { material: "Microfibra", color: "Pompeya Almendra" },
  "poltrona-velvet": { material: "Microfibra", color: "Pompeya Almendra" },
  "sofa-ankora": { material: "Microfibra", color: "Licia Azul" },
  "sofa-bari": { material: "Microfibra", color: "Licia Azul" },
  "sofa-en-l-ankara": { material: "Microfibra", color: "Galicia Gris" },
  "sofa-en-l-boston": { material: "Microfibra", color: "Galicia Crema" },
  "sofa-en-l-california-bay": { material: "Microfibra", color: "Pompeya Marfil" },
  "sofa-en-l-ginebra": { material: "Microfibra", color: "Rossi Cocoa" },
  "sofa-en-l-israel": { material: "Microfibra", color: "Rossi Nieve" },
  "sofa-en-l-madison": { material: "Microfibra", color: "Galicia Marfil" },
  "sofa-en-l-new-york": { material: "Microfibra", color: "Galicia Marfil" },
  "sofa-en-l-phoenix": { material: "Microfibra", color: "Rossi Nieve" },
  "sofa-en-l-san-diego": { material: "Microfibra", color: "Rossi Cocoa" },
  "sofa-en-l-vermont": { material: "Microfibra", color: "Pompeya Nuez" },
  "sofa-ginebra": { material: "Microfibra", color: "Pompeya Marfil" },
  "sofa-italia": { material: "Microfibra", color: "Licia Azul" },
  "sofa-latina": { material: "Microfibra", color: "Pompeya Marfil" },
  "sofa-luton": { material: "Microfibra", color: "Pompeya Almendra" },
  "sofa-milan": { material: "Microfibra", color: "Montana Perla" },
  "sofa-new-york": { material: "Microfibra", color: "Galicia Gris" },
  "sofa-piamonte": { material: "Microfibra", color: "Rossi Esmeralda" },
  "sofa-san-diego": { material: "Microfibra", color: "Pompeya Almendra" },
  "sofa-sevilla": { material: "Microfibra", color: "Pompeya Marfil" },
  "sofa-turin": { material: "Microfibra", color: "Licia Azul" },
  "sofa-vittorio": { material: "Microfibra", color: "Pompeya Almendra" },
};
