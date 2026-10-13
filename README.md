# 📑 API RESTful - Simulación de Facturación Electrónica en Línea (FEL / SAT Guatemala)

API RESTful desarrollada en **Node.js**, **Express.js** y **Mongoose**, integrada con una base de datos distribuida en **MongoDB Atlas** y desplegada en **Render** bajo protocolo seguro (HTTPS).

Esta solución simula los procesos de certificación, consulta, anulación y eliminación de **Documentos Tributarios Electrónicos (DTE)** ajustados a los estándares de la **Superintendencia de Administración Tributaria (SAT)** de Guatemala, realizando cálculos automáticos de subtotal, 12% de IVA e importe total general.

---

## 🛠️ Tecnologías e Infraestructura

- **Runtime Backend:** Node.js (v24)
- **Framework Web:** Express.js
- **Base de Datos NoSQL:** MongoDB Atlas (Cloud Cluster)
- **Object Data Modeling (ODM):** Mongoose
- **Hosting / Servidor en la Nube:** Render Web Services (HTTPS)
- **Arquitectura:** MVC (Model, Controller, Routes)

---

## 📋 Tabla de Rutas y Métodos HTTP (CRUD)

| Método     | Endpoint                  | Descripción RESTful                                          | Parámetros            | Código HTTP Éxito |
| :--------- | :------------------------ | :----------------------------------------------------------- | :-------------------- | :---------------- |
| **POST**   | `/api/fel/facturas`       | Certifica una nueva factura (calcula IVA 12% y asigna UUID)  | Ninguno (Cuerpo JSON) | `201 Created`     |
| **GET**    | `/api/fel/facturas`       | Obtiene el catálogo completo de DTEs certificados            | Ninguno               | `200 OK`          |
| **GET**    | `/api/fel/facturas/:uuid` | Consulta la información detallada de una factura por su UUID | `:uuid` (URL Param)   | `200 OK`          |
| **PUT**    | `/api/fel/facturas/:uuid` | Anula una factura registrada en el sistema de la SAT         | `:uuid` (URL Param)   | `200 OK`          |
| **DELETE** | `/api/fel/facturas/:uuid` | Elimina la factura del registro persistente                  | `:uuid` (URL Param)   | `200 OK`          |

---

## 📖 Contratos de Datos y Ejemplos de Petición / Respuesta

### 1. Certificación de DTE / Crear Factura (`POST`)

- **Endpoint:** `POST /api/fel/facturas`
- **Headers:** `Content-Type: application/json`
- **Cuerpo Enviado (Body JSON):**

```json
{
  "emisor": {
    "nit": "87654321-9",
    "nombreComercial": "Distribuidora El Sol S.A."
  },
  "receptor": {
    "nit": "12345678-0",
    "nombre": "Carlos Mendoza"
  },
  "items": [
    {
      "descripcion": "Laptop Dell Inspiron",
      "cantidad": 2,
      "precioUnitario": 4500.0
    },
    {
      "descripcion": "Mouse Inalámbrico",
      "cantidad": 1,
      "precioUnitario": 150.0
    }
  ]
}
```
# api-fel-sat
