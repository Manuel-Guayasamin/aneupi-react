const express = require("express");
const router = express.Router();
const { TipoConvenio } = require("../../models"); // Importa el modelo de TipoConvenios

// Ruta para obtener todos los tipos de convenios
router.get("/", async (req, res) => {
  try {
    const tiposConvenios = await TipoConvenio.findAll(); // Obtén todos los tipos de convenios de la base de datos
    res.json(tiposConvenios); // Envía los tipos de convenios como respuesta
  } catch (error) {
    console.error("Error al obtener los tipos de convenios:", error);
    res.status(500).json({ message: "Error interno del servidor" }); // Envía un error 500 en caso de error
  }
});

module.exports = router;
