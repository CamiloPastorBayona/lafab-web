// Artículos del blog de LaFab (SEO informacional).
const U = "https://lafab.com.co/wp-content/uploads";

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  image: string;
  date: string; // ISO
  readingMinutes: number;
  excerpt: string;
  bodyHtml: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "como-elegir-el-sofa-perfecto-para-tu-sala",
    title: "Cómo elegir el sofá perfecto para tu sala",
    metaTitle: "Cómo elegir un sofá para tu sala: guía práctica",
    metaDescription:
      "Guía para elegir el sofá ideal para tu sala: medidas, forma (lineal o en L), tela y calidad. Consejos de LaFab, fábrica de muebles en Medellín.",
    keywords: [
      "cómo elegir un sofá",
      "sofá para la sala",
      "sofás a la medida Medellín",
    ],
    image: `${U}/2026/07/3.webp`,
    date: "2026-08-18",
    readingMinutes: 5,
    excerpt:
      "Medidas, forma, tela y calidad: los cuatro factores que definen si un sofá será el acierto de tu sala o un dolor de cabeza.",
    bodyHtml: `
<p>El sofá es el mueble que marca el ritmo de tu sala: define la comodidad, el estilo y hasta cómo te reúnes con los tuyos. Elegir bien no es cuestión de suerte, sino de tener en cuenta cuatro factores clave. En <strong>LaFab</strong> fabricamos sofás a la medida en Medellín, así que estos son los consejos que le damos a cada cliente.</p>

<h2>1. Empieza por las medidas de tu espacio</h2>
<p>Antes de enamorarte de un modelo, mide el espacio disponible: largo de la pared, ancho libre y las rutas de circulación. Un sofá demasiado grande ahoga la sala; uno pequeño se ve perdido. Deja al menos 40–50 cm de paso alrededor. La ventaja de un mueble a la medida es que se ajusta al centímetro a tu espacio, no al revés.</p>

<h2>2. ¿Sofá lineal o en L (angular)?</h2>
<p>El <strong>sofá lineal</strong> es versátil y funciona en casi cualquier sala. El <strong>sofá en L o angular</strong> aprovecha mejor las esquinas y suma puestos, ideal para familias o para quienes ven películas en casa. Si tu sala es cuadrada o pequeña, un lineal mantiene la amplitud; si es amplia o en L, un angular la define muy bien.</p>

<h2>3. La tela lo cambia todo</h2>
<p>La tela decide la durabilidad y el mantenimiento. Para hogares con niños o mascotas, busca telas <strong>antifluido</strong> y <strong>pet friendly</strong>, que repelen líquidos y facilitan la limpieza. El color también importa: los tonos neutros (marfil, beige, avellana) son atemporales y combinan con todo.</p>

<h2>4. Fíjate en lo que no se ve</h2>
<p>La estructura y las espumas deciden cuánto dura el sofá. Una base en madera inmunizada y espumas de buena densidad evitan que se hunda con los años. En LaFab controlamos cada etapa, del corte a la tapicería, para que esa comodidad se mantenga.</p>

<h2>En resumen</h2>
<p>Mide bien, elige la forma según tu espacio, prioriza una tela resistente y no sacrifiques la calidad interna. Si quieres un sofá hecho a tu medida, mira nuestra colección de <a href="/sofas">sofás a la medida</a> o conoce el <a href="/san-diego">Sofá San Diego</a>, nuestro modelo insignia con telas antifluido y pet friendly.</p>
`,
  },

  {
    slug: "que-tela-es-mejor-para-un-sofa-con-mascotas",
    title: "¿Qué tela es mejor para un sofá con mascotas?",
    metaTitle: "Mejor tela para sofá con mascotas: guía pet friendly",
    metaDescription:
      "¿Tienes perros o gatos? Descubre qué telas pet friendly y antifluido son mejores para tu sofá y cómo cuidarlas. Consejos de LaFab, Medellín.",
    keywords: [
      "tela para sofá con mascotas",
      "sofá pet friendly",
      "tela antifluido sofá",
    ],
    image: `${U}/2026/06/milan-tela-marfil.webp`,
    date: "2026-08-18",
    readingMinutes: 4,
    excerpt:
      "No todas las telas aguantan pelos, uñas y accidentes. Estas son las opciones pet friendly que recomendamos y cómo mantenerlas impecables.",
    bodyHtml: `
<p>Si compartes tu casa con perros o gatos, el sofá recibe pelos, uñas y algún que otro accidente. La buena noticia: hay telas pensadas para el uso real que aguantan mucho mejor. En <strong>LaFab</strong> trabajamos telas <strong>pet friendly</strong> y <strong>antifluido</strong>, y aquí te contamos cuál elegir.</p>

<h2>Busca telas antifluido</h2>
<p>Las telas con tratamiento antifluido (como la tecnología AquaFobiak®) hacen que líquidos como el café, el jugo o el agua resbalen y se queden en la superficie unos segundos. Eso te da tiempo de limpiarlos antes de que se absorban, algo muy útil cuando hay niños o mascotas en casa.</p>

<h2>Microfibra vs. chenil</h2>
<p>La <strong>microfibra tipo soft velvet</strong> es suave, elegante y muy fácil de limpiar; reduce el enganche de pelos y resiste el uso diario. El <strong>chenil</strong> tiene una textura más cálida y acogedora, también con protección antifluido. Ambas son excelentes para hogares con mascotas; la elección final es de tacto y estilo.</p>

<h2>Cómo cuidar la tela</h2>
<p>Limpia los derrames de inmediato con un paño apenas húmedo, aspira con frecuencia para retirar pelos, y evita productos abrasivos que dañen el tratamiento protector. Con un cuidado sencillo, la tela conserva su apariencia por mucho más tiempo.</p>

<h2>Una nota honesta</h2>
<p>Ninguna tela es indestructible: uñas o mordidas repetidas pueden generar desgaste. Pero eligiendo una tela pet friendly y cuidándola bien, tu sofá se mantendrá bonito durante años.</p>

<p>¿Quieres un sofá listo para tu familia (de dos y cuatro patas)? Descubre el <a href="/san-diego">Sofá San Diego</a> con telas antifluido, o mira todos nuestros <a href="/sofas">sofás a la medida</a>.</p>
`,
  },

  {
    slug: "medidas-ideales-de-un-comedor-segun-los-puestos",
    title: "Medidas ideales de un comedor según el número de puestos",
    metaTitle: "Medidas de un comedor por puestos (4, 6 y 8)",
    metaDescription:
      "¿Qué medidas debe tener tu comedor para 4, 6 u 8 puestos? Guía práctica con dimensiones y espacio de circulación. LaFab, comedores a la medida en Medellín.",
    keywords: [
      "medidas de un comedor",
      "mesa de comedor 6 puestos",
      "comedores de madera Medellín",
    ],
    image: `${U}/2025/01/WITTEN-1.jpg`,
    date: "2026-08-18",
    readingMinutes: 4,
    excerpt:
      "Antes de comprar tu comedor, revisa cuánto espacio necesitas por puesto y para circular cómodamente. Aquí la guía por número de puestos.",
    bodyHtml: `
<p>Elegir el comedor correcto empieza por las medidas: ni tan grande que estorbe, ni tan pequeño que incomode. Como referencia, cada comensal necesita unos <strong>60 cm de ancho</strong> para estar cómodo, y conviene dejar <strong>70–90 cm</strong> alrededor de la mesa para pasar y correr las sillas. En <strong>LaFab</strong> fabricamos comedores a la medida; estas son las dimensiones típicas.</p>

<h2>Comedor de 4 puestos</h2>
<p>Ideal para apartamentos y espacios compactos. Una mesa de aproximadamente <strong>1.20–1.30 m de largo por 80–90 cm de ancho</strong> acomoda cómodamente a cuatro personas. Perfecto para el día a día en parejas o familias pequeñas.</p>

<h2>Comedor de 6 puestos</h2>
<p>El más popular. Con cerca de <strong>1.50–1.80 m de largo por 90–100 cm de ancho</strong> caben seis comensales con holgura. Es la opción equilibrada para familias y para recibir visitas de vez en cuando.</p>

<h2>Comedor de 8 puestos</h2>
<p>Para quienes reciben seguido o tienen familia grande. Una mesa de <strong>2.00–2.40 m de largo</strong> permite sentar a ocho personas. Requiere una zona amplia: asegúrate de tener espacio de circulación suficiente alrededor.</p>

<h2>No olvides la circulación</h2>
<p>Más importante que el tamaño de la mesa es el espacio libre alrededor. Si tras poner la mesa no quedan al menos 70 cm para pasar, conviene bajar de puestos o elegir una medida a la medida de tu espacio.</p>

<p>¿Listo para tu comedor? Míralos en nuestra sección de <a href="/comedores">comedores de madera a la medida</a> y cuéntanos las dimensiones de tu espacio: lo fabricamos a tu medida.</p>
`,
  },
];

export const getArticle = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);
