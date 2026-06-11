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

// ─── Data normalizers for each insurer ───────────────────────────────────────

interface NormalizedPlan {
  aseguradora: string;
  plan: string;
  total: number;
  totalStr: string;
  primaNeta: string;
  impuesto: string;
  amparos: { nombre: string; valor: string }[];
  adicional: { nombre: string; valor: string }[];
  rce: string;
}

function normalizarEstado(raw: any): NormalizedPlan[] {
  const cotizaciones = raw.cotizaciones || [];
  if (!cotizaciones.length && raw.cotizacion_seleccionada) {
    cotizaciones.push(raw.cotizacion_seleccionada);
  }
  
  return cotizaciones.map((c: any) => ({
    aseguradora: 'Estado',
    plan: c.nombre || 'SEGURO ESTADO',
    total: parseNumber(c.prima_total || c.total || 0),
    totalStr: c.prima_total || c.total || '—',
    primaNeta: c.prima || '—',
    impuesto: c.impuesto || '—',
    amparos: (c.amparos || []).map((a: any) => ({ nombre: a.nombre, valor: a.valor })),
    adicional: (c.adicional || []).map((a: any) => ({ nombre: a.nombre, valor: a.valor })),
    rce: (c.responsabilidad_civil_extracontractual?.[0]?.valor) || 
         (c.secciones?.['Responsabilidad Civil Extracontractual']?.[0]?.valor) || '—',
  }));
}

function normalizarEquidad(raw: any): NormalizedPlan[] {
  const planes = raw.datos?.planes || [];
  return planes.map((p: any) => ({
    aseguradora: 'Equidad',
    plan: p.nombre_plan || 'PLAN EQUIDAD',
    total: parseNumber(p.prima_anual || 0),
    totalStr: `$ ${p.prima_anual}`,
    primaNeta: `$ ${p.prima_anual}`,
    impuesto: '—',
    amparos: [
      { nombre: 'RCE', valor: p.limite_rce || '—' },
      { nombre: 'Vehículo sustituto', valor: p.limite_vehiculo_sustituto || '—' },
      { nombre: 'Ded. pérd. totales', valor: p.deducible_perdidas_totales || '—' },
      { nombre: 'Ded. pérd. parciales', valor: p.deducible_perdidas_parciales || '—' },
    ],
    adicional: [],
    rce: p.limite_rce || '—',
  }));
}

function normalizarAxa(raw: any): NormalizedPlan[] {
  const planes = raw.cotizaciones_disponibles || [];
  const principal = raw.plan_seleccionado || raw.producto?.plan_seleccionado;
  const amparos = (raw.amparos || []).map((a: string) => ({ nombre: a, valor: 'INCLUIDO' }));

  if (planes.length > 0) {
    return planes.map((p: any) => ({
      aseguradora: 'AXA',
      plan: p.producto || p.nombre || 'PLAN AXA',
      total: parseNumber(p.total || 0),
      totalStr: fmtCOP(p.total),
      primaNeta: fmtCOP(p.prima_neta),
      impuesto: fmtCOP(p.iva),
      amparos,
      adicional: [],
      rce: '—',
    }));
  }

  if (principal) {
    return [{
      aseguradora: 'AXA',
      plan: raw.producto?.nombre || principal.producto || 'PLUS',
      total: parseNumber(principal.total || 0),
      totalStr: fmtCOP(principal.total),
      primaNeta: fmtCOP(principal.prima_neta),
      impuesto: fmtCOP(principal.iva),
      amparos,
      adicional: [],
      rce: '—',
    }];
  }

  return [];
}

function normalizarQualitas(raw: any): NormalizedPlan[] {
  const planes = raw.datos?.planes || [];
  const amparosBase = (raw.datos?.amparos_base || []).map((a: any) => ({ nombre: a.cobertura, valor: a.valor_asegurado || 'INCLUIDO' }));

  return planes.map((p: any) => ({
    aseguradora: 'Quálitas',
    plan: p.nombre || 'PLAN QUÁLITAS',
    total: parseNumber(p.prima_anual_con_iva || 0),
    totalStr: p.prima_anual_con_iva || '—',
    primaNeta: '—',
    impuesto: '—',
    amparos: amparosBase,
    adicional: [],
    rce: (raw.datos?.amparos_base || []).find((a: any) => a.cobertura.includes('Civil'))?.valor_asegurado || '—',
  }));
}

function normalizarCotizacion(raw: any): NormalizedPlan[] {
  const name = String(raw.aseguradora || '').toLowerCase();
  try {
    if (name.includes('estado')) return normalizarEstado(raw);
    if (name.includes('equidad')) return normalizarEquidad(raw);
    if (name.includes('axa')) return normalizarAxa(raw);
    if (name.includes('qu')) return normalizarQualitas(raw); // quálitas / qualitas
  } catch (e) {
    console.warn(`Error normalizando ${raw.aseguradora}:`, e);
  }
  return [];
}

