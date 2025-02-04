const express = require("express");
const router = express.Router();
const tipoBibliotecaContenidoController = require("../../controllers/tipoBibliotecaContenidoControllers");

// Rutas CRUD para TipoBibliotecaContenido
router.post("/", tipoBibliotecaContenidoController.createTipoBibliotecaContenido);
router.get("/", tipoBibliotecaContenidoController.getAllTipoBibliotecaContenido);
router.get("/:id", tipoBibliotecaContenidoController.getTipoBibliotecaContenidoById);
router.put("/:id", tipoBibliotecaContenidoController.updateTipoBibliotecaContenido);
router.delete("/:id", tipoBibliotecaContenidoController.deleteTipoBibliotecaContenido);

module.exports = router;
