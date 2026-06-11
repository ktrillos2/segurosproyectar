import jsPDF from 'jspdf';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtCOP = (val: any): string => {
  if (!val) return '—';
  if (typeof val === 'string' && val.trim().startsWith('$')) return val.trim();
  const clean = String(val).replace(/[^0-9]/g, '');
  if (!clean) return String(val);
  const num = parseInt(clean, 10);
  if (isNaN(num)) return String(val);
  return `$ ${num.toLocaleString('es-CO')}`;
};

const parseNumber = (val: any): number => {
  if (typeof val === 'number') return val;
  const clean = String(val || '').replace(/[^0-9.,]/g, '').replace(',', '.');
  return parseFloat(clean.replace(/\./g, '').replace(',', '.')) || 0;
};

// Cuota mensual estimada = prima anual / 12 (cuando no viene del cotizador)
const cuotaMensualStr = (total: number): string =>
  total > 0 ? `$ ${Math.round(total / 12).toLocaleString('es-CO')}` : '—';

// ─── Data normalizers for each insurer ───────────────────────────────────────

interface NormalizedPlan {
  aseguradora: string;
  plan: string;
  total: number;
  totalStr: string;
  primaNeta: string;
  impuesto: string;
  cuotaMensual: string;
  valorAsegurado: string;
  numeroCotizacion: string;
  validez: string;
  amparos: { nombre: string; valor: string }[];
  adicional: { nombre: string; valor: string }[];
  rce: string;
}

function normalizarEstado(raw: any): NormalizedPlan[] {
  const cotizaciones = raw.cotizaciones || [];
  if (!cotizaciones.length && raw.cotizacion_seleccionada) {
    cotizaciones.push(raw.cotizacion_seleccionada);
  }
  const numeroCot = raw.metadata?.resultquoteid || '—';

  return cotizaciones.map((c: any) => {
    const total = parseNumber(c.prima_total || c.total || 0);
    return {
      aseguradora: 'Estado',
      plan: c.nombre || 'SEGURO ESTADO',
      total,
      totalStr: c.prima_total || c.total || '—',
      primaNeta: c.prima || '—',
      impuesto: c.impuesto || '—',
      cuotaMensual: cuotaMensualStr(total),
      valorAsegurado: '—',
      numeroCotizacion: numeroCot,
      validez: '—',
      amparos: (c.amparos || []).map((a: any) => ({ nombre: a.nombre, valor: a.valor })),
      adicional: (c.adicional || []).map((a: any) => ({ nombre: a.nombre, valor: a.valor })),
      rce: (c.responsabilidad_civil_extracontractual?.[0]?.valor) ||
           (c.secciones?.['Responsabilidad Civil Extracontractual']?.[0]?.valor) || '—',
    };
  });
}