// ─── PDF Drawing Utilities ───────────────────────────────────────────────────

const COLORS = {
  primary: [0, 91, 137] as [number, number, number],
  accent:  [53, 174, 226] as [number, number, number],
  white:   [255, 255, 255] as [number, number, number],
  light:   [238, 247, 252] as [number, number, number],
  muted:   [96, 125, 139] as [number, number, number],
  dark:    [38, 50, 56] as [number, number, number],
  row1:    [244, 248, 252] as [number, number, number],
  green:   [49, 179, 107] as [number, number, number],
};

// Page dimensions (A4 landscape in mm)
const PW = 297; // page width
const PH = 210; // page height
const M  = 12;  // margin

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
  // White header background with subtle bottom border
  drawRect(doc, 0, 0, PW, 24, COLORS.white);
  doc.setDrawColor(...COLORS.accent);
  doc.setLineWidth(0.6);
  doc.line(0, 24, PW, 24);

  // Logo on the left
  if (logoDataUrl) {
    try { doc.addImage(logoDataUrl, 'PNG', M, 3, 46, 18); } catch(_) {}
  }

  // Right side title
  setFont(doc, 13, 'bold', COLORS.primary);
  doc.text('COTIZACIÓN COMPARATIVA DE SEGUROS DE AUTO', PW - M, 10, { align: 'right' });
  setFont(doc, 7.5, 'normal', COLORS.muted);
  doc.text('Proyectar Administradores de Seguros Ltda. | autos@segurosproyectar.com | segurosproyectar.com', PW - M, 16, { align: 'right' });
  setFont(doc, 7, 'normal', COLORS.muted);
  doc.text(`Generado: ${new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}`, PW - M, 22, { align: 'right' });
}

