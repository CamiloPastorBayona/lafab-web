// Artículos del blog de LaFab (SEO informacional).
import { UPLOADS as U } from "@/lib/cms";


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

<h2>2. ¿Sofá lineal o sofá en L?</h2>
<p>El <strong>sofá lineal</strong> es versátil y funciona en casi cualquier sala. El <strong>sofá en L</strong> aprovecha mejor las esquinas y suma puestos, ideal para familias o para quienes ven películas en casa. Si tu sala es cuadrada o pequeña, un sofá lineal mantiene la amplitud; si es amplia o en L, un sofá en L la define muy bien.</p>

<h2>3. La tela lo cambia todo</h2>
<p>La tela decide la durabilidad y el mantenimiento. Para hogares con niños o mascotas, busca telas <strong>antifluido</strong> y <strong>pet friendly</strong>, que repelen líquidos y facilitan la limpieza. El color también importa: los tonos neutros (marfil, beige, avellana) son atemporales y combinan con todo.</p>

<h2>4. Fíjate en lo que no se ve</h2>
<p>La estructura y las espumas deciden cuánto dura el sofá. Una base en madera inmunizada y espumas de buena densidad evitan que se hunda con los años. En LaFab controlamos cada etapa, del corte a la tapicería, para que esa comodidad se mantenga.</p>

<h2>En resumen</h2>
<p>Mide bien, elige la forma según tu espacio, prioriza una tela resistente y no sacrifiques la calidad interna. Si quieres un sofá hecho a la medida, mira nuestra colección de <a href="/sofas">sofás a la medida</a> o conoce el <a href="/san-diego">Sofá San Diego</a>, nuestro modelo insignia con telas antifluido y pet friendly.</p>
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

<h2>Microfibra, lino o cuero</h2>
<p>La <strong>microfibra tipo soft velvet</strong> es la más agradecida con mascotas: suave, de trama cerrada, fácil de limpiar y con menos enganche de pelo. El <strong>lino</strong> tiene una textura natural preciosa, pero esa misma textura engancha más pelo y más uña. El <strong>cuero</strong> se limpia pasando un paño y no suelta hilos, aunque una uña puede dejarle una marca permanente. Si en tu casa hay un gato, lee también <a href="/blog/que-tela-no-raya-el-gato">qué tela no raya el gato</a>: ahí explicamos por qué el tipo de tejido importa más que la marca.</p>

<h2>Cómo cuidar la tela</h2>
<p>Limpia los derrames de inmediato con un paño apenas húmedo, aspira con frecuencia para retirar pelos, y evita productos abrasivos que dañen el tratamiento protector. Con un cuidado sencillo, la tela conserva su apariencia por mucho más tiempo.</p>

<h2>Una nota honesta</h2>
<p>Ninguna tela es indestructible: uñas o mordidas repetidas pueden generar desgaste. Pero eligiendo una tela pet friendly y cuidándola bien, tu sofá se mantendrá bonito durante años.</p>

<p>¿Quieres un sofá listo para tu familia (de dos y cuatro patas)? Descubre el <a href="/san-diego">Sofá San Diego</a> con telas antifluido, o mira todos nuestros <a href="/sofas">sofás a la medida</a>.</p>
`,
  },

  {
    slug: "que-tela-no-raya-el-gato",
    title: "¿Qué tela no raya el gato? Lo que de verdad decide",
    metaTitle: "¿Qué tela no raya el gato? Guía honesta para elegir sofá",
    metaDescription:
      "Ninguna tela es a prueba de gatos, pero el tipo de tejido cambia todo. Qué telas enganchan la uña, cuáles no y qué hacer además de elegir bien.",
    keywords: [
      "qué tela no raya el gato",
      "sofá a prueba de gatos",
      "tela para sofá con gatos",
      "sofá antiarañazos",
    ],
    image: `${U}/2026/10/sofa-crema-junto-a-ventanal-con-mesas-de-centro-lafab-medellin.webp`,
    date: "2026-10-31",
    readingMinutes: 6,
    excerpt:
      "No existe una tela a prueba de gatos, y quien te diga lo contrario te está vendiendo algo. Lo que sí existe es un tipo de tejido que la uña no logra enganchar, y ahí está casi toda la diferencia.",
    bodyHtml: `
<p>Es la pregunta que más nos hacen por WhatsApp, y casi siempre llega después del daño: alguien ya tiene un sofá con hilos sacados en los brazos y quiere asegurarse de no repetirlo. Vamos a responderla sin vender humo.</p>

<p><strong>Ninguna tela es a prueba de gatos.</strong> Si alguien te promete una, está exagerando. Pero sí hay una diferencia enorme entre una tela que la uña engancha y una que no, y esa diferencia no está en la marca ni en el precio: está en cómo está tejida.</p>

<h2>Primero, por qué rasca tu gato</h2>
<p>No lo hace por dañar ni por rabia. Rascar le sirve para tres cosas: retirar la capa vieja de la uña, estirar la espalda y las patas al despertar, y marcar territorio —tiene glándulas en las almohadillas que dejan olor—. Por eso rasca en lugares visibles y de paso, no escondido. Y por eso el brazo del sofá, que está a la entrada de la sala y a la altura perfecta, es el blanco número uno.</p>