function getEquidadAmparos(planName: string) {
  const n = (planName || '').toUpperCase();
  if (n.includes('RCE')) {
    return {
      rce: '$1.500.000.000',
      amparos: [
        { nombre: 'Deducible RCE', valor: 'Sin deducible' },
        { nombre: 'Amparo patrimonial', valor: 'Incluido' },
        { nombre: 'Asistencia jurídica', valor: 'Incluido' },
        { nombre: 'Carro taller', valor: '2 servicios' },
        { nombre: 'Grúa', valor: 'Incluido' },
        { nombre: 'Asistencia Equidad Vial', valor: 'Incluido' },
        { nombre: 'Club de Beneficios', valor: 'Incluido' },
      ]
    };
  }
  if (n.includes('BÁSICO') || n.includes('BASICO')) {
    return {
      rce: '$5.000.000.000',
      amparos: [
        { nombre: 'Deducible RCE', valor: '4 SMMLV' },
        { nombre: 'Amparo patrimonial', valor: 'Incluido' },
        { nombre: 'Asistencia jurídica', valor: 'Incluido' },
        { nombre: 'Pérdida total por daños', valor: 'Valor según vehículo — 4 SMMLV' },
        { nombre: 'Pérdida parcial por daños', valor: 'Valor según vehículo — 4 SMMLV' },
        { nombre: 'Pérdida total por hurto', valor: 'Valor según vehículo — 4 SMMLV' },
        { nombre: 'Pérdida parcial por hurto', valor: 'Valor según vehículo — 4 SMMLV' },
        { nombre: 'Terremoto/eventos naturaleza', valor: 'Valor según vehículo — 4 SMMLV' },
        { nombre: 'Gastos de transporte pérdida total', valor: '$40.000 x 30 días' },
        { nombre: 'Carro taller', valor: '3 servicios' },
        { nombre: 'Conductor elegido', valor: '6 servicios' },
        { nombre: 'Grúa', valor: 'Incluido' },
        { nombre: 'Asistencia Equidad Básica', valor: 'Incluido' },
        { nombre: 'Club de Beneficios', valor: 'Incluido' },
      ]
    };
  }
  if (n.includes('LIGERO')) {
    return {
      rce: '$4.000.000.000',
      amparos: [
        { nombre: 'Deducible RCE', valor: 'Sin deducible' },
        { nombre: 'Amparo patrimonial', valor: 'Incluido' },
        { nombre: 'Asistencia jurídica', valor: 'Incluido' },
        { nombre: 'Accidentes personales', valor: '$60.000.000' },
        { nombre: 'Pérdida total por daños', valor: 'Valor según vehículo — Sin deducible' },
        { nombre: 'Pérdida parcial por daños', valor: 'Valor según vehículo — 1,5 SMMLV' },
        { nombre: 'Pérdida total por hurto', valor: 'Valor según vehículo — Sin deducible' },
        { nombre: 'Pérdida parcial por hurto', valor: 'Valor según vehículo — 1,5 SMMLV' },
        { nombre: 'Terremoto/eventos naturaleza', valor: 'Valor según vehículo — 1,5 SMMLV' },
        { nombre: 'Gastos de transporte pérdida total', valor: 'Incluido' },
        { nombre: 'Carro taller', valor: '3 servicios' },
        { nombre: 'Conductor elegido', valor: '6 servicios' },
        { nombre: 'Vehículo de reemplazo', valor: 'Hasta 25 días' },
        { nombre: 'Grúa', valor: 'Incluido' },
        { nombre: 'Asistencia Equidad Básica', valor: 'Incluido' },
        { nombre: 'Club de Beneficios', valor: 'Incluido' },
      ]
    };
  }
  if (n.includes('FULL')) {
    return {
      rce: '$5.000.000.000',
      amparos: [
        { nombre: 'Deducible RCE', valor: 'Sin deducible' },
        { nombre: 'Amparo patrimonial', valor: 'Incluido' },
        { nombre: 'Asistencia jurídica', valor: 'Incluido' },
        { nombre: 'Accidentes personales', valor: '$60.000.000' },
        { nombre: 'Pérdida total por daños', valor: 'Valor según vehículo — Sin deducible' },
        { nombre: 'Pérdida parcial por daños', valor: 'Valor según vehículo — 1 SMMLV' },
        { nombre: 'Pérdida total por hurto', valor: 'Valor según vehículo — Sin deducible' },
        { nombre: 'Pérdida parcial por hurto', valor: 'Valor según vehículo — 1 SMMLV' },
        { nombre: 'Terremoto/eventos naturaleza', valor: 'Valor según vehículo — 1 SMMLV' },
        { nombre: 'Gastos de transporte pérdida total', valor: '$40.000 x 30 días' },
        { nombre: 'Carro taller', valor: '5 servicios' },
        { nombre: 'Conductor elegido', valor: '12 servicios' },
        { nombre: 'Conductor élite', valor: '4 servicios' },
        { nombre: 'Vehículo de reemplazo', valor: 'Hasta 25 días' },
        { nombre: 'Grúa', valor: 'Incluido' },
        { nombre: 'Asistencia al hogar', valor: 'Incluido' },
        { nombre: 'Gastos de hospedaje o desplazamiento', valor: 'Incluido' },
        { nombre: 'Accesorios, llantas, vidrios', valor: 'Incluido' },
        { nombre: 'Plan viajero', valor: 'Incluido' },
        { nombre: 'Asistencia Equidad Integral', valor: 'Incluido' },
        { nombre: 'Club de Beneficios', valor: 'Incluido' },
      ]
    };
  }
  return { rce: '—', amparos: [] };
}

function normalizarEquidad(raw: any): NormalizedPlan[] {
  const planes = raw.datos?.planes || [];
  return planes.map((p: any) => {
    const total = parseNumber(p.prima_anual || 0);
    const config = getEquidadAmparos(p.nombre_plan || '');
    return {
      aseguradora: 'Equidad',
      plan: p.nombre_plan || 'PLAN EQUIDAD',
      total,
      totalStr: fmtCOP(p.prima_anual),
      primaNeta: '—',
      impuesto: '—',
      cuotaMensual: p.prima_mensual ? fmtCOP(p.prima_mensual) : cuotaMensualStr(total),
      valorAsegurado: '—',
      numeroCotizacion: '—',
      validez: '—',
      amparos: config.amparos.length > 0 ? config.amparos : [
        { nombre: 'RCE', valor: p.limite_rce || '—' },
        { nombre: 'Vehículo sustituto', valor: p.limite_vehiculo_sustituto || '—' },
        { nombre: 'Ded. pérd. totales', valor: p.deducible_perdidas_totales || '—' },
        { nombre: 'Ded. pérd. parciales', valor: p.deducible_perdidas_parciales || '—' },
      ],
      adicional: [],
      rce: config.rce !== '—' ? config.rce : (p.limite_rce || '—'),
    };
  });
}

