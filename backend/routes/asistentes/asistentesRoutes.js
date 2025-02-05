const express = require("express");
const router = express.Router();
const ciudadController = require("../../controllers/asistenteController");

router.get("/", ciudadController.getAllAsistentes);
router.post("/", ciudadController.createAsistente);

module.exports = router;
