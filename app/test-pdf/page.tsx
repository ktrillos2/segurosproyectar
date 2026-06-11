"use client"
import { useEffect, useState } from "react"
import { generateQuoteComparisonPDF } from "@/utils/generate-pdf"

// Datos de prueba basados en la cotización real del bot
const mockRawResults = [
  {
    "aseguradora": "Estado",
    "estado": "Cotización generada correctamente",
    "cotizacion_seleccionada": {
      "orden": 3,
      "nombre": "SEGURO CLASICO PARA CARRO",
      "total": "$1.466.171,47",
      "prima": "$1.232.076,86",
      "impuesto": "$234.094,60",
      "prima_total": "$1.466.171,47",
      "seleccionado": true,
      "amparos": [
        { "nombre": "Asistencia Jurídica", "valor": "ILIMITADA" },
        { "nombre": "Daños de Mayor Cuantia", "valor": "$122.100.000" },
        { "nombre": "Daños de Menor Cuantia", "valor": "$122.100.000" },
        { "nombre": "Hurto de Mayor Cuantía", "valor": "$122.100.000" },
        { "nombre": "Hurto de Menor Cuantía", "valor": "$122.100.000" },
        { "nombre": "Protección Patrimonial", "valor": "SI AMPARA" },
        { "nombre": "Gastos Transporte Daños y Hurto Mayor Cuantia", "valor": "2 SMDLV X 30 DIAS" },
        { "nombre": "Accidentes Personales", "valor": "20 MILL MAX (100 MILL)" }
      ],
      "adicional": [
        { "nombre": "Asistencia en Viajes", "valor": "SI AMPARA" },
        { "nombre": "Vehiculo de Reemplazo", "valor": "SI AMPARA" },
        { "nombre": "Conductor Elegido", "valor": "SI AMPARA" },
        { "nombre": "Grua por Accidente", "valor": "SI AMPARA" },
        { "nombre": "Grua por Averia", "valor": "SI AMPARA" },
        { "nombre": "Carro Taller", "valor": "SI AMPARA" },
        { "nombre": "Vidrios", "valor": "-" },
        { "nombre": "Llaves", "valor": "-" }
      ],
      "responsabilidad_civil_extracontractual": [
        { "nombre": "Responsabilidad Civil Extracontractual", "valor": "3.000.000.000" }
      ]
    },
    "cotizaciones": [
      {
        "orden": 1,
        "nombre": "SEGURO ELITE PARA CARRO",
        "total": "$1.816.945,91",
        "prima": "$1.526.845,30",
        "impuesto": "$290.100,61",
        "prima_total": "$1.816.945,91",
        "amparos": [
          { "nombre": "Asistencia Jurídica", "valor": "ILIMITADA" },
          { "nombre": "Daños de Mayor Cuantia", "valor": "$122.100.000" },
          { "nombre": "Daños de Menor Cuantia", "valor": "$122.100.000" },
          { "nombre": "Hurto de Mayor Cuantía", "valor": "$122.100.000" },
          { "nombre": "Hurto de Menor Cuantía", "valor": "$122.100.000" },
          { "nombre": "Protección Patrimonial", "valor": "SI AMPARA" },
          { "nombre": "Accidentes Personales", "valor": "50 MILL MAX (250 MILL)" }
        ],
        "adicional": [
          { "nombre": "Asistencia en Viajes", "valor": "SI AMPARA" },
          { "nombre": "Vehiculo de Reemplazo", "valor": "SI AMPARA" },
          { "nombre": "Vidrios", "valor": "SI AMPARA" },
          { "nombre": "Llaves", "valor": "SI AMPARA" },
          { "nombre": "Conductor Elegido", "valor": "SI AMPARA" },
          { "nombre": "Pequeños Accesorios", "valor": "SI AMPARA" },
          { "nombre": "Llantas", "valor": "SI AMPARA" },
          { "nombre": "Amortiguadores", "valor": "SI AMPARA" },
          { "nombre": "Carro Taller", "valor": "SI AMPARA" },
          { "nombre": "Grua por Accidente", "valor": "SI AMPARA" }
        ],
        "responsabilidad_civil_extracontractual": [
          { "nombre": "Responsabilidad Civil Extracontractual", "valor": "4.400.000.000" }
        ]
      },
      {
        "orden": 2,
        "nombre": "SEGURO INTEGRAL PARA CARRO",
        "total": "$1.660.404,08",
        "prima": "$1.395.297,55",
        "impuesto": "$265.106,53",
        "prima_total": "$1.660.404,08",
        "amparos": [
          { "nombre": "Asistencia Jurídica", "valor": "ILIMITADA" },
          { "nombre": "Daños de Mayor Cuantia", "valor": "$122.100.000" },
          { "nombre": "Hurto de Mayor Cuantía", "valor": "$122.100.000" },
          { "nombre": "Protección Patrimonial", "valor": "SI AMPARA" },
          { "nombre": "Accidentes Personales", "valor": "50 MILL MAX (250 MILL)" }
        ],
        "adicional": [
          { "nombre": "Asistencia en Viajes", "valor": "SI AMPARA" },
          { "nombre": "Vehiculo de Reemplazo", "valor": "SI AMPARA" },
          { "nombre": "Vidrios", "valor": "SI AMPARA" },
          { "nombre": "Conductor Elegido", "valor": "SI AMPARA" },
          { "nombre": "Grua por Accidente", "valor": "SI AMPARA" },
          { "nombre": "Carro Taller", "valor": "SI AMPARA" }
        ],
        "responsabilidad_civil_extracontractual": [
          { "nombre": "Responsabilidad Civil Extracontractual", "valor": "4.000.000.000" }
        ]
      }
    ],
    "status": "success"
  },
  {
    "aseguradora": "Equidad",
    "estado": "OK",
    "datos": {
      "planes": [
        {
          "nombre_plan": "AUTO P. PLAN FULL",
          "prima_anual": "2.054.763",
          "prima_mensual": "227.435",
          "limite_vehiculo_sustituto": "Hasta 25 días",
          "limite_rce": "5.000.000.000",
          "deducible_perdidas_totales": "Sin deducible",
          "deducible_perdidas_parciales": "1 SMMLV"
        },
        {
          "nombre_plan": "AUTO P. PLAN BÁSICO",
          "prima_anual": "1.160.812",
          "prima_mensual": "128.487",
          "limite_vehiculo_sustituto": "No aplica",
          "limite_rce": "5.000.000.000",
          "deducible_perdidas_totales": "4 SMMLV",
          "deducible_perdidas_parciales": "4 SMMLV"
        }
      ]
    },
    "status": "success"
  },
  {
    "aseguradora": "AXA",
    "estado": "Cotización generada correctamente",
    "cotizable": true,
    "producto": {
      "nombre": "PLUS",
      "plan_seleccionado": {
        "producto": "Plus",
        "prima_neta": "1072605,56",
        "iva": "207595,06",
        "gastos_expedicion": "20000",
        "total": "1300200,62"
      }
    },
    "vehiculo": {
      "marca": "MAZDA",
      "linea": "CX30 GRAND TOURING HYBRID",
      "version": "2026",
      "descripcion": "MAZDA CX30 GRAND TOURING HYBRID 2026",
      "placa": "PXY846"
    },
    "amparos": [
      "RCE $4.000 millones sin deducible",
      "Pérdida total daños y hurto sin deducible",
      "Pérdida parcial daños — deducible 1 SMMLV",
      "Amparo patrimonial",
      "Muerte accidental $50 millones",
      "Vehículo de reemplazo hasta 20 días",
      "Grúa en accidente hasta 70 SMLDV",
      "Conductor elegido sin límite de eventos",
      "Carro taller sin límite de eventos",
      "Rotura de vidrios sin límite de eventos",
      "Llantas estalladas 1 SMMLV"
    ],
    "plan_seleccionado": {
      "producto": "Plus",
      "prima_neta": "1072605,56",
      "iva": "207595,06",
      "gastos_expedicion": "20000",
      "total": "1300200,62"
    },
    "status": "success"
  },
  {
    "aseguradora": "Quálitas",
    "estado": "Cotización generada correctamente",
    "datos": {
      "planes": [
        { "nombre": "AMPLIA", "prima_anual_con_iva": "$2.550.883", "seleccionado": true },
        { "nombre": "PLUS", "prima_anual_con_iva": "$1.175.740", "seleccionado": false },
        { "nombre": "BASICA", "prima_anual_con_iva": "$314.084", "seleccionado": false }
      ],
      "amparos_base": [
        { "cobertura": "Pérdida Parcial por Daños", "valor_asegurado": "Incluido en póliza", "deducible": "1.400.000" },
        { "cobertura": "Pérdida Total por Daños", "valor_asegurado": "Incluido en póliza", "deducible": "0%" },
        { "cobertura": "Pérdida Parcial por Hurto", "valor_asegurado": "Incluido en póliza", "deducible": "1.400.000" },
        { "cobertura": "Pérdida Total por Hurto", "valor_asegurado": "Incluido en póliza", "deducible": "0%" },
        { "cobertura": "Responsabilidad Civil Extracontractual", "valor_asegurado": "4.000.000.000", "deducible": "0" },
        { "cobertura": "Gastos Médicos por accidente de tránsito", "valor_asegurado": "Incluido en póliza", "deducible": "Sin deducible" },
        { "cobertura": "Abogados en Proceso Civil o Penal", "valor_asegurado": "Incluido en póliza", "deducible": "Sin deducible" },
        { "cobertura": "Asistencia en Viaje", "valor_asegurado": "Básica", "deducible": "Sin deducible" }
      ]
    },
    "status": "success"
  }
]

