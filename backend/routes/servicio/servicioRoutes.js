const express = require("express");
const router = express.Router();
const servicioController = require("../../controllers/servicioController");

// Rutas CRUD para servicios
router.post("/", servicioController.createServicio);
router.get("/", servicioController.getAllServicios);
router.get("/:id", servicioController.getServicioById);
router.put("/:id", servicioController.updateServicio);
router.delete("/:id", servicioController.deleteServicio);

// Ruta para generar el Excel de servicios en usuarios y servicios en linea
router.get("/generateExcel/:id", servicioController.generateServiciosExcel);
module.exports = router;
