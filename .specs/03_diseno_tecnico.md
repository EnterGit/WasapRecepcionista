# OpenSpec 03: Diseño Técnico, Modelo ERD MySQL & Stack Web App Frontend (v2.0)
## Proyecto: Gestion_Cotizacion (Fase 2 - All Solutions SpA)

---

## 💻 1. Stack Tecnológico de la Página Web Dashboard (`src/web/`)

```text
Gestion_Cotizacion/
├── src/
│   ├── web/                          # Frontend Dashboard Web (Vite + React TS)
│   │   ├── components/
│   │   │   ├── QuoteListTable.tsx    # Tabla interactiva con filtros por estado
│   │   │   ├── PdfViewerPanel.tsx    # Visor PDF en vivo (Pantalla dividida)
│   │   │   ├── CustomerChatPanel.tsx # Ficha de cliente e historial WhatsApp
│   │   │   ├── KpiBentoGrid.tsx      # Tarjetas y gráficos Bento-Grid
│   │   │   └── RejectionModal.tsx    # Modal emergente para ingresar motivo de rechazo
│   │   ├── styles/
│   │   │   └── theme.css             # Tokens HSL corporativos (Obsidian Black, Electric Accent)
│   │   ├── App.tsx                   # Aplicación Principal SPA con 3 Pestañas
│   │   └── main.tsx                  # Punto de entrada Vite
```

| Capa Frontend | Tecnología Elegida | Razón de Elección |
| :--- | :--- | :--- |
| **Framework Core** | **Vite + React 18 (TypeScript)** | Carga en menos de 100 ms, renderizado ultrarrápido y desarrollo desacoplado. |
| **Diseño Visual** | **CSS Modules + `agente_diseno`** | Cumple con el sistema de tokens HSL corporativo (`#111111`, `#0066CC`, Glassmorphism). |
| **Gráficos & KPIs** | **Recharts** | Gráficos interactivos de torta (Tasa de conversión) y barras (Top productos y motivos de rechazo). |
| **Visor de PDF** | **PDF.js / Embedded Iframe** | Permite ver el documento PDF oficial `CE-XXXXX` en pantalla dividida al lado de los botones de acción. |
| **Iconografía** | **Lucide-React** | Iconos limpios, modernos y vectoriales. |

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

## 🌐 3. Endpoints REST API Backend

| Método | Endpoint | Descripción | Payload / Query |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Healthcheck del Backend | `N/A` |
| `GET` | `/webhook` | Verificación de Webhook Meta | `hub.verify_token`, `hub.challenge` |
| `POST` | `/webhook` | Recepción de Mensajes WhatsApp | Webhook Payload Meta Cloud API |
| `PATCH` | `/api/quotes/:folio/status` | Cambio de estado de Cotización | `{ estado: "ACEPTADA" \| "RECHAZADA", motivo_rechazo?: string }` |
| `GET` | `/api/analytics/kpis` | Obtener JSON de Indicadores KPI | `N/A` |
