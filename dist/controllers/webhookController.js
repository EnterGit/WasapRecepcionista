import { findOrCreateCustomer } from '../repositories/customerRepository.js';
import { saveQuote } from '../repositories/quoteRepository.js';
import { saveConversation } from '../repositories/conversationRepository.js';
import { getProductPricingAndStock } from '../services/pricingService.js';
import { generatePdfQuote } from '../services/quoteService.js';
import { GoogleSheetsSyncService } from '../services/googleSheetsSyncService.js';
export const handleWebhookGET = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === 'allsolutions_verify_token_2026') {
        return res.status(200).send(challenge);
    }
    return res.status(403).json({ error: 'Token de verificación inválido' });
};
export const handleWebhookPOST = async (req, res) => {
    try {
        const body = req.body;
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messageObj = value?.messages?.[0];
        const telefono = messageObj?.from || req.body.telefono || '+56912345678';
        const mensajeTexto = messageObj?.text?.body || req.body.mensaje || 'Hola, deseo cotizar un motor Centurion D5 Smart';
        const nombreCliente = value?.contacts?.[0]?.profile?.name || req.body.nombreCliente || 'Osvaldo Varas';
        // 1. Guardar/Obtener Cliente en MySQL
        const cliente = await findOrCreateCustomer(telefono, nombreCliente);
        // 2. Consultar Precios y Stock del Catálogo
        const productPricing = getProductPricingAndStock(mensajeTexto);
        // 3. Generar PDF Físico ReportLab y Asignar Folio
        const pdfResult = await generatePdfQuote(productPricing, nombreCliente, telefono);
        const folio = pdfResult.quoteNumber;
        // 4. Persistir Cotización en MySQL
        const quoteRecord = {
            folio,
            clienteId: cliente.id,
            subtotalNeto: productPricing.precioNeto,
            iva19: productPricing.iva,
            totalClp: productPricing.precioTotal,
            estado: 'GENERADA',
            pdfDriveUrl: `https://drive.google.com/file/d/${folio}`,
        };
        const itemRecord = {
            sku: productPricing.sku,
            descripcion: productPricing.description,
            cantidad: 1,
            precioUnitarioNeto: productPricing.precioNeto,
            importeNeto: productPricing.precioNeto,
        };
        const nuevaCotizacion = await saveQuote(quoteRecord, [itemRecord]);
        // 5. Sincronizar Bi-direccionalmente con Google Sheets (agente_google_sheets_sync)
        await GoogleSheetsSyncService.syncToGoogleSheets(nuevaCotizacion, [itemRecord], cliente.nombre, cliente.telefono);
        // 6. Guardar Conversación RAG en MySQL
        const respuestaIa = `Estimado(a) ${nombreCliente}, con gusto le presentamos la cotización Folio ${folio} por el equipo ${productPricing.description}: Subtotal Neto $${productPricing.precioNeto.toLocaleString('es-CL')} + IVA 19% ($${productPricing.iva.toLocaleString('es-CL')}) = Total $${productPricing.precioTotal.toLocaleString('es-CL')} CLP. Puede revisar el PDF adjunto.`;
        await saveConversation(cliente.id, mensajeTexto, respuestaIa, 'COTIZACION_MOTOR');
        return res.status(200).json({
            status: 'SUCCESS',
            message: 'Cotización procesada, guardada en MySQL y sincronizada con Google Sheets',
            folio,
            totalClp: productPricing.precioTotal,
            respuestaIa,
        });
    }
    catch (error) {
        console.error('Error en webhook:', error);
        return res.status(500).json({ error: 'Error interno en servidor webhook', details: error.message });
    }
};
