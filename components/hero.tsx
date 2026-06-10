"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

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
      <section id="hero" className="relative pt-12 lg:pt-20 pb-12 lg:pb-16 overflow-hidden">
        {data.backgroundVideo?.asset?.url && (
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={data.backgroundVideo.asset.url} type="video/mp4" />
            </video>
            <div className="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-white/95 via-white/70 to-transparent"></div>
          </div>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

            {/* Right Content - Empty space to keep text on left */}
            <div className="hidden lg:block relative w-full max-w-2xl mx-auto lg:ml-auto h-full">
            </div>
          </div>
        </div>
      </section>

      {/* Insurers Bar */}
      <section className="bg-slate-50 border-y border-slate-200 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-12 sm:px-16 lg:px-20 relative">
          <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-10">
            {data.insurersTitle}
          </p>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="items-center">
              {data.insurers?.map((insurer: any) => (
                <CarouselItem key={insurer._key} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <div className="flex items-center justify-center p-2 h-full">
                    <img 
                      src={urlFor(insurer.logo).url()} 
                      alt={`Logo ${insurer.name}`} 
                      className="h-20 md:h-24 lg:h-28 w-auto object-contain transition-all duration-300 transform hover:scale-110"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>
    </>
  )
}
