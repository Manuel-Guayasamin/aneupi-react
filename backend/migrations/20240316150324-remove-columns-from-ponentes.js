'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Ponentes', 'dispacitado');
		await queryInterface.removeColumn('Ponentes', 'pais');
		await queryInterface.removeColumn('Ponentes', 'direccion');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('Ponentes', 'dispacitado', {
			type: Sequelize.BOOLEAN,
		});
		await queryInterface.addColumn('Ponentes', 'pais', {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn('Ponentes', 'direccion', {
			type: Sequelize.STRING,
		});
	},
};
