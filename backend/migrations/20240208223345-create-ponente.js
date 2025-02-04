'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ponentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tematica: {
        type: Sequelize.STRING,
      },
      objetivo: {
        type: Sequelize.STRING,
      },
      profesion: {
        type: Sequelize.STRING,
      },
      curriculum_url: {
        type: Sequelize.STRING,
      },
      ponencia_url: {
        type: Sequelize.STRING,
      },
      dispacitado: {
        type: Sequelize.BOOLEAN,
      },
      pais: {
        type: Sequelize.STRING,
      },
      direccion: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Ponentes');
  },
};
