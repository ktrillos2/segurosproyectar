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
        <article className="max-w-4xl mx-auto px-4 md:px-4 py-8">
          <div className="mb-12 text-center border-b border-slate-200 pb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance uppercase">
              Canal de Peticiones, Quejas, Reclamos y Sugerencias (PQRS)
            </h1>
            <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">
              PROYECTAR SEGUROS S.A.S.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Bogotá, Colombia — {new Date().getFullYear()}
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
                Diligencie el siguiente formulario con información completa y veraz. Al enviar su solicitud recibirá un correo electrónico de confirmación con su número de radicado, el cual le permitirá hacer seguimiento a su caso en cualquier momento.
              </p>
              
              <form 
                action={`https://formsubmit.co/${process.env.NEXT_PUBLIC_PQRS_EMAIL || 'contactenos@seguros-proyectar.com'}`} 
                method="POST" 
                className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 mt-6"
              >
                <input type="hidden" name="_subject" value="Nueva Radicación PQRS Web" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="nombre" className="block text-[15px] font-bold text-slate-900 mb-2">Nombre completo</label>
                    <input type="text" id="nombre" name="nombre" required className="w-full px-4 h-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px]" placeholder="Ej. Carlos Rodríguez Pérez" />
                  </div>
                  <div>
                    <label htmlFor="cedula" className="block text-[15px] font-bold text-slate-900 mb-2">Número de cédula</label>
                    <input type="number" id="cedula" name="cedula" required className="w-full px-4 h-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px]" placeholder="Ej. 1020304050" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-[15px] font-bold text-slate-900 mb-2">Correo electrónico</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 h-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px]" placeholder="correo@ejemplo.com" />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-[15px] font-bold text-slate-900 mb-2">Teléfono de contacto</label>
                    <input type="tel" id="telefono" name="telefono" required className="w-full px-4 h-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px]" placeholder="310 000 0000" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="poliza" className="block text-[15px] font-bold text-slate-900 mb-2">Número de póliza <span className="font-normal text-slate-500">(si aplica)</span></label>
                    <input type="text" id="poliza" name="poliza" className="w-full px-4 h-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px]" placeholder="Ej. POL-2026-001234" />
                  </div>
                  <div>
                    <label htmlFor="tipo" className="block text-[15px] font-bold text-slate-900 mb-2">Tipo de solicitud</label>
                    <div className="relative">
                      <select id="tipo" name="tipo_incidencia" required className="w-full px-4 h-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 bg-white appearance-none text-[15px]">
                        <option value="">Selecciona una opción</option>
                        <option value="peticion">Petición</option>
                        <option value="queja">Queja</option>
                        <option value="reclamo">Reclamo</option>
                        <option value="sugerencia">Sugerencia</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="descripcion" className="block text-[15px] font-bold text-slate-900 mb-2">Descripción de la solicitud</label>
                  <textarea id="descripcion" name="descripcion" required rows={5} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px] resize-y" placeholder="Describa su caso con el mayor detalle posible. Incluya fechas, nombres o cualquier información que facilite la gestión de su solicitud."></textarea>
                </div>

                <button type="submit" className="w-full bg-[#1e3450] hover:bg-[#162539] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-sm text-[15px] tracking-wide mb-6">
                  ENVIAR SOLICITUD
                </button>
                
                <div className="text-sm text-slate-600 text-center space-y-1">
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

          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
