"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Convenio extends Model {
    static associate(models) {
      Convenio.belongsTo(models.Pais, {
        foreignKey: "id_pais",
        onDelete: "CASCADE",
      });
      Convenio.belongsTo(models.TipoConvenio, {
        foreignKey: "id_tipoconvenio",
        onDelete: "CASCADE",
      });
      Convenio.belongsTo(models.Estado, {
        foreignKey: "id_estado",
        onDelete: "CASCADE",
      });
      // Convenio.belongsTo(models.Modalidad, {
      //   foreignKey: "id_modalidad",
      //   onDelete: "CASCADE",
      // });
    }
  }
  Convenio.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_tipoconvenio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "TipoConvenio",
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
      },
      // id_modalidad: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "Modalidad",
      //     key: "id",
      //   },
      //   onDelete: "CASCADE",
      // },
      id_pais: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pais",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      nombres: DataTypes.STRING,
      apellidos: DataTypes.STRING,
      telefono: DataTypes.STRING,
      email: DataTypes.STRING,
      propuesta: DataTypes.STRING,
      fecha_inicio: DataTypes.DATE,
      fecha_fin: DataTypes.DATE,
      duracion: DataTypes.INTEGER,
      nombreOrganizacion: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
      convenio_parcial: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Convenio",
    }
  );
  return Convenio;
};
