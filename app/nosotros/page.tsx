import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhyUs } from "@/components/why-us"
import { Check, Star, Heart, CheckCircle, Award, Users, Clock, Target, Handshake } from "lucide-react"

const values = [
  {
    icon: Check,
    title: "Mision",
    description: "Brindar asesoria integral en seguros, ofreciendo soluciones personalizadas que protejan el patrimonio y bienestar de nuestros clientes."
  },
  {
    icon: Star,
    title: "Vision",
    description: "Ser la corredora de seguros lider en Colombia, reconocida por nuestra excelencia en servicio y compromiso con la proteccion de familias y empresas."
  },
  {
    icon: Heart,
    title: "Valores",
    description: "Integridad, compromiso, profesionalismo y servicio al cliente son los pilares que guian cada una de nuestras acciones."
  }
]

const stats = [
  { value: "30+", label: "Anos de experiencia" },
  { value: "15K+", label: "Clientes satisfechos" },
  { value: "98%", label: "Tasa de renovacion" },
  { value: "24/7", label: "Soporte disponible" },
]

export default function NosotrosPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-sm bg-primary/5 text-primary text-[11px] font-bold uppercase tracking-wider mb-6">
                Sobre Nosotros
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Somos: Proyectar Seguros.{" "}
                <span className="text-primary">Te hacemos las cosas faciles!</span>
              </h1>
              <p className="mt-8 text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
                Somos una compania con mas de 30 anos de experiencia en el sector asegurador, 
                tenemos amplia experiencia en el manejo de programas de seguros personales y empresariales. 
                Nuestro equipo humano, altamente calificado y comprometido, nos permite ofrecer soluciones 
                personalizadas y eficaces, adaptadas a las necesidades especificas de cada cliente.
              </p>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
                A traves de un acompanamiento profesional, te asesoramos en la toma de decisiones 
                estrategicas que garantizan la proteccion integral de tu patrimonio.
              </p>
 
              <div className="mt-10 flex flex-col sm:flex-row gap-8">
                <div className="flex items-center gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                  <span className="font-extrabold text-sm tracking-tight">+30 anos de experiencia</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                  <span className="font-extrabold text-sm tracking-tight">Equipo calificado</span>
                </div>
              </div>
            </div>
 
            <div className="relative">
              <div className="aspect-square rounded-md bg-white border border-slate-100 flex items-center justify-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]">
                <div className="text-center p-8">
                  <div className="text-8xl md:text-9xl font-black text-primary tracking-tighter">30+</div>
                  <div className="text-xl md:text-2xl font-black text-slate-900 mt-6 uppercase tracking-tight">
                    Anos de experiencia
                  </div>
                  <p className="text-slate-500 font-semibold mt-4 text-balance max-w-xs mx-auto leading-relaxed">
                    Protegiendo familias y empresas en Colombia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Nuestro Proposito
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Nuestros Pilares
            </h2>
          </div>
 
          <div className="grid gap-10 md:grid-cols-3">
            {values.map((item, index) => (
              <div key={index} className="bg-white rounded-md p-10 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
                <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center mb-8">
                  <item.icon strokeWidth={1.5} className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-[15px] font-medium leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <Footer />
    </main>
  )
}
