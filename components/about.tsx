import { Icon } from "@iconify/react"



export function About() {
  return (
    <section id="nosotros" className="bg-slate-50 py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <div>
            <span className="inline-block px-3 py-1 rounded-sm bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
              Nosotros
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-[1.15] text-balance mb-8">
              Más de 20 años conectando colombianos con el seguro que necesitan.
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed font-medium mb-12">
              Proyectar Seguros nació en 2004 con una misión clara: hacer que los seguros sean simples, 
              accesibles y transparentes para todos los colombianos. Hoy, dos décadas después, damos un 
              paso adelante y llevamos esa misión al mundo digital con tecnología de punta que te permite 
              cotizar, comparar y activar tu póliza en minutos, desde cualquier dispositivo, sin papelería y sin 
              intermediarios innecesarios.
            </p>

            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md shadow-sm border border-slate-200 flex items-center justify-center text-primary">
                  <Icon icon="ph:target-light" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 tracking-tight">Misión</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Proteger los vehículos de los colombianos con seguros claros, rápidos y sin enredos respaldados por las mejores aseguradoras del país.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md shadow-sm border border-slate-200 flex items-center justify-center text-primary">
                  <Icon icon="ph:eye-light" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 tracking-tight">Visión</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Ser la plataforma digital de seguros de vehículos más confiable de Colombia, donde cada conductor encuentre la mejor cobertura al mejor precio en minutos.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-md shadow-md flex items-center justify-center text-white">
                  <Icon icon="ph:cpu-light" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 tracking-tight">¿Cómo lo hacemos?</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Nuestra plataforma conecta en tiempo real con las principales aseguradoras del país, compara 
                    precios y coberturas automáticamente y te presenta las mejores opciones en segundos. Sin 
                    llamadas. Sin visitas. Sin esperas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative pt-10 lg:pt-0">
            <div className="relative rounded-2xl bg-white border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-4 sm:p-8">
              <img
                src="/Gif/nosotros.gif"
                alt="Proyectar Seguros - Trayectoria y tecnología"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            {/* Decorative blurs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>


      </div>
    </section>
  )
}
