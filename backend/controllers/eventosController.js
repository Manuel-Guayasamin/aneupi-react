const {
  Evento,
  Estado,
  Modalidad,
  Usuario,
  EventoUsuario,
  Ponente,
  InscripcionEvento,
} = require("../models"); // Importar el modelo de Evento
const fs = require("fs");
const baseUrl = "http://localhost:5000";
const path = require("path");
const exceljs = require("exceljs");
const { uploadEventImage, deleteFile } = require("../lib/firebase");

const eventosController = {
  // Obtener todos los eventos
  getAllEventos: async (req, res) => {
    try {
      const { estadoIdNotEqual } = req.query;
      let whereOptions = {};

      // Check if estadoIdNotEqual query parameter is provided
      if (estadoIdNotEqual) {
        whereOptions = { id_estado: 2 };
      }

      const eventos = await Evento.findAll({
        where: whereOptions,
        include: [
          { model: Estado, attributes: ["id", "nombre"] },
          { model: Modalidad, attributes: ["id", "nombre"] },
          { model: Usuario, attributes: ["id", "nombreUsuario"] },
        ],
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json(eventos);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los eventos",
        error: error.message,
      });
    }
  },

  // Obtener un evento por su ID
  getEventoById: async (req, res) => {
    const { id } = req.params;
    try {
      const evento = await Evento.findOne({
        where: { id },
        include: [
          { model: Modalidad, attributes: ["id", "nombre"] }, // Incluir la modalidad del evento
          {
            model: Usuario,
            attributes: ["id", "nombreUsuario", "email", "telefono"],
          }, // Incluir el usuario del evento
        ],
      });
      if (evento) {
        res.status(200).json(evento);
      } else {
        res.status(404).json({ message: "Evento no encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener el evento", error: error.message });
    }
  },

  // Crear un nuevo evento
  createEvento: async (req, res) => {
    const {
      nombre,
      codigo,
      descripcion,
      direccion,
      costo,
      fecha_inicio,
      fecha_fin,
      participantes,
      id_modalidad,
      id_usuario,
    } = req.body;

    // Verificar si se proporcionó una imagen
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Se requiere una imagen para el evento" });
    }
    const url = await uploadEventImage(req.file);

    if (!url)
      return res.status(500).json({ message: "Error al subir la imagen" });
    try {
      const nuevoEvento = await Evento.create({
        codigo,
        nombre,
        descripcion,
        direccion,
        costo,
        imagen: url, // Almacenamos la ruta de la imagen en la base de datos
        fecha_inicio,
        fecha_fin,
        participantes,
        id_modalidad,
        id_estado: 1,
        id_usuario,
      });
      res.status(201).json(nuevoEvento);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: error.errors.map((err) => err.message) });
      }
      res.status(500).json({ message: error.message });
    }
  },

  // Actualizar un evento existente
  updateEvento: async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;

    try {
      const eventoExistente = await Evento.findByPk(id);
      if (!eventoExistente) {
        return res.status(404).json({ message: "Evento no encontrado" });
      }

      if (req.file) {
        await deleteFile(eventoExistente.imagen, "eventos/imagenes/");
        const url = await uploadEventImage(req.file);
        datosActualizados.imagen = url;
        await eventoExistente.update({
          ...datosActualizados,
          imagen: url,
        });
        return res.status(200).json(eventoExistente);
      }

      // Actualizar los datos del evento
      await eventoExistente.update(datosActualizados);
      return res.status(200).json(eventoExistente);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error al actualizar el evento",
        error: error.message,
      });
    }
  },

  // Eliminar un evento existente
  deleteEvento: async (req, res) => {
    try {
      const { id } = req.params;

      const eventoExistente = await Evento.findByPk(id, {
        raw: true,
      });

      if (eventoExistente) {
        // // Obtener la ruta de la imagen y eliminarla del sistema de archivos si existe
        // if (eventoExistente.imagen) {
        //   const rutaImagen = eventoExistente.imagen.replace(/\\/g, "/"); // Replace backslashes with slashes
        //   const imagePath = path.join(__dirname, "..", rutaImagen);
        //   fs.unlinkSync(imagePath); // Eliminar la imagen del sistema de archivos
        // }

        const imagesUrls = await InscripcionEvento.findAll({
          attributes: ["certificado_url", "comprobante_url"],
          where: { id_evento: id },
          raw: true,
        });

        // Eliminar los archivos de las personas inscritas
        if (imagesUrls.length > 0) {
          await Promise.all(
            imagesUrls.map(async (url) => {
              if (url.comprobante_url || url.certificado_url) {
                await deleteFile(
                  url.certificado_url,
                  "asistentes/certificadoDiscapacidadFiles/"
                );
                await deleteFile(
                  url.comprobante_url,
                  "asistentes/comprobanteFiles/"
                );
              }
            })
          );
        }

        const inscritos = await InscripcionEvento.findAll({
          where: { id_evento: id },
          raw: true,
        });

        if (inscritos.length > 0) {
          var numDeleted = await InscripcionEvento.destroy({
            where: { id_evento: id },
          });
        }
        await deleteFile(eventoExistente.imagen, "eventos/imagenes/");

        await Evento.destroy({
          where: { id },
        });
        res.status(200).json({
          message: `Se ha eliminado el evento "${eventoExistente.nombre}" ${
            numDeleted && "que contenía ${numDeleted} personas inscritas"
          }`,
        });
      } else {
        res.status(404).json({ message: "Evento no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al eliminar el evento", error: error.message });
    }
  },

  generateExcel: async (req, res) => {
    const { id } = req.params;

    try {
      const evento = await Evento.findOne({
        where: { id },
      });

      if (!evento) {
        return res.status(404).json({ message: "Event not found" });
      }

      const eventoUsuarios = await EventoUsuario.findAll({
        where: { id_evento: id }, // Filter by the event's id
        include: [{ model: Usuario }], // Include the Usuario model
      });

      // Generate Excel workbook
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet("Users");

      // Add headers
      worksheet.columns = [
        { header: "Evento", key: "evento", width: 30 }, // Add event name column
        { header: "Identificacion", key: "identificacion", width: 20 },
        { header: "Nombre de Usuario", key: "usuario", width: 20 },
        { header: "Nombres", key: "nombres", width: 20 },
        { header: "Apellidos", key: "apellidos", width: 20 },
        { header: "Email", key: "email", width: 30 },
        { header: "Telefono", key: "telefono", width: 20 },
        { header: "Comprobante URL", key: "comprobante_url", width: 30 },
        { header: "Curriculum URL", key: "curriculum_url", width: 30 },
        { header: "Ponencia URL", key: "ponencia_url", width: 30 },
      ];

      const data = await Promise.all(
        eventoUsuarios.map(async (eventoUsuario) => {
          const ponente = await Ponente.findByPk(eventoUsuario.Usuario.id);
          let curriculumUrl = "";
          let ponenciaUrl = "";

          if (ponente) {
            curriculumUrl =
              process.env.DOMAIN_URL + "/" + ponente.curriculum_url;
            ponenciaUrl = process.env.DOMAIN_URL + "/" + ponente.ponencia_url;
          }

          return {
            evento: evento.nombre,
            identificacion: eventoUsuario.Usuario.identificacion,
            usuario: eventoUsuario.Usuario.nombreUsuario,
            nombres: eventoUsuario.Usuario.nombres,
            apellidos: eventoUsuario.Usuario.apellidos,
            email: eventoUsuario.Usuario.email,
            telefono: eventoUsuario.Usuario.telefono,
            comprobante_url:
              process.env.DOMAIN_URL + "/" + eventoUsuario.comprobante_url,
            curriculum_url: curriculumUrl,
            ponencia_url: ponenciaUrl,
          };
        })
      );

      // Loop through the data and add rows to the worksheet
      worksheet.addRows(data);

      // Set response headers
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");

      // Send Excel file
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error("Error generating Excel:", error);
      res.status(500).json({ message: "Error generating Excel document" });
    }
  },
};

module.exports = eventosController;
