require('dotenv').config({ path: '.env.local' });
const { createClient } = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
});

function createBlock(text, style = 'normal', marks = []) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style,
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).substring(7),
        text,
        marks,
      },
    ],
  };
}

function createListItem(text, level = 1) {
  return {
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style: 'normal',
    listItem: 'bullet',
    level,
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).substring(7),
        text,
        marks: [],
      },
    ],
  };
}

async function main() {
  try {
    console.log('Seeding new pages to Sanity...');

    // 1. servicesPage
    const servicesPages = await client.fetch(`*[_type == "servicesPage"]`);
    if (servicesPages.length === 0) {
      console.log('Creating servicesPage document...');
      await client.create({
        _type: 'servicesPage',
        heroSubtitle: 'Nuestros Servicios',
        heroTitle: 'Líderes en asesoría de',
        heroTitleHighlight: 'seguros',
        heroDescription: 'Ofrecemos las mejores coberturas, haciendo un análisis comparativo de condiciones de mercado con las diferentes compañías de seguros. Un seguro para cada necesidad.',
        personalServices: [
          { _key: 'ps1', title: 'Seguros de Movilidad', description: 'Proteccion completa para tu vehiculo, moto o cualquier medio de transporte personal.', iconName: 'Car' },
          { _key: 'ps2', title: 'Salud', description: 'Planes de salud integrales para ti y toda tu familia con las mejores coberturas.', iconName: 'Heart' },
          { _key: 'ps3', title: 'Seguro de Vida', description: 'Asegura el bienestar economico de tus seres queridos ante cualquier eventualidad.', iconName: 'Shield' },
          { _key: 'ps4', title: 'Seguro Hogar', description: 'Protege tu vivienda y todos tus bienes contra robos, incendios y desastres naturales.', iconName: 'Home' },
          { _key: 'ps5', title: 'Seguro Educativo', description: 'Garantiza la educacion de tus hijos sin importar lo que pase.', iconName: 'GraduationCap' },
          { _key: 'ps6', title: 'Seguro de Mascotas', description: 'Proteccion veterinaria y responsabilidad civil para tus companeros peludos.', iconName: 'PawPrint' },
          { _key: 'ps7', title: 'Seguro de Arrendamiento', description: 'Tranquilidad para propietarios e inquilinos en contratos de arriendo.', iconName: 'Key' }
        ],
        businessServices: [
          { _key: 'bs1', title: 'Seguro de Propiedad', description: 'Proteccion integral para inmuebles comerciales e industriales.', iconName: 'Building' },
          { _key: 'bs2', title: 'Seguro Colectivo', description: 'Planes grupales para empleados con beneficios exclusivos.', iconName: 'Users' },
          { _key: 'bs3', title: 'Seguro de Transportes', description: 'Cobertura para mercancias y vehiculos de carga.', iconName: 'Truck' },
          { _key: 'bs4', title: 'Polizas Judiciales', description: 'Garantias para procesos legales y licitaciones.', iconName: 'Scale' }
        ],
        additionalSpecialties: [
          "Automóviles", "Integral del hogar", "Vida", "Seguro educativo", "Arrendamiento",
          "Multirriesgo", "Daño material", "Todo riesgo construcción", "Transporte de mercancías",
          "Transporte de valores", "Cumplimiento", "Manejo", "Pólizas judiciales",
          "Responsabilidad civil e infidelidad", "Riesgos financieros"
        ]
      });
    }

    // 2. testimonialsPage
    const testimonialsPages = await client.fetch(`*[_type == "testimonialsPage"]`);
    if (testimonialsPages.length === 0) {
      console.log('Creating testimonialsPage document...');
      await client.create({
        _type: 'testimonialsPage',
        heroSubtitle: 'Testimonios',
        heroTitle: 'Lo que dicen de',
        heroTitleHighlight: 'nosotros',
        heroDescription: 'Porque la mejor carta de presentación son nuestros clientes, conoce aquí sus opiniones y experiencias.',
        stats: [
          { _key: 'st1', value: '4.9/5.0', label: 'Calificación promedio' },
          { _key: 'st2', value: '15K+', label: 'Clientes satisfechos' },
          { _key: 'st3', value: '98%', label: 'Tasa de renovación' }
        ],
        testimonialsList: [
          { _key: 't1', name: 'Claudia Romero', location: 'Bogota D.C.', service: 'Seguro de vehiculos', quote: 'Excelente servicio, finalmente no utilice la poliza, pero la aseguradora se encargo de todo el tramite.', rating: 5 },
          { _key: 't2', name: 'Maria Camila Rozo', location: 'Cali', service: 'Seguro Hogar', quote: 'Fue un gran susto, pero me senti siempre respaldada tanto por la aseguradora como por Proyectar, al final todo salio bien.', rating: 5 },
          { _key: 't3', name: 'Eduardo Lara', location: 'Bogota D.C.', service: 'Seguro de vehiculos', quote: 'Me encanto el acompanamiento en todo el proceso, desde cotizar hasta el final y un excelente servicio.', rating: 5 },
          { _key: 't4', name: 'Andrea Martinez', location: 'Medellin', service: 'Seguro de Vida', quote: 'La asesoria fue muy profesional. Me explicaron todas las opciones y encontre el plan perfecto para mi familia.', rating: 5 },
          { _key: 't5', name: 'Carlos Mendoza', location: 'Barranquilla', service: 'Seguro Empresarial', quote: 'Llevamos 5 anos trabajando con Proyectar Seguros y siempre han sido muy responsables y eficientes.', rating: 5 },
          { _key: 't6', name: 'Laura Gonzalez', location: 'Bogota D.C.', service: 'Seguro de Mascotas', quote: 'No sabia que existian seguros para mascotas hasta que conoci Proyectar. Mi perrito esta protegido gracias a ellos.', rating: 5 }
        ]
      });
    }

    // 3. pqrsPage
    const pqrsPages = await client.fetch(`*[_type == "pqrsPage"]`);
    if (pqrsPages.length === 0) {
      console.log('Creating pqrsPage document...');
      await client.create({
        _type: 'pqrsPage',
        pageTitle: 'Canal de Peticiones, Quejas, Reclamos y Sugerencias (PQRS)',
        introText: 'En Proyectar Seguros tu experiencia importa. Este es el canal oficial para radicar Peticiones, Quejas, Reclamos y Sugerencias, en cumplimiento de los lineamientos de la Superintendencia Financiera de Colombia (SFC). Toda solicitud recibe un número de radicado único y una respuesta formal dentro de los plazos establecidos por la normativa vigente.',
        pqrsTypes: [
          { _key: 'pq1', type: 'Petición', definition: 'Solicitud de información, documentos o servicios relacionados con su póliza o con la operación de Proyectar Seguros.', example: 'Solicitar una copia de la póliza o un certificado de seguro.' },
          { _key: 'pq2', type: 'Queja', definition: 'Manifestación de inconformidad por la atención recibida o por la prestación del servicio.', example: 'Expresar que no fue atendido a tiempo o que la información recibida fue incorrecta.' },
          { _key: 'pq3', type: 'Reclamo', definition: 'Solicitud de corrección por un error o incumplimiento concreto en la ejecución del servicio contratado.', example: 'Indicar que la póliza tiene datos incorrectos o que no recibió lo contratado.' },
          { _key: 'pq4', type: 'Sugerencia', definition: 'Propuesta orientada a mejorar los procesos, la plataforma o el servicio de Proyectar Seguros.', example: 'Proponer mejoras al formulario de cotización o a los canales de atención.' }
        ],
        responseTimesText: 'Proyectar Seguros responde todas las solicitudes en un plazo máximo de quince (15) días hábiles, contados a partir del día hábil siguiente a la fecha de radicación, en cumplimiento de la normativa de la Superintendencia Financiera de Colombia. Si por alguna razón no es posible dar respuesta dentro del plazo establecido, Proyectar Seguros notificará al titular antes de su vencimiento, informando la nueva fecha estimada de respuesta y las razones del retraso.',
        formIntroText: 'Diligencie el siguiente formulario con información completa y veraz. Al enviar su solicitud recibirá un correo electrónico de confirmación con su número de radicado, el cual le permitirá hacer seguimiento a su caso en cualquier momento.',
        afterSubmitText: 'Una vez enviado el formulario, el sistema asignará automáticamente un número de radicado único y enviará una confirmación al correo registrado. Proyectar Seguros revisará el caso, coordinará la gestión con las áreas correspondientes y emitirá una respuesta formal dentro del plazo legal establecido. En caso de requerir información adicional, nos comunicaremos con usted a través del correo o teléfono registrados en el formulario.',
        validityText: 'Este canal de PQRS entra en vigencia desde su publicación en la plataforma web de Proyectar Seguros y permanecerá activo mientras la compañía desarrolle sus actividades. Proyectar Seguros se reserva el derecho de actualizar los procedimientos y plazos aquí descritos ante cambios normativos o del negocio, comunicando cualquier modificación a través de sus canales oficiales. Si considera que sus derechos han sido vulnerados en materia de seguros o servicios financieros, puede presentar una queja ante la Superintendencia Financiera de Colombia en www.superfinanciera.gov.co. Para asuntos relacionados con protección al consumidor o datos personales, puede acudir a la Superintendencia de Industria y Comercio (SIC) en www.sic.gov.co.'
      });
    }

    // 4. legalPage (Terms)
    const terms = await client.fetch(`*[_type == "legalPage" && slug.current == "terminos-y-condiciones"]`);
    if (terms.length === 0) {
      console.log('Creating terms and conditions document...');
      await client.create({
        _type: 'legalPage',
        title: 'TÉRMINOS Y CONDICIONES DEL SERVICIO',
        slug: { _type: 'slug', current: 'terminos-y-condiciones' },
        subtitle: 'PROYECTAR SEGUROS S.A.S.',
        locationDate: 'Bogotá, Colombia — 2026',
        content: [
          createBlock('Bienvenido a Proyectar Seguros. Antes de usar nuestra plataforma, te pedimos que leas con atención estos Términos y Condiciones. Al acceder y usar nuestros servicios, aceptas las condiciones aquí descritas. Si no estás de acuerdo con alguna de ellas, te recomendamos no continuar usando la plataforma.'),
          createBlock('1. Identificación del prestador del servicio', 'h2', ['strong']),
          createBlock('PROYECTAR SEGUROS S.A.S. es una sociedad legalmente constituida en Colombia, identificada con NIT 830139875-7, con domicilio en Bogotá D.C., que opera como intermediario de seguros en cumplimiento de la normativa del sector asegurador en Colombia.'),
          createListItem('Correo electrónico: contactenos@seguros-proyectar.com'),
          createListItem('Responsable: Gerente Comercial, Proyectar Seguros S.A.S.'),
          createListItem('Horario de atención: lunes a viernes, 8:00 a.m. – 6:00 p.m.'),
          createBlock('2. Descripción del servicio', 'h2', ['strong']),
          createBlock('Proyectar Seguros es una plataforma digital que actúa como intermediario de seguros, facilitando a los usuarios el acceso a cotizaciones, comparación y contratación de seguros de vehículos de manera ágil, transparente y 100% en línea.'),
          createListItem('Cotizar seguros de vehículo con múltiples aseguradoras en tiempo real.'),
          createListItem('Comparar opciones de cobertura, precios y condiciones entre aseguradoras.'),
          createListItem('Revisar en detalle las coberturas, deducibles y condiciones de cada póliza.'),
          createListItem('Seleccionar y activar una póliza de manera completamente automatizada.'),
          createBlock('El proceso de contratación es completamente digital y automatizado. El usuario puede completar todo el proceso sin intervención humana, aunque siempre tendrá la opción de contactar a nuestro equipo de asesores.')
        ]
      });
    }

    // 5. legalPage (Privacy)
    const privacy = await client.fetch(`*[_type == "legalPage" && slug.current == "politica-de-tratamiento-de-datos"]`);
    if (privacy.length === 0) {
      console.log('Creating privacy policy document...');
      await client.create({
        _type: 'legalPage',
        title: 'POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES',
        slug: { _type: 'slug', current: 'politica-de-tratamiento-de-datos' },
        subtitle: 'PROYECTAR SEGUROS S.A.S.',
        locationDate: 'Bogotá, Colombia — 2026',
        content: [
          createBlock('En Proyectar Seguros creemos que proteger tus datos es tan importante como proteger tu vehículo. Por eso gestionamos tu información con total transparencia, tecnología segura y estricto cumplimiento de la ley colombiana. Esta política te explica qué datos recopilamos, para qué los usamos y cuáles son tus derechos — en un lenguaje claro y directo.'),
          createBlock('1. ¿Quién es el responsable de tus datos?', 'h2', ['strong']),
          createBlock('PROYECTAR SEGUROS S.A.S. es el Responsable del Tratamiento de tus datos personales. Somos una sociedad legalmente constituida en Colombia, identificada con NIT 830139875-7, con domicilio en Bogotá D.C., que opera en cumplimiento de la normativa del sector asegurador en Colombia.'),
          createListItem('Correo electrónico: contactenos@seguros-proyectar.com'),
          createListItem('Responsable designado: Gerente Comercial, Proyectar Seguros S.A.S.'),
          createListItem('Horario de atención: lunes a viernes, 8:00 a.m. – 6:00 p.m.')
        ]
      });
    }

    console.log('New pages seeding complete.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

main();
