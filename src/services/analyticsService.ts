import { getAllCustomers } from '../repositories/customerRepository.js';
import { getAllQuotes } from '../repositories/quoteRepository.js';

export interface KpiSummaryResponse {
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

export async function calculateAnalyticsKpis(): Promise<KpiSummaryResponse> {
  const allQuotes = await getAllQuotes();
  const allCustomers = await getAllCustomers();

  // 1. Contador por Producto (SKU)
  const skuCounts: Map<string, { count: number; name: string }> = new Map();
  let totalGeneradas = 0;
  let totalEnviadas = 0;
  let totalAceptadas = 0;
  let totalRechazadas = 0;

  const rejectionMap: Map<string, number> = new Map();
  const customerBillingMap: Map<number, { totalClp: number; acceptedCount: number }> = new Map();

  for (const entry of allQuotes) {
    const q = entry.quote;
    if (q.estado === 'GENERADA') totalGeneradas++;
    if (q.estado === 'ENVIADA') totalEnviadas++;
    if (q.estado === 'ACEPTADA') totalAceptadas++;
    if (q.estado === 'RECHAZADA') {
      totalRechazadas++;
      const reason = q.motivoRechazo || 'Sin motivo especificado';
      rejectionMap.set(reason, (rejectionMap.get(reason) || 0) + 1);
    }

    // Acumular compras por cliente (Solo Aceptadas o Totales)
    if (q.estado === 'ACEPTADA') {
      const current = customerBillingMap.get(q.clienteId) || { totalClp: 0, acceptedCount: 0 };
      customerBillingMap.set(q.clienteId, {
        totalClp: current.totalClp + q.totalClp,
        acceptedCount: current.acceptedCount + 1
      });
    }

    // Acumular demanda por SKU
    for (const item of entry.items) {
      const current = skuCounts.get(item.sku) || { count: 0, name: item.descripcion };
      skuCounts.set(item.sku, { count: current.count + item.cantidad, name: item.descripcion });
    }
  }

  // Ordenar SKUs
  const sortedSkus = Array.from(skuCounts.entries()).map(([sku, data]) => ({
    sku,
    totalSolicitado: data.count,
    nombre: data.name
  })).sort((a, b) => b.totalSolicitado - a.totalSolicitado);

  const topProducts = sortedSkus.slice(0, 5);
  const leastRequestedProducts = sortedSkus.slice(-5).reverse();

  // Ordenar Mejores Clientes
  const bestCustomers = Array.from(customerBillingMap.entries()).map(([clienteId, data]) => {
    const customerObj = allCustomers.find(c => c.id === clienteId);
    return {
      clienteId,
      nombre: customerObj ? customerObj.nombre : `Cliente N° ${clienteId}`,
      telefono: customerObj ? customerObj.telefono : 'N/A',
      totalCotizacionesAceptadas: data.acceptedCount,
      montoTotalClp: data.totalClp
    };
  }).sort((a, b) => b.montoTotalClp - a.montoTotalClp);

  // Tasa de conversión
  const totalCotizaciones = allQuotes.length;
  const tasaConversionPorcentaje = totalCotizaciones > 0 ? parseFloat(((totalAceptadas / totalCotizaciones) * 100).toFixed(2)) : 0;

  // Motivos de rechazo
  const rejectionReasons = Array.from(rejectionMap.entries()).map(([motivo, cantidad]) => ({
    motivo,
    cantidad
  })).sort((a, b) => b.cantidad - a.cantidad);

  return {
    topProducts,
    leastRequestedProducts,
    bestCustomers,
    conversionRate: {
      totalCotizaciones,
      generadas: totalGeneradas,
      enviadas: totalEnviadas,
      aceptadas: totalAceptadas,
      rechazadas: totalRechazadas,
      tasaConversionPorcentaje
    },
    rejectionReasons
  };
}
