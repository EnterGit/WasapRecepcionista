import React, { useState } from 'react';

export const QuoteSimulator: React.FC = () => {
  const [sku, setSku] = useState('CENT-D5-SMART');
  const [neto, setNeto] = useState<number>(425000);
  const [cantidad, setCantidad] = useState<number>(1);
  const [instalacion, setInstalacion] = useState<boolean>(true);

  const costoInstalacion = instalacion ? 85000 : 0;
  const subtotalNeto = (neto * cantidad) + costoInstalacion;
  const iva = Math.round(subtotalNeto * 0.19);
  const totalClp = subtotalNeto + iva;

  const catalog = [
    { sku: 'CENT-D5-SMART', nombre: 'Centurion D5 Smart 500kg', neto: 425000, garantia: '24 Meses', marca: 'Centurion (Sudáfrica)' },
    { sku: 'DEMO-600SMART', nombre: 'PrimaPort Roller 600HC 600kg', neto: 311000, garantia: '12 Meses', marca: 'PrimaPort' },
    { sku: 'COMU-FORT-600', nombre: 'Comunello Fort 600 24V 600kg', neto: 389000, garantia: '12 Meses', marca: 'Comunello (Italia)' },
    { sku: 'CENT-D10-TURBO', nombre: 'Centurion D10 Turbo 1000kg', neto: 680000, garantia: '24 Meses', marca: 'Centurion (Sudáfrica)' },
  ];

  const handleSelectSku = (selectedSku: string) => {
    setSku(selectedSku);
    const item = catalog.find((c) => c.sku === selectedSku);
    if (item) setNeto(item.neto);
  };

  return (
    <div className="split-grid">
      {/* Simulador Interactivo */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">🧮 Simulador de Precios & Cotización en Vivo</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Seleccionar Producto / Motor:
            </label>
            <select
              value={sku}
              onChange={(e) => handleSelectSku(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              {catalog.map((c) => (
                <option key={c.sku} value={c.sku}>
                  {c.nombre} - ${c.neto.toLocaleString('es-CL')} Neto
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Cantidad de Kits:
              </label>
              <input
                type="number"
                min={1}
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                ¿Incluir Servicio de Instalación?
              </label>
              <select
                value={instalacion ? 'SI' : 'NO'}
                onChange={(e) => setInstalacion(e.target.value === 'SI')}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="SI">Sí (+$85.000 Neto)</option>
                <option value="NO">No (Solo Suministro)</option>
              </select>
            </div>
          </div>

          {/* Resultado de Simulación */}
          <div style={{ background: '#f1f5f9', padding: '1.25rem', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span>Subtotal Neto:</span>
              <strong style={{ fontSize: '1.1rem' }}>${subtotalNeto.toLocaleString('es-CL')} CLP</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: '#475569' }}>
              <span>IVA (19%):</span>
              <span>${iva.toLocaleString('es-CL')} CLP</span>
            </div>
            <hr style={{ margin: '0.5rem 0', borderColor: '#cbd5e1' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-obsidian)' }}>
              <span>TOTAL SIMULADO:</span>
              <span style={{ color: 'var(--color-accent)' }}>${totalClp.toLocaleString('es-CL')} CLP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla Comparativa de Marcas */}
      <div className="card-panel">
        <div className="card-header">
          <h3 className="card-title">⚖️ Comparativa de Equipos & Garantías</h3>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>EQUIPO / MODELO</th>
              <th>MARCA</th>
              <th>PRECIO NETO</th>
              <th>GARANTÍA</th>
            </tr>
          </thead>
          <tbody>
            {catalog.map((c) => (
              <tr key={c.sku} style={{ background: c.sku === sku ? '#e0f2fe' : 'transparent' }}>
                <td style={{ fontWeight: 700 }}>{c.nombre}</td>
                <td>{c.marca}</td>
                <td style={{ fontWeight: 800 }}>${c.neto.toLocaleString('es-CL')}</td>
                <td>
                  <span className="navbar-badge" style={{ background: c.garantia.includes('24') ? '#10b981' : '#0284c7' }}>
                    {c.garantia}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
