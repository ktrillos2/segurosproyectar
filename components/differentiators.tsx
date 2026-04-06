import { Icon } from "@iconify/react"

const differentiators = [
  {
    icon: "ph:rocket-light",
    title: "Rápido",
    description: "De la cotización a la póliza en minutos",
  },
  {
    icon: "ph:magnifying-glass-light",
    title: "Transparente",
    description: "Ves todo antes de pagar, sin letras pequeñas",
  },
  {
    icon: "ph:shield-check-light",
    title: "Respaldado",
    description: "+20 años de trayectoria y 6 aseguradoras aliadas",
  },
  {
    icon: "ph:device-mobile-light",
    title: "100% Digital",
    description: "Desde el celular, sin visitas ni llamadas",
  },
  {
    icon: "ph:currency-circle-dollar-light",
    title: "Precio justo",
    description: "Comparamos para que siempre pagues lo correcto",
  },
  {
    icon: "ph:lightning-light",
    title: "Sin enredos",
    description: "Simple como debe ser",
  },
]

export function Differentiators() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-sm bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
            Diferenciadores
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-[1.15] text-balance">
            ¿Por qué asegurarte con <span className="text-primary">Proyectar?</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, idx) => (
            <div 
              key={idx} 
              className="relative group bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100%] -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110" />
              <div className="relative z-10 flex flex-col items-start text-left">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Icon icon={item.icon} className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-xl tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 font-medium text-[15px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
