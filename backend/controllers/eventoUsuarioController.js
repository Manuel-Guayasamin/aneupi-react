const {
  EventoUsuario,
  Usuario,
  Evento,
  Ponente,
  Asistente,
} = require("../models");
const nodemailer = require("nodemailer");
const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;

// Create a transporter with your SMTP settings
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
    console.error("Error verifying transporter:", error);
  } else {
    console.log("Transporter is ready to send emails evento usuarios");
  }
});

const eventoUsuarioController = {
  // Obtener todas las inscripciones de eventos de un usuario
  getEventosUsuario: async (req, res) => {
    const { id_usuario } = req.params;
    try {
      const eventosUsuario = await EventoUsuario.findAll({
        where: { id_usuario },
        include: [{ model: Evento }],
      });
      res.status(200).json(eventosUsuario);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las inscripciones de eventos del usuario",
        error: error.message,
      });
    }
  },

  // Método para verificar si un usuario está inscrito en un evento
  verificarInscripcionUsuarioEvento: async (req, res) => {
    const { id_usuario, codigo_evento } = req.params;
    try {
      // Primero buscamos el evento asociado al código proporcionado
      const evento = await Evento.findOne({
        where: { codigo: codigo_evento },
      });

      if (!evento) {
        return res
          .status(404)
          .json({
            message:
              "No se encontró el evento asociado al código proporcionado",
          });
      }

      // Luego verificamos si el usuario está inscrito en ese evento
      const inscripcionExistente = await EventoUsuario.findOne({
        where: { id_usuario, id_evento: evento.id },
      });

      if (inscripcionExistente) {
        res.status(200).json({ inscrito: true });
      } else {
        res.status(200).json({ inscrito: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error al verificar inscripción del usuario en el evento",
        error: error.message,
      });
    }
  },

  // Inscribir a un usuario en un evento
  // Update the inscribirUsuarioEvento controller to handle both regular users and Ponentes
  inscribirUsuarioEvento: async (req, res) => {
    const { id_usuario, codigo, tipoInscripcion, ...inscripcionData } =
      req.body;

    try {
      // Verificar si el evento existe
      const evento = await Evento.findOne({ where: { codigo } });
      if (!evento) {
        return res.status(404).json({ message: "El evento no existe" });
      }

      // Verificar si el usuario existe
      const usuario = await Usuario.findByPk(id_usuario);
      if (!usuario) {
        return res.status(404).json({ message: "El usuario no existe" });
      }

      // Verificar si el usuario ya está inscrito en el evento
      const inscripcionExistente = await EventoUsuario.findOne({
        where: { id_usuario, id_evento: evento.id },
      });

      if (inscripcionExistente) {
        return res
          .status(400)
          .json({ message: "El usuario ya está inscrito en este evento" });
      }

      // Guardar la URL del comprobante si se proporciona
      let comprobantePath = ""; // Initialize comprobantePath
      let curriculumPath = ""; // Initialize curriculumPath
      let ponenciaPath = ""; // Initialize ponenciaPath
      let carnetPath = ""; // Initialize ponenciaPath

      if (req.files) {
        // Check if files are uploaded
        if (req.files["comprobante"]) {
          comprobantePath = req.files["comprobante"][0].path.replace(
            /\\/g,
            "/"
          );
        }
        if (req.files["curriculum"]) {
          curriculumPath = req.files["curriculum"][0].path.replace(/\\/g, "/");
        }
        if (req.files["ponencia"]) {
          ponenciaPath = req.files["ponencia"][0].path.replace(/\\/g, "/");
        }
        if (req.files["carnet"]) {
          carnetPath = req.files["carnet"][0].path.replace(/\\/g, "/");
        }
      }

      // Crear la nueva inscripción de evento con la fecha de inscripción actual y la URL del comprobante
      let nuevaInscripcion;

      // Update the user data in the database
      usuario.ocupacion = inscripcionData.ocupacion;
      usuario.pais = inscripcionData.pais;
      usuario.direccion = inscripcionData.direccion;
      usuario.has_discapacidad = inscripcionData.has_discapacidad;

      // Save the changes to the usuario object
      await usuario.save();

      // Verify if the changes are reflected in the database
      const updatedUsuario = await Usuario.findByPk(id_usuario);
      console.log(updatedUsuario); // Check if the changes are reflected

      if (tipoInscripcion === "ponente") {
        // First, create the Ponente
        const ponente = await Ponente.create({
          id_usuario,
          tematica: inscripcionData.tematica,
          objetivo: inscripcionData.objetivo,
          ponencia_url: ponenciaPath,
          curriculum_url: curriculumPath,
        });

        // Then, create the EventoUsuario
        nuevaInscripcion = await EventoUsuario.create({
          id_usuario: ponente.id_usuario,
          id_evento: evento.id,
          fecha_inscripcion: new Date(),
          comprobante_url: comprobantePath,
        });
      } else {
        // Create the Asistente
        const asistente = await Asistente.create({
          id_usuario,
          tipo_asistente: inscripcionData.ocupacion,
          ...inscripcionData,
        });

        // Handle regular user data
        nuevaInscripcion = await EventoUsuario.create({
          id_usuario: asistente.id_usuario,
          id_evento: evento.id,
          fecha_inscripcion: new Date(),
          comprobante_url: comprobantePath,
        });
      }

      // Send confirmation email
      const mailOptions = {
        from: EMAIL,
        to: usuario.email, // Use the user's email address here
        subject: "Inscripción Exitosa",
        html: `
        <html>
            <head>
            </head>
            <body>
                <div class="bg-gray-100 p-6">
                    <h1 class="text-2xl font-bold mb-4">Inscripción Exitosa</h1>
                    <p>Su inscripción al Evento ha sido exitosa. Gracias por registrarse.</p>
										<a href="https://aneupi.com/">Sitio Web: Fundación ANEUPI</a>
										<a href="https://api.whatsapp.com/send?phone=593983341084">WhatsApp: Fundación ANEUPI</a>
                </div>
            </body>
        </html>
    `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res.status(201).json(nuevaInscripcion);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          message: "Error al inscribir al usuario en el evento",
          error: error.message,
        });
    }
  },

  // Desinscribir a un usuario de un evento
  cancelarInscripcion: async (req, res) => {
    const { id } = req.params; // ID de la inscripción de evento
    try {
      // Buscar la inscripción de evento por su ID
      const inscripcionEvento = await EventoUsuario.findByPk(id);
      if (!inscripcionEvento) {
        return res
          .status(404)
          .json({ message: "Inscripción de evento no encontrada" });
      }

      // Eliminar la inscripción de evento
      await inscripcionEvento.destroy();
      res
        .status(200)
        .json({ message: "Usuario desinscrito correctamente del evento" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al desinscribir al usuario del evento",
          error: error.message,
        });
    }
  },
};

module.exports = eventoUsuarioController;
