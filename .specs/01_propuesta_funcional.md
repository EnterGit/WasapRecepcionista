# OpenSpec 01: Propuesta Funcional & Historias de Usuario
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA)

---

## 🎯 1. Visión del Producto
Transformar el bot recepcionista de WhatsApp en una **Plataforma Comercial Inteligente de Gestión de Cotizaciones**, respaldada por una base de datos MySQL relacional, integración con la infraestructura de Google Drive y métricas analíticas KPI en tiempo real para optimizar la toma de decisiones comerciales.

---

## 👥 2. Historias de Usuario (User Journeys)

### 2.1 Cliente WhatsApp
- **Como** cliente corporativo o residencial de All Solutions SpA,
- **Quiero** solicitar cotizaciones formales por WhatsApp, recibir seguimiento sobre el estado de mi solicitud (`GENERADA`, `ENVIADA`, `ACEPTADA`, `RECHAZADA`) y obtener respuestas técnicas respaldadas por RAG,
- **Para** tomar decisiones de compra rápidas e informadas.

### 2.2 Vendedor / Ejecutivo Comercial
- **Como** vendedor de All Solutions SpA,
- **Quiero** revisar borradores en PDF en Google Drive (`02_Cotizaciones_Pendientes`), cambiar el estado de las cotizaciones a `ACEPTADA` o `RECHAZADA` (registrando el motivo específico de rechazo) y consultar el historial completo de conversaciones del cliente,
- **Para** maximizar la tasa de conversión y cerrar ventas eficientemente.

### 2.3 Gerente Comercial / Administrador
- **Como** gerente comercial,
- **Quiero** acceder a un panel de indicadores KPI que muestre:
  - 🏆 El producto **más pedido / cotizado** y el **menos pedido**.
  - 👑 El **mejor cliente** ordenado por facturación acumulada (CLP).
  - 📈 La **tasa de conversión (%)** y los **principales motivos de rechazo**.
- **Para** tomar decisiones estratégicas de inventario, precios y campañas de ventas.
