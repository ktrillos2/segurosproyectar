const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const TOKEN = process.env.SANITY_API_TOKEN;

async function uploadVideo() {
  try {
    const filePath = path.join(__dirname, '../public/hero.mp4');
    const fileData = fs.readFileSync(filePath);

    console.log('Uploading video to Sanity...');
    const uploadRes = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-05-03/assets/files/${DATASET}?filename=hero.mp4`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'video/mp4'
      },
      body: fileData
    });

    const assetData = await uploadRes.json();
    if (!uploadRes.ok) throw new Error(assetData.message || 'Failed to upload asset');
    
    console.log('Video uploaded. Asset ID:', assetData.document._id);

    // Fetch hero document
    console.log('Fetching hero document...');
    const queryRes = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=*[_type=="hero"][0]`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    const queryData = await queryRes.json();
    const heroDoc = queryData.result;

    if (heroDoc) {
      console.log('Updating hero document with video asset...');
      const patchRes = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/mutate/${DATASET}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mutations: [
            {
              patch: {
                id: heroDoc._id,
                set: {
                  backgroundVideo: {
                    _type: 'file',
                    asset: {
                      _type: 'reference',
                      _ref: assetData.document._id
                    }
                  }
                }
              }
            }
          ]
        })
      });
      const patchData = await patchRes.json();
      if (!patchRes.ok) throw new Error('Failed to patch document');
      console.log('Hero document updated successfully!');
    } else {
      console.log('No hero document found. Please create one in the studio first.');
    }
  } catch (error) {
    console.error('Error uploading video:', error);
  }
}

uploadVideo();
