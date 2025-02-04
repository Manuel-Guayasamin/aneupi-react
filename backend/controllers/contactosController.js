// controllers/contactoController.js

const { configDotenv } = require("dotenv");
const { Contacto, Pais } = require("../models");
const z = require("zod");
// Método para crear un nuevo contacto

const ContactoSchema = z.object({
  nombres: z.string(),
  apellidos: z.string(),
  telefono: z.string(),
  email: z.string().email(),
  mensaje: z.string(),
  pais_id: z.coerce.number().positive(),
  ciudad: z.string(),
});

exports.crearContacto = async (req, res) => {
  try {
    console.log(req.body);

    const result = ContactoSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
      });
    }

    const data = {
      nombres: result.data.nombres,
      apellidos: result.data.apellidos,
      telefono: result.data.telefono,
      email: result.data.email,
      mensaje: result.data.mensaje,
      pais_id: result.data.pais_id,
      ciudad: result.data.ciudad,
    };

    const has_discapacidad = data.discapacidad === "true" ? true : false;

    const contactoNuevo = {
      ...data,
      discapacidad: has_discapacidad,
    };

    const nuevoContacto = await Contacto.create(contactoNuevo);
    res.status(201).json({
      mensaje: "Contacto creado correctamente",
      contacto: nuevoContacto,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener todos los contactos
exports.obtenerContactos = async (req, res) => {
  try {
    const contactos = await Contacto.findAll({
      include: [{ model: Pais, atributes: ["id", "nombre"] }],
    });
    res.status(200).json(contactos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los contactos" });
  }
};

// Método para obtener un contacto por su ID
exports.obtenerContactoPorId = async (req, res) => {
  try {
    const contacto = await Contacto.findByPk(req.params.id);
    if (!contacto) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }
    res.status(200).json(contacto);
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al obtener el contacto" });
  }
};

// Método para actualizar un contacto
exports.actualizarContacto = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      telefono,
      email,
      asunto,
      mensaje,
      pais_id,
      discapacidad,
      ciudad,
    } = req.body;

    const ContactoSchema = z.object({
      nombres: z.string(),
      apellidos: z.string(),
      telefono: z.string(),
      email: z.string().email(),
      asunto: z.string(),
      mensaje: z.string(),
      pais_id: z.coerce.number().positive(),
      discapacidad: z.string(),
      ciudad: z.string(),
    });

    const result = ContactoSchema.safeParse({
      nombres,
      apellidos,
      telefono,
      email,
      asunto,
      mensaje,
      pais_id,
      discapacidad,
      ciudad,
    });

    if (!result.success) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
      });
    }

    const data = {
      nombres: result.data.nombres,
      apellidos: result.data.apellidos,
      telefono: result.data.telefono,
      email: result.data.email,
      asunto: result.data.asunto,
      mensaje: result.data.mensaje,
      pais_id: result.data.pais_id,
      discapacidad: result.data.discapacidad,
      ciudad: result.data.ciudad,
    };

    const has_discapacidad = data.discapacidad === "true" ? true : false;

    const updatedContacto = {
      ...data,
      discapacidad: has_discapacidad,
    };

    const contacto = await Contacto.findByPk(req.params.id);
    if (!contacto) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }
    await contacto.update(updatedContacto);
    res.status(200).json({ mensaje: "Contacto actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para eliminar un contacto
exports.eliminarContacto = async (req, res) => {
  try {
    const contacto = await Contacto.findByPk(req.params.id);
    if (!contacto) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }
    await contacto.destroy();
    res.status(200).json({ mensaje: "Contacto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error al eliminar el contacto" });
  }
};
