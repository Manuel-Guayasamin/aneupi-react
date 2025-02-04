const { Pais } = require("../models");

const paisController = {
  // Crear un pais
  async createPais(req, res) {
    try {
      const paisData = {
        nombre: req.body.nombre.trim(),
        tlf_code: req.body.tlf_code.trim(),
      };
      // Verificar código telefónico
      for (const char of paisData.tlf_code) {

        if (isNaN(Number(char))) {
          return res.status(400).json({
            message: "Se espera un número como código"
          })
        }
      }

       // Verificar nombre de país existente
      const nombreExistente = await Pais.findOne({
        where: {
          nombre: paisData.nombre,
        }
      });

      if (nombreExistente) {
        return res.status(409).json({
          message: "El país ya está registrado",
        });
      }

      // // Verificar código telefónico de país existente
      // const codigoExistente = await Pais.findOne({
      //   where: {
      //     tlf_code: "+" + paisData.tlf_code,
      //   }
      // });

      // if (codigoExistente) {
      //   return res.status(409).json({
      //     message: "El código telefónico ya está registrado con otro país",
      //   });
      // }

      const pais = await Pais.create({
        nombre: paisData.nombre,
        tlf_code: "+" + paisData.tlf_code,
      });
      return res.status(201).json(pais);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error creating pais", details: error.message });
    }
  },

  // Todas los paises
  async getAllPaises(req, res) {
    try {
      const paises = await Pais.findAll();
      return res.status(200).json(paises);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error retrieving paises", details: error.message });
    }
  },

  // Pais por Id
  async getPaisById(req, res) {
    const { id } = req.params;
    try {
      const pais = await Pais.findByPk(id);
      if (!pais) {
        return res.status(404).json({
          error: "Pais not found",
        });
      }
      return res.status(200).json(pais);
    } catch (error) {
      return res
        .status(500)
        .json({
          error: "Error retrieving pais",
          details: error.message,
        });
    }
  },

  // Actualizar pais
  async updatePais(req, res) {
    const { id } = req.params;
    try {
      // Pais actual
      const pais = await Pais.findByPk(id);

      // Data del request
      const paisData = {
        nombre: req.body.nombre.trim(),
        tlf_code: req.body.tlf_code.trim(),
      }

      // Verificar si el nuevo nombre existe para otro registro
      const nombreExistente = await Pais.findOne({
        where: {
          nombre: paisData.nombre,
        }
      });

      // Si el nombre existe en otro registro (sin incluir el registro actual)
      if (nombreExistente && nombreExistente.id !== pais.id) {
        return res.status(409).json({
          message: "El país ya está registrado.",
        });
      }

      // // Verificar si en los nuevos datos se intenta registrar un código
      // // telefónico perteneciente a otro país
      // const codigoExistente = await Pais.findOne({
      //   where: {
      //     tlf_code: "+" + paisData.tlf_code,
      //   }
      // })

      // // El código telefónico existe en otro registro (sin incluir el registro actual)
      // if (codigoExistente && codigoExistente.tlf_code !== pais.tlf_code) {
      //   return res.status(409).json({
      //     message: "El código telefónico está asociado a un país ya registrado.",
      //   });
      // }

      // Verificar que no se actualice con los mismos datos
      if (paisData.nombre === pais.nombre && paisData.tlf_code === pais.tlf_code) {
        return res.status(409).json({
          message: "Error al actualizar",
        });
      }

      const [updated] = await Pais.update({
        nombre: paisData.nombre,
        tlf_code: "+" + paisData.tlf_code,
      }, {
        where: { id }
      });
      if (updated) {
        const updatedPais = await Pais.findByPk(id);
        return res
          .status(200)
          .json(updatedPais);
      }
      return res
        .status(404)
        .json({
          error: "Error pais not found",
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          error: "Error updating pais",
          details: error.message,
        });
    }
  },

  // Eliminar pais
  async deletePais(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Pais.destroy({
        where: { id }
      });
      if (!deleted) {
        return res
          .status(404)
          .json({
            error: "Pais not found",
          });
      }
      return res
        .status(204)
        .send();
    } catch (error) {
      return res
        .status(500)
        .json({
          error: "Error deleting pais",
          details: error.message,
        });
    }
  }
};

module.exports = paisController;
