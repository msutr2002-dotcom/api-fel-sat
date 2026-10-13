const Factura = require("../models/Factura");
const crypto = require("crypto");

// @desc    Certificar / Crear nueva Factura FEL (POST)
// @route   POST /api/fel/facturas
exports.certificarFactura = async (req, res) => {
  try {
    const { emisor, receptor, items } = req.body;

    // Validación básica de ítems
    if (!items || items.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Debe incluir al menos un ítem en la factura.",
      });
    }

    // Cálculo automático de Subtotal, IVA (12%) y Total
    let subtotal = 0;
    const itemsCalculados = items.map((item) => {
      const montoItem = item.cantidad * item.precioUnitario;
      subtotal += montoItem;
      return { ...item, monto: montoItem };
    });

    const montoIVA = Number((subtotal * 0.12).toFixed(2));
    const totalGeneral = Number((subtotal + montoIVA).toFixed(2));

    // Generar datos de certificación simulados
    const uuidSimulado = crypto.randomUUID().toUpperCase();
    const numeroDTESimulado = Math.floor(100000 + Math.random() * 900000);

    const nuevaFactura = new Factura({
      uuid: uuidSimulado,
      serie: "SAT-FEL-" + Math.floor(100 + Math.random() * 900),
      numeroDTE: numeroDTESimulado,
      emisor,
      receptor,
      items: itemsCalculados,
      totales: {
        subtotal: Number(subtotal.toFixed(2)),
        montoIVA,
        totalGeneral,
      },
    });

    await nuevaFactura.save();

    res.status(201).json({
      status: "success",
      message:
        "Documento Tributario Electrónico (DTE) Certificado Exitosamente por SAT",
      data: nuevaFactura,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Error al procesar la certificación DTE",
      error: error.message,
    });
  }
};

// @desc    Obtener todas las Facturas (GET)
// @route   GET /api/fel/facturas
exports.obtenerFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      count: facturas.length,
      data: facturas,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// @desc    Obtener Factura por UUID (GET /:uuid)
// @route   GET /api/fel/facturas/:uuid
exports.obtenerFacturaPorUUID = async (req, res) => {
  try {
    const factura = await Factura.findOne({
      uuid: req.params.uuid.toUpperCase(),
    });

    if (!factura) {
      return res.status(404).json({
        status: "fail",
        message: "No existe ningún DTE registrado con el UUID proporcionado.",
      });
    }

    res.status(200).json({
      status: "success",
      data: factura,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// @desc    Anular Factura / Cambiar Estado (PUT /:uuid)
// @route   PUT /api/fel/facturas/:uuid
exports.anularFactura = async (req, res) => {
  try {
    const { uuid } = req.params;
    const factura = await Factura.findOne({ uuid: uuid.toUpperCase() });

    if (!factura) {
      return res.status(404).json({
        status: "fail",
        message: "No se encontró el DTE para anulación.",
      });
    }

    if (factura.estado === "ANULADO") {
      return res.status(400).json({
        status: "fail",
        message: "El DTE ya se encuentra en estado ANULADO.",
      });
    }

    factura.estado = "ANULADO";
    await factura.save();

    res.status(200).json({
      status: "success",
      message: "DTE Anulado Exitosamente ante el registro de la SAT",
      data: factura,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// @desc    Eliminar Registro de DTE (DELETE /:uuid)
// @route   DELETE /api/fel/facturas/:uuid
exports.eliminarFactura = async (req, res) => {
  try {
    const factura = await Factura.findOneAndDelete({
      uuid: req.params.uuid.toUpperCase(),
    });

    if (!factura) {
      return res.status(404).json({
        status: "fail",
        message: "DTE no encontrado para eliminación.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Registro DTE eliminado del servidor exitosamente",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
