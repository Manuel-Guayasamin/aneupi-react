'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ServicioCitas', 'ciudad_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Ciudads',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ServicioCitas', 'ciudad_id');
  }
};
