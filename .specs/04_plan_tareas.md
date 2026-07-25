# OpenSpec 04: Plan de Tareas Granulares & Auditoría (Patrón Día del Juicio - v4.0)
## Proyecto: Gestion_Cotizacion (Fase 2 & Fase 3 - All Solutions SpA)

---

## 📋 Checklist de Tareas de Ejecución

- [x] **Tarea 1: Setup & Estructura Inicial del Proyecto (`Gestion_Cotizacion`)**
- [x] **Tarea 2: Esquema DDL MySQL & Conector Database (`src/database/`)**
- [x] **Tarea 3: Repositorios MySQL (`src/repositories/`)**
- [x] **Tarea 4: Servicio de Indicadores Analytics & KPIs (`src/services/analyticsService.ts`)**
- [x] **Tarea 5: Integración del Webhook con MySQL & RAG (`src/controllers/webhookController.ts`)**
- [x] **Tarea 6: Endpoints REST de Estado de Cotizaciones & KPIs (`src/controllers/`)**
- [x] **Tarea 7: Suite de Pruebas Unitarias Vitest (`src/**/*.test.ts`)**
- [x] **Tarea 8: Prueba de Simulación E2E con Agentes (`playwright_testing_agent`)**
- [x] **Tarea 9: Desarrollo de la Página Web Dashboard (`src/web/` - Vite + React TS)**
- [x] **Tarea 10: Auditoría Visual con `agente_diseno` & Pruebas E2E en Navegador**
- [x] **Tarea 11: Definición del Formulario Inteligente WhatsApp con `agente_cotizaciones_wasap`**
- [x] **Tarea 12: Integración Sincronizador Google Sheets & AppsScript con `agente_google_sheets_sync`**

---

### 🚀 FASE 3: INTEGRACIÓN EMPRESARIAL Y CONTROL DE ACCESO (NUEVAS TAREAS)

- [ ] **Tarea 13: Módulo de Autenticación & Control de Acceso (RBAC - `src/middlewares/auth.ts`)**
  - **Precondiciones:** Servidor Express activo.
  - **Acciones:** Middleware JWT para autenticar Vendedores y Administradores (`POST /api/auth/login`).

- [ ] **Tarea 14: Cliente Nativo Google Sheets API (`src/services/googleSheetsApiService.ts`)**
  - **Precondiciones:** Credenciales Google Workspace (`ventascotizawasap@gmail.com`).
  - **Acciones:** Sincronización real con Google Sheets API en la nube usando `@googleworkspace/cli` / `googleapis`.

- [ ] **Tarea 15: Notificador Flotante en Vivo Smart TV LG webOS (`src/services/tvNotificationService.ts`)**
  - **Precondiciones:** Conector `lgWebosRemoteServer.ts` creado.
  - **Acciones:** Transmitir avisos Toast en pantalla TV al aprobar/rechazar cotizaciones.

- [ ] **Tarea 16: Suite de Verificación Final Fase 3 (`vitest` + `playwright_testing_agent`)**
  - **Precondiciones:** Tareas 13, 14 y 15 implementadas.
  - **Acciones:** Ejecutar suite unitaria Vitest y simulación Playwright E2E verificando 0 fallos.
