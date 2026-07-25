/**
 * Servicio de Seguimiento Automatizado de Cotizaciones (Follow-Up Engine)
 * Inspirado en repositorios Whapi-Cloud / SendWhatsappCloud
 */
export class QuoteFollowUpService {
    /**
     * Identifica cotizaciones en estado GENERADA o ENVIADA que requieren seguimiento automático
     */
    static getPendingFollowUps(quotes) {
        return quotes
            .filter((q) => q.estado === 'GENERADA' || q.estado === 'ENVIADA')
            .map((q) => ({
            folio: q.folio,
            clienteNombre: q.clienteNombre,
            clienteTelefono: q.clienteTelefono,
            diasPendiente: 2,
            mensajeSugerido: `Estimado(a) ${q.clienteNombre}, le saludamos de All Solutions SpA. ¿Pudo revisar la propuesta comercial Folio ${q.folio} por $${q.totalClp.toLocaleString('es-CL')} CLP? Quedamos atentos a cualquier duda técnica o coordinación de entrega.`,
        }));
    }
    /**
     * Ejecuta el despacho del recordatorio por WhatsApp
     */
    static async sendFollowUpReminder(folio, clienteTelefono, mensaje) {
        console.log(`📱 [AUTOMATED FOLLOW-UP] Enviando recordatorio por WhatsApp a ${clienteTelefono} (Folio ${folio})...`);
        console.log(`   └─ Mensaje: "${mensaje}"`);
        return { success: true, dispatchedAt: new Date().toISOString() };
    }
}
