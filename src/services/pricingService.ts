export interface ProductPricing {
  sku: string;
  description: string;
  precioNeto: number;
  iva: number;
  precioTotal: number;
  stock: number;
}

const CATALOG_ITEMS: ProductPricing[] = [
  { sku: 'DEMO-600SMART', description: 'Motor Corredera PrimaPort Roller 600HC (Hasta 600kg, 2 Controles)', precioNeto: 311000, iva: 59090, precioTotal: 370090, stock: 45 },
  { sku: 'CENT-D5-SMART', description: 'Motor Portón Corredera Centurion D5 Evo Smart 500kg Kit + 2 Controles', precioNeto: 425000, iva: 80750, precioTotal: 505750, stock: 18 },
  { sku: 'CENT-D10-TURBO', description: 'Motor Portón Corredera Centurion D10 Turbo Smart 1000kg Rápido', precioNeto: 680000, iva: 129200, precioTotal: 809200, stock: 12 },
  { sku: 'COMU-FORT-600', description: 'Motor de Corredera Comunello Fort 600 24V Uso Intensivo', precioNeto: 389000, iva: 73910, precioTotal: 462910, stock: 25 },
  { sku: 'PRIMA-ROLLER-1000', description: 'Kit Motor Corredera PrimaPort ROLLER1000DX 1000kg 24V con Batería', precioNeto: 495000, iva: 94050, precioTotal: 589050, stock: 20 },
  { sku: 'ACC-FOTO-01', description: 'Par de Fotoceldas de Seguridad Infrarrojas Multimarca', precioNeto: 28500, iva: 5415, precioTotal: 33915, stock: 120 },
  { sku: 'ACC-CREM-ACERO', description: 'Cremallera de Acero Galvanizado 1m M4 con Pernos', precioNeto: 12500, iva: 2375, precioTotal: 14875, stock: 250 }
];

export function getProductPricingAndStock(queryText: string): ProductPricing {
  const lower = queryText.toLowerCase();
  for (const item of CATALOG_ITEMS) {
    if (lower.includes(item.sku.toLowerCase()) || lower.includes(item.description.toLowerCase().split(' ')[0])) {
      return item;
    }
  }
  return CATALOG_ITEMS[0];
}
