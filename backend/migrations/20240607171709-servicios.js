'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Servicios
    await queryInterface.removeColumn('Servicios', 'id_profesional');

    // ServiciosLinea
    await queryInterface.removeColumn('ServicioLineas', 'id_usuario');
    await queryInterface.removeColumn('ServicioLineas', 'id_servicio');
    await queryInterface.removeColumn('ServicioLineas', 'reunion_url');
    await queryInterface.removeColumn('ServicioLineas', 'motivo');
    await queryInterface.addColumn('ServicioLineas', 'id_profesional', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('ServicioLineas', 'id_servicio', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Servicios',
        key: 'id',
      }
    });

    // Servicio Cita
    await queryInterface.createTable('ServicioCitas', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			solicitante_nombre: {
				type: Sequelize.STRING,
			},
      solicitante_email: {
				type: Sequelize.STRING,
			},
      solicitante_telefono: {
				type: Sequelize.STRING,
			},
      id_servicio_linea: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ServicioLineas',
          key: 'id',
        },
      },
      reunion_url: {
        type: Sequelize.STRING,
      },
      motivo: {
        type: Sequelize.TEXT,
      },
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
  },

  async down (queryInterface, Sequelize) {
    // Servicios
    await queryInterface.addColumn('Servicios', 'id_profesional', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'id'
      },
      onDelete: 'CASCADE',
    });

    // ServiciosLinea
    await queryInterface.addColumn('ServicioLineas', 'id_usuario', {
      type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
        onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('ServicioLineas', 'id_servicio', {
      type: Sequelize.INTEGER,
        references: {
          model: 'Servicios',
          key: 'id',
        },
        onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('ServicioLineas', 'reunion_url');
    await queryInterface.addColumn('ServicioLineas', 'motivo');


    // Servicio Cita
    await queryInterface.dropTable('ServicioCitas');
  }
};
