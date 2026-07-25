# AGENT.md: Main Steering Document v5.0 (Master Orchestrator)
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA | RUT 77.654.321-K)
### Estado del Servidor: UP en http://localhost:3000/

---

## 🎯 Reglas Supremas de Gobierno de Código

1. **Cumplimiento Estricto de Kiro SDD:** Toda modificación debe estar justificada en `.specs/02_objetivo_alcance.md` con sintaxis EARS.
2. **Preservación de TypeScript & Zod:** Todo tipo debe ser fuertemente tipado (`QuoteSchema`).
3. **Persistencia Tripartita:** Toda interacción con el cliente debe ser guardada en MySQL, sincronizada con Google Drive y replicada en Google Sheets.
4. **Respeto a las Reglas Comerciales:** IVA 19% CLP, Folio `CE-XXXXX`, Trato formal ("Usted").
5. **Control Remoto & Domótica:** Integración con televisores LG webOS vía MCP Server `mcp-lg-webos-remote`.

---

## 🤖 Matriz de Subagentes Especializados Registrados (6 en Total)

| Nombre del Subagente | Archivo de Definición | Rol y Funciones Especializadas |
| :--- | :--- | :--- |
| **`agente_control_remoto_lg`** | [.agents/agents/agente_control_remoto_lg/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_control_remoto_lg/agent.md) | **Agente Especialista en Control Remoto LG webOS & MCP.**<br/>• Inspirado en `heroslender/lg-remote`.<br/>• Conectado al servidor MCP `mcp-lg-webos-remote`.<br/>• Controla volumen, botones, YouTube/Netflix y emite notificaciones Toast flotantes en pantalla TV. |
| **`agente_cotizaciones_wasap`** | [.agents/agents/agente_cotizaciones_wasap/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_cotizaciones_wasap/agent.md) | **Agente Especialista en Cotizaciones por WhatsApp.**<br/>• Formulario inteligente de 16 campos obligatorios, validación de RUT y esquema Zod. |
| **`agente_google_sheets_sync`** | [.agents/agents/agente_google_sheets_sync/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_google_sheets_sync/agent.md) | **Integrador WhatsApp - Google Sheets & AppsScript.**<br/>• Inspirado en `RemmiV1`, `googlesheets-sender` y `SendWhatsappCloud`. Sincroniza 15 columnas en Sheets. |
| **`agente_diseno`** | [.agents/agents/agente_diseno/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_diseno/agent.md) | **Diseño UI/UX y Web Dashboard.**<br/>• Regido por 5 Libretas NotebookLM para maquetar la interfaz web HSL (`#111111`, `#0066CC`). |
| **`playwright_testing_agent`** | [.agents/agents/playwright_testing_agent/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/playwright_testing_agent/agent.md) | **Testing Simulado E2E.**<br/>• Verificación del ciclo de vida de cotizaciones (100% PASSED). |
| **`llm_wiki_agent`** | [.agents/agents/llm_wiki_agent/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/llm_wiki_agent/agent.md) | **Karpathy LLM Wiki Graph.**<br/>• Grafo de 30 nodos con productos, precios Neto CLP, 19% IVA y carpetas Drive. |

---

## 🔌 Servidores MCP Integrados (17 en Total)
- `mcp-lg-webos-remote v1.0` | `mcp-master-agent-orchestrator v4.0` | `mcp-llm-wiki-indexer` | `notebooklm` | `chrome-devtools-mcp` | `StitchMCP` | `supabase-mcp-server` | `firebase-mcp-server` | `mcp-google-workspace-expert`.
