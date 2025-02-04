// routes/contactoRoutes.js

const express = require('express');
const router = express.Router();
const contactosController = require('../../controllers/contactosController');

// Ruta para crear un nuevo contacto
router.post('/', contactosController.crearContacto);

// Ruta para obtener todos los contactos
router.get('/', contactosController.obtenerContactos);

// Ruta para obtener un contacto por su ID
router.get('/:id', contactosController.obtenerContactoPorId);

// Ruta para actualizar un contacto por su ID
router.put('/:id', contactosController.actualizarContacto);

// Ruta para eliminar un contacto por su ID
router.delete('/:id', contactosController.eliminarContacto);

module.exports = router;
