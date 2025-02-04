const express = require("express");
const router = express.Router();
const ponenteController = require("../../controllers/ponenteController");

// Rutas CRUD para ponentes
router.post("/", ponenteController.createPonente);
router.get("/", ponenteController.getAllPonentes);

module.exports = router;
