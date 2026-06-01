import { NextRequest, NextResponse } from "next/server";

const BOT_API_URL = process.env.BOT_API_URL;

export async function POST(req: NextRequest) {
  if (!BOT_API_URL) {
    console.error("BOT_API_URL no está configurada en .env.local");
    return NextResponse.json(
      { error: "Servicio de cotización no configurado" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();

    const botRes = await fetch(`${BOT_API_URL}/cotizar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await botRes.json();

    if (!botRes.ok) {
      console.error("Bot API Error:", data);
      return NextResponse.json(
        { error: data?.detail || "Error al iniciar cotización en el bot" },
        { status: botRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error conectando con el bot:", error);
    return NextResponse.json(
      { error: "Error de conexión con el servicio de cotización" },
      { status: 502 }
    );
  }
}