<p>Entender esto cambia la solución. No se trata de que deje de rascar: se trata de darle una superficie mejor y de que el sofá no sea una presa fácil.</p>

<h2>Lo que de verdad decide: trama cerrada contra bucle</h2>
<p>Una uña de gato no corta la tela como una cuchilla. Lo que hace es <strong>engancharse en un hilo y halarlo</strong>. Por eso el enemigo no es la dureza de la tela sino su relieve:</p>

<ul>
  <li><strong>Telas de bucle o trama abierta</strong> —bouclé, linos rústicos de hilo grueso, tejidos con textura muy marcada— tienen hilos que sobresalen formando pequeños arcos. La uña entra en el arco, el gato tira y saca el hilo. Un solo hilo corrido arruina más la apariencia de un sofá que cien arañazos superficiales, y no se puede devolver a su sitio.</li>
  <li><strong>Telas de trama cerrada y pelo corto</strong> —la microfibra tipo soft velvet es el caso típico— no tienen dónde engancharse. La uña resbala. Puede alborotar el pelo de la tela, pero eso se cepilla con la mano y vuelve a su sitio.</li>
</ul>

<p>Esa es la regla práctica: <em>si al pasar la mano sientes hilos que sobresalen, la uña también los va a encontrar.</em></p>

<h2>Qué significa esto en nuestro catálogo</h2>
<p>Trabajamos tres materiales, y con gato en casa no se comportan igual:</p>

<h3>Microfibra — la mejor opción si hay gato</h3>
<p>Es una tela de trama cerrada y pelo corto, del tipo que no le da agarre a la uña. Además es antifluido, lo que ayuda con el otro clásico de tener gato: la bola de pelo del lunes por la mañana. Es la que recomendamos cuando alguien nos escribe diciendo "tengo dos gatos".</p>

<h3>Lino — más bonito, más vulnerable</h3>
<p>El lino tiene una textura natural que a mucha gente le encanta, y precisamente esa textura es la que un gato puede enganchar. No está prohibido tener lino con gato, pero conviene saber en qué te metes: si tu gato ya tiene historial de rascar muebles, no es la decisión más tranquila.</p>

<h3>Cuero — otro tipo de daño</h3>
<p>Aquí no hay hilos que sacar, así que el daño de "hilo corrido" desaparece. A cambio, una uña sí puede dejar una marca o una perforación, y en cuero esas marcas se quedan. La ventaja: se limpia pasando un paño y resiste muy bien el pelo. La desventaja, además del precio, es que un rayón es permanente.</p>

<h2>El color también disimula (o delata)</h2>
<p>En una microfibra, el roce de la uña altera la dirección del pelo y se nota como una zona más clara o más oscura. En tonos medios —arena, almendra, plata— eso casi no se ve y se corrige pasando la mano. En un liso muy oscuro se nota más, porque cualquier cambio de dirección de la fibra contrasta.</p>

<h2>Lo que funciona además de la tela</h2>
<p>Elegir bien la tela resuelve la mitad del problema. La otra mitad no es un material, es una costumbre:</p>

<ul>
  <li><strong>Pon un rascador junto al sofá, no en la otra esquina.</strong> El gato rasca ahí porque es su sitio de paso. Si el rascador está a tres metros, no lo va a usar. Si está pegado al brazo que rasca, en pocas semanas cambia de superficie.</li>
  <li><strong>Que sea vertical y firme.</strong> El gato estira el cuerpo al rascar. Un rascador bajo o que se tambalea no le sirve y vuelve al sofá.</li>
  <li><strong>Corta las uñas cada dos o tres semanas.</strong> Una uña corta engancha mucho menos. Es la medida más simple y la que más gente se salta.</li>
  <li><strong>Cinta doble faz en los brazos, temporalmente.</strong> A los gatos les molesta la sensación pegajosa. Dos semanas suelen bastar para romper la costumbre.</li>
  <li><strong>Una manta en el brazo preferido.</strong> Nada elegante, pero funciona mientras se adapta al rascador.</li>
</ul>

<h2>En resumen</h2>
<p>Busca una tela de trama cerrada y pelo corto, no una de bucle. En nuestro catálogo eso es la microfibra. Acompáñala de un rascador bien puesto y de uñas cortas, y el sofá va a durar años sin hilos sacados. Y si alguien te jura que su tela es indestructible, desconfía: nosotros preferimos decirte la verdad antes de venderte.</p>

<p>Si quieres ver cómo se siente una microfibra de verdad, el <a href="/san-diego">Sofá San Diego</a> la ofrece en tres colores y cada uno muestra la foto del material real. También puedes mirar todos nuestros <a href="/sofas">sofás a la medida</a> o, si tu caso es más de pelo que de uñas, leer <a href="/blog/que-tela-es-mejor-para-un-sofa-con-mascotas">qué tela es mejor para un sofá con mascotas</a>.</p>
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
<p>Más importante que el tamaño de la mesa es el espacio libre alrededor. Si tras poner la mesa no quedan al menos 70 cm para pasar, conviene bajar de puestos o fabricar la mesa a la medida de tu espacio.</p>

<p>¿Listo para tu comedor? Míralos en nuestra sección de <a href="/comedores">comedores de madera a la medida</a> y cuéntanos las dimensiones de tu espacio: lo fabricamos a la medida.</p>
`,
  },
];

export const getArticle = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);