function drawInfoBar(doc: jsPDF, userInfo: any, vehicleInfo: any, y: number): number {
  const h = 20;
  drawRect(doc, M, y, PW - M * 2, h, COLORS.light, 4);

  const col1 = M + 4;
  const col2 = PW / 2;
  const lineH = 5.5;

  const cliente = userInfo?.cliente || {};
  const nombre = cliente.nombre_completo || `${cliente.nombre || ''} ${cliente.apellidos || ''}`.trim() || 'N/A';
  const doc_id = cliente.numero_documento ? `${cliente.tipo_documento || 'C.C.'} ${cliente.numero_documento}` : 'N/A';
  const placa = vehicleInfo?.placa || 'N/A';
  const descripcion = vehicleInfo?.descripcion || `${vehicleInfo?.marca || ''} ${vehicleInfo?.linea || ''}`.trim() || 'N/A';
  const modelo = vehicleInfo?.modelo || 'N/A';

  setFont(doc, 8, 'bold', COLORS.primary);
  doc.text('ASEGURADO', col1, y + lineH);
  setFont(doc, 7.5, 'normal', COLORS.dark);
  doc.text(`${nombre}  |  ${doc_id}`, col1 + 24, y + lineH);

  setFont(doc, 8, 'bold', COLORS.primary);
  doc.text('VEHÍCULO', col2, y + lineH);
  setFont(doc, 7.5, 'normal', COLORS.dark);
  doc.text(`${descripcion}  |  Placa: ${placa}  |  Modelo: ${modelo}`, col2 + 22, y + lineH);

  setFont(doc, 8, 'bold', COLORS.primary);
  doc.text('CELULAR', col1, y + lineH * 2);
  setFont(doc, 7.5, 'normal', COLORS.dark);
  doc.text(cliente.celular || 'N/A', col1 + 18, y + lineH * 2);

  setFont(doc, 8, 'bold', COLORS.primary);
  doc.text('CORREO', col2, y + lineH * 2);
  setFont(doc, 7.5, 'normal', COLORS.dark);
  doc.text(cliente.correo || 'N/A', col2 + 18, y + lineH * 2);

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
  const h = 34;
  const MAX_LOGO_W = 42;
  const MAX_LOGO_H = 13;

  plans.forEach((plan, i) => {
    // Background for first col (cheapest)
    drawRect(doc, colX[i], y, colW, h, i === 0 ? COLORS.light : COLORS.white);
    // Top accent bar for all cols
    drawRect(doc, colX[i], y, colW, 2, i === 0 ? COLORS.accent : [210, 225, 235] as [number,number,number]);

    // Logo — centered, aspect-ratio preserved
    const logoPath = getInsurerLogoPath(plan.aseguradora);
    const logoFit = logoPath ? logoCache[logoPath] : null;
    if (logoFit) {
      try {
        const cx = colX[i] + colW / 2;
        const logoX = cx - logoFit.w / 2;
        const logoY = y + 3;
        doc.addImage(logoFit.dataUrl, 'PNG', logoX, logoY, logoFit.w, logoFit.h);
      } catch (_) {
        setFont(doc, 8, 'bold', COLORS.primary);
        doc.text(plan.aseguradora.toUpperCase(), colX[i] + colW / 2, y + 10, { align: 'center' });
      }
    } else {
      setFont(doc, 8, 'bold', COLORS.primary);
      doc.text(plan.aseguradora.toUpperCase(), colX[i] + colW / 2, y + 10, { align: 'center' });
    }

    setFont(doc, 6, 'normal', COLORS.muted);
    const planNameTrunc = plan.plan.length > 30 ? plan.plan.substring(0, 28) + '…' : plan.plan;
    doc.text(planNameTrunc, colX[i] + colW / 2, y + 22, { align: 'center' });

    // Total price — big
    setFont(doc, 9, 'bold', COLORS.primary);
    doc.text(plan.totalStr, colX[i] + colW / 2, y + 30, { align: 'center' });
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
  even: boolean
): number {
  const h = 5;
  const totalW = labelW + values.length * colW;

  drawRect(doc, tableX, y, totalW, h, even ? COLORS.row1 : COLORS.white);

  setFont(doc, 6.5, 'normal', COLORS.dark);
  doc.text(rowLabel, tableX + 3, y + 3.7);

  values.forEach((val, i) => {
    const isPositive = val === 'SI AMPARA' || val === 'ILIMITADA' || val === 'INCLUIDO';
    const isNeg = val === '-' || val === 'No aplica' || !val;
    const color = isPositive ? COLORS.green : isNeg ? COLORS.muted : COLORS.dark;
    setFont(doc, 6.5, isPositive ? 'bold' : 'normal', color);
    doc.text(isNeg ? '—' : val, colX[i] + colW / 2, y + 3.7, { align: 'center', maxWidth: colW - 2 });
  });

  return y + h;
}

function drawFooter(doc: jsPDF, pageNum: number, totalPages: number) {
  doc.setDrawColor(...COLORS.accent);
  doc.setLineWidth(0.3);
  doc.line(M, PH - 8, PW - M, PH - 8);

  setFont(doc, 6.5, 'normal', COLORS.muted);
  doc.text(
    'Proyectar Administradores de Seguros Ltda. · Bogotá D.C., Colombia · Esta cotización es informativa y no implica aceptación del riesgo por parte de las aseguradoras.',
    M, PH - 5
  );
  doc.text(`Página ${pageNum} de ${totalPages}`, PW - M, PH - 5, { align: 'right' });
}

// ─── Main export function ────────────────────────────────────────────────────

export const generateQuoteComparisonPDF = async (
  rawResults: any[],
  userInfo: any,
  logosMap?: Record<string, string>
) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

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
  const MAX_LOGO_W = 42;
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

  // Sort by price ascending and group into chunks of up to 4 per page
  allPlans.sort((a, b) => a.total - b.total);

  const CHUNK = 4;
  const chunks: NormalizedPlan[][] = [];
  for (let i = 0; i < allPlans.length; i += CHUNK) {
    chunks.push(allPlans.slice(i, i + CHUNK));
  }

  // ── Get vehicle info ──
  const vehicleRaw = rawResults.find(r => r.vehiculo)?.vehiculo || userInfo?.vehiculo || {};

  const totalPages = chunks.length + 1; // +1 for amparos detail page(s)

  // ── Render one comparison page per chunk ──
  chunks.forEach((plans, chunkIdx) => {
    if (chunkIdx > 0) doc.addPage();

    const labelW = 65;
    const colW = (PW - M * 2 - labelW) / plans.length;
    const tableX = M;
    const colX = plans.map((_, i) => M + labelW + i * colW);

    let y = 0;
    drawHeader(doc, logoDataUrl);
    y = 24;
    y = drawInfoBar(doc, userInfo, vehicleRaw, y);

    // Section title
    setFont(doc, 9, 'bold', COLORS.primary);
    doc.text(`Opciones disponibles (${chunkIdx + 1}/${chunks.length})`, M, y + 4);
    y += 8;

    y = drawPlanHeader(doc, plans, logoCache, colW, colX, y);

    // ── Sección 1: Prima ──
    y = drawSectionRow(doc, 'PRIMA ANUAL (IVA INCLUIDO)', tableX, labelW + plans.length * colW, y);
    y = drawDataRow(doc, 'Prima anual', plans.map(p => p.totalStr), colX, colW, labelW, tableX, y, false);
    y = drawDataRow(doc, 'Prima neta', plans.map(p => p.primaNeta), colX, colW, labelW, tableX, y, true);
    y = drawDataRow(doc, 'Impuesto', plans.map(p => p.impuesto), colX, colW, labelW, tableX, y, false);

    // ── Sección 2: Responsabilidad Civil ──
    y = drawSectionRow(doc, 'RESPONSABILIDAD CIVIL EXTRACONTRACTUAL', tableX, labelW + plans.length * colW, y);
    y = drawDataRow(doc, 'Límite RCE', plans.map(p => p.rce), colX, colW, labelW, tableX, y, false);

    // ── Sección 3: Amparos principales ──
    // Get union of amparo names
    const allAmparoNames = new Set<string>();
    plans.forEach(p => p.amparos.forEach(a => allAmparoNames.add(a.nombre)));

    y = drawSectionRow(doc, 'AMPAROS INCLUIDOS', tableX, labelW + plans.length * colW, y);
    let rowEven = false;
    Array.from(allAmparoNames).slice(0, 18).forEach(nombre => {
      if (y > PH - 20) return; // avoid overflow
      const values = plans.map(plan => {
        const found = plan.amparos.find(a => a.nombre === nombre);
        return found?.valor || '—';
      });
      y = drawDataRow(doc, nombre.length > 38 ? nombre.slice(0, 36) + '…' : nombre, values, colX, colW, labelW, tableX, y, rowEven);
      rowEven = !rowEven;
    });

    // ── Sección 4: Servicios adicionales ──
    const allAdicionalNames = new Set<string>();
    plans.forEach(p => p.adicional.forEach(a => allAdicionalNames.add(a.nombre)));

    if (allAdicionalNames.size > 0 && y < PH - 30) {
      y = drawSectionRow(doc, 'SERVICIOS ADICIONALES', tableX, labelW + plans.length * colW, y);
      rowEven = false;
      Array.from(allAdicionalNames).slice(0, 10).forEach(nombre => {
        if (y > PH - 20) return;
        const values = plans.map(plan => {
          const found = plan.adicional.find(a => a.nombre === nombre);
          return found?.valor || '—';
        });
        y = drawDataRow(doc, nombre.length > 38 ? nombre.slice(0, 36) + '…' : nombre, values, colX, colW, labelW, tableX, y, rowEven);
        rowEven = !rowEven;
      });
    }

    drawFooter(doc, chunkIdx + 1, totalPages);
  });

  // ── Legal / closing page ──
  doc.addPage();
  drawHeader(doc, logoDataUrl);

  let y = 30;
  setFont(doc, 12, 'bold', COLORS.primary);
  doc.text('Notas Importantes y Condiciones', M, y);
  y += 8;

  const legal = 
    'Esta cotización es de carácter informativo y no implica aceptación del riesgo por parte de las aseguradoras. ' +
    'El valor del vehículo proviene de la guía Fasecolda vigente. Las coberturas, valores y deducibles definitivos son ' +
    'los de la póliza emitida y el clausulado de cada compañía, sujetos a inspección y a las políticas de suscripción. ' +
    'Las primas incluyen IVA. La vigencia de cada oferta depende de cada aseguradora. ' +
    'Proyectar Administradores de Seguros Ltda. actúa como intermediario de seguros y no como aseguradora.';

  setFont(doc, 8, 'normal', COLORS.dark);
  const legalLines = doc.splitTextToSize(legal, PW - M * 2);
  doc.text(legalLines, M, y);
  y += legalLines.length * 4 + 10;

  // Summary box
  drawRect(doc, M, y, PW - M * 2, 20, COLORS.light, 3);
  setFont(doc, 8, 'bold', COLORS.primary);
  doc.text('Conclusión Comercial', M + 4, y + 6);
  setFont(doc, 8, 'normal', COLORS.dark);
  const cheapest = allPlans[0];
  const conclusion = `La opción más económica encontrada es ${cheapest?.aseguradora} — ${cheapest?.plan} con un valor de ${cheapest?.totalStr}. ` +
    `Se recomienda comparar coberturas con las demás opciones para elegir la que mejor se adapte a sus necesidades.`;
  const conclusionLines = doc.splitTextToSize(conclusion, PW - M * 2 - 8);
  doc.text(conclusionLines, M + 4, y + 12);

  drawFooter(doc, totalPages, totalPages);

  doc.save(`Cotizacion_Seguros_Proyectar_${new Date().toLocaleDateString('es-CO').replace(/\//g, '-')}.pdf`);
};
