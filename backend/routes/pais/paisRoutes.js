const express = require("express");
const router = express.Router();
const paisController = require("../../controllers/paisController");

router.post("/", paisController.createPais);
router.get("/", paisController.getAllPaises);
router.get("/:id", paisController.getPaisById);
router.put("/:id", paisController.updatePais);
router.delete("/:id", paisController.deletePais);

module.exports = router;
