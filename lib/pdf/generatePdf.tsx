import React from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AutoQuoteData } from '../../types/autoQuote';
import { AutoQuoteTemplate } from '../../components/pdf/AutoQuoteTemplate';

/**
 * Generates a PDF directly in the browser by rendering the React template
 * into a hidden div, capturing it with html2canvas, and saving it with jsPDF.
 */
export async function generateQuotePdf(data: AutoQuoteData): Promise<void> {
  if (typeof document === 'undefined') return;

  // Create a hidden container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.top = '-9999px';
  container.style.left = '-9999px';
  container.style.width = '1123px'; // A4 width in px at 96 dpi
  document.body.appendChild(container);

  try {
    // Render the React component into the container
    const root = createRoot(container);
    
    await new Promise<void>((resolve) => {
      root.render(<AutoQuoteTemplate data={data} />);
      // Wait for render and images to load
      setTimeout(resolve, 1500);
    });

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1123, 890] // Increased height
    });

    const pages = container.querySelectorAll('.pdf-page');

    for (let i = 0; i < pages.length; i++) {
      const pageEl = pages[i] as HTMLElement;
      
      const canvas = await html2canvas(pageEl, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      
      if (i > 0) {
        pdf.addPage();
      }
      
      pdf.addImage(imgData, 'PNG', 0, 0, 1123, 890);
    }

    pdf.save('Cotizacion_Autos_Proyectar.pdf');
    root.unmount();
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Hubo un error al generar el PDF.");
  } finally {
    // Cleanup
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
