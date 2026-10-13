const express = require("express");
const router = express.Router();
const contribuyenteController = require("../controllers/contribuyenteController");

router.get("/:nit", contribuyenteController.consultarNit);
router.post("/", contribuyenteController.crearContribuyente);

module.exports = router;
