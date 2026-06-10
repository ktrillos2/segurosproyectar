import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { client } from '@/sanity/lib/client';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { userInfo, quoteResult } = await request.json();

    if (!userInfo || !userInfo.cliente || !userInfo.cliente.correo) {
      return NextResponse.json({ error: 'Faltan datos del cliente' }, { status: 400 });
    }

    // Fetch config for the company contact email
    const globalConfig = await client.fetch(`*[_type == "globalConfig"][0]`);
    const contactEmail = globalConfig?.contactEmail || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'autos@seguros-proyectar.com';

    const formatMoney = (val: any) => {
      if (typeof val === 'number') {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
      }
      return val || "$0";
    };

    const planName = quoteResult?.plan_recomendado?.nombre || 'Plan Estándar';
    const planTotal = quoteResult?.plan_recomendado?.total ? formatMoney(quoteResult.plan_recomendado.total) : 'N/A';

    // 1. Email to the Company (Advisor)
    const companyHtml = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #0b5a92; padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">Nueva Solicitud de Asesoría</h1>
        </div>
        <div style="padding: 32px; color: #334155;">
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 1.5;">Un cliente ha solicitado asistencia de un experto para una cotización de <strong>${quoteResult?.aseguradora || 'Aseguradora'}</strong>.</p>
          
          <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
            <h3 style="margin-top: 0; color: #0b5a92;">Datos del Cliente</h3>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Nombre:</strong> ${userInfo.cliente.nombre}</p>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Cédula:</strong> ${userInfo.cliente.numero_documento}</p>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Celular:</strong> ${userInfo.cliente.celular}</p>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Email:</strong> ${userInfo.cliente.correo}</p>
            
            <h3 style="margin-top: 20px; color: #0b5a92;">Vehículo de Interés</h3>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Placa:</strong> ${userInfo.vehiculo?.placa || 'No registrada'}</p>
            
            <h3 style="margin-top: 20px; color: #0b5a92;">Cotización Seleccionada</h3>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Aseguradora:</strong> ${quoteResult?.aseguradora}</p>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Plan:</strong> ${planName}</p>
            <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Valor Cotizado:</strong> ${planTotal}</p>
          </div>
          
          <p style="margin: 0; font-size: 13px; color: #94a3b8; text-align: center;">Este es un correo generado automáticamente por el sistema de <strong>Seguros Proyectar</strong>.</p>
        </div>
      </div>
    `;

    // 2. Email to the User
    const userHtml = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #10b981; padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">¡Hemos recibido tu solicitud!</h1>
        </div>
        <div style="padding: 32px; color: #334155;">
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 1.5;">Hola <strong>${userInfo.cliente.nombre}</strong>,</p>
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 1.5;">Hemos notificado a nuestro equipo de expertos sobre tu interés en la cotización con <strong>${quoteResult?.aseguradora || 'la aseguradora'}</strong>.</p>
          
          <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e2e8f0; text-align: center;">
            <p style="margin: 0 0 12px 0; font-size: 16px;"><strong>Un especialista se pondrá en contacto contigo muy pronto</strong> al número que nos proporcionaste (${userInfo.cliente.celular}) para brindarte toda la información y resolver cualquier duda que tengas.</p>
          </div>
          
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 1.5;">Gracias por confiar en <strong>Seguros Proyectar</strong>.</p>
          <p style="margin: 0; font-size: 13px; color: #94a3b8; text-align: center;">Este correo es autogenerado, por favor no respondas a este mensaje.</p>
        </div>
      </div>
    `;

    // Enviar correos en paralelo
    await Promise.all([
      resend.emails.send({
        from: 'Notificaciones Proyectar <contacto@seguros-proyectar.com>',
        to: [contactEmail],
        replyTo: userInfo.cliente.correo,
        subject: `Nueva Solicitud de Asesoría - ${userInfo.cliente.nombre}`,
        html: companyHtml,
      }),
      resend.emails.send({
        from: 'Seguros Proyectar <contacto@seguros-proyectar.com>',
        to: [userInfo.cliente.correo],
        subject: 'Tu solicitud de asesoría está en proceso',
        html: userHtml,
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error enviando notificaciones de asesoría:', error);
    return NextResponse.json({ error: error.message || 'Error al procesar la solicitud' }, { status: 500 });
  }
}
