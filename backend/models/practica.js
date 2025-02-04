'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Practica extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Association with PostulanteSolicitud table
			Practica.hasMany(models.PostulanteSolicitud, {
				foreignKey: 'id_oficio',
				onDelete: 'CASCADE',
			});

			// Asociación con Modalidad
			Practica.belongsTo(models.Modalidad, {
				foreignKey: 'id_modalidad',
				onDelete: 'CASCADE',
			});
		}
	}
	Practica.init(
		{
			empresa: DataTypes.STRING,
			carrera: DataTypes.STRING,
			tipo_practica: DataTypes.STRING,
			horario: DataTypes.STRING,
			fecha_inicio: DataTypes.DATE,
			fecha_fin: DataTypes.DATE,
			total_horas: DataTypes.INTEGER,
			id_modalidad: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Practica',
		},
	);
	return Practica;
};
