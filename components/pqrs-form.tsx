"use client"

import { useState } from "react"
import { toast } from "sonner"

export function PQRSForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/pqrs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success("Solicitud enviada", { description: "Su PQRS ha sido radicada exitosamente. Recibirá confirmación en su correo." })
        ;(e.target as HTMLFormElement).reset()
      } else {
        const errorData = await response.json()
        toast.error("Error", { description: errorData.error || "Ocurrió un error al enviar la solicitud." })
      }
    } catch (error) {
      toast.error("Error", { description: "Hubo un problema de conexión. Inténtelo nuevamente." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="nombre" className="block text-[15px] font-bold text-slate-900 mb-2">Nombre completo</label>
          <input type="text" id="nombre" name="nombre" required className="w-full px-4 h-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px]" placeholder="Ej. Carlos Rodríguez Pérez" />
        </div>
        <div>
          <label htmlFor="cedula" className="block text-[15px] font-bold text-slate-900 mb-2">Número de cédula</label>
          <input type="number" id="cedula" name="cedula" required className="w-full px-4 h-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px]" placeholder="Ej. 1020304050" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="email" className="block text-[15px] font-bold text-slate-900 mb-2">Correo electrónico</label>
          <input type="email" id="email" name="email" required className="w-full px-4 h-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px]" placeholder="correo@ejemplo.com" />
        </div>
        <div>
          <label htmlFor="telefono" className="block text-[15px] font-bold text-slate-900 mb-2">Teléfono de contacto</label>
          <input type="tel" id="telefono" name="telefono" required className="w-full px-4 h-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px]" placeholder="310 000 0000" />
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="descripcion" className="block text-[15px] font-bold text-slate-900 mb-2">Descripción de la solicitud</label>
        <textarea id="descripcion" name="descripcion" required rows={5} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors text-slate-900 placeholder:text-slate-400 text-[15px] resize-y" placeholder="Describa su caso con el mayor detalle posible."></textarea>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-[#1e3450] hover:bg-[#162539] text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-sm text-[15px] tracking-wide disabled:opacity-70 disabled:cursor-not-allowed">
        {isSubmitting ? "ENVIANDO..." : "ENVIAR SOLICITUD"}
      </button>
    </form>
  )
}
