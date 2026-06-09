export const comparisonSections = [
  {
    title: "DATOS PRINCIPALES",
    rows: [
      { key: "product", label: "Plan / producto" },
      { key: "annualPremium", label: "Prima anual (IVA incluido)", format: "currency", highlight: true },
      { key: "monthlyPayment", label: "Cuota mensual estimada", format: "currency" },
      { key: "insuredVehicleValue", label: "Valor asegurado del vehículo", format: "currency" },
      { key: "quoteNumber", label: "N° de cotización" },
      { key: "validUntil", label: "Válida hasta" }
    ]
  },
  {
    title: "RESPONSABILIDAD CIVIL — SI LE HACES DAÑO A OTROS",
    rows: [
      { key: "rceGlobalLimit", label: "RCE — límite global", source: "coverages" },
      { key: "rceDeductible", label: "Deducible al pagar la RCE", source: "coverages" },
      { key: "thirdPartyPropertyDamage", label: "Daños a bienes de terceros", source: "coverages" },
      { key: "thirdPartyInjuryDeath", label: "Lesiones o muerte a personas", source: "coverages" }
    ]
  },
  {
    title: "DAÑOS Y HURTO DE TU CARRO",
    rows: [
      { key: "totalDamageDeductible", label: "Deducible pérdida total daños", source: "coverages" },
      { key: "partialDamageDeductible", label: "Deducible pérdida parcial daños", source: "coverages" },
      { key: "totalTheftDeductible", label: "Deducible pérdida total hurto", source: "coverages" },
      { key: "partialTheftDeductible", label: "Deducible pérdida parcial hurto", source: "coverages" },
      { key: "naturalEvents", label: "Eventos de la naturaleza (temblor, inundación)", source: "coverages" },
      { key: "patrimonialProtection", label: "Amparo patrimonial", source: "coverages" }
    ]
  },
  {
    title: "MOVILIDAD MIENTRAS ARREGLAN TU CARRO",
    rows: [
      { key: "replacementVehicleTotalLoss", label: "Vehículo de reemplazo — pérdida total", source: "coverages" },
      { key: "replacementVehiclePartialLoss", label: "Vehículo de reemplazo — pérdida parcial", source: "coverages" }
    ]
  },
  {
    title: "ASISTENCIAS Y BENEFICIOS",
    rows: [
      { key: "travelAssistance", label: "Asistencia en viaje", source: "coverages" },
      { key: "workshopCar", label: "Carro taller (pinchazo, varada)", source: "coverages" },
      { key: "chosenDriver", label: "Conductor elegido", source: "coverages" },
      { key: "legalAssistance", label: "Asistencia jurídica en tránsito", source: "coverages" },
      { key: "personalAccidents", label: "Accidentes personales en tránsito", source: "coverages" },
      { key: "towTruck", label: "Grúa por accidente o varada", source: "coverages" }
    ]
  }
];
