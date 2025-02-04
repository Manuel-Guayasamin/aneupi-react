"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("InscripcionEventos", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
      },
      id_evento: {
        type: Sequelize.INTEGER,
      },
      fecha_inscripcion: {
        type: Sequelize.DATE,
      },
      id_estado: {
        type: Sequelize.INTEGER,
      },
      comprobante_url: {
        type: Sequelize.STRING,
        allowNull: true, // Depende de si quieres que los usuarios suban un comprobante
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("InscripcionEventos");
  },
};
