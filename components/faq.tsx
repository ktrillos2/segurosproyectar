import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "¿Qué tipos de vehículos puedo asegurar con Proyectar?",
    a: "Puedes asegurar cualquier tipo de vehículo: carros particulares, motos, camionetas, camiones, vehículos de carga y transporte de pasajeros. Si tiene placa y circula en Colombia, lo podemos asegurar."
  },
  {
    q: "¿Cuánto tiempo tarda cotizar y activar mi póliza?",
    a: "El proceso completo toma menos de 5 minutos. Ingresas los datos de tu vehículo, comparas las opciones de las 6 aseguradoras, eliges la que más te conviene, pagas en línea y recibes tu póliza directamente en tu correo. Sin llamadas, sin visitas, sin esperas."
  },
  {
    q: "¿Puedo asegurar un vehículo usado o con varios años de antigüedad?",
    a: "Sí. Aseguramos vehículos nuevos y usados. Las coberturas disponibles y su costo varían según el modelo, el año y el estado del vehículo. Al cotizar verás exactamente qué opciones aplican para tu caso."
  },
  {
    q: "¿Las coberturas que ofrecen son las mismas que si contrato directo con la aseguradora?",
    a: "Sí, exactamente las mismas. Proyectar es una agencia de seguros autorizada por la Superintendencia Financiera de Colombia. Las pólizas que emitimos son oficiales y tienen el mismo respaldo que si las contrataras directamente. La diferencia es que aquí comparas todas en un solo lugar y en minutos."
  },
  {
    q: "¿Qué aseguradoras comparan y por qué esas?",
    a: "Comparamos entre AXA Colpatria, Zurich, Quálitas, Equidad Seguros, Seguros Mundial y Seguros del Estado — las más reconocidas y sólidas del mercado colombiano. Trabajamos con ellas para garantizarte opciones reales, precios competitivos y respaldo en caso de siniestro."
  },
  {
    q: "¿Qué significa cada cobertura y cuál me conviene?",
    a: "Depende de tu perfil y tu vehículo. Si tienes un carro nuevo o de alto valor, una cobertura todo riesgo te da mayor tranquilidad. Si es un vehículo usado de menor valor, una cobertura básica ampliada puede ser suficiente. Al cotizar verás el detalle exacto de qué incluye cada opción."
  },
  {
    q: "¿Qué es el deducible y cómo funciona?",
    a: "El deducible es el valor que pagas de tu propio bolsillo cuando ocurre un siniestro antes de que la aseguradora cubra el resto. A menor deducible, generalmente mayor prima mensual. Al cotizar, Proyectar te muestra claramente el deducible de cada opción."
  },
  {
    q: "¿Qué pasa si tengo un accidente o siniestro?",
    a: "Lo primero es contactar directamente a tu aseguradora — el número de atención está en tu póliza. Proyectar también está disponible para orientarte en el proceso."
  },
  {
    q: "¿Puedo cancelar mi póliza antes de que venza?",
    a: "Sí. El reembolso se calcula de forma proporcional al tiempo no utilizado, según las condiciones de cada aseguradora."
  },
  {
    q: "¿Es seguro pagar en línea a través de Proyectar?",
    a: "Sí. El pago se procesa a través de canales seguros y certificados directamente con la aseguradora. Proyectar no almacena datos de tarjetas ni información financiera sensible."
  },
  {
    q: "¿Puedo renovar mi póliza a través de Proyectar?",
    a: "Sí. Cuando tu póliza esté próxima a vencer, te notificamos con anticipación para que puedas renovarla o comparar nuevas opciones."
  }
]

export function Faq() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-sm bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-primary/20">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Resolvemos tus dudas</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-white border border-slate-200 rounded-xl px-6 shadow-sm overflow-hidden">
                <AccordionTrigger className="text-left font-bold text-slate-900 hover:text-primary transition-colors py-6 text-base md:text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 font-medium leading-relaxed pb-6 text-[15px]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
