import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "PQRS | Proyectar Seguros",
  description: "Canal oficial para radicar Peticiones, Quejas, Reclamos y Sugerencias de Proyectar Seguros S.A.S.",
}

export default function PQRSSPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow pt-8 pb-24">
        <article className="max-w-4xl mx-auto px-4 md:px-12 py-12 bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-12 text-center border-b border-slate-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance uppercase">
              Canal de Peticiones, Quejas, Reclamos y Sugerencias (PQRS)
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
              En Proyectar Seguros tu experiencia importa. Este es el canal oficial para radicar Peticiones, Quejas, Reclamos y Sugerencias, en cumplimiento de los lineamientos de la Superintendencia Financiera de Colombia (SFC). Toda solicitud recibe un número de radicado único y una respuesta formal dentro de los plazos establecidos por la normativa vigente.
            </p>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">1. Tipos de solicitud</h2>
              <p className="mb-4">Antes de radicar su solicitud, identifique cuál de los siguientes tipos corresponde a su caso:</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-1/4 border-b border-slate-200">Tipo</th>
                      <th className="px-4 py-3 font-semibold w-1/3 border-b border-slate-200">Definición</th>
                      <th className="px-4 py-3 font-semibold border-b border-slate-200">Ejemplo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-800 align-top">Petición</td>
                      <td className="px-4 py-3 align-top">Solicitud de información, documentos o servicios relacionados con su póliza o con la operación de Proyectar Seguros.</td>
                      <td className="px-4 py-3 align-top">Solicitar una copia de la póliza o un certificado de seguro.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-800 align-top">Queja</td>
                      <td className="px-4 py-3 align-top">Manifestación de inconformidad por la atención recibida o por la prestación del servicio.</td>
                      <td className="px-4 py-3 align-top">Expresar que no fue atendido a tiempo o que la información recibida fue incorrecta.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-800 align-top">Reclamo</td>
                      <td className="px-4 py-3 align-top">Solicitud de corrección por un error o incumplimiento concreto en la ejecución del servicio contratado.</td>
                      <td className="px-4 py-3 align-top">Indicar que la póliza tiene datos incorrectos o que no recibió lo contratado.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-800 align-top">Sugerencia</td>
                      <td className="px-4 py-3 align-top">Propuesta orientada a mejorar los procesos, la plataforma o el servicio de Proyectar Seguros.</td>
                      <td className="px-4 py-3 align-top">Proponer mejoras al formulario de cotización o a los canales de atención.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">2. Plazos de respuesta</h2>
              <p className="mb-4">
                Proyectar Seguros responde todas las solicitudes en un plazo máximo de quince (15) días hábiles, contados a partir del día hábil siguiente a la fecha de radicación, en cumplimiento de la normativa de la Superintendencia Financiera de Colombia.
              </p>
              <p>
                Si por alguna razón no es posible dar respuesta dentro del plazo establecido, Proyectar Seguros notificará al titular antes de su vencimiento, informando la nueva fecha estimada de respuesta y las razones del retraso.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">3. Formulario de radicación</h2>
              <p className="mb-6">
                Diligencie el siguiente formulario con información completa y veraz. También puede radicar su solicitud enviando un correo electrónico a: <a href="mailto:contactenos@seguros-proyectar.com" className="text-primary font-bold hover:underline">contactenos@seguros-proyectar.com</a>. Al enviar su solicitud recibirá un correo electrónico de confirmación con su número de radicado.
              </p>
              
              <form 
                action={`https://formsubmit.co/${process.env.NEXT_PUBLIC_PQRS_EMAIL || 'contactenos@seguros-proyectar.com'}`} 
                method="POST" 
                className="bg-slate-50 p-6 rounded-xl border border-slate-200"
              >
                <input type="hidden" name="_subject" value="Nueva Radicación PQRS Web" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-slate-700 mb-2">Nombre completo</label>
                    <input type="text" id="nombre" name="nombre" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label htmlFor="cedula" className="block text-sm font-semibold text-slate-700 mb-2">Número de cédula</label>
                    <input type="text" id="cedula" name="cedula" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Tu número de documento" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Correo electrónico</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="tu@correo.com" />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-semibold text-slate-700 mb-2">Teléfono de contacto</label>
                    <input type="tel" id="telefono" name="telefono" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Tu número de teléfono" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="poliza" className="block text-sm font-semibold text-slate-700 mb-2">Número de póliza (si aplica)</label>
                    <input type="text" id="poliza" name="poliza" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors" placeholder="Número de póliza" />
                  </div>
                  <div>
                    <label htmlFor="tipo" className="block text-sm font-semibold text-slate-700 mb-2">Tipo de solicitud</label>
                    <select id="tipo" name="tipo_incidencia" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors bg-white">
                      <option value="">Selecciona una opción</option>
                      <option value="peticion">Petición</option>
                      <option value="queja">Queja</option>
                      <option value="reclamo">Reclamo</option>
                      <option value="sugerencia">Sugerencia</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="descripcion" className="block text-sm font-semibold text-slate-700 mb-2">Descripción de la solicitud</label>
                  <textarea id="descripcion" name="descripcion" required rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-y" placeholder="Describe tu solicitud en detalle..."></textarea>
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm">
                  ENVIAR SOLICITUD
                </button>
                <div className="mt-4 text-sm text-slate-500 text-center">
                  <p>Al enviar este formulario recibirá un correo de confirmación con su número de radicado.</p>
                  <p>Proyectar Seguros responde en máximo 15 días hábiles conforme a la normativa SFC.</p>
                </div>
              </form>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">4. ¿Qué ocurre después de radicar su solicitud?</h2>
              <p>
                Una vez enviado el formulario, el sistema asignará automáticamente un número de radicado único y enviará una confirmación al correo registrado. Proyectar Seguros revisará el caso, coordinará la gestión con las áreas correspondientes y emitirá una respuesta formal dentro del plazo legal establecido. En caso de requerir información adicional, nos comunicaremos con usted a través del correo o teléfono registrados en el formulario.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">5. Vigencia</h2>
              <p className="mb-4">
                Este canal de PQRS entra en vigencia desde su publicación en la plataforma web de Proyectar Seguros y permanecerá activo mientras la compañía desarrolle sus actividades. Proyectar Seguros se reserva el derecho de actualizar los procedimientos y plazos aquí descritos ante cambios normativos o del negocio, comunicando cualquier modificación a través de sus canales oficiales.
              </p>
              <p>
                Si considera que sus derechos han sido vulnerados en materia de seguros o servicios financieros, puede presentar una queja ante la Superintendencia Financiera de Colombia en <a href="https://www.superfinanciera.gov.co" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">www.superfinanciera.gov.co</a>. Para asuntos relacionados con protección al consumidor o datos personales, puede acudir a la Superintendencia de Industria y Comercio (SIC) en <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">www.sic.gov.co</a>.
              </p>
            </section>

            <div className="mt-16 pt-8 border-t border-slate-200 text-center sm:text-left text-sm font-medium text-slate-500">
              <p>PROYECTAR SEGUROS S.A.S. — NIT 830139875-7</p>
              <p><a href="https://seguros-proyectar.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">seguros-proyectar.com</a></p>
            </div>

          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
