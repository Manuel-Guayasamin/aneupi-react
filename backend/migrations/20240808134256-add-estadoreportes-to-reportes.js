'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Reportes", "estado_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "EstadoReportes",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Reportes", "estado_id");
  }
};
