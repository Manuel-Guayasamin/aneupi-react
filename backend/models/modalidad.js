'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modalidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociación uno a muchos con Evento
      Modalidad.hasMany(models.Evento, {
        foreignKey: 'id_modalidad',
        onDelete: 'CASCADE', // Opcional, define el comportamiento en cascada al eliminar una modalidad
      });
    }
  }
  Modalidad.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Esta línea garantiza que los nombres sean únicos
      },
    },
    {
      sequelize,
      modelName: 'Modalidad',
    },
  );
  return Modalidad;
};
