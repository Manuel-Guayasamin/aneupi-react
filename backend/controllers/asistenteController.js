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
};

module.exports = asistenteController;
