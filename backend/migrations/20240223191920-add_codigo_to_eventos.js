'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Eventos', 'codigo', {
      type: Sequelize.STRING,
      allowNull: true, // Puedes cambiar a false si el campo es obligatorio
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Eventos', 'codigo');
  },
};
