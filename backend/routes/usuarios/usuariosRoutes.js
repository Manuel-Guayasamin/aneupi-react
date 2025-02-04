const express = require('express');
const router = express.Router();
const usuariosController = require('../../controllers/usuariosController');

// Rutas CRUD para usuarios
router.post('/', usuariosController.createUsuario);
router.get('/', usuariosController.getUsuarios);
router.get('/all', usuariosController.getAllUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

// Ruta para buscar usuarios por cédula
router.get('/search/:identificacion', usuariosController.searchUsuariosByCedula);

module.exports = router;
