import { Icon } from "@iconify/react"

export function HowItWorks() {
  const steps = [
    {
      icon: "ph:file-text-light",
      title: "COTIZA",
      description: "Ingresa los datos de tu vehículo en minutos",
      visual: "/Imagenes/cotiza 1.png",
      isGif: false,
    },
    {
      icon: "ph:scales-light",
      title: "COMPARA",
      description: "Ve las opciones de 6 aseguradoras lado a lado",
      visual: "/Gif/comparacion.gif",
      isGif: true,
    },
    {
      icon: "ph:hand-pointing-light",
      title: "ELIGE",
      description: "Selecciona la cobertura que más te conviene",
      visual: "/Imagenes/elige.png", // Icono únicamente como dice la especificación
      isGif: false,
      isIconOnly: true,
    },
    {
      icon: "ph:check-circle-light",
      title: "ACTIVA",
      description: "Paga y recibe tu póliza al instante",
      visual: "/Gif/activacion.gif",
      isGif: true,
    },
  ]

  return (
    <section id="como-funciona" className="bg-white py-20 lg:py-28 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-sm bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
            Proceso
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-[1.15] text-balance mb-6">
            Tu seguro en 4 pasos <span className="text-primary">simples.</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Decorative Line linking steps on Desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-12 right-12 h-0.5 bg-slate-200 -z-0" />

          {steps.map((step, index) => (
            <div key={index} className="group relative z-10 flex flex-col items-center bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-3 transition-all duration-500">
              
              {/* Step Number Badge */}
              <div className="absolute -top-4 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm border-4 border-white shadow-md group-hover:bg-primary transition-colors">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-20 h-20 mb-6 flex items-center justify-center bg-slate-50 rounded-full border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:border-primary/50 text-slate-700 group-hover:text-white">
                <Icon icon={step.icon} className="w-10 h-10 transition-colors" />
              </div>

              {/* Text */}
              <h3 className="font-black text-slate-900 tracking-wider text-lg mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 font-medium text-sm text-center leading-relaxed h-12 mb-8">
                {step.description}
              </p>

              {/* Visual Container */}
              <div className={`mt-auto w-full aspect-square rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden ${step.isIconOnly ? 'p-4' : 'p-0'}`}>
                <img 
                  src={step.visual} 
                  alt={`Visual ${step.title}`} 
                  className={`w-full h-full object-contain transition-transform duration-500 transform ${step.isIconOnly ? 'opacity-80' : 'mix-blend-multiply scale-110'} group-hover:scale-[1.2]`} 
                />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
