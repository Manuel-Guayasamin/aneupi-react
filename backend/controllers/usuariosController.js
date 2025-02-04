const { Usuario } = require('../models');
const { Rol } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const usuariosController = {
	// Crear un nuevo usuario
	createUsuario: async (req, res) => {
		try {
			const { identificacion, nombreUsuario, nombres, apellidos, email, telefono, password, id_rol } = req.body;

			// Verifica si se proporcionaron todos los campos necesarios
			if (
				!nombreUsuario ||
				!nombres ||
				!apellidos ||
				!email ||
				!password ||
				!identificacion ||
				!telefono ||
				!id_rol
			) {
				return res.status(400).json({
					message: 'Por favor, proporciona todos los campos necesarios',
				});
			}

			// Check if the identification, username, or email already exist in the database
			const existingUser = await Usuario.findOne({
				where: {
					[Op.or]: [{ identificacion }, { nombreUsuario }, { email }],
				},
			});

			if (existingUser) {
				// If any of the fields already exist, return a 400 Bad Request response with the appropriate message
				return res.status(400).json({
					message: 'La identificación, nombre de usuario o correo electrónico ya están en uso',
				});
			}

			// Hashea la contraseña antes de almacenarla en la base de datos
			const hashedPassword = await bcrypt.hash(password, 10);

			// If no existing user found, proceed with creating the user
			const nuevoUsuario = await Usuario.create({
				identificacion,
				nombreUsuario,
				nombres,
				apellidos,
				email,
				password: hashedPassword,
				telefono,
				id_rol,
			});
			res.status(201).json(nuevoUsuario);
		} catch (error) {
			console.error(error);
			// Handle other errors like database connection issues
			res.status(500).json({ message: 'Error al crear usuario', error: error.message });
		}
	},

	// Obtener todos los usuarios
	getUsuarios: async (req, res) => {
		try {
			const page = req.query.page || 1;
			const pageSize = req.query.pageSize || 10;
			// Calcular el offset
			const offset = (page - 1) * pageSize;
			const usuarios = await Usuario.findAndCountAll({
				attributes: [
					'id',
					'identificacion',
					'nombreUsuario',
					'nombres',
					'apellidos',
					'email',
					'telefono',
					'id_rol',
				],
				include: {
					model: Rol,
					attributes: ['nombre'],
				},
				order: [['createdAt', 'DESC']],
				limit: pageSize,
				offset: offset,
			});

			// Calcular el número total de páginas
			const totalPages = Math.ceil(usuarios.count / pageSize);
			// Devolver los resultados paginados en la respuesta
			res.json({
				totalPages: totalPages,
				currentPage: page,
				pageSize: pageSize,
				totalItems: usuarios.count,
				usuarios: usuarios.rows,
			});
		} catch (error) {
			res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
		}
	},

	getAllUsuarios: async (req, res) => {
		try {
			const usuarios = await Usuario.findAll({
				attributes: {
					exclude: ['password'], // Excluir el campo de contraseña de la respuesta
				},
				include: {
					model: Rol, // Suponiendo que Rol es el modelo de la tabla de roles
					attributes: ['nombre'], // Seleccionamos solo el atributo nombre del rol para incluir en la respuesta
				},
				order: [['createdAt', 'DESC']],
			});
			res.json(usuarios);
		} catch (error) {
			res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
		}
	},

	// Obtener un usuario por su ID
	getUsuarioById: async (req, res) => {
		const { id } = req.params;
		try {
			const usuario = await Usuario.findByPk(id);
			if (usuario) {
				res.json(usuario);
			} else {
				res.status(404).json({ message: 'Usuario no encontrado' });
			}
		} catch (error) {
			res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
		}
	},

	// Actualizar un usuario por su ID
	updateUsuario: async (req, res) => {
		const { id } = req.params;
		try {
			const { identificacion, nombreUsuario, email } = req.body;

			// Check if the identification, username, or email already exist in the database
			const existingUser = await Usuario.findOne({
				where: {
					[Op.or]: [{ identificacion }, { nombreUsuario }, { email }],
				},
			});

			if (existingUser && existingUser.id !== parseInt(id, 10)) {
				// If any of the fields already exist, return a 400 Bad Request response with the appropriate message
				return res.status(400).json({
					message: 'La identificación, nombre de usuario o correo electrónico ya están en uso',
				});
			}

			const [numFilasActualizadas, usuariosActualizados] = await Usuario.update(req.body, {
				where: { id },
				returning: true, // Devolver los registros actualizados
			});
			if (numFilasActualizadas) {
				res.json(usuariosActualizados[0]);
			} else {
				res.status(404).json({ message: 'Usuario no encontrado' });
			}
		} catch (error) {
			res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
		}
	},

	// Eliminar un usuario por su ID
	deleteUsuario: async (req, res) => {
		const { id } = req.params;
		try {
			const numFilasEliminadas = await Usuario.destroy({ where: { id } });
			if (numFilasEliminadas) {
				res.json({ message: 'Usuario eliminado exitosamente' });
			} else {
				res.status(404).json({ message: 'Usuario no encontrado' });
			}
		} catch (error) {
			res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
		}
	},

	searchUsuariosByCedula: async (req, res) => {
		const { identificacion } = req.params;
		try {
			const usuarios = await Usuario.findAll({
				where: {
					identificacion: {
						[Op.like]: `%${identificacion}%`,
					},
				},
				include: {
					model: Rol,
					attributes: ['nombre'],
				},
				order: [['createdAt', 'DESC']],
				attributes: ['id', 'identificacion', 'nombreUsuario', 'nombres', 'apellidos', 'email', 'id_rol'],
			});
			res.json(usuarios);
		} catch (error) {
			res.status(500).json({
				message: 'Error al buscar usuarios por identificacion',
				error: error.message,
			});
		}
	},
};

module.exports = usuariosController;
