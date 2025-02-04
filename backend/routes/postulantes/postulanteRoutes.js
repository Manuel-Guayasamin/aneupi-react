const express = require("express");
const router = express.Router();
const postulantesController = require("../../controllers/postulantesController");
const upload = require("../../config/multerConfig.js");

// Ruta para crear un nuevo postulante con currículo
router.post(
  "/",
  upload.single("curriculum"),
  postulantesController.createPostulante
);

// Ruta para obtener todos los postulantes
router.get("/", postulantesController.getAllPostulantes);

// Ruta para obtener un postulante por su ID
router.get("/:id", postulantesController.getPostulanteById);

// Ruta para actualizar un postulante
router.put("/:id", postulantesController.updatePostulante);

// Ruta para eliminar un postulante
router.delete("/:id", postulantesController.deletePostulante);

module.exports = router;
