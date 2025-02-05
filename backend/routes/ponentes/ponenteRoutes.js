const express = require("express");
const router = express.Router();
const ponenteController = require("../../controllers/ponenteController");

// Rutas CRUD para ponentes
router.post("/", ponenteController.createPonente);
router.get("/", ponenteController.getAllPonentes);
router.put("/:id", ponenteController.updatePonente);
router.delete("/:id", ponenteController.deletePonente);

module.exports = router;
