'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TipoBiblioteca extends Model {
    static associate(models) {
      // define association here
      TipoBiblioteca.hasMany(models.Biblioteca, {
        foreignKey: 'id_tipo_biblioteca',
        onDelete: 'CASCADE'
      });
    }
  }
  TipoBiblioteca.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TipoBiblioteca',
    tableName: 'TipoBiblioteca'
  });
  return TipoBiblioteca;
};
