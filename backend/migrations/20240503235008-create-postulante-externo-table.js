"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PostulanteExternos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: "Usuarios",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      id_estado: {
        type: Sequelize.INTEGER,
        references: {
          model: "Estados",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      id_modalidad: {
        type: Sequelize.INTEGER,
        references: {
          model: "Modalidads",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      universidad: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.STRING,
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
      curriculum: {
        type: Sequelize.STRING,
      },
      is_discapacidad: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("PostulanteExternos");
  },
};
