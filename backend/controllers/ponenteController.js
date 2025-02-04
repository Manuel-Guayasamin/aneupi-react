const { Ponente } = require("../models");

const ponenteController = {
  // Crear un nuevo ponente
  createPonente: async (req, res) => {
    try {
      const { tematica, curriculum_url, comprobante_url, profesion, nombres, cedula, edad, telefono, id_evento, email } = req.body;

      if (!nombres || !cedula || !id_evento || !email) {
        return res.status(400).json({ error: "Los campos nombres, cédula, id_evento y email son obligatorios" });
      }

      const nuevoPonente = await Ponente.create({
        tematica,
        curriculum_url,
        comprobante_url,
        profesion,
        nombres,
        cedula,
        edad,
        telefono,
        id_evento,
        email,
      });

      res.status(201).json(nuevoPonente);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el ponente", error: error.message });
    }
  },

  // Obtener todos los ponentes
  getAllPonentes: async (req, res) => {
    try {
      const ponentes = await Ponente.findAll();
      res.json(ponentes);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los ponentes", error: error.message });
    }
  },
};

module.exports = ponenteController;
