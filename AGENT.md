# AGENT.md: Main Steering Document v7.0 (Master Orchestrator Final con UX/UI MCP)
## Proyecto: Gestion_Cotizacion (Fase 2 & Fase 3 - All Solutions SpA | RUT 77.654.321-K)
### Estado de Despliegue: 100% Operativo y Verificado en http://localhost:3000/

---

## 🎯 Reglas Supremas de Gobierno de Código

1. **Cumplimiento Estricto de Kiro SDD:** Toda modificación está justificada en `.specs/02_objetivo_alcance.md` con sintaxis EARS.
2. **Preservación de TypeScript & Zod:** Tipado estricto (`QuoteSchema`).
3. **Persistencia Tripartita:** Toda interacción con el cliente es guardada en MySQL 8.0, sincronizada con Google Drive y replicada en la planilla Google Sheets.
4. **Respeto a las Reglas Comerciales:** IVA 19% CLP, Folio `CE-XXXXX`, Trato formal ("Usted").
5. **Experiencia de Usuario Supremo (UX/UI):** Auditado continuamente por `agente_diseno_ux_ui_mcp` y la libreta NotebookLM `2af9d77c-2cee-4fcd-b7d9-fce0972c7a92`.

---

## 🤖 Matriz Completa de Subagentes Especializados Registrados (7 en Total)

| Nombre del Subagente | Archivo de Definición | Rol y Fuentes de Conocimiento |
| :--- | :--- | :--- |
| **`agente_diseno_ux_ui_mcp`** | [.agents/agents/agente_diseno_ux_ui_mcp/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_diseno_ux_ui_mcp/agent.md) | **Agente Experto en UX, UI, Usabilidad y Testing Visual (NotebookLM `2af9d77c-2cee-4fcd-b7d9-fce0972c7a92`).**<br/>• Responsable del diseño, flujo intuitivo, pruebas de usabilidad y corrección continua de errores UI/UX. |
| **`agente_cotizaciones_wasap`** | [.agents/agents/agente_cotizaciones_wasap/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_cotizaciones_wasap/agent.md) | **Especialista en Cotizaciones por WhatsApp.**<br/>• Captura 16 campos Zod (RUT Módulo 11 Chile, Comuna, Neto CLP + 19% IVA, Folio `CE-XXXXX`). |
| **`agente_google_sheets_sync`** | [.agents/agents/agente_google_sheets_sync/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_google_sheets_sync/agent.md) | **Integrador WhatsApp - Google Sheets & AppsScript.**<br/>• Sincroniza 15 columnas en *"Cotizaciones_Master"* y ejecuta triggers `onEdit` bi-direccionales. |
| **`agente_control_remoto_lg`** | [.agents/agents/agente_control_remoto_lg/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_control_remoto_lg/agent.md) | **Control Remoto Smart TV LG webOS & MCP.**<br/>• Emite notificaciones Toast flotantes en pantalla TV al aprobar/rechazar cotizaciones. |
| **`agente_diseno`** | [.agents/agents/agente_diseno/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_diseno/agent.md) | **Maquetador UI/UX Web Dashboard.**<br/>• Interfaz web HSL (`#111111`, `#0066CC`, visor PDF en pantalla dividida). |
| **`playwright_testing_agent`** | [.agents/agents/playwright_testing_agent/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/playwright_testing_agent/agent.md) | **Testing Simulado E2E.**<br/>• Verificación del ciclo de vida de cotizaciones (100% PASSED). |
| **`llm_wiki_agent`** | [.agents/agents/llm_wiki_agent/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/llm_wiki_agent/agent.md) | **Karpathy LLM Wiki Graph.**<br/>• Grafo de 30 nodos con productos, precios Neto CLP, 19% IVA y carpetas Drive. |

---

## 🔌 Servidores MCP Integrados (18 en Total)
- `mcp-ux-ui-design-expert v1.0` | `mcp-lg-webos-remote v1.0` | `mcp-master-agent-orchestrator v4.0` | `mcp-llm-wiki-indexer` | `notebooklm` | `chrome-devtools-mcp` | `StitchMCP` | `supabase-mcp-server` | `firebase-mcp-server` | `mcp-google-workspace-expert` | `audio-analyzer`.
