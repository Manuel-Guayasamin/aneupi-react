"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InscripcionEvento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // Asociación con Evento
      InscripcionEvento.belongsTo(models.Evento, {
        foreignKey: "id_evento",
        onDelete: "CASCADE",
      });
      InscripcionEvento.belongsTo(models.Estado, {
        foreignKey: "id_estado",
        onDelete: "CASCADE",
      });
    }
  }
  InscripcionEvento.init(
    {
      fecha_inscripcion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }, //
      cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }, //
      id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, //
      id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, //
      comprobante_url: {
        type: DataTypes.STRING,
        allowNull: true, // Depende de si quieres que los usuarios suban un comprobante
      }, //
      nombres: {
        type: DataTypes.TEXT,
        allowNull: false,
      }, //
      apellidos: {
        type: DataTypes.TEXT,
        allowNull: false,
      }, //
      profesion: {
        type: DataTypes.TEXT,
        allowNull: false,
      }, //
      direccion: {
        type: DataTypes.TEXT,
        allowNull: false,
      }, //
      edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, //
      costo: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
      }, //
      id_modalidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }, //
      certificado_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      }, //
    },
    {
      sequelize,
      modelName: "InscripcionEvento",
    }
  );
  return InscripcionEvento;
};
