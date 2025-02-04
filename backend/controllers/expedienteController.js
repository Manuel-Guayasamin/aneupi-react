const { Where } = require("sequelize/lib/utils");
const { Expediente, TipoExpediente, Estado } = require("../models");
const { Sequelize,Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const z = require("zod");

const expedienteController = {
    // Obtener todos los expedientes
    getAllExpedientes: async (req, res) => {
        const { q, tipo } = req.query;
        const where = {};

        if (q) {
            where[Op.or] = [
                { nombres: { [Op.like]: `%${q}%` } },
                { apellidos: { [Op.like]: `%${q}%` } },
                { profesion: { [Op.like]: `%${q}%` } },
                { cedula: { [Op.like]: `%${q}%` } },
            ];
        }

        if (tipo) {
            where.id_tipo_expediente = tipo;
        }

        try {
            const expedientes = await Expediente.findAll({
                Where,
                include: [
                    { model: TipoExpediente, attributes: ["id", "nombre"] },
                    { model: Estado, attributes: ["id", "nombre"] },
                ],
            });
            res.status(200).json(expedientes);
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener los expedientes",
                error: error.message,
            });
        }
    },


    createExpediente: async (req, res) => {
        try {

            const {
                nombres,
                apellidos,
                profesion,
                cedula,
                direccion,
                edad,
                pais,
                institucion,
                type, 
                costo,
            } = req.body;
    

            const certificado = req.files["certificado_url"] ? req.files["certificado_url"][0].path.replace(/\\/g, "/") : null;
            const comprobante = req.files["comprobante_url"] ? req.files["comprobante_url"][0].path.replace(/\\/g, "/") : null;
            const archivo = req.files["archivo_url"] ? req.files["archivo_url"][0].path.replace(/\\/g, "/") : null;
    

            const tipo = type === "Sentencia" ? 1 : 2;
    

            const ExpedienteSchema = z.object({
                nombres: z.string(),
                apellidos: z.string(),
                profesion: z.string(),
                cedula: z.string(),
                direccion: z.string().optional(),
                edad: z.coerce.number().positive().int().optional(),
                pais: z.string().optional(),
                institucion: z.string().optional(),
                costo: z.coerce.number().positive().optional(),
            });
    

            const result = ExpedienteSchema.parse({
                nombres,
                apellidos,
                profesion,
                cedula,
                direccion,
                edad,
                pais,
                institucion,
                costo,
            });
    

            const expedienteData = {
                ...result,
                certificado_url: certificado,
                comprobante_url: comprobante,
                archivo_url: archivo,
                id_tipo_expediente: tipo,
                id_estado: 1, 
            };
    

            const nuevoExpediente = await Expediente.create(expedienteData);
    

            res.status(201).json(nuevoExpediente);
        } catch (error) {
            console.error("Error al crear el expediente:", error);
            res.status(500).json({
                message: "Error al crear el expediente",
                error: error.message,
            });
        }
    },
    

    getExpedienteById: async (req, res) => {
        const { id } = req.params;
        try {
            const expediente = await Expediente.findByPk(id, {
                include: [
                    { model: TipoExpediente, attributes: ["nombre"] },
                    { model: Estado, attributes: ["nombre"] },
                ],
            });
            if (expediente) {
                res.json(expediente);
            } else {
                res.status(404).json({ message: "Expediente no encontrado" });
            }
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener el expediente",
                error: error.message,
            });
        }
    },

    
    getExpedienteByWord: async (req, res) => {
        const { word } = req.params;
        try {
          const tipoExpediente = await TipoExpediente.findOne({
            where: { nombre: "Sentencia" },
          });
    
          const estadoAprobado = await Estado.findOne({ where: { nombre: "Aprobado" } });
    
          if (!tipoExpediente || !estadoAprobado) {
            return res.status(404).json({
              message: "Tipo de expediente 'Sentencia' o estado 'Aprobado' no encontrado",
            });
          }
    

          const attributes = Object.keys(Expediente.rawAttributes);
    

          console.log('Attributes:', attributes);
          console.log('Raw Attributes:', Expediente.rawAttributes);
    

          const textAttributes = attributes.filter(attr => {
            const type = Expediente.rawAttributes[attr].type;
            return type instanceof Sequelize.STRING || type instanceof Sequelize.TEXT;
          });
    
          console.log('Text Attributes:', textAttributes);
    
          if (textAttributes.length === 0) {
            return res.status(500).json({
              message: "No hay atributos de tipo texto en el modelo",
            });
          }
    
          const conditions = textAttributes.map(attribute => ({
            [attribute]: {
              [Op.iLike]: `%${word}%` 
            }
          }));
    
          const expedientes = await Expediente.findAll({
            where: {
              [Op.or]: conditions,
              id_tipo_expediente: tipoExpediente.id,
              id_estado: estadoAprobado.id
            },
            include: [
              { model: TipoExpediente, attributes: ["nombre"] },
              { model: Estado, attributes: ["nombre"] },
            ],
          });
    
          if (expedientes.length > 0) {
            res.json(expedientes);
          } else {
            res.status(404).json({ message: "No se encontraron expedientes con esa palabra" });
          }
        } catch (error) {
          res.status(500).json({
            message: "Error al buscar expedientes",
            error: error.message,
          });
        }
      },

      getExpedienteByPhrase: async (req, res) => {
        console.log("TEXTO EN GRANDE");
        const { word } = req.query;
        console.log(word);
        try {
          const tipoExpediente = await TipoExpediente.findOne({
            where: { nombre: "Sentencia" },
          });
    
          const estadoAprobado = await Estado.findOne({ where: { nombre: "Aprobado" } });
    
          if (!tipoExpediente || !estadoAprobado) {
            return res.status(404).json({
              message: "Tipo de expediente 'Sentencia' o estado 'Aprobado' no encontrado",
            });
          }
    

          const attributes = Object.keys(Expediente.rawAttributes);
    

          console.log('Attributes:', attributes);
          console.log('Raw Attributes:', Expediente.rawAttributes);
    

          const textAttributes = attributes.filter(attr => {
            const type = Expediente.rawAttributes[attr].type;
            return type instanceof Sequelize.STRING || type instanceof Sequelize.TEXT;
          });
    
          console.log('Text Attributes:', textAttributes);
    
          if (textAttributes.length === 0) {
            return res.status(500).json({
              message: "No hay atributos de tipo texto en el modelo",
            });
          }
    
          const conditions = textAttributes.map(attribute => ({
            [attribute]: {
              [Op.Like]: word
            }
          }));
    
          const expedientes = await Expediente.findAll({
            where: {
              [Op.or]: conditions,
              id_tipo_expediente: tipoExpediente.id,
              id_estado: estadoAprobado.id
            },
            include: [
              { model: TipoExpediente, attributes: ["nombre"] },
              { model: Estado, attributes: ["nombre"] },
            ],
          });
    
          if (expedientes.length > 0) {
            res.json(expedientes);
          } else {
            res.status(404).json({ message: "No se encontraron expedientes con esa palabra" });
          }
        } catch (error) {
          res.status(500).json({
            message: "Error al buscar expedientes",
            error: error.message,
          });
        }
      },
      

      getResolucionByWord: async (req, res) => {
        const { word } = req.params;
        try {
          const tipoExpediente = await TipoExpediente.findOne({
            where: { nombre: "Resolución" },
          });
    
          const estadoAprobado = await Estado.findOne({ where: { nombre: "Aprobado" } });
    
          if (!tipoExpediente || !estadoAprobado) {
            return res.status(404).json({
              message: "Tipo de expediente 'Resolución' o estado 'Aprobado' no encontrado",
            });
          }
    

          const attributes = Object.keys(Expediente.rawAttributes);
          console.log('Attributes:', attributes);
          console.log('Raw Attributes:', Expediente.rawAttributes);
    
          const textAttributes = attributes.filter(attr => {
            const type = Expediente.rawAttributes[attr].type;
            return type instanceof Sequelize.STRING || type instanceof Sequelize.TEXT;
          });
    
          console.log('Text Attributes:', textAttributes);
    
          if (textAttributes.length === 0) {
            return res.status(500).json({
              message: "No hay atributos de tipo texto en el modelo",
            });
          }
    
          const conditions = textAttributes.map(attribute => ({
            [attribute]: {
              [Op.iLike]: `%${word}%` 
            }
          }));
    
          const expedientes = await Expediente.findAll({
            where: {
              [Op.or]: conditions,
              id_tipo_expediente: tipoExpediente.id,
              id_estado: estadoAprobado.id
            },
            include: [
              { model: TipoExpediente, attributes: ["nombre"] },
              { model: Estado, attributes: ["nombre"] },
            ],
          });
    
          if (expedientes.length > 0) {
            res.json(expedientes);
          } else {
            res.status(404).json({ message: "No se encontraron expedientes con esa palabra" });
          }
        } catch (error) {
          res.status(500).json({
            message: "Error al buscar expedientes",
            error: error.message,
          });
        }
      },

      getResolucionByPhrase: async (req, res) => {
        const { word } = req.query;
        
        try {
          console.log(word);
          const tipoExpediente = await TipoExpediente.findOne({
            where: { nombre: "Resolución" },
          });
    
          const estadoAprobado = await Estado.findOne({ where: { nombre: "Aprobado" } });
    
          if (!tipoExpediente || !estadoAprobado) {
            return res.status(404).json({
              message: "Tipo de expediente 'Sentencia' o estado 'Aprobado' no encontrado",
            });
          }
    

          const attributes = Object.keys(Expediente.rawAttributes);
    

          console.log('Attributes:', attributes);
          console.log('Raw Attributes:', Expediente.rawAttributes);
    

          const textAttributes = attributes.filter(attr => {
            const type = Expediente.rawAttributes[attr].type;
            return type instanceof Sequelize.STRING || type instanceof Sequelize.TEXT;
          });
    
          console.log('Text Attributes:', textAttributes);
    
          if (textAttributes.length === 0) {
            return res.status(500).json({
              message: "No hay atributos de tipo texto en el modelo",
            });
          }
    
          const conditions = textAttributes.map(attribute => ({
            [attribute]: {
              [Op.Like]: word
            }
          }));
    
          const expedientes = await Expediente.findAll({
            where: {
              [Op.or]: conditions,
              id_tipo_expediente: tipoExpediente.id,
              id_estado: estadoAprobado.id
            },
            include: [
              { model: TipoExpediente, attributes: ["nombre"] },
              { model: Estado, attributes: ["nombre"] },
            ],
          });
    
          if (expedientes.length > 0) {
            res.json(expedientes);
          } else {
            res.status(404).json({ message: "No se encontraron expedientes con esa palabra" });
          }
        } catch (error) {
          res.status(500).json({
            message: "Error al buscar expedientes",
            error: error.message,
          });
        }
      },
    
    

    updateExpediente: async (req, res) => {
        const { id } = req.params;
        try {
            const expediente = await Expediente.findByPk(id);
            if (!expediente) {
                return res.status(404).json({ message: "Expediente no encontrado" });
            }

            expediente.update(req.body);
            res.json(expediente);
        } catch (error) {
            res.status(500).json({
                message: "Error al actualizar el expediente",
                error: error.message,
            });
        }
    },


    deleteExpediente: async (req, res) => {
        try {
            const expediente = await Expediente.findByPk(req.params.id);
            if (!expediente) {
                return res.status(404).json({ error: "Expediente no encontrado" });
            }


            if (expediente.certificado_url) {
                const rutaCertificado = expediente.certificado_url.replace(/\\/g, "/");
                const certificadoPath = path.join(__dirname, "..", rutaCertificado);
                if (fs.existsSync(certificadoPath)) {
                    fs.unlinkSync(certificadoPath);
                }
            }

            if (expediente.comprobante_url) {
                const rutaComprobante = expediente.comprobante_url.replace(/\\/g, "/");
                const comprobantePath = path.join(__dirname, "..", rutaComprobante);
                if (fs.existsSync(comprobantePath)) {
                    fs.unlinkSync(comprobantePath);
                }
            }

            if (expediente.archivo_url) {
                const rutaArchivo = expediente.archivo_url.replace(/\\/g, "/");
                const archivoPath = path.join(__dirname, "..", rutaArchivo);
                if (fs.existsSync(archivoPath)) {
                    fs.unlinkSync(archivoPath);
                }
            }

            await expediente.destroy();
            res.status(200).json({ mensaje: "Expediente eliminado correctamente" });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Ocurrió un error al eliminar el expediente",
            });
        }
    },

    // Obtener expedientes de tipo "Sentencia" y estado "Aprobado"
    getSentenciasAprobadas: async (req, res) => {
        try {
            const tipoExpediente = await TipoExpediente.findOne({
                where: { nombre: "Sentencia" },
            });

            const estadoAprobado = await Estado.findOne({ where: { nombre: "Aprobado" } });

            if (!tipoExpediente || !estadoAprobado) {
                return res.status(404).json({
                    message: "Tipo de expediente 'Sentencia' o estado 'Aprobado' no encontrado",
                });
            }

            const expedientes = await Expediente.findAll({
                where: {
                    id_tipo_expediente: tipoExpediente.id,
                    id_estado: estadoAprobado.id,
                },
                include: [
                    { model: TipoExpediente, attributes: ["id", "nombre"] },
                    { model: Estado, attributes: ["id", "nombre"] },
                ],
            });

            res.status(200).json(expedientes);
        } catch (error) {
            console.error("Error al obtener los expedientes de tipo Sentencia y estado Aprobado", error);
            res.status(500).json({
                message: "Error al obtener los expedientes de tipo Sentencia y estado Aprobado",
                error: error.message,
            });
        }
    },


    // Obtener expedientes de tipo "Resolución" y estado "Aprobado"
    getResolucionesAprobadas: async (req, res) => {
        try {
            const expedientes = await Expediente.findAll({
                where: {
                    id_tipo_expediente: await TipoExpediente.findOne({
                        where: { nombre: "Resolución" },
                    }).then((tipo) => tipo.id),
                    id_estado: await Estado.findOne({ where: { nombre: "Aprobado" } }).then((estado) => estado.id),
                },
                include: [
                    { model: TipoExpediente, attributes: ["id", "nombre"] },
                    { model: Estado, attributes: ["id", "nombre"] },
                ],
            });
            res.status(200).json(expedientes);
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener los expedientes de tipo Resolución y estado Aprobado",
                error: error.message,
            });
        }
    },
};

module.exports = expedienteController;
