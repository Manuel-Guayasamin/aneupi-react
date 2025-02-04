const { PostulanteExterno, Estado, Modalidad, Usuario } = require("../models");
const fs = require("fs");
const path = require("path");

exports.createPostulanteExterno = async (req, res) => {
  try {
    const {
      universidad,
      descripcion,
      pais,
      ciudad,
      direccion,
      is_discapacidad,
      tipo_practica,
      fecha_inicio,
      fecha_fin,
      total_horas,
      empresa,
      id_usuario,
      id_modalidad,
    } = req.body;
    // Validar que los campos requeridos estén presentes

    const curriculumPath = req.file.path.replace(/\\/g, "/");

    const nuevoPostulanteExterno = await PostulanteExterno.create({
      universidad,
      descripcion,
      pais,
      ciudad,
      direccion,
      curriculum: curriculumPath,
      is_discapacidad,
      tipo_practica,
      fecha_inicio,
      fecha_fin,
      total_horas,
      empresa,
      id_estado: 1, // Asignar el estado por defecto
      id_usuario,
      id_modalidad,
    });

    res.status(201).json(nuevoPostulanteExterno);
    console.log(error);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPostulantesExternos = async (req, res) => {
  try {
    const postulantesExternos = await PostulanteExterno.findAll({
      include: [
        { model: Estado, attributes: ["id", "nombre"] },
        { model: Modalidad, attributes: ["id", "nombre"] },
        { model: Usuario, attributes: ["id", "nombres", "apellidos", "email"] },
      ],
    });
    res.status(200).json(postulantesExternos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los postulantes externos" });
  }
};

exports.getPostulanteExternoById = async (req, res) => {
  try {
    const postulanteExterno = await PostulanteExterno.findByPk(req.params.id);
    if (!postulanteExterno) {
      return res
        .status(404)
        .json({ error: "Postulante externo no encontrado" });
    }
    res.status(200).json(postulanteExterno);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener el postulante externo" });
  }
};

exports.updatePostulanteExterno = async (req, res) => {
  try {
    const {
      universidad,
      descripcion,
      pais,
      ciudad,
      direccion,
      curriculum,
      is_dispacidad,
      empresa,
      tipo_practica,
      fecha_inicio,
      fecha_fin,
      total_horas,
      id_estado,
    } = req.body;
    const postulanteExterno = await PostulanteExterno.findByPk(req.params.id);
    if (!postulanteExterno) {
      return res
        .status(404)
        .json({ error: "Postulante externo no encontrado" });
    }
    // Validar que los campos requeridos estén presentes
    if (
      !universidad ||
      !descripcion ||
      !pais ||
      !ciudad ||
      !direccion ||
      !curriculum ||
      !empresa ||
      !tipo_practica ||
      !fecha_inicio ||
      !fecha_fin ||
      !total_horas ||
      !id_estado
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    await postulanteExterno.update({
      universidad,
      descripcion,
      pais,
      ciudad,
      direccion,
      curriculum,
      is_dispacidad,
      empresa,
      tipo_practica,
      fecha_inicio,
      fecha_fin,
      total_horas,
      id_estado,
    });
    res
      .status(200)
      .json({ mensaje: "Postulante externo actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePostulanteExterno = async (req, res) => {
  try {
    const postulanteExterno = await PostulanteExterno.findByPk(req.params.id);
    if (!postulanteExterno) {
      return res
        .status(404)
        .json({ error: "Postulante externo no encontrado" });
    }

    await postulanteExterno.destroy();
    res
      .status(200)
      .json({ mensaje: "Postulante externo eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al eliminar el postulante externo" });
  }
};
