// Entregas reales de LaFab, fotografiadas en casa de los clientes.
// Las imágenes viven en el CMS; aquí quedan la ruta y el srcset que WordPress
// generó al subirlas, para servir el tamaño justo en cada pantalla. Se omiten
// los recortes cuadrados de la mediateca, que deformarían la foto en el mosaico.
// El orden alterna categorías para que la vista "Todas" no muestre cuatro
// comedores seguidos.
import { UPLOADS as U } from "@/lib/cms";

export const CATEGORIAS_ENTREGA = [
  { key: "todas", label: "Todas" },
  { key: "salas", label: "Salas" },
  { key: "comedores", label: "Comedores" },
  { key: "alcobas", label: "Alcobas" },
  { key: "poltronas", label: "Poltronas" },
  { key: "carpinteria", label: "Carpintería" },
] as const;

export type CategoriaEntrega = Exclude<
  (typeof CATEGORIAS_ENTREGA)[number]["key"],
  "todas"
>;

export type Entrega = {
  src: string;
  srcSet: string;
  w: number;
  h: number;
  alt: string;
  cat: CategoriaEntrega;
};

export const ENTREGAS: Entrega[] = [
  {
    src: `${U}/2026/10/sofa-beige-frente-a-ventanal-con-vista-a-las-montanas-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/sofa-beige-frente-a-ventanal-con-vista-a-las-montanas-lafab-medellin-169x300.webp 169w, ${U}/2026/10/sofa-beige-frente-a-ventanal-con-vista-a-las-montanas-lafab-medellin-576x1024.webp 576w, ${U}/2026/10/sofa-beige-frente-a-ventanal-con-vista-a-las-montanas-lafab-medellin-700x1245.webp 700w, ${U}/2026/10/sofa-beige-frente-a-ventanal-con-vista-a-las-montanas-lafab-medellin-768x1366.webp 768w, ${U}/2026/10/sofa-beige-frente-a-ventanal-con-vista-a-las-montanas-lafab-medellin.webp 787w`,
    w: 787,
    h: 1400,
    alt: "Sofá beige frente a un ventanal con vista a las montañas",
    cat: "salas",
  },
  {
    src: `${U}/2026/10/comedor-de-madera-con-seis-sillas-tapizadas-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/comedor-de-madera-con-seis-sillas-tapizadas-lafab-medellin-300x169.webp 300w, ${U}/2026/10/comedor-de-madera-con-seis-sillas-tapizadas-lafab-medellin-700x394.webp 700w, ${U}/2026/10/comedor-de-madera-con-seis-sillas-tapizadas-lafab-medellin-768x432.webp 768w, ${U}/2026/10/comedor-de-madera-con-seis-sillas-tapizadas-lafab-medellin-1000x563.webp 1000w, ${U}/2026/10/comedor-de-madera-con-seis-sillas-tapizadas-lafab-medellin-1024x576.webp 1024w, ${U}/2026/10/comedor-de-madera-con-seis-sillas-tapizadas-lafab-medellin.webp 1400w`,
    w: 1400,
    h: 788,
    alt: "Comedor de madera con seis sillas tapizadas",
    cat: "comedores",
  },
  {
    src: `${U}/2026/10/alcoba-con-cabecero-en-listones-de-madera-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/alcoba-con-cabecero-en-listones-de-madera-lafab-medellin-300x225.webp 300w, ${U}/2026/10/alcoba-con-cabecero-en-listones-de-madera-lafab-medellin-700x525.webp 700w, ${U}/2026/10/alcoba-con-cabecero-en-listones-de-madera-lafab-medellin-768x576.webp 768w, ${U}/2026/10/alcoba-con-cabecero-en-listones-de-madera-lafab-medellin-1000x750.webp 1000w, ${U}/2026/10/alcoba-con-cabecero-en-listones-de-madera-lafab-medellin-1024x768.webp 1024w, ${U}/2026/10/alcoba-con-cabecero-en-listones-de-madera-lafab-medellin.webp 1400w`,
    w: 1400,
    h: 1050,
    alt: "Alcoba con cabecero en listones de madera y mesas de noche flotantes",
    cat: "alcobas",
  },
  {
    src: `${U}/2026/10/poltrona-crema-con-mesas-redondas-de-madera-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/poltrona-crema-con-mesas-redondas-de-madera-lafab-medellin-169x300.webp 169w, ${U}/2026/10/poltrona-crema-con-mesas-redondas-de-madera-lafab-medellin-576x1024.webp 576w, ${U}/2026/10/poltrona-crema-con-mesas-redondas-de-madera-lafab-medellin-700x1245.webp 700w, ${U}/2026/10/poltrona-crema-con-mesas-redondas-de-madera-lafab-medellin-768x1366.webp 768w, ${U}/2026/10/poltrona-crema-con-mesas-redondas-de-madera-lafab-medellin.webp 787w`,
    w: 787,
    h: 1400,
    alt: "Poltrona crema con mesas redondas de madera",
    cat: "poltronas",
  },
  {
    src: `${U}/2026/10/escritorio-empotrado-en-madera-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/escritorio-empotrado-en-madera-lafab-medellin-225x300.webp 225w, ${U}/2026/10/escritorio-empotrado-en-madera-lafab-medellin-700x933.webp 700w, ${U}/2026/10/escritorio-empotrado-en-madera-lafab-medellin-768x1024.webp 768w, ${U}/2026/10/escritorio-empotrado-en-madera-lafab-medellin.webp 960w`,
    w: 960,
    h: 1280,
    alt: "Escritorio empotrado en madera con biblioteca",
    cat: "carpinteria",
  },
  {
    src: `${U}/2026/10/sofa-blanco-en-sala-con-pared-de-ladrillo-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/sofa-blanco-en-sala-con-pared-de-ladrillo-lafab-medellin-225x300.webp 225w, ${U}/2026/10/sofa-blanco-en-sala-con-pared-de-ladrillo-lafab-medellin-700x933.webp 700w, ${U}/2026/10/sofa-blanco-en-sala-con-pared-de-ladrillo-lafab-medellin-768x1024.webp 768w, ${U}/2026/10/sofa-blanco-en-sala-con-pared-de-ladrillo-lafab-medellin-1000x1333.webp 1000w, ${U}/2026/10/sofa-blanco-en-sala-con-pared-de-ladrillo-lafab-medellin.webp 1050w`,
    w: 1050,
    h: 1400,
    alt: "Sofá blanco en una sala con pared de ladrillo a la vista",
    cat: "salas",
  },
  {
    src: `${U}/2026/10/comedor-de-madera-con-sillas-crema-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/comedor-de-madera-con-sillas-crema-lafab-medellin-169x300.webp 169w, ${U}/2026/10/comedor-de-madera-con-sillas-crema-lafab-medellin-576x1024.webp 576w, ${U}/2026/10/comedor-de-madera-con-sillas-crema-lafab-medellin-700x1245.webp 700w, ${U}/2026/10/comedor-de-madera-con-sillas-crema-lafab-medellin-768x1366.webp 768w, ${U}/2026/10/comedor-de-madera-con-sillas-crema-lafab-medellin.webp 787w`,
    w: 787,
    h: 1400,
    alt: "Comedor de madera con sillas tapizadas en crema",
    cat: "comedores",
  },
  {
    src: `${U}/2026/10/alcoba-con-cabecero-iluminado-y-vista-al-jardin-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/alcoba-con-cabecero-iluminado-y-vista-al-jardin-lafab-medellin-300x225.webp 300w, ${U}/2026/10/alcoba-con-cabecero-iluminado-y-vista-al-jardin-lafab-medellin-700x525.webp 700w, ${U}/2026/10/alcoba-con-cabecero-iluminado-y-vista-al-jardin-lafab-medellin-768x576.webp 768w, ${U}/2026/10/alcoba-con-cabecero-iluminado-y-vista-al-jardin-lafab-medellin-1000x750.webp 1000w, ${U}/2026/10/alcoba-con-cabecero-iluminado-y-vista-al-jardin-lafab-medellin-1024x768.webp 1024w, ${U}/2026/10/alcoba-con-cabecero-iluminado-y-vista-al-jardin-lafab-medellin.webp 1280w`,
    w: 1280,
    h: 960,
    alt: "Alcoba con cabecero iluminado en madera y vista al jardín",
    cat: "alcobas",
  },
  {
    src: `${U}/2026/10/poltronas-y-sofa-crema-en-sala-con-jardin-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/poltronas-y-sofa-crema-en-sala-con-jardin-lafab-medellin-300x169.webp 300w, ${U}/2026/10/poltronas-y-sofa-crema-en-sala-con-jardin-lafab-medellin-700x394.webp 700w, ${U}/2026/10/poltronas-y-sofa-crema-en-sala-con-jardin-lafab-medellin-768x432.webp 768w, ${U}/2026/10/poltronas-y-sofa-crema-en-sala-con-jardin-lafab-medellin-1000x563.webp 1000w, ${U}/2026/10/poltronas-y-sofa-crema-en-sala-con-jardin-lafab-medellin-1024x576.webp 1024w, ${U}/2026/10/poltronas-y-sofa-crema-en-sala-con-jardin-lafab-medellin.webp 1400w`,
    w: 1400,
    h: 788,
    alt: "Poltronas y sofá crema en una sala abierta al jardín",
    cat: "poltronas",
  },
  {
    src: `${U}/2026/10/mueble-de-tv-a-la-medida-en-sala-amplia-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/mueble-de-tv-a-la-medida-en-sala-amplia-lafab-medellin-300x225.webp 300w, ${U}/2026/10/mueble-de-tv-a-la-medida-en-sala-amplia-lafab-medellin-700x525.webp 700w, ${U}/2026/10/mueble-de-tv-a-la-medida-en-sala-amplia-lafab-medellin-768x576.webp 768w, ${U}/2026/10/mueble-de-tv-a-la-medida-en-sala-amplia-lafab-medellin-1000x750.webp 1000w, ${U}/2026/10/mueble-de-tv-a-la-medida-en-sala-amplia-lafab-medellin-1024x768.webp 1024w, ${U}/2026/10/mueble-de-tv-a-la-medida-en-sala-amplia-lafab-medellin.webp 1280w`,
    w: 1280,
    h: 960,
    alt: "Mueble de TV a la medida en una sala amplia",
    cat: "carpinteria",
  },
  {
    src: `${U}/2026/10/sofa-blanco-en-sala-de-apartamento-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/sofa-blanco-en-sala-de-apartamento-lafab-medellin-225x300.webp 225w, ${U}/2026/10/sofa-blanco-en-sala-de-apartamento-lafab-medellin-700x933.webp 700w, ${U}/2026/10/sofa-blanco-en-sala-de-apartamento-lafab-medellin-768x1024.webp 768w, ${U}/2026/10/sofa-blanco-en-sala-de-apartamento-lafab-medellin.webp 960w`,
    w: 960,
    h: 1280,
    alt: "Sofá blanco en la sala de un apartamento con mesa de centro de vidrio",
    cat: "salas",
  },
  {
    src: `${U}/2026/10/comedor-de-madera-con-sillas-curvas-junto-al-ventanal-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/comedor-de-madera-con-sillas-curvas-junto-al-ventanal-lafab-medellin-225x300.webp 225w, ${U}/2026/10/comedor-de-madera-con-sillas-curvas-junto-al-ventanal-lafab-medellin-700x933.webp 700w, ${U}/2026/10/comedor-de-madera-con-sillas-curvas-junto-al-ventanal-lafab-medellin-768x1024.webp 768w, ${U}/2026/10/comedor-de-madera-con-sillas-curvas-junto-al-ventanal-lafab-medellin.webp 960w`,
    w: 960,
    h: 1280,
    alt: "Comedor de madera con sillas curvas junto al ventanal",
    cat: "comedores",
  },
  {
    src: `${U}/2026/10/mueble-de-tv-con-nichos-iluminados-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/mueble-de-tv-con-nichos-iluminados-lafab-medellin-225x300.webp 225w, ${U}/2026/10/mueble-de-tv-con-nichos-iluminados-lafab-medellin-700x933.webp 700w, ${U}/2026/10/mueble-de-tv-con-nichos-iluminados-lafab-medellin-768x1024.webp 768w, ${U}/2026/10/mueble-de-tv-con-nichos-iluminados-lafab-medellin.webp 960w`,
    w: 960,
    h: 1280,
    alt: "Mueble de TV con nichos iluminados",
    cat: "carpinteria",
  },
  {
    src: `${U}/2026/10/sofa-crema-en-sala-moderna-con-tapete-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/sofa-crema-en-sala-moderna-con-tapete-lafab-medellin-300x225.webp 300w, ${U}/2026/10/sofa-crema-en-sala-moderna-con-tapete-lafab-medellin-700x525.webp 700w, ${U}/2026/10/sofa-crema-en-sala-moderna-con-tapete-lafab-medellin-768x576.webp 768w, ${U}/2026/10/sofa-crema-en-sala-moderna-con-tapete-lafab-medellin-1000x750.webp 1000w, ${U}/2026/10/sofa-crema-en-sala-moderna-con-tapete-lafab-medellin-1024x768.webp 1024w, ${U}/2026/10/sofa-crema-en-sala-moderna-con-tapete-lafab-medellin.webp 1400w`,
    w: 1400,
    h: 1050,
    alt: "Sofá crema en una sala moderna con tapete y mesa de centro",
    cat: "salas",
  },
  {
    src: `${U}/2026/10/comedor-de-seis-puestos-con-pared-en-piedra-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/comedor-de-seis-puestos-con-pared-en-piedra-lafab-medellin-225x300.webp 225w, ${U}/2026/10/comedor-de-seis-puestos-con-pared-en-piedra-lafab-medellin-700x933.webp 700w, ${U}/2026/10/comedor-de-seis-puestos-con-pared-en-piedra-lafab-medellin-768x1024.webp 768w, ${U}/2026/10/comedor-de-seis-puestos-con-pared-en-piedra-lafab-medellin-1000x1333.webp 1000w, ${U}/2026/10/comedor-de-seis-puestos-con-pared-en-piedra-lafab-medellin.webp 1050w`,
    w: 1050,
    h: 1400,
    alt: "Comedor de seis puestos frente a una pared en piedra",
    cat: "comedores",
  },
  {
    src: `${U}/2026/10/mueble-de-tv-en-listones-con-luz-calida-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/mueble-de-tv-en-listones-con-luz-calida-lafab-medellin-300x225.webp 300w, ${U}/2026/10/mueble-de-tv-en-listones-con-luz-calida-lafab-medellin-700x525.webp 700w, ${U}/2026/10/mueble-de-tv-en-listones-con-luz-calida-lafab-medellin-768x576.webp 768w, ${U}/2026/10/mueble-de-tv-en-listones-con-luz-calida-lafab-medellin-1000x750.webp 1000w, ${U}/2026/10/mueble-de-tv-en-listones-con-luz-calida-lafab-medellin-1024x768.webp 1024w, ${U}/2026/10/mueble-de-tv-en-listones-con-luz-calida-lafab-medellin.webp 1280w`,
    w: 1280,
    h: 960,
    alt: "Mueble de TV en listones de madera con luz cálida",
    cat: "carpinteria",
  },
  {
    src: `${U}/2026/10/sofa-crema-junto-a-ventanal-con-mesas-de-centro-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/sofa-crema-junto-a-ventanal-con-mesas-de-centro-lafab-medellin-300x225.webp 300w, ${U}/2026/10/sofa-crema-junto-a-ventanal-con-mesas-de-centro-lafab-medellin-700x525.webp 700w, ${U}/2026/10/sofa-crema-junto-a-ventanal-con-mesas-de-centro-lafab-medellin-768x576.webp 768w, ${U}/2026/10/sofa-crema-junto-a-ventanal-con-mesas-de-centro-lafab-medellin-1000x750.webp 1000w, ${U}/2026/10/sofa-crema-junto-a-ventanal-con-mesas-de-centro-lafab-medellin-1024x768.webp 1024w, ${U}/2026/10/sofa-crema-junto-a-ventanal-con-mesas-de-centro-lafab-medellin.webp 1400w`,
    w: 1400,
    h: 1050,
    alt: "Sofá crema junto a un ventanal con dos mesas de centro",
    cat: "salas",
  },
  {
    src: `${U}/2026/10/sofa-curvo-crema-con-mesas-auxiliares-de-madera-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/sofa-curvo-crema-con-mesas-auxiliares-de-madera-lafab-medellin-300x169.webp 300w, ${U}/2026/10/sofa-curvo-crema-con-mesas-auxiliares-de-madera-lafab-medellin-700x394.webp 700w, ${U}/2026/10/sofa-curvo-crema-con-mesas-auxiliares-de-madera-lafab-medellin-768x432.webp 768w, ${U}/2026/10/sofa-curvo-crema-con-mesas-auxiliares-de-madera-lafab-medellin-1000x563.webp 1000w, ${U}/2026/10/sofa-curvo-crema-con-mesas-auxiliares-de-madera-lafab-medellin-1024x576.webp 1024w, ${U}/2026/10/sofa-curvo-crema-con-mesas-auxiliares-de-madera-lafab-medellin.webp 1400w`,
    w: 1400,
    h: 788,
    alt: "Sofá curvo crema con dos mesas auxiliares redondas de madera",
    cat: "salas",
  },
  {
    src: `${U}/2026/10/sofa-en-l-beige-bajo-techo-de-vigas-de-madera-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/sofa-en-l-beige-bajo-techo-de-vigas-de-madera-lafab-medellin-225x300.webp 225w, ${U}/2026/10/sofa-en-l-beige-bajo-techo-de-vigas-de-madera-lafab-medellin-700x933.webp 700w, ${U}/2026/10/sofa-en-l-beige-bajo-techo-de-vigas-de-madera-lafab-medellin-768x1024.webp 768w, ${U}/2026/10/sofa-en-l-beige-bajo-techo-de-vigas-de-madera-lafab-medellin-1000x1333.webp 1000w, ${U}/2026/10/sofa-en-l-beige-bajo-techo-de-vigas-de-madera-lafab-medellin.webp 1050w`,
    w: 1050,
    h: 1400,
    alt: "Sofá en L beige bajo un techo de vigas de madera",
    cat: "salas",
  },
  {
    src: `${U}/2026/10/sofa-en-l-beige-sala-con-pared-azul-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/sofa-en-l-beige-sala-con-pared-azul-lafab-medellin-225x300.webp 225w, ${U}/2026/10/sofa-en-l-beige-sala-con-pared-azul-lafab-medellin-700x933.webp 700w, ${U}/2026/10/sofa-en-l-beige-sala-con-pared-azul-lafab-medellin-768x1024.webp 768w, ${U}/2026/10/sofa-en-l-beige-sala-con-pared-azul-lafab-medellin-1000x1333.webp 1000w, ${U}/2026/10/sofa-en-l-beige-sala-con-pared-azul-lafab-medellin.webp 1050w`,
    w: 1050,
    h: 1400,
    alt: "Sofá en L beige entregado en una sala con pared azul",
    cat: "salas",
  },
  {
    src: `${U}/2026/10/sofa-en-l-gris-claro-con-cojines-verdes-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/sofa-en-l-gris-claro-con-cojines-verdes-lafab-medellin-300x169.webp 300w, ${U}/2026/10/sofa-en-l-gris-claro-con-cojines-verdes-lafab-medellin-700x394.webp 700w, ${U}/2026/10/sofa-en-l-gris-claro-con-cojines-verdes-lafab-medellin-768x432.webp 768w, ${U}/2026/10/sofa-en-l-gris-claro-con-cojines-verdes-lafab-medellin-1000x563.webp 1000w, ${U}/2026/10/sofa-en-l-gris-claro-con-cojines-verdes-lafab-medellin-1024x576.webp 1024w, ${U}/2026/10/sofa-en-l-gris-claro-con-cojines-verdes-lafab-medellin.webp 1400w`,
    w: 1400,
    h: 788,
    alt: "Sofá en L gris claro con cojines verdes sobre tapete",
    cat: "salas",
  },
  {
    src: `${U}/2026/10/sofa-y-poltronas-crema-en-sala-amplia-lafab-medellin.webp`,
    srcSet: `${U}/2026/10/sofa-y-poltronas-crema-en-sala-amplia-lafab-medellin-225x300.webp 225w, ${U}/2026/10/sofa-y-poltronas-crema-en-sala-amplia-lafab-medellin-700x933.webp 700w, ${U}/2026/10/sofa-y-poltronas-crema-en-sala-amplia-lafab-medellin-768x1024.webp 768w, ${U}/2026/10/sofa-y-poltronas-crema-en-sala-amplia-lafab-medellin.webp 960w`,
    w: 960,
    h: 1280,
    alt: "Sofá y poltronas crema en una sala amplia",
    cat: "salas",
  },
];
