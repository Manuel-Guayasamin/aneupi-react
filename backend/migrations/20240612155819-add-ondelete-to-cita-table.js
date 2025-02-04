'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ServicioCitas', 'id_servicio_linea');
    await queryInterface.addColumn('ServicioCitas', 'id_servicio_linea', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'ServicioLineas',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ServicioCitas', 'id_servicio_linea');
    await queryInterface.addColumn('ServicioCitas', 'id_servicio_linea', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'ServicioLineas',
        key: 'id',
      },
    });
  }
};
