"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useState } from "react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Direccion",
    content: "Calle 140# 11 - 45 / Oficina 813",
    subtitle: "Bogota D.C. - Colombia"
  },
  {
    icon: Phone,
    title: "Telefono",
    content: "310 2448271",
    subtitle: "Linea directa"
  },
  {
    icon: Mail,
    title: "Email",
    content: "contactenos@segurosproyectar.com",
    subtitle: "Respuesta en 24 horas"
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lunes a Viernes: 8am - 6pm",
    subtitle: "Sabados: 9am - 1pm"
  },
]

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="inline-flex px-3 py-1 rounded-sm bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Contacto
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Estamos para <span className="text-primary">ayudarte</span>
          </h1>
          <p className="mt-8 text-lg text-slate-600 leading-relaxed font-medium mx-auto">
            Comunícate con nosotros y te orientamos en todo lo que necesites saber. 
            Siempre estamos dispuestos a resolver tus dudas.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="bg-white rounded-md p-10 border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]">
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2 tracking-tight">
                      Nombre completo
                    </label>
                    <Input
                      id="name"
                      className="rounded-sm border-slate-200 focus:border-primary/30 h-12"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2 tracking-tight">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      className="rounded-sm border-slate-200 focus:border-primary/30 h-12"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2 tracking-tight">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      className="rounded-sm border-slate-200 focus:border-primary/30 h-12"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="300 000 0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2 tracking-tight">
                      Asunto
                    </label>
                    <Input
                      id="subject"
                      className="rounded-sm border-slate-200 focus:border-primary/30 h-12"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Asunto del mensaje"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2 tracking-tight">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    className="rounded-sm border-slate-200 focus:border-primary/30"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary text-white rounded-md font-black text-base h-14 shadow-md transition-all active:scale-[0.98]">
                  Enviar mensaje
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight leading-tight">Información de contacto</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md">
                  Puedes adquirir tu seguro desde cualquier parte del país. 
                  Siempre te asesoramos de principio a fin.
                </p>
              </div>

              <div className="grid gap-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-lg mb-1 tracking-tight">{item.title}</div>
                      <div className="text-slate-700 font-bold">{item.content}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{item.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="rounded-md overflow-hidden border border-slate-100 h-72 bg-slate-50 flex items-center justify-center group cursor-pointer transition-all hover:bg-slate-100/50">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-sm bg-white border border-slate-100 flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="font-black text-slate-900 tracking-tight">Mapa de ubicación</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Calle 140 #11-45, Bogotá</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
