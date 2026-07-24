import { findOrCreateCustomer } from '../repositories/customerRepository.js';
import { saveQuote } from '../repositories/quoteRepository.js';
import { saveConversation } from '../repositories/conversationRepository.js';
import { getProductPricingAndStock } from '../services/pricingService.js';
import { generatePdfQuote } from '../services/quoteService.js';
export function handleWebhookGET(req, res) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === 'allsolutions_verify_token_2026') {
        res.status(200).send(challenge);
    }
    else {
        res.sendStatus(403);
    }
}
export async function handleWebhookPOST(req, res) {
    try {
        const entry = req.body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messageObj = value?.messages?.[0];
        const contactObj = value?.contacts?.[0];
        if (!messageObj) {
            res.status(200).send('EVENT_RECEIVED');
            return;
        }
        const customerPhone = messageObj.from || '+56912345678';
        const customerName = contactObj?.profile?.name || 'Cliente';
        const messageText = messageObj.text?.body || '';
        // 1. Guardar o Buscar Cliente en MySQL
        const customer = await findOrCreateCustomer(customerPhone, customerName);
        // 2. Generar Precios y Cotización
        const pricing = getProductPricingAndStock(messageText);
        const pdfResult = await generatePdfQuote(pricing, customerName, customerPhone);
        // 3. Persistir Cotización en MySQL
        await saveQuote({
            folio: pdfResult.quoteNumber,
            clienteId: customer.id,
            subtotalNeto: pricing.precioNeto,
            iva19: pricing.iva,
            totalClp: pricing.precioTotal,
            estado: 'GENERADA',
            pdfDriveUrl: `https://drive.google.com/file/d/${pdfResult.quoteNumber}`
        }, [
            {
                sku: pricing.sku,
                descripcion: pricing.description,
                cantidad: 1,
                precioUnitarioNeto: pricing.precioNeto,
                importeNeto: pricing.precioNeto
            }
        ]);
        // 4. Formatear Respuesta Formal RAG
        const responseIa = `Estimado(a) ${customerName}, le informo que el equipo ${pricing.description} tiene un costo de $${pricing.precioNeto.toLocaleString('es-CL')} CLP Neto + IVA 19% ($${pricing.iva.toLocaleString('es-CL')} CLP), totalizando $${pricing.precioTotal.toLocaleString('es-CL')} CLP. He generado su Cotización N° ${pdfResult.quoteNumber}. Un ejecutivo comercial la revisará a la brevedad para enviar el documento oficial.`;
        // 5. Persistir Conversación en MySQL
        await saveConversation(customer.id, messageText, responseIa, 'SOLICITUD_COTIZACION');
        console.log(`✅ [Webhook Procesado & Guardado en MySQL] Cliente: ${customerName} | Folio: ${pdfResult.quoteNumber}`);
        res.status(200).send('EVENT_RECEIVED');
    }
    catch (error) {
        console.error(`❌ Error en Webhook: ${error}`);
        res.status(500).send('SERVER_ERROR');
    }
}
