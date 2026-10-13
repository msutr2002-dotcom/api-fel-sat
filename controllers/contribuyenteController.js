const Contribuyente = require("../models/Contribuyente");

// GET /api/sat/contribuyentes/:nit
exports.consultarNit = async (req, res) => {
  try {
    const nitParam = req.params.nit.trim().toUpperCase();

    // Manejo especial para Consumidor Final
    if (nitParam === "CF" || nitParam === "C/F") {
      return res.status(200).json({
        status: "success",
        data: {
          nit: "CF",
          nombre: "CONSUMIDOR FINAL",
          direccion: "CIUDAD",
          estado: "ACTIVO",
        },
      });
    }

    // Búsqueda en MongoDB Atlas
    const contribuyente = await Contribuyente.findOne({ nit: nitParam });

    if (!contribuyente) {
      return res.status(404).json({
        status: "fail",
        message:
          "El NIT ingresado no se encuentra registrado en el Padrón de la SAT.",
      });
    }

    res.status(200).json({
      status: "success",
      data: contribuyente,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al consultar el NIT en la base de datos de la SAT.",
    });
  }
};

// POST /api/sat/contribuyentes (Para registrar nuevos usuarios en el Padrón)
exports.crearContribuyente = async (req, res) => {
  try {
    const { nit, nombre, direccion } = req.body;

    const nuevoContribuyente = await Contribuyente.create({
      nit: nit.trim().toUpperCase(),
      nombre,
      direccion,
    });

    res.status(201).json({
      status: "success",
      message: "Contribuyente registrado exitosamente en el Padrón SAT",
      data: nuevoContribuyente,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "El NIT ya existe en el registro.",
      });
    }
    res.status(500).json({ status: "error", message: error.message });
  }
};
