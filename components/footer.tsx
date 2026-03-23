import { Icon } from "@iconify/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 mb-16 items-center">
          
          {/* Bloque izquierdo — llamado a la acción de cierre */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              ¿Listo para asegurar tu carro <span className="text-primary">sin enredos?</span>
            </h2>
            
            <p className="text-slate-400 leading-relaxed text-lg font-medium max-w-md">
              Cotiza gratis en menos de 3 minutos y encuentra la mejor opción para ti.
            </p>

            <Button asChild size="lg" className="h-14 px-8 text-base font-bold text-white bg-primary hover:bg-primary/90 rounded-md shadow-md gap-2 mt-4 inline-flex">
              <Link href="/cotizar">
                Cotizar mi seguro
                <Icon icon="ph:arrow-right-light" className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Bloque derecho — redes sociales */}
          <div className="flex flex-col lg:items-end lg:text-right space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">Síguenos y aprende sobre seguros</h3>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <Icon icon="ph:instagram-logo-light" className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors hover:text-white font-bold"
                aria-label="TikTok"
              >
                <Icon icon="ph:tiktok-logo-light" className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <Icon icon="ph:facebook-logo-light" className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Split Line */}
        <div className="h-px w-full bg-slate-800 mb-8" />
        
        {/* Barra de cierre legal */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-4">
          
          <div className="text-sm font-medium text-slate-500 text-center lg:text-left">
            © {currentYear} Proyectar Seguros S.A.S. · NIT 830139875-7
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm font-medium text-slate-400">
            <Link href="/terminos-y-condiciones" className="hover:text-white transition-colors">
              Términos & Condiciones
            </Link>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
            <Link href="/politica-de-tratamiento-de-datos" className="hover:text-white transition-colors">
              Política de tratamiento de datos
            </Link>
            
            {/* K&T Signature - Required by rules */}
            <div className="hidden sm:block w-px h-5 bg-slate-700 mx-2" />
            
            <a 
              href="https://www.kytcode.lat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-row items-center gap-2 text-white hover:text-primary transition-all py-1.5 px-3 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700"
            >
              <span className="font-bold text-xs uppercase tracking-wider">Desarrollado por K&T</span>
              <Icon icon="ph:heart-fill" className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
