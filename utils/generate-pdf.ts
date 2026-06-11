import jsPDF from 'jspdf';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const parseNumber = (val: any): number => {
  if (typeof val === 'number') return val;
  let s = String(val ?? '').replace(/[^0-9.,]/g, '');
  if (!s) return 0;
  // Detectar el separador DECIMAL: un '.' o ',' seguido de SOLO 1 o 2 digitos al
  // final (los centavos). Lo demas (puntos/comas con 3 digitos) son miles.
  // Asi "1.528.878,09" y "1528878.09" -> 1528878.09 (antes daban 152.887.809).
  const dec = s.match(/[.,](\d{1,2})$/);
  if (dec) {
    const intPart = s.slice(0, s.length - dec[0].length).replace(/[.,]/g, '');
    s = (intPart || '0') + '.' + dec[1];
  } else {
    s = s.replace(/[.,]/g, ''); // todos son separadores de miles
  }
  return parseFloat(s) || 0;
};

// Pesos colombianos sin centavos, formato $ 1.234.567
const moneyStr = (total: number): string =>
  total > 0 ? `$ ${Math.round(total).toLocaleString('es-CO')}` : '—';

// Limpia el nombre de un amparo: quita límites/montos para que sea genérico y compare entre aseguradoras.
// Ej: "Grúa en accidente hasta 70 SMLDV" -> "Grúa en accidente"
function cleanAmparo(n: string): string {
  let s = String(n || '').trim();
  s = s.split(/\s+(?:hasta|sin|de\s+hasta)\b/i)[0];
  s = s.replace(/\(.*?\)/g, '');
  s = s.replace(/\$\s*[\d.,]+/g, '');
  s = s.replace(/\b\d[\d.,]*\b/g, '');
  s = s.replace(/\b(smldv|smmlv|smlv|salarios?|m[ií]nimos?|millones?|mll|deducible|vigencia|eventos?|d[ií]as)\b/gi, '');
  s = s.replace(/^[\s,;:.\-–—]+|[\s,;:.\-–—]+$/g, '').replace(/\s{2,}/g, ' ').trim();
  if (s) s = s.charAt(0).toUpperCase() + s.slice(1);
  return s || String(n || '').trim();
}

// Mapea un amparo a un nombre canónico para que se alinee en la misma fila entre aseguradoras.
function canonicalAmparo(raw: string): string {
  const c = cleanAmparo(raw);
  const s = c.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const has = (...w: string[]) => w.every(x => s.includes(x));
  if (s.includes('responsabilidad civil') || s === 'rce') return 'RCE';
  if (has('perdida total', 'dano')) return 'Pérdida total por daños';
  if (has('perdida total', 'hurto')) return 'Pérdida total por hurto';
  if (s.includes('perdida total')) return 'Pérdida total por daños';
  if (has('perdida parcial', 'dano')) return 'Pérdida parcial por daños';
  if (has('perdida parcial', 'hurto')) return 'Pérdida parcial por hurto';
  if (s.includes('perdida parcial')) return 'Pérdida parcial por daños';
  // "mayor cuantia" = pérdida total, "menor cuantia" = pérdida parcial (mismas filas)
  if (has('mayor cuantia', 'hurto')) return 'Pérdida total por hurto';
  if (has('menor cuantia', 'hurto')) return 'Pérdida parcial por hurto';
  if (s.includes('mayor cuantia')) return 'Pérdida total por daños';
  if (s.includes('menor cuantia')) return 'Pérdida parcial por daños';
  if (s.includes('terremoto') || s.includes('temblor') || s.includes('volcan') || s.includes('naturaleza') || s.includes('natural')) return 'Terremoto y eventos naturales';
  if (s.includes('patrimonial')) return 'Protección patrimonial';
  if (s.includes('juridic')) return 'Asistencia jurídica';
  if (s.includes('transporte')) return 'Gastos de transporte';
  if (s.includes('taller')) return 'Carro taller';
  if (s.includes('reemplazo') || s.includes('sustituto')) return 'Vehículo de reemplazo';
  if (s.includes('conductor')) return 'Conductor elegido';
  if (s.includes('grua')) return 'Grúa en accidente';
  if (s.includes('vidrio') || s.includes('cristal')) return 'Rotura de vidrios';
  if (s.includes('viajero') || s.includes('viaje')) return 'Asistencia en viaje';
  if (s.includes('hogar')) return 'Asistencia al hogar';
  if (s.includes('muerte') || s.includes('accidentes personales') || s.includes('accidente personal')) return 'Muerte accidental';
  if (s.includes('medic')) return 'Asistencia médica';
  return c;
}

// Amparos FIJOS confirmados por el cliente. Cada uno lleva:
//   nombre    -> nombre canónico (debe coincidir con canonicalAmparo)
//   valor     -> límite/cantidad a mostrar ('Sí' = incluido sin cifra)
//   deducible -> deducible a mostrar resaltado ('' = no aplica)
// SOLO con los datos entregados por el cliente; nada inventado.
type AmparoFijo = { nombre: string; valor: string; deducible: string };

