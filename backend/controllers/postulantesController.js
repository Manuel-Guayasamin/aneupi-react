const {
  Postulante,
  PostulanteSolicitud,
  Estado,
  Pais,
  Modalidad,
} = require("../models");
const nodemailer = require("nodemailer");
const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const z = require("zod");
const {
  uploadCurriculumPostulaciones,
  deleteFile,
} = require("../lib/firebase");

const readFile = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
  tls: { rejectUnauthorized: false }
});

const PostulanteSchema = z.object({
  profesion: z.string(),
  area: z.string(),
  pais: z.coerce.number().positive(),
  ciudad: z.string(),
  id_modalidad: z.coerce.number().positive(),
  jornada: z.string(),
  is_discapacidad: z.boolean(),
  email: z.string().email(),
  empresa: z.optional(z.string()),
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter postulaciones:", error);
  } else {
    console.log("Transporter is ready to send emails postulaciones");
  }
});

// Método para crear un nuevo postulante
exports.createPostulante = async (req, res) => {
  try {
    const {
      profesion,
      area,
      pais,
      ciudad,
      modalidad,
      jornada,
      is_discapacidad,
      id_modalidad,
      email,
      empresa,
    } = req.body;

    // const oficioId = id_oficio === "null" ? null : id_oficio;
    // const isTrabajo = is_trabajo === "true" ? true : false;
    const isDiscapacidad = is_discapacidad === "true" ? true : false;

    const { success } = PostulanteSchema.safeParse({
      profesion,
      area,
      pais,
      ciudad,
      id_modalidad,
      jornada,
      is_discapacidad: isDiscapacidad,
      email,
      empresa,
    });

    const fileExt = path.extname(req.file.filename);
    if (fileExt !== ".pdf") {
      return res.status(400).json({
        error: "Tipo de archivo no permitido.",
      });
    }
    if (!success) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
      });
    }

    // // Validar que los campos requeridos estén presentes
    // if (
    // 	!profesion ||
    // 	!interes ||
    // 	!pais ||
    // 	!ciudad ||
    // 	!modalidad ||
    // 	!jornada ||
    // 	!req.file ||
    // 	!is_discapacidad
    // ) {
    // 	return res.status(400).json({ error: 'Todos los campos son requeridos' });
    // }

    // const curriculumPath = req.file.path.replace(/\\/g, '/');
    const curriculumPath = await uploadCurriculumPostulaciones(req.file);
    if (!curriculumPath) {
      return res.status(500).json({
        message: "Error al subir el curriculum",
      });
    }

    const nuevoPostulante = await Postulante.create({
      profesion,
      ciudad,
      curriculum: curriculumPath,
      jornada,
      is_discapacidad: isDiscapacidad,
      interes: "default",
      id_estado: 1,
      pais_id: pais,
      modalidad_id: id_modalidad,
      email,
    });

    let nuevaSolicitud = null;

    if (nuevoPostulante) {
      let solicitud = {
        id_oficio: oficioId,
        is_trabajo: isTrabajo,
        id_postulante: nuevoPostulante.id,
      };

      // if (solicitud.id_oficio === null) {
      //   solicitud = {
      //     ...solicitud,
      //     id_oficio: null,
      //   }
      // }
      nuevaSolicitud = await PostulanteSolicitud.create(solicitud);
    }

    res.status(201).json({
      mensaje: "Postulante creado correctamente",
      postulante: nuevoPostulante,
      solicitud: nuevaSolicitud,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener todos los postulantes
exports.getAllPostulantes = async (req, res) => {
  try {
    const postulantes = await Postulante.findAll({
      include: [
        { model: Estado, attributes: ["id", "nombre"] },
        {
          model: PostulanteSolicitud,
          attributes: ["id_oficio", "is_trabajo", "id_postulante"],
        },
        { model: Pais, attributes: ["nombre"] },
        { model: Modalidad, attributes: ["nombre"] },
      ],
    });
    res.status(200).json(postulantes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los postulantes" });
  }
};

// Método para obtener un postulante por su ID
exports.getPostulanteById = async (req, res) => {
  try {
    const postulante = await Postulante.findByPk(req.params.id);
    if (!postulante) {
      return res.status(404).json({ error: "Postulante no encontrado" });
    }
    res.status(200).json(postulante);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener el postulante" });
  }
};

// Método para actualizar un postulante
exports.updatePostulante = async (req, res) => {
  try {
    const {
      profesion,
      interes,
      pais_id,
      ciudad,
      modalidad_id,
      jornada,
      curriculum,
      is_discapacidad,
      id_estado,
      email,
      empresa,
    } = req.body;

    //Validadción zod
    const PostulanteSchema = z.object({
      profesion: z.string().nonempty("La profesión es obligatoria"),
      interes: z.string().nonempty("El interés es obligatorio"),
      pais_id: z.coerce
        .number()
        .positive("El país debe ser un número positivo"),
      ciudad: z.string().nonempty("La ciudad es obligatoria"),
      modalidad_id: z.coerce
        .number()
        .positive("La modalidad debe ser un número positivo"),
      jornada: z.string().nonempty("La jornada es obligatoria"),
      curriculum: z.string().nonempty("El curriculum es obligatorio"),
      is_discapacidad: z.boolean(),
      id_estado: z.coerce
        .number()
        .positive("El estado debe ser un número positivo"),
      email: z.string().email(),
      empresa: z.string(),
    });

    const result = PostulanteSchema.safeParse({
      profesion,
      interes,
      pais_id,
      ciudad,
      modalidad_id,
      jornada,
      curriculum,
      is_discapacidad,
      id_estado,
      empresa,
      email,
    });

    if (!result.success) {
      return res.status(400).json({
        error: result.error.errors.map((e) => e.message).join(", "),
      });
    }

    const postulante = await Postulante.findByPk(req.params.id);
    if (!postulante) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    await postulante.update({
      profesion,
      interes,
      pais_id,
      ciudad,
      modalidad_id,
      jornada,
      curriculum,
      is_discapacidad,
      id_estado,
      email,
      empresa,
    });
    if (result.data.id_estado == 2) {
      try {
        const html = await readFile(
          "./emails/postulaciones/aprobado.html",
          "utf-8"
        );
        const template = handlebars.compile(html);
        const data = {};
        function formatDate(dateString) {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
        const htmlReady = template(data);
        transporter.sendMail(
          {
            from: EMAIL,
            to: result.data.email,
            subject: "Postulacion Aprobada",
            html: htmlReady,
          },
          (error, info) => {
            if (error) {
              console.error(
                "Error al enviar correo electrónico de aprobación:",
                error
              );
            } else {
              console.log(
                "Correo electrónico de aprobación enviado:",
                info.response
              );
            }
          }
        );
      } catch (error) {
        console("El correo ha fallado por ${error} ");
      }
    } else if (result.data.id_estado == 3) {
      try {
        const html = await readFile(
          "./emails/postulaciones/rechazado.html",
          "utf-8"
        );
        const template = handlebars.compile(html);
        const data = {};
        const htmlReady = template(data);
        transporter.sendMail(
          {
            from: EMAIL,
            to: result.data.email,
            subject: "Postulacion Rechazada",
            html: htmlReady,
          },
          (error, info) => {
            if (error) {
              console.error(
                "Error al enviar correo electrónico de rechazo:",
                error
              );
            } else {
              console.log(
                "Correo electrónico de rechazo enviado:",
                info.response
              );
            }
          }
        );
      } catch (error) {
        console("El correo ha fallado por ${error} ");
      }
    }

    res.status(200).json({ mensaje: "Postulante actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para eliminar un postulante
exports.deletePostulante = async (req, res) => {
  try {
    const postulante = await Postulante.findByPk(req.params.id);
    if (!postulante) {
      return res.status(404).json({ error: "Postulante no encontrado" });
    }

    // Obtener la ruta del curriculum y eliminarlo del sistema de archivos si existe
    if (postulante.curriculum) {
      // const rutaCurriculum = postulante.curriculum.replace(/\\/g, '/'); // Replace backslashes with slashes
      // const curriculumPath = path.join(__dirname, '..', rutaCurriculum);
      // fs.unlinkSync(curriculumPath); // Eliminar el curriculum del sistema de archivos
      await deleteFile(postulante.curriculum, "postulaciones/curriculumFiles/");
    }

    await postulante.destroy();
    res.status(200).json({ mensaje: "Postulante eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al eliminar el postulante" });
  }
};
