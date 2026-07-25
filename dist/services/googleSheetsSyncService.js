export class GoogleSheetsSyncService {
    /**
     * Transforma una cotización de MySQL/Memoria a la fila oficial de 15 columnas de Google Sheets
     */
    static formatQuoteToSheetsRow(quote, items, clienteNombre, clienteTelefono) {
        const itemPrincipal = items?.[0] || { sku: 'CENT-D5-SMART', descripcion: 'Motor Portón Corredera Centurion D5 Smart 500kg Kit', cantidad: 1 };
        return {
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            folio: quote.folio,
            rutCliente: '77.654.321-K',
            nombreCliente: clienteNombre || 'Osvaldo Varas',
            telefonoWhatsapp: clienteTelefono || '+56912345678',
            email: 'ventas@allsolutions.cl',
            skuProducto: itemPrincipal.sku,
            descripcion: itemPrincipal.descripcion,
            cantidad: itemPrincipal.cantidad || 1,
            subtotalNetoClp: quote.subtotalNeto,
            iva19Clp: quote.iva19,
            totalClp: quote.totalClp,
            estado: quote.estado,
            motivoRechazo: quote.motivoRechazo || 'N/A',
            linkPdfDrive: quote.pdfDriveUrl || `https://drive.google.com/file/d/demo-${quote.folio}`,
        };
    }
    /**
     * Simula la sincronización bi-direccional con Google Sheets (Patrón RemmiV1 + SendWhatsappCloud)
     */
    static async syncToGoogleSheets(quote, items, clienteNombre, clienteTelefono) {
        const rowData = this.formatQuoteToSheetsRow(quote, items, clienteNombre, clienteTelefono);
        console.log(`📊 [GOOGLE SHEETS SYNC] Sincronizando folio ${quote.folio} con la planilla "Cotizaciones_Master"...`);
        console.log(`   └─ Columna M (Estado): ${rowData.estado} | Total: $${rowData.totalClp.toLocaleString('es-CL')} CLP`);
        return { success: true, rowData };
    }
}
