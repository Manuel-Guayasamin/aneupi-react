'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Usuarios', 'ocupacion', {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn('Usuarios', 'pais', {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn('Usuarios', 'direccion', {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn('Usuarios', 'has_discapacidad', {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false, // Set a default value if needed
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Usuarios', 'ocupacion');
		await queryInterface.removeColumn('Usuarios', 'pais');
		await queryInterface.removeColumn('Usuarios', 'direccion');
		await queryInterface.removeColumn('Usuarios', 'has_discapacidad');
	},
};
