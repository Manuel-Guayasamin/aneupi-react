"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TipoConvenio extends Model {
    static associate(models) {
      // Asociaciones aquí, si es necesario

      TipoConvenio.hasMany(models.Convenio, {
        foreignKey: "id_tipoconvenio",
        onDelete: "CASCADE", // Opcional, define el comportamiento en cascada al eliminar un estado
      });
    }
  }
  TipoConvenio.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TipoConvenio",
    }
  );
  return TipoConvenio;
};
