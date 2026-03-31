import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { Check, Star, Users, ShieldCheck, Zap, Heart } from "lucide-react"

const stats = [
  { value: "+20", label: "Años de trayectoria" },
  { value: "6", label: "Aseguradoras aliadas" },
  { value: "100%", label: "Digital y seguro" },
  { value: "SFC", label: "Vigilado" },
]

export default function NosotrosPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Bloque 1: Fondo azul oscuro, estadísticas clave */}
      <section className="bg-slate-900 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="inline-block px-3 py-1 rounded-sm bg-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-8 border border-primary/30">
              Quiénes Somos
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
              Protegemos lo que más <span className="text-primary">valoras.</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
              Somos una agencia de seguros autorizada con más de 20 años de experiencia, 
              liderando la transformación digital del sector asegurador en Colombia.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-6xl font-black text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloque 2: Fondo claro, Misión y Visión + GIF */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center font-bold">
            
            <div className="space-y-10">
              <div className="bg-slate-50 rounded-2xl p-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Misión</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Brindar asesoría integral en seguros, ofreciendo soluciones tecnológicas personalizadas 
                  que protejan el patrimonio y bienestar de las <span className="text-primary font-bold">personas</span>.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Visión</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Ser la corredora de seguros líder en innovación digital en Colombia, 
                  siendo la primera opción para quienes buscan rapidez, claridad y total confianza.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shadow-2xl">
                <img 
                  src="/Gif/nosotros.gif" 
                  alt="Proyectar Seguros Experience" 
                  className="w-full h-full object-contain scale-110 md:scale-[1.3] mix-blend-multiply"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>

          </div>
        </div>
      </section>

      {/* Bloque 3: Fondo gris suave + Testimonios */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block px-3 py-1 rounded-sm bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
              Confianza
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Lo que dicen nuestros <span className="text-primary">clientes.</span>
            </h2>
          </div>

          <Testimonials />
        </div>
      </section>

      <Footer />
    </main>
  )
}