function normalizarAxa(raw: any): NormalizedPlan[] {
  const planes = raw.cotizaciones_disponibles || [];
  const principal = raw.plan_seleccionado || raw.producto?.plan_seleccionado;
  const amparosFijos = [
    { nombre: 'Deducible RCE', valor: 'Sin deducible' },
    { nombre: 'Límite daños a bienes de terceros', valor: 'Límite único' },
    { nombre: 'Límite lesiones o muerte a una persona', valor: 'Límite único' },
    { nombre: 'Límite lesiones o muerte a dos o más personas', valor: 'Límite único' },
    { nombre: 'Pérdida total por daños', valor: 'Sin deducible' },
    { nombre: 'Pérdida parcial por daños', valor: 'Deducible 1 SMMLV' },
    { nombre: 'Pérdida total por hurto', valor: 'Sin deducible' },
    { nombre: 'Pérdida parcial por hurto', valor: 'Deducible 1 SMMLV' },
    { nombre: 'Terremoto/eventos naturaleza', valor: 'Incluye' },
    { nombre: 'Protección patrimonial', valor: 'Incluye' },
    { nombre: 'Asistencia jurídica proceso penal', valor: 'Incluye' },
    { nombre: 'Asistencia jurídica proceso civil', valor: 'Incluye' },
    { nombre: 'Gastos de transporte pérdida total', valor: '$20.000 diarios x hasta 60 días' },
    { nombre: 'Vehículo sustituto pérdida total', valor: 'Hasta 20 días' },
    { nombre: 'Vehículo sustituto pérdida parcial', valor: 'Hasta 15 días' },
    { nombre: 'Revisión antes de viaje', valor: 'Incluye' },
    { nombre: 'Carro taller', valor: 'Sin límite de eventos' },
    { nombre: 'Conductor elegido', valor: 'Sin límite de eventos' },
    { nombre: 'Conductor profesional', valor: 'Incluye' },
    { nombre: 'Grúa en accidente', valor: 'Hasta 70 SMLDV' },
    { nombre: 'Grúa en avería', valor: 'Hasta 50 SMLDV' },
    { nombre: 'Asistencia médica', valor: 'Incluye' },
    { nombre: 'Asistencia en viaje', valor: 'Plus' },
    { nombre: 'Muerte accidental', valor: '$50.000.000' },
    { nombre: 'Garantía en tiempo de reparación', valor: 'Incluye' },
    { nombre: 'Prolongación de vigencia', valor: 'Incluye' },
    { nombre: 'Llantas estalladas', valor: '1 SMMLV por vigencia' },
    { nombre: 'Rotura de vidrios', valor: 'Sin límite de eventos' },
    { nombre: 'Pérdida de llaves', valor: '1 SMMLV — 1 evento por vigencia' },
    { nombre: 'Asistencia exequial', valor: '120 SMDLV por ocupante' },
  ];
  
  const rceFijo = '$4.000.000.000';

  if (planes.length > 0) {
    return planes.map((p: any) => {
      const total = parseNumber(p.total || 0);
      return {
        aseguradora: 'AXA',
        plan: p.producto || p.nombre || 'PLAN AXA',
        total,
        totalStr: fmtCOP(p.total),
        primaNeta: fmtCOP(p.prima_neta),
        impuesto: fmtCOP(p.iva),
        cuotaMensual: cuotaMensualStr(total),
        valorAsegurado: '—',
        numeroCotizacion: '—',
        validez: '—',
        amparos: amparosFijos,
        adicional: [],
        rce: rceFijo,
      };
    });
  }

  if (principal) {
    const total = parseNumber(principal.total || 0);
    return [{
      aseguradora: 'AXA',
      plan: raw.producto?.nombre || principal.producto || 'PLUS',
      total,
      totalStr: fmtCOP(principal.total),
      primaNeta: fmtCOP(principal.prima_neta),
      impuesto: fmtCOP(principal.iva),
      cuotaMensual: cuotaMensualStr(total),
      valorAsegurado: '—',
      numeroCotizacion: '—',
      validez: '—',
      amparos: amparosFijos,
      adicional: [],
      rce: rceFijo,
    }];
  }

  return [];
}

