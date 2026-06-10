"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icon } from "@iconify/react"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { QuoteResultCard } from "@/components/quote-result-card"
import { generateQuoteComparisonPDF } from "@/utils/generate-pdf"
import { client } from "@/sanity/lib/client"

const BOT_AVATAR = "/images/sofia.jpeg"

type Message = {
  role: "bot" | "user" | "system"
  content: string
}

type UserInfo = {
  cliente?: {
    tipo_documento?: string
    numero_documento?: string
    nombre?: string
    apellidos?: string
    fecha_nacimiento?: string
    genero?: string
    correo?: string
    celular?: string
    direccion?: string
  }
  vehiculo?: {
    placa?: string
    ciudad?: string
    departamento?: string
    modelo?: string
    precio?: string
    marca?: string
    linea?: string
    descripcion?: string
    color?: string
    servicio?: string
    cero_km?: boolean
    valor_accesorios?: string
    oneroso?: boolean
    beneficiario?: boolean
  }
  campo_actual?: string
  completado?: boolean
  sugerencias?: string[]
}

type InsuranceQuote = {
  id: string
  name: string
  price: number
  logo: string
  color: string
  description: string
  plans?: any[]
}

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

const QUOTES: InsuranceQuote[] = [
  { 
    id: "axa", 
    name: "AXA Colpatria", 
    price: 1850000, 
    logo: "logos:axa", 
    color: "blue", 
    description: "Cobertura total con asistencia premium 24/7 y red de talleres preferencial." 
  },
  { 
    id: "mundial", 
    name: "Mundial Seguros", 
    price: 1680000, 
    logo: "mdi:shield-check", 
    color: "blue", 
    description: "Excelente relación costo-beneficio. Líder en cumplimiento y rapidez." 
  },
  { 
    id: "qualitas", 
    name: "Quálitas", 
    price: 1550000, 
    logo: "mdi:car-shield", 
    color: "red", 
    description: "Especialistas en autos con la mejor red de ajuste y asistencia en vía." 
  },
  { 
    id: "equidad", 
    name: "La Equidad", 
    price: 1420000, 
    logo: "mdi:hands-pray", 
    color: "green", 
    description: "Opción solidaria con planes flexibles: Esencial, Estándar y Plus.",
    plans: [
      { name: "Plan Esencial", price: 1420000 },
      { name: "Plan Estándar", price: 1650000 },
      { name: "Plan Plus", price: 1980000 }
    ]
  },
  { 
    id: "zurich", 
    name: "Zurich", 
    price: 1950000, 
    logo: "logos:zurich", 
    color: "blue", 
    description: "Seguro de clase mundial con coberturas internacionales y atención VIP." 
  }
]

const SAMPLE_DATA = {
  cliente: {
    tipo_documento: "CC",
    numero_documento: "1090384736",
    nombre: "Keyner Steban",
    apellidos: "Trillos Useche",
    fecha_nacimiento: "03/08/1997",
    genero: "Masculino",
    correo: "contacto@ktcode.com",
    celular: "3103035289",
    direccion: "Cucuta, Norte de Santander"
  },
  vehiculo: {
    placa: "DDB440",
    ciudad: "BOGOTA",
    departamento: "BOGOTA",
    modelo: "2024",
    precio: "50000000",
    marca: "MAZDA",
    linea: "3",
    descripcion: "MAZDA 3",
    color: "ROJO",
    servicio: "Particular",
    cero_km: false,
    valor_accesorios: "0",
    oneroso: false,
    beneficiario: false
  }
}

type AppState = "chatting" | "verifying_sms" | "quoting" | "selecting" | "sarlaft" | "issuing" | "finished" | "completed_quote"

