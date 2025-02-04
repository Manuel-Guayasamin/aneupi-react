const { Convenio, TipoConvenio, Modalidad, Estado, Usuario, Pais } = require("../models");
const nodemailer = require('nodemailer');
const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;
const handlebars = require("handlebars");
const fs = require("fs");
const { promisify } = require("util");
const { uploadConvenio, deleteFile } = require("../lib/firebase");
const z = require("zod");

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
    console.error('Error verifying transporter convenios:', error);
  } else {
    console.log('Transporter is ready to send emails convenios');
  }
});

const convenioController = {
  // Obtener todos los Convenios
  getAllConvenios: async (req, res) => {
    try {
      const convenios = await Convenio.findAll({
        atributes: [
          'id',
          'nombres',
          'apellidos',
          'email',
          'telefono',
          'id_pais',
          'id_tipoconvenio',
          'id_estado',
          'fecha_inicio',
          'fecha_fin',
          'duracion',
          'nombreOrganizacion',
          'descripcion',
          'createdAt',
          'updatedAt'
        ],
        include: [
          { model: TipoConvenio, attributes: ["id", "nombre"] },
          { model: Estado, attributes: ["id", "nombre"] },
          { model: Pais, atributes: ["id", "nombre"] },
        ]
      });
      res.status(200).json(convenios);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener los convenios",
        error: error.message,
      });
    }
  },

  // Crear un nuevo Convenio
  createConvenio: async (req, res) => {
    try {
      // Obtener los datos del cuerpo de la solicitud
      const {
        nombres,
        apellidos,
        email,
        telefono,
        id_pais,
        id_tipoconvenio,
        id_estado,
        fecha_inicio,
        fecha_fin,
        duracion,
        nombreOrganizacion,
        descripcion,
      } = req.body;

      // Validación de fecha
      const dateSchema = z.string().refine((dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      }, {
        message: "Fecha inválida"
      });

      const ConvenioSchema = z.object({
        id_tipoconvenio: z.coerce.number().positive(),
        id_estado: z.coerce.number().positive(),
        fecha_inicio: dateSchema,
        fecha_fin: dateSchema,
        duracion: z.coerce.number().positive(),
        nombreOrganizacion: z.string(),
        descripcion: z.string(),
        nombres: z.string(),
        apellidos: z.string(),
        telefono: z.string(),
        email: z.string().email(),
        id_pais: z.coerce.number().positive(),
      });

      const result = ConvenioSchema.safeParse({
        nombres,
        apellidos,
        email,
        telefono,
        id_pais,
        id_tipoconvenio,
        id_estado,
        fecha_inicio,
        fecha_fin,
        duracion,
        nombreOrganizacion,
        descripcion,
      });

      if (!result.success) {
        return res.status(400).json({
          error: "Todos los campos son requeridos"
        });
      }


      // if (
      //   !nombres ||
      //   !apellidos ||
      //   !email ||
      //   !telefono ||
      //   !id_pais ||
      //   !id_tipoconvenio ||
      //   !id_estado ||
      //   !fecha_inicio ||
      //   !fecha_fin ||
      //   !duracion ||
      //   !nombreOrganizacion ||
      //   !descripcion ||
      //   !req.file
      // ) {
      //   return res.status(400).json({
      //     error: "Todos los campos son requeridos"
      //   });
      // }

      // const propuestaPath = req.file.path.replace(/\\/g, '/');
      const propuestaPath = await uploadConvenio(req.file);
      // console.log(propuestaPath);

      if (!propuestaPath)
        return res.status(500).json({ message: "Error al subir la propuesta de convenio" });

      // Crear el nuevo convenio en la base de datos
      const nuevoConvenio = await Convenio.create({
        nombres,
        apellidos,
        telefono,
        email,
        id_pais,
        id_tipoconvenio,
        id_estado,
        fecha_inicio,
        fecha_fin,
        duracion,
        nombreOrganizacion,
        descripcion,
        propuesta: propuestaPath,
      });

      // Enviar email de convenio recibido
      try {
        // const user = await Usuario.findByPk(nuevoConvenio.id_usuario);
        // const nombreApellido = `${user.nombres.split(" ")[0]} ${user.apellidos.split(" ")[0]}`;

        const nombreApellido = `${nuevoConvenio.nombres} ${nuevoConvenio.apellidos}`;

        const html = await readFile("./emails/convenios/recibido.html", "utf-8");
        const template = handlebars.compile(html);
        const data = {
          nombreApellido,
          organizacionNombre: nuevoConvenio.nombreOrganizacion,
          organizacionDescripcion: nuevoConvenio.descripcion
        };
        const htmlReady = template(data);

        transporter.sendMail({
          from: EMAIL,
          to: nuevoConvenio.email,
          subject: "Convenio Recibido",
          html: htmlReady,
        }, (err, inf) => {
          if (err) {
            console.error('Error al enviar correo electrónico de recepción de convenio:', err);
          } else {
            console.log("Correo electrónico de recepción de convenio enviado:", inf.response);
          }
        });
      } catch (err) {
        console.log(err);
      }

      // Responder con el nuevo convenio creado
      res.status(201).json(nuevoConvenio);
    } catch (error) {
      // Manejar errores
      res.status(500).json({
        message: "Error al crear el convenio",
        error: error.message,
      });
    }
  },

  // Obtener un Convenio por su ID
  getConvenioById: async (req, res) => {
    const { id } = req.params;
    try {
      const convenio = await Convenio.findByPk(id);
      if (convenio) {
        res.json(convenio);
      } else {
        res.status(404).json({ message: "Convenio no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el convenio",
        error: error.message,
      });
    }
  },

  // Actualizar un Convenio por su ID
  updateConvenio: async (req, res) => {
    const { id } = req.params;
    // console.log(req.body);
    const {
      nombres,
      apellidos,
      email,
      telefono,
      id_pais,
      id_tipoconvenio,
      id_estado,
      fecha_inicio,
      fecha_fin,
      duracion,
      nombreOrganizacion,
      descripcion,
      propuesta,
    } = req.body;

    // Validación de fecha
    const dateSchema = z.string().refine((dateString) => {
      const date = new Date(dateString);
      return !isNaN(date.getTime());
    }, {
      message: "Fecha inválida"
    });

    const ConvenioSchema = z.object({
      id_tipoconvenio: z.coerce.number().positive(),
      id_estado: z.coerce.number().positive(),
      fecha_inicio: dateSchema,
      fecha_fin: dateSchema,
      duracion: z.coerce.number().positive(),
      nombreOrganizacion: z.string(),
      descripcion: z.string(),
      nombres: z.string(),
      apellidos: z.string(),
      telefono: z.string(),
      email: z.string().email(),
      id_pais: z.coerce.number().positive(),
    });

    const result = ConvenioSchema.safeParse({
      nombres,
      apellidos,
      email,
      telefono,
      id_pais,
      id_tipoconvenio,
      id_estado,
      fecha_inicio,
      fecha_fin,
      duracion,
      nombreOrganizacion,
      descripcion,
    });

    if (!result.success) {
      return res.status(400).json({
        error: "Todos los campos son requeridos"
      });
    }

    try {
      const convenio = await Convenio.findByPk(id);
      if (!convenio) {
        return res.status(404).json({ message: "Convenio no encontrado" });
      }

      // const convenioPath = req.file.path.replace(/\\/g, '/');


      if (convenio.convenio_parcial) {
        await deleteFile(convenio.convenio_parcial, "convenios/convenioFiles/");
      }

      const convenioPath = await uploadConvenio(req.file);


      await convenio.update({
        nombres,
        apellidos,
        telefono,
        email,
        id_pais,
        id_tipoconvenio,
        id_estado,
        fecha_inicio,
        fecha_fin,
        duracion,
        nombreOrganizacion,
        descripcion,
        propuesta,
        convenio_parcial: convenioPath,
      });

      // const usuarios = await Usuario.findByPk(convenio.id_usuario);
      const nombre = convenio.nombres.split(' ')[0] + ' ' + convenio.apellidos.split(' ')[0];

      if (convenio.id_estado == 2) {
        const today = new Date();

        if (convenio.fecha_inicio < today) {
          const duracion = convenio.duracion;
          const finConvenio = new Date();
          finConvenio.setFullYear(today.getFullYear() + duracion);
          const startDate = today.toISOString().split("T")[0];
          const endDate = finConvenio.toISOString().split("T")[0];

          const initialStartDate = convenio.fecha_inicio;
          const initialEndDate = convenio.fecha_fin;

          const updatedConvenio = {
            ...req.body,
            fecha_inicio: startDate,
            fecha_fin: endDate,
          }
          await convenio.update(updatedConvenio);

          // Enviar email de convenio aprobado
          try {
            const html = await readFile("./emails/convenios/aprobado-especial.html", "utf-8");
            const template = handlebars.compile(html);
            const data = {
              nombre,
              fechaInicioOriginal: initialStartDate.toLocaleString("es-EC", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
              fechaFinOriginal: initialEndDate.toLocaleString("es-EC", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
              organizacionNombre: convenio.nombreOrganizacion,
              organizacionDescripcion: convenio.descripcion,
              fechaInicio: convenio.fecha_inicio.toLocaleString("es-EC", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
              fechaFin: convenio.fecha_fin.toLocaleString("es-EC", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
            }
            const htmlReady = template(data);
            transporter.sendMail({
              from: EMAIL,
              to: convenio.email,
              subject: 'Convenio Aprobado',
              html: htmlReady,
            }, (error, info) => {
              if (error) {
                console.error('Error al enviar correo electrónico de aprobación:', error);
              } else {
                console.log('Correo electrónico de aprobación enviado:', info.response);
              }
            });
          } catch (err) {
            console.log(err);
          }

          return res.json(convenio);
        }

        // Enviar email de convenio aprobado
        try {
          const html = await readFile("./emails/convenios/aprobado.html", "utf-8");
          const template = handlebars.compile(html);
          const data = {
            nombre,
            organizacionNombre: convenio.nombreOrganizacion,
            organizacionDescripcion: convenio.descripcion,
            fechaInicio: convenio.fecha_inicio.toLocaleString("es-EC", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
            fechaFin: convenio.fecha_fin.toLocaleString("es-EC", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
          }
          const htmlReady = template(data);

          console.log('==================Enviando correo electrónico de aprobación a: ' + nombre + ' ==================');
          transporter.sendMail({
            from: EMAIL,
            to: convenio.email,
            subject: 'Convenio Aprobado',
            html: htmlReady,
          }, (error, info) => {
            if (error) {
              console.error('Error al enviar correo electrónico de aprobación:', error);
            } else {
              console.log('Correo electrónico de aprobación enviado:', info.response);
            }
          });
        } catch (err) {
          console.log(err);
        }
      } else if (convenio.id_estado == 3) {
        // Enviar email de convenio rechazado
        try {
          const html = await readFile("./emails/convenios/rechazado.html", "utf-8");
          const template = handlebars.compile(html);
          const data = {
            nombreApellido: nombre,
            organizacionNombre: convenio.nombreOrganizacion,
            organizacionDescripcion: convenio.descripcion,
          };
          const htmlReady = template(data);

          transporter.sendMail({
            from: EMAIL,
            to: convenio.email,
            subject: "Convenio Rechazado",
            html: htmlReady,
          }, (err, inf) => {
            if (err) {
              console.error('Error al enviar correo electrónico de recepción de convenio:', err);
            } else {
              console.log("Correo electrónico de convenio rechazado enviado:", inf.response);
            }
          });
        } catch (err) {
          console.log(err);
        }
      } else if (convenio.id_estado == 4) {
        // Enviar email de convenio finalizado
        try {
          const html = await readFile("./emails/convenios/finalizado.html", "utf-8");
          const template = handlebars.compile(html);
          const data = {
            nombre,
            organizacionNombre: convenio.nombreOrganizacion,
            organizacionDescripcion: convenio.descripcion,
            fechaInicio: convenio.fecha_inicio.toLocaleString("es-EC", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
          }
          const htmlReady = template(data);

          transporter.sendMail({
            from: EMAIL,
            to: convenio.email,
            subject: "Convenio Finalizado",
            html: htmlReady,
          }, (err, inf) => {
            if (err) {
              console.error('Error al enviar correo electrónico de recepción de convenio:', err);
            } else {
              console.log("Correo electrónico de finalización de convenio enviado:", inf.response);
            }
          });
        } catch (err) {
          console.log(err);
        }

      }
      res.json(convenio);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el convenio", error: error.message });
    }
  },

  // Eliminar un Convenio por su ID
  deleteConvenio: async (req, res) => {
    const { id } = req.params;
    try {
      const convenio = await Convenio.findByPk(id);
      const nombreApellido = `${convenio.nombres.split(" ")[0]} ${convenio.apellidos.split(" ")[0]}`;
      if (convenio) {
        // Enviar email de convenio rechazado
        if (convenio.id_estado == 1) {
          try {
            const html = await readFile("./emails/convenios/rechazado.html", "utf-8");
            const template = handlebars.compile(html);
            const data = {
              nombreApellido,
              organizacionNombre: convenio.nombreOrganizacion,
              organizacionDescripcion: convenio.descripcion,
            };
            const htmlReady = template(data);

            transporter.sendMail({
              from: EMAIL,
              to: convenio.email,
              subject: "Convenio Rechazado",
              html: htmlReady,
            }, (err, inf) => {
              if (err) {
                console.error('Error al enviar correo electrónico de recepción de convenio:', err);
              } else {
                console.log("Correo electrónico de convenio rechazado enviado:", inf.response);
              }
            });
          } catch (err) {
            console.log(err);
          }
          // Enviar email de convenio finalizado
        } else if (convenio.id_estado == 2) {
          try {
            const html = await readFile("./emails/convenios/finalizado-especial.html", "utf-8");
            const template = handlebars.compile(html);
            const data = {
              nombreApellido,
              organizacionNombre: convenio.nombreOrganizacion,
              organizacionDescripcion: convenio.descripcion,
              fechaInicio: convenio.fecha_inicio.toLocaleString("es-EC", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
            };
            const htmlReady = template(data);

            transporter.sendMail({
              from: EMAIL,
              to: convenio.email,
              subject: "Convenio Finalizado",
              html: htmlReady,
            }, (err, inf) => {
              if (err) {
                console.error('Error al enviar correo electrónico de recepción de convenio:', err);
              } else {
                console.log("Correo electrónico de finalización de convenio enviado:", inf.response);
              }
            });
          } catch (err) {
            console.log(err);
          }
        }

        await deleteFile(convenio.propuesta, "convenios/convenioFiles/");

        if (convenio.convenio_parcial) {
          await deleteFile(convenio.convenio_parcial, "convenios/convenioFiles/");
        }

        await convenio.destroy();
        res.json({ message: "Convenio eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "Convenio no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el convenio",
        error: error.message,
      });
    }
  },
};

module.exports = convenioController;
