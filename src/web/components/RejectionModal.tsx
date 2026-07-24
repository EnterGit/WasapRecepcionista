import React, { useState } from 'react';

interface RejectionModalProps {
  folio: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (folio: string, motivo: string) => void;
}

export const RejectionModal: React.FC<RejectionModalProps> = ({ folio, isOpen, onClose, onConfirm }) => {
  const [motivo, setMotivo] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motivo.trim()) return;
    onConfirm(folio, motivo);
    setMotivo('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="card-panel" style={{ width: '450px', background: '#fff' }}>
        <div className="card-header">
          <h3 className="card-title">🔴 Rechazar Cotización {folio}</h3>
          <button className="btn btn-outline" onClick={onClose} style={{ padding: '0.2rem 0.5rem' }}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Ingrese el Motivo de Rechazo (Obligatorio):
            </label>
            <select
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #d8dadd', marginBottom: '0.75rem' }}
              required
            >
              <option value="">-- Seleccione una causal --</option>
              <option value="Precio fuera de presupuesto">Precio fuera de presupuesto</option>
              <option value="Tiempo de entrega prolongado">Tiempo de entrega prolongado</option>
              <option value="Cliente prefirió otra marca/competencia">Cliente prefirió otra marca/competencia</option>
              <option value="Cliente desistió de la compra">Cliente desistió de la compra</option>
              <option value="Sin respuesta / Inubicable">Sin respuesta / Inubicable</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-danger">Confirmar Rechazo</button>
          </div>
        </form>
      </div>
    </div>
  );
};
