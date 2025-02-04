'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ciudad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ciudad.belongsTo(models.Pais, {
        foreignKey: 'pais_id',
      });
    }
  }
  Ciudad.init({
    nombre: DataTypes.STRING,
    zona_horaria: DataTypes.STRING,
    pais_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Pais',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Ciudad',
  });
  return Ciudad;
};
