import { Request, Response } from 'express';
import { updateQuoteStatus } from '../repositories/quoteRepository.js';

export async function handleQuoteStatusUpdate(req: Request, res: Response): Promise<void> {
  try {
    const rawFolio = req.params.folio;
    const folio = Array.isArray(rawFolio) ? rawFolio[0] : String(rawFolio || '');
    const { estado, motivoRechazo } = req.body;

    if (!estado || !['ACEPTADA', 'RECHAZADA'].includes(estado)) {
      res.status(400).json({ error: 'El estado debe ser ACEPTADA o RECHAZADA.' });
      return;
    }

    if (estado === 'RECHAZADA' && !motivoRechazo) {
      res.status(400).json({ error: 'El parámetro motivoRechazo es obligatorio para cotizaciones rechazadas.' });
      return;
    }

    const updated = await updateQuoteStatus(folio, estado, motivoRechazo);
    if (!updated) {
      res.status(404).json({ error: `Cotización con folio ${folio} no encontrada.` });
      return;
    }

    console.log(`✅ [Estado Cotización Actualizado] Folio: ${folio} ➔ ${estado} (Motivo: ${motivoRechazo || 'N/A'})`);
    res.status(200).json({
      status: 'SUCCESS',
      message: `Cotización ${folio} actualizada a ${estado}`,
      quote: updated
    });
  } catch (error) {
    console.error(`❌ Error actualizando estado de cotización: ${error}`);
    res.status(500).json({ error: 'Error interno actualizando cotización' });
  }
}
