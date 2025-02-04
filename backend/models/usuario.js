'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Usuario extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Usuario.belongsTo(models.Rol, {
				foreignKey: 'id_rol',
				onDelete: 'CASCADE', // Opcional, define el comportamiento en cascada al eliminar un rol
			});

			// Asociación con EventoUsuario
			Usuario.hasMany(models.Evento, {
				foreignKey: 'id_usuario',
				onDelete: 'CASCADE',
			});

			// Asociación muchos a muchos con EventoUsuario
			Usuario.belongsToMany(models.Evento, {
				through: 'EventoUsuario', // Tabla intermedia
				foreignKey: 'id_usuario',
				onDelete: 'CASCADE', // Opcional, define el comportamiento en cascada al eliminar un evento
			});

			// Define association with EventoUsuario
			Usuario.hasMany(models.EventoUsuario, {
				foreignKey: 'id_usuario', // Name of the foreign key in the EventoUsuario model
				onDelete: 'CASCADE', // Optional, define the cascade behavior on delete
			});
		}
	}
	Usuario.init(
		{
			identificacion: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isNumeric: true,
				},
			},
			nombreUsuario: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [3, 50], // Longitud mínima de 3 caracteres y máxima de 50 caracteres
				},
			},
			nombres: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 50], // Longitud mínima de 2 caracteres y máxima de 50 caracteres
				},
			},
			apellidos: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 100], // Longitud mínima de 2 caracteres y máxima de 100 caracteres
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true, // Validar que sea un correo electrónico válido
				},
			},
			telefono: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isNumeric: true,
				},
			},
			id_rol: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Rols', // Nombre de la tabla de roles
					key: 'id', // Nombre de la columna de la clave primaria en la tabla de roles
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			ocupacion: {
				type: DataTypes.STRING, // Assuming it's a string, modify if needed
				allowNull: true, // Adjust as per your requirements
			},
			pais: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			direccion: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			has_discapacidad: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Usuario',
		},
	);
	return Usuario;
};
