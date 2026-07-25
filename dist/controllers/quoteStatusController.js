import { updateQuoteStatus } from '../repositories/quoteRepository.js';
import { TvNotificationService } from '../services/tvNotificationService.js';
import { GoogleSheetsSyncService } from '../services/googleSheetsSyncService.js';
export const handleQuoteStatusUpdate = async (req, res) => {
    try {
        const { folio } = req.params;
        const { estado, motivoRechazo } = req.body;
        const folioStr = Array.isArray(folio) ? folio[0] : folio;
        if (!folioStr) {
            return res.status(400).json({ error: 'El parámetro folio es obligatorio en la URL' });
        }
        if (!estado || (estado !== 'ACEPTADA' && estado !== 'RECHAZADA')) {
            return res.status(400).json({ error: 'El estado debe ser ACEPTADA o RECHAZADA' });
        }
        if (estado === 'RECHAZADA' && !motivoRechazo) {
            return res.status(400).json({ error: 'El motivoRechazo es obligatorio al rechazar una cotización' });
        }
        // 1. Actualizar estado en MySQL
        const updatedQuote = await updateQuoteStatus(folioStr, estado, motivoRechazo);
        if (!updatedQuote) {
            return res.status(404).json({ error: `Cotización con folio ${folioStr} no encontrada` });
        }
        // 2. Sincronizar actualización con Google Sheets
        await GoogleSheetsSyncService.syncToGoogleSheets(updatedQuote);
        // 3. Notificar en vivo en la pantalla de la Smart TV LG webOS
        await TvNotificationService.notifyQuoteEventOnTv(updatedQuote.folio, 'Cliente All Solutions', updatedQuote.totalClp, estado, motivoRechazo);
        return res.status(200).json({
            status: 'SUCCESS',
            message: `Cotización ${folioStr} actualizada exitosamente a ${estado}`,
            quote: updatedQuote,
        });
    }
    catch (error) {
        console.error('Error actualizando estado de cotización:', error);
        return res.status(500).json({ error: 'Error interno al actualizar estado', details: error.message });
    }
};
