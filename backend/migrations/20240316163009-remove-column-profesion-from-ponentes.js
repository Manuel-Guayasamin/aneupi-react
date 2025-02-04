'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Ponentes', 'profesion');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('Ponentes', 'profesion', {
			type: Sequelize.STRING,
		});
	},
};