const AMPAROS_EQUIDAD: AmparoFijo[] = [
  { nombre: 'Pérdida total por daños',        valor: 'Sí',            deducible: 'Sin deducible' },
  { nombre: 'Pérdida parcial por daños',      valor: 'Sí',            deducible: '1 SMMLV' },
  { nombre: 'Pérdida total por hurto',        valor: 'Sí',            deducible: 'Sin deducible' },
  { nombre: 'Pérdida parcial por hurto',      valor: 'Sí',            deducible: '1 SMMLV' },
  { nombre: 'Terremoto y eventos naturales',  valor: 'Sí',            deducible: '1 SMMLV' },
  { nombre: 'Protección patrimonial',         valor: 'Sí',            deducible: '' },
  { nombre: 'Asistencia jurídica',            valor: 'Sí',            deducible: '' },
  { nombre: 'Muerte accidental',              valor: 'Hasta $ 60.000.000', deducible: '' },
  { nombre: 'Gastos de transporte',           valor: '$40.000 · hasta 30 días', deducible: '' },
  { nombre: 'Vehículo de reemplazo',          valor: 'Hasta 25 días', deducible: '' },
  { nombre: 'Carro taller',                   valor: 'Hasta 5 servicios',  deducible: '' },
  { nombre: 'Conductor elegido',              valor: 'Hasta 12 servicios', deducible: '' },
  { nombre: 'Grúa en accidente',              valor: 'Sí',            deducible: '' },
  { nombre: 'Asistencia en viaje',            valor: 'Sí',            deducible: '' },
  { nombre: 'Rotura de vidrios',              valor: 'Sí',            deducible: '' },
  { nombre: 'Asistencia al hogar',            valor: 'Sí',            deducible: '' },
];

const AMPAROS_AXA: AmparoFijo[] = [
  { nombre: 'Pérdida total por daños',        valor: 'Sí',            deducible: 'Sin deducible' },
  { nombre: 'Pérdida parcial por daños',      valor: 'Sí',            deducible: '1 SMMLV' },
  { nombre: 'Pérdida total por hurto',        valor: 'Sí',            deducible: 'Sin deducible' },
  { nombre: 'Pérdida parcial por hurto',      valor: 'Sí',            deducible: '1 SMMLV' },
  { nombre: 'Terremoto y eventos naturales',  valor: 'Sí',            deducible: '' },
  { nombre: 'Protección patrimonial',         valor: 'Sí',            deducible: '' },
  { nombre: 'Asistencia jurídica',            valor: 'Sí',            deducible: '' },
  { nombre: 'Muerte accidental',              valor: 'Hasta $ 50.000.000', deducible: '' },
  { nombre: 'Gastos de transporte',           valor: '$20.000 · hasta 60 días', deducible: '' },
  { nombre: 'Vehículo de reemplazo',          valor: 'Hasta 20 días', deducible: '' },
  { nombre: 'Carro taller',                   valor: 'Sin límite',    deducible: '' },
  { nombre: 'Conductor elegido',              valor: 'Sí',            deducible: '' },
  { nombre: 'Grúa en accidente',              valor: 'Hasta 70 SMLDV', deducible: '' },
  { nombre: 'Asistencia médica',              valor: 'Sí',            deducible: '' },
  { nombre: 'Asistencia en viaje',            valor: 'Sí',            deducible: '' },
  { nombre: 'Rotura de vidrios',              valor: 'Sin límite',    deducible: '' },
];

// Seguros del Estado — PLAN ELITE (Seguro Elite Para Carro): coberturas FIJAS.
// Deducible '0 SMMLV' -> 'Sin deducible'.
const AMPAROS_ESTADO: AmparoFijo[] = [
  { nombre: 'Pérdida total por daños',        valor: 'Sí',            deducible: 'Sin deducible' },
  { nombre: 'Pérdida parcial por daños',      valor: 'Sí',            deducible: '$ 1.000.000' },
  { nombre: 'Pérdida total por hurto',        valor: 'Sí',            deducible: 'Sin deducible' },
  { nombre: 'Pérdida parcial por hurto',      valor: 'Sí',            deducible: '$ 1.000.000' },
  { nombre: 'Terremoto y eventos naturales',  valor: 'Sí',            deducible: '$ 1.000.000' },
  { nombre: 'Protección patrimonial',         valor: 'Sí',            deducible: '' },
  { nombre: 'Asistencia jurídica',            valor: 'Ilimitada',     deducible: '' },
  { nombre: 'Muerte accidental',              valor: 'Hasta $ 50.000.000', deducible: '' },
  { nombre: 'Gastos de transporte',           valor: '2 SMDLV · hasta 30 días', deducible: '' },
  { nombre: 'Vehículo de reemplazo',          valor: 'Hasta 30 días', deducible: '' },
  { nombre: 'Carro taller',                   valor: 'Sí',            deducible: '' },
  { nombre: 'Conductor elegido',              valor: 'Sí',            deducible: '' },
  { nombre: 'Grúa en accidente',              valor: 'Sí',            deducible: '' },
  { nombre: 'Asistencia en viaje',            valor: 'Sí',            deducible: '' },
  { nombre: 'Rotura de vidrios',              valor: 'Sí',            deducible: '' },
];
const ESTADO_RCE = '$ 4.400.000.000';

