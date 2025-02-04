'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Rol extends Model {
		static associate(models) {
			// Aquí puedes definir las asociaciones con otros modelos, si las hay
			// Por ejemplo, si un rol tiene muchos usuarios:
			Rol.hasMany(models.Usuario, {
				foreignKey: 'id_rol',
				onDelete: 'CASCADE', // Opcional, define el comportamiento en cascada al eliminar un rol
			});
		}
	}

	Rol.init(
		{
			nombre: {
				type: DataTypes.STRING,
				unique: true, // El nombre del rol debe ser único
				allowNull: false, // El nombre del rol no puede ser nulo
				validate: {
					len: [2, 50], // Validar la longitud del nombre del rol (mínimo 2, máximo 50 caracteres)
				},
			},
		},
		{
			sequelize,
			modelName: 'Rol',
		},
	);

	return Rol;
};
