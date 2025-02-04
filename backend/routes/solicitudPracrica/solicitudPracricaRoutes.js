const express = require("express");
const router = express.Router();
const solicitarPracticasController = require("../../controllers/solicitarPracticasController");
const upload = require("../../config/multerConfig.js");

// Ruta para crear un nuevo postulante con currículo
router.post(
  "/",
  upload.single("curriculum"),
  solicitarPracticasController.createSolicitudPractica
);

// Ruta para obtener todos los postulantes
router.get("/", solicitarPracticasController.getAllSolicitudPractica);

// Ruta para obtener un postulante por su ID
router.get("/:id", solicitarPracticasController.getSolicitudPracticaById);

// Ruta para actualizar un postulante
router.put("/:id", solicitarPracticasController.updateSolicitudPractica);

// Ruta para eliminar un postulante
router.delete("/:id", solicitarPracticasController.deleteSolicitudPractica);

module.exports = router;
