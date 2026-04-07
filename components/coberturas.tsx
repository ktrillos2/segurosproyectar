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
  { title: "Gastos de Transporte", desc: "Apoyo económico para cubrir tus gastos de movilidad mientras tu vehículo está en reparación.", icon: "/Imagenes/Gastos de transporte.png" },
  { title: "Vidrios", desc: "Reposición de parabrisas y ventanas dañadas sin costo adicional según las condiciones de tu póliza.", icon: "/Imagenes/vidrios 1.png" },
  { title: "Llantas", desc: "Cobertura ante daños por estallido o pinchadura en vía.", icon: "/Imagenes/llantas 1.png" },
  { title: "Asistencia Jurídica", desc: "Asesoría y acompañamiento legal ante conflictos derivados de un accidente de tránsito.", icon: "/Imagenes/asistencia-juridica-1.png" },
  { title: "Amparo Patrimonial", desc: "Protección de tu patrimonio frente a reclamaciones económicas por daños causados a terceros.", icon: "/Imagenes/Amparo patrimonial 1.png" },
  { title: "Accidentes Personales", desc: "Cobertura de gastos médicos para el conductor y los ocupantes del vehículo en caso de accidente.", icon: "/Imagenes/Accidentes personales 1.png" }
]

export function Coberturas() {
  return (
    <section id="coberturas" className="bg-slate-50 relative py-20 lg:py-28 border-y border-slate-200">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
            <div key={idx} className="bg-white border-2 border-slate-100 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 text-center flex flex-col items-center group shadow-md">
              <img src={item.icon} alt={item.title} className="w-40 h-40 object-contain mb-6 transition-transform duration-500 group-hover:scale-110" />
              <h3 className="font-extrabold text-slate-900 tracking-tight text-xl mb-3 uppercase">{item.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Fila 2 - Coberturas complementarias */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {fila2.map((item, idx) => (
            <div key={idx} className="bg-white border-2 border-slate-100 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 text-center flex flex-col items-center group shadow-md">
              <img src={item.icon} alt={item.title} className="w-40 h-40 object-contain mb-6 transition-transform duration-500 group-hover:scale-110" />
              <h3 className="font-extrabold text-slate-900 tracking-tight text-xl mb-3 uppercase">{item.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Fila 3 - Coberturas adicionales */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {fila3.map((item, idx) => (
            <div key={idx} className="bg-white border-2 border-slate-100 rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 text-center flex flex-col items-center group shadow-md">
              <img src={item.icon} alt={item.title} className="w-32 h-32 object-contain mb-6 transition-transform duration-500 group-hover:scale-110" />
              <h3 className="font-extrabold text-slate-900 tracking-tight text-lg mb-2 uppercase">{item.title}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 sm:mb-8 text-center">
          <Button 
            asChild
            size="lg" 
            className="h-16 px-12 text-lg font-bold text-white bg-primary hover:bg-primary/90 rounded-md shadow-xl flex items-center gap-3 transition-colors mb-6 mx-auto w-full sm:w-auto"
          >
            <Link href="/cotizar">
              Asegurar tu vehículo
              <Icon icon="ph:arrow-right-bold" className="w-6 h-6" />
            </Link>
          </Button>
          <p className="text-sm font-medium text-slate-500">
            Seguros Proyectar S.A.S. - Agencia de Seguros Vinculada
          </p>
        </div>
      </div>
    </section>
  )
}
