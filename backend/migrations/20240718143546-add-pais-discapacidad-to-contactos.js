'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Contactos", "pais_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Pais",
        key: "id",
      },
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("Contactos", "discapacidad", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Contactos", "pais_id");
    await queryInterface.removeColumn("Contactos", "discapacidad");
  }
};
