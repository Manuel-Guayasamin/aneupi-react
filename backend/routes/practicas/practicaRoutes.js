const express = require("express");
const router = express.Router();
const practicasController = require("../../controllers/practicasController");

// Rutas CRUD para prácticas
router.post("/", practicasController.createPractica);
router.get("/", practicasController.getAllPracticas);
router.get("/:id", practicasController.getPracticaById);
router.put("/:id", practicasController.updatePractica);
router.delete("/:id", practicasController.deletePractica);

// Ruta para generar el Excel de postulantes para una practica
router.get("/generateExcel/:id", practicasController.generatePostulantesExcel);

module.exports = router;
