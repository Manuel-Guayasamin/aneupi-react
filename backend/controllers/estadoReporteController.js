const { EstadoReporte } = require("../models");

const estadoReporteController = {
  // Todas los estados de reportes
  async getAllEstadoReportes(req, res) {
    try {
      const estados = await EstadoReporte.findAll();
      return res.status(200).json(estados);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error retrieving estados", details: error.message });
    }
  },
};

module.exports = estadoReporteController;
