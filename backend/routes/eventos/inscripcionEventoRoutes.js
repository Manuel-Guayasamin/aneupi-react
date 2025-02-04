const express = require("express");
const router = express.Router();
const inscripcionEventoController = require("../../controllers/inscripcionEventoController");
const multer = require("multer");

// Configuración de Multer para manejar FormData
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Puedes definir la carpeta donde se guardarán los archivos, si es necesario
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Puedes definir cómo se nombran los archivos subidos, si es necesario
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/inscribir-ponente",
  upload.fields([
    { name: "curriculum", maxCount: 1 },
    { name: "comprobante", maxCount: 1 },
  ]),
  inscripcionEventoController.inscribirPonente
);
router.post(
  "/",
  upload.fields([
    { name: "certificado", maxCount: 1 },
    { name: "comprobante", maxCount: 1 },
  ]),
  inscripcionEventoController.inscribirUsuarioAEvento
);
router.get("/:postId", inscripcionEventoController.getAllInscripciones);
// Ruta para inscribir a un usuario en un evento
router.get("/ponentes/:postId", inscripcionEventoController.getAllPonentes);
// Añadir la ruta para eliminar inscripciones
router.delete(
  "/:id_inscripcion",
  inscripcionEventoController.eliminarInscripcion
);
//Ruta para eliminar ponentes
router.delete(
  "/ponentes/:id_ponente",
  inscripcionEventoController.eliminarPonente
);

router.post(
  "/ponentes/:id_ponente",
  inscripcionEventoController.aprobarPonente
);
router.post(
  "/ponentes/:id_ponente",
  inscripcionEventoController.desaprobarPonente
);

module.exports = router;
