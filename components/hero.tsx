"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import Link from "next/link"

const insurers = [
  { name: "AXA Colpatria", src: "/logos/axa-colpatria.png" },
  { name: "Zurich", src: "/logos/zurich.png" },
  { name: "Quálitas", src: "/logos/qualitas.svg" },
  { name: "Equidad Seguros", src: "/logos/equidad.png" },
  { name: "Seguros Mundial", src: "/logos/seguros-mudial.png" },
  { name: "Seguros del Estado", src: "/logos/seguros-del-estado.png" },
]

export function Hero() {
  return (
    <>
      <section id="hero" className="relative bg-gradient-to-b from-slate-50 to-white pt-12 lg:pt-20 pb-12 lg:pb-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                Seguros claros, rápidos y <span className="text-primary">sin enredos.</span>
              </h1>
              
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8 max-w-xl">
                Cotiza, compara y activa tu seguro de vehículo en minutos. 
                Sin papelería. Sin filas. Sin llamadas
              </p>

              <Button 
                asChild
                size="lg" 
                className="h-16 px-10 text-lg font-bold text-white bg-primary hover:bg-primary/90 rounded-md shadow-lg flex items-center justify-center gap-3 transition-colors mb-8 mx-auto lg:mx-0 w-full sm:w-auto"
              >
                <Link href="/cotizar">
                  Cotizar mi seguro
                  <Icon icon="ph:arrow-right-light" className="w-5 h-5" />
                </Link>
              </Button>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-4">
                {[
                  "100% online",
                  "Sin papeleos",
                  "+20 años de trayectoria",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Icon icon="ph:check-circle-light" className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative w-full max-w-2xl mx-auto lg:ml-auto flex justify-center lg:justify-end items-center mt-12 lg:mt-0">
              <img
                src="/Gif/gif-proyectar.gif"
                alt="Automóvil asegurado digitalmente"
                className="w-full max-w-[120%] lg:max-w-[140%] h-auto object-contain scale-110 lg:scale-[1.25] transform lg:translate-x-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Insurers Bar */}
      <section className="bg-slate-50 border-y border-slate-200 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-10">
            Respaldados por las mejores aseguradoras de Colombia
          </p>
          <div className="flex overflow-x-auto pb-6 lg:pb-0 justify-start lg:justify-center items-center gap-12 md:gap-16 lg:gap-20 snap-x snap-mandatory px-4 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {insurers.map((insurer, idx) => (
              <img 
                key={idx}
                src={insurer.src} 
                alt={`Logo ${insurer.name}`} 
                className="h-20 md:h-24 lg:h-28 w-auto object-contain flex-shrink-0 snap-center transition-all duration-300 transform hover:scale-110"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