function normalizarQualitas(raw: any): NormalizedPlan[] {
  const planes = raw.datos?.planes || [];
  const amparosBase = (raw.datos?.amparos_base || []).map((a: any) => ({ nombre: a.cobertura || a.nombre || 'Cobertura', valor: a.valor_asegurado || 'INCLUIDO' }));
  const numeroCot = raw.numero_cotizacion || raw.datos?.numero_cotizacion || '—';
  const valorAseg = (raw.datos?.amparos_base || []).find((a: any) => String(a.cobertura || '').toLowerCase().includes('valor'))?.valor_asegurado || '—';

  return planes.map((p: any) => {
    const total = parseNumber(p.prima_anual_con_iva || 0);
    return {
      aseguradora: 'Quálitas',
      plan: p.nombre || 'PLAN QUÁLITAS',
      total,
      totalStr: p.prima_anual_con_iva || '—',
      primaNeta: '—',
      impuesto: '—',
      cuotaMensual: cuotaMensualStr(total),
      valorAsegurado: valorAseg,
      numeroCotizacion: numeroCot,
      validez: '—',
      amparos: amparosBase,
      adicional: [],
      rce: (raw.datos?.amparos_base || []).find((a: any) => String(a.cobertura || '').includes('Civil'))?.valor_asegurado || '—',
    };
  });
}

function normalizarZurich(raw: any): NormalizedPlan[] {
  const planes = raw.planes || raw.datos?.planes || [];
  return planes.map((p: any) => {
    const total = parseNumber(p.prima_anual_con_iva || p.prima_anual || 0);
    return {
      aseguradora: 'Zurich',
      plan: p.nombre || 'PLAN ZURICH',
      total,
      totalStr: p.prima_anual_con_iva || fmtCOP(total),
      primaNeta: '—',
      impuesto: '—',
      cuotaMensual: cuotaMensualStr(total),
      valorAsegurado: '—',
      numeroCotizacion: '—',
      validez: '—',
      amparos: (p.amparos || []).map((a: any) => ({
        nombre: a.cobertura || a.nombre,
        valor: a.limite || a.valor || 'INCLUIDO',
      })),
      adicional: [],
      rce: (p.amparos || []).find((a: any) => String(a.cobertura || a.nombre || '').toLowerCase().includes('rce') || String(a.cobertura || a.nombre || '').toLowerCase().includes('civil'))?.limite || '—',
    };
  });
}

function normalizarMundial(raw: any): NormalizedPlan[] {
  const planes = raw.planes || raw.datos?.planes || raw.cotizaciones || [];
  return planes.map((p: any) => {
    const total = parseNumber(p.prima_anual_con_iva || p.prima_anual || p.total || p.prima_total || 0);
    return {
      aseguradora: 'Mundial',
      plan: p.nombre || p.nombre_plan || p.producto || 'PLAN MUNDIAL',
      total,
      totalStr: fmtCOP(p.prima_anual_con_iva || p.prima_anual || p.total || total),
      primaNeta: fmtCOP(p.prima_neta),
      impuesto: fmtCOP(p.iva),
      cuotaMensual: p.prima_mensual ? fmtCOP(p.prima_mensual) : cuotaMensualStr(total),
      valorAsegurado: '—',
      numeroCotizacion: p.numero_cotizacion || raw.numero_cotizacion || '—',
      validez: '—',
      amparos: (p.amparos || []).map((a: any) => ({
        nombre: a.cobertura || a.nombre || 'Cobertura',
        valor: a.limite || a.valor || a.valor_asegurado || 'INCLUIDO',
      })),
      adicional: [],
      rce: '—',
    };
  });
}

function normalizarCotizacion(raw: any): NormalizedPlan[] {
  const name = String(raw.aseguradora || '').toLowerCase();
  try {
    if (name.includes('estado')) return normalizarEstado(raw);
    if (name.includes('equidad')) return normalizarEquidad(raw);
    if (name.includes('axa')) return normalizarAxa(raw);
    if (name.includes('zurich')) return normalizarZurich(raw);
    if (name.includes('mundial')) return normalizarMundial(raw);
    if (name.includes('qu')) return normalizarQualitas(raw); // quálitas / qualitas
  } catch (e) {
    console.warn(`Error normalizando ${raw.aseguradora}:`, e);
  }
  return [];
}

// ─── PDF Drawing Utilities ───────────────────────────────────────────────────

const COLORS = {
  primary: [11, 90, 146] as [number, number, number], // #0B5A92 — azul oficial de Proyectar
  accent:  [53, 174, 226] as [number, number, number],
  white:   [255, 255, 255] as [number, number, number],
  light:   [238, 247, 252] as [number, number, number],
  muted:   [96, 125, 139] as [number, number, number],
  dark:    [38, 50, 56] as [number, number, number],
  row1:    [244, 248, 252] as [number, number, number],
  green:   [49, 179, 107] as [number, number, number],
  faint:   [176, 190, 197] as [number, number, number], // gris suave para datos no disponibles
  red:     [211, 47, 47] as [number, number, number],    // rojo para la "x" (cobertura no incluida)
};

