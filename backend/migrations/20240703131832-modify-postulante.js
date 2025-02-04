'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Postulantes", "universidad");
    await queryInterface.removeColumn("Postulantes", "descripcion");
    await queryInterface.removeColumn("Postulantes", "pais");
    await queryInterface.removeColumn("Postulantes", "direccion");
    await queryInterface.removeColumn("Postulantes", "telefono");

    await queryInterface.addColumn("Postulantes", "profesion", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Postulantes", "interes", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Postulantes", "pais_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Pais",
        key: "id",
      },
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("Postulantes", "modalidad_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Modalidads",
        key: "id",
      },
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("Postulantes", "jornada", {
      type: Sequelize.STRING,
      allowNull: false,
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("Postulantes", "universidad", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Postulantes", "descripcion", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Postulantes", "pais", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Postulantes", "direccion", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Postulantes", "telefono", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn("Postulantes", "profesion");
    await queryInterface.removeColumn("Postulantes", "interes");
    await queryInterface.removeColumn("Postulantes", "pais_id");
    await queryInterface.removeColumn("Postulantes", "modalidad_id");
    await queryInterface.removeColumn("Postulantes", "jornada");
  }
};
