'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Expedientes', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombres: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profesion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cedula: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      direccion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      edad: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pais: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      institucion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_tipo_expediente: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      certificado_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      costo: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      comprobante_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      archivo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_estado: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Expedientes');
  },
};