const mockUserInfo = {
  cliente: {
    nombre: "Carlos",
    apellidos: "Pérez García",
    nombre_completo: "Carlos Pérez García",
    tipo_documento: "C.C.",
    numero_documento: "1020345678",
    fecha_nacimiento: "15/06/1985",
    genero: "Masculino",
    celular: "3101234567",
    correo: "carlos.perez@email.com"
  },
  vehiculo: {
    placa: "PXY846",
    marca: "MAZDA",
    linea: "CX30 GRAND TOURING HYBRID TP 2000CC",
    modelo: "2026",
    descripcion: "MAZDA CX30 GRAND TOURING HYBRID TP 2000CC 2026",
    ciudad: "Bogotá"
  }
}

export default function TestPdfPage() {
  const [generating, setGenerating] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setGenerating(true)
    setError(null)
    setDone(false)
    try {
      await generateQuoteComparisonPDF(mockRawResults, mockUserInfo, {})
      setDone(true)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Error desconocido")
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ color: "#005b89", marginBottom: "8px" }}>Prueba de PDF Comparativo</h1>
      <p style={{ color: "#607d8b", marginBottom: "32px" }}>
        Genera un PDF de prueba con 4 aseguradoras (Estado × 3 planes, Equidad × 2, AXA, Quálitas × 3).
      </p>

      <button
        onClick={handleGenerate}
        disabled={generating}
        style={{
          background: generating ? "#94a3b8" : "#005b89",
          color: "white",
          border: "none",
          borderRadius: "12px",
          padding: "14px 32px",
          fontSize: "16px",
          fontWeight: 700,
          cursor: generating ? "not-allowed" : "pointer",
          boxShadow: "0 4px 20px rgba(0,91,137,0.3)",
          transition: "all 0.2s"
        }}
      >
        {generating ? "⏳ Generando PDF..." : "📄 Descargar PDF de Prueba"}
      </button>

      {done && (
        <p style={{ color: "#31b36b", fontWeight: 700, marginTop: "24px" }}>
          ✅ PDF generado y descargado correctamente.
        </p>
      )}

      {error && (
        <p style={{ color: "#e53e3e", fontWeight: 700, marginTop: "24px" }}>
          ❌ Error: {error}
        </p>
      )}

      <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "40px" }}>
        Esta página es solo para pruebas. No exponer en producción.
      </p>
    </div>
  )
}
