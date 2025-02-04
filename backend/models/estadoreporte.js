'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EstadoReporte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EstadoReporte.hasMany(models.Reporte, {
        foreignKey: "estado_id",
        onDelete: "CASCADE",
      });
    }
  }
  EstadoReporte.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EstadoReporte',
  });
  return EstadoReporte;
};
