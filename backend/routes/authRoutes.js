const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { Usuario } = require('../models'); // Importa el modelo Usuario

// Configura el transporte de correo electrónico
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD,
	},
	tls: { rejectUnauthorized: false }
});

const router = express.Router();

// Ruta de inicio de sesión
router.post('/iniciar_sesion', async (req, res) => {
	try {
		const { email, password } = req.body;

		// Verifica si se proporcionaron todos los campos necesarios
		if (!email || !password) {
			return res.status(400).json({
				message: 'Por favor, proporciona un correo electrónico y una contraseña',
			});
		}

		// Busca el usuario en la base de datos por su correo electrónico
		const usuario = await Usuario.findOne({ where: { email } });

		// Si el usuario no existe, responde con un mensaje de error
		if (!usuario) {
			return res.status(401).json({ message: 'Credenciales inválidas' });
		}

		// Verifica si la contraseña proporcionada coincide con la contraseña almacenada
		const contraseñaValida = await bcrypt.compare(password, usuario.password);

		// Si las contraseñas no coinciden, responde con un mensaje de error
		if (!contraseñaValida) {
			return res.status(401).json({ message: 'Credenciales inválidas' });
		}

		// Si las credenciales son válidas, responde con un mensaje de éxito
		res.status(200).json({
			message: 'Inicio de sesión exitoso',
			usuario: {
				id: usuario.id,
				nombreUsuario: usuario.nombreUsuario,
				nombres: usuario.nombres,
				apellidos: usuario.apellidos,
				email: usuario.email,
				id_rol: usuario.id_rol,
				telefono: usuario.telefono,
			},
		});
	} catch (error) {
		console.error('Error al iniciar sesión:', error);
		res.status(500).json({ message: 'Error interno del servidor' });
	}
});

// Ruta de registro
router.post('/registrarse', async (req, res) => {
	try {
		const { nombreUsuario, nombres, apellidos, email, telefono, password, identificacion } = req.body;

		// Verifica si se proporcionaron todos los campos necesarios
		if (!nombreUsuario || !nombres || !apellidos || !email || !password || !identificacion || !telefono) {
			return res.status(400).json({
				message: 'Por favor, proporciona todos los campos necesarios',
			});
		}

		// Verifica si ya existe un usuario con el mismo correo electrónico o nombre de usuario
		const usuarioExistenteIdentification = await Usuario.findOne({ where: { identificacion } });
		const usuarioExistenteCorreo = await Usuario.findOne({ where: { email } });
		const usuarioExistenteNombreUsuario = await Usuario.findOne({
			where: { nombreUsuario },
		});

		if (usuarioExistenteIdentification) {
			return res.status(400).json({ message: 'La identificación ya está en uso' });
		}

		if (usuarioExistenteCorreo) {
			return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
		}

		if (usuarioExistenteNombreUsuario) {
			return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
		}

		// Hashea la contraseña antes de almacenarla en la base de datos
		const hashedPassword = await bcrypt.hash(password, 10);

		// Crea un nuevo usuario en la base de datos
		await Usuario.create({
			nombreUsuario,
			nombres,
			apellidos,
			email,
			password: hashedPassword,
			identificacion,
			telefono,
			id_rol: 2,
		});

		// Envía un correo electrónico de confirmación
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Confirmación de registro',
			text: '¡Gracias por registrarte en nuestra aplicación!',
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error('Error al enviar correo electrónico de confirmación:', error);
			} else {
				console.log('Correo electrónico de confirmación enviado:', info.response);
			}
		});

		// Responde con un mensaje de éxito
		res.status(201).json({ message: 'Usuario registrado exitosamente' });
	} catch (error) {
		console.error('Error al registrar usuario:', error);
		res.status(500).json({ message: 'Error interno del servidor' });
	}
});

module.exports = router;
