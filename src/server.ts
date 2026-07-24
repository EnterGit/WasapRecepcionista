import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { handleWebhookGET, handleWebhookPOST } from './controllers/webhookController.js';
import { handleQuoteStatusUpdate } from './controllers/quoteStatusController.js';
import { handleAnalyticsKpis } from './controllers/analyticsController.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Menú Raíz Informativo (GET /)
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'UP',
    system: 'Gestion_Cotizacion',
    version: '2.0.0 (Fase 2)',
    description: 'Sistema Integral de Gestión de Cotizaciones, Clientes MySQL, Histórico RAG & KPIs All Solutions SpA',
    endpoints: {
      health: 'GET /health',
      webhook: 'GET/POST /webhook',
      updateQuoteStatus: 'PATCH /api/quotes/:folio/status',
      analyticsKpis: 'GET /api/analytics/kpis'
    }
  });
});

// 2. Healthcheck (GET /health)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', system: 'Gestion_Cotizacion', timestamp: new Date().toISOString() });
});

// 3. Webhook WhatsApp Meta (GET/POST /webhook)
app.get('/webhook', handleWebhookGET);
app.post('/webhook', handleWebhookPOST);

// 4. Gestión de Estado de Cotizaciones (PATCH /api/quotes/:folio/status)
app.patch('/api/quotes/:folio/status', handleQuoteStatusUpdate);
app.post('/api/quotes/:folio/status', handleQuoteStatusUpdate);

// 5. Panel de Indicadores & KPIs Analytics (GET /api/analytics/kpis)
app.get('/api/analytics/kpis', handleAnalyticsKpis);

app.listen(env.PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Server Gestion_Cotizacion (Fase 2) UP en puerto ${env.PORT}`);
  console.log(`📍 Webhook: http://localhost:${env.PORT}/webhook`);
  console.log(`📍 KPIs Analytics: http://localhost:${env.PORT}/api/analytics/kpis`);
  console.log(`📍 Cambio Estado Cotización: PATCH http://localhost:${env.PORT}/api/quotes/:folio/status`);
  console.log(`=================================================`);
});
