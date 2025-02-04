'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("SolicitarPracticas", "id_usuario");
    await queryInterface.removeColumn("SolicitarPracticas", "pais");
    await queryInterface.removeColumn("SolicitarPracticas", "direccion");
    await queryInterface.removeColumn("SolicitarPracticas", "ciudad");

    await queryInterface.addColumn("SolicitarPracticas", "lugar", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("SolicitarPracticas", "pais_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Pais",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("SolicitarPracticas", "id_usuario", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Usuarios",
        key: "id",
      },
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("SolicitarPracticas", "pais", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("SolicitarPracticas", "direccion", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("SolicitarPracticas", "ciudad", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn("SolicitarPracticas", "lugar");
    await queryInterface.removeColumn("SolicitarPracticas", "pais_id");
  }
};
