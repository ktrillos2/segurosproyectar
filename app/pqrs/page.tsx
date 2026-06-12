import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { PQRSForm } from "@/components/pqrs-form"

export const metadata: Metadata = {
  title: "PQRS | Proyectar Seguros",
  description: "Canal oficial para radicar Peticiones, Quejas, Reclamos y Sugerencias de Proyectar Seguros S.A.S.",
}

export const revalidate = 60;

export default async function PQRSSPage() {
  const data = await client.fetch(`*[_type == "pqrsPage"][0]`);

  const pqrsTypes = data?.pqrsTypes || [
    { type: "Petición", definition: "Solicitud respetuosa de información relacionada con la prestación de nuestros servicios.", example: "Solicitar copia de una póliza o certificación de cobertura." },
    { type: "Queja", definition: "Expresión de insatisfacción respecto a la conducta o actuar de un funcionario de la agencia.", example: "Mala atención por parte de un asesor." },
    { type: "Reclamo", definition: "Expresión de insatisfacción frente a la prestación de los servicios o productos ofrecidos.", example: "Demora injustificada en la expedición de una póliza." },
    { type: "Sugerencia", definition: "Propuesta para mejorar un proceso o servicio de la agencia.", example: "Sugerir un nuevo canal de atención virtual." }
  ];
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow pt-8 pb-24">
        <article className="max-w-4xl mx-auto px-4 md:px-4 py-8">
          <div className="mb-12 text-center border-b border-slate-200 pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
              <span className="inline-flex px-3 py-1 rounded-sm bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                Servicio al Cliente
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8 text-balance">
                {data?.pageTitle || "Canal de Peticiones, Quejas, Reclamos y Sugerencias (PQRS)"}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mx-auto">
                {data?.introText || "En Proyectar Seguros tu experiencia importa..."}
              </p>
            </div>
          </div>

          <div className="space-y-8 text-slate-600 leading-relaxed text-[15px] md:text-base">
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
                    {pqrsTypes.map((item: any, index: number) => (
                      <tr key={item._key || index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-bold text-slate-900 align-top">{item.type}</td>
                        <td className="p-4 text-slate-600 text-[15px] align-top">{item.definition}</td>
                        <td className="p-4 text-slate-500 text-[14px] italic align-top">{item.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. Plazos de respuesta</h3>
              <p className="text-slate-600 leading-relaxed">
                {data?.responseTimesText || "Proyectar Seguros responde todas las solicitudes en un plazo máximo de quince (15) días hábiles, contados a partir del día hábil siguiente a la fecha de radicación, en cumplimiento de la normativa de la Superintendencia Financiera de Colombia."}
              </p>
            </section>

            <section className="bg-slate-50 py-12">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Radica tu solicitud</h2>
                    <p className="text-slate-500">
                      {data?.formIntroText || "Diligencie el siguiente formulario con información completa y veraz. Al enviar su solicitud recibirá un correo electrónico de confirmación con su número de radicado."}
                    </p>
                  </div>
              
                  <PQRSForm />
                </div>
              </div>
            </section>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">¿Qué ocurre después de radicar la solicitud?</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                {data?.afterSubmitText || "Una vez enviado el formulario, el sistema asignará automáticamente un número de radicado único y enviará una confirmación al correo registrado. Proyectar Seguros revisará el caso y emitirá una respuesta formal dentro del plazo legal establecido."}
              </p>
              <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">Vigencia e información adicional</h3>
              <p className="text-slate-600 leading-relaxed">
                {data?.validityText || "Este canal de PQRS entra en vigencia desde su publicación en la plataforma web de Proyectar Seguros. Si considera que sus derechos han sido vulnerados, puede acudir a la Superintendencia Financiera de Colombia en www.superfinanciera.gov.co o a la Superintendencia de Industria y Comercio (SIC) en www.sic.gov.co."}
              </p>
            </div>

          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
