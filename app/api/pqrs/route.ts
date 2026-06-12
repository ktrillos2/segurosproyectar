import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, cedula, email, telefono, descripcion } = body;

    const contactEmail = process.env.NEXT_PUBLIC_PQRS_EMAIL || 'contactenos@seguros-proyectar.com';

    const htmlContent = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #1e3450; padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">Nueva Radicación PQRS</h1>
        </div>
        <div style="padding: 32px; color: #334155;">
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 1.5;">Se ha recibido una nueva solicitud de <strong>Petición, Queja, Reclamo o Sugerencia (PQRS)</strong> desde el sitio web.</p>
          
          <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 12px 0; font-size: 15px;"><strong>Nombre:</strong> ${nombre}</p>
            <p style="margin: 0 0 12px 0; font-size: 15px;"><strong>Cédula:</strong> ${cedula}</p>
            <p style="margin: 0 0 12px 0; font-size: 15px;"><strong>Correo:</strong> <a href="mailto:${email}" style="color: #0b5a92; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 16px 0; font-size: 15px;"><strong>Teléfono:</strong> ${telefono}</p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #cbd5e1;">
              <strong style="font-size: 15px;">Descripción de la solicitud:</strong>
              <div style="background-color: #ffffff; padding: 16px; border: 1px solid #e2e8f0; border-radius: 6px; margin-top: 12px; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #475569;">${descripcion}</div>
            </div>
          </div>
          
          <p style="margin: 0; font-size: 13px; color: #94a3b8; text-align: center;">Este es un correo generado automáticamente por el sistema de <strong>Seguros Proyectar</strong>.</p>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: 'Sistema PQRS <contacto@seguros-proyectar.com>',
      to: [contactEmail],
      replyTo: email,
      subject: 'Nueva Radicación PQRS Web - ' + nombre,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error enviando correo de PQRS con Resend:', error);
    return NextResponse.json({ error: error.message || 'Error al procesar la solicitud de PQRS' }, { status: 500 });
  }
}
