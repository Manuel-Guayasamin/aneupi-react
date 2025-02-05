const express = require("express");
const fs = require("fs");
const authRoutes = require("../routes/authRoutes");
const modalidadRoutes = require("../routes/eventos/modalidadRoutes");
const estadoRoutes = require("../routes/eventos/estadoRoutes");
const usuarioRoutes = require("../routes/usuarios/usuariosRoutes");
const eventoRoutes = require("../routes/eventos/eventoRoutes");
const eventoUsuarioRoutes = require("../routes/eventoUsuario/eventoUsuarioRoutes");
const practicaRoutes = require("../routes/practicas/practicaRoutes");
const tipopracticaRoutes = require("../routes/practicas/tipopracticaRoutes");
const contactoRoutes = require("../routes/contactos/contactoRoutes");
const trabajoRoutes = require("../routes/trabajos/trabajoRoutes");
const postulanteRoutes = require("../routes/postulantes/postulanteRoutes");
const servicioRoutes = require("../routes/servicio/servicioRoutes");
const serviciolineaRoutes = require("../routes/serviciolinea/serviciolineaRoutes");
const tipoconvenioRoutes = require("../routes/tipoconvenio/tipoconvenioRoutes");
const convenioRoutes = require("../routes/convenio/convenioRoutes");
const postulantesExternosRoutes = require("../routes/postulanteexterno/postulanteExternoRoutes");
const solicitarPracticasRoutes = require("../routes/solicitudPracrica/solicitudPracricaRoutes");
const tipoBibliotecaRoutes = require("../routes/tipobiblioteca/tipoBibliotecaRoutes");
const bibliotecaRoutes = require("../routes/biblioteca/bibliotecaRoutes");
const servicioCitaRoutes = require("../routes/servicioCita/servicioCitaRoutes");
const paisRoutes = require("../routes/pais/paisRoutes");
const ciudadRoutes = require("../routes/ciudad/ciudadRoutes");
const inscripcionEventoRoutes = require("../routes/eventos/inscripcionEventoRoutes");
const reportesRoute = require("../routes/reportes/reportesRoute");
const ponenteRoutes = require("./routes/ponentes/ponenteRoutes");
const asistentesRoutes = require("./routes/asistentes/asistentesRoutes");


const cors = require("cors");
const path = require("path");
const axios = require("axios");

const app = express();

// const uploadsDirectory = path.join(__dirname, "uploads");

// // Verificar si la carpeta uploads existe, si no, crearla
// if (!fs.existsSync(uploadsDirectory)) {
//   fs.mkdirSync(uploadsDirectory);
// }

// // Ruta para servir archivos estáticos desde la carpeta de uploads
// app.use("/uploads", express.static(uploadsDirectory));

// Permitir solicitudes CORS desde todos los orígenes

// Aplicar el middleware de CORS con las opciones específicas
app.use(cors());

// Manejar solicitudes pre-flight (OPTIONS) para todas las rutas

// Middleware para analizar cuerpos de solicitud en formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de autenticación
app.use("/api/auth", authRoutes);

//ruta de prueba
app.get("/api/prueba", (req, res) => res.send("Express on Vercel"));

// Rutas de eventos
app.use("/api/estados", estadoRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/modalidades", modalidadRoutes);

// Rutas de usuarios
app.use("/api/usuarios", usuarioRoutes);

// Rutas de eventos
app.use("/api/eventos", eventoRoutes);

// Rutas de eventos
app.use("/api/evento-usuarios", eventoUsuarioRoutes);

//Ruta de inscripcón de eventos
app.use("/api/inscripciones", inscripcionEventoRoutes);

// Rutas de practicas
app.use("/api/practicas", practicaRoutes);

// Rutas de tipo de practicas
app.use("/api/tipopracticas", tipopracticaRoutes);

// Rutas de contactos
app.use("/api/contactos", contactoRoutes);

// Rutas de trabajos
app.use("/api/trabajos", trabajoRoutes);

// Rutas de postulantes
app.use("/api/postulantes", postulanteRoutes);

// Rutas de solicitar practicas
app.use("/api/solicitar-practicas", solicitarPracticasRoutes);

// Rutas de postulantes externos
app.use("/api/postulantes-externos", postulantesExternosRoutes);

// Rutas de Servicio
app.use("/api/servicios", servicioRoutes);

// Rutas de Servicio en linea
app.use("/api/serviciolineas", serviciolineaRoutes);

// Ruta de Citas
app.use("/api/servicios-citas", servicioCitaRoutes);

// Ruta para Pais
app.use("/api/paises", paisRoutes);

// Ruta de Ciudad
app.use("/api/ciudades", ciudadRoutes);

// Rutas de Tipo de Convenio
app.use("/api/tipoconvenios", tipoconvenioRoutes);

// Rutas de Convenios
app.use("/api/convenios", convenioRoutes);

// Rutas de Biblioteca
app.use("/api/bibliotecas", bibliotecaRoutes);
app.use("/api/reportes", reportesRoute);
// Rutas de TipoBiblioteca
app.use("/api/tipo-bibliotecas", tipoBibliotecaRoutes);
// Agregar la ruta de ponentes
app.use("/api/ponentes", ponenteRoutes)
// Agregar la ruta de asistentes
app.use("/api/asistentes", asistentesRoutes)

// Middleware para permitir solicitudes CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Ruta para pasar la solicitud a PayPhone
app.post("/api/payphone", async (req, res) => {
  try {
    const authorizationToken = req.headers.authorization;

    // Hacer la solicitud a PayPhone
    const response = await axios.post(
      "https://pay.payphonetodoesposible.com/api/Links",
      req.body,
      {
        headers: {
          Authorization: authorizationToken,
        },
      }
    );

    // Pasar la respuesta de PayPhone de vuelta al cliente
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado correctamente en el puerto ${PORT}`);
});

module.exports = app;
