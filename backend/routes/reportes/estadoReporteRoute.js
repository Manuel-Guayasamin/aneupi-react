const express = require("express");
const router = express.Router();
const estadoReporteController = require("../../controllers/estadoReporteController.js");

router.get("/", estadoReporteController.getAllEstadoReportes);

module.exports = router;
