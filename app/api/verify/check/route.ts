import { NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json();

    if (!phone || !code) {
      return NextResponse.json({ error: "Teléfono y código requeridos" }, { status: 400 });
    }

    // Asegurar formato internacional para buscar en el store (al igual que al enviar)
    let formattedPhone = phone.toString().replace(/\s+/g, "");
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+57" + formattedPhone;
    }

    const record = otpStore.get(formattedPhone);

    if (!record) {
      return NextResponse.json({ error: "Código no encontrado o ha expirado" }, { status: 400 });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(formattedPhone);
      return NextResponse.json({ error: "El código ha expirado" }, { status: 400 });
    }

    if (record.code !== code.toString().trim()) {
      return NextResponse.json({ error: "Código incorrecto" }, { status: 400 });
    }

    // Validado exitosamente
    otpStore.delete(formattedPhone);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Verify Error:", error);
    return NextResponse.json({ error: "Error verificando código" }, { status: 500 });
  }
}
