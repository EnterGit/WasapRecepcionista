import React from 'react';

interface KpiData {
  topProducts: { sku: string; totalSolicitado: number; nombre: string }[];
  leastRequestedProducts: { sku: string; totalSolicitado: number; nombre: string }[];
  bestCustomers: { clienteId: number; nombre: string; telefono: string; totalCotizacionesAceptadas: number; montoTotalClp: number }[];
  conversionRate: {
    totalCotizaciones: number;
    aceptadas: number;
    rechazadas: number;
    generadas: number;
    enviadas: number;
    tasaConversionPorcentaje: number;
  };
  rejectionReasons: { motivo: string; cantidad: number }[];
}

interface KpiBentoGridProps {
  kpis: KpiData | null;
}

export const KpiBentoGrid: React.FC<KpiBentoGridProps> = ({ kpis }) => {
  if (!kpis) {
    return <div className="card-panel" style={{ padding: '2rem', textAlign: 'center' }}>Cargando indicadores KPI...</div>;
  }

  const { conversionRate, topProducts, leastRequestedProducts, bestCustomers, rejectionReasons } = kpis;

  return (
    <div className="bento-grid">
      {/* Stat Boxes Top */}
      <div className="stat-box">
        <div className="stat-label">TOTAL COTIZACIONES</div>
        <div className="stat-value">{conversionRate.totalCotizaciones}</div>
      </div>
      <div className="stat-box">
        <div className="stat-label">COTIZACIONES ACEPTADAS</div>
        <div className="stat-value" style={{ color: '#10b981' }}>{conversionRate.aceptadas}</div>
      </div>
      <div className="stat-box">
        <div className="stat-label">COTIZACIONES RECHAZADAS</div>
        <div className="stat-value" style={{ color: '#ef4444' }}>{conversionRate.rechazadas}</div>
      </div>
      <div className="stat-box">
        <div className="stat-label">TASA DE CONVERSIÓN</div>
        <div className="stat-value" style={{ color: '#0066cc' }}>{conversionRate.tasaConversionPorcentaje}%</div>
      </div>

      {/* Top Productos Más Pedidos */}
      <div className="card-panel bento-col-2">
        <div className="card-header">
          <h3 className="card-title">🏆 Top Productos Más Cotizados</h3>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>DESCRIPCIÓN</th>
              <th>CANTIDAD</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p) => (
              <tr key={p.sku}>
                <td style={{ fontWeight: 700, color: '#0066cc' }}>{p.sku}</td>
                <td>{p.nombre}</td>
                <td style={{ fontWeight: 700 }}>{p.totalSolicitado} un.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Productos Menos Cotizados */}
      <div className="card-panel bento-col-2">
        <div className="card-header">
          <h3 className="card-title">🔻 Productos de Menor Demanda</h3>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>DESCRIPCIÓN</th>
              <th>CANTIDAD</th>
            </tr>
          </thead>
          <tbody>
            {leastRequestedProducts.map((p) => (
              <tr key={p.sku}>
                <td style={{ fontWeight: 700, color: '#6b7280' }}>{p.sku}</td>
                <td>{p.nombre}</td>
                <td style={{ fontWeight: 700 }}>{p.totalSolicitado} un.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mejores Clientes Facturación CLP */}
      <div className="card-panel bento-col-2">
        <div className="card-header">
          <h3 className="card-title">👑 Mejores Clientes (Monto Aceptado CLP)</h3>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>CLIENTE</th>
              <th>COTIZACIONES</th>
              <th>MONTO TOTAL CLP</th>
            </tr>
          </thead>
          <tbody>
            {bestCustomers.map((c) => (
              <tr key={c.clienteId}>
                <td style={{ fontWeight: 600 }}>{c.nombre}</td>
                <td>{c.totalCotizacionesAceptadas} aceptadas</td>
                <td style={{ fontWeight: 800, color: '#10b981' }}>${c.montoTotalClp.toLocaleString('es-CL')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Principales Motivos de Rechazo */}
      <div className="card-panel bento-col-2">
        <div className="card-header">
          <h3 className="card-title">❌ Principales Motivos de Rechazo</h3>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>CAUSAL / MOTIVO DE RECHAZO</th>
              <th>FRECUENCIA</th>
            </tr>
          </thead>
          <tbody>
            {rejectionReasons.map((r, i) => (
              <tr key={i}>
                <td style={{ color: '#ef4444', fontWeight: 600 }}>{r.motivo}</td>
                <td style={{ fontWeight: 700 }}>{r.cantidad} caso(s)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
