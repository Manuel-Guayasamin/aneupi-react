const {
  ServicioCita,
  ServicioLinea,
  Servicio,
  Modalidad,
  Estado,
  Usuario,
} = require("../models");
const nodemailer = require("nodemailer");
const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;
const handlebars = require("handlebars");
const fs = require("fs");
const { promisify } = require("util");
const z = require("zod");

const readFile = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
  tls: { rejectUnauthorized: false }
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter convenios:", error);
    console.error("Error verifying transporter citas:", error);
  } else {
    console.log("Transporter is ready to send emails citas");
  }
});

const ZOOM_URL = process.env.ZOOM_URL;

const servicioCitaController = {
  // Crear una cita
  async createCita(req, res) {
    try {
      const {
        solicitante_nombre,
        solicitante_email,
        solicitante_telefono,
        motivo,
        fecha_inicio,
        fecha_fin,
        modalidad_id,
        id_servicio_linea,
        pais_id,
        ciudad
      } = req.body;

      // Validación de fecha
      const dateSchema = z.string().refine((dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      }, {
        message: "Fecha inválida"
      });

      const CitaSchema = z.object({
        solicitante_nombre: z.string(),
        solicitante_email: z.string().email(),
        solicitante_telefono: z.string(),
        motivo: z.string(),
        fecha_inicio: dateSchema,
        fecha_fin: dateSchema,
        modalidad_id: z.coerce.number().positive(),
        id_servicio_linea: z.coerce.number().positive(),
        pais_id: z.coerce.number().positive(),
        ciudad: z.string(),
      });

      const result = CitaSchema.safeParse({
        solicitante_nombre,
        solicitante_email,
        solicitante_telefono,
        motivo,
        fecha_inicio,
        fecha_fin,
        modalidad_id,
        id_servicio_linea,
        pais_id,
        ciudad
      });

      if (!result.success) {
        return res.status(400).json({
          error: "Todos los campos son requeridos"
        });
      }

      const datos = {
        solicitante_nombre,
        solicitante_email,
        solicitante_telefono,
        motivo,
        fecha_inicio,
        fecha_fin,
        modalidad_id,
        id_servicio_linea,
        pais_id,
        ciudad,
        estado_id: 2, // Por defecto la cita es aprobada en el sistema.
        reunion_url: ZOOM_URL, // url de reunión de zoom asociada a todas las citas (por el momento)
      };

      // ServicioLinea (representa la asociación entre
      // servicio y profesional) de la cita a crear
      const servicioLinea = await ServicioLinea.findByPk(
        datos.id_servicio_linea
      );

      // Todas las citas existentes
      const citas = await ServicioCita.findAll({
        include: { model: ServicioLinea },
      });

      // Fecha de inicio (fecha y hora) de la cita que se quiere agendar
      const citaInicio = new Date(datos.fecha_inicio);

      // Si existen citas en el sistema, verifica
      if (citas.length > 0) {
        // Número de citas existentes en ese horario.
        let numeroCitas = 0;

        for (let i = 0; i < citas.length; i++) {
          // Fecha de inicio y fin de cada cita registrada
          const fechaInicio = new Date(citas[i].fecha_inicio);
          const fechaFin = new Date(citas[i].fecha_fin);

          // No se permiten múltiples citas con el mismo email (citas sin finalizar)
          if (
            datos.solicitante_email === citas[i].solicitante_email &&
            citas[i].estado_id === 2
          ) {
            return res.status(409).json({
              message: "Este email ya tiene una cita agendada.",
            });
          }

          // No se permiten múltiples citas con el mismo número telefónico (citas sin finalizar)
          if (
            datos.solicitante_telefono === citas[i].solicitante_telefono &&
            citas[i].estado_id === 2
          ) {
            return res.status(409).json({
              message: "Este número de teléfono ya tiene una cita agendada.",
            });
          }

          // Citas no pueden darse en el mismo horario (del mismo servicio)
          if (
            citaInicio.getTime() >= fechaInicio.getTime() &&
            citaInicio.getTime() < fechaFin.getTime()
          ) {
            if (
              citas[i].ServicioLinea.id_servicio === servicioLinea.id_servicio
            ) {
              return res.status(409).json({
                message: "Horario no disponible",
              });
            }

            numeroCitas += 1;
          }
        }
        // Si es otro servicio y no existen 5 citas en ese horario puede agendarse. (max 5)
        console.log(numeroCitas, numeroCitas >= 5);
        if (numeroCitas >= 5) {
          return res.status(409).json({
            message: "No es posible agendar cita en este horario.",
          });
        }
      }

      // Se registra la cita y se retorna la misma con un estado 201
      const cita = await ServicioCita.create(datos);

      try {
        //Obtener nombre del servicio
        const servicio_linea = await ServicioLinea.findByPk(
          cita.id_servicio_linea
        );
        const servicio = await Servicio.findByPk(servicio_linea.id_servicio);
        //Obtener modalidad
        const modalidad = await Modalidad.findByPk(cita.modalidad_id);

        let html;
        let data;

        if (modalidad.nombre === "Presencial") {
          html = await readFile(
            "./emails/citas/recibido-presencial.html",
            "utf-8"
          );
          data = {
            nombreApellido: cita.solicitante_nombre,
            servicio_nombre: servicio.nombre,
            modalidad: modalidad.nombre,
            ciudad_nombre: cita.ciudad,
            fechaInicio: cita.fecha_inicio.toLocaleString("es-EC", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            }),
            hora: cita.fecha_inicio.toTimeString(),
          };
        } else {
          html = await readFile("./emails/citas/recibido.html", "utf-8");
          data = {
            nombreApellido: cita.solicitante_nombre,
            servicio_nombre: servicio.nombre,
            modalidad: modalidad.nombre,
            ciudad_nombre: cita.ciudad,
            fechaInicio: cita.fecha_inicio.toLocaleString("es-EC", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            }),
            hora: cita.fecha_inicio.toTimeString(),
            reunion_url: datos.reunion_url,
          };
        }
        const template = handlebars.compile(html);
        const htmlReady = template(data);

        transporter.sendMail(
          {
            from: EMAIL,
            to: cita.solicitante_email,
            subject: "Cita Agendada",
            html: htmlReady,
          },
          (err, inf) => {
            if (err) {
              console.error(
                "Error al enviar correo electrónico de agendación de cita:",
                err
              );
            } else {
              console.log(
                "Correo electrónico de cita agendada enviado:",
                inf.response
              );
            }
          }
        );
      } catch (err) {
        console.log(err);
      }

      return res.status(201).json(cita);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error creating cita", details: error.message });
    }
  },

  // Todas las citas
  async getAllCitas(req, res) {
    try {
      // console.log(ServicioCita);
      const citas = await ServicioCita.findAll({
        include: [
          { model: ServicioLinea },
          { model: Estado },
        ],
      });
      return res.status(200).json(citas);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error retrieving citas", details: error.message });
    }
  },

  // Cita por id
  async getCitaById(req, res) {
    const { id } = req.params;
    try {
      const cita = await ServicioCita.findByPk(id);
      if (!cita) {
        return res.status(404).json({ error: "Cita not found" });
      }
      return res.status(200).json(cita);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error retrieving cita", details: error.message });
    }
  },

  // Actualizar cita
  async updateCita(req, res) {
    const { id } = req.params;
    try {
      const {
        solicitante_nombre,
        solicitante_email,
        solicitante_telefono,
        motivo,
        fecha_inicio,
        fecha_fin,
        modalidad_id,
        id_servicio_linea,
        pais_id,
        ciudad,
        estado_id,
        reunion_url,
      } = req.body;

      console.log(req.body);

      // Validación de fecha
      const dateSchema = z.string().refine((dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      }, {
        message: "Fecha inválida"
      });

      const CitaSchema = z.object({
        solicitante_nombre: z.string(),
        solicitante_email: z.string().email(),
        solicitante_telefono: z.string(),
        motivo: z.string(),
        fecha_inicio: dateSchema,
        fecha_fin: dateSchema,
        modalidad_id: z.coerce.number().positive(),
        id_servicio_linea: z.coerce.number().positive(),
        pais_id: z.coerce.number().positive(),
        ciudad: z.string(),
        estado_id: z.coerce.number().positive(),
        reunion_url: z.string(),
      });

      const result = CitaSchema.safeParse({
        solicitante_nombre,
        solicitante_email,
        solicitante_telefono,
        motivo,
        fecha_inicio,
        fecha_fin,
        modalidad_id,
        id_servicio_linea,
        pais_id,
        ciudad,
        estado_id,
        reunion_url,
      });

      if (!result.success) {
        return res.status(400).json({
          error: "Todos los campos son requeridos"
        });
      }

      const datos = {
        solicitante_nombre,
        solicitante_email,
        solicitante_telefono,
        motivo,
        fecha_inicio,
        fecha_fin,
        modalidad_id,
        id_servicio_linea,
        pais_id,
        ciudad,
        estado_id,
        reunion_url,
      };

      const [updated] = await ServicioCita.update(datos, { where: { id } });
      if (updated) {
        const updatedCita = await ServicioCita.findByPk(id);

        if (req.body.estado_id == 4) {
          try {
            //Obtener nombre del servicio
            const servicio_linea = await ServicioLinea.findByPk(
              req.body.id_servicio_linea
            );
            const servicio = await Servicio.findByPk(
              servicio_linea.id_servicio
            );

            const fecha = new Date(req.body.fecha_inicio);

            html = await readFile("./emails/citas/finalizado.html", "utf-8");
            data = {
              nombre: req.body.solicitante_nombre,
              servicio_nombre: servicio.nombre,
              ciudad_nombre: req.body.ciudad,
              fecha_inicio: fecha.toLocaleString("es-EC", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }),
            };

            const template = handlebars.compile(html);
            const htmlReady = template(data);

            transporter.sendMail(
              {
                from: EMAIL,
                to: req.body.solicitante_email,
                subject: "Cita Finalizada",
                html: htmlReady,
              },
              (err, inf) => {
                if (err) {
                  console.error(
                    "Error al enviar correo electrónico de finalización de cita:",
                    err
                  );
                } else {
                  console.log(
                    "Correo electrónico de cita finalizada enviado:",
                    inf.response
                  );
                }
              }
            );
          } catch (err) {
            console.log(err);
          }
        }

        return res.status(200).json(updatedCita);
      }
      return res.status(404).json({ error: "Cita not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error updating cita", details: error.message });
    }
  },

  // Eliminar cita
  async deleteCita(req, res) {
    const { id } = req.params;
    try {
      console.log(req.params);

      const deleted = await ServicioCita.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: "Cita not found" });
      }
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error deleting cita", details: error.message });
    }
  },
};

module.exports = servicioCitaController;
