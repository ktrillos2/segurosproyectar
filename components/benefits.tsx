import { Phone, Plus, CreditCard } from "lucide-react"

const benefits = [
  {
    icon: Phone,
    title: "Asesoría de principio a fin",
    description: "sin costo adicional",
  },
  {
    icon: Plus,
    title: "+POSIBILIDADES",
    description: "con más beneficios",
  },
  {
    icon: CreditCard,
    title: "COMPRA EN LÍNEA",
    description: "y sin complicaciones",
  },
]

export function Benefits() {
  return (
    <section className="bg-slate-50 border-y border-slate-200 py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-5 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-md bg-white border border-slate-200 shadow-sm flex items-center justify-center transition-colors duration-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary/30">
                <benefit.icon strokeWidth={1.5} className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-0.5">{benefit.title}</h3>
                <p className="text-slate-500 text-[13px] font-medium">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
