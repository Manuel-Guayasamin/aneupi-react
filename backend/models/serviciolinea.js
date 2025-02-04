"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicioLinea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Usuario profesional
      ServicioLinea.belongsTo(models.Usuario, {
        as: "profesional",
        foreignKey: "id_profesional",
        onDelete: "CASCADE", // Optional, define the cascade behavior on delete
      });
      // Asociación con Servicio (Servicio es el servicio ofrecido)
      ServicioLinea.belongsTo(models.Servicio, {
        as: "servicio",
        foreignKey: "id_servicio",
      });
    }
  }
  ServicioLinea.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_profesional: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id',
        }
      },
      id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Servicio',
          key: 'id',
        }
      },
    },
    {
      sequelize,
      modelName: "ServicioLinea",
    }
  );
  return ServicioLinea;
};
