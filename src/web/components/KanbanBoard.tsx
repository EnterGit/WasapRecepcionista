import React from 'react';

interface QuoteItem {
  folio: string;
  clienteNombre: string;
  clienteTelefono: string;
  totalClp: number;
  estado: 'GENERADA' | 'ENVIADA' | 'ACEPTADA' | 'RECHAZADA';
  motivoRechazo?: string;
}

interface KanbanBoardProps {
  quotes: QuoteItem[];
  onStatusChange: (folio: string, newStatus: 'GENERADA' | 'ENVIADA' | 'ACEPTADA' | 'RECHAZADA') => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ quotes, onStatusChange }) => {
  const columns: { id: 'GENERADA' | 'ENVIADA' | 'ACEPTADA' | 'RECHAZADA'; title: string; color: string }[] = [
    { id: 'GENERADA', title: '🟡 LEADS / POR REVISAR', color: '#0369a1' },
    { id: 'ENVIADA', title: '🔵 COTIZACIÓN ENVIADA', color: '#b45309' },
    { id: 'ACEPTADA', title: '🟢 VENTA ACEPTADA', color: '#047857' },
    { id: 'RECHAZADA', title: '🔴 VENTA PERDIDA', color: '#b91c1c' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', minHeight: '600px' }}>
      {columns.map((col) => {
        const colQuotes = quotes.filter((q) => q.estado === col.id);
        const totalColMonto = colQuotes.reduce((acc, q) => acc + q.totalClp, 0);

        return (
          <div key={col.id} className="card-panel" style={{ background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: `3px solid ${col.color}` }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: col.color }}>{col.title}</h4>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginTop: '0.2rem' }}>
                {colQuotes.length} cotización(es) • ${totalColMonto.toLocaleString('es-CL')} CLP
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {colQuotes.map((q) => (
                <div
                  key={q.folio}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--color-accent)', fontSize: '0.85rem' }}>{q.folio}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>${q.totalClp.toLocaleString('es-CL')}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>{q.clienteNombre}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>{q.clienteTelefono}</div>

                  {q.motivoRechazo && (
                    <div style={{ fontSize: '0.75rem', color: '#b91c1c', background: '#fef2f2', padding: '0.3rem', borderRadius: '4px', marginBottom: '0.5rem' }}>
                      ⚠️ {q.motivoRechazo}
                    </div>
                  )}

                  {/* Acciones de cambio de columna */}
                  <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }}>
                    {col.id !== 'ENVIADA' && (
                      <button
                        className="btn btn-outline"
                        style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}
                        onClick={() => onStatusChange(q.folio, 'ENVIADA')}
                      >
                        ➡️ Enviada
                      </button>
                    )}
                    {col.id !== 'ACEPTADA' && (
                      <button
                        className="btn btn-success"
                        style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}
                        onClick={() => onStatusChange(q.folio, 'ACEPTADA')}
                      >
                        ✓ Aprobar
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {colQuotes.length === 0 && (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', padding: '2rem 0' }}>
                  Sin cotizaciones en esta etapa
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
