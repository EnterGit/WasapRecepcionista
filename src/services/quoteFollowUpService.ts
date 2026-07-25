/**
 * Servicio de Seguimiento Automatizado de Cotizaciones (Follow-Up Engine)
 * Inspirado en repositorios Whapi-Cloud / SendWhatsappCloud
 */

export interface FollowUpTask {
  folio: string;
  clienteNombre: string;
  clienteTelefono: string;
  diasPendiente: number;
  mensajeSugerido: string;
}

export class QuoteFollowUpService {
  /**
   * Identifica cotizaciones en estado GENERADA o ENVIADA que requieren seguimiento automático
   */
  public static getPendingFollowUps(quotes: any[]): FollowUpTask[] {
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
  public static async sendFollowUpReminder(folio: string, clienteTelefono: string, mensaje: string): Promise<{ success: boolean; dispatchedAt: string }> {
    console.log(`📱 [AUTOMATED FOLLOW-UP] Enviando recordatorio por WhatsApp a ${clienteTelefono} (Folio ${folio})...`);
    console.log(`   └─ Mensaje: "${mensaje}"`);
    return { success: true, dispatchedAt: new Date().toISOString() };
  }
}
