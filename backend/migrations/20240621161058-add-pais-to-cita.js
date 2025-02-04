'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ServicioCitas', 'pais_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Pais',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
    await queryInterface.removeColumn('ServicioCitas', 'ciudad_id');
    await queryInterface.addColumn('ServicioCitas', 'ciudad', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ServicioCitas', 'ciudad');
    await queryInterface.removeColumn('ServicioCitas', 'pais_id');
    await queryInterface.addColumn('ServicioCitas', 'ciudad_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Ciudads',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  }
};
