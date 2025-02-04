const express = require("express");
const router = express.Router();
const eventoUsuarioController = require("../../controllers/eventoUsuarioController");
const upload = require("../../config/multerConfig.js");

// Rutas para CRUD de inscripciones de eventos
router.post(
  "/",
  upload.fields([
    { name: "comprobante", maxCount: 1 }, // Field name and max number of files for comprobante
    { name: "curriculum", maxCount: 1 }, // Field name and max number of files for curriculum
    { name: "ponencia", maxCount: 1 }, // Field name and max number of files for ponencia
    { name: "carnet", maxCount: 1 }, // Field name and max number of files for ponencia
  ]),
  eventoUsuarioController.inscribirUsuarioEvento
); // Inscribir a un usuario en un evento
router.delete("/:id", eventoUsuarioController.cancelarInscripcion); // Desinscribir a un usuario de un evento
router.get(
  "/:id_usuario/:codigo_evento",
  eventoUsuarioController.verificarInscripcionUsuarioEvento
); // Verificar inscripción de usuario en un evento

module.exports = router;
