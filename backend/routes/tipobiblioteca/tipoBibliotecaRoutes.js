const express = require('express');
const router = express.Router();
const tipoBibliotecaController = require('../../controllers/tipoBibliotecaController');

// Rutas CRUD para tipos de biblioteca
router.post('/', tipoBibliotecaController.createTipoBiblioteca);
router.get('/', tipoBibliotecaController.getAllTipoBibliotecas);
router.get('/:id', tipoBibliotecaController.getTipoBibliotecaById);
router.put('/:id', tipoBibliotecaController.updateTipoBiblioteca);
router.delete('/:id', tipoBibliotecaController.deleteTipoBiblioteca);

module.exports = router;
