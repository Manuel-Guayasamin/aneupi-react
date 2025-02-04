"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ponente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Ponente.init(
    {
      tematica: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      curriculum_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comprobante_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      nombres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      profesion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Ponente",
    }
  );
  return Ponente;
};
