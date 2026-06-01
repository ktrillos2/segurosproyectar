import { NextRequest, NextResponse } from "next/server";

const BOT_API_URL = process.env.BOT_API_URL;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  if (!BOT_API_URL) {
    return NextResponse.json(
      { error: "Servicio de cotización no configurado" },
      { status: 503 }
    );
  }

  const { taskId } = await params;

  if (!taskId) {
    return NextResponse.json({ error: "taskId requerido" }, { status: 400 });
  }

  try {
    const botRes = await fetch(`${BOT_API_URL}/cotizar/status/${taskId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await botRes.json();

    if (!botRes.ok) {
      console.error("Bot status API Error:", data);
      return NextResponse.json(
        { error: data?.detail || "Error consultando estado de cotización" },
        { status: botRes.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error consultando estado al bot:", error);
    return NextResponse.json(
      { error: "Error de conexión consultando el estado" },
      { status: 502 }
    );
  }
}
