'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Asistente extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Asistente.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
		}
	}
	Asistente.init(
		{
			tipo_asistente: DataTypes.STRING,
			id_usuario: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Asistente',
		},
	);
	return Asistente;
};
