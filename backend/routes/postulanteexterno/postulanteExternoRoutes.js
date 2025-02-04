const express = require('express');
const router = express.Router();
const postulanteExternoController = require('../../controllers/postulanteExternoController');

// Ruta para crear un nuevo postulante externo
router.post('/', postulanteExternoController.createPostulanteExterno);

// Ruta para obtener todos los postulantes externos
router.get('/', postulanteExternoController.getAllPostulantesExternos);

// Ruta para obtener un postulante externo por su ID
router.get('/:id', postulanteExternoController.getPostulanteExternoById);

// Ruta para actualizar un postulante externo
router.put('/:id', postulanteExternoController.updatePostulanteExterno);

// Ruta para eliminar un postulante externo
router.delete('/:id', postulanteExternoController.deletePostulanteExterno);

module.exports = router;
