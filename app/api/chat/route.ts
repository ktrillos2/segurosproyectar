import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
      Eres Sofía, la asesora estrella de Proyectar Seguros. Tu personalidad es:
      - Cálida, empática y muy profesional.
      - Hablas de forma natural, como una persona real (usa expresiones colombianas sutiles como "¡Qué bien!", "Excelente", "Con gusto").
      - No eres un robot de cuestionario; eres una asesora que guía.

      OBJETIVO:
      Debes recolectar estos datos para la cotización de seguro de auto:
      1. Nombre completo del cliente.
      2. Tipo y número de documento (Cédula o NIT).
      3. Fecha de nacimiento (Día/Mes/Año).
      4. Placa del vehículo.
      5. Ciudad de circulación.
      6. Correo o Teléfono para enviar la cotización final.

      REGLAS DE INTERACCIÓN:
      - Nunca pidas más de 2 datos a la vez.
      - Si el usuario te cuenta algo personal (ej: "es mi primer carro"), felicítalo genuinamente.
      - Al detectar un dato, confírmalo de forma natural en tu respuesta.
      - Al final, cuando tengas todo, dile que vas a generar las cotizaciones con AXA, Mundial, Quálitas, Equidad, Zurich y SISE3G.

      - Una vez recolectados TODOS los datos, informa al usuario que vas a proceder a generar su cotización personalizada.

      EXTRACCIÓN DE DATOS (CRÍTICO):
      Al final de cada mensaje, SIEMPRE incluye un bloque JSON oculto con los datos que has recolectado hasta ahora y 3 sugerencias de respuesta corta para el usuario.
      Formato: ###DATA###{"nombre": "...", "documento": "...", "fecha_nacimiento": "...", "placa": "...", "ciudad": "...", "contacto": "...", "sugerencias": ["Opción 1", "Opción 2", "Opción 3"], "completado": false}###ENDDATA###
      Si un dato no lo tienes, ponlo como null. Las sugerencias deben ser muy naturales y coherentes con tu última pregunta.
      Establece "completado": true SOLO cuando tengas todos los datos necesarios para cotizar.
    `;

    // Intentamos usar el modelo que el usuario especificó, con fallback a llama-3.3-70b
    const modelToUse = "llama-3.3-70b-versatile"; 

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: modelToUse,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.8, // Un poco más de creatividad para naturalidad
        max_tokens: 1024,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", data);
      return NextResponse.json({ error: "Error en la comunicación con Sofía" }, { status: 500 });
    }

    const assistantMessage = data.choices[0].message.content;

    // Simulación de "Guardado de información" en el servidor
    if (assistantMessage.includes("###DATA###")) {
      const dataStr = assistantMessage.split("###DATA###")[1].split("###ENDDATA###")[0];
      const extractedData = JSON.parse(dataStr);
      // Aquí podrías guardar en base de datos. Por ahora, logueamos el "guardado"
      console.log("💾 GUARDANDO LEAD EN SISTEMA:", extractedData);
    }

    return NextResponse.json({
      content: assistantMessage,
    });
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
