const { Ponente } = require("../models");
const nodemailer = require("nodemailer");
const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});

transporter.verify((error) => {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

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

      // Enviar correo electrónico
      const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Nuevo Ponente Creado",
        text: `Hola ${nombres},\n\nSe ha registrado un nuevo ponente en el evento ${id_evento}.\n\nSaludos.`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error al enviar el correo:", err);
        } else {
          console.log("Correo enviado:", info.response);
        }
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

  // Actualizar un ponente por ID
  updatePonente: async (req, res) => {
    try {
      const { id } = req.params;
      const ponente = await Ponente.findByPk(id);
      if (!ponente) {
        return res.status(404).json({ message: "Ponente no encontrado" });
      }

      await ponente.update(req.body);
      res.json({ message: "Ponente actualizado", ponente });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el ponente", error: error.message });
    }
  },

  // Eliminar un ponente por ID
  deletePonente: async (req, res) => {
    try {
      const { id } = req.params;
      const ponente = await Ponente.findByPk(id);
      if (!ponente) {
        return res.status(404).json({ message: "Ponente no encontrado" });
      }

      await ponente.destroy();
      res.json({ message: "Ponente eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el ponente", error: error.message });
    }
  },
};

module.exports = ponenteController;