// Quálitas — PLAN AMPLIA (Quálitas Amplia): coberturas FIJAS.
const AMPAROS_QUALITAS: AmparoFijo[] = [
  { nombre: 'Pérdida total por daños',        valor: 'Sí',            deducible: 'Sin deducible' },
  { nombre: 'Pérdida parcial por daños',      valor: 'Sí',            deducible: '$ 1.400.000' },
  { nombre: 'Pérdida total por hurto',        valor: 'Sí',            deducible: 'Sin deducible' },
  { nombre: 'Pérdida parcial por hurto',      valor: 'Sí',            deducible: '$ 1.400.000' },
  { nombre: 'Terremoto y eventos naturales',  valor: 'Sí',            deducible: '' },
  { nombre: 'Protección patrimonial',         valor: 'Sí',            deducible: '' },
  { nombre: 'Asistencia jurídica',            valor: 'Hasta $ 40.000.000', deducible: '' },
  { nombre: 'Muerte accidental',              valor: 'Hasta $ 20.000.000', deducible: '' },
  { nombre: 'Gastos de transporte',           valor: 'Hasta $ 1.500.000', deducible: '' },
  { nombre: 'Vehículo de reemplazo',          valor: 'Sí',            deducible: '' },
  { nombre: 'Carro taller',                   valor: 'Ilimitada',     deducible: '' },
  { nombre: 'Conductor elegido',              valor: 'Ilimitada',     deducible: '' },
  { nombre: 'Grúa en accidente',              valor: 'Ilimitada',     deducible: '' },
  { nombre: 'Asistencia en viaje',            valor: 'Sí',            deducible: '' },
  { nombre: 'Rotura de vidrios',              valor: 'Sí',            deducible: '' },
];
const QUALITAS_RCE = '$ 4.000.000.000';

// Zurich — PLAN FULL (Zurich Full): coberturas FIJAS.
const AMPAROS_ZURICH: AmparoFijo[] = [
  { nombre: 'Pérdida total por daños',        valor: 'Sí',            deducible: 'Sin deducible' },
  { nombre: 'Pérdida parcial por daños',      valor: 'Sí',            deducible: '1 SMMLV' },
  { nombre: 'Pérdida total por hurto',        valor: 'Sí',            deducible: 'Sin deducible' },
  { nombre: 'Pérdida parcial por hurto',      valor: 'Sí',            deducible: '1 SMMLV' },
  { nombre: 'Terremoto y eventos naturales',  valor: 'Sí',            deducible: '1 SMMLV' },
  { nombre: 'Protección patrimonial',         valor: 'Sí',            deducible: '' },
  { nombre: 'Asistencia jurídica',            valor: 'Sí',            deducible: '' },
  { nombre: 'Muerte accidental',              valor: 'Hasta $ 50.000.000', deducible: '' },
  { nombre: 'Gastos de transporte',           valor: '$60.000 · hasta 30 días', deducible: '' },
  { nombre: 'Vehículo de reemplazo',          valor: 'Hasta 20 días', deducible: '' },
  { nombre: 'Asistencia en viaje',            valor: 'Sí',            deducible: '' },
  { nombre: 'Rotura de vidrios',              valor: 'Hasta 1 SMMLV', deducible: '' },
];
const ZURICH_RCE = '$ 5.000.000.000';

// ¿El valor que trae el bot es "generico" (solo presencia, sin cifra)?
function _valorGenerico(v: string): boolean {
  const s = String(v ?? '').trim();
  return !s || /^(incluido|incluye|si|s[ií]|amparado|aplica|cubre|si cubre|ilimitad[ao])$/i.test(s);
}

