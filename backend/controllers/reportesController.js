const { Reporte, EstadoReporte } = require("../models");
const { z } = require("zod");
const nodemailer = require('nodemailer');
const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;
const handlebars = require("handlebars");
const fs = require("fs");
const path = require('path');
const { promisify } = require("util");
//const EstadoReporte = require("@/models/estadoreporte");

const readFile = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
  tls: { rejectUnauthorized: false }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying transporter denuncias:', error);
  } else {
    console.log('Transporter is ready to send emails denuncias');
  }
});

const ReportesController = {
  createNewReport: async (req, res) => {
    try {
      const {
        nombres,
        isStudent,
        isFromEcuador,
        universidad,
        email,
        asunto,
        telefono,
        mensaje,
      } = req.body;


      const ReportSchema = z.object({
        nombres: z.string().min(3, {
          message: "Por favor ingrese su nombre",
        }),
        isStudent: z.string({
          message: "Por favor seleccione si es estudiante",
        }),
        isFromEcuador: z.string({
          message: "Por favor seleccione si estudia en Ecuador",
        }),
        universidad: z.string({
          message: "Por favor seleccione su universidad",
        }),
        email: z.string().email({
          message: "Por favor ingrese un correo electrónico válido",
        }),
        asunto: z.string().min(5, {
          message: "Por favor ingrese un asunto",
        }),
        telefono: z
          .string({
            message: "Por favor ingrese su número de teléfono",
          })
          .min(10, {
            message: "Por favor ingrese un número de teléfono válido de 10 dígitos",
          })
          .max(10, {
            message: "Por favor ingrese un número de teléfono válido de 10 dígitos",
          }),
        mensaje: z.string().min(10, {
          message: "Por favor ingrese un mensaje",
        }),
      });

      const result = ReportSchema.safeParse({
        nombres,
        isStudent,
        isFromEcuador,
        universidad,
        email,
        asunto,
        telefono,
        mensaje,
      });
      console.log(result);
      if (!result.success) {

        return res.status(400).json({
          error: "Todos los campos son requeridos",
          details: result.error.errors,
        });
      }


      const report = {
        nombres: result.data.nombres,
        isStudent: result.data.isStudent,
        isFromEcuador: result.data.isFromEcuador,
        universidad: result.data.universidad,
        email: result.data.email,
        asunto: result.data.asunto,
        telefono: result.data.telefono,
        mensaje: result.data.mensaje,
        estado_id: 1,
      };

      const nuevoReporte = await Reporte.create(report);
      res.status(201).json({ mensaje: 'Reporte creado correctamente', reporte: nuevoReporte });

      try {
        const html = await readFile("./emails/denuncias/recibido.html", "utf-8");
        const template = handlebars.compile(html);
        const data = {
          nombre: result.data.nombres
        };
        //function formatDate(dateString) {
        //const date = new Date(dateString);
        //const day = String(date.getDate()).padStart(2, '0');
        //const month = String(date.getMonth() + 1).padStart(2, '0');
        //const year = date.getFullYear();
        //return `${day}/${month}/${year}`;
        //}
        const htmlReady = template(data);
        transporter.sendMail({
          from: EMAIL,
          to: result.data.email,
          subject: 'Denuncia recibida',
          html: htmlReady,
        }, (error, info) => {
          if (error) {
            console.error('Error al enviar correo electrónico de denuncias:', error);
          } else {
            console.log('Correo electrónico de denuncias enviado:', info.response);
          }
        });
      } catch (error) {
        console("El correo ha fallado por ${error} ");
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el reporte",
        error: error.message,
      });
    }
  },
  getAllReportes: async (req, res) => {
    try {
      const reportes = await Reporte.findAll({
        include: { model: EstadoReporte },
      });
      res.status(200).json(reportes);
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener las reportes',
        error: error.message,
      });
    }
  },
  deleteReport: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Reporte.destroy({
        where: { id }
      });
      if (!deleted) {
        return res.status(404).json({
          error: "Reporte not found",
        });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        error: "Error al eliminar Reporte",
        details: error.message,
      });
    }
  },

  updateReport: async (req, res) => {
    const { id } = req.params;
    try {
      const {
        nombres,
        isStudent,
        isFromEcuador,
        universidad,
        email,
        asunto,
        telefono,
        mensaje,
        estado_id,
      } = req.body;

      const ReportSchema = z.object({
        nombres: z.string().min(3, {
          message: "Por favor ingrese su nombre",
        }),
        isStudent: z.string({
          message: "Por favor seleccione si es estudiante",
        }),
        isFromEcuador: z.string({
          message: "Por favor seleccione si estudia en Ecuador",
        }),
        universidad: z.string({
          message: "Por favor seleccione su universidad",
        }),
        email: z.string().email({
          message: "Por favor ingrese un correo electrónico válido",
        }),
        asunto: z.string().min(5, {
          message: "Por favor ingrese un asunto",
        }),
        telefono: z
          .string({
            message: "Por favor ingrese su número de teléfono",
          })
          .min(10, {
            message: "Por favor ingrese un número de teléfono válido de 10 dígitos",
          })
          .max(10, {
            message: "Por favor ingrese un número de teléfono válido de 10 dígitos",
          }),
        mensaje: z.string().min(10, {
          message: "Por favor ingrese un mensaje",
        }),
        estado_id: z.coerce.number().positive(),
      });

      const result = ReportSchema.safeParse({
        nombres,
        isStudent,
        isFromEcuador,
        universidad,
        email,
        asunto,
        telefono,
        mensaje,
        estado_id,
      });

      if (!result.success) {
        return res.status(400).json({
          error: "Todos los campos son requeridos",
          details: result.error.errors,
        });
      }

      const report = {
        nombres: result.data.nombres,
        isStudent: result.data.isStudent,
        isFromEcuador: result.data.isFromEcuador,
        universidad: result.data.universidad,
        email: result.data.email,
        asunto: result.data.asunto,
        telefono: result.data.telefono,
        mensaje: result.data.mensaje,
        estado_id: result.data.estado_id,
      };
      if (result.data.estado_id == 2) {
        try {
          const html = await readFile("./emails/denuncias/atendido.html", "utf-8");
          const template = handlebars.compile(html);
          const data = {
            nombre: result.data.nombres
          };
          //function formatDate(dateString) {
          //const date = new Date(dateString);
          //const day = String(date.getDate()).padStart(2, '0');
          //const month = String(date.getMonth() + 1).padStart(2, '0');
          //const year = date.getFullYear();
          //return `${day}/${month}/${year}`;
          //}
          const htmlReady = template(data);
          transporter.sendMail({
            from: EMAIL,
            to: result.data.email,
            subject: 'Denuncia atendida',
            html: htmlReady,
          }, (error, info) => {
            if (error) {
              console.error('Error al enviar correo electrónico de denuncias:', error);
            } else {
              console.log('Correo electrónico de denuncias enviado:', info.response);
            }
          });
        } catch (error) {
          console("El correo ha fallado por ${error} ");
        }
      }
      const reporte = await Reporte.findByPk(id);
      if (!reporte) {
        return res.status(404).json({ message: "Reporte no encontrado" });
      }

      const [updated] = await Reporte.update(report, { where: { id } });

      if (updated) {
        const updatedReporte = await Reporte.findByPk(id);
        return res
          .status(200)
          .json(updatedReporte);
      }

    } catch (error) {
      return res.status(500).json({
        error: "Error al actualizar Reporte",
        details: error.message,
      });
    }
  }
};

module.exports = ReportesController;
