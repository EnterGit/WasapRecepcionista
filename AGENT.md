# AGENT.md: Main Steering Document v1.0
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA)

---

## 🎯 Reglas Supremas de Gobierno de Código

1. **Cumplimiento Estricto de Kiro SDD:** Toda modificación debe estar justificada en `.specs/02_objetivo_alcance.md` con sintaxis EARS.
2. **Preservación de TypeScript & Zod:** Todo tipo debe ser fuertemente tipado. Usar Zod para validación de entornos en `src/config/env.ts`.
3. **Persistencia MySQL Relacional:** Toda interacción con el cliente debe ser guardada en la base de datos MySQL `gestion_cotizaciones_db`.
4. **Respeto a las Reglas Comerciales:** IVA 19% CLP, Folio `CE-XXXXX`, Trato formal ("Usted").

---

## 🤖 Agentes Especializados Registrados
- `playwright_testing_agent`: Testing E2E simulado y endpoints REST.
- `llm_wiki_agent`: Grafo de conocimiento Karpathy de productos y precios.
