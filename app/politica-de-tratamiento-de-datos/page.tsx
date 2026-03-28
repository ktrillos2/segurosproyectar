import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Tratamiento de Datos | Proyectar Seguros",
  description: "Política de tratamiento de datos personales de Proyectar Seguros S.A.S.",
}

export default function PoliticaDatosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow pt-8 pb-24">
        <article className="max-w-4xl mx-auto px-4 md:px-12 py-12 bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-12 text-center border-b border-slate-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
              POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES
            </h1>
            <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">
              PROYECTAR SEGUROS S.A.S.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Bogotá, Colombia — 2026
            </p>
          </div>

          <div className="space-y-8 text-slate-600 leading-relaxed text-[15px] md:text-base">
            <p className="text-lg font-medium text-slate-700">
              En Proyectar Seguros creemos que proteger tus datos es tan importante como proteger tu
              vehículo. Por eso gestionamos tu información con total transparencia, tecnología segura y
              estricto cumplimiento de la ley colombiana. Esta política te explica qué datos recopilamos, para
              qué los usamos y cuáles son tus derechos — en un lenguaje claro y directo.
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">1. ¿Quién es el responsable de tus datos?</h2>
              <p className="mb-4">
                <strong>PROYECTAR SEGUROS S.A.S.</strong> es el Responsable del Tratamiento de tus datos personales.
                Somos una sociedad legalmente constituida en Colombia, identificada con NIT 830139875-7, con
                domicilio en Bogotá D.C., que opera en cumplimiento de la normativa del sector asegurador en
                Colombia.
              </p>
              <p className="mb-2">Para cualquier consulta, solicitud o reclamo relacionado con tus datos personales, puedes contactarnos por:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Correo electrónico: <a href="mailto:autos@seguros-proyectar.com" className="text-primary hover:underline">autos@seguros-proyectar.com</a></li>
                <li>Responsable designado: Juan Camilo Cárdenas</li>
                <li>Horario de atención: lunes a viernes, 8:00 a.m. – 6:00 p.m.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">2. Marco legal</h2>
              <p className="mb-2">Esta política se rige por las siguientes normas vigentes en Colombia:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ley 1581 de 2012 — Ley General de Protección de Datos Personales.</li>
                <li>Decreto 1377 de 2013 — Reglamentario de la Ley 1581.</li>
                <li>Decreto 1074 de 2015 — Decreto Único Reglamentario del Sector Comercio.</li>
                <li>Ley 1266 de 2008 — Habeas data financiero.</li>
                <li>Circular Externa 029 de 2014 de la SFC — Normativa SARLAFT para intermediarios de seguros.</li>
                <li>Ley 599 de 2000 — Código Penal: artículos sobre violación de datos personales.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">3. Definiciones clave</h2>
              <ul className="space-y-2">
                <li><strong>Titular:</strong> La persona natural a quien pertenecen los datos.</li>
                <li><strong>Responsable del tratamiento:</strong> PROYECTAR SEGUROS S.A.S., quien define los fines y medios del tratamiento.</li>
                <li><strong>Encargado del tratamiento:</strong> Tercero que trata datos por cuenta del Responsable bajo instrucciones definidas.</li>
                <li><strong>Tratamiento:</strong> Cualquier operación sobre datos personales: recolección, almacenamiento, uso, circulación o supresión.</li>
                <li><strong>Dato sensible:</strong> Información que afecta la intimidad del titular o puede generar discriminación si se usa indebidamente. El titular no está obligado a suministrar datos sensibles; sin embargo, en algunos casos su entrega es necesaria para cumplir obligaciones legales como el SARLAFT.</li>
                <li><strong>Autorización:</strong> Consentimiento previo, expreso e informado del titular para el tratamiento de sus datos.</li>
                <li><strong>Habeas Data:</strong> Derecho fundamental a conocer, actualizar y rectificar la información personal recopilada.</li>
                <li><strong>SARLAFT:</strong> Sistema de Administración del Riesgo de Lavado de Activos y Financiación del Terrorismo, de obligatorio cumplimiento para intermediarios de seguros.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">4. ¿Qué datos recopilamos?</h2>
              <p className="mb-4">Recopilamos únicamente los datos necesarios para prestarte el servicio. Dependiendo del tipo de usuario, estos son:</p>
              
              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">4.1. Datos de identificación personal</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nombre y apellidos completos</li>
                <li>Número de cédula de ciudadanía u otro documento de identidad</li>
                <li>Fecha de nacimiento</li>
                <li>Dirección de residencia</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">4.2. Datos de contacto</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Correo electrónico</li>
                <li>Número de teléfono móvil y WhatsApp</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">4.3. Datos del vehículo</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Marca, modelo, año y placa</li>
                <li>Número de tarjeta de propiedad</li>
                <li>Información técnico-mecánica</li>
                <li>Historial de siniestros declarados</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">4.4. Datos para cumplimiento SARLAFT</h3>
              <p className="mb-2">Como intermediario del sector asegurador supervisado, estamos obligados a recopilar información para la gestión del riesgo de lavado de activos y financiación del terrorismo. Esto incluye:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Actividad económica y fuente de ingresos</li>
                <li>Información patrimonial y financiera relevante</li>
                <li>Calidad de persona expuesta políticamente (PEP)</li>
                <li>Documentación de respaldo requerida por el sistema</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">4.5. Datos de personas jurídicas (aliados y clientes empresariales)</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Razón social y NIT</li>
                <li>Cámara de Comercio vigente</li>
                <li>Nombre, identificación y datos de contacto del representante legal</li>
                <li>Información financiera requerida para SARLAFT</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">4.6. Datos recopilados a través de canales digitales</h3>
              <p className="mb-2">Cuando interactúas con nuestra plataforma web, chatbot o canales de WhatsApp automatizados, podemos recopilar adicionalmente:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Historial de conversaciones con el asistente virtual o chatbot</li>
                <li>Mensajes y consultas enviadas a través de WhatsApp Business</li>
                <li>Datos de navegación: páginas visitadas, tiempo en el sitio, clics y dispositivo utilizado</li>
                <li>Dirección IP y datos técnicos del navegador (recopilados mediante cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">5. Base legal del tratamiento</h2>
              <p className="mb-2">Tratamos tus datos personales con base en alguna de las siguientes bases legales:</p>
              <ul className="space-y-4">
                <li><strong>Autorización del titular:</strong> cuando nos das tu consentimiento expreso a través del formulario de cotización, chatbot, WhatsApp u otros canales digitales autorizados.</li>
                <li><strong>Obligación legal:</strong> cuando el tratamiento es necesario para cumplir con normativas como SARLAFT, reportes regulatorios u otras obligaciones del sector asegurador.</li>
                <li><strong>Relación contractual:</strong> cuando el tratamiento es necesario para ejecutar el contrato de alianza comercial o la póliza de seguro contratada.</li>
                <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios, prevenir fraudes y garantizar la seguridad de la plataforma.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">6. ¿Para qué usamos tus datos?</h2>
              <p className="mb-2">Tus datos serán usados exclusivamente para:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Gestionar cotizaciones, comparación y emisión de seguros de vehículos.</li>
                <li>Intermediar entre el usuario y las aseguradoras aliadas.</li>
                <li>Cumplir obligaciones legales aplicables al sector asegurador en Colombia.</li>
                <li>Gestionar el SARLAFT conforme a la normativa vigente.</li>
                <li>Enviar comunicaciones sobre el estado de tu cotización, póliza, renovación o vencimiento.</li>
                <li>Gestionar el programa de aliados: trazabilidad de referidos y liquidación de comisiones.</li>
                <li>Enviarte comunicaciones comerciales e informativas si has dado tu autorización.</li>
                <li>Mejorar la experiencia de usuario en la plataforma y optimizar nuestros servicios.</li>
                <li>Atender requerimientos de autoridades competentes y organismos de control.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">7. Herramientas digitales y automatización</h2>
              <p className="mb-4">Proyectar Seguros utiliza tecnología avanzada para brindarte una experiencia ágil y eficiente. En este contexto, tus datos pueden ser procesados por:</p>
              <ul className="space-y-3">
                <li><strong>Chatbot e inteligencia artificial:</strong> nuestro asistente virtual puede recopilar y procesar información para ayudarte a cotizar y comparar opciones de seguro de manera automatizada.</li>
                <li><strong>WhatsApp Business API:</strong> utilizamos esta plataforma para enviarte notificaciones sobre tu cotización, póliza y recordatorios de renovación. Al interactuar con nosotros por este canal, aceptas el tratamiento de tus datos en dicho entorno.</li>
                <li><strong>Automatización de procesos (RPA):</strong> utilizamos robots de proceso automatizado para consultar cotizaciones en las plataformas de aseguradoras, siempre bajo tu autorización.</li>
                <li><strong>Correo electrónico automatizado:</strong> enviamos notificaciones, confirmaciones y recordatorios de manera automatizada a través de nuestro sistema de comunicaciones.</li>
              </ul>
              <p className="mt-4">En todos los casos, el tratamiento automatizado está sujeto a los mismos principios y garantías descritos en esta política.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">8. ¿Con quién compartimos tus datos?</h2>
              <p className="mb-4">Proyectar Seguros puede compartir tus datos con terceros únicamente en los siguientes casos:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Aseguradoras aliadas (AXA Colpatria, Zurich, Seguros del Estado, Qualitas, Seguros Mundial, Equidad Seguros u otras) para cotización y emisión de pólizas.</li>
                <li>Proveedores tecnológicos de infraestructura, desarrollo web o automatización, bajo estrictos acuerdos de confidencialidad.</li>
                <li>Autoridades judiciales, organismos de control o entidades gubernamentales cuando exista obligación legal.</li>
                <li>Organismos de supervisión del sector asegurador en Colombia en el marco de obligaciones de reporte.</li>
              </ul>
              <p className="mt-4 font-medium">Cualquier encargado del tratamiento que reciba datos personales estará obligado contractualmente a cumplir con la normativa colombiana de protección de datos.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">9. Transferencia internacional de datos</h2>
              <p>Algunos de los proveedores tecnológicos que utilizamos para el funcionamiento de nuestra plataforma — como servicios de alojamiento web, automatización o mensajería — pueden almacenar o procesar datos en servidores ubicados fuera de Colombia. En estos casos, Proyectar Seguros garantiza que dicha transferencia se realiza en cumplimiento de la normativa colombiana de protección de datos y bajo acuerdos contractuales que aseguran un nivel de protección equivalente al exigido por la Ley 1581 de 2012.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">10. Cookies y tecnologías de rastreo</h2>
              <p className="mb-4">Nuestra plataforma utiliza cookies y tecnologías similares. Dependiendo de su función, estas se clasifican en:</p>
              <ul className="space-y-4">
                <li><strong>Cookies técnicas o esenciales:</strong> necesarias para el funcionamiento básico del sitio web. No pueden desactivarse sin afectar la navegación.</li>
                <li><strong>Cookies analíticas:</strong> nos ayudan a entender cómo los usuarios interactúan con la plataforma (páginas visitadas, tiempo de navegación, errores). Usamos esta información para mejorar la experiencia.</li>
                <li><strong>Cookies de marketing:</strong> permiten mostrarte publicidad relevante según tus intereses, tanto en nuestro sitio como en otras plataformas digitales. Solo se activan con tu consentimiento.</li>
              </ul>
              <p className="mt-4">Puedes gestionar o desactivar las cookies desde la configuración de tu navegador. Ten en cuenta que desactivar cookies técnicas puede afectar el correcto funcionamiento de algunas secciones del sitio.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">11. Tus derechos como titular</h2>
              <p className="mb-4">En cualquier momento puedes ejercer los siguientes derechos sobre tus datos personales:</p>
              <ul className="space-y-2">
                <li><strong>Conocer:</strong> saber qué datos tenemos sobre ti y cómo los usamos.</li>
                <li><strong>Actualizar:</strong> corregir información incompleta o desactualizada.</li>
                <li><strong>Rectificar:</strong> modificar datos incorrectos.</li>
                <li><strong>Suprimir:</strong> solicitar la eliminación de tus datos cuando no exista obligación legal de conservarlos.</li>
                <li><strong>Revocar la autorización:</strong> retirar tu consentimiento en cualquier momento.</li>
                <li><strong>Acceder gratuitamente:</strong> consultar tus datos sin ningún costo.</li>
                <li><strong>Presentar quejas:</strong> ante la Superintendencia de Industria y Comercio (SIC) si consideras que tus derechos han sido vulnerados.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">12. ¿Cómo ejercer tus derechos? (Habeas Data)</h2>
              <p className="mb-4">Para ejercer cualquiera de tus derechos, envía un correo a <a href="mailto:autos@seguros-proyectar.com" className="text-primary hover:underline font-bold">autos@seguros-proyectar.com</a> con el asunto: <strong>SOLICITUD HABEAS DATA — [Tu nombre completo]</strong>.</p>
              <p className="mb-4">Tu solicitud debe incluir: nombre completo, número de documento de identidad, descripción clara de lo que solicitas y correo electrónico para recibir respuesta.</p>
              <p className="mb-2 font-bold">Tiempos de respuesta conforme a la Ley 1581 de 2012:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Consultas:</strong> máximo 10 días hábiles.</li>
                <li><strong>Reclamos:</strong> máximo 15 días hábiles (prorrogables según la ley).</li>
                <li>Si la solicitud está incompleta, te lo notificaremos dentro de los 5 días hábiles siguientes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">13. Autorización del titular</h2>
              <p className="mb-4">PROYECTAR SEGUROS S.A.S. obtiene la autorización previa, expresa e informada del titular antes de proceder con el tratamiento de sus datos personales. Esta autorización se obtiene a través de:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Casilla de aceptación en el formulario de cotización de la plataforma web.</li>
                <li>Interacción con el chatbot o asistente virtual, donde se informa al usuario sobre el tratamiento de sus datos antes de iniciar la conversación.</li>
                <li>Canales digitales como WhatsApp Business, mediante mensaje de aceptación al inicio de la comunicación.</li>
                <li>Firma del contrato de alianza comercial para aliados referenciadores.</li>
                <li>Cualquier otra manifestación escrita o digital que permita concluir de manera inequívoca que el titular otorgó su consentimiento.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">14. Seguridad de la información</h2>
              <p className="mb-4">Implementamos medidas técnicas, organizativas y administrativas para proteger tus datos contra acceso no autorizado, pérdida, uso indebido o divulgación. Entre ellas:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Almacenamiento en servidores con cifrado y protocolos de seguridad.</li>
                <li>Control de acceso por roles y funciones del equipo.</li>
                <li>Acuerdos de confidencialidad con todos los proveedores y aliados.</li>
                <li>Monitoreo continuo de la plataforma tecnológica.</li>
                <li>Políticas internas de manejo seguro de información.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">15. ¿Por cuánto tiempo conservamos tus datos?</h2>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li><strong>Pólizas emitidas:</strong> mínimo 10 años, conforme a normas del sector asegurador.</li>
                <li><strong>Datos SARLAFT:</strong> mínimo 10 años según normativa aplicable.</li>
                <li><strong>Aliados comerciales:</strong> durante la vigencia del contrato y 5 años posteriores.</li>
                <li><strong>Cotizaciones no convertidas:</strong> hasta 2 años desde la fecha de cotización.</li>
              </ul>
              <p>Vencidos estos plazos, los datos serán eliminados de forma segura, salvo obligación legal de conservarlos por más tiempo.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">16. Menores de edad</h2>
              <p>Nuestros servicios están dirigidos exclusivamente a personas mayores de 18 años. No recopilamos datos de menores de edad de forma intencional. Si detectamos información de un menor recopilada sin autorización, la eliminaremos de inmediato.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">17. Autoridad de control</h2>
              <p>Si consideras que tus derechos han sido vulnerados, puedes presentar una queja ante la Superintendencia de Industria y Comercio (SIC), autoridad nacional de protección de datos en Colombia: <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">www.sic.gov.co</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">18. Vigencia y actualizaciones</h2>
              <p className="mb-4">Esta política entra en vigencia desde su publicación en nuestra plataforma web y permanecerá vigente mientras Proyectar Seguros desarrolle sus actividades.</p>
              <p>Nos reservamos el derecho de actualizar esta política ante cambios normativos, tecnológicos o del negocio. Cualquier modificación será comunicada a través de nuestros canales oficiales y publicada en el sitio web con la fecha de actualización.</p>
            </section>

            <div className="mt-16 pt-8 border-t border-slate-200 text-center sm:text-left text-sm font-medium text-slate-500">
              <p>PROYECTAR SEGUROS S.A.S. — NIT 830139875-7</p>
              <p>Bogotá D.C., Colombia — 2026</p>
              <p><a href="mailto:autos@seguros-proyectar.com" className="text-primary hover:underline">autos@seguros-proyectar.com</a></p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
