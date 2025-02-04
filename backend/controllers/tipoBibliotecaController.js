const { TipoBiblioteca } = require('../models');

const tipoBibliotecaController = {
    // Obtener todos los tipos de biblioteca
    getAllTipoBibliotecas: async (req, res) => {
        try {
            const tipoBibliotecas = await TipoBiblioteca.findAll();
            res.status(200).json(tipoBibliotecas);
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener los tipos de biblioteca",
                error: error.message,
            });
        }
    },

    // Crear un nuevo tipo de biblioteca
    createTipoBiblioteca: async (req, res) => {
        try {
            const { nombre } = req.body;
            const nuevoTipoBiblioteca = await TipoBiblioteca.create({ nombre });
            res.status(201).json(nuevoTipoBiblioteca);
        } catch (error) {
            res.status(500).json({
                message: "Error al crear el tipo de biblioteca",
                error: error.message,
            });
        }
    },

    // Obtener un tipo de biblioteca por su ID
    getTipoBibliotecaById: async (req, res) => {
        const { id } = req.params;
        try {
            const tipoBiblioteca = await TipoBiblioteca.findByPk(id);
            if (tipoBiblioteca) {
                res.json(tipoBiblioteca);
            } else {
                res.status(404).json({ message: "Tipo de biblioteca no encontrado" });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el tipo de biblioteca",
                error: error.message,
            });
        }
    },

    // Actualizar un tipo de biblioteca por su ID
    updateTipoBiblioteca: async (req, res) => {
        const { id } = req.params;
        try {
            const tipoBiblioteca = await TipoBiblioteca.findByPk(id);
            if (tipoBiblioteca) {
                await tipoBiblioteca.update(req.body);
                res.json(tipoBiblioteca);
            } else {
                res.status(404).json({ message: "Tipo de biblioteca no encontrado" });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error al actualizar el tipo de biblioteca",
                error: error.message,
            });
        }
    },

    // Eliminar un tipo de biblioteca por su ID
    deleteTipoBiblioteca: async (req, res) => {
        const { id } = req.params;
        try {
            const tipoBiblioteca = await TipoBiblioteca.findByPk(id);
            if (tipoBiblioteca) {
                await tipoBiblioteca.destroy();
                res.json({ message: "Tipo de biblioteca eliminado exitosamente" });
            } else {
                res.status(404).json({ message: "Tipo de biblioteca no encontrado" });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error al eliminar el tipo de biblioteca",
                error: error.message,
            });
        }
    },
};

module.exports = tipoBibliotecaController;
