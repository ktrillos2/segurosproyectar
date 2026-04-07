import { Icon } from "@iconify/react"
import { Testimonials } from "@/components/testimonials"
import { Star, Zap } from "lucide-react"

const stats = [
  { value: "+20", label: "Años de trayectoria" },
  { value: "6", label: "Aseguradoras aliadas" },
  { value: "100%", label: "Digital y seguro" },
  { value: "SFC", label: "Vigilado" },
]

export function About() {
  return (
    <section id="nosotros" className="flex flex-col">
      {/* Bloque 1: Fondo azul oscuro, estadísticas clave */}
      <div className="bg-slate-900 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full translate-x-1/2" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="inline-block px-3 py-1 rounded-sm bg-white/10 text-white text-[11px] font-bold uppercase tracking-[0.2em] mb-8 border border-white/20">
              Quiénes Somos
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
              Protegemos lo que más <span className="text-white">valoras.</span>
            </h2>
            <p className="text-xl text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto">
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
                <div className="text-slate-300 text-xs font-bold uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bloque 2: Fondo claro, Misión y Visión + GIF */}
      <div className="bg-white py-20 lg:py-28 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center font-bold">
            <div className="space-y-10">
              <div className="bg-slate-50 rounded-2xl p-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Misión</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Brindar asesoría integral en seguros, ofreciendo soluciones tecnológicas personalizadas 
                  que protejan el patrimonio y bienestar de las <span className="text-primary font-bold">personas</span>.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">Visión</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Ser la corredora de seguros líder en innovación digital en Colombia, 
                  siendo la primera opción para quienes buscan rapidez, claridad y total confianza.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <img 
                src="/Gif/nosotros.gif" 
                alt="Proyectar Seguros Experience" 
                className="w-full h-auto object-contain mix-blend-multiply scale-[1.2] md:scale-[1.4] lg:scale-[1.5] transition-transform duration-700 hover:scale-[1.3] md:hover:scale-[1.5] lg:hover:scale-[1.6]"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bloque 3: Fondo gris suave + Testimonios */}
      <div className="bg-slate-50 py-20 lg:py-28">
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
      </div>
    </section>
  )
}
