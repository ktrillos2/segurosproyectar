require('dotenv').config({ path: '.env.local' });
const { createClient } = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  try {
    console.log('Seeding data to Sanity...');

    // 1. Seed globalConfig contact fields
    // Buscamos si ya existe el documento globalConfig, sino lo creamos.
    const globalConfigs = await client.fetch(`*[_type == "globalConfig"]`);
    if (globalConfigs.length > 0) {
      console.log('Updating existing globalConfig...');
      await client.patch(globalConfigs[0]._id)
        .set({
          contactEmail: 'autos@seguros-proyectar.com',
          contactAddress: 'Calle 140 # 11-45, Oficina 813\nBogotá D.C., Colombia',
          contactSchedules: 'Lunes a Viernes\n8:00 am - 5:00 pm',
        })
        .commit();
    } else {
      console.log('Creating new globalConfig...');
      await client.create({
        _type: 'globalConfig',
        contactEmail: 'autos@seguros-proyectar.com',
        contactAddress: 'Calle 140 # 11-45, Oficina 813\nBogotá D.C., Colombia',
        contactSchedules: 'Lunes a Viernes\n8:00 am - 5:00 pm',
      });
    }

    // 2. Seed aboutPage
    const aboutPages = await client.fetch(`*[_type == "aboutPage"]`);
    if (aboutPages.length > 0) {
      console.log('Patching aboutPage document with keys...');
      await client.patch(aboutPages[0]._id)
        .set({
          stats: [
            { _key: 'stat1', value: '+20', label: 'Años de trayectoria' },
            { _key: 'stat2', value: '6', label: 'Aseguradoras aliadas' },
            { _key: 'stat3', value: '100%', label: 'Digital y seguro' },
          ]
        })
        .commit();
    }

    // 3. Seed coveragesPage
    const coveragesPages = await client.fetch(`*[_type == "coveragesPage"]`);
    if (coveragesPages.length > 0) {
      console.log('Patching coveragesPage document with keys and adding coverages arrays...');
      await client.patch(coveragesPages[0]._id)
        .set({
          faqs: [
            {
              _key: "faq1",
              q: "¿Qué tipos de vehículos puedo asegurar con Proyectar?",
              a: "Puedes asegurar cualquier tipo de vehículo: carros particulares, motos, camionetas, camiones, vehículos de carga y transporte de pasajeros. Si tiene placa y circula en Colombia, lo podemos asegurar."
            },
            {
              _key: "faq2",
              q: "¿Cuánto tiempo tarda cotizar y activar mi póliza?",
              a: "El proceso completo toma menos de 5 minutos. Ingresas los datos de tu vehículo, comparas las opciones de las 6 aseguradoras, eliges la que más te conviene, pagas en línea y recibes tu póliza directamente en tu correo. Sin llamadas, sin visitas, sin esperas."
            },
            {
              _key: "faq3",
              q: "¿Puedo asegurar un vehículo usado o con varios años de antigüedad?",
              a: "Sí. Aseguramos vehículos nuevos y usados. Las coberturas disponibles y su costo varían según el modelo, el año y el estado del vehículo. Al cotizar verás exactamente qué opciones aplican para tu caso."
            },
            {
              _key: "faq4",
              q: "¿Las coberturas que ofrecen son las mismas que si contrato directo con la aseguradora?",
              a: "Sí, exactamente las mismas. Proyectar es una agencia de seguros autorizada por la Superintendencia Financiera de Colombia. Las pólizas que emitimos son oficiales y tienen el mismo respaldo que si las contrataras directamente. La diferencia es que aquí comparas todas en un solo lugar y en minutos."
            },
            {
              _key: "faq5",
              q: "¿Qué aseguradoras comparan y por qué esas?",
              a: "Comparamos entre AXA Colpatria, Zurich, Quálitas, Equidad Seguros, Seguros Mundial y Seguros del Estado — las más reconocidas y sólidas del mercado colombiano. Trabajamos con ellas para garantizarte opciones reales, precios competitivos y respaldo en caso de siniestro."
            },
            {
              _key: "faq6",
              q: "¿Qué significa cada cobertura y cuál me conviene?",
              a: "Depende de tu perfil y tu vehículo. Si tienes un carro nuevo o de alto valor, una cobertura todo riesgo te da mayor tranquilidad. Si es un vehículo usado de menor valor, una cobertura básica ampliada puede ser suficiente. Al cotizar verás el detalle exacto de qué incluye cada opción."
            },
            {
              _key: "faq7",
              q: "¿Qué es el deducible y cómo funciona?",
              a: "El deducible es el valor que pagas de tu propio bolsillo cuando ocurre un siniestro antes de que la aseguradora cubra el resto. A menor deducible, generalmente mayor prima mensual. Al cotizar, Proyectar te muestra claramente el deducible de cada opción."
            },
            {
              _key: "faq8",
              q: "¿Qué pasa si tengo un accidente o siniestro?",
              a: "Lo primero es contactar directamente a tu aseguradora — el número de atención está en tu póliza. Proyectar también está disponible para orientarte en el proceso."
            },
            {
              _key: "faq9",
              q: "¿Puedo cancelar mi póliza antes de que venza?",
              a: "Sí. El reembolso se calcula de forma proporcional al tiempo no utilizado, según las condiciones de cada aseguradora."
            },
            {
              _key: "faq10",
              q: "¿Es seguro pagar en línea a través de Proyectar?",
              a: "Sí. El pago se procesa a través de canales seguros y certificados directamente con la aseguradora. Proyectar no almacena datos de tarjetas ni información financiera sensible."
            },
            {
              _key: "faq11",
              q: "¿Puedo renovar mi póliza a través de Proyectar?",
              a: "Sí. Cuando tu póliza esté próxima a vencer, te notificamos con anticipación para que puedas renovarla o comparar nuevas opciones."
            }
          ],
          mainCoverages: [
            {
              _key: "mc1",
              title: "RESPONSABILIDAD CIVIL",
              desc: "Cubre los daños que causes a terceros en un accidente."
            },
            {
              _key: "mc2",
              title: "DAÑOS Y COLISIÓN",
              desc: "Protege tu vehículo contra golpes, choques y volcamientos, sin importar quién tenga la culpa."
            },
            {
              _key: "mc3",
              title: "HURTO",
              desc: "Si te roban el vehículo o partes de él, tu seguro responde. Tranquilidad total."
            }
          ],
          complementaryCoverages: [
            {
              _key: "cc1",
              title: "ASISTENCIA 24/7",
              desc: "Incluye servicios de conductor elegido, grúa, mecánico y otros a cualquier hora, en cualquier lugar del país."
            },
            {
              _key: "cc2",
              title: "VEHÍCULO DE REEMPLAZO",
              desc: "Mientras tu vehículo está en el taller, sigues moviéndote. Sin traumatismos."
            },
            {
              _key: "cc3",
              title: "DEDUCIBLES",
              desc: "Te explicamos cuánto pagas de tu bolsillo y cuál opción te conviene más."
            }
          ],
          additionalCoverages: [
            { _key: "ac1", title: "Gastos de Transporte", desc: "Apoyo económico para cubrir tus gastos de movilidad mientras tu vehículo está en reparación." },
            { _key: "ac2", title: "Vidrios", desc: "Reposición de parabrisas y ventanas dañadas sin costo adicional según las condiciones de tu póliza." },
            { _key: "ac3", title: "Llantas", desc: "Cobertura ante daños por estallido o pinchadura en vía." },
            { _key: "ac4", title: "Asistencia Jurídica", desc: "Asesoría y acompañamiento legal ante conflictos derivados de un accidente de tránsito." },
            { _key: "ac5", title: "Accidentes Personales", desc: "Cobertura de gastos médicos que aplica únicamente para el conductor en caso de accidente." }
          ]
        })
        .commit();
    }

    console.log('Seeding complete.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

main();
