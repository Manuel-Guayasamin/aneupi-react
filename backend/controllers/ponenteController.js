const { Ponente } = require("../models");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

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

      // Cargar la plantilla HTML
      const htmlPath = path.resolve(__dirname, "../emails/Ponentes/nuevo-ponente.html");
      const html = await readFile(htmlPath, "utf8");
      const template = handlebars.compile(html);
      const data = {
        nombreApellido: nombres,
        eventoId: id_evento,
      };
      const htmlReady = template(data);

      // Enviar correo electrónico
      transporter.sendMail({
        from: EMAIL,
        to: email,
        subject: "Registro de Ponente Exitoso",
        html: htmlReady,
      }, (err, info) => {
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
    const { id } = req.params;
    try {
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

      // Cargar la plantilla de email para notificación de eliminación
      const htmlPath = path.resolve(__dirname, "../emails/Ponentes/ponente-eliminado.html");
      const html = await readFile(htmlPath, "utf8");
      const template = handlebars.compile(html);
      const data = {
        nombreApellido: ponente.nombres,
      };
      const htmlReady = template(data);

      // Enviar correo de notificación
      transporter.sendMail({
        from: EMAIL,
        to: ponente.email,
        subject: "Notificación de eliminación de ponente",
        html: htmlReady,
      }, (err, info) => {
        if (err) {
          console.error("Error al enviar el correo de eliminación:", err);
        } else {
          console.log("Correo de eliminación enviado:", info.response);
        }
      });

      await ponente.destroy();
      res.json({ message: "Ponente eliminado y notificado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el ponente", error: error.message });
    }
  },
};

module.exports = ponenteController;
