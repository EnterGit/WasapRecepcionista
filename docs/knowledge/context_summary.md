# Context Summary: Resumen Continuo del Desarrollo (Fase 2 v26.0)
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA | RUT 77.654.321-K)
### Cuenta Corporativa: ventascotizawasap@gmail.com
### Última Sincronización: 24 de Julio de 2026

> **REGLA DE CONTEXTO CONTINUO:** El Agente Maestro coordina 3 subagentes especializados (`agente_diseno`, `playwright_testing_agent`, `llm_wiki_agent`) y 16 servidores MCP activos.

---

## 🤖 1. MATRIZ DE AGENTES ESPECIALIZADOS

1. **`agente_diseno` ([agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_diseno/agent.md)):**
   - Vinculado a 5 Libretas de Investigación de NotebookLM:
     1. UI/UX Master: `1b789113-3210-4b91-9358-85b2b54ef5d2`
     2. Design System: `f5b4762b-f892-47cb-a2fb-fcd6d623983f`
     3. Color & Typography: `a49eedc1-607d-4b42-b351-cb823b32904d`
     4. Micro-Animations: `ced673a0-396b-444d-bfa5-b50019fcf4f9`
     5. Component Architecture: `923409d1-b893-4a80-b828-45ee558eb1dc`
   - Generó la maqueta visual [all_solutions_dashboard_pdf_mockup_1784917880275.jpg](file:///C:/Users/kibernum/.gemini/antigravity/brain/ae7cfb6a-dc4d-4766-9b93-d9a17630b876/all_solutions_dashboard_pdf_mockup_1784917880275.jpg) y el documento de tokens [sintesis_lineamientos_diseno_all_solutions.md](file:///C:/Users/kibernum/.gemini/antigravity/brain/ae7cfb6a-dc4d-4766-9b93-d9a17630b876/sintesis_lineamientos_diseno_all_solutions.md).

2. **`playwright_testing_agent` ([agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/playwright_testing_agent/agent.md)):**
   - Ejecución de pruebas simuladas E2E, 143 presets móviles y REST API testing.

3. **`llm_wiki_agent` ([agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/llm_wiki_agent/agent.md)):**
   - Indización por grafo Karpathy de los 20 productos reales extraídos de `allsolutions.cl` en `llm_wiki_index.json`.

---

## 🏢 2. CONFIGURACIÓN DE PRODUCCIÓN Y BASE DE DATOS MYSQL

- **Empresa:** All Solutions SpA | **RUT:** `77.654.321-K`
- **Correo Comercial:** `ventascotizawasap@gmail.com`
- **Base de Datos MySQL (`schema.sql`):** Tablas `clientes`, `cotizaciones`, `cotizacion_items` y `conversaciones`.
- **Servicio de KPIs Analytics (`GET /api/analytics/kpis`):** Productos más/menos pedidos, mejor cliente CLP, tasa de conversión (%) y motivos de rechazo.
