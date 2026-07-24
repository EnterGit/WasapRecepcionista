import { Request, Response } from 'express';
import { calculateAnalyticsKpis } from '../services/analyticsService.js';

export async function handleAnalyticsKpis(req: Request, res: Response): Promise<void> {
  try {
    const kpis = await calculateAnalyticsKpis();
    res.status(200).json({
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      kpis
    });
  } catch (error) {
    console.error(`❌ Error calculando KPIs comerciales: ${error}`);
    res.status(500).json({ error: 'Error interno consultando KPIs' });
  }
}
