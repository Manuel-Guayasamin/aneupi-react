const { Trabajo, Postulante, PostulanteSolicitud } = require('../models');
const exceljs = require('exceljs');

// Método para crear un nuevo trabajo
exports.createTrabajo = async (req, res) => {
	try {
		const { empresa, departamento, cargo, horario } = req.body;
		// Validar que los campos requeridos estén presentes
		if (!empresa || !departamento || !cargo || !horario) {
			return res.status(400).json({ error: 'Todos los campos son requeridos' });
		}
		const nuevoTrabajo = await Trabajo.create({ empresa, departamento, cargo, horario });
		res.status(201).json({ mensaje: 'Trabajo creado correctamente', trabajo: nuevoTrabajo });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Método para obtener todos los trabajos
exports.getAllTrabajos = async (req, res) => {
	try {
		const trabajos = await Trabajo.findAll({ order: [['createdAt', 'DESC']] });
		res.status(200).json(trabajos);
	} catch (error) {
		res.status(500).json({ error: 'Ocurrió un error al obtener los trabajos' });
	}
};

// Método para obtener un trabajo por su ID
exports.getTrabajoById = async (req, res) => {
	try {
		const trabajo = await Trabajo.findByPk(req.params.id);
		if (!trabajo) {
			return res.status(404).json({ error: 'Trabajo no encontrado' });
		}
		res.status(200).json(trabajo);
	} catch (error) {
		res.status(500).json({ error: 'Ocurrió un error al obtener el trabajo' });
	}
};

// Método para actualizar un trabajo
exports.updateTrabajo = async (req, res) => {
	try {
		const { empresa, departamento, cargo, horario } = req.body;
		const trabajo = await Trabajo.findByPk(req.params.id);
		if (!trabajo) {
			return res.status(404).json({ error: 'Trabajo no encontrado' });
		}
		// Validar que los campos requeridos estén presentes
		if (!empresa || !departamento || !cargo || !horario) {
			return res.status(400).json({ error: 'Todos los campos son requeridos' });
		}
		await trabajo.update({ empresa, departamento, cargo, horario });
		res.status(200).json({ mensaje: 'Trabajo actualizado correctamente' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Método para eliminar un trabajo
exports.deleteTrabajo = async (req, res) => {
	try {
		const trabajo = await Trabajo.findByPk(req.params.id);
		if (!trabajo) {
			return res.status(404).json({ error: 'Trabajo no encontrado' });
		}
		await trabajo.destroy();
		res.status(200).json({ mensaje: 'Trabajo eliminado correctamente' });
	} catch (error) {
		res.status(500).json({ error: 'Ocurrió un error al eliminar el trabajo' });
	}
};

exports.generatePostulantesExcel = async (req, res) => {
	try {
		const { id } = req.params;

		// Find the job by ID
		const trabajo = await Trabajo.findByPk(id, {
			include: [{ model: PostulanteSolicitud, include: [{ model: Postulante }] }],
		});

		if (!trabajo) {
			return res.status(404).json({ message: 'Trabajo not found' });
		}

		// Create a new Excel workbook
		const workbook = new exceljs.Workbook();
		const worksheet = workbook.addWorksheet('Postulantes');

		// Add headers for Trabajo
		worksheet.columns = [
			{ header: 'Empresa', key: 'empresa', width: 30 },
			{ header: 'Departamento', key: 'departamento', width: 30 },
			{ header: 'Cargo', key: 'cargo', width: 30 },
			{ header: 'Horario', key: 'horario', width: 30 },
			// Add headers for Postulante
			{ header: 'Profesión Actual', key: 'universidad', width: 30 },
			{ header: 'Área de Interés', key: 'descripcion', width: 30 },
			{ header: 'País', key: 'pais', width: 30 },
			{ header: 'Ciudad', key: 'ciudad', width: 30 },
			{ header: 'Dirección', key: 'direccion', width: 30 },
			{ header: 'Teléfono', key: 'telefono', width: 30 },
			{ header: 'Curriculum', key: 'curriculum', width: 30 },
			{ header: 'Discapacidad', key: 'is_discapacidad', width: 30 },
			// Add more columns as needed
		];

		// Add postulantes data to the worksheet
		trabajo.PostulanteSolicituds.forEach((postulanteSolicitud) => {
			if (postulanteSolicitud.is_trabajo) {
				// Check if it's a trabajo postulante
				const postulante = postulanteSolicitud.Postulante;

				worksheet.addRow({
					// Add Trabajo attributes
					empresa: trabajo.empresa,
					departamento: trabajo.departamento,
					cargo: trabajo.cargo,
					horario: trabajo.horario,
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
		res.setHeader('Content-Disposition', `attachment; filename=postulantes_${trabajo.id}.xlsx`);

		// Send Excel file
		await workbook.xlsx.write(res);
		res.end();
	} catch (error) {
		console.error('Error generating Excel:', error);
		res.status(500).json({ message: 'Error generating Excel document' });
	}
};
