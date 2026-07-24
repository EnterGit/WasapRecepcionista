# OpenSpec 03: Diseño Técnico, Modelo ERD MySQL & Arquitectura de Componentes
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA)

---

## 🏗️ 1. Estructura de Carpetas del Proyecto (`Gestion_Cotizacion/`)

```text
Gestion_Cotizacion/
├── .antigravity/
│   └── mcp.json                      # Configuración de 16 Servidores MCP
├── .loop/
│   └── STATE.md                      # Marco DAME v3.0 & Loop Memory Spine
├── .specs/
│   ├── 01_propuesta_funcional.md
│   ├── 02_objetivo_alcance.md
│   ├── 03_diseno_tecnico.md
│   └── 04_plan_tareas.md
├── docs/
│   └── knowledge/
│       ├── context_summary.md        # Resumen continuo de contexto
│       └── llm_wiki_index.json       # Grafo de conocimiento Karpathy
├── data/                             # PDFs generados físicamente
├── src/
│   ├── config/
│   │   └── env.ts                    # Validador Zod de variables .env
│   ├── database/
│   │   ├── db.ts                     # Conector Pool MySQL (mysql2/promise)
│   │   └── schema.sql                # Definición DDL de la Base de Datos
│   ├── repositories/
│   │   ├── customerRepository.ts     # Repositorio MySQL de Clientes
│   │   ├── quoteRepository.ts        # Repositorio MySQL de Cotizaciones
│   │   └── conversationRepository.ts # Repositorio MySQL de Mensajes/RAG
│   ├── services/
│   │   ├── pricingService.ts         # Precios Neto CLP + 19% IVA
│   │   ├── quoteService.ts           # Generador ReportLab PDF
│   │   ├── geminiService.ts          # Motor RAG Dual con Gemini
│   │   ├── chatwootService.ts        # Alertas CRM y bot_off
│   │   └── analyticsService.ts       # Cálculos de KPIs & Estadísticas
│   ├── controllers/
│   │   ├── webhookController.ts      # Endpoint /webhook WhatsApp
│   │   ├── quoteStatusController.ts  # Endpoint /api/quotes/:quoteNumber/status
│   │   └── analyticsController.ts    # Endpoint /api/analytics/kpis
│   ├── utils/
│   │   └── security.ts               # HMAC SHA-256 Meta Signature
│   └── server.ts                     # Servidor Express Backend
├── Dockerfile                        # Multi-stage Docker Build
├── docker-compose.yml                # MySQL 8.0 + Node Backend
├── package.json
└── tsconfig.json
```

---

## 🗄️ 2. Modelo Relacional ERD MySQL (`schema.sql`)

```sql
CREATE DATABASE IF NOT EXISTS gestion_cotizaciones_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gestion_cotizaciones_db;

-- 1. Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    telefono VARCHAR(30) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    rut VARCHAR(20) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    estado ENUM('LEAD', 'COTIZANDO', 'CLIENTE_ACTIVO', 'INACTIVO') DEFAULT 'LEAD',
    creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Tabla de Cotizaciones
CREATE TABLE IF NOT EXISTS cotizaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    folio VARCHAR(30) NOT NULL UNIQUE,
    cliente_id INT NOT NULL,
    subtotal_neto INT NOT NULL,
    iva_19 INT NOT NULL,
    total_clp INT NOT NULL,
    estado ENUM('GENERADA', 'ENVIADA', 'ACEPTADA', 'RECHAZADA') DEFAULT 'GENERADA',
    motivo_rechazo VARCHAR(255) DEFAULT NULL,
    pdf_drive_url VARCHAR(255) DEFAULT NULL,
    creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- 3. Tabla de Ítems de Cotización
CREATE TABLE IF NOT EXISTS cotizacion_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cotizacion_id INT NOT NULL,
    sku VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario_neto INT NOT NULL,
    importe_neto INT NOT NULL,
    FOREIGN KEY (cotizacion_id) REFERENCES cotizaciones(id) ON DELETE CASCADE
);

-- 4. Tabla de Conversaciones (Histórico RAG)
CREATE TABLE IF NOT EXISTS conversaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    mensaje_cliente TEXT NOT NULL,
    respuesta_ia TEXT NOT NULL,
    intent_detectado VARCHAR(50) DEFAULT 'CONSULTA_GENERAL',
    creado_el TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);
```

---

## 🌐 3. Endpoints REST API

| Método | Endpoint | Descripción | Payload / Query |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Healthcheck del Backend | `N/A` |
| `GET` | `/webhook` | Verificación de Webhook Meta | `hub.verify_token`, `hub.challenge` |
| `POST` | `/webhook` | Recepción de Mensajes WhatsApp | Webhook Payload Meta Cloud API |
| `PATCH` | `/api/quotes/:folio/status` | Cambio de estado de Cotización | `{ estado: "ACEPTADA" \| "RECHAZADA", motivo_rechazo?: string }` |
| `GET` | `/api/analytics/kpis` | Obtener JSON de Indicadores KPI | `N/A` |
