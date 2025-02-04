"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reporte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reporte.belongsTo(models.EstadoReporte, {
        foreignKey: "estado_id",
        onDelete: "CASCADE",
      });
    }
  }

  Reporte.init(
    {
      estado_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "EstadoReporte",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      nombres: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El campo nombres no puede ser nulo" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El campo email no puede ser nulo" },
          isEmail: { msg: "El campo email debe ser un correo válido" },
        },
      },
      isStudent: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El campo isStudent no puede ser nulo" },
        },
      },
      isFromEcuador: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El campo isFromEcuador no puede ser nulo" },
        },
      },
      universidad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El campo universidad no puede ser nulo" },
        },
      },
      asunto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El campo asunto no puede ser nulo" },
        },
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El campo telefono no puede ser nulo" },
        },
      },
      mensaje: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "El campo mensaje no puede ser nulo" },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        // Cambiado de "updated" a "updatedAt"
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Reporte",
      timestamps: true, // Asegúrate de tener esto para usar createdAt y updatedAt automáticamente
    }
  );

  return Reporte;
};
