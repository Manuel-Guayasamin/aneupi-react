"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reportes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombres: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isAlpha: true,
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isEmail: true,
        },
      },
      isStudent: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isAlpha: true,
        },
      },
      isFromEcuador: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isAlpha: true,
        },
      },
      universidad: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isAlpha: true,
        },
      },
      asunto: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isAlpha: true,
        },
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isNumeric: true,
        },
      },
      mensaje: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isAlpha: true,
        },
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
    await queryInterface.dropTable("Reportes");
  },
};
