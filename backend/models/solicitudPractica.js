"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SolicitudPractica extends Model {
    static associate(models) {
      // Association with PostulanteSolicitud table
      SolicitudPractica.belongsTo(models.Pais, {
        foreignKey: "pais_id",
        onDelete: "CASCADE",
      });
      SolicitudPractica.belongsTo(models.Modalidad, {
        foreignKey: "id_modalidad",
        onDelete: "CASCADE",
      });
      SolicitudPractica.belongsTo(models.Estado, {
        foreignKey: "id_estado",
        onDelete: "CASCADE",
      });
      SolicitudPractica.belongsTo(models.Practica, {
        foreignKey: "practica_id",
        onDelete: "CASCADE",
      });
    }
  }
  SolicitudPractica.init(
    {
      practica_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Practica",
          key: "id"
        },
        onDelete: "CASCADE",
      },
      pais_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pais",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      lugar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_discapacidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      universidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carrera: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      empresa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo_practica: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total_horas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      curriculum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_modalidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Modalidad",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Estado",
          key: "id",
        },
        onDelete: "CASCADE",
      },email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SolicitudPractica",
      tableName: "SolicitarPracticas",
    }
  );
  return SolicitudPractica;
};
