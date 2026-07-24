# OpenSpec 04: Plan de Tareas Granulares & Auditoría (Patrón Día del Juicio)
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA)

---

## 📋 Checklist de Tareas de Ejecución

- [x] **Tarea 1: Setup & Estructura Inicial del Proyecto (`Gestion_Cotizacion`)**
  - **Precondiciones:** Node.js v22+, TypeScript 5.7+ disponible.
  - **Acciones:** Crear `package.json`, `tsconfig.json`, `docker-compose.yml` (MySQL 8.0) y `.env`.

- [ ] **Tarea 2: Esquema DDL MySQL & Conector Database (`src/database/`)**
  - **Precondiciones:** Archivo `docker-compose.yml` definido.
  - **Acciones:** Crear `schema.sql` (tablas `clientes`, `cotizaciones`, `cotizacion_items`, `conversaciones`) y `db.ts` con Pool `mysql2/promise`.

- [ ] **Tarea 3: Repositorios MySQL (`src/repositories/`)**
  - **Precondiciones:** Conector `db.ts` creado.
  - **Acciones:** Implementar `customerRepository.ts`, `quoteRepository.ts` y `conversationRepository.ts`.

- [ ] **Tarea 4: Servicio de Indicadores Analytics & KPIs (`src/services/analyticsService.ts`)**
  - **Precondiciones:** Repositorio `quoteRepository.ts` implementado.
  - **Acciones:** Programar funciones `getTopProducts()`, `getLeastRequestedProducts()`, `getBestCustomers()`, `getConversionRateAndRejectionReasons()`.

- [ ] **Tarea 5: Integración del Webhook con MySQL & RAG (`src/controllers/webhookController.ts`)**
  - **Precondiciones:** Repositorios e IA Gemini en funcionamiento.
  - **Acciones:** Guardar mensajes en `conversaciones`, asociar cliente por teléfono y generar cotización en `cotizaciones`.

- [ ] **Tarea 6: Endpoints REST de Estado de Cotizaciones & KPIs (`src/controllers/`)**
  - **Precondiciones:** WebhookController actualizado.
  - **Acciones:** Implementar `quoteStatusController.ts` (`PATCH /api/quotes/:folio/status`) y `analyticsController.ts` (`GET /api/analytics/kpis`).

- [ ] **Tarea 7: Suite de Pruebas Unitarias Vitest (`src/**/*.test.ts`)**
  - **Precondiciones:** Todos los módulos creados.
  - **Acciones:** Ejecutar `npm test` verificando que 100% de los tests pasen exitosamente.

- [ ] **Tarea 8: Prueba de Simulación E2E con Agentes (`playwright_testing_agent`)**
  - **Precondiciones:** Servidor `Gestion_Cotizacion` activo en puerto 3000.
  - **Acciones:** Simular ciclo de vida completo: Webhook POST ➔ Guardar en MySQL ➔ Cambio de Estado ACEPTADA/RECHAZADA ➔ Verificación de KPIs.