const normalizeQuoteData = (rawItem: any) => {
  const isError = rawItem.status === "error" || !rawItem.aseguradora || rawItem.cotizable === false || String(rawItem.estado).toLowerCase() === "error";
  if (isError) {
    return {
      aseguradora: rawItem.aseguradora || "Desconocida",
      status: "error",
      estado: rawItem.error || "Error",
      mensaje: null,
      error: rawItem.error,
      plan_recomendado: null,
      vehiculo: null,
      asegurado: null,
      amparos: [],
      planes_disponibles: [],
      raw: rawItem
    };
  }

  const parseAmount = (val: any) => {
    if (!val) return 0;
    if (typeof val === 'number') return val;
    let strVal = String(val).trim();
    // Eliminar centavos (ej: ,22 o .50 al final de la cadena)
    strVal = strVal.replace(/[,\.]\d{1,2}$/, "");
    const clean = strVal.replace(/[^0-9]/g, "");
    return parseInt(clean) || 0;
  }

  const result: any = {
    aseguradora: rawItem.aseguradora,
    status: "ok",
    estado: rawItem.estado || "OK",
    mensaje: null,
    error: null,
    raw: rawItem,
    vehiculo: rawItem.vehiculo || { placa: "N/A" },
    asegurado: rawItem.asegurado || null,
    amparos: [],
    planes_disponibles: [],
    plan_recomendado: null
  };

  const nameL = String(rawItem.aseguradora).toLowerCase();

  // AXA Mapping
  if (nameL.includes("axa")) {
    if (rawItem.producto?.plan_seleccionado) {
      const p = rawItem.producto.plan_seleccionado;
      result.plan_recomendado = {
        nombre: rawItem.producto.nombre || "ESENCIAL",
        prima_neta: parseAmount(p.prima_neta),
        iva: parseAmount(p.iva),
        gastos_expedicion: parseAmount(p.gastos_expedicion),
        total: parseAmount(p.total),
        valor_asegurado: parseAmount(rawItem.valores?.valor_asegurado)
      };
    }
    if (Array.isArray(rawItem.cotizaciones_disponibles)) {
      result.planes_disponibles = rawItem.cotizaciones_disponibles.map((p: any) => ({
        nombre: p.producto || "Opción",
        prima_neta: parseAmount(p.prima_neta),
        iva: parseAmount(p.iva),
        gastos_expedicion: parseAmount(p.gastos_expedicion),
        total: parseAmount(p.total)
      }));
    }
    if (Array.isArray(rawItem.amparos)) {
      result.amparos = rawItem.amparos.map((amp: any) => ({
        nombre: typeof amp === 'string' ? amp : amp.nombre,
        valor: "Amparada",
        deducible: null
      }));
    }
  }
  // Equidad Mapping
  else if (nameL.includes("equidad")) {
    if (rawItem.datos?.planes && rawItem.datos.planes.length > 0) {
      result.planes_disponibles = rawItem.datos.planes.map((p: any) => {
        const valTotal = parseAmount(p.prima_anual || p.prima_anual_con_iva || p.prima_neta || p.total);
        return {
          nombre: p.nombre_plan || "Plan",
          prima_neta: valTotal * 0.8,
          iva: valTotal * 0.19,
          gastos_expedicion: 0,
          total: valTotal,
        amparos: [
          { nombre: "Responsabilidad Civil Extracontractual", valor: p.limite_rce, deducible: "0" },
          { nombre: "Pérdida Total Daños", valor: "Amparada", deducible: p.deducible_perdidas_totales },
          { nombre: "Pérdida Parcial Daños", valor: "Amparada", deducible: p.deducible_perdidas_parciales },
          { nombre: "Pérdida Total Hurto", valor: "Amparada", deducible: p.deducible_perdidas_totales },
          { nombre: "Pérdida Parcial Hurto", valor: "Amparada", deducible: p.deducible_perdidas_parciales },
          { nombre: "Vehículo de reemplazo", valor: p.limite_vehiculo_sustituto, deducible: "0" }
        ]
      };
    });
    result.plan_recomendado = result.planes_disponibles[0];
      result.amparos = result.planes_disponibles[0].amparos;
    } else {
      result.status = "error";
    }
  }
  // Quálitas Mapping
  else if (nameL.includes("quálitas") || nameL.includes("qualitas")) {
    if (rawItem.datos?.planes && rawItem.datos.planes.length > 0) {
      result.planes_disponibles = rawItem.datos.planes.map((p: any) => {
        const valTotal = parseAmount(p.prima_anual_con_iva || p.prima_anual || p.prima_neta || p.total || rawItem.datos?.desglose_financiero?.importe_total || rawItem.datos?.desglose_financiero?.subtotal);
        return {
          nombre: p.nombre || "Opción",
          prima_neta: valTotal * 0.8,
          iva: valTotal * 0.19,
          gastos_expedicion: 0,
          total: valTotal
        };
      });
      
      // Intentar marcar el seleccionado
      const planSeleccionado = rawItem.datos.planes.find((p: any) => p.seleccionado);
      if (planSeleccionado) {
        result.plan_recomendado = result.planes_disponibles.find((p: any) => p.nombre === planSeleccionado.nombre);
      } else {
        result.plan_recomendado = result.planes_disponibles[0];
      }
    } else {
      const fin = rawItem.datos?.desglose_financiero;
      if (fin) {
        result.plan_recomendado = {
          nombre: rawItem.datos?.caracteristicas?.amparo_paquete || "AMPLIA",
          prima_neta: parseAmount(fin.prima_neta),
          iva: parseAmount(fin.iva),
          gastos_expedicion: parseAmount(fin.gastos_expedicion),
          total: parseAmount(fin.importe_total || fin.subtotal)
        };
        result.planes_disponibles = [result.plan_recomendado];
      } else {
        result.status = "error";
      }
    }

    const baseAmparos = Array.isArray(rawItem.datos?.amparos_base) ? rawItem.datos.amparos_base : [];
    const extraAmparos = Array.isArray(rawItem.datos?.amparos_accesorios) ? rawItem.datos.amparos_accesorios : [];
    
    if (baseAmparos.length > 0 || extraAmparos.length > 0) {
      result.amparos = [...baseAmparos, ...extraAmparos].map((amp: any) => {
        let val = amp.valor_asegurado;
        // Quálitas a veces retorna solo "7", "15" o "30" para gastos de transporte
        if (amp.cobertura && amp.cobertura.toLowerCase().includes("transporte") && /^\d+$/.test(val)) {
          val = `${val} Días`;
        }
        return {
          nombre: amp.cobertura,
          valor: val,
          deducible: amp.deducible
        };
      });
    }
  }
  // Zurich Mapping
  else if (nameL.includes("zurich")) {
    if (rawItem.planes && rawItem.planes.length > 0) {
      result.planes_disponibles = rawItem.planes.map((p: any) => {
        const valTotal = parseAmount(p.prima_anual_con_iva || p.prima_anual || p.prima_neta || p.total);
        return {
          nombre: p.nombre || "Plan",
          prima_neta: valTotal * 0.8,
          iva: valTotal * 0.19,
          gastos_expedicion: 0,
          total: valTotal,
          amparos: Array.isArray(p.amparos) ? p.amparos.map((amp: any) => ({
            nombre: amp.cobertura,
            valor: amp.limite,
            deducible: amp.deducible
          })) : []
        };
      });
      
      const planSeleccionado = rawItem.planes.find((p: any) => p.seleccionado);
      if (planSeleccionado) {
        result.plan_recomendado = result.planes_disponibles.find((p: any) => p.nombre === planSeleccionado.nombre);
      } else {
        result.plan_recomendado = result.planes_disponibles[0];
      }
      result.amparos = result.plan_recomendado.amparos;
    } else {
      result.status = "error";
    }
  }
  // Estado Mapping
  else if (nameL.includes("estado")) {
    if (rawItem.cotizaciones && rawItem.cotizaciones.length > 0) {
      result.planes_disponibles = rawItem.cotizaciones.map((p: any) => {
        return {
          nombre: p.nombre || "Plan",
          prima_neta: parseAmount(p.prima),
          iva: parseAmount(p.impuesto),
          gastos_expedicion: 0,
          total: parseAmount(p.prima_total || p.total)
        };
      });
      
      if (rawItem.cotizacion_seleccionada) {
        result.plan_recomendado = {
          nombre: rawItem.cotizacion_seleccionada.nombre || "Plan",
          prima_neta: parseAmount(rawItem.cotizacion_seleccionada.prima),
          iva: parseAmount(rawItem.cotizacion_seleccionada.impuesto),
          gastos_expedicion: 0,
          total: parseAmount(rawItem.cotizacion_seleccionada.prima_total || rawItem.cotizacion_seleccionada.total)
        };
      } else {
        result.plan_recomendado = result.planes_disponibles[0];
      }
      
      const sourceAmparos = rawItem.cotizacion_seleccionada?.coberturas_completas || rawItem.cotizaciones[0]?.coberturas_completas || [];
      result.amparos = sourceAmparos.map((amp: any) => ({
        nombre: amp.nombre,
        valor: amp.valor_asegurado,
        deducible: amp.deducible
      }));
    } else {
      result.status = "error";
    }
  }
  // Generic Fallback
  else {
    if (rawItem.plan_recomendado || (rawItem.planes_disponibles && rawItem.planes_disponibles.length > 0)) {
      result.plan_recomendado = rawItem.plan_recomendado || rawItem.planes_disponibles[0];
      result.planes_disponibles = rawItem.planes_disponibles || [result.plan_recomendado];
      result.amparos = rawItem.amparos || [];
    } else {
      result.status = "error";
    }
  }

  if (result.status === "ok") {
    // Filtrar opciones que vengan en 0
    if (result.planes_disponibles && result.planes_disponibles.length > 0) {
      result.planes_disponibles = result.planes_disponibles.filter((p: any) => p.total > 0);
    }
    
    const hasValidRecomendado = result.plan_recomendado && result.plan_recomendado.total > 0;
    const hasValidDisponibles = result.planes_disponibles && result.planes_disponibles.length > 0;
    
    if (!hasValidRecomendado && !hasValidDisponibles) {
      result.status = "error";
    } else if (!hasValidRecomendado && hasValidDisponibles) {
      result.plan_recomendado = result.planes_disponibles[0];
    }
  }

  return result;
}

