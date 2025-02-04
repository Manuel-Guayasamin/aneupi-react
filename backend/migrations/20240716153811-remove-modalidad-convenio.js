'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Convenios", "id_modalidad");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("Convenios", "id_modalidad", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Modalidads",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  }
};
