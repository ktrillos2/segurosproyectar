"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type PollingResult = {
  aseguradora: string
  status: "ok" | "error" | "sin_cotizacion"
  estado: string
  mensaje: string | null
  error: any | null
  plan_recomendado: any | null
  vehiculo: any
  asegurado: any
  amparos: Array<{
    nombre: string
    valor: string
    deducible: string | null
  }>
  planes_disponibles: Array<{
    nombre: string
    id_producto: string | null
    prima_neta: number | { valor: number; texto: string }
    iva: number | { valor: number; texto: string }
    gastos_expedicion: number | { valor: number; texto: string } | null
    total: number | { valor: number; texto: string }
  }>
  raw: any
}

interface QuoteResultCardProps {
  quoteResult: PollingResult
  onContinue: (insurerName: string) => void
  logosMap?: Record<string, string>
  userInfo?: any
}

const formatMoney = (val: any) => {
  if (typeof val === 'number') {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  }
  if (val?.texto) return val.texto;
  if (val?.valor) return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val.valor);
  return "$0";
}

const getInsurerLogo = (name: string, logosMap?: Record<string, string>) => {
  const n = name.toLowerCase()
  if (logosMap) {
    if (n.includes("equidad") && logosMap["equidad seguros"]) return logosMap["equidad seguros"];
    if ((n.includes("axa") || n.includes("colpatria")) && logosMap["axa colpatria"]) return logosMap["axa colpatria"];
    if (n.includes("estado") && logosMap["seguros del estado"]) return logosMap["seguros del estado"];
    if (n.includes("mundial") && logosMap["seguros mundial"]) return logosMap["seguros mundial"];
    if ((n.includes("qualitas") || n.includes("quálitas")) && logosMap["quálitas"]) return logosMap["quálitas"];
    if (n.includes("zurich") && logosMap["zurich"]) return logosMap["zurich"];
  }
  
  if (n.includes("equidad")) return "/logos/equidad.png"
  if (n.includes("axa") || n.includes("colpatria")) return "/logos/axa-colpatria.png"
  if (n.includes("estado")) return "/logos/seguros-del-estado.png"
  if (n.includes("mundial")) return "/logos/seguros-mudial.png"
  if (n.includes("qualitas") || n.includes("quálitas")) return "/logos/qualitas.svg"
  if (n.includes("zurich")) return "/logos/zurich.png"
  return "/logos/equidad.png"
}

