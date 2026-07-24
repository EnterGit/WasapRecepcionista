# AGENT.md: Main Steering Document v2.0 (Master Orchestrator)
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA | RUT 77.654.321-K)

---

## 🎯 Reglas Supremas de Gobierno de Código

1. **Cumplimiento Estricto de Kiro SDD:** Toda modificación debe estar justificada en `.specs/02_objetivo_alcance.md` con sintaxis EARS.
2. **Preservación de TypeScript & Zod:** Todo tipo debe ser fuertemente tipado. Usar Zod para validación de entornos en `src/config/env.ts`.
3. **Persistencia MySQL Relacional:** Toda interacción con el cliente debe ser guardada en la base de datos MySQL `gestion_cotizaciones_db`.
4. **Respeto a las Reglas Comerciales:** IVA 19% CLP, Folio `CE-XXXXX`, Trato formal ("Usted").
5. **Estética y Sistema Visual:** Toda interfaz visual debe cumplir con los lineamientos de `agente_diseno` (Obsidian Black `#111111`, Electric Accent `#0066CC`, Glassmorphism y tipografía `Lato` / `Inter`).

---

## 🤖 Matriz de Subagentes Especializados Registrados

| Nombre del Subagente | Archivo de Definición | Rol y Funciones Especializadas |
| :--- | :--- | :--- |
| **`agente_diseno`** | [.agents/agents/agente_diseno/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/agente_diseno/agent.md) | **Agente Especialista en Diseño UI/UX y Sistema Visual.**<br/>• Vinculado a las 5 Libretas de Investigación de NotebookLM.<br/>• Define paletas de colores HSL/HEX, tipografías `Lato`/`Inter`, grillas Bento-Grid y componentes responsivos.<br/>• Genera renders y maquetas visuales sin usar placeholders (`generate_image`). |
| **`playwright_testing_agent`** | [.agents/agents/playwright_testing_agent/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/playwright_testing_agent/agent.md) | **Agente Especialista en Testing Simulado y E2E.**<br/>• Conectado a `@playwright/mcp` y `@executeautomation/playwright-mcp-server`.<br/>• Emulacion de 143 dispositivos móviles, inspección de árbol de accesibilidad y pruebas REST API (`/webhook`, `/api/quotes/:folio/status`, `/api/analytics/kpis`). |
| **`llm_wiki_agent`** | [.agents/agents/llm_wiki_agent/agent.md](file:///c:/AgenteWASAP/Gestion_Cotizacion/.agents/agents/llm_wiki_agent/agent.md) | **Agente Indexador de Catálogo (Karpathy Pattern).**<br/>• Conectado al servidor MCP custom `mcp-llm-wiki-indexer`.<br/>• Indiza los 20 productos reales de `allsolutions.cl` en `llm_wiki_index.json`.<br/>• Mantiene el grafo entre SKUs, precios neto CLP, IVA 19% y accesorios obligatorios. |

---

## 🔌 Servidores MCP Integrados (16 en Total)
- `mcp-master-agent-orchestrator v4.0` | `mcp-llm-wiki-indexer` | `notebooklm` | `chrome-devtools-mcp` | `StitchMCP` | `supabase-mcp-server` | `firebase-mcp-server` | `mcp-google-workspace-expert`.
