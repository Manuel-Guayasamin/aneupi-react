'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EventoUsuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha_inscripcion: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: true,
          isDate: true,
        },
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          isInt: true,
          min: 1,
        },
      },
      id_evento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          isInt: true,
          min: 1,
        },
      },
      comprobante_url: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('EventoUsuarios');
  },
};
