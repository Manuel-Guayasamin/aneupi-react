const { TipoConvenio } = require("../models");

const tipoConvenioController = {
  // Obtener todos los TipoConvenios
  getAllTipoConvenios: async (req, res) => {
    try {
      const tipoConvenios = await TipoConvenio.findAll();
      res.status(200).json(tipoConvenios);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los tipos de convenio",
        error: error.message,
      });
    }
  },

  // Crear un nuevo TipoConvenio
  createTipoConvenio: async (req, res) => {
    try {
      const { nombre } = req.body;
      const nuevoTipoConvenio = await TipoConvenio.create({ nombre });
      res.status(201).json(nuevoTipoConvenio);
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el tipo de convenio",
        error: error.message,
      });
    }
  },

  // Obtener un TipoConvenio por su ID
  getTipoConvenioById: async (req, res) => {
    const { id } = req.params;
    try {
      const tipoConvenio = await TipoConvenio.findByPk(id);
      if (tipoConvenio) {
        res.json(tipoConvenio);
      } else {
        res.status(404).json({ message: "Tipo de convenio no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el tipo de convenio",
        error: error.message,
      });
    }
  },

  // Actualizar un TipoConvenio por su ID
  updateTipoConvenio: async (req, res) => {
    const { id } = req.params;
    try {
      const tipoConvenio = await TipoConvenio.findByPk(id);
      if (tipoConvenio) {
        await tipoConvenio.update(req.body);
        res.json(tipoConvenio);
      } else {
        res.status(404).json({ message: "Tipo de convenio no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el tipo de convenio",
        error: error.message,
      });
    }
  },

  // Eliminar un TipoConvenio por su ID
  deleteTipoConvenio: async (req, res) => {
    const { id } = req.params;
    try {
      const tipoConvenio = await TipoConvenio.findByPk(id);
      if (tipoConvenio) {
        await tipoConvenio.destroy();
        res.json({ message: "Tipo de convenio eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "Tipo de convenio no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el tipo de convenio",
        error: error.message,
      });
    }
  },
};

module.exports = tipoConvenioController;
