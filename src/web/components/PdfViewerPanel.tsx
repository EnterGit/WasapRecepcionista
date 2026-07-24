import React from 'react';

interface QuoteData {
  folio: string;
  clienteNombre: string;
  clienteTelefono: string;
  totalClp: number;
  estado: 'GENERADA' | 'ENVIADA' | 'ACEPTADA' | 'RECHAZADA';
  motivoRechazo?: string;
  pdfPath?: string;
}

interface PdfViewerPanelProps {
  selectedQuote: QuoteData | null;
  onApprove: (folio: string) => void;
  onRejectClick: (folio: string) => void;
}

export const PdfViewerPanel: React.FC<PdfViewerPanelProps> = ({ selectedQuote, onApprove, onRejectClick }) => {
  if (!selectedQuote) {
    return (
      <div className="card-panel" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
        👉 Seleccione una cotización de la lista para visualizar el documento PDF oficial.
      </div>
    );
  }

  return (
    <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="card-header">
        <div>
          <h3 className="card-title">Cotización N° {selectedQuote.folio}</h3>
          <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
            Cliente: <strong>{selectedQuote.clienteNombre}</strong> ({selectedQuote.clienteTelefono})
          </span>
        </div>
        <span className={`status-tag status-${selectedQuote.estado}`}>{selectedQuote.estado}</span>
      </div>

      <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #cbd5e1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>MONTO TOTAL (IVA INC.)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              ${selectedQuote.totalClp.toLocaleString('es-CL')} CLP
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {selectedQuote.estado !== 'ACEPTADA' && (
              <button className="btn btn-success" onClick={() => onApprove(selectedQuote.folio)}>
                ✓ Aprobar
              </button>
            )}
            {selectedQuote.estado !== 'RECHAZADA' && (
              <button className="btn btn-danger" onClick={() => onRejectClick(selectedQuote.folio)}>
                ✕ Rechazar
              </button>
            )}
          </div>
        </div>
        {selectedQuote.motivoRechazo && (
          <div style={{ marginTop: '0.5rem', color: '#b91c1c', fontSize: '0.85rem', fontWeight: 600 }}>
            ⚠️ Motivo Rechazo: {selectedQuote.motivoRechazo}
          </div>
        )}
      </div>

      {/* Visor PDF en vivo (Documento Carta US) */}
      <div style={{ flex: 1, minHeight: '400px', border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>
        <iframe
          src={`/data/Cotizacion_${selectedQuote.folio}.pdf`}
          title={`Cotización ${selectedQuote.folio}`}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
};
