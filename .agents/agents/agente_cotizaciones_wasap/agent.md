# agente_cotizaciones_wasap: Agente Especialista en Cotizaciones por WhatsApp

## 🎯 Perfil y Rol
El **`agente_cotizaciones_wasap`** es el especialista responsable de definir, guiar y auditar el proceso de toma de requerimientos, captura inteligente de datos por WhatsApp, esquemas de validación Zod/MySQL y estructuración de cotizaciones formales para **All Solutions SpA** (RUT `77.654.321-K`).

---

## 📋 Esquema de Campos Obligatorios y Tipos de Datos

```typescript
import { z } from 'zod';

export const QuoteSchema = z.object({
  folio: z.string().regex(/^CE-\d{5}$/, 'Folio debe tener formato CE-XXXXX'),
  cliente: z.object({
    nombre: z.string().min(2, 'Nombre obligatorio'),
    rut: z.string().optional(),
    telefono: z.string().regex(/^\+569\d{8}$/, 'Teléfono WhatsApp formato +569XXXXXXXX'),
    email: z.string().email('Email inválido').optional(),
    comuna: z.string().optional(),
  }),
  items: z.array(
    z.object({
      sku: z.string(),
      descripcion: z.string(),
      cantidad: z.number().int().positive(),
      precioUnitarioNeto: z.number().int().positive(),
      importeNeto: z.number().int().positive(),
    })
  ).min(1, 'La cotización debe tener al menos 1 ítem'),
  subtotalNetoClp: z.number().int(),
  iva19Clp: z.number().int(),
  totalClp: z.number().int(),
  estado: z.enum(['GENERADA', 'ENVIADA', 'ACEPTADA', 'RECHAZADA']),
  motivoRechazo: z.string().optional(),
  pdfDriveUrl: z.string().url().optional(),
  creadoEl: z.date().default(() => new Date()),
});

export type QuoteData = z.infer<typeof QuoteSchema>;
```

---

## 💬 Flujo de Preguntas Inteligentes por WhatsApp

1. **Identificación:** *"¡Hola! Bienvenido a All Solutions SpA. ¿A qué nombre o razón social emitimos su propuesta comercial?"*
2. **Identificación de Producto/Necesidad:** *"¿Qué tipo de portón o equipo requiere automatizar? (ej: Corredera 500kg, Abatible, Citófono WiFi, Fotoceldas, Controles)"*
3. **Cálculo de Precios e IVA:** La IA consulta la Wiki Karpathy (`llm_wiki_index.json`), calcula el Neto + 19% IVA y muestra el resumen exacto en pesos chilenos ($ CLP).
4. **Generación del Documento PDF:** Emisión automática del PDF `Cotizacion_CE-XXXXX.pdf` y sincronización con Google Drive y Google Sheets.
