'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Ciudads", "pais_id");
    await queryInterface.addColumn("Ciudads", "pais_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Pais",
        key: "id",
      },
      onDelete: "CASCADE",
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Ciudads", "pais_id");
    await queryInterface.addColumn("Ciudads", "pais_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Pais",
        key: "id",
      }
    });
  }
};
