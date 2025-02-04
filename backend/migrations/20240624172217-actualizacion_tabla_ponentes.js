"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Eliminación de columnas

    await queryInterface.removeIndex("Ponentes", "pais");
    await queryInterface.removeColumn("Ponentes", "objetivo");
    await queryInterface.removeColumn("Ponentes", "id_usuario");
    await queryInterface.removeColumn("Ponentes", "ponencia_url");

    // Adición de columnas
    await queryInterface.addColumn("Ponentes", "comprobante_url", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Ponentes", "profesion", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Ponentes", "nombres", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Ponentes", "cedula", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("Ponentes", "edad", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("Ponentes", "telefono", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Ponentes", "id_evento", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("Ponentes", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addIndex("Ponentes", ["pais"]); // Reagregar el índice si es necesario
    await queryInterface.addColumn("Ponentes", "ponencia_url", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Ponentes", "objetivo", {
      type: Sequelize.STRING,
      allowNull: true, // Si originalmente era nullable, usar true
    });
    await queryInterface.addColumn("Ponentes", "id_usuario", {
      type: Sequelize.INTEGER,
      allowNull: true, // Si originalmente era nullable, usar true
    });

    // Eliminar las columnas agregadas en la función up
    await queryInterface.removeColumn("Ponentes", "comprobante_url");
    await queryInterface.removeColumn("Ponentes", "cedula");
    await queryInterface.removeColumn("Ponentes", "edad");
    await queryInterface.removeColumn("Ponentes", "nombres");
    await queryInterface.removeColumn("Ponentes", "telefono");
    await queryInterface.removeColumn("Ponentes", "id_evento");
    await queryInterface.removeColumn("Ponentes", "email");
    await queryInterface.removeColumn("Ponentes", "profesion");
  },
};

//ponentes
// ("use strict");
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable("Ponentes", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       tematica: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       curriculum_url: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       comprobante_url: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW,
//       },
//       nombres: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       id_evento: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       cedula: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         validate: {
//           isEmail: true,
//         },
//         unique: true,
//       },
//       edad: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       profesion: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       telefono: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable("Ponentes");
//   },
// };
