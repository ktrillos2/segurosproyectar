import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const randomKey = () => crypto.randomBytes(6).toString('hex');

async function main() {
  console.log('Fetching legal pages...');
  const legalPages = await client.fetch(`*[_type == "legalPage"]`);
  
  for (const page of legalPages) {
    console.log(`\nProcessing page: ${page.title} (${page._id})`);
    if (!page.content || page.content.length !== 1) {
      console.log('  Skipping: Content already formatted or empty.');
      continue;
    }
    
    const text = page.content[0].children[0].text;
    const lines = text.split(/\n+/).map((l: string) => l.trim()).filter(Boolean);
    
    if (lines.length <= 1) {
      console.log('  Skipping: Not enough lines to format.');
      continue;
    }

    const newBlocks = lines.map((line: string) => {
      let style = 'normal';
      // Headings 19. Menores de edad...
      if (/^\d+\.\s/.test(line)) style = 'h2';
      // Main titles
      else if (line.includes('TÉRMINOS Y CONDICIONES DEL SERVICIO') || line.includes('POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES')) style = 'h1';
      
      return {
        _type: 'block',
        _key: randomKey(),
        style: style,
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: randomKey(),
            text: line,
            marks: []
          }
        ]
      };
    });

    console.log(`  Created ${newBlocks.length} formatted blocks. Saving...`);
    await client.patch(page._id).set({ content: newBlocks }).commit();
    console.log(`  Saved ${page.title}.`);
  }
  
  console.log('\nDone!');
}

main().catch(console.error);
