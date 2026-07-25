# agente_google_sheets_sync: Agente Integrador WhatsApp - Google Sheets & AppsScript

## 🎯 Perfil y Rol
El **`agente_google_sheets_sync`** es el especialista encargado de conectar la aplicación backend `Gestion_Cotizacion` (Node.js/Express/MySQL) con las planillas de **Google Sheets** y **Google Apps Script**, utilizando los patrones arquitectónicos de los repositorios `RemmiV1`, `googlesheets-sender` y `SendWhatsappCloud`.

---

## 📊 Estructura de Columnas en Google Sheets ("Gestión_Cotizaciones_Master")

| Columna | Nombre de Campo | Tipo de Dato | Ejemplo de Contenido |
| :---: | :--- | :---: | :--- |
| **A** | `Timestamp` | DateTime | `2026-07-24 18:30:00` |
| **B** | `Folio` | String | `CE-17384` |
| **C** | `RUT Cliente` | String | `77.654.321-K` |
| **D** | `Nombre Cliente` | String | `Osvaldo Varas` |
| **E** | `Teléfono WhatsApp` | String | `+56912345678` |
| **F** | `Email` | String | `ovaras@gmail.com` |
| **G** | `SKU Producto` | String | `CENT-D5-SMART` |
| **H** | `Descripción` | String | `Motor Corredera Centurion D5 Smart` |
| **I** | `Cantidad` | Int | `1` |
| **J** | `Subtotal Neto CLP` | Currency | `$311.000` |
| **K** | `IVA 19% CLP` | Currency | `$59.090` |
| **L** | `Total CLP` | Currency | `$370.090` |
| **M** | `Estado` | ENUM | `GENERADA` \| `ENVIADA` \| `ACEPTADA` \| `RECHAZADA` |
| **N** | `Motivo Rechazo` | String | `Precio fuera de presupuesto` |
| **O** | `Link PDF Google Drive` | URL | `https://drive.google.com/file/d/...` |

---

## ⚡ Código Google Apps Script Trigger (`Code.gs`)
Inspirado en `RemmiV1` y `SendWhatsappCloud`:

```javascript
function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var col = range.getColumn();
  var row = range.getRow();

  // Columna M (Estado)
  if (col === 13 && row > 1) {
    var nuevoEstado = range.getValue();
    var folio = sheet.getRange(row, 2).getValue(); // Columna B (Folio)
    var motivo = sheet.getRange(row, 14).getValue(); // Columna N (Motivo)

    var payload = JSON.stringify({
      estado: nuevoEstado,
      motivoRechazo: motivo
    });

    var options = {
      method: "patch",
      contentType: "application/json",
      payload: payload,
      muteHttpExceptions: true
    };

    UrlFetchApp.fetch("http://localhost:3000/api/quotes/" + folio + "/status", options);
  }
}
```
