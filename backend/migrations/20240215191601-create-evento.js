"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Eventos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      direccion: {
        type: Sequelize.STRING,
      },
      costo: {
        type: Sequelize.FLOAT,
      },
      imagen: {
        type: Sequelize.BLOB,
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY,
      },
      fecha_fin: {
        type: Sequelize.DATEONLY,
      },
      participantes: {
        type: Sequelize.INTEGER,
      },
      id_modalidad: {
        type: Sequelize.INTEGER,
      },
      id_estado: {
        type: Sequelize.INTEGER,
      },
      id_usuario: {
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
    await queryInterface.dropTable("Eventos");
  },
};
