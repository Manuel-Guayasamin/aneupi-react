const { Servicio, Usuario, ServicioLinea } = require("../models"); // Assuming your model file path is correct
const exceljs = require("exceljs");
const z = require("zod");

const servicioController = {
  // Create a new servicio
  async createServicio(req, res) {
    try {
      console.log(req.body);
      const {
        descripcion,
        nombre,
      } = req.body;

      const ServicioSchema = z.object({
        descripcion: z.string(),
        nombre: z.string(),
      });

      const result = ServicioSchema.safeParse({
        descripcion,
        nombre,
      });

      if (!result.success) {
        return res.status(400).json({
          error: "Todos los campos son requeridos"
        });
      }

      const servicio = await Servicio.create(req.body);
      return res.status(201).json(servicio);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error creating servicio", details: error.message });
    }
  },

  // Get all servicios
  async getAllServicios(req, res) {
    try {
      const servicios = await Servicio.findAll();
      return res.status(200).json(servicios);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error retrieving servicios", details: error.message });
    }
  },

  // Get a single servicio by ID
  async getServicioById(req, res) {
    const { id } = req.params;
    try {
      const servicio = await Servicio.findByPk(id);
      if (!servicio) {
        return res.status(404).json({ error: "Servicio not found" });
      }
      return res.status(200).json(servicio);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error retrieving servicio", details: error.message });
    }
  },

  // Update a servicio by ID
  async updateServicio(req, res) {
    const { id } = req.params;
    try {
      const {
        descripcion,
        nombre,
      } = req.body;

      const ServicioSchema = z.object({
        descripcion: z.string(),
        nombre: z.string(),
      });

      const result = ServicioSchema.safeParse({
        descripcion,
        nombre,
      });

      if (!result.success) {
        return res.status(400).json({
          error: "Todos los campos son requeridos"
        });
      }

      const data = {
        descripcion,
        nombre,
      }

      const [updated] = await Servicio.update(data, { where: { id } });
      if (updated) {
        const updatedServicio = await Servicio.findByPk(id);
        return res.status(200).json(updatedServicio);
      }
      return res.status(404).json({ error: "Servicio not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error updating servicio", details: error.message });
    }
  },

  // Delete a servicio by ID
  async deleteServicio(req, res) {
    const { id } = req.params;
    try {
      console.log(req.params);

      const deleted = await Servicio.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: "Servicio not found" });
      }
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error deleting servicio", details: error.message });
    }
  },

  generateServiciosExcel: async (req, res) => {
    const { id } = req.params;
    try {
      // Find the job by ID
      const servicio = await Servicio.findByPk(id, {
        include: [
          { model: Usuario },
          {
            model: ServicioLinea,
            include: [{ model: Usuario, as: "solicitante" }],
          },
        ],
      });

      if (!servicio) {
        return res.status(404).json({ message: "Servicio not found" });
      }

      // Create a new Excel workbook
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet("Servicios");

      // Add headers for Servicio
      worksheet.columns = [
        { header: "Nombre del Servicio", key: "nombre", width: 30 },
        { header: "Descripcion", key: "descripcion", width: 30 },
        { header: "Profesional", key: "profesional", width: 30 },
        // Add headers for Usuario
        { header: "Nombres Completos", key: "nombre_usuario", width: 30 },
        { header: "Correo Electronico", key: "email", width: 30 },
        { header: "Telefono", key: "telefono", width: 30 },
        // Add more columns Servicio en Linea
        { header: "Motivo", key: "motivo", width: 30 },
      ];

      // Add postulantes data to the worksheet
      servicio.ServicioLineas.forEach((servicioLinea) => {
        // Check if it's a trabajo postulante
        const profesional = servicio.Usuario;
        const usuario = servicioLinea.solicitante;
        worksheet.addRow({
          // Add Servicio attributes
          nombre: servicio.nombre,
          descripcion: servicio.descripcion,
          profesional: profesional.nombres + " " + profesional.apellidos,

          // Add Usuario attributes
          nombre_usuario: usuario.nombres + " " + usuario.apellidos,
          email: usuario.email,
          telefono: usuario.telefono,

          // Add Servicio en Linea
          motivo: servicioLinea.motivo,

          // Add more data as needed
        });
      });

      // Set response headers
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=postulantes_${servicio.id}.xlsx`
      );

      // Send Excel file
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error("Error generating Excel:", error);
      res.status(500).json({ message: "Error generating Excel document" });
    }
  },
};

module.exports = servicioController;
