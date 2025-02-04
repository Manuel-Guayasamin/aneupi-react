'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Trabajo extends Model {
		static associate(models) {
			Trabajo.hasMany(models.PostulanteSolicitud, {
				foreignKey: 'id_oficio',
				onDelete: 'CASCADE',
			});
		}
	}
	Trabajo.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			empresa: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			departamento: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			cargo: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			horario: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Trabajo',
		},
	);
	return Trabajo;
};
