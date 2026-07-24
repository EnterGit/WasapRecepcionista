import { checkDatabaseConnection, getDbPool } from '../database/db.js';
const memoryQuotes = new Map();
export async function saveQuote(quote, items) {
    const isConnected = await checkDatabaseConnection();
    if (isConnected) {
        try {
            const db = getDbPool();
            const [res] = await db.query(`INSERT INTO cotizaciones (folio, cliente_id, subtotal_neto, iva_19, total_clp, estado, pdf_drive_url)
         VALUES (?, ?, ?, ?, ?, ?, ?)`, [quote.folio, quote.clienteId, quote.subtotalNeto, quote.iva19, quote.totalClp, quote.estado, quote.pdfDriveUrl || null]);
            const quoteId = res.insertId;
            for (const item of items) {
                await db.query(`INSERT INTO cotizacion_items (cotizacion_id, sku, descripcion, cantidad, precio_unitario_neto, importe_neto)
           VALUES (?, ?, ?, ?, ?, ?)`, [quoteId, item.sku, item.descripcion, item.cantidad, item.precioUnitarioNeto, item.importeNeto]);
            }
            return { ...quote, id: quoteId };
        }
        catch (err) {
            console.warn(`⚠️ Error guardando cotización en MySQL: ${err}`);
        }
    }
    // Memory Fallback
    const id = memoryQuotes.size + 1;
    const record = { ...quote, id };
    memoryQuotes.set(quote.folio, { quote: record, items });
    return record;
}
export async function updateQuoteStatus(folio, estado, motivoRechazo) {
    const isConnected = await checkDatabaseConnection();
    if (isConnected) {
        try {
            const db = getDbPool();
            await db.query(`UPDATE cotizaciones SET estado = ?, motivo_rechazo = ? WHERE folio = ?`, [estado, motivoRechazo || null, folio]);
            const [rows] = await db.query(`SELECT * FROM cotizaciones WHERE folio = ?`, [folio]);
            if (rows.length > 0) {
                return rows[0];
            }
        }
        catch (err) {
            console.warn(`⚠️ Error actualizando estado en MySQL: ${err}`);
        }
    }
    // Memory Fallback
    if (memoryQuotes.has(folio)) {
        const entry = memoryQuotes.get(folio);
        entry.quote.estado = estado;
        entry.quote.motivoRechazo = motivoRechazo;
        return entry.quote;
    }
    return null;
}
export async function getAllQuotes() {
    const isConnected = await checkDatabaseConnection();
    if (isConnected) {
        try {
            const db = getDbPool();
            const [rows] = await db.query(`SELECT * FROM cotizaciones ORDER BY creado_el DESC`);
            const result = [];
            for (const q of rows) {
                const [items] = await db.query(`SELECT * FROM cotizacion_items WHERE cotizacion_id = ?`, [q.id]);
                result.push({
                    quote: {
                        id: q.id,
                        folio: q.folio,
                        clienteId: q.cliente_id,
                        subtotalNeto: q.subtotal_neto,
                        iva19: q.iva_19,
                        totalClp: q.total_clp,
                        estado: q.estado,
                        motivoRechazo: q.motivo_rechazo,
                        pdfDriveUrl: q.pdf_drive_url,
                        creadoEl: q.creado_el
                    },
                    items: items.map((i) => ({
                        sku: i.sku,
                        descripcion: i.descripcion,
                        cantidad: i.cantidad,
                        precioUnitarioNeto: i.precio_unitario_neto,
                        importeNeto: i.importe_neto
                    }))
                });
            }
            return result;
        }
        catch (err) {
            console.warn(`⚠️ Error consultando cotizaciones en MySQL: ${err}`);
        }
    }
    return Array.from(memoryQuotes.values());
}
