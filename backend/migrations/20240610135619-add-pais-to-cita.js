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
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ServicioCitas', 'pais_id');
  }
};
