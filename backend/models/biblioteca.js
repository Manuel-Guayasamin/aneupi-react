"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Biblioteca extends Model {
    static associate(models) {
      // define association here
      Biblioteca.belongsTo(models.TipoBiblioteca, {
        foreignKey: "id_tipo_biblioteca",
        onDelete: "CASCADE",
      });
      Biblioteca.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
        onDelete: "CASCADE",
      });
      Biblioteca.belongsTo(models.Estado, {
        foreignKey: "id_estado",
        onDelete: "CASCADE",
      });
    }
  }
  Biblioteca.init(
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      nombre_autor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      editorial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      archivo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_tipo_biblioteca: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Biblioteca",
    }
  );
  return Biblioteca;
};
