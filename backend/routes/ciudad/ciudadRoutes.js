const express = require("express");
const router = express.Router();
const ciudadController = require("../../controllers/ciudadController");

router.post("/", ciudadController.createCiudad);
router.get("/", ciudadController.getAllCiudades);
router.get("/:id", ciudadController.getCiudadById);
router.put("/:id", ciudadController.updateCiudad);
router.delete("/:id", ciudadController.deleteCiudad);

module.exports = router;
