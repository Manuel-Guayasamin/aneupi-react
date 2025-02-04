"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // eliminación de columnas

    // adición de columnas
    await queryInterface.addColumn("InscripcionEventos", "cedula", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.addColumn("InscripcionEventos", "nombres", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.addColumn("InscripcionEventos", "apellidos", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.addColumn("InscripcionEventos", "profesion", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.addColumn("InscripcionEventos", "direccion", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.addColumn("InscripcionEventos", "edad", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("InscripcionEventos", "costo", {
      type: Sequelize.NUMERIC(10, 2),
      allowNull: false,
    });
    await queryInterface.addColumn("InscripcionEventos", "id_modalidad", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("InscripcionEventos", "certificado_url", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // eliminación de columnas
    await queryInterface.removeColumn("InscripcionEventos", "cedula");
    await queryInterface.removeColumn("InscripcionEventos", "nombres");
    await queryInterface.removeColumn("InscripcionEventos", "apellidos");
    await queryInterface.removeColumn("InscripcionEventos", "profesion");
    await queryInterface.removeColumn("InscripcionEventos", "direccion");
    await queryInterface.removeColumn("InscripcionEventos", "edad");
    await queryInterface.removeColumn("InscripcionEventos", "costo");
    await queryInterface.removeColumn("InscripcionEventos", "id_modalidad");
    await queryInterface.removeColumn("InscripcionEventos", "certificado_url");
  },
};