// Marcador minimalista cuando una COBERTURA no está incluida (cambia aquí si quieres otro símbolo)
const SIN_DATO = 'x';

// Page dimensions (US Letter PORTRAIT in mm) — igual que el "PDF IDEAL"
const PW = 215.9; // page width  (8.5 in)
const PH = 279.4; // page height (11 in)
const M  = 12;    // margin

function setFont(doc: jsPDF, size: number, style: 'normal' | 'bold' = 'normal', color: [number, number, number] = COLORS.dark) {
  doc.setFontSize(size);
  doc.setFont('helvetica', style);
  doc.setTextColor(...color);
}

function drawRect(doc: jsPDF, x: number, y: number, w: number, h: number, color: [number, number, number], radius = 0) {
  doc.setFillColor(...color);
  if (radius > 0) {
    doc.roundedRect(x, y, w, h, radius, radius, 'F');
  } else {
    doc.rect(x, y, w, h, 'F');
  }
}

function drawHeader(doc: jsPDF, logoDataUrl: string | null) {
  drawRect(doc, 0, 0, PW, 24, COLORS.white);
  doc.setDrawColor(...COLORS.accent);
  doc.setLineWidth(0.6);
  doc.line(0, 24, PW, 24);

  if (logoDataUrl) {
    try { doc.addImage(logoDataUrl, 'PNG', M, 4, 42, 16); } catch(_) {}
  }

  setFont(doc, 11, 'bold', COLORS.primary);
  doc.text('COTIZACIÓN COMPARATIVA DE SEGUROS DE AUTO', PW - M, 10, { align: 'right' });
  setFont(doc, 6.5, 'normal', COLORS.muted);
  doc.text('Proyectar Administradores de Seguros Ltda. | autos@seguros-proyectar.com | seguros-proyectar.com', PW - M, 15, { align: 'right' });
  setFont(doc, 6.5, 'normal', COLORS.muted);
  doc.text(`Generado: ${new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}`, PW - M, 20, { align: 'right' });
}

function drawInfoBar(doc: jsPDF, userInfo: any, vehicleInfo: any, y: number): number {
  const h = 26;
  drawRect(doc, M, y, PW - M * 2, h, COLORS.light, 4);

  const col1 = M + 4;
  const col2 = PW / 2 + 2;
  const lineH = 5.5;

  const cliente = userInfo?.cliente || {};
  const nombre = cliente.nombre_completo || `${cliente.nombre || ''} ${cliente.apellidos || ''}`.trim() || 'N/A';
  const doc_id = cliente.numero_documento ? `${cliente.tipo_documento || 'C.C.'} ${cliente.numero_documento}` : 'N/A';
  const nacimiento = cliente.fecha_nacimiento || 'N/A';
  const genero = cliente.genero || 'N/A';
  const placa = vehicleInfo?.placa || 'N/A';
  const descripcion = vehicleInfo?.descripcion || `${vehicleInfo?.marca || ''} ${vehicleInfo?.linea || ''}`.trim() || 'N/A';
  const modelo = vehicleInfo?.modelo || 'N/A';
  const uso = vehicleInfo?.servicio || 'Particular';

  const field = (label: string, value: string, x: number, yy: number, labelW: number) => {
    setFont(doc, 7.5, 'bold', COLORS.primary);
    doc.text(label, x, yy);
    setFont(doc, 7, 'normal', COLORS.dark);
    doc.text(value, x + labelW, yy);
  };

  field('ASEGURADO', nombre, col1, y + lineH, 22);
  field('DOCUMENTO', doc_id, col1, y + lineH * 2, 22);
  field('NACIMIENTO', `${nacimiento}   ·   GÉNERO: ${genero}`, col1, y + lineH * 3, 22);

  field('VEHÍCULO', descripcion, col2, y + lineH, 20);
  field('PLACA', `${placa}   ·   MODELO: ${modelo}   ·   USO: ${uso}`, col2, y + lineH * 2, 20);
  field('CONTACTO', `${cliente.celular || 'N/A'}   ·   ${cliente.correo || 'N/A'}`, col2, y + lineH * 3, 20);

  return y + h + 4;
}

function getInsurerLogoPath(name: string): string | null {
  const n = name.toLowerCase();
  if (n.includes('axa')) return '/logos/axa-colpatria.png';
  if (n.includes('equidad')) return '/logos/equidad.png';
  if (n.includes('estado')) return '/logos/seguros-del-estado.png';
  if (n.includes('mundial')) return '/logos/seguros-mudial.png';
  if (n.includes('qu')) return '/logos/qualitas.png'; // quálitas/qualitas
  if (n.includes('zurich')) return '/logos/zurich.png';
  return null;
}

