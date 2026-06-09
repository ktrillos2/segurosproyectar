import React from 'react';
import { Advisor, Insured, Vehicle } from '../../types/autoQuote';

export function PdfHeader({ advisor }: { advisor: Advisor }) {
  return (
    <div className="header">
      {/* We use an img tag with a base64 encoded image or an absolute URL for html2canvas */}
      <img src="/logo.png" alt="Proyectar Seguros" className="logo" />
      <div className="header-right">
        <div className="quote-badge">TU COTIZACIÓN</div>
        <div className="advisor">
          Asesor: <strong>{advisor.name}</strong><br />
          {advisor.email} · {advisor.website}
        </div>
      </div>
    </div>
  );
}

export function InfoBar({ insured, vehicle }: { insured: Insured, vehicle: Vehicle }) {
  return (
    <div className="info-bar">
      <div>
        <span className="info-item"><strong>Asegurado:</strong> {insured.name}</span>
        <span className="info-item"><strong>Identificación:</strong> {insured.identification}</span>
        <span className="info-item"><strong>Nacimiento:</strong> {insured.birthDate}</span>
        <span className="info-item"><strong>Género:</strong> {insured.gender}</span>
        <span className="info-item"><strong>Celular:</strong> {insured.phone}</span>
        <span className="info-item"><strong>Correo:</strong> {insured.email}</span>
      </div>
      <div>
        <span className="info-item"><strong>Vehículo:</strong> {vehicle.description}</span>
        <span className="info-item"><strong>Placa:</strong> {vehicle.plate}</span>
        <span className="info-item"><strong>Modelo:</strong> {vehicle.model}</span>
        <span className="info-item"><strong>0 km:</strong> {vehicle.isZeroKm ? 'Sí' : 'No'}</span>
        <span className="info-item"><strong>Uso:</strong> {vehicle.use}</span>
      </div>
      <div>
        <span className="info-item"><strong>Fasecolda:</strong> {vehicle.fasecolda}</span>
        <span className="info-item"><strong>Valor asegurado:</strong> {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(vehicle.insuredValue)}</span>
        <span className="info-item"><strong>Accesorios:</strong> {vehicle.accessoriesValue ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(vehicle.accessoriesValue) : '0'}</span>
        <span className="info-item"><strong>Circulación:</strong> {vehicle.circulationCity}</span>
      </div>
    </div>
  );
}
