'use client';

import React from 'react';
import { AutoQuoteTemplate } from '../../components/pdf/AutoQuoteTemplate';
import { generateQuotePdf } from '../../lib/pdf/generatePdf';
import { AutoQuoteData } from '../../types/autoQuote';

const mockData: AutoQuoteData = {
  advisor: {
    name: "Proyectar Seguros",
    email: "autos@seguros-proyectar.com",
    website: "seguros-proyectar.com"
  },
  insured: {
    name: "Carlos Pérez",
    identification: "C.C. 1010202030",
    birthDate: "No especificada",
    gender: "No especificado",
    phone: "3101234567",
    email: "carlos.perez@ejemplo.com"
  },
  vehicle: {
    description: "Mazda CX-5 Touring 2.0",
    plate: "XYZ123",
    model: "2023",
    isZeroKm: false,
    use: "Particular",
    fasecolda: "092348",
    insuredValue: 110000000,
    accessoriesValue: 0,
    circulationCity: "Bogotá"
  },
  generatedAt: new Date().toLocaleDateString(),
  isDraft: true,
  showInternalPage: false,
  insurers: [
    {
      id: "qualitas-1",
      insurer: "Quálitas",
      product: "Amplia",
      annualPremium: 2100000,
      monthlyPayment: 175000,
      insuredVehicleValue: 110000000,
      coverages: {
        rceGlobalLimit: "2000 Millones",
        totalDamageDeductible: "100%",
        partialDamageDeductible: "1 SMLMV",
        replacementVehicleTotalLoss: "15 Días",
        travelAssistance: "Ilimitado"
      }
    },
    {
      id: "zurich-1",
      insurer: "Zurich",
      product: "Básico",
      annualPremium: 1950000,
      monthlyPayment: 162500,
      insuredVehicleValue: 110000000,
      coverages: {
        rceGlobalLimit: "1500 Millones",
        totalDamageDeductible: "100%",
        partialDamageDeductible: "10%",
        replacementVehicleTotalLoss: "No Cubierto",
        travelAssistance: "Nacional"
      }
    },
    {
      id: "equidad-1",
      insurer: "Equidad",
      product: "Full",
      annualPremium: 2300000,
      monthlyPayment: 191666,
      insuredVehicleValue: 110000000,
      coverages: {
        rceGlobalLimit: "3000 Millones",
        totalDamageDeductible: "100%",
        partialDamageDeductible: "1 SMLMV",
        replacementVehicleTotalLoss: "20 Días",
        travelAssistance: "Premium"
      }
    }
  ]
};

export default function TestPdfView() {
  const handleDownload = async () => {
    await generateQuotePdf(mockData);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Vista previa del PDF de Comparativo</h1>
          <button 
            onClick={handleDownload}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0052cc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Descargar PDF de Prueba
          </button>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
          <AutoQuoteTemplate data={mockData} />
        </div>
      </div>
    </div>
  );
}
