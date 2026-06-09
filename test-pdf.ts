import { generateQuoteComparisonPDF } from './utils/generate-pdf';
import * as fs from 'fs';

async function main() {
  const quoteResults = [
    {
      status: "ok",
      aseguradora: "Sura",
      vehiculo: {
        descripcion: "Mazda CX-5 Touring 2.0",
        placa: "XYZ123",
        modelo: "2023",
        codigo_fasecolda: "092348"
      },
      planes_disponibles: [
        {
          nombre: "Plan Global",
          prima_neta: 2500000,
          iva: 475000,
          total: 2975000,
          valor_asegurado: 110000000,
          amparos: [
            { nombre: "Responsabilidad Civil", valor: "3000 Millones", deducible: "0" },
            { nombre: "Pérdida Total Daños", valor: "100%", deducible: "10%" },
            { nombre: "Pérdida Parcial Daños", valor: "Cubierto", deducible: "1 SMLMV" },
            { nombre: "Vehículo de Reemplazo", valor: "15 Días", deducible: "0" },
            { nombre: "Asistencia en Viaje", valor: "Ilimitado", deducible: "0" }
          ]
        }
      ]
    },
    {
      status: "ok",
      aseguradora: "Allianz",
      vehiculo: {
        descripcion: "Mazda CX-5 Touring 2.0",
        placa: "XYZ123",
        modelo: "2023",
        codigo_fasecolda: "092348"
      },
      planes_disponibles: [
        {
          nombre: "Auto Plus",
          prima_neta: 2200000,
          iva: 418000,
          total: 2618000,
          valor_asegurado: 110000000,
          amparos: [
            { nombre: "Responsabilidad Civil", valor: "2000 Millones", deducible: "0" },
            { nombre: "Pérdida Total Daños", valor: "100%", deducible: "Sin Deducible" },
            { nombre: "Pérdida Parcial Daños", valor: "Cubierto", deducible: "900.000 COP" },
            { nombre: "Vehículo de Reemplazo", valor: "No Cubierto", deducible: "0" },
            { nombre: "Asistencia en Viaje", valor: "Nacional", deducible: "0" }
          ]
        }
      ]
    }
  ];

  const userInfo = {
    cliente: {
      nombre: "Carlos",
      apellidos: "Pérez",
      tipo_documento: "C.C.",
      numero_documento: "1010202030",
      celular: "3101234567",
      correo: "carlos.perez@ejemplo.com"
    }
  };

  const buffer = await generateQuoteComparisonPDF(quoteResults, userInfo);
  fs.writeFileSync('public/Test_Comparativo.pdf', Buffer.from(buffer as ArrayBuffer));
  console.log("PDF generado en public/Test_Comparativo.pdf");
}

main().catch(console.error);
