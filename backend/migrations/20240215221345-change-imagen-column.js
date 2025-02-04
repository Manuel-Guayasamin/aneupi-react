'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Eventos', 'imagen', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Eventos', 'imagen', {
      type: Sequelize.BLOB,
      allowNull: false,
      validate: {
        notNull: true,
      },
    });
  },
};
