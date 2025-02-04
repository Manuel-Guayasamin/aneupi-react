'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Postulantes', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			universidad: {
				type: Sequelize.STRING,
			},
			descripcion: {
				type: Sequelize.STRING,
			},
			pais: {
				type: Sequelize.STRING,
			},
			ciudad: {
				type: Sequelize.STRING,
			},
			direccion: {
				type: Sequelize.STRING,
			},
			telefono: {
				type: Sequelize.STRING,
			},
			curriculum: {
				type: Sequelize.STRING,
			},
			is_discapacidad: {
				type: Sequelize.BOOLEAN,
			},
			id_estado: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Estados', // Assuming you have a table named Estados
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL', // or 'CASCADE' or 'RESTRICT' depending on your requirements
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Postulantes');
	},
};
