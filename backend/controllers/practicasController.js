const { Practica, Modalidad, PostulanteSolicitud, Postulante } = require('../models');
const exceljs = require('exceljs');

const practicasController = {
	// Obtener los campos de todas las Practicas

	getAllPracticas: async (req, res) => {
		try {
			const practicas = await Practica.findAll({
				attributes: [
					'id',
					'empresa',
					'carrera',
					'tipo_practica',
					'fecha_inicio',
					'fecha_fin',
					'total_horas',
					'horario',
					'id_modalidad',
				],
				include: [
					{ model: Modalidad, attributes: ['id', 'nombre'] }, // Incluir la modalidad del evento
				],
				order: [['createdAt', 'DESC']],
			});
			res.status(200).json(practicas);
		} catch (error) {
			res.status(500).json({
				message: 'Error al obtener las practicas',
				error: error.message,
			});
		}
	},

	// Crear una nueva práctica
	createPractica: async (req, res) => {
		try {
			const {
				empresa,
				carrera,
				tipo_practica,
				fecha_inicio,
				fecha_fin,
				total_horas,
				horario,
				id_modalidad,
			} = req.body;

			const fechaInicio = new Date(fecha_inicio);
			const fechaInicioUTC = new Date(fechaInicio.getUTCFullYear(), fechaInicio.getUTCMonth(), fechaInicio.getUTCDate(), fechaInicio.getUTCHours(), fechaInicio.getUTCMinutes(), fechaInicio.getUTCSeconds(), fechaInicio.getUTCMilliseconds());
			const fechaFin = new Date(fecha_fin);
			const fechaFinUTC = new Date(fechaFin.getUTCFullYear(), fechaFin.getUTCMonth(), fechaFin.getUTCDate(), fechaFin.getUTCHours(), fechaFin.getUTCMinutes(), fechaFin.getUTCSeconds(), fechaFin.getUTCMilliseconds());

			const nuevaPractica = await Practica.create({
				empresa,
				carrera,
				tipo_practica,
				fecha_inicio: fechaInicioUTC,
				fecha_fin: fechaFinUTC,
				total_horas,
				horario,
				id_modalidad,
			});

			res.status(201).json(nuevaPractica);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Error al crear la práctica', error: error.message });
		}
	},

	// Obtener una práctica por su ID
	getPracticaById: async (req, res) => {
		const { id } = req.params;
		try {
			const practica = await Practica.findByPk(id);
			if (practica) {
				res.json(practica);
			} else {
				res.status(404).json({ message: 'Práctica no encontrada' });
			}
		} catch (error) {
			res.status(500).json({
				message: 'Error al obtener la práctica',
				error: error.message,
			});
		}
	},

	// Actualizar una práctica por su ID
	updatePractica: async (req, res) => {
		const { id } = req.params;
		try {
			const practica = await Practica.update(req.body, {
				where: { id },
				returning: true, // Devolver los registros actualizados
			});
			if (practica) {
				res.json(Practica);
			} else {
				res.status(404).json({ message: 'Práctica no encontrada' });
			}
		} catch (error) {
			res.status(500).json({
				message: 'Error al actualizar la práctica',
				error: error.message,
			});
		}
	},

	// Eliminar una práctica por su ID
	deletePractica: async (req, res) => {
		const { id } = req.params;
		try {
			const practica = await Practica.destroy({ where: { id } });
			if (practica) {
				res.json({ message: 'Práctica eliminada exitosamente' });
			} else {
				res.status(404).json({ message: 'Práctica no encontrada' });
			}
		} catch (error) {
			res.status(500).json({
				message: 'Error al eliminar la práctica',
				error: error.message,
			});
		}
	},
	generatePostulantesExcel: async (req, res) => {
		const { id } = req.params;
		try {
			// Find the job by ID
			const practica = await Practica.findByPk(id, {
				include: [{ model: Modalidad }, { model: PostulanteSolicitud, include: [{ model: Postulante }] }],
			});

			if (!practica) {
				return res.status(404).json({ message: 'Practica not found' });
			}

			// Create a new Excel workbook
			const workbook = new exceljs.Workbook();
			const worksheet = workbook.addWorksheet('Practicas');

			// Add headers for Practica
			worksheet.columns = [
				{ header: 'Empresa', key: 'empresa', width: 30 },
				{ header: 'Tipo de Practica', key: 'tipo_practica', width: 30 },
				{ header: 'Total de Horas', key: 'total_horas', width: 30 },
				{ header: 'Horario', key: 'horario', width: 30 },
				{ header: 'Modalidad', key: 'modalidad', width: 30 },
				// Add headers for Postulante
				{ header: 'Universidad', key: 'universidad', width: 30 },
				{ header: 'Carrera', key: 'descripcion', width: 30 },
				{ header: 'País', key: 'pais', width: 30 },
				{ header: 'Ciudad', key: 'ciudad', width: 30 },
				{ header: 'Dirección', key: 'direccion', width: 30 },
				{ header: 'Teléfono', key: 'telefono', width: 30 },
				{ header: 'Curriculum', key: 'curriculum', width: 30 },
				{ header: 'Discapacidad', key: 'is_discapacidad', width: 30 },
				// Add more columns as needed
			];

			console.log(practica);

			// Add postulantes data to the worksheet
			practica.PostulanteSolicituds.forEach((postulanteSolicitud) => {
				if (!postulanteSolicitud.is_trabajo) {
					// Check if it's a trabajo postulante
					const postulante = postulanteSolicitud.Postulante;

					worksheet.addRow({
						// Add Trabajo attributes
						empresa: practica.empresa,
						tipo_practica: practica.tipo_practica,
						total_horas: practica.total_horas,
						horario: practica.horario,
						modalidad: practica.Modalidad.nombre,
						// Add Postulante attributes
						universidad: postulante.universidad,
						descripcion: postulante.descripcion,
						pais: postulante.pais,
						ciudad: postulante.ciudad,
						direccion: postulante.direccion,
						telefono: postulante.telefono,
						curriculum: process.env.DOMAIN_URL + '/' + postulante.curriculum,
						is_discapacidad: postulante.is_discapacidad ? 'Sí' : 'No',
						// Add more data as needed
					});
				}
			});

			// Set response headers
			res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			res.setHeader('Content-Disposition', `attachment; filename=postulantes_${practica.id}.xlsx`);

			// Send Excel file
			await workbook.xlsx.write(res);
			res.end();
		} catch (error) {
			console.error('Error generating Excel:', error);
			res.status(500).json({ message: 'Error generating Excel document' });
		}
	},
};
module.exports = practicasController;