export default function CotizarPage() {
  const [isAgreed, setIsAgreed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [dateDay, setDateDay] = useState("")
  const [dateMonth, setDateMonth] = useState("")
  const [dateYear, setDateYear] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({})
  const [suggestions, setSuggestions] = useState<string[]>(["Juan", "ABC123", "Bogotá"])
  const [appState, setAppState] = useState<AppState>("chatting")
  const [selectedQuote, setSelectedQuote] = useState<InsuranceQuote | null>(null)
  const [sarlaftData, setSarlaftData] = useState({ ocupacion: "", fondos: "Salario" })
  const [quoteResults, setQuoteResults] = useState<PollingResult[]>([])
  const [logosMap, setLogosMap] = useState<Record<string, string>>({})
  const [pollingTaskId, setPollingTaskId] = useState<string | null>(null)
  const [otpCode, setOtpCode] = useState("")
  const [isSendingSms, setIsSendingSms] = useState(false)
  const [smsError, setSmsError] = useState("")
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [tempPhone, setTempPhone] = useState("")
  // Snapshot of complete userInfo received when completado:true — avoids stale closure in async flow
  const [latestUserInfo, setLatestUserInfo] = useState<UserInfo | null>(null)

  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initiate chat if empty
    if (messages.length === 0 && !isTyping) {
      initChat()
    }
  }, [])

  const initChat = async () => {
    setIsTyping(true)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [] })
      })
      if (!response.ok) throw new Error("Error iniciando chat")
      
      const data = await response.json()
      processAIData(data.content)
      setMessages([{ role: "bot", content: data.content }])
    } catch (error) {
      console.error(error)
      setMessages([{ role: "bot", content: "¡Hola! Soy Sofía de Proyectar Seguros 👋 ¿Me dices tu nombre completo para empezar?" }])
    } finally {
      setIsTyping(false)
    }
  }

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, appState])

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const logos = await client.fetch(`*[_type == "insurerLogo"] { name, "url": logo.asset->url }`)
        const map: Record<string, string> = {}
        logos.forEach((l: any) => {
          map[l.name.toLowerCase()] = l.url
        })
        setLogosMap(map)
      } catch (e) {
        console.error("Error fetching logos", e)
      }
    }
    fetchLogos()
  }, [])

  const processAIData = (content: string) => {
    const dataMatch = content.match(/###DATA###([\s\S]*?)###ENDDATA###/)
    if (dataMatch) {
      const cleanContent = content.replace(/###DATA###[\s\S]*?###ENDDATA###/, "").trim()
      try {
        const extractedData = JSON.parse(dataMatch[1])
        // Merge and obtain the up-to-date snapshot synchronously
        let mergedInfo: UserInfo = {}
        setUserInfo(prev => {
          mergedInfo = {
            ...prev,
            ...extractedData,
            cliente: { ...(prev.cliente || {}), ...(extractedData.cliente || {}) },
            vehiculo: { ...(prev.vehiculo || {}), ...(extractedData.vehiculo || {}) }
          }
          return mergedInfo
        })

        if (extractedData.sugerencias && Array.isArray(extractedData.sugerencias)) {
          setSuggestions(extractedData.sugerencias)
        }

        if (extractedData.completado) {
          // Pass the merged snapshot so requestSmsVerification doesn't rely on stale state
          setTimeout(() => requestSmsVerification(
            extractedData.cliente?.celular || mergedInfo.cliente?.celular,
            mergedInfo
          ), 2000)
        }
      } catch (e) {
        console.error("Error parseando datos de la IA:", e)
      }
      return cleanContent
    }

    // Hide the block while it's streaming (if ###DATA### has started but ###ENDDATA### is missing)
    let processedContent = content;
    if (processedContent.includes("###DATA###")) {
      processedContent = processedContent.split("###DATA###")[0].trim()
    }

    // Failsafe: Remove "Sugerencias: [...]" if the AI accidentally prints it in visible text
    processedContent = processedContent.replace(/Sugerencias:\s*\[.*?\]/g, "").trim()

    return processedContent
  }

  const requestSmsVerification = async (phoneToUse?: string, infoSnapshot?: UserInfo) => {
    const phone = phoneToUse || userInfo.cliente?.celular;
    if (!phone) {
      toast.error("No se detectó un número de celular válido.");
      setAppState("chatting");
      return;
    }

    setAppState("verifying_sms");
    setIsSendingSms(true);
    setSmsError("");

    try {
      const res = await fetch("/api/verify/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error enviando SMS");
      }

      // Persist the phone in state if it came externally
      if (phoneToUse) {
        setUserInfo(prev => ({ ...prev, cliente: { ...prev.cliente, celular: phoneToUse } }));
      }
      // Keep the fresh snapshot so verifySmsAndQuote can use it later
      if (infoSnapshot) {
        setLatestUserInfo(infoSnapshot);
      }
      toast.success("Código enviado por SMS");
      setIsEditingPhone(false);
    } catch (err: any) {
      setSmsError(err.message);
      toast.error(err.message);
    } finally {
      setIsSendingSms(false);
    }
  }

  const verifySmsAndQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setSmsError("Ingresa el código de 6 dígitos");
      return;
    }

    setIsSendingSms(true);
    setSmsError("");

    try {
      const res = await fetch("/api/verify/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: userInfo.cliente?.celular, code: otpCode })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Código incorrecto");
      }

      toast.success("Verificación exitosa");
      // Use latestUserInfo snapshot to avoid stale closure
      startQuotingFlow(latestUserInfo || userInfo);
    } catch (err: any) {
      setSmsError(err.message);
      toast.error(err.message);
      setIsSendingSms(false);
    }
  }

  /**
   * Builds the payload from the most up-to-date userInfo snapshot and
   * POSTs it to the proxy route → Python bot → returns task_id for polling.
   */
  const startQuotingFlow = async (info: UserInfo = userInfo) => {
    setAppState("quoting")

    const payload = {
      cliente: info.cliente || {},
      vehiculo: info.vehiculo || {}
    }

    console.log("🚀 Enviando payload al bot:", JSON.stringify(payload, null, 2));

    try {
      const res = await fetch("/api/v1/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Error al iniciar cotización")
      }

      if (data.task_id) {
        setPollingTaskId(data.task_id)
      } else {
        throw new Error("El bot no retornó un task_id")
      }
    } catch (error: any) {
      console.error("startQuotingFlow error:", error)
      toast.error(error.message || "Error de conexión al cotizar")
      setAppState("chatting")
    }
  }

  const handleDirectQuote = async () => {
    setAppState("quoting")
    console.log("⏩ Saltando verificación. Enviando payload de ejemplo:", JSON.stringify(SAMPLE_DATA, null, 2));

    try {
      const res = await fetch("/api/v1/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(SAMPLE_DATA)
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Error al iniciar cotización")
      if (data.task_id) setPollingTaskId(data.task_id)
      else throw new Error("El bot no retornó un task_id")
    } catch (error: any) {
      console.error("handleDirectQuote error:", error)
      toast.error(error.message || "Error de conexión al cotizar")
      setAppState("chatting")
    }
  }

  const handleTestMockQuote = () => {
    const mockResults: PollingResult[] = [
      {
        aseguradora: "Quálitas",
        status: "ok",
        estado: "Cotización generada correctamente",
        mensaje: null,
        error: null,
        plan_recomendado: {
          nombre: "AMPLIA",
          id_producto: null,
          prima_neta: { valor: 1921244, texto: "$1.921.244" },
          iva: { valor: 372066, texto: "$372.066" },
          gastos_expedicion: { valor: 37000, texto: "$37.000" },
          total: { valor: 2330310, texto: "$2.330.310" },
          valor_asegurado: { valor: 38600000, texto: "$38.600.000" }
        },
        vehiculo: {
          marca: "RENAULT",
          linea: "KWID OUTSIDER AA 4X2 GSL MT.",
          modelo: "2022",
          descripcion: "RENAULT KWID OUTSIDER AA 4X2 GSL MT., 05 PSJ. 2022",
          codigo_fasecolda: "8001195",
          placa: "KNY605",
          motor: null,
          chasis: null,
          zona_tarifacion: "BOGOTA",
          accesorios: null
        },
        asegurado: {
          fecha_nacimiento: "14/05/2006",
          genero: "FEMENINO"
        },
        amparos: [
          { nombre: "Pérdida Parcial por Daños", valor: "$38.600.000", deducible: "1.400.000" },
          { nombre: "Pérdida Total por Daños", valor: "$38.600.000", deducible: "0%" },
          { nombre: "Responsabilidad Civil Extracontractual", valor: "$4.000.000.000", deducible: "0" }
        ],
        planes_disponibles: [
          {
            nombre: "AMPLIA",
            id_producto: null,
            prima_neta: 1921244,
            iva: 372066,
            gastos_expedicion: 37000,
            total: 2330310
          }
        ],
        raw: {
          numero_cotizacion: "0004917853",
          agente: "20296",
          tarifa_aplicada: "2507",
          tipo_uso: "PARTICULAR",
          servicio: "Livianos",
          modalidad_pago: "ANUAL",
          periodo_gracia: "No disponible",
          primer_pago: "$2.330.310",
          pago_subsecuente: "-"
        }
      },
      {
        aseguradora: "Equidad",
        status: "ok",
        estado: "Cotización generada correctamente",
        mensaje: null,
        error: null,
        plan_recomendado: {
          nombre: "PLAN BRONCE",
          id_producto: null,
          prima_neta: { valor: 1550000, texto: "$1.550.000" },
          iva: { valor: 294500, texto: "$294.500" },
          gastos_expedicion: { valor: 25000, texto: "$25.000" },
          total: { valor: 1869500, texto: "$1.869.500" },
          valor_asegurado: { valor: 38600000, texto: "$38.600.000" }
        },
        vehiculo: { placa: "KNY605" },
        asegurado: null,
        amparos: [
          { nombre: "Responsabilidad Civil", valor: "$1.000.000.000", deducible: "0" }
        ],
        planes_disponibles: [
          { nombre: "PLAN BRONCE", id_producto: "1", prima_neta: 1550000, iva: 294500, gastos_expedicion: 25000, total: 1869500 },
          { nombre: "PLAN PLATA", id_producto: "2", prima_neta: 1850000, iva: 351500, gastos_expedicion: 25000, total: 2226500 }
        ],
        raw: null
      },
      {
        aseguradora: "Mundial",
        status: "ok",
        estado: "Cotización generada correctamente",
        mensaje: null,
        error: null,
        plan_recomendado: {
          nombre: "AUTOS TRADICIONAL",
          id_producto: null,
          prima_neta: { valor: 1720000, texto: "$1.720.000" },
          iva: { valor: 326800, texto: "$326.800" },
          gastos_expedicion: { valor: 20000, texto: "$20.000" },
          total: { valor: 2066800, texto: "$2.066.800" },
          valor_asegurado: { valor: 38600000, texto: "$38.600.000" }
        },
        vehiculo: { placa: "KNY605" },
        asegurado: null,
        amparos: [
          { nombre: "Responsabilidad Civil Extracontractual", valor: "$2.000.000.000", deducible: "0" }
        ],
        planes_disponibles: [
          { nombre: "AUTOS TRADICIONAL", id_producto: "1", prima_neta: 1720000, iva: 326800, gastos_expedicion: 20000, total: 2066800 }
        ],
        raw: null
      },
      {
        aseguradora: "Seguros del Estado",
        status: "ok",
        estado: "Cotización generada correctamente",
        mensaje: null,
        error: null,
        plan_recomendado: {
          nombre: "PLAN FULL EQUIPO",
          id_producto: null,
          prima_neta: { valor: 1810000, texto: "$1.810.000" },
          iva: { valor: 343900, texto: "$343.900" },
          gastos_expedicion: { valor: 30000, texto: "$30.000" },
          total: { valor: 2183900, texto: "$2.183.900" },
          valor_asegurado: { valor: 38600000, texto: "$38.600.000" }
        },
        vehiculo: { placa: "KNY605" },
        asegurado: null,
        amparos: [
          { nombre: "Responsabilidad Civil Extracontractual", valor: "$3.000.000.000", deducible: "0" }
        ],
        planes_disponibles: [
          { nombre: "PLAN FULL EQUIPO", id_producto: "1", prima_neta: 1810000, iva: 343900, gastos_expedicion: 30000, total: 2183900 }
        ],
        raw: null
      },
      {
        aseguradora: "AXA Colpatria",
        status: "ok",
        estado: "Cotización generada correctamente",
        mensaje: null,
        error: null,
        plan_recomendado: {
          nombre: "PLUS",
          id_producto: null,
          prima_neta: { valor: 1950000, texto: "$1.950.000" },
          iva: { valor: 370500, texto: "$370.500" },
          gastos_expedicion: { valor: 35000, texto: "$35.000" },
          total: { valor: 2355500, texto: "$2.355.500" },
          valor_asegurado: { valor: 38600000, texto: "$38.600.000" }
        },
        vehiculo: { placa: "KNY605" },
        asegurado: null,
        amparos: [
          { nombre: "Responsabilidad Civil Extracontractual", valor: "$3.500.000.000", deducible: "0" }
        ],
        planes_disponibles: [
          { nombre: "PLUS", id_producto: "1", prima_neta: 1950000, iva: 370500, gastos_expedicion: 35000, total: 2355500 }
        ],
        raw: null
      },
      {
        aseguradora: "Zurich",
        status: "ok",
        estado: "Cotización generada correctamente",
        mensaje: null,
        error: null,
        plan_recomendado: {
          nombre: "ZURICH AUTOS",
          id_producto: null,
          prima_neta: { valor: 2100000, texto: "$2.100.000" },
          iva: { valor: 399000, texto: "$399.000" },
          gastos_expedicion: { valor: 40000, texto: "$40.000" },
          total: { valor: 2539000, texto: "$2.539.000" },
          valor_asegurado: { valor: 38600000, texto: "$38.600.000" }
        },
        vehiculo: { placa: "KNY605" },
        asegurado: null,
        amparos: [
          { nombre: "Responsabilidad Civil Extracontractual", valor: "$4.000.000.000", deducible: "0" }
        ],
        planes_disponibles: [
          { nombre: "ZURICH AUTOS", id_producto: "1", prima_neta: 2100000, iva: 399000, gastos_expedicion: 40000, total: 2539000 }
        ],
        raw: null
      }
    ];

    const mockUser: UserInfo = {
      cliente: {
        nombre: "Keyner",
        apellidos: "Trillos Useche",
        celular: "3103035289",
        numero_documento: "1090384736",
        tipo_documento: "CC"
      },
      vehiculo: {
        placa: "DDB440",
        ciudad: "Bogota"
      }
    };
    
    setUserInfo(mockUser);
    setLatestUserInfo(mockUser);
    setIsAgreed(true);
    setQuoteResults(mockResults);
    setAppState("completed_quote");
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (appState === "quoting" && pollingTaskId) {
      intervalId = setInterval(async () => {
        try {
          const res = await fetch(`/api/v1/cotizar/status/${pollingTaskId}`)
          const data = await res.json()
          
          if (data.status === "completado" || data.status === "completado_con_errores" || data.status === "error") {
            clearInterval(intervalId)
            if (data.status === "completado" || data.status === "completado_con_errores") {
              const resArray = data.cotizaciones || data.data || []
              if (resArray.length > 0) {
                setQuoteResults(resArray.map(normalizeQuoteData))
                setAppState("completed_quote")
              } else {
                toast.error("Cotización sin resultados")
                setAppState("chatting")
              }
            } else {
              toast.error("Error en la cotización")
              setAppState("chatting")
            }
          }
        } catch (error) {
          console.error("Polling error:", error)
        }
      }, 5000)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [appState, pollingTaskId])

  const handleSelectQuote = (quote: InsuranceQuote) => {
    setSelectedQuote(quote)
    setAppState("sarlaft")
  }

  const handleSarlaftSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!sarlaftData.ocupacion) {
      toast.error("Por favor indica tu ocupación.")
      return
    }
    setAppState("issuing")
    setTimeout(() => {
      setAppState("finished")
    }, 3000)
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const newUserMessage: Message = { role: "user", content: text }
    setMessages(prev => [...prev, newUserMessage])
    setInputValue("")
    setDateDay("")
    setDateMonth("")
    setDateYear("")
    setSuggestions([])
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, newUserMessage].map(m => ({
            role: m.role === "bot" ? "assistant" : m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) throw new Error("Error en la respuesta")

      const data = await response.json()
      processAIData(data.content)

      setMessages(prev => [...prev, { role: "bot", content: data.content }])
    } catch (error) {
      console.error("Error:", error)
      toast.error("Lo siento, tuve un problema de conexión.")
    } finally {
      setIsTyping(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <>
      <div className="flex-1 flex flex-col items-center py-4 md:py-12 px-4 w-full">
        <div className={`w-full flex flex-col relative transition-all duration-500 ${
          ["completed_quote", "sarlaft", "issuing", "finished"].includes(appState) 
            ? "max-w-6xl"
            : "bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200 h-[calc(100dvh-100px)] md:h-[750px] max-w-2xl"
        }`}>
          
          {/* Header del bot */}
          {!["completed_quote", "sarlaft", "issuing", "finished"].includes(appState) && (
            <div className="bg-slate-900 border-b border-slate-800 p-4 shadow-sm z-10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-800 bg-slate-800">
                  <img src={BOT_AVATAR} alt="Sofía Asesora" className="w-full h-full object-cover object-top" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h1 className="text-white font-extrabold text-lg tracking-wide">Sofía</h1>
                <div className="flex items-center gap-1.5 mt-0.5 opacity-90">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">En línea</span>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Conditional Content based on Agreement */}
          {!isAgreed ? (
            <div className="flex-1 flex flex-col items-center justify-center p-5 md:p-8 text-center bg-slate-50/50 animate-in fade-in duration-700 overflow-y-auto">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-4 md:mb-6 rotate-3 shrink-0">
                <Icon icon="ph:shield-check-fill" className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 leading-tight px-2">
                Tu seguridad es nuestra prioridad
              </h2>
              <div className="space-y-3 md:space-y-4 text-slate-600 text-sm md:text-[15px] leading-relaxed max-w-sm px-2">
                <p>
                  Para brindarte una cotización precisa con nuestras aseguradoras aliadas, necesitamos recolectar algunos datos personales.
                </p>
                <div className="bg-white p-4 md:p-5 rounded-2xl border border-slate-200 text-[11px] md:text-xs text-left space-y-2.5 shadow-sm">
                  <div className="flex gap-2.5 items-start">
                    <Icon icon="ph:check-circle-fill" className="text-primary shrink-0 w-4 h-4 mt-0.5" />
                    <span>Tus datos se usarán solo para fines de cotización.</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Icon icon="ph:check-circle-fill" className="text-primary shrink-0 w-4 h-4 mt-0.5" />
                    <span>Cumplimos con la Ley 1581 de Protección de Datos.</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Icon icon="ph:check-circle-fill" className="text-primary shrink-0 w-4 h-4 mt-0.5" />
                    <span>No compartiremos tu información con terceros no autorizados.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-10 w-full max-w-sm flex flex-col gap-3">
                <Button 
                  onClick={() => {
                    // Registrar aceptación en segundo plano intentando obtener IP pública real
                    fetch("https://api.ipify.org?format=json")
                      .then(res => res.json())
                      .then(data => {
                        fetch("/api/accept-terms", { 
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ ip: data.ip })
                        }).catch(err => console.error("Error al registrar aceptación:", err));
                      })
                      .catch(() => {
                        // Fallback si ipify falla o está bloqueado
                        fetch("/api/accept-terms", { method: "POST" }).catch(err => console.error("Error al registrar aceptación:", err));
                      });
                    
                    setIsAgreed(true)
                    if (process.env.NEXT_PUBLIC_SKIP_VERIFICATION === "true") {
                      handleDirectQuote()
                    }
                  }}
                  className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Aceptar y Empezar
                </Button>
              </div>
              <p className="mt-4 text-[9px] md:text-[10px] text-slate-400 uppercase tracking-widest font-bold px-4">
                Al hacer clic, aceptas nuestra <a href="/politica-de-tratamiento-de-datos" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Política de Tratamiento de Datos</a> y <a href="/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Términos y Condiciones</a>.
              </p>
            </div>
          ) : (
            <>
              {/* Messages / Flow Area */}
              <div 
                ref={messagesContainerRef}
                className={`flex-1 px-4 md:px-8 py-8 space-y-6 scrollbar-hide relative ${
                  ["completed_quote", "sarlaft", "issuing", "finished"].includes(appState) ? "" : "overflow-y-auto bg-slate-50/20"
                }`}
              >
                {/* Phase: Chatting */}
                {!["completed_quote", "sarlaft", "issuing", "finished"].includes(appState) && (appState === "chatting" || messages.length > 0) && messages.map((message, index) => (
                  <div key={index} className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`flex gap-3 lg:gap-4 max-w-[90%] md:max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {message.role === "bot" && (
                        <img src={BOT_AVATAR} alt="Sofía" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover object-top shrink-0 mt-1 shadow-sm border border-slate-100" />
                      )}
                      <div className={`rounded-2xl px-5 py-4 shadow-sm text-[15px] leading-relaxed font-medium ${
                        message.role === "user" ? "bg-primary text-white rounded-tr-sm shadow-md" : "bg-white text-slate-800 rounded-tl-sm border border-slate-100 shadow-sm"
                      }`}>
                        <p className="whitespace-pre-wrap">
                          {message.content
                            .replace(/###DATA###[\s\S]*?###ENDDATA###/g, "")
                            .replace(/Sugerencias:\s*\[.*?\]/g, "")
                            .trim()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && appState === "chatting" && (
                  <div className="flex gap-3 justify-start items-start">
                    <img src={BOT_AVATAR} alt="Sofía" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover object-top shrink-0 mt-1 shadow-sm" />
                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm h-[52px] flex items-center">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Phase: Verifying SMS */}
                {appState === "verifying_sms" && (
                  <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in fade-in zoom-in duration-500 max-w-sm mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon icon="ph:device-mobile-speaker-fill" className="w-10 h-10 text-primary" />
                    </div>
                    
                    {!isEditingPhone ? (
                      <>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-slate-800">Verifica tu número</h3>
                          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                            Hemos enviado un código SMS al número <br/>
                            <span className="font-bold text-slate-700">{userInfo.cliente?.celular}</span>
                          </p>
                          <button 
                            onClick={() => {
                              setTempPhone(userInfo.cliente?.celular || "");
                              setIsEditingPhone(true);
                            }}
                            className="text-[11px] font-bold text-primary hover:underline mt-2 inline-flex items-center gap-1"
                          >
                            <Icon icon="ph:pencil-simple-fill" /> ¿Te equivocaste de número?
                          </button>
                        </div>

                        <form onSubmit={verifySmsAndQuote} className="w-full space-y-4">
                          <div>
                            <Input
                              placeholder="Ingresa el código"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                              className="text-center text-2xl tracking-[0.5em] font-black h-16 rounded-2xl bg-white border-2 border-slate-200 focus:border-primary shadow-sm placeholder:tracking-normal placeholder:text-sm placeholder:font-normal"
                              disabled={isSendingSms}
                            />
                            {smsError && <p className="text-red-500 text-xs font-bold text-center mt-2">{smsError}</p>}
                          </div>
                          <Button 
                            type="submit" 
                            disabled={isSendingSms || otpCode.length < 6}
                            className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20"
                          >
                            {isSendingSms ? "Verificando..." : "Confirmar y Cotizar"}
                          </Button>
                          <div className="text-center">
                            <button 
                              type="button" 
                              onClick={() => requestSmsVerification()}
                              disabled={isSendingSms}
                              className="text-xs font-bold text-slate-500 hover:text-primary transition-colors"
                            >
                              Reenviar código
                            </button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <div className="w-full text-center space-y-4 animate-in fade-in duration-300">
                        <h3 className="text-xl font-bold text-slate-800">Editar número</h3>
                        <p className="text-slate-500 text-sm">
                          Ingresa tu número correcto y te enviaremos un nuevo código.
                        </p>
                        <Input
                          placeholder="Ej: 3101234567"
                          value={tempPhone}
                          onChange={(e) => setTempPhone(e.target.value.replace(/\D/g, ""))}
                          className="text-center text-xl font-bold h-14 rounded-2xl bg-white border-2 border-slate-200 focus:border-primary shadow-sm"
                          disabled={isSendingSms}
                        />
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setIsEditingPhone(false)}
                            className="flex-1 h-12 rounded-xl font-bold border-2"
                            disabled={isSendingSms}
                          >
                            Cancelar
                          </Button>
                          <Button 
                            onClick={() => requestSmsVerification(tempPhone)}
                            className="flex-1 h-12 rounded-xl font-bold"
                            disabled={isSendingSms || tempPhone.length < 10}
                          >
                            {isSendingSms ? "Enviando..." : "Enviar código"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Phase: Quoting Simulation */}
                {appState === "quoting" && (
                  <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                      <Icon icon="ph:calculator-fill" className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-slate-800">Cotizando con aseguradoras...</h3>
                      <p className="text-slate-500 text-sm mt-2">Por favor espera, conectando con los servicios oficiales...</p>
                      {pollingTaskId && (
                        <p className="text-[11px] text-slate-400 font-medium mt-4">
                          ID de Solicitud: {pollingTaskId}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Phase: Dashboard Result (Completed Quote) */}
                {appState === "completed_quote" && quoteResults.length > 0 && (
                  <div className="w-full pb-6 space-y-8">
                    {(() => {
                      const exitosas = quoteResults.filter(c => c.status === "ok");
                      const errores = quoteResults.filter(c => c.status === "error");
                      const sinCotizacion = quoteResults.filter(c => c.status === "sin_cotizacion");
                      
                      return (
                        <>
                          {pollingTaskId && (
                            <div className="w-full text-center mb-6">
                              <p className="text-[11px] text-slate-400 font-medium">
                                ID de Solicitud: {pollingTaskId}
                              </p>
                            </div>
                          )}
                          {exitosas.length > 0 && (
                            <div className="space-y-6">
                              <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                                <h3 className="text-xl font-bold text-slate-800 text-center md:text-left">Opciones Disponibles</h3>
                                <Button 
                                  onClick={async () => {
                                    try {
                                      toast.loading("Generando PDF...");
                                      await generateQuoteComparisonPDF(quoteResults, userInfo, logosMap);
                                      toast.dismiss();
                                      toast.success("PDF generado exitosamente");
                                    } catch (e) {
                                      toast.dismiss();
                                      toast.error("Error al generar PDF");
                                      console.error(e);
                                    }
                                  }}
                                  className="rounded-full font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                  <Icon icon="ph:file-pdf-fill" className="w-5 h-5 mr-2" />
                                  PDF COMPARATIVO DE LAS MEJORES OPCIONES
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                {exitosas.flatMap((result, index) => {
                                  if (result.planes_disponibles && result.planes_disponibles.length > 0) {
                                    return result.planes_disponibles.map((plan: any, pIndex: number) => ({
                                      ...result,
                                      id: `${result.aseguradora}-${index}-${pIndex}`,
                                      plan_recomendado: plan,
                                      amparos: plan.amparos && plan.amparos.length > 0 ? plan.amparos : result.amparos,
                                      planes_disponibles: null // Para no mostrar selector de planes dentro del modal
                                    }));
                                  }
                                  return [{ ...result, id: `${result.aseguradora}-${index}` }];
                                }).map((modifiedResult) => (
                                    <QuoteResultCard
                                      key={modifiedResult.id}
                                      quoteResult={modifiedResult}
                                      logosMap={logosMap}
                                      userInfo={userInfo}
                                      onContinue={(name) => {
                                        const fullName = modifiedResult.plan_recomendado?.nombre 
                                          ? `${name} - ${modifiedResult.plan_recomendado.nombre}` 
                                          : name;
                                        setSelectedQuote({ name: fullName } as any)
                                        setAppState("sarlaft")
                                      }}
                                    />
                                ))}
                              </div>
                              <div className="flex justify-center mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <Button 
                                  onClick={() => window.location.reload()}
                                  variant="outline"
                                  className="rounded-full px-8 h-14 font-bold border-2 border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                                >
                                  <Icon icon="ph:arrow-counter-clockwise-bold" className="w-5 h-5 mr-2" />
                                  Realizar otra cotización
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* Phase: SARLAFT Form */}
                {appState === "sarlaft" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon icon="ph:identification-card-fill" className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">Formulario de Seguridad</h3>
                      <p className="text-slate-500 text-sm">Hola {userInfo.cliente?.nombre}, solo necesitamos confirmar estos datos para {selectedQuote?.name}</p>
                    </div>
                    <form onSubmit={handleSarlaftSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Documento confirmado</label>
                        <Input 
                          disabled
                          value={userInfo.cliente?.numero_documento || "No detectado"}
                          className="rounded-xl h-12 bg-slate-100 border-slate-200 text-slate-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Ocupación / Actividad Económica</label>
                        <Input 
                          placeholder="Ej: Empleado, Independiente..." 
                          value={sarlaftData.ocupacion}
                          onChange={e => setSarlaftData({...sarlaftData, ocupacion: e.target.value})}
                          className="rounded-xl h-12 bg-slate-50 border-slate-200"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Origen de los Fondos</label>
                        <select 
                          className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                          value={sarlaftData.fondos}
                          onChange={e => setSarlaftData({...sarlaftData, fondos: e.target.value})}
                        >
                          <option>Salario</option>
                          <option>Honorarios</option>
                          <option>Rentas</option>
                          <option>Otros</option>
                        </select>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setAppState("completed_quote")}
                          className="w-1/3 h-14 rounded-xl font-bold text-slate-500 border-slate-200"
                        >
                          Volver
                        </Button>
                        <Button type="submit" className="w-2/3 h-14 rounded-xl font-bold text-lg shadow-xl shadow-primary/20">
                          Emitir Seguro Ahora
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Phase: Issuing Simulation */}
                {appState === "issuing" && (
                  <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in fade-in duration-500 max-w-md mx-auto bg-white p-12 rounded-3xl shadow-xl border border-slate-100">
                    <div className="relative">
                      <Icon icon="ph:seal-check-fill" className="w-24 h-24 text-primary animate-pulse" />
                      <div className="absolute -inset-4 border-4 border-primary/30 border-dashed rounded-full animate-[spin_10s_linear_infinite]"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-slate-800">Expidiendo tu seguro...</h3>
                      <p className="text-slate-500 mt-2">Finalizando trámite oficial con {selectedQuote?.name}</p>
                    </div>
                  </div>
                )}

                {/* Phase: Finished Success */}
                {appState === "finished" && (
                  <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in fade-in duration-1000 max-w-lg mx-auto bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/30">
                      <Icon icon="ph:check-bold" className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">¡Felicidades!</h2>
                    <p className="text-lg text-slate-700 font-medium max-w-md px-4 leading-snug">
                      Tu seguro con <span className="text-primary font-extrabold">{selectedQuote?.name}</span> ha sido emitido con éxito.
                    </p>
                    <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 w-full">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Hemos enviado los documentos a tu número <span className="font-bold">{userInfo.cliente?.celular}</span>. 
                        Por favor sigue las instrucciones en tu bandeja para activar tu cobertura hoy mismo.
                      </p>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <Button 
                        onClick={() => setAppState("completed_quote")}
                        variant="outline" 
                        className="rounded-full px-8 h-12 font-bold border-slate-200 text-slate-500"
                      >
                        Volver a Opciones
                      </Button>
                      <Button 
                        onClick={() => window.location.reload()}
                        className="rounded-full px-8 h-12 font-bold shadow-xl shadow-primary/20"
                      >
                        Nueva Cotización
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Interaction Area (Only visible when chatting) */}
              {appState === "chatting" && (
                <div className="shrink-0 bg-white border-t border-slate-100 p-4 md:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                  {(() => {
                    const isAskingForColor = userInfo.campo_actual === "color";
                    
                    const colorOptions = [
                      { label: "Blanco", hex: "#FFFFFF" },
                      { label: "Negro", hex: "#1C1C1E" },
                      { label: "Gris", hex: "#8E8E93" },
                      { label: "Plata", hex: "#E5E5EA" },
                      { label: "Rojo", hex: "#FF3B30" },
                      { label: "Azul", hex: "#007AFF" },
                      { label: "Verde", hex: "#34C759" },
                      { label: "Beige", hex: "#F5F5DC" },
                      { label: "Café", hex: "#6F4E37" },
                      { label: "Dorado", hex: "#FFD700" },
                      { label: "Vinotinto", hex: "#800020" },
                      { label: "Naranja", hex: "#FF9500" },
                      { label: "Amarillo", hex: "#FFCC00" }
                    ];

                    return (
                      <>
                        {isAskingForColor && (
                          <div className="w-full max-w-4xl mx-auto flex flex-col gap-3 mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="flex flex-wrap gap-4 justify-start">
                              {colorOptions.map(c => (
                                <button
                                  key={c.label}
                                  onClick={() => sendMessage(c.label)}
                                  disabled={isTyping}
                                  className="group flex flex-col items-center gap-1.5 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                                >
                                  <div 
                                    className="w-12 h-12 rounded-full border border-slate-200 shadow-sm transition-all group-hover:border-primary group-hover:shadow-md flex items-center justify-center"
                                    style={{ backgroundColor: c.hex }}
                                  />
                                  <span className="text-[11px] font-bold text-slate-600">{c.label}</span>
                                </button>
                              ))}
                              <button
                                onClick={() => sendMessage("Otro")}
                                disabled={isTyping}
                                className="group flex flex-col items-center gap-1.5 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                              >
                                <div className="w-12 h-12 rounded-full border border-slate-200 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-red-400 via-yellow-400 to-blue-400 shadow-sm flex items-center justify-center transition-all group-hover:border-primary group-hover:shadow-md">
                                  <Icon icon="ph:plus-bold" className="text-white w-5 h-5 drop-shadow-md" />
                                </div>
                                <span className="text-[11px] font-bold text-slate-600">Otro</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {suggestions.length > 0 && !isAskingForColor && (
                          <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => sendMessage(suggestion)}
                                disabled={isTyping}
                                className="px-4 py-2.5 text-xs font-bold rounded-full border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 shadow-sm whitespace-nowrap active:scale-95 disabled:opacity-50"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  })()}

                  {(() => {
                    const lastBotMessage = messages.filter(m => m.role === "bot").pop()?.content.toLowerCase() || "";
                    const isAskingForDate = lastBotMessage.includes("fecha de nacimiento");

                    // Custom date lists
                    const days = Array.from({ length: 31 }, (_, i) => {
                      const d = i + 1;
                      return d < 10 ? `0${d}` : `${d}`;
                    });

                    const monthsList = [
                      { value: "01", label: "Ene" },
                      { value: "02", label: "Feb" },
                      { value: "03", label: "Mar" },
                      { value: "04", label: "Abr" },
                      { value: "05", label: "May" },
                      { value: "06", label: "Jun" },
                      { value: "07", label: "Jul" },
                      { value: "08", label: "Ago" },
                      { value: "09", label: "Sep" },
                      { value: "10", label: "Oct" },
                      { value: "11", label: "Nov" },
                      { value: "12", label: "Dic" }
                    ];

                    const currentYear = new Date().getFullYear();
                    // Colombian insurers require being 18+ and under 85
                    const minAge = 18;
                    const maxAge = 85;
                    const startYear = currentYear - minAge;
                    const endYear = currentYear - maxAge;
                    const years = Array.from({ length: startYear - endYear + 1 }, (_, i) => String(startYear - i));

                    const handleFormSubmit = (e: React.FormEvent) => {
                      e.preventDefault();
                      if (isAskingForDate) {
                        if (dateDay && dateMonth && dateYear) {
                          sendMessage(`${dateDay}/${dateMonth}/${dateYear}`);
                        }
                      } else {
                        sendMessage(inputValue);
                      }
                    };

                    if (isAskingForDate) {
                      return (
                        <form onSubmit={handleFormSubmit} className="w-full max-w-4xl mx-auto flex flex-col gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-500">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5 flex items-center gap-1.5 px-1">
                            <Icon icon="ph:calendar-blank-fill" className="text-primary w-4.5 h-4.5" />
                            Selecciona tu fecha de nacimiento:
                          </div>
                          <div className="flex gap-3 items-center">
                            <div className="flex-1 grid grid-cols-3 gap-2">
                              <div className="relative">
                                <select
                                  value={dateDay}
                                  onChange={(e) => setDateDay(e.target.value)}
                                  disabled={isTyping}
                                  className="w-full h-14 rounded-2xl bg-slate-50/80 backdrop-blur border border-slate-200 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 px-4 pr-8 text-[15px] font-bold text-slate-700 transition-all cursor-pointer shadow-inner appearance-none text-center focus:outline-none"
                                >
                                  <option value="">Día</option>
                                  {days.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                  ))}
                                </select>
                                <Icon icon="ph:caret-down-fill" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              </div>

                              <div className="relative">
                                <select
                                  value={dateMonth}
                                  onChange={(e) => setDateMonth(e.target.value)}
                                  disabled={isTyping}
                                  className="w-full h-14 rounded-2xl bg-slate-50/80 backdrop-blur border border-slate-200 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 px-4 pr-8 text-[15px] font-bold text-slate-700 transition-all cursor-pointer shadow-inner appearance-none text-center focus:outline-none"
                                >
                                  <option value="">Mes</option>
                                  {monthsList.map(m => (
                                    <option key={m.value} value={m.value}>{m.label}</option>
                                  ))}
                                </select>
                                <Icon icon="ph:caret-down-fill" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              </div>

                              <div className="relative">
                                <select
                                  value={dateYear}
                                  onChange={(e) => setDateYear(e.target.value)}
                                  disabled={isTyping}
                                  className="w-full h-14 rounded-2xl bg-slate-50/80 backdrop-blur border border-slate-200 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 px-4 pr-8 text-[15px] font-bold text-slate-700 transition-all cursor-pointer shadow-inner appearance-none text-center focus:outline-none"
                                >
                                  <option value="">Año</option>
                                  {years.map(y => (
                                    <option key={y} value={y}>{y}</option>
                                  ))}
                                </select>
                                <Icon icon="ph:caret-down-fill" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                              </div>
                            </div>

                            <Button 
                              type="submit"
                              disabled={isTyping || !dateDay || !dateMonth || !dateYear}
                              size="icon" 
                              className="h-14 w-14 min-h-[56px] min-w-[56px] rounded-2xl bg-primary hover:bg-primary/90 shadow-[0_5px_15px_-5px_rgba(var(--primary),0.5)] shrink-0 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
                            >
                              <Icon icon="ph:paper-plane-right-fill" className="w-5 h-5 ml-0.5 text-white" />
                            </Button>
                          </div>
                        </form>
                      );
                    }

                    return (
                      <form onSubmit={handleFormSubmit} className="flex gap-3 max-w-4xl mx-auto items-center">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Escribe aquí tu respuesta..."
                          disabled={isTyping}
                          className="flex-1 h-14 min-h-[56px] rounded-full bg-slate-50 border-slate-200 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 px-6 shadow-inner text-[15px] font-medium transition-all"
                        />
                        <Button 
                          type="submit"
                          disabled={isTyping || !inputValue.trim()}
                          size="icon" 
                          className="h-14 w-14 min-h-[56px] min-w-[56px] rounded-full bg-primary hover:bg-primary/90 shadow-[0_5px_15px_-5px_rgba(var(--primary),0.5)] shrink-0 transition-all active:scale-95 disabled:opacity-50"
                        >
                          <Icon icon="ph:paper-plane-right-fill" className="w-5 h-5 ml-1 text-white" />
                        </Button>
                      </form>
                    );
                  })()}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
