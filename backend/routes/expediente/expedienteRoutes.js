const express = require("express");
const router = express.Router();
const expedienteController = require("../../controllers/expedienteController.js");
const upload = require("../../config/multerConfig.js");

// Rutas adicionales para obtener expedientes de tipo sentencia y resolución aprobados
router.get("/sentencias-aprobadas", expedienteController.getSentenciasAprobadas);
router.get("/resoluciones-aprobadas", expedienteController.getResolucionesAprobadas);

// Rutas CRUD para archivos de expediente
router.post(
    "/",
    upload.fields([
        { name: "archivo_url", maxCount: 1 },
        { name: "certificado_url", maxCount: 1 },
        { name: "comprobante_url", maxCount: 1 },
    ]),
    expedienteController.createExpediente
);

router.get("/sentenciaByPhrase", expedienteController.getExpedienteByPhrase);
router.get("/resolucionByPhrase", expedienteController.getResolucionByPhrase);

router.get("/", expedienteController.getAllExpedientes);
router.get("/:id", expedienteController.getExpedienteById);
router.put("/:id", expedienteController.updateExpediente);
router.delete("/:id", expedienteController.deleteExpediente);

router.get("/sentenciaByWord/:word", expedienteController.getExpedienteByWord);
router.get("/resolucionByWord/:word", expedienteController.getResolucionByWord);


module.exports = router;
