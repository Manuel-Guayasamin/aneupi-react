const express = require('express');
const router = express.Router();
const { Estado } = require('../../models'); // Importa el modelo de Estado

// Ruta para obtener todos los estados
router.get('/', async (req, res) => {
  try {
    const estados = await Estado.findAll(); // Obtén todos los estados de la base de datos
    res.json(estados); // Envía los estados como respuesta
  } catch (error) {
    console.error('Error al obtener los estados:', error);
    res.status(500).json({ message: 'Error interno del servidor' }); // Envía un error 500 en caso de error
  }
});

module.exports = router;
