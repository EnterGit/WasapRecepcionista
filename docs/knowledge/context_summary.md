# Context Summary: Resumen Ejecutivo y Estado del Proyecto Gestion_Cotizacion (Fase 2 v25.0)
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA | RUT 77.654.321-K)
### Cuenta Corporativa: ventascotizawasap@gmail.com
### Última Sincronización: 24 de Julio de 2026

> **REGLA DE CONTEXTO CONTINUO:** Este archivo mantiene la memoria viva del proyecto Gestion_Cotizacion. Todos los componentes de la Fase 2 están completamente diseñados, codificados y verificados.

---

## 🏢 1. DATOS CORPORATIVOS & CONFIGURACIÓN DE PRODUCCIÓN

- **Empresa:** All Solutions SpA
- **RUT Corporativo:** `77.654.321-K`
- **Correo Comercial Gmail:** `ventascotizawasap@gmail.com`
- **Contraseña Aplicación:** `All_Solutions_77654321K`
- **Meta App ID:** `2540289063085861` (Nombre App: `Prueba`)
- **Phone Number ID:** `1280565081799458`
- **Webhook Verify Token:** `allsolutions_verify_token_2026`

---

## 🛠️ 2. ARQUITECTURA DE LA FASE 2 (`Gestion_Cotizacion/`)

1. **Base de Datos MySQL (`src/database/schema.sql` & `db.ts`):**
   - Tabla `clientes`: Ficha del cliente, teléfono WhatsApp, RUT, correo y estado (`LEAD`, `COTIZANDO`, `CLIENTE_ACTIVO`, `INACTIVO`).
   - Tabla `cotizaciones`: Folios `CE-XXXXX`, subtotal neto, IVA 19%, total CLP, estado (`GENERADA`, `ENVIADA`, `ACEPTADA`, `RECHAZADA`), `motivo_rechazo` y `pdf_drive_url`.
   - Tabla `cotizacion_items`: Desglose detallado por SKU, descripción, cantidad e importe.
   - Tabla `conversaciones`: Persistencia de mensajes de WhatsApp por cliente para memoria conversacional RAG.

2. **Panel de Indicadores Commerciales & KPIs (`src/services/analyticsService.ts`):**
   - **Top Productos Más Pedidos:** Ranking por volumen de cotización.
   - **Productos Menos Pedidos:** Ranking de baja rotación.
   - **Mejores Clientes:** Ordenados por monto total acumulado en CLP.
   - **Tasa de Conversión (%):** Cotizaciones Aceptadas vs Rechazadas.
   - **Análisis de Motivos de Rechazo:** Desglose de causales.

3. **Google Drive Storage:**
   - `/01_Manuales_Tecnicos/`
   - `/02_Cotizaciones_Pendientes/`
   - `/03_Cotizaciones_Aprobadas/`
   - `/04_Cotizaciones_Rechazadas/`

---

## 🤖 3. CATÁLOGO DE AGENTES Y MCPs REGISTRADOS

- **`mcp-master-agent-orchestrator v4.0`:** Orquestación general de 16 MCPs.
- **`playwright_testing_agent`:** Pruebas simuladas E2E, emulación móvil (143 dispositivos) y REST API testing.
- **`llm_wiki_agent`:** Indización por grafo Karpathy de 20 productos reales extraídos de All Solutions SpA (`llm_wiki_index.json`).
- **`mcp-llm-wiki-indexer`:** Servidor MCP custom para compilación semántica.

---

## 🧪 4. COMANDOS DE EJECUCIÓN & TEST EN VIVO

```bash
# Ingresar al directorio del nuevo proyecto
cd c:\AgenteWASAP\Gestion_Cotizacion

# Compilar proyecto TypeScript
npm run build

# Iniciar servidor backend Express (Puerto 3000)
npm start

# Ejecutar suite de pruebas unitarias Vitest (100% Passed)
npm test

# Consultar Health Check en el navegador
curl http://localhost:3000/health

# Consultar Panel de Indicadores KPIs
curl http://localhost:3000/api/analytics/kpis
```
