import { createClient } from 'next-sanity'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function uploadImage(filePath: string) {
  const fullPath = path.join(__dirname, '..', 'public', filePath)
  console.log(`Uploading ${fullPath}...`)
  try {
    const fileContent = fs.readFileSync(fullPath)
    const asset = await client.assets.upload('image', fileContent, {
      filename: path.basename(filePath)
    })
    console.log(`Uploaded ${filePath} -> ${asset._id}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error)
    return null
  }
}

async function seed() {
  console.log('Seeding Sanity Data...')

  // 1. Upload Images
  console.log('--- Uploading Images ---')
  const heroGif = await uploadImage('Gif/gif-proyectar.gif')
  
  const logos = [
    { name: 'AXA Colpatria', path: 'logos/axa-colpatria.png' },
    { name: 'Zurich', path: 'logos/zurich.png' },
    { name: 'Quálitas', path: 'logos/qualitas.svg' },
    { name: 'Equidad Seguros', path: 'logos/equidad.png' },
    { name: 'Seguros Mundial', path: 'logos/seguros-mudial.png' },
    { name: 'Seguros del Estado', path: 'logos/seguros-del-estado.png' },
  ]
  
  const uploadedLogos = []
  for (const logo of logos) {
    const asset = await uploadImage(logo.path)
    if (asset) {
      uploadedLogos.push({
        _key: Math.random().toString(36).substring(7),
        name: logo.name,
        logo: asset
      })
    }
  }

  const step1Img = await uploadImage('Imagenes/cotiza 1.png')
  const step2Gif = await uploadImage('Gif/comparacion.gif')
  const step3Img = await uploadImage('Imagenes/elige.png')
  const step4Gif = await uploadImage('Gif/activacion.gif')

  // 2. Create Documents
  console.log('--- Creating Documents ---')

  const heroDoc = {
    _type: 'hero',
    title: 'Seguros claros, rápidos y sin enredos.',
    titleHighlight: 'sin enredos.',
    description: 'Cotiza, compara y activa tu seguro de vehículo en minutos. Sin papelería. Sin filas. Sin llamadas',
    buttonText: 'Cotizar mi seguro',
    buttonLink: '/cotizar',
    features: ['100% online', 'Sin papeleos', '+20 años de trayectoria'],
    heroImage: heroGif,
    insurersTitle: 'Respaldados por las mejores aseguradoras de Colombia',
    insurers: uploadedLogos
  }

  const howItWorksDoc = {
    _type: 'howItWorks',
    badge: 'Proceso',
    title: 'Tu seguro en 4 pasos simples.',
    titleHighlight: 'simples.',
    steps: [
      {
        _key: Math.random().toString(36).substring(7),
        icon: 'ph:file-text-light',
        title: 'COTIZA',
        description: 'Ingresa los datos de tu vehículo en minutos',
        visual: step1Img,
        isGif: false,
        isIconOnly: false
      },
      {
        _key: Math.random().toString(36).substring(7),
        icon: 'ph:scales-light',
        title: 'COMPARA',
        description: 'Ve las opciones de 6 aseguradoras lado a lado',
        visual: step2Gif,
        isGif: true,
        isIconOnly: false
      },
      {
        _key: Math.random().toString(36).substring(7),
        icon: 'ph:hand-pointing-light',
        title: 'ELIGE',
        description: 'Selecciona la cobertura que más te conviene',
        visual: step3Img,
        isGif: false,
        isIconOnly: true
      },
      {
        _key: Math.random().toString(36).substring(7),
        icon: 'ph:check-circle-light',
        title: 'ACTIVA',
        description: 'Paga y recibe tu póliza al instante',
        visual: step4Gif,
        isGif: true,
        isIconOnly: false
      }
    ]
  }

  const differentiatorsDoc = {
    _type: 'differentiators',
    badge: 'Diferenciadores',
    title: '¿Por qué asegurarte con Proyectar?',
    titleHighlight: 'Proyectar?',
    items: [
      {
        _key: Math.random().toString(36).substring(7),
        icon: 'ph:rocket-light',
        title: 'Rápido',
        description: 'De la cotización a la póliza en minutos'
      },
      {
        _key: Math.random().toString(36).substring(7),
        icon: 'ph:magnifying-glass-light',
        title: 'Transparente',
        description: 'Ves todo antes de pagar, sin letras pequeñas'
      },
      {
        _key: Math.random().toString(36).substring(7),
        icon: 'ph:shield-check-light',
        title: 'Respaldado',
        description: '+20 años de trayectoria y 6 aseguradoras aliadas'
      },
      {
        _key: Math.random().toString(36).substring(7),
        icon: 'ph:device-mobile-light',
        title: '100% Digital',
        description: 'Desde el celular, sin visitas ni llamadas'
      },
      {
        _key: Math.random().toString(36).substring(7),
        icon: 'ph:currency-circle-dollar-light',
        title: 'Precio justo',
        description: 'Comparamos para que siempre pagues lo correcto'
      },
      {
        _key: Math.random().toString(36).substring(7),
        icon: 'ph:lightning-light',
        title: 'Sin enredos',
        description: 'Simple como debe ser'
      }
    ]
  }

  const globalConfigDoc = {
    _type: 'globalConfig',
    instagramUrl: 'https://www.instagram.com/proyectarsegurosoficial?igsh=MW8zMXB1dGVsMW8ybA%3D%3D&utm_source=qr',
    tiktokUrl: 'https://www.tiktok.com/@proyectarsegurosoficial',
    facebookUrl: 'https://www.facebook.com/share/18SKTbyy6H/?mibextid=wwXIfr',
    footerCtaTitle: '¿Listo para asegurar tu vehículo sin enredos?',
    footerCtaTitleHighlight: 'sin enredos?',
    footerCtaDescription: 'Cotiza gratis en menos de 3 minutos y encuentra la mejor opción para ti.',
    footerCtaButtonText: 'Cotizar mi seguro',
    footerCtaButtonLink: '/cotizar',
    companyName: 'Proyectar Seguros S.A.S.',
    nit: '830139875-7'
  }

  try {
    await client.create(heroDoc)
    await client.create(howItWorksDoc)
    await client.create(differentiatorsDoc)
    await client.create(globalConfigDoc)
    console.log('Successfully seeded all documents!')
  } catch (error) {
    console.error('Failed to create documents:', error)
  }
}

seed()
