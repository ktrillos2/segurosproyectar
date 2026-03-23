import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icon } from "@iconify/react"

const fila1 = [
  {
    title: "RESPONSABILIDAD CIVIL",
    desc: "Cubre los daños que causes a terceros en un accidente. Obligatoria para circular en Colombia.",
    icon: "/Imagenes/Responsabilidad civil 1.png"
  },
  {
    title: "DAÑOS Y COLISIÓN",
    desc: "Protege tu carro contra golpes, choques y volcamientos, sin importar quién tenga la culpa.",
    icon: "/Imagenes/daños.png"
  },
  {
    title: "HURTO",
    desc: "Si te roban el carro o partes de él, tu seguro responde. Tranquilidad total.",
    icon: "/Imagenes/hurto 1.png"
  }
]

const fila2 = [
  {
    title: "ASISTENCIA 24/7",
    desc: "Grúa, cerrajero o mecánico a cualquier hora, en cualquier lugar del país.",
    icon: "/Imagenes/Asistencia 1.png"
  },
  {
    title: "VEHÍCULO DE REEMPLAZO",
    desc: "Mientras tu carro está en el taller, sigues moviéndote. Sin traumatismos.",
    icon: "/Imagenes/Vehículo de reemplazo.png"
  },
  {
    title: "DEDUCIBLES",
    desc: "Te explicamos cuánto pagas de tu bolsillo y cuál opción te conviene más.",
    icon: "/Imagenes/Deducibles 1.png"
  }
]

const fila3 = [
  { title: "Gastos de Transporte", desc: "Apoyo para movilidad", icon: "/Imagenes/Gastos de transporte.png" },
  { title: "Vidrios", desc: "Reposición sin costo", icon: "/Imagenes/vidrios 1.png" },
  { title: "Llantas", desc: "Cobertura por estallido", icon: "/Imagenes/llantas 1.png" },
  { title: "Asistencia Jurídica", desc: "Abogados 24/7", icon: "/Imagenes/Asistencia jurídica 1.png" },
  { title: "Amparo Patrimonial", desc: "Protección a tu dinero", icon: "/Imagenes/Amparo patrimonial 1.png" },
  { title: "Accidentes Personales", desc: "Gastos médicos", icon: "/Imagenes/Accidentes personales 1.png" }
]

export function Coberturas() {
  return (
    <section id="coberturas" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-sm bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
            Coberturas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-[1.15] text-balance mb-6">
            Todo lo que necesitas para manejar <span className="text-primary">tranquilo.</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Elige las coberturas que se adaptan a ti. Nosotros comparamos las mejores opciones entre 6 aseguradoras.
          </p>
        </div>

        {/* Fila 1 - Coberturas principales */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {fila1.map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center">
              <img src={item.icon} alt={item.title} className="w-20 h-20 object-contain mb-6" />
              <h3 className="font-extrabold text-slate-900 tracking-tight text-xl mb-3">{item.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Fila 2 - Coberturas complementarias */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {fila2.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center">
              <img src={item.icon} alt={item.title} className="w-16 h-16 object-contain mb-4" />
              <h3 className="font-bold text-slate-900 tracking-tight text-lg mb-2">{item.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Fila 3 - Coberturas adicionales */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
          {fila3.map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-5 sm:p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1 text-center flex flex-col items-center">
              <img src={item.icon} alt={item.title} className="w-14 h-14 object-contain mb-4" />
              <h3 className="font-extrabold text-slate-900 tracking-tight text-sm mb-1">{item.title}</h3>
              <p className="text-slate-500 font-medium text-xs leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA y Notas */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <Button 
            asChild
            size="lg" 
            className="h-14 px-8 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-md flex items-center gap-3 transition-colors mb-8"
          >
            <Link href="/cotizar">
              Ver mis opciones de seguro
              <Icon icon="ph:arrow-right-light" className="w-5 h-5" />
            </Link>
          </Button>

          <p className="text-sm font-medium text-slate-500 mb-2">
            Las coberturas disponibles dependen de cada aseguradora y del plan que elijas.<br className="hidden sm:block"/>
            Al cotizar verás exactamente qué incluye cada opción.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-slate-100 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Próximamente más coberturas
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
