'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Eventos', 'descripcion', {
			type: Sequelize.TEXT,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Eventos', 'descripcion', {
			type: Sequelize.STRING,
		});
	},
};
