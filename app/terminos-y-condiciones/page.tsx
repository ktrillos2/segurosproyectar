import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Proyectar Seguros",
  description: "Términos y condiciones del servicio de Proyectar Seguros S.A.S.",
}

export default function TerminosYCondicionesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-4 md:px-12 py-12 bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-12 text-center border-b border-slate-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance">
              TÉRMINOS Y CONDICIONES DEL SERVICIO
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
              Bienvenido a Proyectar Seguros. Antes de usar nuestra plataforma, te pedimos que leas con 
              atención estos Términos y Condiciones. Al acceder y usar nuestros servicios, aceptas las 
              condiciones aquí descritas. Si no estás de acuerdo con alguna de ellas, te recomendamos no 
              continuar usando la plataforma.
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">1. Identificación del prestador del servicio</h2>
              <p className="mb-4">
                <strong>PROYECTAR SEGUROS S.A.S.</strong> es una sociedad legalmente constituida en Colombia, 
                identificada con NIT 830139875-7, con domicilio en Bogotá D.C., que opera como intermediario 
                de seguros en cumplimiento de la normativa del sector asegurador en Colombia.
              </p>
              <p className="mb-2">Puedes contactarnos a través de:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Correo electrónico: <a href="mailto:autos@seguros-proyectar.com" className="text-primary hover:underline font-bold">autos@seguros-proyectar.com</a></li>
                <li>Responsable: Juan Camilo Cárdenas</li>
                <li>Horario de atención: lunes a viernes, 8:00 a.m. – 6:00 p.m.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">2. Descripción del servicio</h2>
              <p className="mb-4">
                Proyectar Seguros es una plataforma digital que actúa como intermediario de seguros, facilitando 
                a los usuarios el acceso a cotizaciones, comparación y contratación de seguros de vehículos de 
                manera ágil, transparente y 100% en línea.
              </p>
              <p className="mb-2">A través de nuestra plataforma, el usuario puede:</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Cotizar seguros de vehículo con múltiples aseguradoras en tiempo real.</li>
                <li>Comparar opciones de cobertura, precios y condiciones entre aseguradoras.</li>
                <li>Revisar en detalle las coberturas, deducibles y condiciones de cada póliza.</li>
                <li>Seleccionar y activar una póliza de manera completamente automatizada.</li>
                <li>Contactar a un asesor humano de Proyectar Seguros para resolver dudas o recibir orientación personalizada.</li>
              </ul>
              <p>
                El proceso de contratación es completamente digital y automatizado. El usuario puede completar 
                todo el proceso sin intervención humana, aunque siempre tendrá la opción de contactar a nuestro 
                equipo de asesores.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">3. Carácter informativo del contenido — asesoría</h2>
              <p className="mb-4">
                La información, cotizaciones, comparaciones y contenidos disponibles en la plataforma de 
                Proyectar Seguros tienen carácter informativo y de referencia. No constituyen asesoría 
                personalizada, recomendación financiera ni consejo de seguros, salvo en los casos en que el 
                usuario interactúe directamente con un asesor humano de Proyectar Seguros.
              </p>
              <p className="mb-4">
                Proyectar Seguros facilita al usuario el acceso a información objetiva para que pueda tomar 
                decisiones informadas. Sin embargo, la elección de una póliza es una decisión personal del 
                usuario, quien asume la responsabilidad de evaluar las opciones disponibles de acuerdo con sus 
                necesidades particulares.
              </p>
              <p>
                Si el usuario requiere asesoría personalizada, puede solicitarla a través de los canales oficiales 
                de atención al cliente de Proyectar Seguros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">4. Naturaleza del servicio — rol de Proyectar Seguros</h2>
              <p className="mb-4">Es importante que el usuario comprenda claramente el rol de Proyectar Seguros dentro del proceso:</p>
              <ul className="space-y-4 mb-4">
                <li><strong>Proyectar Seguros es un intermediario, no una aseguradora.</strong> No asumimos riesgos asegurados ni somos contraparte del contrato de seguro.</li>
                <li><strong>La póliza es emitida por la aseguradora.</strong> Aunque el proceso de contratación se gestiona a través de la plataforma de Proyectar Seguros, la póliza es emitida formalmente por la aseguradora seleccionada por el usuario. Es la aseguradora quien asume el riesgo cubierto y quien responde ante un siniestro.</li>
                <li><strong>Proyectar Seguros facilita el acceso.</strong> Nuestra función es conectar al usuario con las mejores opciones del mercado, gestionar el proceso de cotización y emisión, y acompañarlo durante la vigencia de su póliza.</li>
              </ul>
              <p>
                En consecuencia, cualquier reclamación derivada de la ejecución de la póliza — incluyendo pago 
                de siniestros, coberturas aplicables y condiciones del contrato de seguro — deberá dirigirse 
                directamente a la aseguradora emisora, sin perjuicio del acompañamiento que Proyectar Seguros 
                pueda brindar en dicho proceso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">5. Condiciones de uso de la plataforma</h2>
              
              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">5.1. Requisitos del usuario</h3>
              <p className="mb-2">Para usar los servicios de Proyectar Seguros, el usuario debe:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ser mayor de 18 años.</li>
                <li>Ser titular o tener autorización legal sobre el vehículo que desea asegurar.</li>
                <li>Proporcionar información veraz, completa y actualizada durante el proceso de cotización y contratación.</li>
                <li>Contar con un correo electrónico y número de WhatsApp válidos para recibir comunicaciones.</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">5.2. Uso permitido</h3>
              <p className="mb-2">El usuario se compromete a usar la plataforma exclusivamente para los fines descritos en estos términos. Está prohibido:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Proporcionar información falsa, incompleta o engañosa en cualquier etapa del proceso.</li>
                <li>Usar la plataforma para actividades ilícitas o contrarias a la normativa colombiana.</li>
                <li>Intentar acceder de forma no autorizada a sistemas, datos o funcionalidades de la plataforma.</li>
                <li>Reproducir, copiar o distribuir el contenido de la plataforma sin autorización expresa de Proyectar Seguros.</li>
                <li>Usar la plataforma para suplantar la identidad de terceros.</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">5.3. Exactitud de la información</h3>
              <p className="mb-4">
                La exactitud de las cotizaciones y condiciones presentadas depende directamente de la 
                información suministrada por el usuario. Proyectar Seguros no será responsable por diferencias, 
                ajustes o rechazos derivados de información incorrecta, incompleta o falsa proporcionada por el 
                usuario durante el proceso de cotización o contratación.
              </p>
              <p>
                Si la aseguradora detecta inconsistencias entre la información declarada y la realidad del riesgo, 
                podrá ajustar las condiciones de la póliza, anularla o rechazar la cobertura de un siniestro. El 
                usuario asume plena responsabilidad por la veracidad de los datos suministrados.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">5.4. Disponibilidad del servicio</h3>
              <p className="mb-4">
                Proyectar Seguros realizará sus mejores esfuerzos para mantener la plataforma disponible de 
                manera continua. Sin embargo, no garantiza disponibilidad ininterrumpida del servicio. La 
                plataforma puede experimentar interrupciones temporales por razones de mantenimiento, 
                actualizaciones técnicas, fallas en sistemas de terceros o eventos fuera del control razonable de 
                Proyectar Seguros.
              </p>
              <p>
                En caso de interrupciones, Proyectar Seguros informará a los usuarios a través de sus canales 
                oficiales cuando sea posible, y trabajará para restablecer el servicio en el menor tiempo posible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">6. Proceso de cotización y contratación</h2>
              
              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">6.1. Cotización</h3>
              <p>
                Las cotizaciones generadas a través de la plataforma son indicativas y están basadas en la 
                información suministrada por el usuario y en los datos disponibles de las aseguradoras en tiempo 
                real. Proyectar Seguros no garantiza que las condiciones cotizadas sean definitivas hasta tanto 
                la aseguradora no confirme formalmente la emisión de la póliza.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">6.2. Contratación y emisión</h3>
              <p>
                Una vez el usuario selecciona una opción y completa el proceso de contratación, la póliza es 
                gestionada a través de la plataforma de Proyectar Seguros y emitida formalmente por la 
                aseguradora correspondiente. La póliza entrará en vigencia en los términos establecidos por la 
                aseguradora emisora, los cuales serán informados al usuario durante el proceso.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">6.3. Confirmación</h3>
              <p>
                El usuario recibirá una confirmación de la emisión de su póliza a través del correo electrónico y/o 
                WhatsApp registrados. Este documento no reemplaza la póliza oficial emitida por la aseguradora, 
                la cual será el documento vinculante del contrato de seguro.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">6.4. Pago de la prima</h3>
              <p>
                El pago de la prima se realiza directamente a la aseguradora emisora a través de los medios 
                habilitados por cada entidad. Proyectar Seguros no recauda primas ni recibe dineros en nombre 
                de las aseguradoras. Cualquier pago debe realizarse exclusivamente a través de los canales 
                oficiales de la aseguradora seleccionada.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">7. Responsabilidades y limitaciones</h2>
              
              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">7.1. Responsabilidades de Proyectar Seguros</h3>
              <p className="mb-2">Proyectar Seguros se compromete a:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Brindar acceso a cotizaciones reales y actualizadas de las aseguradoras aliadas.</li>
                <li>Gestionar el proceso de intermediación con diligencia y transparencia.</li>
                <li>Realizar sus mejores esfuerzos para mantener la plataforma operativa y segura.</li>
                <li>Proteger los datos personales del usuario conforme a su Política de Tratamiento de Datos Personales.</li>
                <li>Acompañar al usuario durante el proceso de contratación y posventa.</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">7.2. Limitaciones de responsabilidad</h3>
              <p className="mb-2">Proyectar Seguros no será responsable por:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Decisiones de suscripción, aceptación o rechazo del riesgo tomadas por las aseguradoras.</li>
                <li>Diferencias entre las condiciones cotizadas y las condiciones finales de la póliza derivadas de cambios en la información del usuario o en las tarifas de la aseguradora.</li>
                <li>Incumplimientos de las aseguradoras en la atención de siniestros o en la ejecución del contrato de seguro.</li>
                <li>Interrupciones temporales del servicio por causas de fuerza mayor, mantenimiento de la plataforma o fallos en sistemas de terceros.</li>
                <li>Pérdidas o daños derivados del uso indebido de la plataforma por parte del usuario.</li>
                <li>Cambios en tarifas, coberturas o condiciones de las aseguradoras que ocurran después de la emisión de la póliza.</li>
                <li>Decisiones tomadas por el usuario con base en la información de carácter informativo disponible en la plataforma, cuando no haya mediado asesoría personalizada.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">8. Cancelación y renovación de pólizas</h2>
              
              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">8.1. Cancelación</h3>
              <p className="mb-4">
                La cancelación de una póliza deberá realizarse conforme a las condiciones establecidas por la 
                aseguradora emisora. Proyectar Seguros podrá acompañar al usuario en este proceso, pero la 
                decisión final y los términos de devolución de prima corresponden a la aseguradora.
              </p>
              <p>
                En caso de cancelación anticipada, la devolución de prima proporcional estará sujeta a las 
                políticas de cada aseguradora y a los términos del contrato de seguro.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">8.2. Renovación</h3>
              <p>
                Proyectar Seguros podrá contactar al usuario con anticipación al vencimiento de su póliza para 
                facilitar el proceso de renovación. La renovación no es automática y requiere la aceptación 
                expresa del usuario. Las condiciones de renovación pueden variar respecto a la póliza original 
                según las tarifas y condiciones vigentes de la aseguradora en el momento de la renovación.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">9. Comunicaciones</h2>
              <p className="mb-2">Al aceptar estos Términos y Condiciones, el usuario autoriza a Proyectar Seguros a enviarle comunicaciones relacionadas con:</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Estado de su cotización, póliza o proceso de contratación.</li>
                <li>Recordatorios de vencimiento y opciones de renovación.</li>
                <li>Información relevante sobre coberturas y servicios adicionales.</li>
                <li>Comunicaciones comerciales e informativas, siempre que haya dado su autorización expresa para ello.</li>
              </ul>
              <p>
                Estas comunicaciones se realizarán a través de correo electrónico, WhatsApp y otros canales 
                digitales. El usuario puede revocar su autorización para comunicaciones comerciales en 
                cualquier momento escribiendo a <a href="mailto:autos@seguros-proyectar.com" className="text-primary hover:underline font-bold">autos@seguros-proyectar.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">10. Propiedad intelectual</h2>
              <p className="mb-4">
                Todos los contenidos de la plataforma de Proyectar Seguros — incluyendo textos, imágenes, 
                ilustraciones, logotipos, diseños, código fuente, algoritmos, modelos de inteligencia artificial, 
                sistemas automatizados, flujos de cotización y cualquier tecnología propia desarrollada para la 
                operación de la plataforma — son propiedad de <strong>PROYECTAR SEGUROS S.A.S.</strong> o de sus 
                licenciantes, y están protegidos por las leyes de propiedad intelectual aplicables en Colombia.
              </p>
              <p>
                El usuario no podrá reproducir, distribuir, modificar, comunicar públicamente, realizar ingeniería 
                inversa ni explotar comercialmente ningún contenido, tecnología o sistema de la plataforma sin 
                autorización expresa y escrita de Proyectar Seguros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">11. Protección de datos personales</h2>
              <p className="mb-4">
                El tratamiento de los datos personales del usuario se rige por la Política de Tratamiento de Datos 
                Personales de Proyectar Seguros, disponible en la plataforma web, la cual forma parte integral 
                de estos Términos y Condiciones.
              </p>
              <p>
                Al aceptar estos términos, el usuario también acepta los términos de dicha política y autoriza el 
                tratamiento de sus datos para las finalidades allí descritas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">12. Modificaciones a los términos</h2>
              <p className="mb-4">
                Proyectar Seguros se reserva el derecho de modificar estos Términos y Condiciones en cualquier 
                momento, de conformidad con cambios normativos, tecnológicos o del negocio. Las 
                modificaciones serán publicadas en la plataforma con la fecha de actualización correspondiente.
              </p>
              <p>
                El uso continuado de la plataforma después de la publicación de cambios constituirá la 
                aceptación de los nuevos términos por parte del usuario. Si el usuario no está de acuerdo con 
                las modificaciones, deberá dejar de usar el servicio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">13. Fuerza mayor</h2>
              <p>
                Proyectar Seguros no será responsable por incumplimientos o retrasos en la prestación del 
                servicio causados por eventos fuera de su control razonable, incluyendo fallas en sistemas de 
                terceros, interrupciones en servicios de internet, desastres naturales, actos de autoridad, 
                pandemias u otros eventos de fuerza mayor conforme a la ley colombiana.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">14. Legislación aplicable y resolución de conflictos</h2>
              <p className="mb-4">
                Estos Términos y Condiciones se rigen exclusivamente por las leyes de la República de 
                Colombia. Las partes acuerdan someterse a la jurisdicción de los jueces y tribunales 
                competentes de la ciudad de Bogotá D.C., Colombia, para la resolución de cualquier controversia 
                derivada del uso de la plataforma o de la interpretación de estos términos.
              </p>
              <p className="mb-4">
                Cualquier controversia será sometida, en primera instancia, a un proceso de solución directa 
                entre las partes. Si no se logra un acuerdo en un plazo razonable, las partes podrán acudir a los 
                mecanismos alternativos de solución de conflictos disponibles en Colombia, o a la jurisdicción 
                ordinaria competente en Bogotá D.C.
              </p>
              <p>
                Sin perjuicio de lo anterior, el usuario podrá elevar reclamaciones ante la Superintendencia 
                Financiera de Colombia o la Superintendencia de Industria y Comercio, según corresponda a la 
                naturaleza de su reclamación.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">15. Aceptación de los términos</h2>
              <p className="mb-2">El acceso y uso de la plataforma de Proyectar Seguros implica la aceptación plena y sin reservas de estos Términos y Condiciones. Esta aceptación se formaliza mediante:</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>La marcación de la casilla de aceptación en el formulario de cotización o registro.</li>
                <li>La interacción con el chatbot o asistente virtual de la plataforma.</li>
                <li>El uso continuado de los servicios de la plataforma.</li>
              </ul>
              <p>
                Si tienes dudas sobre estos términos, puedes contactarnos en <a href="mailto:autos@seguros-proyectar.com" className="text-primary hover:underline font-bold">autos@seguros-proyectar.com</a> antes de continuar usando el servicio.
              </p>
            </section>

            <div className="mt-16 pt-8 border-t border-slate-200 text-center sm:text-left text-sm font-medium text-slate-500">
              <p>PROYECTAR SEGUROS S.A.S. — NIT 830139875-7</p>
              <p>Bogotá D.C., Colombia — 2026</p>
              <p><a href="mailto:autos@seguros-proyectar.com" className="text-primary hover:underline font-bold">autos@seguros-proyectar.com</a></p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
