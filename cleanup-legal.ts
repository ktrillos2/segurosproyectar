import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function main() {
  console.log('Fetching legal pages...');
  const legalPages = await client.fetch(`*[_type == "legalPage"]`);
  
  for (const page of legalPages) {
    if (!page.content || page.content.length === 0) continue;
    
    console.log(`\nProcessing page: ${page.title}`);
    
    const newContent = [...page.content];
    let removed = 0;

    // Check first 3 blocks for redundancies
    while (newContent.length > 0) {
      const block = newContent[0];
      const text = block.children?.map((c: any) => c.text).join('') || '';
      const textUpper = text.toUpperCase();
      
      // Remove if it's the exact title
      if (textUpper === page.title?.toUpperCase() || textUpper.includes('TÉRMINOS Y CONDICIONES DEL SERVICIO') || textUpper.includes('POLÍTICA DE TRATAMIENTO')) {
        console.log(`  Removing title block: "${text}"`);
        newContent.shift();
        removed++;
        continue;
      }
      
      // Remove if it's the subtitle "Proyectar Administradores..."
      if (text.includes('Proyectar Administradores de Seguros Ltda.') && text.includes('Bogotá')) {
        console.log(`  Removing subtitle block: "${text}"`);
        newContent.shift();
        removed++;
        continue;
      }

      // If neither matched, we assume the rest of the text is actual content
      break;
    }

    if (removed > 0) {
      console.log(`  Removed ${removed} redundant blocks. Saving...`);
      await client.patch(page._id).set({ content: newContent }).commit();
      console.log(`  Saved.`);
    } else {
      console.log(`  No redundant blocks found at the beginning.`);
    }
  }
  
  console.log('\nDone!');
}

main().catch(console.error);
