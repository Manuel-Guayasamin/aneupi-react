'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar el campo telefono a la tabla Usuarios
    await queryInterface.addColumn('Usuarios', 'telefono', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Renombrar el campo cedula a identificacion
    await queryInterface.renameColumn('Usuarios', 'cedula', 'identificacion');
  },
  async down(queryInterface, Sequelize) {
    // Revertir el cambio, eliminando el campo telefono
    await queryInterface.removeColumn('Usuarios', 'telefono');

    // Revertir el cambio, renombrando de identificacion a cedula
    await queryInterface.renameColumn('Usuarios', 'identificacion', 'cedula');
  },
};
