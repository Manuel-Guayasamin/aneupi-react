"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Servicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociación con ServicioLinea (ServicioLinea es el servicio ofrecido ligado al profesional)
      Servicio.hasMany(models.ServicioLinea, {
        foreignKey: "id_servicio",
      });
    }
  }
  Servicio.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Servicio",
    }
  );
  return Servicio;
};
