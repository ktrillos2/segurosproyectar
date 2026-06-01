import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Star, Quote, ShieldCheck, MapPin } from "lucide-react"
import { client } from "@/sanity/lib/client"

export default async function TestimoniosPage() {
  const data = await client.fetch(`*[_type == "testimonialsPage"][0]`)
  
  const stats = data?.stats || []
  const testimonials = data?.testimonialsList || []
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="inline-flex px-3 py-1 rounded-sm bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            {data?.heroSubtitle || "Testimonios"}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight text-balance">
            {data?.heroTitle || "Lo que dicen de"} <span className="text-primary">{data?.heroTitleHighlight || "nosotros"}</span>
          </h1>
          <p className="mt-8 text-lg text-slate-600 leading-relaxed font-medium mx-auto">
            {data?.heroDescription || "Porque la mejor carta de presentación son nuestros clientes..."}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((stat: any, index: number) => (
              <div key={stat._key || index} className="py-8 md:py-12 text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial: any, index: number) => (
              <div 
                key={testimonial._key || index}
                className="bg-white rounded-md p-8 border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all flex flex-col"
              >
                {/* Estrellas */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonio */}
                <blockquote className="flex-grow mb-8">
                  <p className="text-slate-600 font-medium leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {/* Cliente */}
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400">
                    <Quote className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 leading-tight mb-1">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center gap-3 text-[13px] font-medium text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {testimonial.location}
                      </span>
                      <span className="flex items-center gap-1 text-primary">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {testimonial.service}
                      </span>
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
