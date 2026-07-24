import React, { useState } from 'react';

interface QuoteItem {
  folio: string;
  clienteNombre: string;
  clienteTelefono: string;
  totalClp: number;
  estado: 'GENERADA' | 'ENVIADA' | 'ACEPTADA' | 'RECHAZADA';
  motivoRechazo?: string;
  fecha?: string;
}

interface QuoteListTableProps {
  quotes: QuoteItem[];
  selectedFolio: string | null;
  onSelectQuote: (quote: QuoteItem) => void;
}

export const QuoteListTable: React.FC<QuoteListTableProps> = ({ quotes, selectedFolio, onSelectQuote }) => {
  const [filter, setFilter] = useState<string>('TODAS');
  const [search, setSearch] = useState<string>('');

  const filteredQuotes = quotes.filter((q) => {
    const matchesFilter = filter === 'TODAS' || q.estado === filter;
    const matchesSearch =
      q.folio.toLowerCase().includes(search.toLowerCase()) ||
      q.clienteNombre.toLowerCase().includes(search.toLowerCase()) ||
      q.clienteTelefono.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="card-panel" style={{ height: '100%' }}>
      <div className="card-header">
        <h3 className="card-title">Cotizaciones Emitidas ({filteredQuotes.length})</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Buscar folio, cliente o fono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #d8dadd', fontSize: '0.85rem' }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #d8dadd', fontSize: '0.85rem' }}
          >
            <option value="TODAS">Todas</option>
            <option value="GENERADA">Generadas</option>
            <option value="ENVIADA">Enviadas</option>
            <option value="ACEPTADA">Aceptadas</option>
            <option value="RECHAZADA">Rechazadas</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>FOLIO</th>
              <th>CLIENTE</th>
              <th>TELÉFONO</th>
              <th>TOTAL CLP</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuotes.map((q) => (
              <tr
                key={q.folio}
                className={selectedFolio === q.folio ? 'selected' : ''}
                onClick={() => onSelectQuote(q)}
                style={{ cursor: 'pointer' }}
              >
                <td style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{q.folio}</td>
                <td>{q.clienteNombre}</td>
                <td>{q.clienteTelefono}</td>
                <td style={{ fontWeight: 700 }}>${q.totalClp.toLocaleString('es-CL')}</td>
                <td>
                  <span className={`status-tag status-${q.estado}`}>{q.estado}</span>
                </td>
              </tr>
            ))}
            {filteredQuotes.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                  No se encontraron cotizaciones con los filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
