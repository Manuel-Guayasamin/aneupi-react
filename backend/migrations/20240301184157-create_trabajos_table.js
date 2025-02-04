'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Trabajos', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			empresa: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			departamento: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			cargo: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			horario: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Trabajos');
	},
};
