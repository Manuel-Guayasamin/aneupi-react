const express = require("express");
const router = express.Router();
const convenioController = require("../../controllers/convenioController");
const upload = require("../../config/multerConfig.js");
// Rutas CRUD para Convenios
router.post("/",
  upload.single("propuesta"),
  convenioController.createConvenio);
router.get("/", convenioController.getAllConvenios);
router.get("/:id", convenioController.getConvenioById);
router.put("/:id",
  upload.single("convenio_parcial"),
  convenioController.updateConvenio);
router.delete("/:id", convenioController.deleteConvenio);

module.exports = router;
