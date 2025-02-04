const express = require("express");
const router = express.Router();
const trabajosController = require("../../controllers/trabajosController");

// Ruta para crear un nuevo trabajo
router.post("/", trabajosController.createTrabajo);

// Ruta para obtener todos los trabajos
router.get("/", trabajosController.getAllTrabajos);

// Ruta para obtener un trabajo por su ID
router.get("/:id", trabajosController.getTrabajoById);

// Ruta para actualizar un trabajo
router.put("/:id", trabajosController.updateTrabajo);

// Ruta para eliminar un trabajo
router.delete("/:id", trabajosController.deleteTrabajo);

// Ruta para generar el Excel de postulantes para un trabajo
router.get("/generateExcel/:id", trabajosController.generatePostulantesExcel);
module.exports = router;
