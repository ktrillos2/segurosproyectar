import React from 'react';

export function PdfFooter({ generatedAt }: { generatedAt: string }) {
  return (
    <div className="footer">
      <div style={{ marginBottom: "4px" }}>
        <strong>Proyectar Administradores de Seguros Ltda.</strong> · NIT 830.139.875-7 · Intermediario vigilado por la Superintendencia Financiera de Colombia · Seguros claros, rápidos y sin enredos · Generado el {generatedAt}
      </div>
      <div style={{ fontSize: "6px", marginTop: "4px" }}>
        © {new Date().getFullYear()} Seguros Proyectar.{" "}
        <a href="https://www.kytcode.lat" target="_blank" rel="noopener noreferrer" style={{ color: "#607d8b", textDecoration: "none" }}>
          Desarrollado por K&T <span style={{ color: "#000" }}>🤍</span>
        </a>
      </div>
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
