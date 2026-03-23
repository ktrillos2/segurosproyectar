import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Claudia Romero",
    location: "Bogota D.C.",
    service: "Seguro de vehiculos",
    quote: "Excelente servicio, finalmente no utilice la poliza, pero la aseguradora se encargo de todo el tramite.",
    rating: 5,
  },
  {
    name: "Maria Camila Rozo",
    location: "Cali",
    service: "Seguro Hogar",
    quote: "Fue un gran susto, pero me senti siempre respaldada tanto por la aseguradora como por Proyectar, al final todo salio bien.",
    rating: 5,
  },
  {
    name: "Eduardo Lara",
    location: "Bogota D.C.",
    service: "Seguro de vehiculos",
    quote: "Me encanto el acompanamiento en todo el proceso, desde cotizar hasta el final y un excelente servicio.",
    rating: 5,
  },
  {
    name: "Andrea Martinez",
    location: "Medellin",
    service: "Seguro de Vida",
    quote: "La asesoria fue muy profesional. Me explicaron todas las opciones y encontre el plan perfecto para mi familia.",
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    location: "Barranquilla",
    service: "Seguro Empresarial",
    quote: "Llevamos 5 anos trabajando con Proyectar Seguros y siempre han sido muy responsables y eficientes.",
    rating: 5,
  },
  {
    name: "Laura Gonzalez",
    location: "Bogota D.C.",
    service: "Seguro de Mascotas",
    quote: "No sabia que existian seguros para mascotas hasta que conoci Proyectar. Mi perrito esta protegido gracias a ellos.",
    rating: 5,
  },
]

export default function TestimoniosPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="inline-flex px-3 py-1 rounded-sm bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Testimonios
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Lo que dicen de <span className="text-primary">nosotros</span>
          </h1>
          <p className="mt-8 text-lg text-slate-600 leading-relaxed font-medium mx-auto">
            Porque la mejor carta de presentación son nuestros clientes, conoce aquí sus opiniones y experiencias.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black text-white">4.9/5.0</div>
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 text-balance">Calificación promedio</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white">15K+</div>
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 text-balance">Clientes satisfechos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-white">98%</div>
              <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 text-balance">Tasa de renovación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white rounded-md p-10 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-10">
                  <div className="w-10 h-10 rounded-sm bg-primary flex items-center justify-center shadow-lg">
                    <Quote className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mt-2 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-600 leading-relaxed font-medium italic text-lg">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center">
                      <span className="text-primary font-black text-xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-black text-slate-900 leading-tight">{testimonial.name}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                        {testimonial.location} - {testimonial.service}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
