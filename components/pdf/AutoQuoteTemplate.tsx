import React from 'react';
import { AutoQuoteData } from '../../types/autoQuote';
import { PdfHeader, InfoBar } from './PdfHeader';
import { PdfFooter, Watermark } from './PdfFooter';
import { ComparisonTable } from './ComparisonTable';
import '../../styles/pdf-auto-quote.css';

interface AutoQuoteTemplateProps {
  data: AutoQuoteData;
}

export function AutoQuoteTemplate({ data }: AutoQuoteTemplateProps) {
  // Sort insurers by annual premium (lowest first)
  const sortedInsurers = [...data.insurers].sort(
    (a, b) => a.annualPremium - b.annualPremium
  );

  const cheapestInsurer = sortedInsurers[0];
  
  const summaryText = data.summaryText || 
    `En resumen: la opción de ${cheapestInsurer?.insurer} — ${cheapestInsurer?.product} es la de menor prima y ofrece una excelente cobertura sobre el valor asegurado.`;

  const legalText = data.legalText || 
    "Importante: esta cotización es de carácter informativo y no implica aceptación del riesgo por parte de las aseguradoras. El valor del vehículo proviene de la guía Fasecolda vigente. Las coberturas, valores y deducibles definitivos son los de la póliza emitida y el clausulado de cada compañía, sujetos a inspección y a las políticas de suscripción. Las primas incluyen IVA. La vigencia de cada oferta depende de cada aseguradora.";

  return (
    <div className="pdf-container" id="pdf-container-element">
      <div className="pdf-page">
        {data.isDraft && <Watermark />}
        
        <div className="pdf-content">
          <PdfHeader advisor={data.advisor} />
          <InfoBar insured={data.insured} vehicle={data.vehicle} />
          
          <div className="intro-title">Estas son las mejores opciones para tu seguro de carro:</div>
          
          <ComparisonTable insurers={sortedInsurers} />
          
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

      {data.showInternalPage && (
        <div className="pdf-page">
          <div className="pdf-content">
            <div className="header">
              <img src="/logo.png" alt="Proyectar Seguros" className="logo" />
              <div className="header-right">
                <div className="quote-badge" style={{ backgroundColor: '#607d8b' }}>INTERNO</div>
              </div>
            </div>
            
            <div className="intro-title">Guía de mapeo — ajuste del comparativo de autos</div>
            
            <div className="summary-box" style={{ borderLeftColor: '#607d8b' }}>
              Este PDF es un borrador de maqueta. La tabla siguiente indica de qué campo de la respuesta de cada bot (Quálitas, AXA, Equidad, Seguros del Estado, Zurich) debe alimentarse cada fila. Mundial aún no está integrado: dejar la columna preparada pero oculta hasta que exista el bot.
            </div>
          </div>
          
          <PdfFooter generatedAt={data.generatedAt} />
        </div>
      )}
    </div>
  );
}
