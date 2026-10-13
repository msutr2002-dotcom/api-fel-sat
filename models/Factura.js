const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: [true, "La descripción del ítem es obligatoria"],
  },
  cantidad: {
    type: Number,
    required: [true, "La cantidad es obligatoria"],
    min: [1, "La cantidad debe ser al menos 1"],
  },
  precioUnitario: {
    type: Number,
    required: [true, "El precio unitario es obligatorio"],
    min: [0, "El precio unitario no puede ser negativo"],
  },
  monto: { type: Number },
});

const FacturaSchema = new mongoose.Schema(
  {
    // Datos de Certificación FEL (Simulados)
    uuid: {
      type: String,
      unique: true,
      required: true,
    },
    serie: {
      type: String,
      required: true,
      default: "A1B2C",
    },
    numeroDTE: {
      type: Number,
      required: true,
    },
    fechaHoraCertificacion: {
      type: Date,
      default: Date.now,
    },
    estado: {
      type: String,
      enum: ["CERTIFICADO", "ANULADO"],
      default: "CERTIFICADO",
    },

    // Emisor y Receptor
    emisor: {
      nit: {
        type: String,
        required: [true, "El NIT del emisor es obligatorio"],
      },
      nombreComercial: {
        type: String,
        required: [true, "El nombre del emisor es obligatorio"],
      },
    },
    receptor: {
      nit: {
        type: String,
        required: [true, "El NIT o CF del receptor es obligatorio"],
        default: "CF",
      },
      nombre: {
        type: String,
        required: [true, "El nombre del receptor es obligatorio"],
        default: "CONSUMIDOR FINAL",
      },
    },

    // Detalle e Impuestos (SAT 12% IVA)
    items: [ItemSchema],
    totales: {
      subtotal: { type: Number, required: true },
      montoIVA: { type: Number, required: true },
      totalGeneral: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Factura", FacturaSchema);
