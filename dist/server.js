import express from 'express';
import cors from 'cors';
import path from 'path';
import { env } from './config/env.js';
import { handleWebhookGET, handleWebhookPOST } from './controllers/webhookController.js';
import { handleQuoteStatusUpdate } from './controllers/quoteStatusController.js';
import { handleAnalyticsKpis } from './controllers/analyticsController.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Servir PDFs de Cotizaciones Físicos en /data
app.use('/data', express.static(path.join(process.cwd(), 'data')));
// 1. Menú Raíz Informativo (GET /)
app.get('/api/status', (req, res) => {
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
// Servir la aplicación Web Dashboard en la raíz /
app.use(express.static(path.join(process.cwd(), 'src', 'web')));
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/webhook') || req.path.startsWith('/data')) {
        return next();
    }
    res.sendFile(path.join(process.cwd(), 'src', 'web', 'index.html'));
});
app.listen(env.PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 Server Gestion_Cotizacion (Fase 2) UP en puerto ${env.PORT}`);
    console.log(`💻 Web Dashboard: http://localhost:${env.PORT}/`);
    console.log(`📍 Webhook: http://localhost:${env.PORT}/webhook`);
    console.log(`📍 KPIs Analytics: http://localhost:${env.PORT}/api/analytics/kpis`);
    console.log(`📍 Cambio Estado Cotización: PATCH http://localhost:${env.PORT}/api/quotes/:folio/status`);
    console.log(`=================================================`);
});
