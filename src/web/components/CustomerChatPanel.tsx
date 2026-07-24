import React from 'react';

interface Customer {
  id: number;
  nombre: string;
  telefono: string;
  rut?: string;
  estado: string;
}

interface ChatMessage {
  id: number;
  mensajeCliente: string;
  respuestaIa: string;
  timestamp: string;
}

interface CustomerChatPanelProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer) => void;
  messages: ChatMessage[];
}

export const CustomerChatPanel: React.FC<CustomerChatPanelProps> = ({
  customers,
  selectedCustomer,
  onSelectCustomer,
  messages
}) => {
  return (
    <div className="split-grid" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Lista de Clientes */}
      <div className="card-panel" style={{ overflowY: 'auto' }}>
        <div className="card-header">
          <h3 className="card-title">Clientes Registrados ({customers.length})</h3>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>TELÉFONO</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className={selectedCustomer?.id === c.id ? 'selected' : ''}
                onClick={() => onSelectCustomer(c)}
                style={{ cursor: 'pointer' }}
              >
                <td style={{ fontWeight: 600 }}>{c.nombre}</td>
                <td>{c.telefono}</td>
                <td>
                  <span className="navbar-badge" style={{ background: '#0284c7' }}>
                    {c.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Histórico Chat WhatsApp */}
      <div className="card-panel" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-header">
          <h3 className="card-title">
            {selectedCustomer ? `💬 Historial WhatsApp: ${selectedCustomer.nombre}` : '💬 Historial de Conversación'}
          </h3>
        </div>

        {selectedCustomer ? (
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((m) => (
              <React.Fragment key={m.id}>
                {/* Mensaje Cliente */}
                <div style={{ alignSelf: 'flex-start', background: '#e2e8f0', padding: '0.75rem 1rem', borderRadius: '12px 12px 12px 2px', maxWidth: '80%' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>
                    {selectedCustomer.nombre} ({selectedCustomer.telefono})
                  </div>
                  <div>{m.mensajeCliente}</div>
                </div>

                {/* Respuesta IA */}
                <div style={{ alignSelf: 'flex-end', background: '#0066cc', color: '#fff', padding: '0.75rem 1rem', borderRadius: '12px 12px 2px 12px', maxWidth: '80%' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e0f2fe', marginBottom: '0.2rem' }}>
                    🤖 Agente All Solutions SpA
                  </div>
                  <div>{m.respuestaIa}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
            👈 Seleccione un cliente para ver su historial de WhatsApp.
          </div>
        )}
      </div>
    </div>
  );
};
