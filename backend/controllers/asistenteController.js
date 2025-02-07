const { Asistente } = require("../models");

const asistenteController = {
  // Crear un nuevo asistente
  createAsistente: async (req, res) => {
    try {
      const { tipo_asistente, id_usuario, nombres, cedula, edad, telefono, lugar } = req.body;

      if (!tipo_asistente || !id_usuario || !nombres || !cedula || !edad || !telefono || !lugar) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }

      const nuevoAsistente = await Asistente.create({
        tipo_asistente,
        id_usuario,
        nombres,
        cedula,
        edad,
        telefono,
        lugar,
      });

      res.status(201).json(nuevoAsistente);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el asistente", error: error.message });
    }
  },

  // Obtener todos los asistentes
  getAllAsistentes: async (req, res) => {
    try {
      const asistentes = await Asistente.findAll();
      res.json(asistentes);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los asistentes", error: error.message });
    }
  },

  // Editar un asistente
  updateAsistente: async (req, res) => {
    try {
      const { id } = req.params;
      const { tipo_asistente, id_usuario, nombres, cedula, edad, telefono, lugar } = req.body;

      const asistente = await Asistente.findByPk(id);
      if (!asistente) {
        return res.status(404).json({ message: "Asistente no encontrado" });
      }

      await asistente.update({ tipo_asistente, id_usuario, nombres, cedula, edad, telefono, lugar });
      res.json({ message: "Asistente actualizado correctamente", asistente });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el asistente", error: error.message });
    }
  },

  // Eliminar un asistente
  deleteAsistente: async (req, res) => {
    try {
      const { id } = req.params;

      const asistente = await Asistente.findByPk(id);
      if (!asistente) {
        return res.status(404).json({ message: "Asistente no encontrado" });
      }

      await asistente.destroy();
      res.json({ message: "Asistente eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el asistente", error: error.message });
    }
  },
};

module.exports = asistenteController;
