const express = require("express");
const router = express.Router();
const serviciolineaController = require("../../controllers/serviciolineaController");

// Rutas CRUD para ServicioLinea
router.post("/", serviciolineaController.createServicioLinea);
router.get("/", serviciolineaController.getAllServicioLinea);
router.get("/:id", serviciolineaController.getServicioLineaById);
router.put("/:id", serviciolineaController.updateServicioLinea);
router.delete("/:id", serviciolineaController.deleteServicioLinea);

module.exports = router;
