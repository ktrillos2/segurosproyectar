require('dotenv').config({ path: '.env.local' });
const { createClient } = require('next-sanity');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
});

const coveragesPaths = {
  ac1: 'public/Imagenes/Gastos de transporte.png', // Gastos de Transporte
  ac2: 'public/Imagenes/vidrios 1.png', // Vidrios
  ac3: 'public/Imagenes/llantas 1.png', // Llantas
  ac4: 'public/Imagenes/asistencia-juridica-1.png', // Asistencia Jurídica
  ac5: 'public/Imagenes/Accidentes personales 1.png' // Accidentes Personales
};

async function uploadImage(imagePath) {
  const absolutePath = path.resolve(process.cwd(), imagePath);
  if (!fs.existsSync(absolutePath)) {
     console.warn(`File not found: ${absolutePath}`);
     return null;
  }
  const fileStream = fs.createReadStream(absolutePath);
  const extension = path.extname(absolutePath).substring(1);
  const asset = await client.assets.upload('image', fileStream, {
    contentType: `image/${extension}`,
    filename: path.basename(absolutePath)
  });
  return asset._id;
}

async function main() {
  try {
    const coveragesPages = await client.fetch(`*[_type == "coveragesPage"]`);
    if (coveragesPages.length === 0) {
      console.log('No coveragesPage found');
      return;
    }
    const docId = coveragesPages[0]._id;
    
    // Upload images
    const assetIds = {};
    for (const [key, relativePath] of Object.entries(coveragesPaths)) {
      console.log(`Uploading ${relativePath}...`);
      const assetId = await uploadImage(relativePath);
      assetIds[key] = assetId;
    }
    
    // Patch document
    let patch = client.patch(docId);
    
    const { additionalCoverages = [] } = coveragesPages[0];
    
    const updatedAdd = additionalCoverages.map(item => {
      if (assetIds[item._key]) {
         return {
           ...item,
           icon: { _type: 'image', asset: { _type: 'reference', _ref: assetIds[item._key] } }
         };
      }
      return item;
    });
    
    patch = patch.set({
      additionalCoverages: updatedAdd
    });

    console.log('Committing changes to Sanity...');
    await patch.commit();
    console.log('Additional coverages images successfully uploaded and linked!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
