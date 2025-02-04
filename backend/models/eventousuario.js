'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventoUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Asociación con Usuario
      EventoUsuario.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        onDelete: 'CASCADE',
      });

      // Asociación con Evento
      EventoUsuario.belongsTo(models.Evento, {
        foreignKey: 'id_evento',
        onDelete: 'CASCADE',
      });
    }
  }
  EventoUsuario.init(
    {
      fecha_inscripcion: DataTypes.DATE,
      id_usuario: DataTypes.INTEGER,
      id_evento: DataTypes.INTEGER,
      comprobante_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'EventoUsuario',
    },
  );
  return EventoUsuario;
};
