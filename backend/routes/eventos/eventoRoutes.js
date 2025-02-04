const express = require("express");
const router = express.Router();
const eventosController = require("../../controllers/eventosController");
const upload = require("../../config/multerConfig.js");

// Rutas para CRUD de eventos
router.get("/", eventosController.getAllEventos); // Obtener todos los eventos
router.get("/:id", eventosController.getEventoById); // Obtener un evento por su ID
router.post("/", upload.single("imagen"), eventosController.createEvento); // Crear un nuevo evento
router.put("/:id", upload.single("imagen"), eventosController.updateEvento); // Actualizar un evento existente
router.delete("/:id", eventosController.deleteEvento); // Eliminar un evento existente

// Ruta para generar un documento Excel de usuarios asociados a un evento
router.get("/generateExcel/:id", eventosController.generateExcel);

module.exports = router;
