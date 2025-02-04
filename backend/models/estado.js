"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociación uno a muchos con Evento
      Estado.hasMany(models.Evento, {
        foreignKey: "id_estado",
        onDelete: "CASCADE", // Opcional, define el comportamiento en cascada al eliminar un estado
      });
      Estado.hasMany(models.Postulante, {
        foreignKey: "id_estado",
        onDelete: "CASCADE", // Opcional, define el comportamiento en cascada al eliminar un estado
      });
      Estado.hasMany(models.Expediente, {
        foreignKey: "id_estado",
        onDelete: "CASCADE", // Opcional, define el comportamiento en cascada al eliminar un estado
      })
    }
  }
  Estado.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Esta línea garantiza que los nombres sean únicos
      },
    },
    {
      sequelize,
      modelName: "Estado",
    }
  );
  return Estado;
};
