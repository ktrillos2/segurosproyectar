import React from 'react';
import { InsurerOption } from '../../types/autoQuote';
import { comparisonSections } from '../../lib/pdf/comparisonSections';
import { getCellValue, renderCellValue } from '../../lib/pdf/formatters';

interface ComparisonTableProps {
  insurers: InsurerOption[];
}

export function ComparisonTable({ insurers }: ComparisonTableProps) {
  // Config specifies that the first option is the cheapest
  
  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th></th>
          {insurers.map((option, index) => (
            <th
              key={option.id}
              className={`insurer-header ${index === 0 ? "cheapest" : ""}`}
            >
              {option.insurer}
              <span className="insurer-product">{option.product}</span>
              {index === 0 && (
                <span className="cheapest-label">MÁS ECONÓMICA</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {comparisonSections.map((section, sectionIndex) => (
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
