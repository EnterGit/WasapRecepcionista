# AGENT.md: Main Steering Document v6.0 (Master Orchestrator Final)
## Proyecto: Gestion_Cotizacion (Fase 2 & Fase 3 - All Solutions SpA | RUT 77.654.321-K)
### Estado de Despliegue: 100% Operativo y Verificado en http://localhost:3000/

---

## 🎯 Reglas Supremas de Gobierno de Código

1. **Cumplimiento Estricto de Kiro SDD:** Toda modificación está justificada en `.specs/02_objetivo_alcance.md` con sintaxis EARS.
2. **Preservación de TypeScript & Zod:** Tipado estricto (`QuoteSchema` en `agente_cotizaciones_wasap`).
3. **Persistencia Tripartita:** Toda interacción con el cliente es guardada en MySQL 8.0, sincronizada con Google Drive y replicada en la planilla Google Sheets ("Cotizaciones_Master").
4. **Respeto a las Reglas Comerciales:** IVA 19% CLP, Folio `CE-XXXXX`, Trato formal ("Usted").
5. **Control Remoto & Domótica:** Notificaciones Toast flotantes en Smart TV LG webOS vía `mcp-lg-webos-remote`.
6. **Enfoque Exclusivo en Cotizaciones:** Desactivación de módulos tributarios externos para maximizar el rendimiento comercial de propuestas.

---

## 🤖 Matriz Completa de Subagentes Especializados Registrados (6 en Total)

| Nombre del Subagente | Archivo de Definición | Rol y Funciones Especializadas |
| :--- | :--- | :--- |
| **`agente_cotizaciones_wasap`** | [.agents/agents/agente_cotizaciones_wasap/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_cotizaciones_wasap/agent.md) | **Especialista en Cotizaciones por WhatsApp.**<br/>• Captura 16 campos Zod (RUT Módulo 11 Chile, Comuna, Neto CLP + 19% IVA, Folio `CE-XXXXX`). |
| **`agente_google_sheets_sync`** | [.agents/agents/agente_google_sheets_sync/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_google_sheets_sync/agent.md) | **Integrador WhatsApp - Google Sheets & AppsScript.**<br/>• Sincroniza 15 columnas en *"Cotizaciones_Master"* y ejecuta triggers `onEdit` bi-direccionales. |
| **`agente_control_remoto_lg`** | [.agents/agents/agente_control_remoto_lg/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_control_remoto_lg/agent.md) | **Control Remoto Smart TV LG webOS & MCP.**<br/>• Inspirado en `heroslender/lg-remote`. Emite notificaciones Toast flotantes en pantalla TV al aprobar/rechazar cotizaciones. |
| **`agente_diseno`** | [.agents/agents/agente_diseno/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_diseno/agent.md) | **Diseño UI/UX y Web Dashboard.**<br/>• Regido por 5 Libretas NotebookLM para maquetar la interfaz web HSL (`#111111`, `#0066CC`, visor PDF en pantalla dividida). |
| **`playwright_testing_agent`** | [.agents/agents/playwright_testing_agent/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/playwright_testing_agent/agent.md) | **Testing Simulado E2E.**<br/>• Verificación del ciclo de vida de cotizaciones y endpoints REST API (100% PASSED). |
| **`llm_wiki_agent`** | [.agents/agents/llm_wiki_agent/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/llm_wiki_agent/agent.md) | **Karpathy LLM Wiki Graph.**<br/>• Grafo de 30 nodos con productos, precios Neto CLP, 19% IVA y carpetas Drive. |

---

## 🔌 Servidores MCP Integrados (17 en Total)
- `mcp-lg-webos-remote v1.0` | `mcp-master-agent-orchestrator v4.0` | `mcp-llm-wiki-indexer` | `notebooklm` | `chrome-devtools-mcp` | `StitchMCP` | `supabase-mcp-server` | `firebase-mcp-server` | `mcp-google-workspace-expert` | `audio-analyzer`.
