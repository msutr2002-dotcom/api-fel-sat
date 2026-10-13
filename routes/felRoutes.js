const express = require("express");
const router = express.Router();
const felController = require("../controllers/felController");

router.post("/facturas", felController.certificarFactura);
router.get("/facturas", felController.obtenerFacturas);
router.get("/facturas/:uuid", felController.obtenerFacturaPorUUID);
router.put("/facturas/:uuid", felController.anularFactura);
router.delete("/facturas/:uuid", felController.eliminarFactura);

module.exports = router;
