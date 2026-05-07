"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icon } from "@iconify/react"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"

const BOT_AVATAR = "/images/sofia.jpeg"

type Message = {
  role: "bot" | "user" | "system"
  content: string
}

type UserInfo = {
  nombre?: string
  documento?: string
  fecha_nacimiento?: string
  placa?: string
  ciudad?: string
  contacto?: string
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

type AppState = "chatting" | "quoting" | "selecting" | "sarlaft" | "issuing" | "finished"

export default function CotizarPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "¡Hola! Soy Sofía, tu asesora de Proyectar Seguros. ¿Listo para encontrar el mejor seguro para tu vehículo? Cuéntame, ¿cuál es tu nombre completo y la placa del carro que quieres cotizar?"
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({})
  const [suggestions, setSuggestions] = useState<string[]>(["Juan", "ABC123", "Bogotá"])
  const [appState, setAppState] = useState<AppState>("chatting")
  const [selectedQuote, setSelectedQuote] = useState<InsuranceQuote | null>(null)
  const [sarlaftData, setSarlaftData] = useState({ ocupacion: "", fondos: "Salario" })
  
  const messagesContainerRef = useRef<HTMLDivElement>(null)

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

  const processAIData = (content: string) => {
    const dataMatch = content.match(/###DATA###(.*?)###ENDDATA###/s)
    if (dataMatch) {
      try {
        const extractedData = JSON.parse(dataMatch[1])
        setUserInfo(prev => ({ ...prev, ...extractedData }))
        
        if (extractedData.sugerencias && Array.isArray(extractedData.sugerencias)) {
          setSuggestions(extractedData.sugerencias)
        }

        if (extractedData.completado) {
          setTimeout(() => startQuotingFlow(), 2000)
        }
        
        return content.replace(/###DATA###.*?###ENDDATA###/s, "").trim()
      } catch (e) {
        console.error("Error parseando datos de la IA:", e)
      }
    }
    return content
  }

  const startQuotingFlow = () => {
    setAppState("quoting")
    setTimeout(() => {
      setAppState("selecting")
    }, 5000)
  }

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
      const cleanContent = processAIData(data.content)

      setMessages(prev => [...prev, { role: "bot", content: cleanContent }])
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
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="flex-1 flex flex-col items-center py-6 px-4 md:py-12">
        <div className="max-w-2xl w-full bg-white flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-slate-200 h-[650px] md:h-[750px] relative">
          
          {/* Header del bot */}
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
                  <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">AI Activa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages / Flow Area */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-4 md:px-8 py-8 space-y-6 scrollbar-hide bg-slate-50/20 relative"
          >
            {/* Phase: Chatting */}
            {(appState === "chatting" || messages.length > 0) && messages.map((message, index) => (
              <div key={index} className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`flex gap-3 lg:gap-4 max-w-[90%] md:max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {message.role === "bot" && (
                    <img src={BOT_AVATAR} alt="Sofía" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover object-top shrink-0 mt-1 shadow-sm border border-slate-100" />
                  )}
                  <div className={`rounded-2xl px-5 py-4 shadow-sm text-[15px] leading-relaxed font-medium ${
                    message.role === "user" ? "bg-primary text-white rounded-tr-sm shadow-md" : "bg-white text-slate-800 rounded-tl-sm border border-slate-100 shadow-sm"
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
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

            {/* Phase: Quoting Simulation */}
            {appState === "quoting" && (
              <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                  <Icon icon="ph:calculator-fill" className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800">Realizando cotización...</h3>
                  <p className="text-slate-500 text-sm mt-2">Consultando con AXA, Mundial, Quálitas y más...</p>
                </div>
              </div>
            )}

            {/* Phase: Quote Selection */}
            {appState === "selecting" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800">¡Resultados para la placa {userInfo.placa}!</h3>
                  <p className="text-slate-500 text-sm">Selecciona la mejor opción para tu vehículo</p>
                </div>
                <div className="grid gap-4">
                  {QUOTES.map((quote) => (
                    <div key={quote.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center p-2">
                            <Icon icon={quote.logo} className="w-full h-full text-slate-700" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg">{quote.name}</h4>
                            <p className="text-[11px] text-slate-500 max-w-[200px] leading-tight">{quote.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Desde</span>
                          <p className="text-xl font-black text-primary">{formatCurrency(quote.price)}</p>
                        </div>
                      </div>
                      
                      {quote.plans && (
                        <div className="mb-4 bg-slate-50 rounded-lg p-3 space-y-2">
                          {quote.plans.map((plan, i) => (
                            <div key={i} className="flex justify-between text-xs font-medium text-slate-600">
                              <span>{plan.name}</span>
                              <span className="font-bold">{formatCurrency(plan.price)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button 
                        onClick={() => handleSelectQuote(quote)}
                        className="w-full rounded-xl py-6 font-bold shadow-none hover:shadow-lg transition-all"
                      >
                        Seleccionar {quote.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Phase: SARLAFT Form */}
            {appState === "sarlaft" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-md mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon icon="ph:identification-card-fill" className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Formulario de Seguridad</h3>
                  <p className="text-slate-500 text-sm">Hola {userInfo.nombre}, solo necesitamos confirmar estos datos para {selectedQuote?.name}</p>
                </div>
                <form onSubmit={handleSarlaftSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Documento confirmado</label>
                    <Input 
                      disabled
                      value={userInfo.documento || "No detectado"}
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
                  <Button type="submit" className="w-full h-14 rounded-xl font-bold text-lg mt-4 shadow-xl shadow-primary/20">
                    Emitir Seguro Ahora
                  </Button>
                </form>
              </div>
            )}

            {/* Phase: Issuing Simulation */}
            {appState === "issuing" && (
              <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in fade-in duration-500">
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
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in fade-in duration-1000">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/30">
                  <Icon icon="ph:check-bold" className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">¡Felicidades!</h2>
                <p className="text-lg text-slate-700 font-medium max-w-md px-4 leading-snug">
                  Tu seguro con <span className="text-primary font-extrabold">{selectedQuote?.name}</span> ha sido emitido con éxito.
                </p>
                <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 w-full">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Hemos enviado los documentos a <span className="font-bold">{userInfo.contacto}</span>. 
                    Por favor sigue las instrucciones en tu correo para activar tu cobertura hoy mismo.
                  </p>
                </div>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline" 
                  className="mt-8 rounded-full px-8 h-12 font-bold border-slate-200 text-slate-500"
                >
                  Nueva Cotización
                </Button>
              </div>
            )}
          </div>

          {/* Chat Interaction Area (Only visible when chatting) */}
          {appState === "chatting" && (
            <div className="shrink-0 bg-white border-t border-slate-100 p-4 md:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
              {suggestions.length > 0 && (
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

              <form onSubmit={(e) => { e.preventDefault(); sendMessage(inputValue); }} className="flex gap-3 max-w-4xl mx-auto items-center">
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
            </div>
          )}
        </div>
        
        <p className="max-w-2xl w-full text-center text-[11px] text-slate-400 mt-8 font-medium uppercase tracking-widest px-6">
          Al interactuar con Sofía, aceptas nuestra política de tratamiento de datos personales. 
          Toda la información recolectada se utiliza exclusivamente para fines de cotización.
        </p>
      </div>

      <Footer />
    </main>
  )
}
