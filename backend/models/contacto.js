// models/Contacto.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Contacto extends Model {
		static associate(models) {
			Contacto.belongsTo(models.Pais, {
				foreignKey: "pais_id",
				onDelete: "CASCADE",
			});
		}
	}
	Contacto.init(
		{

			nombres: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'El campo nombres no puede estar vacío.',
					},
				},
			},
			apellidos: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'El campo apellidos no puede estar vacío.',
					},
				},
			},
			telefono: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					notEmpty: {
						msg: 'El campo telefono no puede estar vacío.',
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: {
						msg: 'El campo email debe ser una dirección de correo electrónico válida.',
					},
				},
			},
			asunto: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'El campo asunto no puede estar vacío.',
					},
				},
			},
			mensaje: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'El campo mensaje no puede estar vacío.',
					},
				},
			},
			discapacidad: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			pais_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Pais",
					key: "id",
				},
				onDelete: "CASCADE",
			},
      ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
      }
		},
		{
			sequelize,
			modelName: 'Contacto',
			tableName: 'Contactos', // Nombre de la tabla en la base de datos
		},
	);
	return Contacto;
};
