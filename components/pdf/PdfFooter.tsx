import React from 'react';

export function PdfFooter({ generatedAt }: { generatedAt: string }) {
  return (
    <div className="footer">
      <strong>Proyectar Administradores de Seguros Ltda.</strong> · NIT 830.139.875-7 · Intermediario vigilado por la Superintendencia Financiera de Colombia · Seguros claros, rápidos y sin enredos · Generado el {generatedAt}
    </div>
  );
}

export function Watermark() {
  return (
    <div className="watermark">
      BORRADOR
    </div>
  );
}
