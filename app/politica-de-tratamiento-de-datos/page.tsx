import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"
import { legalPortableTextComponents } from "@/components/PortableTextComponents"

export const metadata: Metadata = {
  title: "Política de Tratamiento de Datos | Proyectar Seguros",
  description: "Política de tratamiento de datos personales de Proyectar Seguros S.A.S.",
}

export const revalidate = 3600 // Revalidate every hour

export default async function PoliticaDatosPage() {
  const doc = await client.fetch(`*[_type == "legalPage" && slug.current == "politica-de-tratamiento-de-datos"][0]`);
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow pt-8 pb-24">
        <article className="max-w-4xl mx-auto px-4 md:px-12 py-12 bg-white rounded-2xl shadow-sm border border-slate-200">
          {doc ? (
            <>
              <div className="mb-12 text-center border-b border-slate-100 pb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-balance uppercase">
                  {doc.title || "POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES"}
                </h1>
                <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">
                  {doc.subtitle || "PROYECTAR SEGUROS S.A.S."}
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  {doc.locationDate || "Bogotá D.C., Colombia"}
                </p>
              </div>

              <div className="text-[15px] md:text-base">
                <PortableText value={doc.content} components={legalPortableTextComponents} />
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-700">Contenido no disponible</h2>
              <p className="text-slate-500 mt-2">Por favor, inténtelo más tarde.</p>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-slate-200 text-center sm:text-left text-sm font-medium text-slate-500">
            <p>PROYECTAR SEGUROS S.A.S. — NIT 830.139.875-7</p>
            <p>Bogotá D.C., Colombia — {new Date().getFullYear()}</p>
            <p><a href="mailto:contactenos@seguros-proyectar.com" className="text-primary hover:underline font-bold">contactenos@seguros-proyectar.com</a></p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