async function loadImageAsDataUrl(src: string): Promise<string | null> {
  try {
    const resp = await fetch(src);
    if (!resp.ok) return null;
    const blob = await resp.blob();
    return new Promise<string>(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null as any);
      reader.readAsDataURL(blob);
    });
  } catch { return null; }
}

// Returns { dataUrl, w, h } where w and h fit within maxW x maxH preserving aspect ratio
async function loadImageFit(
  dataUrl: string,
  maxW: number,
  maxH: number
): Promise<{ dataUrl: string; w: number; h: number } | null> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      let w = maxW;
      let h = maxW / ratio;
      if (h > maxH) {
        h = maxH;
        w = maxH * ratio;
      }
      resolve({ dataUrl, w, h });
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

function drawPlanHeader(doc: jsPDF, plans: NormalizedPlan[], logoCache: Record<string, { dataUrl: string; w: number; h: number }>, colW: number, colX: number[], y: number): number {
  const h = 32;
  const priceFont = colW < 30 ? 8.5 : 10;

  plans.forEach((plan, i) => {
    drawRect(doc, colX[i], y, colW, h, i === 0 ? COLORS.light : COLORS.white);
    drawRect(doc, colX[i], y, colW, 2, i === 0 ? COLORS.accent : [210, 225, 235] as [number,number,number]);

    // Logo — centered, aspect-ratio preserved y limitado al ancho de la columna
    const logoPath = getInsurerLogoPath(plan.aseguradora);
    const logoFit = logoPath ? logoCache[logoPath] : null;
    if (logoFit) {
      try {
        let lw = logoFit.w, lh = logoFit.h;
        const maxw = colW - 5;
        if (lw > maxw) { const r = maxw / lw; lw = maxw; lh = lh * r; }
        const cx = colX[i] + colW / 2;
        doc.addImage(logoFit.dataUrl, 'PNG', cx - lw / 2, y + 4, lw, lh);
      } catch (_) {
        setFont(doc, 8, 'bold', COLORS.primary);
        doc.text(plan.aseguradora.toUpperCase(), colX[i] + colW / 2, y + 11, { align: 'center' });
      }
    } else {
      setFont(doc, 8, 'bold', COLORS.primary);
      doc.text(plan.aseguradora.toUpperCase(), colX[i] + colW / 2, y + 11, { align: 'center' });
    }

    setFont(doc, 6, 'normal', COLORS.muted);
    const planNameTrunc = plan.plan.length > 24 ? plan.plan.substring(0, 22) + '…' : plan.plan;
    doc.text(planNameTrunc, colX[i] + colW / 2, y + 21, { align: 'center', maxWidth: colW - 2 });

    const priceStr = (plan.totalStr && plan.totalStr !== '—') ? plan.totalStr : 'Consultar';
    setFont(doc, priceFont, 'bold', COLORS.primary);
    doc.text(priceStr, colX[i] + colW / 2, y + 29, { align: 'center', maxWidth: colW - 1 });
  });

  return y + h;
}

function drawSectionRow(doc: jsPDF, label: string, tableX: number, tableW: number, y: number): number {
  drawRect(doc, tableX, y, tableW, 5.5, COLORS.primary);
  setFont(doc, 7, 'bold', COLORS.white);
  doc.text(label.toUpperCase(), tableX + 3, y + 4);
  return y + 5.5;
}

function drawDataRow(
  doc: jsPDF,
  rowLabel: string,
  values: string[],
  colX: number[],
  colW: number,
  labelW: number,
  tableX: number,
  y: number,
  even: boolean,
  emphasize = false,
  emptyText = SIN_DATO,
  emptyColor: [number, number, number] = COLORS.red
): number {
  const h = 5.2;
  const totalW = labelW + values.length * colW;

  drawRect(doc, tableX, y, totalW, h, even ? COLORS.row1 : COLORS.white);

  setFont(doc, 6.5, 'bold', COLORS.muted);
  doc.text(rowLabel, tableX + 3, y + 3.7);

  values.forEach((val, i) => {
    const v = (val ?? '').toString().trim();
    const isPositive = v === 'SI AMPARA' || v === 'ILIMITADA' || v === 'INCLUIDO';
    const isEmpty = !v || v === '-' || v === '—' || v.toUpperCase() === 'N/A' || v.toLowerCase() === 'no aplica';
    const isRedMark = isEmpty && emptyColor === COLORS.red;
    const color = isEmpty ? emptyColor : (emphasize ? COLORS.primary : (isPositive ? COLORS.green : COLORS.dark));
    const bold = isRedMark || (!isEmpty && (emphasize || isPositive));
    setFont(doc, (emphasize && !isEmpty) ? 8 : 6.5, bold ? 'bold' : 'normal', color);
    doc.text(isEmpty ? emptyText : v, colX[i] + colW / 2, y + 3.7, { align: 'center', maxWidth: colW - 2 });
  });

  return y + h;
}

