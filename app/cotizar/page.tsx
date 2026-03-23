"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icon } from "@iconify/react"
import { useState, useRef, useEffect } from "react"

// Recomendación: Foto realista de una mujer de 28 a 35 años, profesional y cálida.
const BOT_AVATAR = "/images/sofia.jpeg"

type Message = {
  role: "bot" | "user"
  content: string
  options?: string[]
}

// Inicia directamente el flujo de cotización de vehículo sin preguntar el tipo de seguro.
const initialMessages: Message[] = [
  {
    role: "bot",
    content: "¡Hola! Soy Sofía, tu asesora de Proyectar Seguros. ¿Listo para encontrar el mejor seguro para tu carro?",
    options: ["Vehículo usado", "Vehículo 0 kilómetros"]
  }
]

// Respuestas simuladas (mock) para la etapa estética. 
// Para el desarrollo futuro, esto se conectará al motor conversacional real.
const botResponses: Record<string, Message> = {
  "Vehículo usado": {
    role: "bot",
    content: "Perfecto, un vehículo usado. ¿El seguro será emitido a nombre de una persona natural o jurídica?",
    options: ["Persona natural", "Persona jurídica"]
  },
  "Vehículo 0 kilómetros": {
    role: "bot", 
    content: "¡Qué emoción que estrenas carro! ¿El seguro será emitido a nombre de una persona natural o jurídica?",
    options: ["Persona natural", "Persona jurídica"]
  },
  "default": {
    role: "bot",
    content: "Entendido 😊. Esta es la demostración estética del comportamiento de Sofía de acuerdo a las especificaciones. Pronto estaré funcional para tomar más datos.",
    options: ["Volver a empezar"]
  }
}

export default function CotizarPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateBotResponse = (userInput: string) => {
    setIsTyping(true)
    
    // Simular un tiempo de respuesta de entre 1 a 2 segundos para que se sienta natural
    setTimeout(() => {
      let response = botResponses[userInput];
      if (!response) {
        response = botResponses["default"];
      }
      
      if (userInput === "Volver a empezar") {
        setMessages(initialMessages);
      } else {
        setMessages(prev => [...prev, response]);
      }
      
      setIsTyping(false)
    }, 1500)
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = { role: "user", content: inputValue }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    simulateBotResponse(inputValue)
  }

  const handleOptionClick = (option: string) => {
    const userMessage: Message = { role: "user", content: option }
    setMessages(prev => [...prev, userMessage])
    simulateBotResponse(option)
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Main Chat Container - Pantalla completa en móvil */}
        <div className="absolute inset-x-0 bottom-0 top-[116px] max-w-2xl mx-auto w-full bg-slate-50 flex flex-col shadow-2xl rounded-t-2xl lg:rounded-2xl lg:mt-6 overflow-hidden border-x border-t border-slate-200 lg:border-b lg:h-[calc(100vh-[116px]-3rem)]">
          {/* Header del bot */}
          <div className="bg-slate-900 border-b border-slate-800 p-4 shadow-sm z-10 sticky top-0 flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-800 bg-slate-800">
                <img 
                  src="/images/sofia.jpeg" 
                  alt="Sofía Asesora" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <h1 className="text-white font-extrabold text-lg tracking-wide">Sofía</h1>
              <p className="text-slate-300 text-sm font-medium">Asesora de Proyectar Seguros</p>
              <div className="flex items-center gap-1.5 mt-0.5 opacity-90">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">En línea ahora</span>
              </div>
            </div>
          </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`flex gap-3 lg:gap-4 max-w-[90%] md:max-w-[75%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* Bot Avatar */}
                {message.role === "bot" && (
                  <img src={BOT_AVATAR} alt="Sofía" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover object-top shrink-0 mt-1 shadow-sm" />
                )}

                {/* Bubble */}
                <div
                  className={`rounded-2xl px-5 py-4 shadow-sm text-[15px] leading-relaxed font-medium ${
                    message.role === "user"
                      ? "bg-primary text-white rounded-tr-sm" // Burbujas del usuario: azul medio con texto blanco
                      : "bg-[#E6F3FF] text-slate-800 rounded-tl-sm border border-[#CDE5FF]" // Burbujas de Sofía: fondo azul claro con texto oscuro
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>

              {/* Botones de respuesta rápida */}
              {message.role === "bot" && message.options && index === messages.length - 1 && (
                <div className="flex flex-wrap gap-2 mt-4 ml-12 md:ml-16">
                  {message.options.map((option, optIndex) => (
                    <button
                      key={optIndex}
                      onClick={() => handleOptionClick(option)}
                      // Bordes azules, fondo blanco, texto azul
                      className="px-5 py-2.5 text-[14px] font-bold rounded-full border-2 border-primary bg-white text-primary hover:bg-primary/5 transition-all duration-200 shadow-sm whitespace-nowrap"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Animación de tipeo ("escribiendo") */}
          {isTyping && (
            <div className="flex gap-3 justify-start items-start">
              <img src={BOT_AVATAR} alt="Sofía" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover object-top shrink-0 mt-1 shadow-sm" />
              <div className="bg-[#E6F3FF] border border-[#CDE5FF] rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm h-[52px] flex items-center">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Area */}
        <div className="shrink-0 bg-white border-t border-slate-100 p-4 md:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="flex gap-3 max-w-4xl mx-auto items-center">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu mensaje a Sofía..."
              className="flex-1 h-14 min-h-[56px] rounded-full bg-slate-50 border-slate-200 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 px-6 shadow-inner text-[15px] font-medium transition-all"
            />
            <Button 
              onClick={handleSend} 
              size="icon" 
              className="h-14 w-14 min-h-[56px] min-w-[56px] rounded-full bg-primary hover:bg-primary/90 shadow-[0_5px_15px_-5px_rgba(var(--primary),0.5)] shrink-0 transition-all active:scale-95"
            >
              <Icon icon="ph:paper-plane-right-light" className="w-5 h-5 ml-1 text-white" />
            </Button>
          </div>
        </div>

      </div>
    </main>
  )
}

