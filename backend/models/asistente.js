"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Asistente extends Model { }

	Asistente.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			tipo_asistente: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			id_usuario: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			nombres: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			cedula: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			edad: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			telefono: {
				type: DataTypes.STRING(15),
				allowNull: false,
			},
			lugar: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Asistente",
			timestamps: true,
		}
	);

	return Asistente;
};
