import { Target, HeartHandshake, Shield, Lightbulb, UserCheck, BadgeDollarSign, Award } from "lucide-react"

const benefits = [
  {
    icon: Target,
    text: "Ofrecemos soluciones a la medida para proteger lo que más importa.",
  },
  {
    icon: HeartHandshake,
    text: "Brindamos respaldo y tranquilidad con soluciones diseñadas para cada etapa de tu vida.",
  },
  {
    icon: Shield,
    text: "Somos tu aliado estratégico con soluciones que se adaptan a cada necesidad y momento.",
  },
  {
    icon: Lightbulb,
    text: "Te ofrecemos protección inteligente con soluciones pensadas para tu bienestar y el de tu familia.",
  },
]

const differentiators = [
  {
    icon: UserCheck,
    title: "Asesoría personalizada",
    description: "Nuestro equipo está para ayudarte, te orientamos con claridad, compromiso, buscando la mejor opción de cobertura para proteger tu patrimonio.",
  },
  {
    icon: BadgeDollarSign,
    title: "Precios justos",
    description: "Diseñamos tu seguro con base en lo que realmente necesitas asegurar.",
  },
  {
    icon: Award,
    title: "Más experiencia",
    description: "30 años de experiencia y cientos de clientes satisfechos nos hacen sentir orgullosos de poder brindarte el mejor servicio.",
  },
]

export function WhyUs() {
  return (
    <section className="bg-slate-50 border-y border-slate-200 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            ¿Por qué elegirnos?
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Habla con nosotros. <span className="text-primary">Más que seguros ofrecemos soluciones</span>
          </h2>
        </div>

        {/* Benefits List */}
        <div className="grid gap-6 md:grid-cols-2 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-5 bg-white rounded-md p-6 border border-slate-100 shadow-sm"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center">
                <benefit.icon strokeWidth={1.5} className="w-5 h-5 text-primary" />
              </div>
              <p className="text-slate-600 font-medium text-[15px] leading-relaxed">{benefit.text}</p>
            </div>
          ))}
        </div>

        {/* Differentiators Section */}
        <div className="mt-24 pt-20 border-t border-slate-200">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-slate-900 mb-6">
              Lo que nos diferencia. <span className="text-primary">Somos más que seguros.</span>
            </h3>
            <p className="mt-4 text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
              Nuestra propuesta de servicio da inicio con una asesoría sin costo con el fin conocer más 
              en detalle la actividad y la forma como se desarrolla su necesidad, lo cual nos permite 
              determinar la solución ideal para su necesidad puntual.
            </p>
          </div>

          {/* Differentiator Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-md p-10 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center mb-8">
                  <item.icon strokeWidth={1.5} className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-[17px] font-black text-slate-900 mb-4 uppercase tracking-tight">{item.title}</h4>
                <p className="text-slate-500 text-[14px] font-medium leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
