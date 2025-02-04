"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Postulante extends Model {
    static associate(models) {
      // Association with PostulanteSolicitud table
      Postulante.hasMany(models.PostulanteSolicitud, {
        foreignKey: "id_postulante",
        onDelete: "CASCADE",
      });
      Postulante.belongsTo(models.Estado, {
        foreignKey: "id_estado",
        onDelete: "CASCADE", // Opcional, define el comportamiento en cascada al eliminar un estado
      });
      Postulante.belongsTo(models.Pais, {
        foreignKey: "pais_id",
        onDelete: "CASCADE",
      });
      Postulante.belongsTo(models.Modalidad, {
        foreignKey: "modalidad_id",
        onDelete: "CASCADE",
      });
    }
  }
  Postulante.init(
    {
      profesion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      interes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      curriculum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jornada: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_discapacidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pais_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      modalidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      empresa: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Postulante",
    }
  );
  return Postulante;
};
