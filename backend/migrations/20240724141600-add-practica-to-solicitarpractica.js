'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("SolicitarPracticas", "practica_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Practicas",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("SolicitarPracticas", "practica_id");
  }
};
