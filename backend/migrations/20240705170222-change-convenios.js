'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Convenios", "id_usuario");

    await queryInterface.addColumn("Convenios", "nombres", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Convenios", "apellidos", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Convenios", "telefono", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Convenios", "email", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Convenios", "id_pais", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Pais",
        key: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("Convenios", "propuesta", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("Convenios", "id_usuario", {
      type: Sequelize.INTEGER,
      references: {
        model: "Usuarios",
        key: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.removeColumn("Convenios", "nombres");
    await queryInterface.removeColumn("Convenios", "apellidos");
    await queryInterface.removeColumn("Convenios", "telefono");
    await queryInterface.removeColumn("Convenios", "email");
    await queryInterface.removeColumn("Convenios", "id_pais");
    await queryInterface.removeColumn("Convenios", "propuesta");
  }
};
