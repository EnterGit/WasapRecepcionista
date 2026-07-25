import { LgWebosRemoteService } from '../mcp/lgWebosRemoteServer.js';
export class TvNotificationService {
    static lgRemote = new LgWebosRemoteService();
    /**
     * Envía un aviso Toast flotante a la TV LG de la oficina de ventas cuando se aprueba o rechaza una cotización
     */
    static async notifyQuoteEventOnTv(folio, clienteNombre, montoClp, estado, motivoRechazo) {
        const emoji = estado === 'ACEPTADA' ? '🎉' : '⚠️';
        const message = estado === 'ACEPTADA'
            ? `${emoji} ¡COTIZACIÓN APROBADA! Folio ${folio} de ${clienteNombre} por $${montoClp.toLocaleString('es-CL')} CLP.`
            : `${emoji} Cotización ${folio} Rechazada. Causal: ${motivoRechazo || 'Presupuesto'}`;
        console.log(`📺 [TV LG NOTIFIER] ${message}`);
        await this.lgRemote.showToast(message);
        return { success: true, toastMessage: message };
    }
}
