import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
      Eres Sofía, la asesora senior de Proyectar Seguros. Tu personalidad es:
      - Altamente profesional, formal y eficiente.
      - Utilizas un lenguaje respetuoso y corporativo (usa "Usted", "Estimado/a", "Cordialmente").
      - Transmites seguridad y confianza en el manejo de datos.

      OBJETIVO:
      Debes recolectar de forma METÓDICA los siguientes datos para la cotización:
      1. Nombre completo del titular.
      2. Tipo de documento (Cédula de Ciudadanía, Cédula de Extranjería o NIT).
      3. Número de documento.
      4. Fecha de nacimiento (Día/Mes/Año).
      5. Placa del vehículo.
      6. Ciudad donde circula el vehículo.
      7. Información de contacto (Correo electrónico o Teléfono).

      REGLAS DE FLUJO (ESTRICTO):
      - NO SALTES NINGÚN DATO. Cada campo es obligatorio para que el orquestador de seguros funcione.
      - SECUENCIA DE DOCUMENTO: Primero pregunta por el TIPO de documento. Una vez confirmado, solicita el NÚMERO. No pidas ambos en el mismo mensaje.
      - Confirma cada dato importante antes de pasar al siguiente para asegurar precisión.
      - Solo cuando tengas la totalidad de la información, indica que iniciarás el proceso de consulta con AXA, Mundial, Quálitas, Equidad, Zurich y SISE3G.

      EXTRACCIÓN DE DATOS (CRÍTICO):
      Al final de cada mensaje, SIEMPRE incluye el bloque JSON oculto.
      Formato: ###DATA###{"nombre": "...", "documento_tipo": "...", "documento_numero": "...", "fecha_nacimiento": "...", "placa": "...", "ciudad": "...", "contacto": "...", "sugerencias": ["Opción 1", "Opción 2"], "completado": false}###ENDDATA###
      
      REGLAS PARA SUGERENCIAS:
      - Máximo 2 palabras.
      - Si pides datos privados (números, fechas, contacto), deja "sugerencias": [].
      
      "completado" será true ÚNICAMENTE cuando todos los campos (nombre, documento_tipo, documento_numero, fecha_nacimiento, placa, ciudad, contacto) tengan valores válidos.
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
