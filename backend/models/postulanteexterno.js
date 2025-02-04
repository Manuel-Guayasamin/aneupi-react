"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PostulanteExterno extends Model {
    static associate(models) {
      // Association with Usuarios table
      PostulanteExterno.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
        onDelete: "CASCADE",
      });

      // Association with Modalidad table
      PostulanteExterno.belongsTo(models.Modalidad, {
        foreignKey: "id_modalidad",
        onDelete: "CASCADE",
      });

      // Association with Estado table
      PostulanteExterno.belongsTo(models.Estado, {
        foreignKey: "id_estado",
        onDelete: "CASCADE",
      });
    }
  }
  PostulanteExterno.init(
    {
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_modalidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      universidad: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      pais: {
        type: DataTypes.STRING,
      },
      ciudad: {
        type: DataTypes.STRING,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      curriculum: {
        type: DataTypes.STRING,
      },
      is_dispacidad: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      empresa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo_practica: {
        type: DataTypes.STRING,
      },
      fecha_inicio: {
        type: DataTypes.DATE,
      },
      fecha_fin: {
        type: DataTypes.DATE,
      },
      total_horas: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "PostulanteExterno",
    }
  );
  return PostulanteExterno;
};