export function QuoteResultCard({ quoteResult, onContinue, logosMap, userInfo }: QuoteResultCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showAdvisorMessage, setShowAdvisorMessage] = useState(false)
  const [isRequestingAdvisor, setIsRequestingAdvisor] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAdvisorRequest = async () => {
    setIsRequestingAdvisor(true);
    try {
      const res = await fetch('/api/advisor-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInfo, quoteResult })
      });
      if (res.ok) {
        setShowAdvisorMessage(true);
      } else {
        toast.error("Error al enviar la solicitud");
      }
    } catch (e) {
      toast.error("Error al enviar la solicitud");
    } finally {
      setIsRequestingAdvisor(false);
    }
  }
  
  if (!quoteResult) return null

  const { aseguradora, status, estado, mensaje, error, plan_recomendado, vehiculo, amparos, planes_disponibles } = quoteResult

  const getAmparoWeight = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("responsabilidad civil")) return 1;
    if (n.includes("pérdida total") || n.includes("perdida total")) return 2;
    if (n.includes("pérdida parcial") || n.includes("perdida parcial")) return 3;
    if (n.includes("hurto")) return 4;
    if (n.includes("terremoto")) return 5;
    if (n.includes("vehículo sustituto") || n.includes("vehiculo sustituto") || n.includes("reemplazo")) return 6;
    if (n.includes("asistencia")) return 7;
    return 99;
  };

  const sortedAmparos = [...(amparos || [])].sort((a, b) => {
    return getAmparoWeight(a.nombre || "") - getAmparoWeight(b.nombre || "");
  });

  if (status !== "ok") {
    return null
  }

  // ──────────────────────────────────────────────
  // SUCCESS QUOTE CARD
  // ──────────────────────────────────────────────
  const vehicleTitle = vehiculo?.descripcion || `${vehiculo?.marca || ""} ${vehiculo?.linea || ""}`
  const vehicleYear = vehiculo?.modelo || ""
  const totalFormat = formatMoney(plan_recomendado?.total)
  
  return (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
        {/* Header badge */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
              {planes_disponibles && planes_disponibles.length > 1 ? "Múltiples opciones" : "Cotización Lista"}
            </span>
          </div>
          {showAdvisorMessage && (
            <div className="animate-in fade-in slide-in-from-right-4 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full">
              <p className="text-primary text-[11px] font-bold">
                ¡Solicitud enviada! Un asesor te contactará pronto.
              </p>
            </div>
          )}
        </div>

        {/* Main card */}
        <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#0B5A92] via-[#4EA7E1] to-[#0B5A92] bg-[length:200%_100%] animate-gradient" />

          <div className="p-6 space-y-5">
            {/* Aseguradora + Vehículo details */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                  <img src={getInsurerLogo(aseguradora, logosMap)} alt={aseguradora} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    {aseguradora}
                  </h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                    Plan Recomendado: <span className="text-slate-600">{plan_recomendado?.nombre || "Estandar"}</span>
                  </p>
                </div>
              </div>

              <div className="text-left md:text-right md:border-l md:border-slate-100 md:pl-6">
                <p className="text-lg font-black text-slate-900 tracking-tight leading-none uppercase">
                  {vehicleTitle} {vehicleYear && `, ${vehicleYear}`}
                </p>
                {vehiculo?.placa && vehiculo.placa !== "N/A" && (
                  <p className="text-[11px] font-bold text-slate-500 mt-2 flex items-center md:justify-end gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/30" />
                    Placa: {vehiculo.placa}
                  </p>
                )}
                {vehiculo?.codigo_fasecolda && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-600 uppercase">
                    <Icon icon="ph:barcode-bold" className="w-3.5 h-3.5 text-primary" />
                    FASECOLDA: {vehiculo.codigo_fasecolda}
                  </div>
                )}
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Price highlight */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Importe Total Anual
                </p>
                <p className="text-4xl font-black text-primary leading-none">
                  {totalFormat}
                </p>
                <div className="flex gap-3 mt-2">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Prima neta: <span className="text-slate-700">{formatMoney(plan_recomendado?.prima_neta)}</span>
                  </span>
                  <span className="text-slate-200">|</span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    IVA: <span className="text-slate-700">{formatMoney(plan_recomendado?.iva)}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                {plan_recomendado?.valor_asegurado && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                    <Icon icon="ph:shield-check-fill" className="w-3.5 h-3.5" />
                    Asegurado: {formatMoney(plan_recomendado.valor_asegurado)}
                  </span>
                )}
              </div>
            </div>

            {/* Quick coverages preview */}
            {sortedAmparos && sortedAmparos.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Icon icon="ph:shield-star-bold" className="w-3.5 h-3.5 text-primary" />
                  Principales amparos incluidos
                </p>
                <div className="space-y-2">
                  {sortedAmparos.slice(0, 3).map((amparo, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon icon="ph:check-bold" className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 truncate max-w-[200px]">
                          {amparo.nombre}
                        </span>
                      </div>
                      <div className="flex flex-col items-end shrink-0 text-right gap-1.5 pt-0.5">
                        <span className="inline-flex items-center text-[9px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md uppercase tracking-wide">
                          {amparo.valor}
                        </span>
                        {amparo.deducible && amparo.deducible !== "0" && amparo.deducible !== "0%" && !String(amparo.valor || "").toLowerCase().includes(String(amparo.deducible).toLowerCase()) && (
                          <span className="inline-flex text-[9px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-wide">
                            Ded: {amparo.deducible}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-1">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full h-12 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Icon icon="ph:magnifying-glass-plus-bold" className="w-4 h-4" />
                  Ver más detalles
                </button>
                {/* 
                <Button
                  onClick={() => onContinue(aseguradora)}
                  className="flex-1 h-12 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Icon icon="ph:check-circle-fill" className="w-4 h-4 mr-1.5" />
                  Continuar y Emitir
                </Button>
                */}
              </div>

              {!showAdvisorMessage ? (
                <button
                  onClick={handleAdvisorRequest}
                  disabled={isRequestingAdvisor}
                  className="w-full h-12 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 active:scale-95 disabled:opacity-50"
                >
                  <Icon icon="ph:headset-bold" className="w-5 h-5 text-emerald-400" />
                  {isRequestingAdvisor ? "Enviando solicitud..." : "Hablar con un asesor experto"}
                </button>
              ) : (
                <div className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 animate-in zoom-in-95">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <Icon icon="ph:user-focus-fill" className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-emerald-800 leading-tight">Solicitud de contacto recibida</p>
                    <p className="text-xs font-bold text-emerald-600 mt-0.5">
                      En unos minutos uno de nuestros asesores se comunicará contigo.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          FULL DETAIL MODAL
      ────────────────────────────────────────────── */}
      {mounted && showModal && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" />

          <div className="relative w-full sm:max-w-2xl bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88dvh] animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300">
            
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100 p-1">
                  <img src={getInsurerLogo(aseguradora, logosMap)} alt={aseguradora} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">
                    Detalle de Cotización
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    {aseguradora} · {plan_recomendado?.nombre || "Cotización"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors active:scale-90"
              >
                <Icon icon="ph:x-bold" className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

              {/* Planes disponibles (si hay varios) */}
              {planes_disponibles && planes_disponibles.length > 1 && (
                <section>
                  <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Icon icon="ph:stack-fill" className="w-3.5 h-3.5 text-primary" />
                    Planes Disponibles
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {planes_disponibles.map((p, idx) => (
                      <div key={idx} className={`p-4 rounded-2xl border ${p.nombre === plan_recomendado?.nombre ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white'}`}>
                        <p className="text-sm font-bold text-slate-800">{p.nombre}</p>
                        <p className="text-lg font-black text-primary mt-1">{formatMoney(p.total)}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Desglose Financiero */}
              <section>
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Icon icon="ph:money-wavy-fill" className="w-3.5 h-3.5 text-primary" />
                  Desglose Financiero ({plan_recomendado?.nombre})
                </h4>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                    <span className="text-sm font-semibold text-slate-600">Prima Neta</span>
                    <span className="text-sm font-bold text-slate-800">{formatMoney(plan_recomendado?.prima_neta)}</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                    <span className="text-sm font-semibold text-slate-600">IVA</span>
                    <span className="text-sm font-bold text-slate-800">{formatMoney(plan_recomendado?.iva)}</span>
                  </div>
                  {Boolean(plan_recomendado?.gastos_expedicion) && (
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                      <span className="text-sm font-semibold text-slate-600">Gastos Expedición</span>
                      <span className="text-sm font-bold text-slate-800">{formatMoney(plan_recomendado?.gastos_expedicion)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between px-5 py-4 bg-primary/5 border-t-2 border-primary/10">
                    <span className="text-sm font-extrabold text-primary uppercase tracking-wide">
                      Importe Total
                    </span>
                    <span className="text-xl font-black text-primary">
                      {totalFormat}
                    </span>
                  </div>
                </div>
              </section>

              {/* Amparos */}
              <section>
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Icon icon="ph:shield-star-bold" className="w-3.5 h-3.5 text-primary" />
                  Coberturas y Amparos
                </h4>
                <div className="space-y-2">
                  {sortedAmparos.map((amparo, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-3 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon icon="ph:check-bold" className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 leading-tight truncate">
                          {amparo.nombre}
                        </p>
                      </div>
                      <div className="flex flex-col items-end shrink-0 text-right gap-1.5">
                        <div className="inline-flex items-center text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md uppercase tracking-wide text-right">
                          {amparo.valor}
                        </div>
                        {amparo.deducible && amparo.deducible !== "0" && amparo.deducible !== "0%" && !String(amparo.valor || "").toLowerCase().includes(String(amparo.deducible).toLowerCase()) && (
                          <div className="inline-flex items-center text-[10px] font-extrabold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md uppercase tracking-wide text-right">
                            Ded: {amparo.deducible}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 h-12 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
              >
                Cerrar
              </button>
              <Button
                onClick={() => { setShowModal(false); onContinue(aseguradora) }}
                className="flex-1 h-12 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Icon icon="ph:check-circle-fill" className="w-4 h-4 mr-1.5" />
                Continuar y Emitir
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

