const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destination = "";
    if (req.baseUrl.includes("/eventos")) {
      destination = "uploads/eventos"; // Destination directory for eventos
    } else if (req.baseUrl.includes("/convenios")) {
      destination = "uploads/convenios";
    } else if (req.baseUrl.includes("/postulantes")) {
      destination = "uploads/curriculums"; // Destination directory for postulantes
    } else if (req.baseUrl.includes("/solicitar-practicas")) {
      destination = "uploads/curriculums"; // Destination directory for solicitar-practicas
    } else if (req.baseUrl.includes("/evento-usuarios")) {
      // Destination directory based on file field name
      if (file.fieldname === "comprobante") {
        destination = "uploads/comprobantes";
      } else if (file.fieldname === "curriculum") {
        destination = "uploads/curriculums";
      } else if (file.fieldname === "ponencia") {
        destination = "uploads/ponencias";
      } else if (file.fieldname === "carnet") {
        destination = "uploads/carnets";
      }
    } else if (req.baseUrl.includes("/bibliotecas")) {
      if (file.fieldname === "archivo") {
        destination = "uploads/bibliotecas/archivos";
      } else if (file.fieldname === "imagen") {
        destination = "uploads/bibliotecas/portadas";
      }
    } else if (req.baseUrl.includes("/expedientes")) {
      if (file.fieldname === "archivo_url") {
        destination = "uploads/expedientes/archivos";
      } else if (file.fieldname === "certificado_url") {
        destination = "uploads/expedientes/certificados";
      } else if (file.fieldname === "comprobante_url") {
        destination = "uploads/expedientes/comprobantes";
      }
    }

    // Crear el directorio de destino si no existe
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ""); // Get current date in YYYYMMDD format
    const uniqueSuffix = Math.round(Math.random() * 1e9); // Generate a random number
    const fileName = `${formattedDate}-${uniqueSuffix}${path.extname(
      file.originalname
    )}`; // Append original file extension
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (req.baseUrl.includes("/bibliotecas")) {
    if (file.fieldname === "archivo" && file.mimetype !== "application/pdf") {
      cb(new Error("Solo se permite subir archivos PDF en la biblioteca"), false);
    } else if (file.fieldname === "imagen" && !file.mimetype.startsWith("image")) {
      cb(new Error("Solo se permiten imágenes para la portada"), false);
    } else {
      cb(null, true);
    }
  } else if (req.baseUrl.includes("/expedientes")) {
    if (file.fieldname === "archivo_url" && file.mimetype !== "application/pdf") {
      cb(new Error("Solo se permite subir archivos PDF para expedientes"), false);
    } else if (file.fieldname === "certificado_url" && file.mimetype !== "application/pdf") {
      cb(new Error("Solo se permite subir archivos PDF para certificados"), false);
    } else if (file.fieldname === "comprobante_url" && !file.mimetype.startsWith("image")) {
      cb(new Error("Solo se permiten imágenes para comprobantes"), false);
    } else {
      cb(null, true);
    }
  } else {
    cb(null, true);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

module.exports = upload;
