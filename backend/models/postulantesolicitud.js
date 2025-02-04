'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class PostulanteSolicitud extends Model {
		static associate(models) {
			// Association with Trabajo table
			PostulanteSolicitud.belongsTo(models.Trabajo, {
				foreignKey: 'id_oficio',
				onDelete: 'CASCADE',
			});

			// Association with Practicas table
			PostulanteSolicitud.belongsTo(models.Practica, {
				foreignKey: 'id_oficio',
				onDelete: 'CASCADE',
			});

			// Association with Postulante table
			PostulanteSolicitud.belongsTo(models.Postulante, {
				foreignKey: 'id_postulante',
				onDelete: 'CASCADE',
			});
		}
	}
	PostulanteSolicitud.init(
		{
			id_oficio: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			id_postulante: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			is_trabajo: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'PostulanteSolicitud',
		},
	);
	return PostulanteSolicitud;
};
