"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

export function Hero({ data }: { data?: any }) {
  if (!data) return null;

  // Render title with highlight
  const renderTitle = () => {
    if (!data.title || !data.titleHighlight) return data.title;
    const parts = data.title.split(data.titleHighlight);
    if (parts.length < 2) return data.title;
    return (
      <>
        {parts[0]}<span className="text-primary">{data.titleHighlight}</span>{parts[1]}
      </>
    );
  };

  return (
    <>
      <section id="hero" className="relative bg-gradient-to-b from-slate-50 to-white pt-12 lg:pt-20 pb-12 lg:pb-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                {renderTitle()}
              </h1>
              
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8 max-w-xl">
                {data.description}
              </p>

              <Button 
                asChild
                size="lg" 
                className="h-16 px-10 text-lg font-bold text-white bg-primary hover:bg-primary/90 rounded-md shadow-lg flex items-center justify-center gap-3 transition-colors mb-8 mx-auto lg:mx-0 w-full sm:w-auto"
              >
                <Link href={data.buttonLink || "/cotizar"}>
                  {data.buttonText}
                  <Icon icon="ph:arrow-right-light" className="w-5 h-5" />
                </Link>
              </Button>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-4">
                {data.features?.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Icon icon="ph:check-circle-light" className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Visual */}
            <div className="relative w-full max-w-2xl mx-auto lg:ml-auto flex justify-center lg:justify-end items-center mt-12 lg:mt-0">
              {data.heroImage && (
                <img
                  src={urlFor(data.heroImage).url()}
                  alt="Automóvil asegurado digitalmente"
                  className="w-full max-w-[120%] lg:max-w-[140%] h-auto object-contain scale-110 lg:scale-[1.25] transform lg:translate-x-8"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Insurers Bar */}
      <section className="bg-slate-50 border-y border-slate-200 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-10">
            {data.insurersTitle}
          </p>
          <div className="flex overflow-x-auto pb-6 lg:pb-0 justify-start lg:justify-center items-center gap-12 md:gap-16 lg:gap-20 snap-x snap-mandatory px-4 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {data.insurers?.map((insurer: any) => (
              <img 
                key={insurer._key}
                src={urlFor(insurer.logo).url()} 
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