// Cruza lo que trae el BOT (dinamico, PRIORIDAD) con lo FIJO (respaldo):
//  - Si el bot trae un valor ESPECIFICO (una cifra/limite) -> manda el bot.
//  - Si el bot trae algo generico ("INCLUIDO") o NO lo trae -> se usa el fijo
//    (que tiene el deducible y el limite correctos, que el bot no extrae).
//  - El DEDUCIBLE siempre se toma del fijo (el bot nunca lo trae).
//  - Coberturas que el bot trae y NO estan en lo fijo -> se agregan como extra.
function mezclarAmparos(
  fijos: AmparoFijo[],
  dinamicos: { nombre: string; valor: string }[]
): { nombre: string; valor: string; deducible?: string }[] {
  const fijoPorCanon = new Map<string, AmparoFijo>();
  for (const f of fijos) fijoPorCanon.set(canonicalAmparo(f.nombre), f);
  const out: { nombre: string; valor: string; deducible?: string }[] = [];
  const vistos = new Set<string>();
  for (const d of (dinamicos || [])) {
    const c = canonicalAmparo(d.nombre);
    if (!c || c === 'RCE' || c.toLowerCase().includes('responsabilidad civil') || vistos.has(c)) continue;
    vistos.add(c);
    const fijo = fijoPorCanon.get(c);
    const vBot = String(d.valor ?? '').trim();
    const valor = !_valorGenerico(vBot) ? vBot : (fijo ? fijo.valor : (vBot || 'Sí'));
    out.push({ nombre: fijo ? fijo.nombre : d.nombre, valor, deducible: fijo ? fijo.deducible : '' });
  }
  for (const f of fijos) {
    const c = canonicalAmparo(f.nombre);
    if (vistos.has(c)) continue;
    vistos.add(c);
    out.push(f);
  }
  return out;
}

// ─── Data normalizers for each insurer ───────────────────────────────────────

interface NormalizedPlan {
  aseguradora: string;
  plan: string;
  total: number;
  totalStr: string;
  valorAsegurado: string;
  numeroCotizacion: string;
  amparos: { nombre: string; valor: string; deducible?: string }[];
  rce: string;
}

function normalizarEstado(raw: any): NormalizedPlan[] {
  const cotizaciones = raw.cotizaciones || [];
  if (!cotizaciones.length && raw.cotizacion_seleccionada) cotizaciones.push(raw.cotizacion_seleccionada);
  const numeroCot = raw.metadata?.resultquoteid || '—';

  return cotizaciones.map((c: any) => {
    const total = parseNumber(c.prima_total || c.total || 0);
    // Amparos del bot (dinamicos) cruzados con los FIJOS del PLAN ELITE.
    const dinamicos = (c.amparos || []).map((a: any) => ({ nombre: a.nombre, valor: a.valor }));
    return {
      aseguradora: 'Estado',
      plan: c.nombre || 'PLAN ELITE',
      total,
      totalStr: moneyStr(total),
      valorAsegurado: '—',
      numeroCotizacion: numeroCot,
      amparos: mezclarAmparos(AMPAROS_ESTADO, dinamicos),
      rce: (c.responsabilidad_civil_extracontractual?.[0]?.valor) ||
           (c.secciones?.['Responsabilidad Civil Extracontractual']?.[0]?.valor) || ESTADO_RCE,
    };
  });
}

function normalizarEquidad(raw: any): NormalizedPlan[] {
  const planes = raw.datos?.planes || [];
  return planes.map((p: any) => {
    const total = parseNumber(p.prima_anual || 0);
    return {
      aseguradora: 'Equidad',
      plan: p.nombre_plan || 'PLAN FULL',
      total,
      totalStr: moneyStr(total),
      valorAsegurado: '—',
      numeroCotizacion: '—',
      amparos: AMPAROS_EQUIDAD,
      rce: '$ 5.000.000.000',
    };
  });
}

// AXA Colpatria — AU PLUS NUEVO: coberturas FIJAS (lista AMPAROS_AXA)
const AXA_RCE = '$ 4.000.000.000';

function normalizarAxa(raw: any): NormalizedPlan[] {
  const planes = raw.cotizaciones_disponibles || [];
  const principal = raw.plan_seleccionado || raw.producto?.plan_seleccionado;

  if (planes.length > 0) {
    return planes.map((p: any) => {
      const total = parseNumber(p.total || 0);
      return {
        aseguradora: 'AXA',
        plan: p.producto || p.nombre || 'AU PLUS NUEVO',
        total,
        totalStr: moneyStr(total),
        valorAsegurado: '—',
        numeroCotizacion: '—',
        amparos: AMPAROS_AXA,
        rce: AXA_RCE,
      };
    });
  }

  if (principal) {
    const total = parseNumber(principal.total || 0);
    return [{
      aseguradora: 'AXA',
      plan: raw.producto?.nombre || principal.producto || 'AU PLUS NUEVO',
      total,
      totalStr: moneyStr(total),
      valorAsegurado: '—',
      numeroCotizacion: '—',
      amparos: AMPAROS_AXA,
      rce: AXA_RCE,
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
      plan: p.nombre || 'PLAN AMPLIA',
      total,
      totalStr: moneyStr(total),
      valorAsegurado: valorAseg,
      numeroCotizacion: numeroCot,
      amparos: mezclarAmparos(AMPAROS_QUALITAS, amparosBase),
      rce: (raw.datos?.amparos_base || []).find((a: any) => String(a.cobertura || '').includes('Civil'))?.valor_asegurado || QUALITAS_RCE,
    };
  });
}

