import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Car, 
  Heart, 
  Shield, 
  Scale, 
  Home, 
  Users, 
  Truck, 
  GraduationCap, 
  PawPrint, 
  Building,
  Key,
  ArrowRight
} from "lucide-react"
import { client } from "@/sanity/lib/client"

// Mapeo de iconos
const IconMap: Record<string, any> = {
  Car, Heart, Shield, Scale, Home, Users, Truck, GraduationCap, PawPrint, Building, Key
}

export default async function ServiciosPage() {
  const data = await client.fetch(`*[_type == "servicesPage"][0]`)
  
  const personalServices = data?.personalServices || []
  const businessServices = data?.businessServices || []
  const additionalProducts = data?.additionalSpecialties || []
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="inline-flex px-3 py-1 rounded-sm bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            {data?.heroSubtitle || "Nuestros Servicios"}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            {data?.heroTitle || "Líderes en asesoría de"} <span className="text-primary">{data?.heroTitleHighlight || "seguros"}</span>
          </h1>
          <p className="mt-8 text-lg text-slate-600 leading-relaxed font-medium mx-auto">
            {data?.heroDescription || "Ofrecemos las mejores coberturas..."}
          </p>
        </div>
      </section>

      {/* Personal Insurance */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Seguros Personales
            </h2>
            <p className="mt-3 text-slate-500 font-medium">
              Protección integral para ti y tu familia
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {personalServices.map((service: any, index: number) => {
              const ServiceIcon = IconMap[service.iconName] || Shield;
              return (
                <div
                  key={service._key || index}
                  className="group bg-white rounded-md p-8 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center">
                      <ServiceIcon strokeWidth={1.5} className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-lg leading-tight">{service.title}</h3>
                  </div>
                  <p className="text-slate-500 font-medium text-[15px] leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Insurance */}
      <section className="bg-slate-50 border-y border-slate-200 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Seguros Corporativos
            </h2>
            <p className="mt-3 text-slate-500 font-medium">
              Soluciones a la medida de tu empresa
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {businessServices.map((service: any, index: number) => {
              const ServiceIcon = IconMap[service.iconName] || Building;
              return (
                <div
                  key={service._key || index}
                  className="group bg-white rounded-md p-8 border border-slate-100 shadow-sm transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center mb-6">
                    <ServiceIcon strokeWidth={1.5} className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-3 leading-tight">{service.title}</h3>
                  <p className="text-slate-500 font-medium text-[14px] leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-md p-8 md:p-14 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
            <div className="max-w-4xl">
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Especialidades Adicionales</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-10 text-lg">
                Ofrecemos una gran variedad de productos especializados para amparar el patrimonio 
                integral de nuestros clientes en diversas categorías:
              </p>
              
              <div className="flex flex-wrap gap-3">
                {additionalProducts.map((product: string, index: number) => (
                  <div 
                    key={index}
                    className="bg-slate-50 border border-slate-100 rounded-sm px-5 py-2.5 text-[13px] font-extrabold text-slate-700 uppercase tracking-tight hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all cursor-default"
                  >
                    {product}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Encuentra el seguro perfecto para ti
              </h2>
              <p className="mt-4 text-slate-400 font-medium text-lg">
                Nuestro asistente con IA te ayudará a cotizar en minutos
              </p>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary text-white rounded-md font-bold text-base h-14 px-8 shadow-md">
              <Link href="/cotizar" className="flex items-center gap-3">
                Cotizar ahora
                <ArrowRight strokeWidth={2.5} className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
