const express = require("express");
const router = express.Router();
const bibliotecaController = require("../../controllers/bibliotecaController.js");
const upload = require("../../config/multerConfig.js");

// Rutas CRUD para archivos de biblioteca
router.post(
  "/",
  upload.fields([
    { name: "archivo", maxCount: 1 },
    { name: "imagen", maxCount: 1 },
  ]),
  bibliotecaController.createBiblioteca
);

router.get("/articulos", bibliotecaController.getArticulos);
router.get("/revistas", bibliotecaController.getRevistas);
router.get("/libros", bibliotecaController.getLibros);

router.get("/", bibliotecaController.getAllBiblioteca);
router.get("/:id", bibliotecaController.getBibliotecaById);
router.put("/:id", bibliotecaController.updateBiblioteca);
router.delete("/:id", bibliotecaController.deleteBiblioteca);



module.exports = router;

