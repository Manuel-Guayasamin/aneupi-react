const express = require("express");
const router = express.Router();
const servicioCitaController = require("../../controllers/servicioCitaController");

router.post("/", servicioCitaController.createCita);
router.get("/", servicioCitaController.getAllCitas);
router.get("/:id", servicioCitaController.getCitaById);
router.put("/:id", servicioCitaController.updateCita);
router.delete("/:id", servicioCitaController.deleteCita);

module.exports = router;
