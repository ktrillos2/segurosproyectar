import { NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID || process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Número de teléfono requerido" }, { status: 400 });
    }

    // Asegurar formato internacional (asumimos Colombia +57 por defecto si no lo tiene)
    let formattedPhone = phone.toString().replace(/\s+/g, "");
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+57" + formattedPhone;
    }

    // Generar OTP de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Guardar en memoria por 5 minutos
    otpStore.set(formattedPhone, {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutos
    });

    // Enviar SMS con Twilio usando el Messaging Service (o fallback al número)
    const messageOptions: any = {
      body: `Tu código de verificación para Proyectar Seguros es: ${code}. Válido por 5 minutos.`,
      to: formattedPhone
    };

    if (messagingServiceSid?.startsWith("MG")) {
      messageOptions.messagingServiceSid = messagingServiceSid;
    } else {
      messageOptions.from = messagingServiceSid;
    }

    const message = await client.messages.create(messageOptions);
    console.log("SMS enviado exitosamente. SID del mensaje:", message.sid);

    return NextResponse.json({ success: true, formattedPhone, messageId: message.sid });
  } catch (error: any) {
    console.error("Twilio Send Error:", error);
    return NextResponse.json({ error: "Error enviando SMS: " + error.message }, { status: 500 });
  }
}
