const express = require("express");
const router = express.Router();
const { Tipopractica } = require("../../models"); // Importa el modelo de Modalidad

// Ruta para obtener todas las modalidades
router.get("/", async (req, res) => {
  try {
    const tipopracticas = await Tipopractica.findAll(); // Obtén todas las modalidades de la base de datos
    res.json(tipopracticas); // Envía las modalidades como respuesta
  } catch (error) {
    console.error("Error al obtener las modalidades:", error);
    res.status(500).json({ message: "Error interno del servidor" }); // Envía un error 500 en caso de error
  }
});

module.exports = router;
