const { uploadCurriculumPostulaciones, deleteFile } = require("../lib/firebase");
const { SolicitudPractica, Estado, Pais, Modalidad } = require("../models");
const nodemailer = require('nodemailer');
const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;
const handlebars = require("handlebars");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
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
    console.error('Error verifying transporter practicas:', error);
  } else {
    console.log('Transporter is ready to send emails practicas');
  }
});

// Método para crear un nuevo solicitante
exports.createSolicitudPractica = async (req, res) => {
  try {
    console.log(req.body);

    const {
      telefono,
      is_discapacidad,
      universidad,
      carrera,
      empresa,
      tipo_practica,
      fecha_inicio,
      fecha_fin,
      total_horas,
      id_modalidad,
      id_estado,
      lugar,
      pais_id,
      practica_id,
      email,
    } = req.body;

    // Convertir string 'true'/'false' a booleano
    const has_discapacidad = is_discapacidad === "true";

    // Convertir los valores numéricos de strings a números
    const totalHorasNumber = Number(total_horas);
    const idModalidadNumber = Number(id_modalidad);
    const idEstadoNumber = Number(id_estado);
    const paisIdNumber = Number(pais_id);
    const practicaIdNumber = practica_id === "" ? null : Number(practica_id);

    // Validación de fechas en formato DD/MM/YYYY
    const dateSchema = z.string().refine((dateString) => {
      const [day, month, year] = dateString.split('/');
      const date = new Date(`${year}-${month}-${day}`);
      return !isNaN(date.getTime());
    }, {
      message: "Fecha inválida"
    });

    // Esquema Zod
    const SolicitudPracticaSchema = z.object({
      telefono: z.string(),
      is_discapacidad: z.boolean(),
      universidad: z.string(),
      carrera: z.string(),
      empresa: z.string(),
      tipo_practica: z.string(),
      fecha_inicio: dateSchema,
      fecha_fin: dateSchema,
      total_horas: z.coerce.number().positive(),
      id_modalidad: z.coerce.number().positive(),
      id_estado: z.coerce.number().positive(),
      lugar: z.string(),
      pais_id: z.coerce.number().positive(),
      practica_id: z.coerce.number().positive().or(z.null()),
      email: z.string().email(),
    });

    // Validar datos
    const result = SolicitudPracticaSchema.safeParse({
      telefono,
      is_discapacidad: has_discapacidad,
      universidad,
      carrera,
      empresa,
      tipo_practica,
      fecha_inicio,
      fecha_fin,
      total_horas: totalHorasNumber,
      id_modalidad: idModalidadNumber,
      id_estado: idEstadoNumber,
      lugar,
      pais_id: paisIdNumber,
      practica_id: practicaIdNumber,
      email,
    });

    // Verificación del resultado
    if (!result.success) {
      console.log(result.error);
      return res.status(400).json({
        error: "Validación fallida",
        detalles: result.error.errors,
      });
    }

    console.log(result);

    // Procesamiento del archivo PDF
    const fileExt = path.extname(req.file.filename);
    if (fileExt !== ".pdf") {
      return res.status(400).json({
        error: "Tipo de archivo no permitido."
      });
    }

    // Conversión de fechas a UTC
    const fechaInicio = new Date(fecha_inicio.split('/').reverse().join('-'));
    const fechaInicioUTC = new Date(Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate()));

    const fechaFin = new Date(fecha_fin.split('/').reverse().join('-'));
    const fechaFinUTC = new Date(Date.UTC(fechaFin.getFullYear(), fechaFin.getMonth(), fechaFin.getDate()));

    const curriculumPath = await uploadCurriculumPostulaciones(req.file);
    if (!curriculumPath) {
      return res.status(500).json({
        message: "Error al subir el curriculum",
      });
    }

    // Crear solicitante
    const nuevoSolicitante = await SolicitudPractica.create({
      telefono,
      is_discapacidad: has_discapacidad,
      universidad,
      carrera,
      empresa,
      tipo_practica,
      fecha_inicio: fechaInicioUTC,
      fecha_fin: fechaFinUTC,
      total_horas: totalHorasNumber,
      curriculum: curriculumPath,
      id_modalidad: idModalidadNumber,
      id_estado: idEstadoNumber,
      lugar,
      pais_id: paisIdNumber,
      practica_id: practicaIdNumber,
      email,
    });

    res.status(201).json({
      mensaje: "Solicitante creado correctamente",
      solicitante: nuevoSolicitante,
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Método para obtener todos los solicitante
exports.getAllSolicitudPractica = async (req, res) => {
  try {
    const solicitantes = await SolicitudPractica.findAll({
      include: [
        { model: Estado, attributes: ["id", "nombre"] },
        { model: Pais, attributes: ["nombre"] },
        { model: Modalidad, attributes: ["id", "nombre"] },
      ],
    });
    res.status(200).json(solicitantes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los solicitante" });
  }
};

// Método para obtener un solicitante por su ID
exports.getSolicitudPracticaById = async (req, res) => {
  try {
    const solicitante = await SolicitudPractica.findByPk(req.params.id);
    if (!solicitante) {
      return res.status(404).json({ error: "Solicitante no encontrado" });
    }
    res.status(200).json(solicitante);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener el solicitante" });
  }
};

// Método para actualizar un solicitante
exports.updateSolicitudPractica = async (req, res) => {
  try {
    const {
      telefono,
      is_discapacidad,
      universidad,
      carrera,
      empresa,
      tipo_practica,
      fecha_inicio,
      fecha_fin,
      total_horas,
      id_modalidad,
      id_estado,
      lugar,
      pais_id,
      practica_id,
      email,
    } = req.body;

    // Validación usando Zod
    const dateSchema = z.string().refine((dateString) => {
      const date = new Date(dateString);
      return !isNaN(date.getTime());
    }, {
      message: "Fecha inválida"
    });

    const SolicitudPracticaSchema = z.object({
      telefono: z.string(),
      is_discapacidad: z.boolean(),
      universidad: z.string(),
      carrera: z.string(),
      empresa: z.string(),
      tipo_practica: z.string(),
      fecha_inicio: dateSchema,
      fecha_fin: dateSchema,
      total_horas: z.coerce.number().positive(),
      id_modalidad: z.coerce.number().positive(),
      id_estado: z.coerce.number().positive(),
      lugar: z.string(),
      pais_id: z.coerce.number().positive(),
      practica_id: z.coerce.number().positive().or(z.null()),
      email: z.string().email(),
    });

    const result = SolicitudPracticaSchema.safeParse({
      telefono,
      is_discapacidad,
      universidad,
      carrera,
      empresa,
      tipo_practica,
      fecha_inicio,
      fecha_fin,
      total_horas,
      id_modalidad,
      id_estado,
      lugar,
      pais_id,
      practica_id,
      email,
    });

    if (!result.success) {
      return res.status(400).json({
        error: result.error.errors.map(e => e.message).join(", ")
      });
    }

    const solicitante = await SolicitudPractica.findByPk(req.params.id);
    if (!solicitante) {
      return res.status(404).json({ error: "Solicitante no encontrado" });
    }
    await solicitante.update({
      telefono,
      is_discapacidad,
      universidad,
      carrera,
      empresa,
      tipo_practica,
      fecha_inicio,
      fecha_fin,
      total_horas,
      id_modalidad,
      id_estado,
      lugar,
      pais_id,
      practica_id,
      email,
    });
    if (result.data.id_estado == 2) {
      try {
        const html = await readFile("./emails/practicas/aprobado.html", "utf-8");
        const template = handlebars.compile(html);

        const data = {
          carrera: result.data.carrera,
          empresa: result.data.empresa,
          tipo_practica: result.data.tipo_practica,
          fechaInicio: formatDate(result.data.fecha_inicio),
          fechaFin: formatDate(result.data.fecha_fin),
        };

        function formatDate(dateString) {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
        const htmlReady = template(data);
        transporter.sendMail({
          from: EMAIL,
          to: result.data.email,
          subject: 'Practicas Aprobadas',
          html: htmlReady,
        }, (error, info) => {
          if (error) {
            console.error('Error al enviar correo electrónico de aprobación:', error);
          } else {
            console.log('Correo electrónico de aprobación enviado:', info.response);
          }
        });
      } catch (error) {
        console("El correo ha fallado por ${error} ");
      }
    } else if (result.data.id_estado == 3) {
      try {
        const html = await readFile("./emails/practicas/rechazado.html", "utf-8");
        const template = handlebars.compile(html);
        const data = {
          carrera: result.data.carrera,
          empresa: result.data.empresa,
          tipo_practica: result.data.tipo_practica,
        }
        const htmlReady = template(data);
        transporter.sendMail({
          from: EMAIL,
          to: result.data.email,
          subject: 'Practicas Rechazada',
          html: htmlReady,
        }, (error, info) => {
          if (error) {
            console.error('Error al enviar correo electrónico de rechazo:', error);
          } else {
            console.log('Correo electrónico de rechazo enviado:', info.response);
          }
        });
      } catch (error) {
        console("El correo ha fallado por ${error} ");
      }
    }

    res.status(200).json({ mensaje: "Solicitante actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Método para eliminar un solicitante
exports.deleteSolicitudPractica = async (req, res) => {
  try {
    const solicitante = await SolicitudPractica.findByPk(req.params.id);
    if (!solicitante) {
      return res.status(404).json({ error: "Solicitante no encontrado" });
    }

    // Obtener la ruta del curriculum y eliminarlo del sistema de archivos si existe
    if (solicitante.curriculum) {
      // const rutaCurriculum = solicitante.curriculum.replace(/\\/g, "/"); // Replace backslashes with slashes
      // const curriculumPath = path.join(__dirname, "..", rutaCurriculum);
      // fs.unlinkSync(curriculumPath); // Eliminar el curriculum del sistema de archivos
      await deleteFile(solicitante.curriculum, "postulaciones/curriculumFiles/");
    }

    await solicitante.destroy();
    res.status(200).json({ mensaje: "Solicitante eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al eliminar el solicitante" });
  }
};
