const mongoose = require("mongoose");

const contribuyenteSchema = new mongoose.Schema(
  {
    nit: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      default: "CIUDAD DE GUATEMALA",
    },
    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO"],
      default: "ACTIVO",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contribuyente", contribuyenteSchema);
