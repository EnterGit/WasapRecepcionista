import { describe, expect, it } from 'vitest';
import { saveQuote, updateQuoteStatus } from '../repositories/quoteRepository.js';
import { findOrCreateCustomer } from '../repositories/customerRepository.js';
import { calculateAnalyticsKpis } from './analyticsService.js';

describe('Pruebas Unitarias de Analytics KPIs (analyticsService.ts)', () => {
  it('Debe calcular correctamente los KPIs de productos, mejores clientes y tasa de conversión', async () => {
    const customer = await findOrCreateCustomer('+56999887766', 'Empresa Test SpA');

    // Cotización 1 Aceptada
    const q1 = await saveQuote(
      {
        folio: 'CE-TEST-001',
        clienteId: customer.id!,
        subtotalNeto: 311000,
        iva19: 59090,
        totalClp: 370090,
        estado: 'GENERADA'
      },
      [{ sku: 'DEMO-600SMART', descripcion: 'Motor Roller 600', cantidad: 2, precioUnitarioNeto: 311000, importeNeto: 622000 }]
    );
    await updateQuoteStatus('CE-TEST-001', 'ACEPTADA');

    // Cotización 2 Rechazada
    const q2 = await saveQuote(
      {
        folio: 'CE-TEST-002',
        clienteId: customer.id!,
        subtotalNeto: 680000,
        iva19: 129200,
        totalClp: 809200,
        estado: 'GENERADA'
      },
      [{ sku: 'CENT-D10-TURBO', descripcion: 'Centurion D10', cantidad: 1, precioUnitarioNeto: 680000, importeNeto: 680000 }]
    );
    await updateQuoteStatus('CE-TEST-002', 'RECHAZADA', 'Precio fuera de presupuesto');

    const kpis = await calculateAnalyticsKpis();

    expect(kpis.topProducts.length).toBeGreaterThan(0);
    expect(kpis.conversionRate.totalCotizaciones).toBeGreaterThanOrEqual(2);
    expect(kpis.conversionRate.aceptadas).toBeGreaterThanOrEqual(1);
    expect(kpis.conversionRate.rechazadas).toBeGreaterThanOrEqual(1);
    expect(kpis.rejectionReasons[0].motivo).toBe('Precio fuera de presupuesto');
  });
});
