const express = require("express");
const router = express.Router();
const asistenteController = require("../../controllers/asistenteController");

router.get("/", asistenteController.getAllAsistentes);
router.post("/", asistenteController.createAsistente);
router.put("/:id", asistenteController.updateAsistente);
router.delete("/:id", asistenteController.deleteAsistente);

module.exports = router;
