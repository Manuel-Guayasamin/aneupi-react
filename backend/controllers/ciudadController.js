const { Ciudad, Pais } = require("../models");

const ciudadController = {
  // Crear una ciudad
  async createCiudad(req, res) {
    try {
      const ciudadData = {
        nombre: req.body.nombre.trim(),
        zona_horaria: req.body.zona_horaria,
        pais_id: req.body.pais_id
      };

      // Verificar nombre de ciudad existente
      const nombreExistente = await Ciudad.findOne({
        where: {
          nombre: ciudadData.nombre,
        }
      });

      if (nombreExistente) {
        return res.status(409).json({
          message: "La ciudad ya está registrada",
        });
      }

      const ciudad = await Ciudad.create(ciudadData);
      return res.status(201).json(ciudad);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error creating ciudad", details: error.message });
    }
  },

  // Todas las ciudades
  async getAllCiudades(req, res) {
    try {
      const ciudades = await Ciudad.findAll({
        include: [
          {
            model: Pais,
          },
        ],
      });
      return res.status(200).json(ciudades);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error retrieving ciudades", details: error.message });
    }
  },

  // Ciudad por Id
  async getCiudadById(req, res) {
    const { id } = req.params;
    try {
      const ciudad = await Ciudad.findByPk(id);
      if (!ciudad) {
        return res.status(404).json({
          error: "Ciudad not found",
        });
      }
      return res.status(200).json(ciudad);
    } catch (error) {
      return res
        .status(500)
        .json({
          error: "Error retrieving ciudad",
          details: error.message,
        });
    }
  },

  // Actualizar ciudad
  async updateCiudad(req, res) {
    const { id } = req.params;
    try {

      const nombreExistente = await Ciudad.findOne({
        where: {
          nombre: req.body.nombre,
        }
      });

      if (nombreExistente) {
        return res.status(409).json({
          message: "La ciudad ya está registrada",
        });
      }

      const [updated] = await Ciudad.update(req.body, {
        where: { id }
      });

      if (updated) {
        const updatedCiudad = await Ciudad.findByPk(id);
        return res
          .status(200)
          .json(updatedCiudad);
      }
      return res
        .status(404)
        .json({
          error: "Error ciudad not found",
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          error: "Error updating ciudad",
          details: error.message,
        });
    }
  },

  // Eliminar ciudad
  async deleteCiudad(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Ciudad.destroy({
        where: { id }
      });
      if (!deleted) {
        return res
          .status(404)
          .json({
            error: "Ciudad not found",
          });
      }
      return res
        .status(204)
        .send();
    } catch (error) {
      return res
        .status(500)
        .json({
          error: "Error deleting ciudad",
          details: error.message,
        });
    }
  }
};

module.exports = ciudadController;
