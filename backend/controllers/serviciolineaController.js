const { ServicioLinea, Usuario, Servicio } = require("../models");

const serviciolineaController = {
  // Obtener todos los ServicioLinea
  getAllServicioLinea: async (req, res) => {
    try {
      const servicioLineas = await ServicioLinea.findAll({
        attributes: [
          "id",
          "id_profesional",
          "id_servicio",
        ],
        include: [
          {
            model: Usuario, as: "profesional",
          },
          {
            model: Servicio, as: "servicio",
          },
        ],
      });
      res.status(200).json(servicioLineas);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los servicios de línea",
        error: error.message,
      });
    }
  },

  // Crear un nuevo ServicioLinea
  createServicioLinea: async (req, res) => {
    try {
      const {
        id_profesional,
        id_servicio,
      } = req.body;

      const profesionalExistente = await ServicioLinea.findOne({
        where: {
          id_profesional: id_profesional,
          id_servicio: id_servicio,
        }
      });

      if (profesionalExistente) {
        return res.status(409).json({
          message: "El profesional ya existe",
        });
      }

      const profesional = await Usuario.findByPk(id_profesional);
      const servicio = await Servicio.findByPk(id_servicio);

      if (!profesional) {
        return res.status(200).json({ message: "El profesional no existe" });
      }

      if (!servicio) {
        return res.status(200).json({ message: "El servicio no existe" });
      }

      const nuevoServicioLinea = await ServicioLinea.create({
        id_profesional,
        id_servicio,
      });
      res.status(201).json(nuevoServicioLinea);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error al crear el servicio de línea",
        error: error.message,
      });
    }
  },

  // Obtener un ServicioLinea por su ID
  getServicioLineaById: async (req, res) => {
    const { id } = req.params;
    try {
      const servicioLinea = await ServicioLinea.findByPk(id, {
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: ["id" /* otros campos si es necesario */],
          },
          {
            model: Servicio,
            as: "servicio",
            attributes: ["id" /* otros campos si es necesario */],
          },
        ],
      });
      if (servicioLinea) {
        res.json(servicioLinea);
      } else {
        res.status(404).json({ message: "Servicio de línea no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el servicio de línea",
        error: error.message,
      });
    }
  },

  // Actualizar un ServicioLinea por su ID
  updateServicioLinea: async (req, res) => {
    const { id } = req.params;
    try {
      const servicioLinea = await ServicioLinea.findByPk(id);
      if (servicioLinea) {
        await servicioLinea.update(req.body);
        res.json(servicioLinea);
      } else {
        res.status(404).json({ message: "Servicio de línea no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el servicio de línea",
        error: error.message,
      });
    }
  },

  // Eliminar un ServicioLinea por su ID
  deleteServicioLinea: async (req, res) => {
    const { id } = req.params;
    try {
      const servicioLinea = await ServicioLinea.findByPk(id);
      if (servicioLinea) {
        await servicioLinea.destroy();
        res.json({ message: "Servicio de línea eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "Servicio de línea no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el servicio de línea",
        error: error.message,
      });
    }
  },
};

module.exports = serviciolineaController;
