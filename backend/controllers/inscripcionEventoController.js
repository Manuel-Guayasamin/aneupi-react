const { where } = require("sequelize");
const {
  InscripcionEvento,
  Usuario,
  Evento,
  Estado,

  Ponente,
} = require("../models");
const {
  uploadCurriculum,
  uploadComprobante,
  uploadCertificate,
} = require("../lib/firebase");
const { z } = require("zod");

const inscripcionSchema = z.object({
  nombres: z
    .string({
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .min(3)
    .max(35),
  apellidos: z.string().min(3).max(35),
  direccion: z.string().min(5).max(50),
  edad: z.number().int().positive(),
  profesion: z.string().min(3).max(50),
  id_modalidad: z.string(),
  costo: z.number().positive(),
  id_evento: z.string(),
  id_estado: z.string(),
  cedula: z.string().length(10),
});

const ponenteSchema = z.object({
  nombres: z
    .string({
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .min(3)
    .max(35),

  cedula: z.string().length(10),
  email: z.string().email(),
  edad: z.number().int().positive(),
  direccion: z.string().min(5).max(50),
  profesion: z.string().min(3).max(50),
  telefono: z.string().length(10),
  tematica: z.string().min(5).max(50),
  id_evento: z.string(),
  precio: z.number().positive(),
});

const fileSchema = z.object({
  filename: z.string(),
  size: z.number().max(5000000), // Tamaño máximo de 5MB
  mimetype: z
    .string()
    .refine(
      (type) => ["image/jpeg", "image/png", "application/pdf"].includes(type),
      {
        message: "El tipo de archivo debe ser JPEG, PNG o PDF",
      }
    ),
});

const inscripcionEventoController = {
  inscribirUsuarioAEvento: async (req, res) => {
    try {
      const {
        nombres,
        apellidos,
        direccion,
        edad,
        profesion,
        id_modalidad,
        costo,
        id_evento,
        id_estado,
        cedula,
      } = req.body;

      const data = inscripcionSchema.parse({
        nombres,
        apellidos,
        direccion,
        edad: parseInt(edad),
        profesion,
        id_modalidad,
        costo: parseFloat(costo),
        id_evento,
        id_estado,
        cedula,
      });
      const inscriptionFinded = await InscripcionEvento.findOne({
        where: { cedula, id_evento },
      });
      if (inscriptionFinded)
        return res
          .status(400)
          .json({ message: "Ya existe una inscripción con esta cédula" });

      if (!!req.files) {
        const comprobanteValidado = fileSchema.parse(req.files.comprobante[0]);
        const certificadoValidado = req.files.certificado
          ? fileSchema.parse(req.files.certificado[0])
          : null;
        const comprobanteUrl =
          comprobanteValidado &&
          (await uploadComprobante(req.files.comprobante[0]));
        const certificadoUrl = certificadoValidado
          ? await uploadCertificate(req.files.certificado[0])
          : null;
        await InscripcionEvento.create({
          nombres,
          apellidos,
          direccion,
          edad,
          profesion,
          id_modalidad,
          costo: parseFloat(costo),
          id_evento,
          id_estado,
          cedula,
          fecha_inscripcion: new Date(),
          comprobante_url: comprobanteUrl,
          certificado_url: certificadoUrl,
        });

        return res
          .status(201)
          .json({ message: "La inscripción se realizó con éxito! GRACIAS" });
      }

      await InscripcionEvento.create({
        nombres,
        apellidos,
        direccion,
        edad,
        profesion,
        id_modalidad,
        costo: parseFloat(costo),
        id_evento,
        id_estado,
        cedula,
        fecha_inscripcion: new Date(),
      });

      return res
        .status(201)
        .json({ message: "Inscripción creada correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Error creando la inscripcion al evento",
        details: error.message,
      });
    }
  },
  inscribirPonente: async (req, res) => {
    try {
      const validatedData = ponenteSchema.parse({
        ...req.body,

        precio: parseFloat(req.body.precio),
        edad: parseInt(req.body.edad),
      });

      const ponenteEncontrado = await Ponente.findOne({
        where: {
          cedula: validatedData.cedula,
          id_evento: validatedData.id_evento,
        },
      });
      if (ponenteEncontrado)
        return res
          .status(400)
          .json({ message: "Ya existe un ponente con esta cédula" });

      if (!req.files.curriculum)
        return res.status(400).json({ message: "El curriculum es requerido" });

      const curriculumValidado = fileSchema.parse(req.files.curriculum[0]);

      const certificadoValidado = fileSchema.parse(req.files.comprobante[0]);
      if (!curriculumValidado || !certificadoValidado)
        return res.status(400).json({ message: "El archivo no es válido" });

      const [curriculumUrl, comprobanteUrl] = await Promise.all([
        uploadCurriculum(req.files.curriculum[0]),
        uploadComprobante(req.files.comprobante[0], true),
      ]);
      console.log(comprobanteUrl);
      await Ponente.create({
        ...validatedData,
        comprobante_url: comprobanteUrl,
        curriculum_url: curriculumUrl,
      });

      return res.status(201).json({ message: "Ponente inscrito con éxito" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Error creando la inscripcion al evento",
        details: error,
      });
    }
  },
  // Obtener todas las inscripciones
  getAllInscripciones: async (req, res) => {
    try {
      const postId = req.params.postId;

      const inscripciones = await InscripcionEvento.findAll({
        attributes: [
          "id",
          "comprobante_url",
          "certificado_url",
          "nombres",
          "apellidos",
          "direccion",
          "edad",
          "profesion",
          "id_modalidad",
          "costo",
          "cedula",
          "id_evento",
          "id_estado",
          "fecha_inscripcion",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: Evento,
            attributes: ["id", "nombre", "fecha_inicio", "fecha_fin"],
          },
          {
            model: Estado,
            attributes: ["id", "nombre"],
          },
        ],
        where: {
          id_evento: postId,
        },
      });
      res.status(200).json(inscripciones);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener las inscripciones",
        error: error.message,
      });
    }
  },

  // Obtener todos los ponentes
  getAllPonentes: async (req, res) => {
    try {
      const postId = req.params.postId;
      const ponentes = await Ponente.findAll({
        attributes: [
          "id",
          "nombres",
          "cedula",
          "email",
          "edad",
          "profesion",
          "telefono",
          "tematica",
          "curriculum_url",
          "comprobante_url",
        ],
        where: {
          id_evento: postId,
        },
      });
      console.log(ponentes);
      res.status(200).json(ponentes);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los ponentes",
        error: error.message,
      });
    }
  },

  eliminarInscripcion: async (req, res) => {
    const { id_inscripcion } = req.params;

    try {
      const inscripcion = await InscripcionEvento.findByPk(id_inscripcion);
      if (!inscripcion) {
        return res.status(404).json({ message: "Inscripción no encontrada" });
      }

      await inscripcion.destroy();
      return res
        .status(200)
        .json({ message: "Inscripción eliminada correctamente" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          message: "Error al eliminar la inscripción",
          error: error.message,
        });
    }
  },

  eliminarPonente: async (req, res) => {
    const { id_ponente } = req.params;
    console.log(id_ponente);

    try {
      const ponente = await Ponente.findByPk(id_ponente);
      if (!ponente) {
        return res.status(404).json({ message: "Ponente no encontrado" });
      }

      await ponente.destroy();
      return res
        .status(200)
        .json({ message: "Ponente eliminado correctamente" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error al eliminar el ponente",
        error: error.message,
      });
    }
  },

  // Aprobar un ponente
  aprobarPonente: async (req, res) => {
    const { id_ponente } = req.params;
    try {
      const ponente = await Ponente.findByPk(id_ponente);
      if (!ponente) {
        return res.status(404).json({ message: "Ponente no encontrado" });
      }

      // Ejemplo de actualización del estado
      await ponente.update({ aprobado: true });

      return res
        .status(200)
        .json({ message: "Ponente aprobado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al aprobar el ponente",
        error: error.message,
      });
    }
  },

  // Desaprobar un ponente y convertirlo a asistente
  desaprobarPonente: async (req, res) => {
    const { id_ponente } = req.params;
    try {
      const ponente = await Ponente.findByPk(id_ponente);
      if (!ponente) {
        return res.status(404).json({ message: "Ponente no encontrado" });
      }

      // Ejemplo de mover a asistentes
      // Puede requerir lógica adicional dependiendo de cómo esté modelada la base de datos
      await InscripcionEvento.create({
        nombres: ponente.nombres,
        apellidos: ponente.apellidos,
        // otros campos necesarios
      });

      await ponente.destroy();

      return res
        .status(200)
        .json({ message: "Ponente desaprobado y movido a asistentes" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al desaprobar el ponente",
        error: error.message,
      });
    }
  },
};

module.exports = inscripcionEventoController;
