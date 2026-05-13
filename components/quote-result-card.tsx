"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"

type PollingResult = {
  aseguradora: string
  estado: string
  datos: {
    caracteristicas: {
      numero_cotizacion: string
      agente: string
      vehiculo: string
      tarifa_aplicada: string
      tipo_uso: string
      servicio: string
      amparo_paquete: string
      modalidad_pago: string
      periodo_gracia: string
    }
    desglose_financiero: {
      prima_neta: string
      gastos_expedicion: string
      iva: string
      subtotal: string
      primer_pago: string
      pago_subsecuente: string
      importe_total: string
    }
    amparos_base: Array<{
      cobertura: string
      valor_asegurado: string
      deducible: string
    }>
    amparos_accesorios: any[]
  }
}

interface QuoteResultCardProps {
  quoteResult: PollingResult
  onContinue: () => void
}

export function QuoteResultCard({ quoteResult, onContinue }: QuoteResultCardProps) {
  const [showModal, setShowModal] = useState(false)
  const { datos, aseguradora } = quoteResult
  const { caracteristicas, desglose_financiero, amparos_base } = datos

  return (
    <>
      {/* ──────────────────────────────────────────────
          SUMMARY CARD
      ────────────────────────────────────────────── */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
        {/* Gradient header badge */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Cotización Lista
            </span>
          </div>
        </div>

        {/* Main summary card */}
        <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 overflow-hidden">
          
          {/* Top gradient band */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#0B5A92] via-[#4EA7E1] to-[#0B5A92] bg-[length:200%_100%] animate-gradient" />

          <div className="p-6 space-y-5">
            {/* Aseguradora + No. cotización */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon icon="mdi:car-shield" className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 leading-tight">
                    {aseguradora}
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">
                    # {caracteristicas.numero_cotizacion}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Vehículo
                </p>
                <p className="text-sm font-bold text-slate-700 mt-0.5 max-w-[120px] text-right leading-tight">
                  {caracteristicas.vehiculo}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Price highlight */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Importe Total
                </p>
                <p className="text-4xl font-black text-primary leading-none">
                  {desglose_financiero.importe_total}
                </p>
                <div className="flex gap-3 mt-2">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Prima neta: <span className="text-slate-700">{desglose_financiero.prima_neta}</span>
                  </span>
                  <span className="text-slate-200">|</span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    IVA: <span className="text-slate-700">{desglose_financiero.iva}</span>
                  </span>
                </div>
              </div>

              {/* Key badges */}
              <div className="flex flex-col gap-2 items-end">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                  <Icon icon="ph:car-profile-fill" className="w-3.5 h-3.5" />
                  {caracteristicas.tipo_uso}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                  <Icon icon="ph:package-fill" className="w-3.5 h-3.5" />
                  {caracteristicas.amparo_paquete}
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                  <Icon icon="ph:credit-card-fill" className="w-3.5 h-3.5" />
                  Pago {caracteristicas.modalidad_pago}
                </span>
              </div>
            </div>

            {/* Quick coverages preview (first 3) */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Icon icon="ph:shield-star-bold" className="w-3.5 h-3.5 text-primary" />
                Principales amparos incluidos
              </p>
              <div className="space-y-2">
                {amparos_base.slice(0, 3).map((amparo, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon icon="ph:check-bold" className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">
                        {amparo.cobertura}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 shrink-0 text-right">
                      {amparo.valor_asegurado}
                    </span>
                  </div>
                ))}
              </div>
              {amparos_base.length > 3 && (
                <p className="text-[10px] text-slate-400 font-semibold mt-2 ml-6">
                  +{amparos_base.length - 3} amparos más incluidos
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 h-12 rounded-2xl border-2 border-primary/20 text-primary font-bold text-sm hover:bg-primary/5 hover:border-primary/40 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
              >
                <Icon icon="ph:magnifying-glass-plus-bold" className="w-4 h-4" />
                Ver más detalles
              </button>
              <Button
                onClick={onContinue}
                className="flex-1 h-12 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Icon icon="ph:check-circle-fill" className="w-4 h-4 mr-1.5" />
                Continuar y Emitir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          FULL DETAIL MODAL
      ────────────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" />

          {/* Modal panel */}
          <div className="relative w-full sm:max-w-2xl bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88dvh] animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300">
            
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon icon="ph:shield-check-fill" className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">
                    Detalle de Cotización
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    {aseguradora} · # {caracteristicas.numero_cotizacion}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors active:scale-90"
                aria-label="Cerrar"
              >
                <Icon icon="ph:x-bold" className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Modal scrollable body */}
            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

              {/* ── Vehículo info ── */}
              <section>
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Icon icon="ph:car-profile-fill" className="w-3.5 h-3.5 text-primary" />
                  Información del Vehículo
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Vehículo", value: caracteristicas.vehiculo },
                    { label: "Tipo de Uso", value: caracteristicas.tipo_uso },
                    { label: "Servicio", value: caracteristicas.servicio },
                    { label: "Tarifa", value: caracteristicas.tarifa_aplicada },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Póliza info ── */}
              <section>
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Icon icon="ph:file-text-fill" className="w-3.5 h-3.5 text-primary" />
                  Características de la Póliza
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Amparo / Paquete", value: caracteristicas.amparo_paquete },
                    { label: "Modalidad de Pago", value: caracteristicas.modalidad_pago },
                    { label: "Período de Gracia", value: caracteristicas.periodo_gracia },
                    { label: "Agente", value: caracteristicas.agente },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Desglose Financiero ── */}
              <section>
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Icon icon="ph:money-wavy-fill" className="w-3.5 h-3.5 text-primary" />
                  Desglose Financiero
                </h4>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  {[
                    { label: "Prima Neta", value: desglose_financiero.prima_neta, accent: false },
                    { label: "Gastos de Expedición", value: desglose_financiero.gastos_expedicion, accent: false },
                    { label: "IVA", value: desglose_financiero.iva, accent: false },
                    { label: "Subtotal", value: desglose_financiero.subtotal, accent: false },
                    { label: "Primer Pago", value: desglose_financiero.primer_pago, accent: false },
                    { label: "Pagos Subsecuentes", value: desglose_financiero.pago_subsecuente, accent: false },
                  ].map(({ label, value }, idx, arr) => (
                    <div
                      key={label}
                      className={`flex items-center justify-between px-5 py-3.5 ${idx < arr.length - 1 ? "border-b border-slate-100" : ""}`}
                    >
                      <span className="text-sm font-semibold text-slate-600">{label}</span>
                      <span className="text-sm font-bold text-slate-800">{value}</span>
                    </div>
                  ))}
                  {/* Total highlight row */}
                  <div className="flex items-center justify-between px-5 py-4 bg-primary/5 border-t-2 border-primary/10">
                    <span className="text-sm font-extrabold text-primary uppercase tracking-wide">
                      Importe Total
                    </span>
                    <span className="text-xl font-black text-primary">
                      {desglose_financiero.importe_total}
                    </span>
                  </div>
                </div>
              </section>

              {/* ── Amparos Base ── */}
              <section>
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Icon icon="ph:shield-star-bold" className="w-3.5 h-3.5 text-primary" />
                  Amparos Base
                </h4>
                <div className="space-y-2">
                  {amparos_base.map((amparo, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-3 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon icon="ph:check-bold" className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 leading-tight truncate">
                          {amparo.cobertura}
                        </p>
                        <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                          Deducible: {amparo.deducible}
                        </p>
                      </div>
                      <p className="text-sm font-black text-slate-700 shrink-0 text-right">
                        {amparo.valor_asegurado}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 h-12 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
              >
                Cerrar
              </button>
              <Button
                onClick={() => { setShowModal(false); onContinue() }}
                className="flex-1 h-12 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Icon icon="ph:check-circle-fill" className="w-4 h-4 mr-1.5" />
                Continuar y Emitir
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
