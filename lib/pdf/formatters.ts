import React from 'react';
import { InsurerOption } from '../../types/autoQuote';

export function formatCurrency(value: number): string {
  if (value === undefined || value === null) return '—';
  return new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP', 
    maximumFractionDigits: 0 
  }).format(value);
}

export function renderCellValue(value: any, format?: string): React.ReactNode {
  if (value === true) return React.createElement('span', { className: "check" }, "✓");
  if (value === false) return React.createElement('span', { className: "cross" }, "✗");
  if (value === null || value === undefined || value === "") return "—";
  
  if (format === "currency" && typeof value === 'number') {
    return formatCurrency(value);
  }
  
  return String(value);
}

export function getCellValue(option: InsurerOption, row: any): any {
  if (row.source === "coverages") {
    return option.coverages?.[row.key];
  }
  return option[row.key];
}
