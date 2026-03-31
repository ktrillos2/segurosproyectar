import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const lato = Lato({ 
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: '--font-lato'
});

export const metadata: Metadata = {
  title: 'Proyectar Seguros | Seguro de vehículo 100% digital',
  description: 'Cotiza, compara y emite tu seguro de vehículo 100% en línea. Somos una compañía con más de 30 años de experiencia en el sector asegurador en Colombia.',
  keywords: 'seguros, seguro de vehículo, seguro todo riesgo, proyectar seguros, cotizar seguro, seguro de auto, Colombia, seguro digital',
  authors: [{ name: 'Proyectar Seguros S.A.S.' }],
  creator: 'Proyectar Seguros S.A.S.',
  openGraph: {
    title: 'Proyectar Seguros | Seguro de vehículo 100% en línea',
    description: 'Cotiza, compara y emite tu seguro de vehículo rápida y fácilmente. Proyectar Seguros, tu aliado en protección.',
    siteName: 'Proyectar Seguros',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Proyectar Seguros Logo',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyectar Seguros | Seguro de vehículo 100% digital',
    description: 'Cotiza y emite tu seguro de vehículo en línea al instante.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${lato.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
