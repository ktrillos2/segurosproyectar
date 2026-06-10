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

async function uploadInsurerLogos() {
  console.log('--- Deleting existing insurerLogo documents ---')
  try {
    const existingIds = await client.fetch(`*[_type == "insurerLogo"]._id`)
    if (existingIds.length > 0) {
      for (const id of existingIds) {
        await client.delete(id)
        console.log(`Deleted existing logo document: ${id}`)
      }
    }
  } catch (e) {
    console.error('Error deleting existing documents:', e)
  }

  console.log('--- Uploading Insurer Logos ---')

  const logos = [
    { name: 'AXA Colpatria', path: 'logos/axa-colpatria.png', key: 'axa-colpatria' },
    { name: 'Zurich', path: 'logos/zurich.png', key: 'zurich' },
    { name: 'Quálitas', path: 'logos/qualitas.svg', key: 'qualitas' },
    { name: 'Equidad Seguros', path: 'logos/equidad.png', key: 'equidad' },
    { name: 'Seguros Mundial', path: 'logos/seguros-mudial.png', key: 'seguros-mundial' },
    { name: 'Seguros del Estado', path: 'logos/seguros-del-estado.png', key: 'seguros-del-estado' },
  ]

  for (const logo of logos) {
    const asset = await uploadImage(logo.path)
    if (asset) {
      try {
        const doc = await client.create({
          _type: 'insurerLogo',
          name: logo.name,
          logo: {
            ...asset,
            alt: `Logo de ${logo.name}`
          }
        })
        console.log(`Created document for ${logo.name} with ID ${doc._id}`)
      } catch (e) {
        console.error(`Failed to create document for ${logo.name}:`, e)
      }
    }
  }

  console.log('Done.')
}

uploadInsurerLogos()
