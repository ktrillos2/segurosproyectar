import React from 'react';
import { AutoQuoteData } from '../../types/autoQuote';
import { PdfHeader, InfoBar } from './PdfHeader';
import { PdfFooter, Watermark } from './PdfFooter';
import { ComparisonTable } from './ComparisonTable';
import { comparisonSections } from '../../lib/pdf/comparisonSections';
import '../../styles/pdf-auto-quote.css';

interface AutoQuoteTemplateProps {
  data: AutoQuoteData;
}

export function AutoQuoteTemplate({ data }: AutoQuoteTemplateProps) {
  // Sort insurers by annual premium (highest first) and take the top 3 most expensive
  const sortedInsurers = [...data.insurers]
    .sort((a, b) => b.annualPremium - a.annualPremium)
    .slice(0, 3);

  const cheapestInsurer = sortedInsurers[0];
  
  const summaryText = data.summaryText || 
    `En resumen: la opción de ${cheapestInsurer?.insurer} — ${cheapestInsurer?.product} es la opción premium con la cobertura más completa y exclusiva para tu vehículo.`;

  const legalText = data.legalText || 
    "Importante: esta cotización es de carácter informativo y no implica aceptación del riesgo por parte de las aseguradoras. El valor del vehículo proviene de la guía Fasecolda vigente. Las coberturas, valores y deducibles definitivos son los de la póliza emitida y el clausulado de cada compañía, sujetos a inspección y a las políticas de suscripción. Las primas incluyen IVA. La vigencia de cada oferta depende de cada aseguradora.";

  // Dividir las secciones en dos páginas para no desbordar
  const page1Sections = comparisonSections.slice(0, 2);
  const page2Sections = comparisonSections.slice(2);

  return (
    <div className="pdf-container" id="pdf-container-element">
      {/* PÁGINA 1 */}
      <div className="pdf-page">
        <div className="pdf-content">
          <PdfHeader advisor={data.advisor} />
          <InfoBar insured={data.insured} vehicle={data.vehicle} />
          
          <div className="intro-title">Estas son las mejores opciones para tu seguro de carro (Página 1/2):</div>
          
          <ComparisonTable insurers={sortedInsurers} sections={page1Sections} logosMap={data.logosMap} />
        </div>
      </div>

      {/* PÁGINA 2 */}
      <div className="pdf-page">
        <div className="pdf-content">
          <div className="intro-title" style={{ marginTop: 0 }}>Continuación opciones de seguro (Página 2/2):</div>
          
          <ComparisonTable insurers={sortedInsurers} sections={page2Sections} logosMap={data.logosMap} />
          
          <div className="summary-box">
            <strong>Conclusión comercial:</strong><br />
            {summaryText}
          </div>
          
          <div className="legal-note">
            {legalText}
          </div>
        </div>
        
        <PdfFooter generatedAt={data.generatedAt} />
      </div>

    </div>
  );
}
