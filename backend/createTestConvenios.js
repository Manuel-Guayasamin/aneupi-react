const { Convenio } = require("./models");

// Datos para la generación aleatoria
const organizaciones = ['Empresa A', 'Empresa B', 'Organización C'];
const tiposConvenio = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
const estados = ['En proceso', 'Aprobado', 'Rechazado'];
const modalidades = [1, 2, 3]; // Suponiendo que tienes un modelo de Modalidad con IDs 1, 2, 3

// Función para generar una fecha aleatoria entre dos fechas
function getRandomDate(startDate, endDate) {
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
}

// Función para generar un número aleatorio entre dos números
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para registrar 20 convenios ficticios
async function registrarConvenios() {
  try {
    for (let i = 0; i < 20; i++) {
      const nombreOrganizacion = organizaciones[Math.floor(Math.random() * organizaciones.length)];
      const tipoConvenio = tiposConvenio[Math.floor(Math.random() * tiposConvenio.length)];
      const estado = estados[Math.floor(Math.random() * estados.length)];
      const idModalidad = modalidades[Math.floor(Math.random() * modalidades.length)];
      const fechaInicio = getRandomDate(new Date(), new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)); // Fecha aleatoria en el próximo año
      const fechaFin = getRandomDate(fechaInicio, new Date(fechaInicio.getTime() + 365 * 24 * 60 * 60 * 1000)); // Fecha aleatoria dentro de un año desde la fecha de inicio

      const nuevoConvenio = new Convenio({
        id_usuario: 1, // ID del usuario asociado al convenio
        id_tipoconvenio: 1, // ID del tipo de convenio (ajusta según tus necesidades)
        id_estado: 1, // ID del estado del convenio (ajusta según tus necesidades)
        id_modalidad: idModalidad,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        duracion: getRandomNumber(1, 12), // Duración del convenio en meses
        nombreOrganizacion,
        descripcion: "Descripción del convenio", // Puedes ajustar la descripción según sea necesario
      });

      await nuevoConvenio.save();
    }
    console.log('Se han registrado 20 convenios ficticios correctamente.');
  } catch (error) {
    console.error('Error al registrar convenios:', error);
  }
}

// Ejecutar la función para registrar convenios
registrarConvenios();
