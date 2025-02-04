"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SolicitarPracticas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
      },
      pais: {
        type: Sequelize.STRING,
      },
      ciudad: {
        type: Sequelize.STRING,
      },
      direccion: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.STRING,
      },
      is_discapacidad: {
        type: Sequelize.BOOLEAN,
      },
      universidad: {
        type: Sequelize.STRING,
      },
      carrera: {
        type: Sequelize.STRING,
      },
      empresa: {
        type: Sequelize.STRING,
      },
      tipo_practica: {
        type: Sequelize.STRING,
      },
      fecha_inicio: {
        type: Sequelize.DATE,
      },
      fecha_fin: {
        type: Sequelize.DATE,
      },
      total_horas: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      curriculum: {
        type: Sequelize.STRING,
      },
      id_modalidad: {
        type: Sequelize.INTEGER,
      },
      id_estado: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SolicitarPracticas");
  },
};
