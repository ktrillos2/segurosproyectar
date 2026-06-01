import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Claudia Romero",
    location: "Bogotá D.C.",
    service: "Seguro de vehículos",
    quote: "Excelente servicio, finalmente no utilicé la póliza, pero la aseguradora se encargó de todo el trámite.",
  },
  {
    name: "Maria Camila Rozo",
    location: "Cali",
    service: "Seguro de vehículos",
    quote: "Fue un gran susto, pero me sentí siempre respaldada tanto por la aseguradora como por Proyectar, al final todo salió bien.",
  },
  {
    name: "Eduardo Lara",
    location: "Bogotá D.C.",
    service: "Seguro de vehículos",
    quote: "Me encantó el acompañamiento en todo el proceso, desde cotizar hasta el final y un excelente servicio.",
  },
]

export function Testimonials() {
  return (
    <div className="grid gap-8 lg:gap-12 md:grid-cols-3">
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

              {/* Quote */}
              <p className="mt-4 text-slate-600 leading-relaxed font-medium italic text-lg">
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
                      {testimonial.location} – {testimonial.service}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}
