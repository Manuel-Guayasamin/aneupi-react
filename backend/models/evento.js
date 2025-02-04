'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Evento extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Asociación con Modalidad
			Evento.belongsTo(models.Modalidad, {
				foreignKey: 'id_modalidad',
				onDelete: 'CASCADE', // Opcional, define el comportamiento en cascada al eliminar una modalidad
			});

			// Asociación con Estado
			Evento.belongsTo(models.Estado, {
				foreignKey: 'id_estado',
				onDelete: 'CASCADE', // Opcional, define el comportamiento en cascada al eliminar un estado
			});

			// Asociación con Usuario
			Evento.belongsTo(models.Usuario, {
				foreignKey: 'id_usuario',
				onDelete: 'CASCADE', // Opcional, define el comportamiento en cascada al eliminar un usuario
			});

			// Define association with EventoUsuario
			Evento.belongsToMany(models.Usuario, {
				through: 'EventoUsuario', // Intermediate table name
				foreignKey: 'id_evento', // Foreign key in EventoUsuario table
				otherKey: 'id_usuario', // Foreign key in Usuario table
			});

			// Define association with EventoUsuario
			Evento.hasMany(models.EventoUsuario, {
				foreignKey: 'id_evento', // Name of the foreign key in the EventoUsuario model
				onDelete: 'CASCADE', // Optional, define the cascade behavior on delete
			});
		}
	}
	Evento.init(
		{
			codigo: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			nombre: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			descripcion: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			direccion: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
				},
			},
			costo: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					notNull: true,
					min: 0,
				},
			},
			imagen: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: true,
				},
			},
			fecha_inicio: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notNull: true,
					isDate: true,
				},
			},
			fecha_fin: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notNull: true,
					isDate: true,
				},
			},
			participantes: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: true,
					isInt: true,
					min: 0,
				},
			},
			id_modalidad: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: true,
					isInt: true,
					min: 1,
				},
			},
			id_estado: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: true,
					isInt: true,
					min: 1,
				},
			},
			id_usuario: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: true,
					isInt: true,
					min: 1,
				},
			},
		},
		{
			sequelize,
			modelName: 'Evento',
		},
	);
	return Evento;
};
