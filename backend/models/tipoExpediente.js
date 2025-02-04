'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TipoExpediente extends Model {
    static associate(models) {
      // define association here
      TipoExpediente.hasMany(models.Expediente, {
        foreignKey: 'id_tipo_expediente',
        onDelete: 'CASCADE'
      });
    }
  }
  TipoExpediente.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TipoExpediente',
    tableName: 'TipoExpediente'
  });
  return TipoExpediente;
};