function normalizarZurich(raw: any): NormalizedPlan[] {
  const planes = raw.planes || raw.datos?.planes || [];
  return planes.map((p: any) => {
    const total = parseNumber(p.prima_anual_con_iva || p.prima_anual || 0);
    return {
      aseguradora: 'Zurich',
      plan: p.nombre || 'PLAN FULL',
      total,
      totalStr: moneyStr(total),
      valorAsegurado: '—',
      numeroCotizacion: '—',
      amparos: mezclarAmparos(AMPAROS_ZURICH, (p.amparos || []).map((a: any) => ({
        nombre: a.cobertura || a.nombre,
        valor: a.limite || a.valor || 'INCLUIDO',
      }))),
      rce: (p.amparos || []).find((a: any) => String(a.cobertura || a.nombre || '').toLowerCase().includes('rce') || String(a.cobertura || a.nombre || '').toLowerCase().includes('civil'))?.limite || ZURICH_RCE,
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
      totalStr: moneyStr(total),
      valorAsegurado: '—',
      numeroCotizacion: p.numero_cotizacion || raw.numero_cotizacion || '—',
      amparos: (p.amparos || []).map((a: any) => ({
        nombre: a.cobertura || a.nombre || 'Cobertura',
        valor: a.limite || a.valor || a.valor_asegurado || 'INCLUIDO',
      })),
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
    if (name.includes('qu')) return normalizarQualitas(raw);
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
  faint:   [176, 190, 197] as [number, number, number],
  red:     [211, 47, 47] as [number, number, number],
  amber:   [193, 110, 16] as [number, number, number],   // deducible con cargo (resaltado)
  amberBg: [255, 244, 224] as [number, number, number],  // fondo chip deducible
};

const SIN_DATO = 'x';

const PW = 215.9;
const PH = 279.4;
const M  = 12;

function setFont(doc: jsPDF, size: number, style: 'normal' | 'bold' = 'normal', color: [number, number, number] = COLORS.dark) {
  doc.setFontSize(size);
  doc.setFont('helvetica', style);
  doc.setTextColor(...color);
}

function drawRect(doc: jsPDF, x: number, y: number, w: number, h: number, color: [number, number, number], radius = 0) {
  doc.setFillColor(...color);
  if (radius > 0) doc.roundedRect(x, y, w, h, radius, radius, 'F');
  else doc.rect(x, y, w, h, 'F');
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
  if (n.includes('qu')) return '/logos/qualitas.png';
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

async function loadImageFit(dataUrl: string, maxW: number, maxH: number): Promise<{ dataUrl: string; w: number; h: number } | null> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      let w = maxW;
      let h = maxW / ratio;
      if (h > maxH) { h = maxH; w = maxH * ratio; }
      resolve({ dataUrl, w, h });
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

function drawPlanHeader(doc: jsPDF, plans: NormalizedPlan[], logoCache: Record<string, { dataUrl: string; w: number; h: number }>, colW: number, colX: number[], y: number, priceFont: number): number {
  const h = 32;

  plans.forEach((plan, i) => {
    drawRect(doc, colX[i], y, colW, h, i === 0 ? COLORS.light : COLORS.white);
    drawRect(doc, colX[i], y, colW, 2, i === 0 ? COLORS.accent : [210, 225, 235] as [number,number,number]);

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
        doc.text(plan.aseguradora.toUpperCase(), colX[i] + colW / 2, y + 11, { align: 'center', maxWidth: colW - 2 });
      }
    } else {
      setFont(doc, 8, 'bold', COLORS.primary);
      doc.text(plan.aseguradora.toUpperCase(), colX[i] + colW / 2, y + 11, { align: 'center', maxWidth: colW - 2 });
    }

    setFont(doc, 5.8, 'normal', COLORS.muted);
    const planNameTrunc = plan.plan.length > 24 ? plan.plan.substring(0, 22) + '…' : plan.plan;
    doc.text(planNameTrunc, colX[i] + colW / 2, y + 21, { align: 'center', maxWidth: colW - 1 });

    const priceStr = (plan.totalStr && plan.totalStr !== '—') ? plan.totalStr : 'Consultar';
    setFont(doc, priceFont, 'bold', COLORS.primary);
    doc.text(priceStr, colX[i] + colW / 2, y + 29, { align: 'center', maxWidth: colW - 1 });
  });

  return y + h;
}

function drawSectionRow(doc: jsPDF, label: string, tableX: number, tableW: number, y: number): number {
  drawRect(doc, tableX, y, tableW, 5.3, COLORS.primary);
  setFont(doc, 6.8, 'bold', COLORS.white);
  doc.text(label.toUpperCase(), tableX + 3, y + 3.8);
  return y + 5.3;
}

function drawDataRow(
  doc: jsPDF, rowLabel: string, values: string[], colX: number[], colW: number, labelW: number,
  tableX: number, y: number, even: boolean,
  emphasize = false, emptyText = SIN_DATO, emptyColor: [number, number, number] = COLORS.red, baseFont = 6.5
): number {
  const h = 5;
  const totalW = labelW + values.length * colW;
  drawRect(doc, tableX, y, totalW, h, even ? COLORS.row1 : COLORS.white);

  setFont(doc, Math.min(6.4, baseFont + 0.4), 'bold', COLORS.muted);
  doc.text(rowLabel, tableX + 3, y + 3.5, { maxWidth: labelW - 4 });

  values.forEach((val, i) => {
    const v = (val ?? '').toString().trim();
    const isPositive = v === 'SI AMPARA' || v === 'ILIMITADA' || v === 'INCLUIDO' || v === 'Sí' || v === 'SÍ' || v === 'Si' || v.toLowerCase() === 'sin deducible';
    const isEmpty = !v || v === '-' || v === '—' || v.toUpperCase() === 'N/A' || v.toLowerCase() === 'no aplica';
    const isRedMark = isEmpty && emptyColor === COLORS.red;
    const color = isEmpty ? emptyColor : (emphasize ? COLORS.primary : (isPositive ? COLORS.green : COLORS.dark));
    const bold = isRedMark || (!isEmpty && (emphasize || isPositive));
    const fsize = (emphasize && !isEmpty) ? baseFont + 1.4 : baseFont;
    drawCellText(doc, isEmpty ? emptyText : v, colX[i] + colW / 2, y + 3.5, colW - 1.6, fsize, bold ? 'bold' : 'normal', color);
  });

  return y + h;
}

// Dibuja texto centrado en una celda garantizando que CABE en UNA sola línea:
// primero reduce el tamaño y, si aun no cabe, recorta con "…". Evita solapamientos.
function drawCellText(
  doc: jsPDF, text: string, cx: number, yy: number, maxW: number,
  size: number, style: 'normal' | 'bold', color: [number, number, number]
) {
  let s = size;
  doc.setFont('helvetica', style);
  doc.setTextColor(...color);
  doc.setFontSize(s);
  while (s > 4.2 && doc.getTextWidth(text) > maxW) { s -= 0.2; doc.setFontSize(s); }
  let t = text;
  if (doc.getTextWidth(t) > maxW) {
    while (t.length > 1 && doc.getTextWidth(t + '…') > maxW) t = t.slice(0, -1);
    t += '…';
  }
  doc.text(t, cx, yy, { align: 'center' });
}

type CeldaAmparo = { valor: string; deducible: string } | null;

// Fila de amparo: muestra la CANTIDAD/límite (o "Sí" verde si solo va incluido,
// "x" roja si no cubre) y, si aplica, el DEDUCIBLE resaltado en un chip ámbar
// debajo (verde si es "Sin deducible"). Alturas variables sin solapamientos.
function drawAmparoRow(
  doc: jsPDF, label: string, celdas: CeldaAmparo[], colX: number[], colW: number,
  labelW: number, tableX: number, y: number, even: boolean, baseFont: number
): number {
  const hayDed = celdas.some(c => c && c.deducible);
  const h = hayDed ? 8 : 5;
  const totalW = labelW + celdas.length * colW;
  drawRect(doc, tableX, y, totalW, h, even ? COLORS.row1 : COLORS.white);

  const labY = hayDed ? y + 4.3 : y + 3.4;
  setFont(doc, Math.min(6.4, baseFont + 0.4), 'bold', COLORS.muted);
  doc.text(label, tableX + 3, labY, { maxWidth: labelW - 4 });

  celdas.forEach((c, i) => {
    const cx = colX[i] + colW / 2;
    if (!c) {
      drawCellText(doc, SIN_DATO, cx, labY, colW - 1.6, baseFont, 'bold', COLORS.red);
      return;
    }
    const esSi = c.valor === 'Sí';
    const mainY = hayDed ? y + 3.1 : y + 3.4;
    drawCellText(doc, c.valor, cx, mainY, colW - 1.6, baseFont,
                 esSi ? 'bold' : 'normal', esSi ? COLORS.green : COLORS.dark);
    if (c.deducible) {
      const sinDed = c.deducible.toLowerCase() === 'sin deducible';
      const txt = sinDed ? 'Sin deducible' : 'Ded. ' + c.deducible;
      const dedFont = Math.max(4.8, baseFont - 1.3);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(dedFont);
      const w = Math.min(colW - 1.4, doc.getTextWidth(txt) + 2.6);
      drawRect(doc, cx - w / 2, y + 4.9, w, 2.7, sinDed ? COLORS.light : COLORS.amberBg, 0.7);
      drawCellText(doc, txt, cx, y + 6.85, colW - 1.8, dedFont, 'bold',
                   sinDed ? COLORS.green : COLORS.amber);
    }
  });

  return y + h;
}

function drawFooter(doc: jsPDF, pageNum: number, totalPages: number) {
  doc.setDrawColor(...COLORS.accent);
  doc.setLineWidth(0.3);
  doc.line(M, PH - 9, PW - M, PH - 9);
  setFont(doc, 6, 'normal', COLORS.muted);
  doc.text('Proyectar Administradores de Seguros Ltda. · NIT 830139875-7 · Intermediario vigilado por la Superintendencia Financiera de Colombia', M, PH - 5);
  if (totalPages > 1) {
    doc.text(`Página ${pageNum} de ${totalPages}`, PW - M, PH - 5, { align: 'right' });
  }
}

// ─── Main export function ────────────────────────────────────────────────────

export const generateQuoteComparisonPDF = async (
  rawResults: any[],
  userInfo: any,
  _logosMap?: Record<string, string>
) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });

  let logoDataUrl: string | null = null;
  try { logoDataUrl = await loadImageAsDataUrl('/logo.png'); } catch (_) {}

  const allInsurerLogoSrcs = [
    '/logos/axa-colpatria.png', '/logos/equidad.png', '/logos/seguros-del-estado.png',
    '/logos/seguros-mudial.png', '/logos/qualitas.png', '/logos/zurich.png',
    '/logos/HDI.jpg', '/logos/SBS.jpg',
  ];
  const logoCache: Record<string, { dataUrl: string; w: number; h: number }> = {};
  await Promise.all(allInsurerLogoSrcs.map(async src => {
    const dataUrl = await loadImageAsDataUrl(src);
    if (dataUrl) {
      const fit = await loadImageFit(dataUrl, 40, 13);
      if (fit) logoCache[src] = fit;
    }
  }));

  // Normalize all quotes
  const allPlans: NormalizedPlan[] = [];
  for (const raw of rawResults) {
    if (raw.status === 'error' || raw.estado === 'error') continue;
    allPlans.push(...normalizarCotizacion(raw));
  }

  if (allPlans.length === 0) {
    alert('No hay cotizaciones exitosas para generar el PDF.');
    return;
  }

  // Una sola póliza por aseguradora: la MÁS CARA (mejor cobertura).
  const bestPerInsurer = new Map<string, NormalizedPlan>();
  for (const p of allPlans) {
    const key = p.aseguradora.toLowerCase();
    const prev = bestPerInsurer.get(key);
    if (!prev || p.total > prev.total) bestPerInsurer.set(key, p);
  }
  const plans = Array.from(bestPerInsurer.values())
    .sort((a, b) => (a.total > 0 ? a.total : Infinity) - (b.total > 0 ? b.total : Infinity));

  const vehicleRaw = rawResults.find(r => r.vehiculo)?.vehiculo || userInfo?.vehiculo || {};
  const cheapest = plans[0];

  // ── Adaptativo: hasta 5 aseguradoras → 1 página; 6 a 8 → 2 páginas repartidas ──
  const N = plans.length;
  const perPage = N <= 5 ? N : Math.ceil(N / 2);
  const pages: NormalizedPlan[][] = [];
  for (let i = 0; i < N; i += perPage) pages.push(plans.slice(i, i + perPage));
  const totalPages = pages.length;

  // ── Render de una página de comparación (subconjunto de aseguradoras) ──
  const renderPage = (pagePlans: NormalizedPlan[], pageIdx: number, isLast: boolean) => {
    const n = pagePlans.length;
    const labelW = n <= 4 ? 48 : 42;
    const vFont = n <= 5 ? 6.5 : 6;
    const priceFont = n <= 4 ? 10 : 8;
    const colW = (PW - M * 2 - labelW) / n;
    const tableX = M;
    const colX = pagePlans.map((_, i) => M + labelW + i * colW);
    const tableW = labelW + n * colW;
    const reserve = isLast ? 40 : 20; // espacio inferior (la última lleva recomendación + nota legal)

    drawHeader(doc, logoDataUrl);
    let y = 24;
    y = drawInfoBar(doc, userInfo, vehicleRaw, y);

    setFont(doc, 10, 'bold', COLORS.primary);
    doc.text(
      totalPages > 1
        ? `Mejores opciones para tu seguro (parte ${pageIdx} de ${totalPages}):`
        : 'Estas son las ofertas recomendadas para tu seguro:',
      M, y + 4
    );
    y += 8;

    y = drawPlanHeader(doc, pagePlans, logoCache, colW, colX, y, priceFont);

    // Datos principales (filas de DATO: si falta → "n/d" gris)
    y = drawSectionRow(doc, 'DATOS PRINCIPALES', tableX, tableW, y);
    y = drawDataRow(doc, 'Prima anual (IVA incl.)', pagePlans.map(p => p.totalStr), colX, colW, labelW, tableX, y, false, true, 'n/d', COLORS.faint, vFont);
    y = drawDataRow(doc, 'Valor asegurado', pagePlans.map(p => p.valorAsegurado), colX, colW, labelW, tableX, y, true, false, 'n/d', COLORS.faint, vFont);
    y = drawDataRow(doc, 'N° de cotización', pagePlans.map(p => p.numeroCotizacion), colX, colW, labelW, tableX, y, false, false, 'n/d', COLORS.faint, vFont);

    // Responsabilidad Civil (cobertura: si falta → "x" roja)
    y = drawSectionRow(doc, 'RESPONSABILIDAD CIVIL EXTRACONTRACTUAL', tableX, tableW, y);
    y = drawDataRow(doc, 'Límite RCE', pagePlans.map(p => p.rce), colX, colW, labelW, tableX, y, false, false, SIN_DATO, COLORS.red, vFont);

    // Amparos: nombres canónicos alineados entre aseguradoras. Cada celda lleva
    // el VALOR/cantidad (o "Sí" verde / "x" roja) y el DEDUCIBLE resaltado abajo.
    const ampMap = new Map<string, CeldaAmparo[]>();
    const ampOrder: string[] = [];
    pagePlans.forEach((plan, pi) => {
      plan.amparos.forEach(a => {
        const rawLow = String(a.nombre || '').toLowerCase();
        // Saltar renglones que SON un deducible suelto (de aseguradoras dinámicas);
        // nuestros amparos fijos llevan el deducible aparte, no en el nombre.
        if (rawLow.includes('deduc')) return;
        const canon = canonicalAmparo(a.nombre);
        if (!canon) return;
        if (canon === 'RCE' || canon.toLowerCase().includes('responsabilidad civil')) return; // RCE va en su sección
        if (!ampMap.has(canon)) { ampMap.set(canon, new Array(n).fill(null)); ampOrder.push(canon); }
        const arr = ampMap.get(canon)!;
        if (arr[pi]) return; // primera coincidencia gana
        const valorRaw = String(a.valor ?? '').trim();
        const incluido = !valorRaw || /^(incluido|incluye|si|s[ií]|amparado|ilimitad[ao])$/i.test(valorRaw);
        arr[pi] = { valor: incluido ? 'Sí' : valorRaw, deducible: String(a.deducible ?? '').trim() };
      });
    });
    ampOrder.sort((a, b) => ampMap.get(b)!.filter(Boolean).length - ampMap.get(a)!.filter(Boolean).length);

    if (ampOrder.length > 0) {
      const yBar = y;
      y = drawSectionRow(doc, 'AMPAROS · CANTIDAD Y DEDUCIBLE', tableX, tableW, y);
      // Leyenda de colores (derecha de la franja)
      setFont(doc, 5, 'normal', COLORS.white);
      doc.text('Verde: incluido    Ámbar: deducible con cargo    x: no cubre', tableX + tableW - 3, yBar + 3.6, { align: 'right' });

      let rowEven = false;
      let ocultos = 0;
      ampOrder.forEach(nombre => {
        const celdas = ampMap.get(nombre)!;
        const rowH = celdas.some(c => c && c.deducible) ? 8 : 5;
        if (y + rowH > PH - reserve) { ocultos++; return; }
        const label = nombre.length > 30 ? nombre.slice(0, 28) + '…' : nombre;
        y = drawAmparoRow(doc, label, celdas, colX, colW, labelW, tableX, y, rowEven, vFont);
        rowEven = !rowEven;
      });
      if (ocultos > 0) {
        setFont(doc, 5.5, 'normal', COLORS.muted);
        doc.text(`(+${ocultos} amparos adicionales — ver el detalle de cada póliza)`, tableX + 3, y + 3.2);
        y += 4;
      }
    }

    // Recomendación + nota legal SOLO en la última página
    if (isLast && cheapest) {
      const planCorto = cheapest.plan.length > 22 ? cheapest.plan.slice(0, 20) + '…' : cheapest.plan;
      setFont(doc, 7.2, 'bold', COLORS.primary);
      doc.text('Recomendación:', M, PH - 25);
      setFont(doc, 7.2, 'normal', COLORS.dark);
      const reco = `${cheapest.aseguradora} (${planCorto}) es la de menor precio: ${cheapest.totalStr}. Compara las coberturas y elige la mejor para ti.`;
      doc.text(doc.splitTextToSize(reco, PW - M * 2 - 26).slice(0, 2), M + 26, PH - 25);

      setFont(doc, 5.6, 'normal', COLORS.muted);
      const legal = 'Cotización informativa; no implica aceptación del riesgo por parte de las aseguradoras. Coberturas, valores y deducibles definitivos según la póliza y el clausulado de cada compañía, sujetos a inspección y suscripción. Primas con IVA. Proyectar actúa como intermediario de seguros, no como aseguradora.';
      doc.text(doc.splitTextToSize(legal, PW - M * 2).slice(0, 3), M, PH - 17);
    }

    drawFooter(doc, pageIdx, totalPages);
  };

  pages.forEach((pp, idx) => {
    if (idx > 0) doc.addPage();
    renderPage(pp, idx + 1, idx === pages.length - 1);
  });

  doc.save(`Cotizacion_Seguros_Proyectar_${new Date().toLocaleDateString('es-CO').replace(/\//g, '-')}.pdf`);
};
