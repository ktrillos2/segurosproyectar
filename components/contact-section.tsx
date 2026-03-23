"use client"

import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulamos un envío de 3 segundos
    setTimeout(() => {
      setIsSubmitting(false)
      // Aquí en el futuro puedes agregar una notificación de éxito o vaciar el formulario
    }, 3000)
  }

  return (
    <section id="contacto" className="bg-slate-50 py-20 lg:py-28 border-y border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-[1.15] text-balance mb-6">
            ¿Tienes alguna duda? Estamos aquí para <span className="text-primary">ayudarte.</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Escríbenos y te respondemos a la mayor brevedad posible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Columna Izquierda — Formulario y Visual */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 md:p-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nombre completo</label>
                    <input 
                      type="text" 
                      placeholder="Juan Pérez"
                      required
                      className="w-full h-12 px-4 rounded-md border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Correo electrónico</label>
                    <input 
                      type="email" 
                      placeholder="juan@correo.com"
                      required
                      className="w-full h-12 px-4 rounded-md border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Asunto</label>
                  <input 
                    type="text" 
                    placeholder="Quiero saber más sobre coberturas"
                    required
                    className="w-full h-12 px-4 rounded-md border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Mensaje</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Escribe tu duda aquí..."
                    className="w-full p-4 rounded-md border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all bg-slate-50 focus:bg-white resize-none"
                  />
                </div>

                {isSubmitting ? (
                  <div className="flex justify-center w-full py-2">
                    <img 
                      src="/Gif/contacto.gif" 
                      alt="Enviando..." 
                      className="w-24 h-24 object-contain opacity-90"
                    />
                  </div>
                ) : (
                  <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-md tracking-wider">
                    Enviar mensaje
                  </Button>
                )}
              </form>

              <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center text-center">
                <p className="text-sm font-medium text-slate-500 mb-6">
                  También puedes cotizar directamente desde nuestra plataforma, es gratis y toma menos de 3 minutos.
                </p>
                <Button asChild variant="outline" className="h-12 w-full sm:w-auto font-bold text-slate-900 border-slate-300 hover:bg-slate-50 shadow-sm gap-2">
                  <Link href="/cotizar">
                    Cotizar mi seguro
                    <Icon icon="ph:arrow-right-light" className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Columna Derecha — Info y Mapa */}
          <div className="flex flex-col space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-8">
                Información de Oficina
              </h3>

              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon icon="ph:map-pin-light" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Oficina Principal</h4>
                    <p className="text-slate-600 font-medium">
                      Calle 140 # 11-45, Oficina 813<br/>
                      Bogotá D.C., Colombia
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon icon="ph:envelope-light" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Correo Electrónico</h4>
                    <a href="mailto:autos@seguros-proyectar.com" className="text-primary hover:text-slate-900 transition-colors font-medium">
                      autos@seguros-proyectar.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon icon="ph:clock-light" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Horarios Administrativos</h4>
                    <p className="text-slate-600 font-medium whitespace-pre-line">
                      Lunes a Viernes<br/>
                      8:00 am - 6:00 pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa Embebido */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm aspect-video sm:aspect-auto sm:h-64 bg-slate-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.3263725586!2d-74.0353131!3d4.7131845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f8fe4cf17f7c3%3A0xc3fa86e1afb5a3eb!2sCl.%20140%20%2311-45%2C%20Usaqu%C3%A9n%2C%20Bogot%C3%A1!5e0!3m2!1sen!2sco!4v1711200000000!5m2!1sen!2sco" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Proyectar Seguros Bogotá"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
