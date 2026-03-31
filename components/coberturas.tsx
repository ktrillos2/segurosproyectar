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
    desc: "Protege tu vehículo contra golpes, choques y volcamientos, sin importar quién tenga la culpa.",
    icon: "/Imagenes/danos.png"
  },
  {
    title: "HURTO",
    desc: "Si te roban el vehículo o partes de él, tu seguro responde. Tranquilidad total.",
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
    desc: "Mientras tu vehículo está en el taller, sigues moviéndote. Sin traumatismos.",
    icon: "/Imagenes/vehiculo-de-reemplazo.png"
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
  { title: "Asistencia Jurídica", desc: "Abogados 24/7", icon: "/Imagenes/asistencia-juridica-1.png" },
  { title: "Amparo Patrimonial", desc: "Protección a tu dinero", icon: "/Imagenes/Amparo patrimonial 1.png" },
  { title: "Accidentes Personales", desc: "Gastos médicos", icon: "/Imagenes/Accidentes personales 1.png" }
]

export function Coberturas() {
  return (
    <section id="coberturas" className="bg-slate-100 py-20 lg:py-28 border-y border-slate-200">
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
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group">
              <img src={item.icon} alt={item.title} className="w-32 h-32 object-contain mb-6 transition-transform group-hover:scale-110" />
              <h3 className="font-extrabold text-slate-900 tracking-tight text-xl mb-3 uppercase">{item.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Fila 2 - Coberturas complementarias */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {fila2.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center group">
              <img src={item.icon} alt={item.title} className="w-32 h-32 object-contain mb-6 transition-transform group-hover:scale-110" />
              <h3 className="font-extrabold text-slate-900 tracking-tight text-xl mb-3 uppercase">{item.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Fila 3 - Coberturas adicionales */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 mb-16">
          {fila3.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center flex flex-col items-center group">
              <img src={item.icon} alt={item.title} className="w-28 h-28 object-contain mb-4 transition-transform group-hover:scale-110" />
              <h3 className="font-extrabold text-slate-900 tracking-tight text-xs mb-1 uppercase">{item.title}</h3>
              <p className="text-slate-500 font-medium text-[10px] leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 mb-24 text-center">
          <Button 
            asChild
            size="lg" 
            className="h-14 px-10 text-lg font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-md shadow-lg flex items-center gap-3 transition-colors mb-8 inline-flex"
          >
            <Link href="/cotizar">
              Ver mis opciones de vehículo
              <Icon icon="ph:arrow-right-light" className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-sm font-medium text-slate-400">
            Seguros Proyectar S.A.S. - Agencia de Seguros Vinculada
          </p>
        </div>
      </div>
    </section>
  )
}
