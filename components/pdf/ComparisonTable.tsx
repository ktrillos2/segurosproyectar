import React from 'react';
import { InsurerOption } from '../../types/autoQuote';
import { comparisonSections } from '../../lib/pdf/comparisonSections';
import { getCellValue, renderCellValue } from '../../lib/pdf/formatters';

interface ComparisonTableProps {
  insurers: InsurerOption[];
  sections?: any[];
  logosMap?: Record<string, string>;
}

function getLogoPath(insurerName: string, logosMap?: Record<string, string>): string | null {
  const name = insurerName.toLowerCase();
  if (logosMap) {
    if (name.includes("equidad") && logosMap["equidad seguros"]) return logosMap["equidad seguros"];
    if ((name.includes("axa") || name.includes("colpatria")) && logosMap["axa colpatria"]) return logosMap["axa colpatria"];
    if (name.includes("estado") && logosMap["seguros del estado"]) return logosMap["seguros del estado"];
    if (name.includes("mundial") && logosMap["seguros mundial"]) return logosMap["seguros mundial"];
    if ((name.includes("qualitas") || name.includes("quálitas")) && logosMap["quálitas"]) return logosMap["quálitas"];
    if (name.includes("zurich") && logosMap["zurich"]) return logosMap["zurich"];
  }

  if (name.includes('axa') || name.includes('colpatria')) return '/logos/axa-colpatria.png';
  if (name.includes('equidad')) return '/logos/equidad.png';
  if (name.includes('qualitas') || name.includes('quálitas')) return '/logos/qualitas.png';
  if (name.includes('estado')) return '/logos/seguros-del-estado.png';
  if (name.includes('mundial') || name.includes('mudial')) return '/logos/seguros-mudial.png';
  if (name.includes('zurich') || name.includes('zúrich')) return '/logos/zurich.png';
  return null;
}

export function ComparisonTable({ insurers, sections, logosMap }: ComparisonTableProps) {
  // Config specifies that the first option is the cheapest
  
  const displaySections = sections || comparisonSections;

  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th></th>
          {insurers.map((option, index) => {
            const logoPath = getLogoPath(option.insurer, logosMap);
            return (
            <th
              key={option.id}
              className={`insurer-header ${index === 0 ? "cheapest" : ""}`}
              style={{ position: 'relative', verticalAlign: 'bottom', height: '105px', paddingTop: '15px' }}
            >
              <div style={{ marginBottom: '6px' }}>
                {logoPath ? (
                  <img 
                    src={logoPath} 
                    alt={option.insurer} 
                    style={{ height: '48px', maxWidth: '110px', display: 'inline-block', objectFit: 'contain' }} 
                  />
                ) : (
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{option.insurer}</div>
                )}
              </div>
              
              <div style={{ marginBottom: '26px' }}>
                <span className="insurer-product">{option.product}</span>
              </div>

              {index === 0 && (
                <span className="cheapest-label" style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', margin: 0, whiteSpace: 'nowrap' }}>
                  MÁS ECONÓMICA
                </span>
              )}
            </th>
          );
        })}
        </tr>
      </thead>
      <tbody>
        {displaySections.map((section, sectionIndex) => (
          <React.Fragment key={section.title}>
            <tr className="section-row">
              <td colSpan={insurers.length + 1}>{section.title}</td>
            </tr>
            {section.rows.map((row, rowIndex) => (
              <tr key={row.key} className="data-row">
                <td>{row.label}</td>
                {insurers.map((option, index) => {
                  const value = getCellValue(option, row);
                  const isPremium = row.key === 'annualPremium';
                  return (
                    <td 
                      key={option.id} 
                      className={`${index === 0 ? "cheapest-cell" : ""} ${isPremium ? "premium" : ""}`}
                    >
                      {renderCellValue(value, (row as any).format)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
