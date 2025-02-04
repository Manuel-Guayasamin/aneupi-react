"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Expediente extends Model {
    static associate(models) {
      // define association here
      Expediente.belongsTo(models.TipoExpediente, {
        foreignKey: "id_tipo_expediente",
        onDelete: "CASCADE",
      });
      Expediente.belongsTo(models.Estado, {
        foreignKey: "id_estado",
        onDelete: "CASCADE",
      });
    }
  }
  Expediente.init(
    {
      nombres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profesion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      edad: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pais: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      institucion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_tipo_expediente: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      certificado_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      costo: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      comprobante_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      archivo_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Expediente",
    }
  );
  return Expediente;
};
