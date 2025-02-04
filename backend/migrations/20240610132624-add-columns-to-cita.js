'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ServicioCitas', 'fecha_inicio', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('ServicioCitas', 'fecha_fin', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('ServicioCitas', 'estado_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Estados',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('ServicioCitas', 'modalidad_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Modalidads',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ServicioCitas', 'fecha_inicio');
    await queryInterface.removeColumn('ServicioCitas', 'fecha_fin');
    await queryInterface.removeColumn('ServicioCitas', 'estado_id');
    await queryInterface.removeColumn('ServicioCitas', 'modalidad_id');
  }
};
