const {
  createPostulanteExterno,
} = require("./controllers/postulanteExternoController");

// Función para generar un número aleatorio entre un rango dado
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Simulación de objeto res para capturar la respuesta
let respuesta = null;
const res = {
  status: (statusCode) => ({
    json: (data) => {
      respuesta = { statusCode, data };
    },
  }),
};

// Definir una función asincrónica para generar y enviar 20 registros de prueba
async function enviarRegistrosPrueba() {
  for (let i = 0; i < 20; i++) {
    // Generar datos de prueba aleatorios
    const req = {
      body: {
        id_usuario: 1, // Cambia esto al ID de un usuario existente en tu base de datos
        id_modalidad: getRandomNumber(1, 4), // Generar un ID de modalidad aleatorio
        universidad: "Universidad de Prueba " + i,
        descripcion: "Descripción de prueba " + i,
        pais: "País de Prueba " + i,
        ciudad: "Ciudad de Prueba " + i,
        direccion: "Dirección de Prueba " + i,
        curriculum: { path: "/ruta/al/curriculum.pdf" },
        is_dispacidad: Math.random() < 0.5, // Generar un valor booleano aleatorio
        empresa: "Empresa de Prueba " + i,
        tipo_practica: "Práctica de Prueba " + i,
        fecha_inicio: "2024-06-01",
        fecha_fin: "2024-09-01",
        total_horas: getRandomNumber(100, 500),
      },
    };

    try {
      // Llamada a la función createPostulanteExterno con los datos de prueba
      await createPostulanteExterno(req, res);

      // Imprimir la respuesta
      console.log("Registro creado correctamente:", respuesta);
    } catch (error) {
      console.error("Ocurrió un error:", error);
    }
  }
}

// Llamar a la función asincrónica para generar y enviar los registros de prueba
enviarRegistrosPrueba();
