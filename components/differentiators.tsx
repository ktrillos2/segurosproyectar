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
    <section className="bg-white py-20 lg:py-28 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-[1.15] text-balance">
            ¿Por qué asegurarte con <span className="text-primary">Proyectar?</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col p-8 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 transition-all duration-300 hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                <Icon icon={item.icon} className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-xl tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 font-medium text-[15px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
