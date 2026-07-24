# OpenSpec 01: Propuesta Funcional & Historias de Usuario (v2.0)
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA)

---

## 🎯 1. Visión del Producto
Transformar el bot recepcionista de WhatsApp en una **Plataforma Web Comercial Integral de Gestión de Cotizaciones**, compuesta por un backend Express TypeScript en MySQL, integración con la infraestructura de Google Drive y una **Página Web Dashboard (Vite + React TS + Recharts + Visor PDF)** para controlar las ventas, clientes y métricas analíticas KPI en tiempo real.

---

## 👥 2. Historias de Usuario (User Journeys)

### 2.1 Cliente WhatsApp
- **Como** cliente corporativo o residencial de All Solutions SpA,
- **Quiero** solicitar cotizaciones formales por WhatsApp, recibir seguimiento sobre el estado de mi solicitud (`GENERADA`, `ENVIADA`, `ACEPTADA`, `RECHAZADA`) y obtener respuestas técnicas respaldadas por RAG,
- **Para** tomar decisiones de compra rápidas e informadas.

### 2.2 Vendedor / Ejecutivo Comercial (Dashboard Web)
- **Como** vendedor de All Solutions SpA,
- **Quiero** ingresar a la Página Web del Dashboard, filtrar cotizaciones por estado, abrir el visor PDF en pantalla dividida y presionar los botones `[APROBAR]` o `[RECHAZAR]` (registrando el motivo específico),
- **Para** gestionar las cotizaciones sin salir del navegador y acelerar el cierre de ventas.

### 2.3 Gerente Comercial / Administrador (Bento-Grid KPIs)
- **Como** gerente comercial,
- **Quiero** acceder a la pestaña de Analytics KPI en la Web Dashboard para visualizar gráficos interactivos:
  - 🏆 El producto **más pedido / cotizado** y el **menos pedido**.
  - 👑 El **mejor cliente** ordenado por facturación acumulada (CLP).
  - 📈 La **tasa de conversión (%)** y los **principales motivos de rechazo**.
- **Para** tomar decisiones estratégicas de inventario, precios y campañas comerciales.
