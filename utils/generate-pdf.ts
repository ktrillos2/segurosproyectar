import { generateQuotePdf } from '../lib/pdf/generatePdf';
import { AutoQuoteData, InsurerOption } from '../types/autoQuote';

export const generateQuoteComparisonPDF = async (quoteResults: any[], userInfo: any, logosMap?: Record<string, string>) => {
  const cliente = userInfo?.cliente || {};
  const vehiculoData = quoteResults.find(q => q.vehiculo)?.vehiculo || {};
  
  // Extraer información del asegurado
  const insured = {
    name: cliente.nombre ? `${cliente.nombre} ${cliente.apellidos || ""}` : "No especificado",
    identification: cliente.numero_documento ? `${cliente.tipo_documento || "C.C."} ${cliente.numero_documento}` : "No especificada",
    birthDate: cliente.fecha_nacimiento || "No especificada",
    gender: cliente.genero || "No especificado",
    phone: cliente.celular || "No especificado",
    email: cliente.correo || "No especificado",
  };

  // Extraer información del vehículo
  const vehicle = {
    description: vehiculoData.descripcion || `${vehiculoData.marca || ""} ${vehiculoData.linea || ""}`,
    plate: vehiculoData.placa || "Sin placa",
    model: vehiculoData.modelo || "-",
    isZeroKm: vehiculoData.cero_km || false,
    use: vehiculoData.uso || "Particular",
    fasecolda: vehiculoData.codigo_fasecolda || "-",
    insuredValue: quoteResults[0]?.plan_recomendado?.valor_asegurado || 0,
    accessoriesValue: vehiculoData.accesorios || 0,
    circulationCity: vehiculoData.ciudad_circulacion || "No especificada"
  };

  // Convertir quoteResults a InsurerOption[]
  const insurers: InsurerOption[] = [];
  
  quoteResults.filter(q => q.status === "ok").forEach((quote, index) => {
    let selectedPlan = quote.plan_recomendado;
    if (quote.planes_disponibles && quote.planes_disponibles.length > 0) {
      selectedPlan = quote.planes_disponibles.reduce((max: any, p: any) => 
        (p.total > max.total ? p : max), quote.planes_disponibles[0]);
    }
    const planes = selectedPlan ? [selectedPlan] : [];

    planes.forEach((p: any, pIndex: number) => {
      if (!p) return;
      
      const amparosArray = p.amparos || quote.amparos || [];
      const coveragesMap: any = {};
      
      // Mapeo básico de amparos para la tabla
      amparosArray.forEach((a: any) => {
        const nombreStr = a.nombre.toLowerCase();
        let val = a.valor || true;
        if (a.deducible && a.deducible !== "0" && a.deducible !== "0%" && a.deducible.toLowerCase() !== "sin deducible") {
          val = `${val} (Ded: ${a.deducible})`;
        }
        
        if (nombreStr.includes('responsabilidad civil')) {
          coveragesMap.rceGlobalLimit = val;
        } else if (nombreStr.includes('pérdida total daños') || nombreStr.includes('perdida total daños') || nombreStr.includes('pérdida total del vehículo por daños')) {
          coveragesMap.totalDamageDeductible = val;
        } else if (nombreStr.includes('pérdida parcial daños') || nombreStr.includes('perdida parcial daños') || nombreStr.includes('pérdida parcial del vehículo por daños')) {
          coveragesMap.partialDamageDeductible = val;
        } else if (nombreStr.includes('pérdida total hurto') || nombreStr.includes('perdida total hurto') || nombreStr.includes('pérdida total del vehículo por hurto')) {
          coveragesMap.totalTheftDeductible = val;
        } else if (nombreStr.includes('pérdida parcial hurto') || nombreStr.includes('perdida parcial hurto') || nombreStr.includes('pérdida parcial del vehículo por hurto')) {
          coveragesMap.partialTheftDeductible = val;
        } else if (nombreStr.includes('eventos de la naturaleza') || nombreStr.includes('terremoto') || nombreStr.includes('temblor')) {
          coveragesMap.naturalEvents = val;
        } else if (nombreStr.includes('amparo patrimonial')) {
          coveragesMap.patrimonialProtection = val;
        } else if (nombreStr.includes('vehículo de reemplazo') || nombreStr.includes('vehiculo de reemplazo') || nombreStr.includes('gastos de transporte pérdida total') || nombreStr.includes('gastos de transporte por pérdida total')) {
          coveragesMap.replacementVehicleTotalLoss = val;
        } else if (nombreStr.includes('gastos de transporte pérdida parcial') || nombreStr.includes('gastos de transporte por pérdida parcial')) {
          coveragesMap.replacementVehiclePartialLoss = val;
        } else if (nombreStr.includes('asistencia en viaje') || nombreStr.includes('asistencias') || nombreStr.includes('asistencia total') || nombreStr.includes('asistencia esencial') || nombreStr.includes('asistencia estándar')) {
          coveragesMap.travelAssistance = val;
        } else if (nombreStr.includes('conductor elegido')) {
          coveragesMap.chosenDriver = val;
        } else if (nombreStr.includes('carro taller')) {
          coveragesMap.workshopCar = val;
        } else if (nombreStr.includes('grúa') || nombreStr.includes('grua')) {
          coveragesMap.towTruck = val;
        } else {
          coveragesMap[a.nombre] = val; // amparo no mapeado
        }
      });

      insurers.push({
        id: `${quote.aseguradora}-${index}-${pIndex}`,
        insurer: quote.aseguradora,
        product: p.nombre || "Estándar",
        quoteNumber: quote.raw?.numero_cotizacion || undefined,
        validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
        annualPremium: p.total?.valor || p.total || 0,
        monthlyPayment: Math.round((p.total?.valor || p.total || 0) / 12),
        insuredVehicleValue: p.valor_asegurado || quote.plan_recomendado?.valor_asegurado || vehicle.insuredValue,
        coverages: coveragesMap
      });
    });
  });

  const data: AutoQuoteData = {
    advisor: {
      name: "Proyectar Seguros",
      email: "autos@seguros-proyectar.com",
      website: "seguros-proyectar.com"
    },
    insured,
    vehicle,
    insurers,
    generatedAt: new Date().toLocaleDateString(),
    isDraft: false,
    showInternalPage: true, // Puedes cambiarlo a false en producción
    logosMap
  };

  await generateQuotePdf(data);
};
