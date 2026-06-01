import { Button } from "@/components/ui/button"
import { 
  Car, 
  Heart, 
  Shield, 
  Scale, 
  Home, 
  Users, 
  Truck, 
  GraduationCap, 
  PawPrint, 
  Building,
  Key
} from "lucide-react"

const services = [
  { icon: Car, title: "SEGUROS DE MOVILIDAD" },
  { icon: Heart, title: "SALUD" },
  { icon: Shield, title: "SEGURO DE VIDA" },
  { icon: Scale, title: "PÓLIZAS JUDICIALES" },
  { icon: Building, title: "SEGURO DE PROPIEDAD" },
  { icon: Users, title: "SEGURO COLECTIVO" },
  { icon: Truck, title: "SEGURO DE TRANSPORTES" },
  { icon: GraduationCap, title: "SEGURO EDUCATIVO" },
  { icon: PawPrint, title: "SEGURO DE MASCOTAS" },
  { icon: Home, title: "SEGURO HOGAR" },
  { icon: Key, title: "SEGURO DE ARRENDAMIENTO" },
]

export function Services() {
  return (
    <section id="servicios" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
            Líderes en asesoría de seguros
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Ofrecemos las mejores coberturas, haciendo un análisis comparativo de condiciones de mercado 
            con las diferentes compañías de seguros. ¡A esto nos dedicamos! Un seguro para cada necesidad.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{service.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Más información
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-16 p-8 bg-secondary rounded-2xl">
          <p className="text-muted-foreground text-center leading-relaxed max-w-4xl mx-auto">
            Ofrecemos gran variedad de productos para amparar el patrimonio de nuestros clientes como son 
            automóviles, integral del hogar, vida, seguro educativo, arrendamiento, multirriesgo, daño material 
            (Incendio, sustracción, terremoto, equipo eléctrico y electrónico, montaje rotura de maquinaria), 
            todo riesgo construcción, transporte de mercancías, transporte de valores, cumplimiento, manejo, 
            pólizas judiciales, responsabilidad civil e infidelidad y riesgos financieros.
          </p>
        </div>
      </div>
    </section>
  )
}
