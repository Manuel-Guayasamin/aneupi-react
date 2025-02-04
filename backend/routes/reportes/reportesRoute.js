const express = require("express");
const router = express.Router();
const reportesController = require("../../controllers/reportesController.js");
const upload = require("../../config/multerConfig.js");

router.post("/", reportesController.createNewReport);
router.put("/:id", reportesController.updateReport);
router.get("/", reportesController.getAllReportes);
router.delete("/:id", reportesController.deleteReport);

module.exports = router;
