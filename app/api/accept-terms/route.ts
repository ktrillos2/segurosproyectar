import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    
    // Use IP from client if provided, otherwise fallback to headers
    let ip = body.ip || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'IP desconocida';
    
    // Format IPv6 localhost
    if (ip === '::1') {
      ip = '127.0.0.1 (Localhost)';
    }

    const userAgent = request.headers.get('user-agent') || 'Desconocido';
    const date = new Date().toISOString();

    // Create the document in Sanity
    // Ensure we are using the write token for this client instance
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
      useCdn: false, // write operations should bypass CDN
    });

    const result = await writeClient.create({
      _type: 'termAcceptance',
      ip,
      date,
      userAgent,
      status: 'Aceptado'
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Error recording terms acceptance:', error);
    return NextResponse.json(
      { error: 'Error interno al registrar aceptación' },
      { status: 500 }
    );
  }
}
