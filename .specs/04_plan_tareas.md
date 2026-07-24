# OpenSpec 04: Plan de Tareas Granulares & Auditoría (Patrón Día del Juicio - v2.0)
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA)

---

## 📋 Checklist de Tareas de Ejecución

- [x] **Tarea 1: Setup & Estructura Inicial del Proyecto (`Gestion_Cotizacion`)**
  - **Precondiciones:** Node.js v22+, TypeScript 5.7+ disponible.
  - **Acciones:** Crear `package.json`, `tsconfig.json`, `docker-compose.yml` (MySQL 8.0) y `.env`.

- [x] **Tarea 2: Esquema DDL MySQL & Conector Database (`src/database/`)**
  - **Precondiciones:** Archivo `docker-compose.yml` definido.
  - **Acciones:** Crear `schema.sql` (tablas `clientes`, `cotizaciones`, `cotizacion_items`, `conversaciones`) y `db.ts` con Pool `mysql2/promise`.

- [x] **Tarea 3: Repositorios MySQL (`src/repositories/`)**
  - **Precondiciones:** Conector `db.ts` creado.
  - **Acciones:** Implementar `customerRepository.ts`, `quoteRepository.ts` y `conversationRepository.ts`.

- [x] **Tarea 4: Servicio de Indicadores Analytics & KPIs (`src/services/analyticsService.ts`)**
  - **Precondiciones:** Repositorio `quoteRepository.ts` implementado.
  - **Acciones:** Programar funciones `getTopProducts()`, `getLeastRequestedProducts()`, `getBestCustomers()`, `getConversionRateAndRejectionReasons()`.

- [x] **Tarea 5: Integración del Webhook con MySQL & RAG (`src/controllers/webhookController.ts`)**
  - **Precondiciones:** Repositorios e IA Gemini en funcionamiento.
  - **Acciones:** Guardar mensajes en `conversaciones`, asociar cliente por teléfono y generar cotización en `cotizaciones`.

- [x] **Tarea 6: Endpoints REST de Estado de Cotizaciones & KPIs (`src/controllers/`)**
  - **Precondiciones:** WebhookController actualizado.
  - **Acciones:** Implementar `quoteStatusController.ts` (`PATCH /api/quotes/:folio/status`) y `analyticsController.ts` (`GET /api/analytics/kpis`).

- [x] **Tarea 7: Suite de Pruebas Unitarias Vitest (`src/**/*.test.ts`)**
  - **Precondiciones:** Todos los módulos creados.
  - **Acciones:** Ejecutar `npm test` verificando que 100% de los tests pasen exitosamente.

- [x] **Tarea 8: Prueba de Simulación E2E con Agentes (`playwright_testing_agent`)**
  - **Precondiciones:** Servidor `Gestion_Cotizacion` activo en puerto 3000.
  - **Acciones:** Simular ciclo de vida completo: Webhook POST ➔ Guardar en MySQL ➔ Cambio de Estado ACEPTADA/RECHAZADA ➔ Verificación de KPIs (5/5 PASSED).

- [ ] **Tarea 9: Desarrollo de la Página Web Dashboard (`src/web/` - Vite + React TS)**
  - **Precondiciones:** Endpoints REST API Backend funcionando (`/api/quotes`, `/api/analytics/kpis`).
  - **Acciones:** Construir componentes React: `QuoteListTable.tsx`, `PdfViewerPanel.tsx` (visor PDF pantalla dividida), `CustomerChatPanel.tsx` y `KpiBentoGrid.tsx` (Recharts gráficos).

- [ ] **Tarea 10: Auditoría Visual con `agente_diseno` & Pruebas E2E de la Web App**
  - **Precondiciones:** Tarea 9 completada.
  - **Acciones:** Auditar la interfaz web en Chrome DevTools verificando los tokens HSL corporativos (`#111111`, `#0066CC`, Glassmorphism) y probar los botones `[APROBAR]` y `[RECHAZAR]`.