function drawFooter(doc: jsPDF) {
  doc.setDrawColor(...COLORS.accent);
  doc.setLineWidth(0.3);
  doc.line(M, PH - 9, PW - M, PH - 9);

  setFont(doc, 6, 'normal', COLORS.muted);
  doc.text('Proyectar Administradores de Seguros Ltda. · NIT 830139875-7 · Bogotá D.C., Colombia', M, PH - 5);
  doc.text('Intermediario de seguros vigilado por la Superintendencia Financiera de Colombia', PW - M, PH - 5, { align: 'right' });
}

// ─── Main export function ────────────────────────────────────────────────────

export const generateQuoteComparisonPDF = async (
  rawResults: any[],
  userInfo: any,
  _logosMap?: Record<string, string>
) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });

  // Load Proyectar logo
  let logoDataUrl: string | null = null;
  try {
    logoDataUrl = await loadImageAsDataUrl('/logo.png');
  } catch (_) {}

  // Pre-load all insurer logos from local /logos/ directory
  const allInsurerLogoSrcs = [
    '/logos/axa-colpatria.png',
    '/logos/equidad.png',
    '/logos/seguros-del-estado.png',
    '/logos/seguros-mudial.png',
    '/logos/qualitas.png',
    '/logos/zurich.png',
    '/logos/HDI.jpg',
    '/logos/SBS.jpg',
  ];
  const logoCache: Record<string, { dataUrl: string; w: number; h: number }> = {};
  const MAX_LOGO_W = 40;
  const MAX_LOGO_H = 13;
  await Promise.all(allInsurerLogoSrcs.map(async src => {
    const dataUrl = await loadImageAsDataUrl(src);
    if (dataUrl) {
      const fit = await loadImageFit(dataUrl, MAX_LOGO_W, MAX_LOGO_H);
      if (fit) logoCache[src] = fit;
    }
  }));

  // Normalize all quotes
  const allPlans: NormalizedPlan[] = [];
  for (const raw of rawResults) {
    if (raw.status === 'error' || raw.estado === 'error') continue;
    const plans = normalizarCotizacion(raw);
    allPlans.push(...plans);
  }

  if (allPlans.length === 0) {
    alert('No hay cotizaciones exitosas para generar el PDF.');
    return;
  }

  // ── Una sola póliza por aseguradora: la MÁS CARA (mejor cobertura = mejor opción) ──
  //    Así sale una columna por aseguradora y cabe todo en UNA página.
  const bestPerInsurer = new Map<string, NormalizedPlan>();
  for (const p of allPlans) {
    const key = p.aseguradora.toLowerCase();
    const prev = bestPerInsurer.get(key);
    if (!prev || p.total > prev.total) bestPerInsurer.set(key, p);
  }
  // Ordenadas por precio ascendente (la más económica de las recomendadas queda primero).
  const plans = Array.from(bestPerInsurer.values())
    .sort((a, b) => (a.total > 0 ? a.total : Infinity) - (b.total > 0 ? b.total : Infinity));

  // ── Vehicle info ──
  const vehicleRaw = rawResults.find(r => r.vehiculo)?.vehiculo || userInfo?.vehiculo || {};

  // ── Layout (una sola página) ──
  const labelW = 46;
  const colW = (PW - M * 2 - labelW) / plans.length;
  const tableX = M;
  const colX = plans.map((_, i) => M + labelW + i * colW);
  const tableW = labelW + plans.length * colW;
  const RESERVA_INFERIOR = 30; // mm reservados abajo para recomendación + nota legal + footer

  drawHeader(doc, logoDataUrl);
  let y = 24;
  y = drawInfoBar(doc, userInfo, vehicleRaw, y);

  setFont(doc, 10, 'bold', COLORS.primary);
  doc.text('Estas son las ofertas recomendadas para tu seguro:', M, y + 4);
  y += 8;

  y = drawPlanHeader(doc, plans, logoCache, colW, colX, y);

  // ── Datos principales (filas de DATO: si falta → "n/d" gris, no "x" roja) ──
  y = drawSectionRow(doc, 'DATOS PRINCIPALES', tableX, tableW, y);
  y = drawDataRow(doc, 'Prima anual (IVA incl.)', plans.map(p => p.totalStr), colX, colW, labelW, tableX, y, false, true, 'n/d', COLORS.faint);
  y = drawDataRow(doc, 'Cuota mensual estimada', plans.map(p => p.cuotaMensual), colX, colW, labelW, tableX, y, true, false, 'n/d', COLORS.faint);
  y = drawDataRow(doc, 'Valor asegurado', plans.map(p => p.valorAsegurado), colX, colW, labelW, tableX, y, false, false, 'n/d', COLORS.faint);
  y = drawDataRow(doc, 'N° de cotización', plans.map(p => p.numeroCotizacion), colX, colW, labelW, tableX, y, true, false, 'n/d', COLORS.faint);

  // ── Responsabilidad Civil (cobertura: si falta → "x" roja) ──
  y = drawSectionRow(doc, 'RESPONSABILIDAD CIVIL EXTRACONTRACTUAL', tableX, tableW, y);
  y = drawDataRow(doc, 'Límite RCE', plans.map(p => p.rce), colX, colW, labelW, tableX, y, false);

  // ── Amparos (los que quepan en la página, reservando el espacio inferior) ──
  const allAmparoNames = new Set<string>();
  plans.forEach(p => p.amparos.forEach(a => allAmparoNames.add(a.nombre)));
  let amparosOcultos = 0;
  if (allAmparoNames.size > 0) {
    y = drawSectionRow(doc, 'AMPAROS INCLUIDOS', tableX, tableW, y);
    let rowEven = false;
    const nombres = Array.from(allAmparoNames);
    nombres.forEach((nombre, idx) => {
      if (y > PH - RESERVA_INFERIOR) { amparosOcultos++; return; }
      const values = plans.map(plan => {
        const found = plan.amparos.find(a => a.nombre === nombre);
        return found?.valor || '—';
      });
      y = drawDataRow(doc, nombre.length > 32 ? nombre.slice(0, 30) + '…' : nombre, values, colX, colW, labelW, tableX, y, rowEven);
      rowEven = !rowEven;
    });
    if (amparosOcultos > 0) {
      setFont(doc, 5.5, 'normal', COLORS.muted);
      doc.text(`(+${amparosOcultos} amparos adicionales — ver detalle de cada póliza)`, tableX + 3, y + 3);
      y += 4;
    }
  }

  // ── Servicios adicionales (solo si queda espacio) ──
  const allAdicionalNames = new Set<string>();
  plans.forEach(p => p.adicional.forEach(a => allAdicionalNames.add(a.nombre)));
  if (allAdicionalNames.size > 0 && y < PH - RESERVA_INFERIOR - 6) {
    y = drawSectionRow(doc, 'SERVICIOS ADICIONALES', tableX, tableW, y);
    let rowEven = false;
    Array.from(allAdicionalNames).forEach(nombre => {
      if (y > PH - RESERVA_INFERIOR) return;
      const values = plans.map(plan => {
        const found = plan.adicional.find(a => a.nombre === nombre);
        return found?.valor || '—';
      });
      y = drawDataRow(doc, nombre.length > 32 ? nombre.slice(0, 30) + '…' : nombre, values, colX, colW, labelW, tableX, y, rowEven);
      rowEven = !rowEven;
    });
  }

  // ── Recomendación + nota legal compacta (parte inferior de la MISMA página) ──
  const cheapest = plans[0];
  const yReco = PH - 25;
  if (cheapest) {
    setFont(doc, 7.5, 'bold', COLORS.primary);
    doc.text('Recomendación:', M, yReco);
    setFont(doc, 7.5, 'normal', COLORS.dark);
    const reco = `Entre estas opciones recomendadas, la de menor precio es ${cheapest.aseguradora} (${cheapest.plan}) por ${cheapest.totalStr}. Compara las coberturas para elegir la mejor para ti.`;
    doc.text(doc.splitTextToSize(reco, PW - M * 2 - 26), M + 26, yReco);
  }

  setFont(doc, 5.8, 'normal', COLORS.muted);
  const legal = 'Cotización informativa; no implica aceptación del riesgo por parte de las aseguradoras. Coberturas, valores y deducibles definitivos según la póliza y el clausulado de cada compañía, sujetos a inspección y suscripción. Primas con IVA. La cuota mensual es referencial (prima anual ÷ 12). Proyectar actúa como intermediario de seguros, no como aseguradora.';
  doc.text(doc.splitTextToSize(legal, PW - M * 2), M, PH - 18);

  drawFooter(doc);

  doc.save(`Cotizacion_Seguros_Proyectar_${new Date().toLocaleDateString('es-CO').replace(/\//g, '-')}.pdf`);
};
