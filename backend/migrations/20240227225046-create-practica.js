'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Practicas', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			empresa: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			carrera: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			tipo_practica: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			horario: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			fecha_inicio: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			fecha_fin: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			total_horas: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			id_modalidad: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable('Practicas');
	},
};
