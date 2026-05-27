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
  mc1: 'public/Imagenes/Responsabilidad civil 1.png', // RESPONSABILIDAD CIVIL
  mc2: 'public/Imagenes/danos.png', // DAÑOS Y COLISIÓN
  mc3: 'public/Imagenes/hurto 1.png', // HURTO
  cc1: 'public/Imagenes/Asistencia 1.png', // ASISTENCIA 24/7
  cc2: 'public/Imagenes/vehiculo-de-reemplazo.png', // VEHÍCULO DE REEMPLAZO
  cc3: 'public/Imagenes/Deducibles 1.png' // DEDUCIBLES
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
    
    const { mainCoverages = [], complementaryCoverages = [] } = coveragesPages[0];
    
    // update mainCoverages
    const updatedMain = mainCoverages.map(item => {
      if (assetIds[item._key]) {
         return {
           ...item,
           icon: { _type: 'image', asset: { _type: 'reference', _ref: assetIds[item._key] } }
         };
      }
      return item;
    });

    const updatedComp = complementaryCoverages.map(item => {
      if (assetIds[item._key]) {
         return {
           ...item,
           icon: { _type: 'image', asset: { _type: 'reference', _ref: assetIds[item._key] } }
         };
      }
      return item;
    });
    
    patch = patch.set({
      mainCoverages: updatedMain,
      complementaryCoverages: updatedComp
    });

    console.log('Committing changes to Sanity...');
    await patch.commit();
    console.log('Coverages images successfully uploaded and linked!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
