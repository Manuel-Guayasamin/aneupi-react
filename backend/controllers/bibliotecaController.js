const { Where } = require("sequelize/lib/utils");
const { Biblioteca, TipoBiblioteca, Usuario, Estado } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const bibliotecaController = {
  // Obtener todos los archivos de la biblioteca
  getAllBiblioteca: async (req, res) => {
    const { q, tipo } = req.query;
    const where = {};

    if (q) {
      where[Op.or] = [
        { titulo: { [Op.like]: `%${q}%` } },
        { nombre_autor: { [Op.like]: `%${q}%` } },
        { editorial: { [Op.like]: `%${q}%` } },
      ];
    }

    if (tipo) {
      where.id_tipo_biblioteca = tipo;
    }

    try {
      const bibliotecas = await Biblioteca.findAll({
        Where,
        include: [
          { model: TipoBiblioteca, attributes: ["id", "nombre"] },
          {
            model: Usuario,
            attributes: ["id", "nombres", "apellidos", "email"],
          },
          { model: Estado, attributes: ["id", "nombre"] },
        ],
      });
      res.status(200).json(bibliotecas);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los archivos de la biblioteca",
        error: error.message,
      });
    }
  },

  // Crear un nuevo archivo en la biblioteca
  createBiblioteca: async (req, res) => {
    try {
      //   const {
      //     titulo,
      //     nombre_autor,
      //     fecha_publicacion,
      //     editorial,
      //     descripcion,
      //     id_tipo_biblioteca,
      //   } = req.body;

      const archivos = req.files["archivo"][0].path.replace(/\\/g, "/");
      const imagens = req.files["imagen"][0].path.replace(/\\/g, "/");

      console.log(
        "====== Imagen: ",
        imagens,
        " | Archivo: ",
        archivos,
        " ======"
      );

      const nuevoBiblioteca = await Biblioteca.create({
        // titulo,

        // nombre_autor,
        // fecha_publicacion,
        // editorial,
        // descripcion,
        imagen: imagens,
        archivo: archivos,

        id_estado: 1,
        ...req.body,
      });

      res.status(201).json(nuevoBiblioteca);
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el archivo en la biblioteca",
        error: error.message,
      });
    }
  },

  // Obtener un archivo de la biblioteca por su ID
  getBibliotecaById: async (req, res) => {
    const { id } = req.params;
    try {
      const biblioteca = await Biblioteca.findByPk(id, {
        include: [
          { model: TipoBiblioteca, attributes: ["nombre"] },
          { model: Usuario, attributes: ["nombres", "email"] },
          { model: Estado, attributes: ["nombre"] },
        ],
      });
      if (biblioteca) {
        res.json(biblioteca);
      } else {
        res
          .status(404)
          .json({ message: "Archivo de la biblioteca no encontrado" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el archivo de la biblioteca",
        error: error.message,
      });
    }
  },

  // Actualizar un archivo en la biblioteca por su ID
  updateBiblioteca: async (req, res) => {
    const { id } = req.params;
    try {
      const biblioteca = await Biblioteca.findByPk(id);
      if (!biblioteca) {
        return res
          .status(404)
          .json({ message: "Archivo de la biblioteca no encontrado" });
      }

      biblioteca.update(req.body);
      res.json(biblioteca);
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el archivo en la biblioteca",
        error: error.message,
      });
    }
  },

  // Eliminar un archivo de la biblioteca por su ID
  // deleteBiblioteca: async (req, res) => {
  //   const { id } = req.params;
  //   try {
  //     const biblioteca = await Biblioteca.findByPk(id);
  //     if (biblioteca) {
  //       await biblioteca.destroy();
  //       res.json({
  //         message: "Archivo de la biblioteca eliminado correctamente",
  //       });
  //     } else {
  //       res
  //         .status(404)
  //         .json({ message: "Archivo de la biblioteca no encontrado" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Error al eliminar el archivo de la biblioteca",
  //       error: error.message,
  //     });
  //   }
  // },
  getArticulos: async(req,res) =>{
    const { q, tipo } = req.query;
    const where = {};

    if (q) {
      
      where[Op.or] = [
        { titulo: { [Op.like]: `%${q}%` } },
        { nombre_autor: { [Op.like]: `%${q}%` } },
        { editorial: { [Op.like]: `%${q}%` } },
      ];
    }

    if (tipo) {
      where.id_tipo_biblioteca = tipo;
    }
    try {
      const bibliotecas = await Biblioteca.findAll({
        where: new Where({ id_estado: 2 }),
        include: [
          {
            model: TipoBiblioteca,
            attributes: ["id", "nombre"],
            where: {
              id: 2,
              nombre: "Artículo",
            },
          },
          {
            model: Usuario,
            attributes: ["id", "nombres", "apellidos", "email"],
          },
          {
            model: Estado,
            attributes: ["id", "nombre"],
          },
        ],
      });
      res.status(200).json(bibliotecas);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los archivos de la biblioteca",
        error: error.message,
      });
    }
  },
  getRevistas: async(req,res) =>{
    const { q, tipo } = req.query;
    const where = {};

    if (q) {
      where[Op.or] = [
        { titulo: { [Op.like]: `%${q}%` } },
        { nombre_autor: { [Op.like]: `%${q}%` } },
        { editorial: { [Op.like]: `%${q}%` } },
      ];
    }

    if (tipo) {
      where.id_tipo_biblioteca = tipo;
    }
    try {
      const bibliotecas = await Biblioteca.findAll({
        where: new Where({ id_estado: 2 }),
        include: [
          {
            model: TipoBiblioteca,
            attributes: ["id", "nombre"],
            where: {
              id: 3,
              nombre: "Revista",
            },
          },
          {
            model: Usuario,
            attributes: ["id", "nombres", "apellidos", "email"],
          },
          {
            model: Estado,
            attributes: ["id", "nombre"],
          },
        ],
      });
      res.status(200).json(bibliotecas);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los archivos de la biblioteca",
        error: error.message,
      });
    }
  },
  getLibros: async(req,res) =>{
    const { q, tipo } = req.query;
    const where = {};

    if (q) {
      where[Op.or] = [
        { titulo: { [Op.like]: `%${q}%` } },
        { nombre_autor: { [Op.like]: `%${q}%` } },
        { editorial: { [Op.like]: `%${q}%` } },
      ];
    }

    try {
      const bibliotecas = await Biblioteca.findAll({
        where: new Where({ id_estado: 2 }),
        include: [
          {
            model: TipoBiblioteca,
            attributes: ["id", "nombre"],
            where: {
              id: 1,
              nombre: "Libro",
            },
          },
          {
            model: Usuario,
            attributes: ["id", "nombres", "apellidos", "email"],
          },
          {
            model: Estado,
            attributes: ["id", "nombre"],
          },
        ],
      });
      res.status(200).json(bibliotecas);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los archivos de la biblioteca",
        error: error.message,
      });
    }
  },
  deleteBiblioteca: async (req, res) => {
    try {
      const biblioteca = await Biblioteca.findByPk(req.params.id);
      if (!biblioteca) {
        return res.status(404).json({ error: "Biblioteca no encontrada" });
      }

      // Obtener las rutas de portada y archivo y eliminarlos del sistema de archivos si existen
      if (biblioteca.imagen) {
        const rutaPortada = biblioteca.imagen.replace(/\\/g, "/"); // Replace backslashes with slashes
        const portadaPath = path.join(__dirname, "..", rutaPortada);
        if (fs.existsSync(portadaPath)) {
          fs.unlinkSync(portadaPath); // Eliminar la portada del sistema de archivos
        }
      }

      if (biblioteca.archivo) {
        const rutaArchivo = biblioteca.archivo.replace(/\\/g, "/"); // Replace backslashes with slashes
        const archivoPath = path.join(__dirname, "..", rutaArchivo);
        if (fs.existsSync(archivoPath)) {
          fs.unlinkSync(archivoPath); // Eliminar el archivo del sistema de archivos
        }
      }

      await biblioteca.destroy();
      res
        .status(200)
        .json({ mensaje: "Archivo de la biblioteca eliminado correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Ocurrió un error al eliminar el archivo de la biblioteca",
      });
    }
  },
};

module.exports = bibliotecaController;
