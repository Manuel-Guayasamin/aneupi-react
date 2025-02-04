"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServicioCita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociación con ServicioLinea
      ServicioCita.belongsTo(models.ServicioLinea, {
        foreignKey: "id_servicio_linea",
      });
      ServicioCita.belongsTo(models.Pais, {
        foreignKey: "pais_id",
      });
      ServicioCita.belongsTo(models.Modalidad, {
        foreignKey: "modalidad_id",
      });
      ServicioCita.belongsTo(models.Estado, {
        foreignKey: "estado_id",
      });
    }
  }
  ServicioCita.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      solicitante_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      solicitante_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      solicitante_telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_servicio_linea: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
					model: 'ServicioLinea',
					key: 'id',
				},
        onDelete: "CASCADE",
      },
      pais_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Pais',
          key: 'id',
        },
        onDelete: "CASCADE",
      },
      ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
					model: 'Estado',
					key: 'id',
				},
        onDelete: "CASCADE",
      },
      modalidad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
					model: 'Modalidad',
					key: 'id',
				},
        onDelete: "CASCADE",
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      reunion_url: {
        type: DataTypes.STRING,
      },
      motivo: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "ServicioCita",
      tableName: "ServicioCitas",
    }
  );
  return ServicioCita;
};
