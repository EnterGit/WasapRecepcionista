# OpenSpec 02: Requerimientos Formales (Sintaxis EARS) & Alcance NFR (v2.0)
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA)

---

## 📋 1. Requerimientos Funcionales (Sintaxis EARS)

### 1.1 Ubicuos (Reglas de Negocio Perpetuas)
- `REQ-EARS-001`: El sistema **DEBERÁ** (SHALL) calcular el 19% de IVA para todas las cotizaciones expresadas en pesos chilenos (CLP).
- `REQ-EARS-002`: El sistema **DEBERÁ** (SHALL) guardar todo mensaje entrante y saliente de WhatsApp en la tabla MySQL `conversaciones`.
- `REQ-EARS-003`: El sistema **DEBERÁ** (SHALL) asignar un folio único `CE-XXXXX` a cada cotización generada.
- `REQ-EARS-008`: La interfaz web **DEBERÁ** (SHALL) ser construida en **Vite + React 18 (TypeScript)** y aplicar el sistema de diseño visual corporativo definido por `agente_diseno` (Obsidian Black `#111111`, Electric Accent `#0066CC`, Glassmorphism y tipografía `Lato`/`Inter`).

### 1.2 Basados en Eventos (Event-Driven)
- `REQ-EARS-004`: **CUANDO** (WHEN) un cliente envíe una solicitud de cotización por WhatsApp, **ENTONCES** (THEN) el sistema DEBERÁ crear un registro en la tabla `cotizaciones` con estado `GENERADA` y generar el archivo PDF ReportLab en `data/` y Google Drive `/02_Cotizaciones_Pendientes/`.
- `REQ-EARS-005`: **CUANDO** (WHEN) el vendedor apruebe una cotización en el Dashboard Web (`PATCH /api/quotes/:folio/status`), **ENTONCES** (THEN) el sistema DEBERÁ actualizar el estado a `ACEPTADA`, mover el archivo PDF a `/03_Cotizaciones_Aprobadas/` y notificar al cliente por WhatsApp.
- `REQ-EARS-006`: **CUANDO** (WHEN) el vendedor o cliente rechace una cotización, **ENTONCES** (THEN) el sistema DEBERÁ exigir el parámetro `motivo_rechazo`, actualizar la tabla `cotizaciones` a `RECHAZADA` y mover el archivo PDF a `/04_Cotizaciones_Rechazadas/`.
- `REQ-EARS-009`: **CUANDO** (WHEN) el usuario seleccione una cotización en la lista web, **ENTONCES** (THEN) el Dashboard DEBERÁ renderizar la cotización en el visor PDF integrado en pantalla dividida.

### 1.3 Basados en Estado (State-Driven)
- `REQ-EARS-007`: **MIENTRAS** (WHILE) la etiqueta en Chatwoot del cliente sea `bot_off`, **ENTONCES** (THEN) la IA DEBERÁ permanecer en silencio absoluto y abstenerse de enviar respuestas automáticas.
- `REQ-EARS-010`: **MIENTRAS** (WHILE) el usuario navegue en la pestaña Analytics, **ENTONCES** (THEN) el Dashboard Web DEBERÁ renderizar gráficos interactivos Recharts con los datos consumidos de `GET /api/analytics/kpis`.

---

## ⚡ 2. Requerimientos No Funcionales (NFR)

- **NFR-PERF-01:** El tiempo de carga de la Página Web Dashboard DEBERÁ ser menor a 300 ms.
- **NFR-PERF-02:** El tiempo de respuesta p95 de los endpoints del backend DEBERÁ ser menor a 3.500 ms.
- **NFR-SEC-01:** Las peticiones entrantes del Webhook DEBERÁN ser validadas mediante firma HMAC SHA-256 (`x-hub-signature-256`).
- **NFR-DATA-01:** La base de datos MySQL DEBERÁ mantener integridad referencial mediante claves foráneas y transacción ACID al guardar cotizaciones y sus items.
