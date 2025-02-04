const {
  Usuario,
  Rol,
  Modalidad,
  Estado,
  TipoConvenio,
  TipoBiblioteca,
  TipoExpediente,
  Pais,
  Servicio,
  EstadoReporte
} = require("./models"); // Importa los modelos Usuario y Rol
const bcrypt = require("bcrypt");

// Función para crear Estados de Reportes
async function crearEstadoReportes() {
  try {
    const recibido = await EstadoReporte.findOne({ where: {nombre: "Recibido" }});
    const atentido = await EstadoReporte.findOne({ where: {nombre: "Atendido" }});

    if (!recibido) {
      await EstadoReporte.create({ nombre: "Recibido" });
      console.log("Estado de reporte creado: Recibido");
    }

    if (!atentido) {
      await EstadoReporte.create({ nombre: "Atendido" });
      console.log("Estado de reporte creado: Atendido");
    }
  } catch (error) {
    console.error("Error al crear estados de reporte:", error);
  }
}

// Función para crear roles
async function crearRoles() {
  try {
    // Verifica si los roles ya existen en la base de datos
    const rolAdmin = await Rol.findOne({ where: { nombre: "Administrador" } });
    const rolUsuario = await Rol.findOne({ where: { nombre: "Usuario" } });
    const rolProfesional = await Rol.findOne({
      where: { nombre: "Profesional" },
    });

    // Si alguno de los roles ya existe, no es necesario crearlos nuevamente
    if (rolAdmin && rolUsuario && rolProfesional) {
      console.log("Los roles ya existen en la base de datos");
      return;
    }

    // Si alguno de los roles no existe, los crea en la base de datos
    if (!rolAdmin) {
      await Rol.create({ nombre: "Administrador" });
      console.log("Rol Administrador creado exitosamente");
    }
    if (!rolUsuario) {
      await Rol.create({ nombre: "Usuario" });
      console.log("Rol Usuario creado exitosamente");
    }
    if (!rolProfesional) {
      await Rol.create({ nombre: "Profesional" });
      console.log("Rol Profesional creado exitosamente");
    }
  } catch (error) {
    console.error("Error al crear roles:", error);
  }
}

// Función para crear la cuenta de administrador por defecto
async function crearAdministrador() {
  try {
    // Verifica si ya existe un rol de Administrador en la base de datos
    const rolAdmin = await Rol.findOne({ where: { nombre: "Administrador" } });

    // Si el rol de Administrador no existe, no se puede crear la cuenta de administrador
    if (!rolAdmin) {
      console.log(
        "El rol de Administrador no existe en la base de datos. Por favor, asegúrate de crear el rol de Administrador primero."
      );
      return;
    }

    // Verifica si ya existe un usuario con el nombre de usuario de administrador
    const adminExistente = await Usuario.findOne({
      where: { nombreUsuario: "admin" },
    });

    // Si ya existe un usuario con el nombre de usuario de administrador, no es necesario crear uno nuevo
    if (adminExistente) {
      console.log("Ya existe un usuario de administrador en la base de datos.");
      return;
    }

    // Encripta la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash("aneupi2024", 10); // Recuerda usar una contraseña segura

    // Crea la cuenta de administrador por defecto
    await Usuario.create({
      nombreUsuario: "admin",
      nombres: "Administrador",
      apellidos: "Principal",
      email: "administrador@aneupi.com",
      password: hashedPassword,
      telefono: "0987654321", // Contraseña encriptada
      identificacion: "1234567890", // Esto puede variar según tus requisitos
      id_rol: rolAdmin.id, // Asigna el ID del rol de Administrador
    });

    console.log("Cuenta de administrador creada exitosamente");
  } catch (error) {
    console.error("Error al crear la cuenta de administrador:", error);
  }
}

// Función para crear estados
async function crearEstados() {
  try {
    // Verifica si los estados ya existen en la base de datos
    const estadoPendiente = await Estado.findOne({
      where: { nombre: "Pendiente" },
    });
    const estadoAprobado = await Estado.findOne({
      where: { nombre: "Aprobado" },
    });
    const estadoFinalizado = await Estado.findOne({
      where: { nombre: "Finalizado" },
    });
    const estadoRechazado = await Estado.findOne({
      where: { nombre: "Rechazado" },
    });

    // Si alguno de los estados ya existe, no es necesario crearlos nuevamente
    if (
      estadoPendiente &&
      estadoAprobado &&
      estadoRechazado &&
      estadoFinalizado
    ) {
      console.log("Los estados ya existen en la base de datos");
      return;
    }

    // Si alguno de los estados no existe, los crea en la base de datos
    if (!estadoPendiente) {
      await Estado.create({ nombre: "Pendiente" });
      console.log("Estado Pendiente creado exitosamente");
    }
    if (!estadoAprobado) {
      await Estado.create({ nombre: "Aprobado" });
      console.log("Estado Aprobado creado exitosamente");
    }
    if (!estadoRechazado) {
      await Estado.create({ nombre: "Rechazado" });
      console.log("Estado Rechazado creado exitosamente");
    }
    if (!estadoFinalizado) {
      await Estado.create({ nombre: "Finalizado" });
      console.log("Estado Finalizado creado exitosamente");
    }
  } catch (error) {
    console.error("Error al crear estados:", error);
  }
}

// Función para crear modalidades
async function crearModalidades() {
  try {
    // Verifica si las modalidades ya existen en la base de datos
    const modalidadVirtual = await Modalidad.findOne({
      where: { nombre: "Virtual" },
    });
    const modalidadPresencial = await Modalidad.findOne({
      where: { nombre: "Presencial" },
    });
    const modalidadHibrida = await Modalidad.findOne({
      where: { nombre: "Hibrida" },
    });

    // Si alguna de las modalidades ya existe, no es necesario crearlas nuevamente
    if (modalidadVirtual && modalidadPresencial && modalidadHibrida) {
      console.log("Las modalidades ya existen en la base de datos");
      return;
    }

    // Si alguna de las modalidades no existe, las crea en la base de datos
    if (!modalidadVirtual) {
      await Modalidad.create({ nombre: "Virtual" });
      console.log("Modalidad Virtual creada exitosamente");
    }
    if (!modalidadPresencial) {
      await Modalidad.create({ nombre: "Presencial" });
      console.log("Modalidad Presencial creada exitosamente");
    }
    if (!modalidadHibrida) {
      await Modalidad.create({ nombre: "Hibrida" });
      console.log("Modalidad Híbrida creada exitosamente");
    }
  } catch (error) {
    console.error("Error al crear modalidades:", error);
  }
}

async function crearTipoConvenio() {
  try {
    // Verifica si las modalidades ya existen en la base de datos
    const tiposGAD = await TipoConvenio.findOne({
      where: { nombre: "Convenio Marco y de Practicas Pre-Profesionales" },
    });
    const tiposUniversidades = await TipoConvenio.findOne({
      where: { nombre: "Convenio Marco o de Cooperacion" },
    });
    const tiposGobiernos = await TipoConvenio.findOne({
      where: { nombre: "Convenios" },
    });

    // Si alguna de las modalidades ya existe, no es necesario crearlas nuevamente
    if (tiposGAD && tiposUniversidades && tiposGobiernos) {
      console.log("Las modalidades ya existen en la base de datos");
      return;
    }

    // Si alguna de las modalidades no existe, las crea en la base de datos
    if (!tiposGAD) {
      await TipoConvenio.create({
        nombre: "Convenio Marco y de Practicas Pre-Profesionales",
      });
      console.log(
        "Convenio Marco y de Practicas Pre-Profesionales creado exitosamente"
      );
    }
    if (!tiposUniversidades) {
      await TipoConvenio.create({ nombre: "Convenio Marco o de Cooperacion" });
      console.log("Convenio Marco o de Cooperacion creado exitosamente");
    }
    if (!tiposGobiernos) {
      await TipoConvenio.create({ nombre: "Convenios" });
      console.log("Convenio creado exitosamente");
    }
  } catch (error) {
    console.error("Error al crear tipos de convenios:", error);
  }
}


// Función para crear registros de tipos de expediente
async function createTipoExpediente() {
  try {
    // Crear dos tipos de expediente: Sentencias y Resoluciones
    await TipoExpediente.bulkCreate([
      { nombre: "Sentencia" },
      { nombre: "Resolución" },
    ]);

    console.log("Tipos de expediente creados correctamente.");
  } catch (error) {
    console.error("Error al crear tipos de expediente:", error);
  }
}

// Función para crear registros de tipos de biblioteca
async function createTipoBiblioteca() {
  try {
    // Crear tres tipos de biblioteca: libro, artículo y revista
    await TipoBiblioteca.bulkCreate([
      { nombre: "Libro" },
      { nombre: "Artículo" },
      { nombre: "Revista" },
    ]);

    console.log("Tipos de biblioteca creados correctamente.");
  } catch (error) {
    console.error("Error al crear tipos de biblioteca:", error);
  }
}

// Función para crear países iniciales
async function crearPaises() {
  try {
    // Verifica si los países ya existen en la base de datos
    const afganistan = await Pais.findOne({
      where: { nombre: "Afganistán" },
    });
    const albania = await Pais.findOne({
      where: { nombre: "Albania" },
    });
    const argelia = await Pais.findOne({
      where: { nombre: "Argelia" },
    });
    const andorra = await Pais.findOne({
      where: { nombre: "Andorra" },
    });
    const angola = await Pais.findOne({
      where: { nombre: "Angola" },
    });
    const antigua_y_barbuda = await Pais.findOne({
      where: { nombre: "Antigua y Barbuda" },
    });
    const argentina = await Pais.findOne({
      where: { nombre: "Argentina" },
    });
    const armenia = await Pais.findOne({
      where: { nombre: "Armenia" },
    });
    const australia = await Pais.findOne({
      where: { nombre: "Australia" },
    });
    const austria = await Pais.findOne({
      where: { nombre: "Austria" },
    });
    const azerbaiyan = await Pais.findOne({
      where: { nombre: "Azerbaiyán" },
    });
    const bahamas = await Pais.findOne({
      where: { nombre: "Bahamas" },
    });
    const barein = await Pais.findOne({
      where: { nombre: "Baréin" },
    });
    const banglades = await Pais.findOne({
      where: { nombre: "Bangladés" },
    });
    const barbados = await Pais.findOne({
      where: { nombre: "Barbados" },
    });
    const bielorrusia = await Pais.findOne({
      where: { nombre: "Bielorrusia" },
    });
    const belgica = await Pais.findOne({
      where: { nombre: "Bélgica" },
    });
    const belice = await Pais.findOne({
      where: { nombre: "Belice" },
    });
    const benin = await Pais.findOne({
      where: { nombre: "Benín" },
    });
    const butan = await Pais.findOne({
      where: { nombre: "Bután" },
    });
    const bolivia = await Pais.findOne({
      where: { nombre: "Bolivia" },
    });
    const bosnia_y_herzegovina = await Pais.findOne({
      where: { nombre: "Bosnia y Herzegovina" },
    });
    const botsuana = await Pais.findOne({
      where: { nombre: "Botsuana" },
    });
    const brasil = await Pais.findOne({
      where: { nombre: "Brasil" },
    });
    const brunei = await Pais.findOne({
      where: { nombre: "Brunéi" },
    });
    const bulgaria = await Pais.findOne({
      where: { nombre: "Bulgaria" },
    });
    const burkina_faso = await Pais.findOne({
      where: { nombre: "Burkina Faso" },
    });
    const burundi = await Pais.findOne({
      where: { nombre: "Burundi" },
    });
    const cabo_verde = await Pais.findOne({
      where: { nombre: "Cabo Verde" },
    });
    const camboya = await Pais.findOne({
      where: { nombre: "Camboya" },
    });
    const camerun = await Pais.findOne({
      where: { nombre: "Camerún" },
    });
    const canada = await Pais.findOne({
      where: { nombre: "Canadá" },
    });
    const republica_centroafricana = await Pais.findOne({
      where: { nombre: "República Centroafricana" },
    });
    const chad = await Pais.findOne({
      where: { nombre: "Chad" },
    });
    const chile = await Pais.findOne({
      where: { nombre: "Chile" },
    });
    const china = await Pais.findOne({
      where: { nombre: "China" },
    });
    const colombia = await Pais.findOne({
      where: { nombre: "Colombia" },
    });
    const comoras = await Pais.findOne({
      where: { nombre: "Comoras" },
    });
    const republica_democratica_del_congo = await Pais.findOne({
      where: { nombre: "República Democrática del Congo" },
    });
    const republica_del_congo = await Pais.findOne({
      where: { nombre: "República del Congo" },
    });
    const costa_rica = await Pais.findOne({
      where: { nombre: "Costa Rica" },
    });
    const croacia = await Pais.findOne({
      where: { nombre: "Croacia" },
    });
    const cuba = await Pais.findOne({
      where: { nombre: "Cuba" },
    });
    const chipre = await Pais.findOne({
      where: { nombre: "Chipre" },
    });
    const republica_checa = await Pais.findOne({
      where: { nombre: "República Checa" },
    });
    const dinamarca = await Pais.findOne({
      where: { nombre: "Dinamarca" },
    });
    const yibuti = await Pais.findOne({
      where: { nombre: "Yibuti" },
    });
    const dominica = await Pais.findOne({
      where: { nombre: "Dominica" },
    });
    const republica_dominicana = await Pais.findOne({
      where: { nombre: "República Dominicana" },
    });
    const ecuador = await Pais.findOne({
      where: { nombre: "Ecuador" },
    });
    const egipto = await Pais.findOne({
      where: { nombre: "Egipto" },
    });
    const el_salvador = await Pais.findOne({
      where: { nombre: "El Salvador" },
    });
    const guinea_ecuatorial = await Pais.findOne({
      where: { nombre: "Guinea Ecuatorial" },
    });
    const eritrea = await Pais.findOne({
      where: { nombre: "Eritrea" },
    });
    const estonia = await Pais.findOne({
      where: { nombre: "Estonia" },
    });
    const esuatini = await Pais.findOne({
      where: { nombre: "Esuatini" },
    });
    const etiopia = await Pais.findOne({
      where: { nombre: "Etiopía" },
    });
    const fiyi = await Pais.findOne({
      where: { nombre: "Fiyi" },
    });
    const finlandia = await Pais.findOne({
      where: { nombre: "Finlandia" },
    });
    const francia = await Pais.findOne({
      where: { nombre: "Francia" },
    });
    const gabon = await Pais.findOne({
      where: { nombre: "Gabón" },
    });
    const gambia = await Pais.findOne({
      where: { nombre: "Gambia" },
    });
    const georgia = await Pais.findOne({
      where: { nombre: "Georgia" },
    });
    const alemania = await Pais.findOne({
      where: { nombre: "Alemania" },
    });
    const ghana = await Pais.findOne({
      where: { nombre: "Ghana" },
    });
    const grecia = await Pais.findOne({
      where: { nombre: "Grecia" },
    });
    const granada = await Pais.findOne({
      where: { nombre: "Granada" },
    });
    const guatemala = await Pais.findOne({
      where: { nombre: "Guatemala" },
    });
    const guinea = await Pais.findOne({
      where: { nombre: "Guinea" },
    });
    const guinea_bisau = await Pais.findOne({
      where: { nombre: "Guinea-Bisáu" },
    });
    const guyana = await Pais.findOne({
      where: { nombre: "Guyana" },
    });
    const haiti = await Pais.findOne({
      where: { nombre: "Haití" },
    });
    const honduras = await Pais.findOne({
      where: { nombre: "Honduras" },
    });
    const hungria = await Pais.findOne({
      where: { nombre: "Hungría" },
    });
    const islandia = await Pais.findOne({
      where: { nombre: "Islandia" },
    });
    const india = await Pais.findOne({
      where: { nombre: "India" },
    });
    const indonesia = await Pais.findOne({
      where: { nombre: "Indonesia" },
    });
    const iran = await Pais.findOne({
      where: { nombre: "Irán" },
    });
    const irak = await Pais.findOne({
      where: { nombre: "Irak" },
    });
    const irlanda = await Pais.findOne({
      where: { nombre: "Irlanda" },
    });
    const israel = await Pais.findOne({
      where: { nombre: "Israel" },
    });
    const italia = await Pais.findOne({
      where: { nombre: "Italia" },
    });
    const jamaica = await Pais.findOne({
      where: { nombre: "Jamaica" },
    });
    const japon = await Pais.findOne({
      where: { nombre: "Japón" },
    });
    const jordania = await Pais.findOne({
      where: { nombre: "Jordania" },
    });
    const kazajistan = await Pais.findOne({
      where: { nombre: "Kazajistán" },
    });
    const kenia = await Pais.findOne({
      where: { nombre: "Kenia" },
    });
    const kiribati = await Pais.findOne({
      where: { nombre: "Kiribati" },
    });
    const corea_del_norte = await Pais.findOne({
      where: { nombre: "Corea del Norte" },
    });
    const corea_del_sur = await Pais.findOne({
      where: { nombre: "Corea del Sur" },
    });
    const kosovo = await Pais.findOne({
      where: { nombre: "Kosovo" },
    });
    const kuwait = await Pais.findOne({
      where: { nombre: "Kuwait" },
    });
    const kirguistan = await Pais.findOne({
      where: { nombre: "Kirguistán" },
    });
    const laos = await Pais.findOne({
      where: { nombre: "Laos" },
    });
    const letonia = await Pais.findOne({
      where: { nombre: "Letonia" },
    });
    const libano = await Pais.findOne({
      where: { nombre: "Líbano" },
    });
    const lesoto = await Pais.findOne({
      where: { nombre: "Lesoto" },
    });
    const liberia = await Pais.findOne({
      where: { nombre: "Liberia" },
    });
    const libia = await Pais.findOne({
      where: { nombre: "Libia" },
    });
    const liechtenstein = await Pais.findOne({
      where: { nombre: "Liechtenstein" },
    });
    const lituania = await Pais.findOne({
      where: { nombre: "Lituania" },
    });
    const luxemburgo = await Pais.findOne({
      where: { nombre: "Luxemburgo" },
    });
    const madagascar = await Pais.findOne({
      where: { nombre: "Madagascar" },
    });
    const malaui = await Pais.findOne({
      where: { nombre: "Malaui" },
    });
    const malasia = await Pais.findOne({
      where: { nombre: "Malasia" },
    });
    const maldivas = await Pais.findOne({
      where: { nombre: "Maldivas" },
    });
    const mali = await Pais.findOne({
      where: { nombre: "Malí" },
    });
    const malta = await Pais.findOne({
      where: { nombre: "Malta" },
    });
    const islas_marshall = await Pais.findOne({
      where: { nombre: "Islas Marshall" },
    });
    const mauritania = await Pais.findOne({
      where: { nombre: "Mauritania" },
    });
    const mauricio = await Pais.findOne({
      where: { nombre: "Mauricio" },
    });
    const mexico = await Pais.findOne({
      where: { nombre: "México" },
    });
    const micronesia = await Pais.findOne({
      where: { nombre: "Micronesia" },
    });
    const moldavia = await Pais.findOne({
      where: { nombre: "Moldavia" },
    });
    const monaco = await Pais.findOne({
      where: { nombre: "Mónaco" },
    });
    const mongolia = await Pais.findOne({
      where: { nombre: "Mongolia" },
    });
    const montenegro = await Pais.findOne({
      where: { nombre: "Montenegro" },
    });
    const marruecos = await Pais.findOne({
      where: { nombre: "Marruecos" },
    });
    const mozambique = await Pais.findOne({
      where: { nombre: "Mozambique" },
    });
    const myanmar = await Pais.findOne({
      where: { nombre: "Myanmar" },
    });
    const namibia = await Pais.findOne({
      where: { nombre: "Namibia" },
    });
    const nauru = await Pais.findOne({
      where: { nombre: "Nauru" },
    });
    const nepal = await Pais.findOne({
      where: { nombre: "Nepal" },
    });
    const paises_bajos = await Pais.findOne({
      where: { nombre: "Países Bajos" },
    });
    const nueva_zelanda = await Pais.findOne({
      where: { nombre: "Nueva Zelanda" },
    });
    const nicaragua = await Pais.findOne({
      where: { nombre: "Nicaragua" },
    });
    const niger = await Pais.findOne({
      where: { nombre: "Níger" },
    });
    const nigeria = await Pais.findOne({
      where: { nombre: "Nigeria" },
    });
    const macedonia_del_norte = await Pais.findOne({
      where: { nombre: "Macedonia del Norte" },
    });
    const noruega = await Pais.findOne({
      where: { nombre: "Noruega" },
    });
    const oman = await Pais.findOne({
      where: { nombre: "Omán" },
    });
    const pakistan = await Pais.findOne({
      where: { nombre: "Pakistán" },
    });
    const palau = await Pais.findOne({
      where: { nombre: "Palaos" },
    });
    const palestina = await Pais.findOne({
      where: { nombre: "Palestina" },
    });
    const panama = await Pais.findOne({
      where: { nombre: "Panamá" },
    });
    const papua_nueva_guinea = await Pais.findOne({
      where: { nombre: "Papúa Nueva Guinea" },
    });
    const paraguay = await Pais.findOne({
      where: { nombre: "Paraguay" },
    });
    const peru = await Pais.findOne({
      where: { nombre: "Perú" },
    });
    const filipinas = await Pais.findOne({
      where: { nombre: "Filipinas" },
    });
    const polonia = await Pais.findOne({
      where: { nombre: "Polonia" },
    });
    const portugal = await Pais.findOne({
      where: { nombre: "Portugal" },
    });
    const qatar = await Pais.findOne({
      where: { nombre: "Qatar" },
    });
    const rumania = await Pais.findOne({
      where: { nombre: "Rumanía" },
    });
    const rusia = await Pais.findOne({
      where: { nombre: "Rusia" },
    });
    const ruanda = await Pais.findOne({
      where: { nombre: "Ruanda" },
    });
    const san_cristobal_y_nieves = await Pais.findOne({
      where: { nombre: "San Cristóbal y Nieves" },
    });
    const santa_lucia = await Pais.findOne({
      where: { nombre: "Santa Lucía" },
    });
    const san_vicente_y_las_granadinas = await Pais.findOne({
      where: { nombre: "San Vicente y las Granadinas" },
    });
    const samoa = await Pais.findOne({
      where: { nombre: "Samoa" },
    });
    const san_marino = await Pais.findOne({
      where: { nombre: "San Marino" },
    });
    const santo_tome_y_principe = await Pais.findOne({
      where: { nombre: "Santo Tomé y Príncipe" },
    });
    const arabia_saudita = await Pais.findOne({
      where: { nombre: "Arabia Saudita" },
    });
    const senegal = await Pais.findOne({
      where: { nombre: "Senegal" },
    });
    const serbia = await Pais.findOne({
      where: { nombre: "Serbia" },
    });
    const seychelles = await Pais.findOne({
      where: { nombre: "Seychelles" },
    });
    const sierra_leona = await Pais.findOne({
      where: { nombre: "Sierra Leona" },
    });
    const singapur = await Pais.findOne({
      where: { nombre: "Singapur" },
    });
    const eslovaquia = await Pais.findOne({
      where: { nombre: "Eslovaquia" },
    });
    const eslovenia = await Pais.findOne({
      where: { nombre: "Eslovenia" },
    });
    const islas_salomon = await Pais.findOne({
      where: { nombre: "Islas Salomón" },
    });
    const somalia = await Pais.findOne({
      where: { nombre: "Somalia" },
    });
    const sudafrica = await Pais.findOne({
      where: { nombre: "Sudáfrica" },
    });
    const sudan_del_sur = await Pais.findOne({
      where: { nombre: "Sudán del Sur" },
    });
    const espania = await Pais.findOne({
      where: { nombre: "España" },
    });
    const sri_lanka = await Pais.findOne({
      where: { nombre: "Sri Lanka" },
    });
    const sudan = await Pais.findOne({
      where: { nombre: "Sudán" },
    });
    const surinam = await Pais.findOne({
      where: { nombre: "Surinam" },
    });
    const suecia = await Pais.findOne({
      where: { nombre: "Suecia" },
    });
    const suiza = await Pais.findOne({
      where: { nombre: "Suiza" },
    });
    const siria = await Pais.findOne({
      where: { nombre: "Siria" },
    });
    const taiwan = await Pais.findOne({
      where: { nombre: "Taiwán" },
    });
    const tayikistan = await Pais.findOne({
      where: { nombre: "Tayikistán" },
    });
    const tanzania = await Pais.findOne({
      where: { nombre: "Tanzania" },
    });
    const tailandia = await Pais.findOne({
      where: { nombre: "Tailandia" },
    });
    const timor_oriental = await Pais.findOne({
      where: { nombre: "Timor Oriental" },
    });
    const togo = await Pais.findOne({
      where: { nombre: "Togo" },
    });
    const tonga = await Pais.findOne({
      where: { nombre: "Tonga" },
    });
    const trinidad_y_tobago = await Pais.findOne({
      where: { nombre: "Trinidad y Tobago" },
    });
    const tunez = await Pais.findOne({
      where: { nombre: "Túnez" },
    });
    const turquia = await Pais.findOne({
      where: { nombre: "Turquía" },
    });
    const turkmenistan = await Pais.findOne({
      where: { nombre: "Turkmenistán" },
    });
    const tuvalu = await Pais.findOne({
      where: { nombre: "Tuvalu" },
    });
    const uganda = await Pais.findOne({
      where: { nombre: "Uganda" },
    });
    const ucrania = await Pais.findOne({
      where: { nombre: "Ucrania" },
    });
    const emiratos_arabes_unidos = await Pais.findOne({
      where: { nombre: "Emiratos Árabes Unidos" },
    });
    const reino_unido = await Pais.findOne({
      where: { nombre: "Reino Unido" },
    });
    const estados_unidos = await Pais.findOne({
      where: { nombre: "Estados Unidos" },
    });
    const uruguay = await Pais.findOne({
      where: { nombre: "Uruguay" },
    });
    const uzbekistan = await Pais.findOne({
      where: { nombre: "Uzbekistán" },
    });
    const vanuatu = await Pais.findOne({
      where: { nombre: "Vanuatu" },
    });
    const ciudad_del_vaticano = await Pais.findOne({
      where: { nombre: "Ciudad del Vaticano" },
    });
    const venezuela = await Pais.findOne({
      where: { nombre: "Venezuela" },
    });
    const vietnam = await Pais.findOne({
      where: { nombre: "Vietnam" },
    });
    const yemen = await Pais.findOne({
      where: { nombre: "Yemen" },
    });
    const zambia = await Pais.findOne({
      where: { nombre: "Zambia" },
    });
    const zimbabue = await Pais.findOne({
      where: { nombre: "Zimbabue" },
    });

    // Si el país no existe, se crea en la base de datos
    if (!afganistan) {
      await Pais.create({
        nombre: "Afganistán",
        tlf_code: "+93",
      });
      console.log("País registrado exitosamente: Afganistán");
    }
    if (!albania) {
      await Pais.create({
        nombre: "Albania",
        tlf_code: "+355",
      });
      console.log("País registrado exitosamente: Albania");
    }
    if (!argelia) {
      await Pais.create({
        nombre: "Argelia",
        tlf_code: "+213",
      });
      console.log("País registrado exitosamente: Argelia");
    }
    if (!andorra) {
      await Pais.create({
        nombre: "Andorra",
        tlf_code: "+376",
      });
      console.log("País registrado exitosamente: Andorra");
    }
    if (!angola) {
      await Pais.create({
        nombre: "Angola",
        tlf_code: "+244",
      });
      console.log("País registrado exitosamente: Angola");
    }
    if (!antigua_y_barbuda) {
      await Pais.create({
        nombre: "Antigua y Barbuda",
        tlf_code: "+1-268",
      });
      console.log("País registrado exitosamente: Antigua y Barbuda");
    }
    if (!argentina) {
      await Pais.create({
        nombre: "Argentina",
        tlf_code: "+54",
      });
      console.log("País registrado exitosamente: Argentina");
    }
    if (!armenia) {
      await Pais.create({
        nombre: "Armenia",
        tlf_code: "+374",
      });
      console.log("País registrado exitosamente: Armenia");
    }
    if (!australia) {
      await Pais.create({
        nombre: "Australia",
        tlf_code: "+61",
      });
      console.log("País registrado exitosamente: Australia");
    }
    if (!austria) {
      await Pais.create({
        nombre: "Austria",
        tlf_code: "+43",
      });
      console.log("País registrado exitosamente: Austria");
    }
    if (!azerbaiyan) {
      await Pais.create({
        nombre: "Azerbaiyán",
        tlf_code: "+994",
      });
      console.log("País registrado exitosamente: Azerbaiyán");
    }
    if (!bahamas) {
      await Pais.create({
        nombre: "Bahamas",
        tlf_code: "+1-242",
      });
      console.log("País registrado exitosamente: Bahamas");
    }
    if (!barein) {
      await Pais.create({
        nombre: "Baréin",
        tlf_code: "+973",
      });
      console.log("País registrado exitosamente: Baréin");
    }
    if (!banglades) {
      await Pais.create({
        nombre: "Bangladés",
        tlf_code: "+880",
      });
      console.log("País registrado exitosamente: Bangladés");
    }
    if (!barbados) {
      await Pais.create({
        nombre: "Barbados",
        tlf_code: "+1-246",
      });
      console.log("País registrado exitosamente: Barbados");
    }
    if (!bielorrusia) {
      await Pais.create({
        nombre: "Bielorrusia",
        tlf_code: "+375",
      });
      console.log("País registrado exitosamente: Bielorrusia");
    }
    if (!belgica) {
      await Pais.create({
        nombre: "Bélgica",
        tlf_code: "+32",
      });
      console.log("País registrado exitosamente: Bélgica");
    }
    if (!belice) {
      await Pais.create({
        nombre: "Belice",
        tlf_code: "+501",
      });
      console.log("País registrado exitosamente: Belice");
    }
    if (!benin) {
      await Pais.create({
        nombre: "Benín",
        tlf_code: "+229",
      });
      console.log("País registrado exitosamente: Benín");
    }
    if (!butan) {
      await Pais.create({
        nombre: "Bután",
        tlf_code: "+975",
      });
      console.log("País registrado exitosamente: Bután");
    }
    if (!bolivia) {
      await Pais.create({
        nombre: "Bolivia",
        tlf_code: "+591",
      });
      console.log("País registrado exitosamente: Bolivia");
    }
    if (!bosnia_y_herzegovina) {
      await Pais.create({
        nombre: "Bosnia y Herzegovina",
        tlf_code: "+387",
      });
      console.log("País registrado exitosamente: Bosnia y Herzegovina");
    }
    if (!botsuana) {
      await Pais.create({
        nombre: "Botsuana",
        tlf_code: "+267",
      });
      console.log("País registrado exitosamente: Botsuana");
    }
    if (!brasil) {
      await Pais.create({
        nombre: "Brasil",
        tlf_code: "+55",
      });
      console.log("País registrado exitosamente: Brasil");
    }
    if (!brunei) {
      await Pais.create({
        nombre: "Brunéi",
        tlf_code: "+673",
      });
      console.log("País registrado exitosamente: Brunéi");
    }
    if (!bulgaria) {
      await Pais.create({
        nombre: "Bulgaria",
        tlf_code: "+359",
      });
      console.log("País registrado exitosamente: Bulgaria");
    }
    if (!burkina_faso) {
      await Pais.create({
        nombre: "Burkina Faso",
        tlf_code: "+226",
      });
      console.log("País registrado exitosamente: Burkina Faso");
    }
    if (!burundi) {
      await Pais.create({
        nombre: "Burundi",
        tlf_code: "+257",
      });
      console.log("País registrado exitosamente: Burundi");
    }
    if (!cabo_verde) {
      await Pais.create({
        nombre: "Cabo Verde",
        tlf_code: "+238",
      });
      console.log("País registrado exitosamente: Cabo Verde");
    }
    if (!camboya) {
      await Pais.create({
        nombre: "Camboya",
        tlf_code: "+855",
      });
      console.log("País registrado exitosamente: Camboya");
    }
    if (!camerun) {
      await Pais.create({
        nombre: "Camerún",
        tlf_code: "+237",
      });
      console.log("País registrado exitosamente: Camerún");
    }
    if (!canada) {
      await Pais.create({
        nombre: "Canadá",
        tlf_code: "+1",
      });
      console.log("País registrado exitosamente: Canadá");
    }
    if (!republica_centroafricana) {
      await Pais.create({
        nombre: "República Centroafricana",
        tlf_code: "+236",
      });
      console.log("País registrado exitosamente: República Centroafricana");
    }
    if (!chad) {
      await Pais.create({
        nombre: "Chad",
        tlf_code: "+235",
      });
      console.log("País registrado exitosamente: Chad");
    }
    if (!chile) {
      await Pais.create({
        nombre: "Chile",
        tlf_code: "+56",
      });
      console.log("País registrado exitosamente: Chile");
    }
    if (!china) {
      await Pais.create({
        nombre: "China",
        tlf_code: "+86",
      });
      console.log("País registrado exitosamente: China");
    }
    if (!colombia) {
      await Pais.create({
        nombre: "Colombia",
        tlf_code: "+57",
      });
      console.log("País registrado exitosamente: Colombia");
    }
    if (!comoras) {
      await Pais.create({
        nombre: "Comoras",
        tlf_code: "+269",
      });
      console.log("País registrado exitosamente: Comoras");
    }
    if (!republica_democratica_del_congo) {
      await Pais.create({
        nombre: "República Democrática del Congo",
        tlf_code: "+243",
      });
      console.log(
        "País registrado exitosamente: República Democrática del Congo"
      );
    }
    if (!republica_del_congo) {
      await Pais.create({
        nombre: "República del Congo",
        tlf_code: "+242",
      });
      console.log("País registrado exitosamente: República del Congo");
    }
    if (!costa_rica) {
      await Pais.create({
        nombre: "Costa Rica",
        tlf_code: "+506",
      });
      console.log("País registrado exitosamente: Costa Rica");
    }
    if (!croacia) {
      await Pais.create({
        nombre: "Croacia",
        tlf_code: "+385",
      });
      console.log("País registrado exitosamente: Croacia");
    }
    if (!cuba) {
      await Pais.create({
        nombre: "Cuba",
        tlf_code: "+53",
      });
      console.log("País registrado exitosamente: Cuba");
    }
    if (!chipre) {
      await Pais.create({
        nombre: "Chipre",
        tlf_code: "+357",
      });
      console.log("País registrado exitosamente: Chipre");
    }
    if (!republica_checa) {
      await Pais.create({
        nombre: "República Checa",
        tlf_code: "+420",
      });
      console.log("País registrado exitosamente: República Checa");
    }
    if (!dinamarca) {
      await Pais.create({
        nombre: "Dinamarca",
        tlf_code: "+45",
      });
      console.log("País registrado exitosamente: Dinamarca");
    }
    if (!yibuti) {
      await Pais.create({
        nombre: "Yibuti",
        tlf_code: "+253",
      });
      console.log("País registrado exitosamente: Yibuti");
    }
    if (!dominica) {
      await Pais.create({
        nombre: "Dominica",
        tlf_code: "+1-767",
      });
      console.log("País registrado exitosamente: Dominica");
    }
    if (!republica_dominicana) {
      await Pais.create({
        nombre: "República Dominicana",
        tlf_code: "+1-809",
      });
      console.log("País registrado exitosamente: República Dominicana");
    }
    if (!timor_oriental) {
      await Pais.create({
        nombre: "Timor Oriental",
        tlf_code: "+670",
      });
      console.log("País registrado exitosamente: Timor Oriental");
    }
    if (!ecuador) {
      await Pais.create({
        nombre: "Ecuador",
        tlf_code: "+593",
      });
      console.log("País registrado exitosamente: Ecuador");
    }
    if (!egipto) {
      await Pais.create({
        nombre: "Egipto",
        tlf_code: "+20",
      });
      console.log("País registrado exitosamente: Egipto");
    }
    if (!el_salvador) {
      await Pais.create({
        nombre: "El Salvador",
        tlf_code: "+503",
      });
      console.log("País registrado exitosamente: El Salvador");
    }
    if (!guinea_ecuatorial) {
      await Pais.create({
        nombre: "Guinea Ecuatorial",
        tlf_code: "+240",
      });
      console.log("País registrado exitosamente: Guinea Ecuatorial");
    }
    if (!eritrea) {
      await Pais.create({
        nombre: "Eritrea",
        tlf_code: "+291",
      });
      console.log("País registrado exitosamente: Eritrea");
    }
    if (!estonia) {
      await Pais.create({
        nombre: "Estonia",
        tlf_code: "+372",
      });
      console.log("País registrado exitosamente: Estonia");
    }
    if (!etiopia) {
      await Pais.create({
        nombre: "Etiopía",
        tlf_code: "+251",
      });
      console.log("País registrado exitosamente: Etiopía");
    }
    if (!fiyi) {
      await Pais.create({
        nombre: "Fiyi",
        tlf_code: "+679",
      });
      console.log("País registrado exitosamente: Fiyi");
    }
    if (!finlandia) {
      await Pais.create({
        nombre: "Finlandia",
        tlf_code: "+358",
      });
      console.log("País registrado exitosamente: Finlandia");
    }
    if (!francia) {
      await Pais.create({
        nombre: "Francia",
        tlf_code: "+33",
      });
      console.log("País registrado exitosamente: Francia");
    }
    if (!gabon) {
      await Pais.create({
        nombre: "Gabón",
        tlf_code: "+241",
      });
      console.log("País registrado exitosamente: Gabón");
    }
    if (!gambia) {
      await Pais.create({
        nombre: "Gambia",
        tlf_code: "+220",
      });
      console.log("País registrado exitosamente: Gambia");
    }
    if (!georgia) {
      await Pais.create({
        nombre: "Georgia",
        tlf_code: "+995",
      });
      console.log("País registrado exitosamente: Georgia");
    }
    if (!alemania) {
      await Pais.create({
        nombre: "Alemania",
        tlf_code: "+49",
      });
      console.log("País registrado exitosamente: Alemania");
    }
    if (!ghana) {
      await Pais.create({
        nombre: "Ghana",
        tlf_code: "+233",
      });
      console.log("País registrado exitosamente: Ghana");
    }
    if (!grecia) {
      await Pais.create({
        nombre: "Grecia",
        tlf_code: "+30",
      });
      console.log("País registrado exitosamente: Grecia");
    }
    if (!granada) {
      await Pais.create({
        nombre: "Granada",
        tlf_code: "+1-473",
      });
      console.log("País registrado exitosamente: Granada");
    }
    if (!guatemala) {
      await Pais.create({
        nombre: "Guatemala",
        tlf_code: "+502",
      });
      console.log("País registrado exitosamente: Guatemala");
    }
    if (!guinea) {
      await Pais.create({
        nombre: "Guinea",
        tlf_code: "+224",
      });
      console.log("País registrado exitosamente: Guinea");
    }
    if (!guinea_bisau) {
      await Pais.create({
        nombre: "Guinea-Bisáu",
        tlf_code: "+245",
      });
      console.log("País registrado exitosamente: Guinea-Bisáu");
    }
    if (!guyana) {
      await Pais.create({
        nombre: "Guyana",
        tlf_code: "+592",
      });
      console.log("País registrado exitosamente: Guyana");
    }
    if (!haiti) {
      await Pais.create({
        nombre: "Haití",
        tlf_code: "+509",
      });
      console.log("País registrado exitosamente: Haití");
    }
    if (!honduras) {
      await Pais.create({
        nombre: "Honduras",
        tlf_code: "+504",
      });
      console.log("País registrado exitosamente: Honduras");
    }
    if (!hungria) {
      await Pais.create({
        nombre: "Hungría",
        tlf_code: "+36",
      });
      console.log("País registrado exitosamente: Hungría");
    }
    if (!islandia) {
      await Pais.create({
        nombre: "Islandia",
        tlf_code: "+354",
      });
      console.log("País registrado exitosamente: Islandia");
    }
    if (!india) {
      await Pais.create({
        nombre: "India",
        tlf_code: "+91",
      });
      console.log("País registrado exitosamente: India");
    }
    if (!indonesia) {
      await Pais.create({
        nombre: "Indonesia",
        tlf_code: "+62",
      });
      console.log("País registrado exitosamente: Indonesia");
    }
    if (!iran) {
      await Pais.create({
        nombre: "Irán",
        tlf_code: "+98",
      });
      console.log("País registrado exitosamente: Irán");
    }
    if (!irak) {
      await Pais.create({
        nombre: "Irak",
        tlf_code: "+964",
      });
      console.log("País registrado exitosamente: Irak");
    }
    if (!irlanda) {
      await Pais.create({
        nombre: "Irlanda",
        tlf_code: "+353",
      });
      console.log("País registrado exitosamente: Irlanda");
    }
    if (!israel) {
      await Pais.create({
        nombre: "Israel",
        tlf_code: "+972",
      });
      console.log("País registrado exitosamente: Israel");
    }
    if (!italia) {
      await Pais.create({
        nombre: "Italia",
        tlf_code: "+39",
      });
      console.log("País registrado exitosamente: Italia");
    }
    if (!jamaica) {
      await Pais.create({
        nombre: "Jamaica",
        tlf_code: "+1-876",
      });
      console.log("País registrado exitosamente: Jamaica");
    }
    if (!japon) {
      await Pais.create({
        nombre: "Japón",
        tlf_code: "+81",
      });
      console.log("País registrado exitosamente: Japón");
    }
    if (!jordania) {
      await Pais.create({
        nombre: "Jordania",
        tlf_code: "+962",
      });
      console.log("País registrado exitosamente: Jordania");
    }
    if (!kazajistan) {
      await Pais.create({
        nombre: "Kazajistán",
        tlf_code: "+7",
      });
      console.log("País registrado exitosamente: Kazajistán");
    }
    if (!kenia) {
      await Pais.create({
        nombre: "Kenia",
        tlf_code: "+254",
      });
      console.log("País registrado exitosamente: Kenia");
    }
    if (!kiribati) {
      await Pais.create({
        nombre: "Kiribati",
        tlf_code: "+686",
      });
      console.log("País registrado exitosamente: Kiribati");
    }
    if (!corea_del_norte) {
      await Pais.create({
        nombre: "Corea del Norte",
        tlf_code: "+850",
      });
      console.log("País registrado exitosamente: Corea del Norte");
    }
    if (!corea_del_sur) {
      await Pais.create({
        nombre: "Corea del Sur",
        tlf_code: "+82",
      });
      console.log("País registrado exitosamente: Corea del Sur");
    }
    if (!kosovo) {
      await Pais.create({
        nombre: "Kosovo",
        tlf_code: "+383",
      });
      console.log("País registrado exitosamente: Kosovo");
    }
    if (!kuwait) {
      await Pais.create({
        nombre: "Kuwait",
        tlf_code: "+965",
      });
      console.log("País registrado exitosamente: Kuwait");
    }
    if (!kirguistan) {
      await Pais.create({
        nombre: "Kirguistán",
        tlf_code: "+996",
      });
      console.log("País registrado exitosamente: Kirguistán");
    }
    if (!laos) {
      await Pais.create({
        nombre: "Laos",
        tlf_code: "+856",
      });
      console.log("País registrado exitosamente: Laos");
    }
    if (!letonia) {
      await Pais.create({
        nombre: "Letonia",
        tlf_code: "+371",
      });
      console.log("País registrado exitosamente: Letonia");
    }
    if (!libano) {
      await Pais.create({
        nombre: "Líbano",
        tlf_code: "+961",
      });
      console.log("País registrado exitosamente: Líbano");
    }
    if (!lesoto) {
      await Pais.create({
        nombre: "Lesoto",
        tlf_code: "+266",
      });
      console.log("País registrado exitosamente: Lesoto");
    }
    if (!liberia) {
      await Pais.create({
        nombre: "Liberia",
        tlf_code: "+231",
      });
      console.log("País registrado exitosamente: Liberia");
    }
    if (!libia) {
      await Pais.create({
        nombre: "Libia",
        tlf_code: "+218",
      });
      console.log("País registrado exitosamente: Libia");
    }
    if (!liechtenstein) {
      await Pais.create({
        nombre: "Liechtenstein",
        tlf_code: "+423",
      });
      console.log("País registrado exitosamente: Liechtenstein");
    }
    if (!lituania) {
      await Pais.create({
        nombre: "Lituania",
        tlf_code: "+370",
      });
      console.log("País registrado exitosamente: Lituania");
    }
    if (!luxemburgo) {
      await Pais.create({
        nombre: "Luxemburgo",
        tlf_code: "+352",
      });
      console.log("País registrado exitosamente: Luxemburgo");
    }
    if (!madagascar) {
      await Pais.create({
        nombre: "Madagascar",
        tlf_code: "+261",
      });
      console.log("País registrado exitosamente: Madagascar");
    }
    if (!malaui) {
      await Pais.create({
        nombre: "Malaui",
        tlf_code: "+265",
      });
      console.log("País registrado exitosamente: Malaui");
    }
    if (!malasia) {
      await Pais.create({
        nombre: "Malasia",
        tlf_code: "+60",
      });
      console.log("País registrado exitosamente: Malasia");
    }
    if (!maldivas) {
      await Pais.create({
        nombre: "Maldivas",
        tlf_code: "+960",
      });
      console.log("País registrado exitosamente: Maldivas");
    }
    if (!mali) {
      await Pais.create({
        nombre: "Malí",
        tlf_code: "+223",
      });
      console.log("País registrado exitosamente: Malí");
    }
    if (!malta) {
      await Pais.create({
        nombre: "Malta",
        tlf_code: "+356",
      });
      console.log("País registrado exitosamente: Malta");
    }
    if (!islas_marshall) {
      await Pais.create({
        nombre: "Islas Marshall",
        tlf_code: "+692",
      });
      console.log("País registrado exitosamente: Islas Marshall");
    }
    if (!mauritania) {
      await Pais.create({
        nombre: "Mauritania",
        tlf_code: "+222",
      });
      console.log("País registrado exitosamente: Mauritania");
    }
    if (!mauricio) {
      await Pais.create({
        nombre: "Mauricio",
        tlf_code: "+230",
      });
      console.log("País registrado exitosamente: Mauricio");
    }
    if (!mexico) {
      await Pais.create({
        nombre: "México",
        tlf_code: "+52",
      });
      console.log("País registrado exitosamente: México");
    }
    if (!micronesia) {
      await Pais.create({
        nombre: "Micronesia",
        tlf_code: "+691",
      });
      console.log("País registrado exitosamente: Micronesia");
    }
    if (!moldavia) {
      await Pais.create({
        nombre: "Moldavia",
        tlf_code: "+373",
      });
      console.log("País registrado exitosamente: Moldavia");
    }
    if (!monaco) {
      await Pais.create({
        nombre: "Mónaco",
        tlf_code: "+377",
      });
      console.log("País registrado exitosamente: Mónaco");
    }
    if (!mongolia) {
      await Pais.create({
        nombre: "Mongolia",
        tlf_code: "+976",
      });
      console.log("País registrado exitosamente: Mongolia");
    }
    if (!montenegro) {
      await Pais.create({
        nombre: "Montenegro",
        tlf_code: "+382",
      });
      console.log("País registrado exitosamente: Montenegro");
    }
    if (!marruecos) {
      await Pais.create({
        nombre: "Marruecos",
        tlf_code: "+212",
      });
      console.log("País registrado exitosamente: Marruecos");
    }
    if (!mozambique) {
      await Pais.create({
        nombre: "Mozambique",
        tlf_code: "+258",
      });
      console.log("País registrado exitosamente: Mozambique");
    }
    if (!namibia) {
      await Pais.create({
        nombre: "Namibia",
        tlf_code: "+264",
      });
      console.log("País registrado exitosamente: Namibia");
    }
    if (!nauru) {
      await Pais.create({
        nombre: "Nauru",
        tlf_code: "+674",
      });
      console.log("País registrado exitosamente: Nauru");
    }
    if (!nepal) {
      await Pais.create({
        nombre: "Nepal",
        tlf_code: "+977",
      });
      console.log("País registrado exitosamente: Nepal");
    }
    if (!paises_bajos) {
      await Pais.create({
        nombre: "Países Bajos",
        tlf_code: "+31",
      });
      console.log("País registrado exitosamente: Países Bajos");
    }
    if (!nueva_zelanda) {
      await Pais.create({
        nombre: "Nueva Zelanda",
        tlf_code: "+64",
      });
      console.log("País registrado exitosamente: Nueva Zelanda");
    }
    if (!nicaragua) {
      await Pais.create({
        nombre: "Nicaragua",
        tlf_code: "+505",
      });
      console.log("País registrado exitosamente: Nicaragua");
    }
    if (!niger) {
      await Pais.create({
        nombre: "Níger",
        tlf_code: "+227",
      });
      console.log("País registrado exitosamente: Níger");
    }
    if (!nigeria) {
      await Pais.create({
        nombre: "Nigeria",
        tlf_code: "+234",
      });
      console.log("País registrado exitosamente: Nigeria");
    }
    if (!macedonia_del_norte) {
      await Pais.create({
        nombre: "Macedonia del Norte",
        tlf_code: "+389",
      });
      console.log("País registrado exitosamente: Macedonia del Norte");
    }
    if (!noruega) {
      await Pais.create({
        nombre: "Noruega",
        tlf_code: "+47",
      });
      console.log("País registrado exitosamente: Noruega");
    }
    if (!oman) {
      await Pais.create({
        nombre: "Omán",
        tlf_code: "+968",
      });
      console.log("País registrado exitosamente: Omán");
    }
    if (!pakistan) {
      await Pais.create({
        nombre: "Pakistán",
        tlf_code: "+92",
      });
      console.log("País registrado exitosamente: Pakistán");
    }
    if (!palau) {
      await Pais.create({
        nombre: "Palaos",
        tlf_code: "+680",
      });
      console.log("País registrado exitosamente: Palaos");
    }
    if (!palestina) {
      await Pais.create({
        nombre: "Palestina",
        tlf_code: "+970",
      });
      console.log("País registrado exitosamente: Palestina");
    }
    if (!panama) {
      await Pais.create({
        nombre: "Panamá",
        tlf_code: "+507",
      });
      console.log("País registrado exitosamente: Panamá");
    }
    if (!papua_nueva_guinea) {
      await Pais.create({
        nombre: "Papúa Nueva Guinea",
        tlf_code: "+675",
      });
      console.log("País registrado exitosamente: Papúa Nueva Guinea");
    }
    if (!paraguay) {
      await Pais.create({
        nombre: "Paraguay",
        tlf_code: "+595",
      });
      console.log("País registrado exitosamente: Paraguay");
    }
    if (!peru) {
      await Pais.create({
        nombre: "Perú",
        tlf_code: "+51",
      });
      console.log("País registrado exitosamente: Perú");
    }
    if (!filipinas) {
      await Pais.create({
        nombre: "Filipinas",
        tlf_code: "+63",
      });
      console.log("País registrado exitosamente: Filipinas");
    }
    if (!polonia) {
      await Pais.create({
        nombre: "Polonia",
        tlf_code: "+48",
      });
      console.log("País registrado exitosamente: Polonia");
    }
    if (!portugal) {
      await Pais.create({
        nombre: "Portugal",
        tlf_code: "+351",
      });
      console.log("País registrado exitosamente: Portugal");
    }
    if (!qatar) {
      await Pais.create({
        nombre: "Catar",
        tlf_code: "+974",
      });
      console.log("País registrado exitosamente: Catar");
    }
    if (!rumania) {
      await Pais.create({
        nombre: "Rumania",
        tlf_code: "+40",
      });
      console.log("País registrado exitosamente: Rumania");
    }
    if (!rusia) {
      await Pais.create({
        nombre: "Rusia",
        tlf_code: "+7",
      });
      console.log("País registrado exitosamente: Rusia");
    }
    if (!ruanda) {
      await Pais.create({
        nombre: "Ruanda",
        tlf_code: "+250",
      });
      console.log("País registrado exitosamente: Ruanda");
    }
    if (!san_cristobal_y_nieves) {
      await Pais.create({
        nombre: "San Cristóbal y Nieves",
        tlf_code: "+1-869",
      });
      console.log("País registrado exitosamente: San Cristóbal y Nieves");
    }
    if (!san_vicente_y_las_granadinas) {
      await Pais.create({
        nombre: "San Vicente y las Granadinas",
        tlf_code: "+1-784",
      });
      console.log("País registrado exitosamente: San Vicente y las Granadinas");
    }
    if (!santa_lucia) {
      await Pais.create({
        nombre: "Santa Lucía",
        tlf_code: "+1-758",
      });
      console.log("País registrado exitosamente: Santa Lucía");
    }
    if (!samoa) {
      await Pais.create({
        nombre: "Samoa",
        tlf_code: "+685",
      });
      console.log("País registrado exitosamente: Samoa");
    }
    if (!san_marino) {
      await Pais.create({
        nombre: "San Marino",
        tlf_code: "+378",
      });
      console.log("País registrado exitosamente: San Marino");
    }
    if (!santo_tome_y_principe) {
      await Pais.create({
        nombre: "Santo Tomé y Príncipe",
        tlf_code: "+239",
      });
      console.log("País registrado exitosamente: Santo Tomé y Príncipe");
    }
    if (!arabia_saudita) {
      await Pais.create({
        nombre: "Arabia Saudita",
        tlf_code: "+966",
      });
      console.log("País registrado exitosamente: Arabia Saudita");
    }
    if (!senegal) {
      await Pais.create({
        nombre: "Senegal",
        tlf_code: "+221",
      });
      console.log("País registrado exitosamente: Senegal");
    }
    if (!serbia) {
      await Pais.create({
        nombre: "Serbia",
        tlf_code: "+381",
      });
      console.log("País registrado exitosamente: Serbia");
    }
    if (!seychelles) {
      await Pais.create({
        nombre: "Seychelles",
        tlf_code: "+248",
      });
      console.log("País registrado exitosamente: Seychelles");
    }
    if (!sierra_leona) {
      await Pais.create({
        nombre: "Sierra Leona",
        tlf_code: "+232",
      });
      console.log("País registrado exitosamente: Sierra Leona");
    }
    if (!singapur) {
      await Pais.create({
        nombre: "Singapur",
        tlf_code: "+65",
      });
      console.log("País registrado exitosamente: Singapur");
    }
    if (!eslovaquia) {
      await Pais.create({
        nombre: "Eslovaquia",
        tlf_code: "+421",
      });
      console.log("País registrado exitosamente: Eslovaquia");
    }
    if (!eslovenia) {
      await Pais.create({
        nombre: "Eslovenia",
        tlf_code: "+386",
      });
      console.log("País registrado exitosamente: Eslovenia");
    }
    if (!islas_salomon) {
      await Pais.create({
        nombre: "Islas Salomón",
        tlf_code: "+677",
      });
      console.log("País registrado exitosamente: Islas Salomón");
    }
    if (!somalia) {
      await Pais.create({
        nombre: "Somalia",
        tlf_code: "+252",
      });
      console.log("País registrado exitosamente: Somalia");
    }
    if (!sudafrica) {
      await Pais.create({
        nombre: "Sudáfrica",
        tlf_code: "+27",
      });
      console.log("País registrado exitosamente: Sudáfrica");
    }
    if (!sudan_del_sur) {
      await Pais.create({
        nombre: "Sudán del Sur",
        tlf_code: "+211",
      });
      console.log("País registrado exitosamente: Sudán del Sur");
    }
    if (!espania) {
      await Pais.create({
        nombre: "España",
        tlf_code: "+34",
      });
      console.log("País registrado exitosamente: España");
    }
    if (!sri_lanka) {
      await Pais.create({
        nombre: "Sri Lanka",
        tlf_code: "+94",
      });
      console.log("País registrado exitosamente: Sri Lanka");
    }
    if (!sudan) {
      await Pais.create({
        nombre: "Sudán",
        tlf_code: "+249",
      });
      console.log("País registrado exitosamente: Sudán");
    }
    if (!surinam) {
      await Pais.create({
        nombre: "Surinam",
        tlf_code: "+597",
      });
      console.log("País registrado exitosamente: Surinam");
    }
    if (!suecia) {
      await Pais.create({
        nombre: "Suecia",
        tlf_code: "+46",
      });
      console.log("País registrado exitosamente: Suecia");
    }
    if (!suiza) {
      await Pais.create({
        nombre: "Suiza",
        tlf_code: "+41",
      });
      console.log("País registrado exitosamente: Suiza");
    }
    if (!siria) {
      await Pais.create({
        nombre: "Siria",
        tlf_code: "+963",
      });
      console.log("País registrado exitosamente: Siria");
    }
    if (!taiwan) {
      await Pais.create({
        nombre: "Taiwán",
        tlf_code: "+886",
      });
      console.log("País registrado exitosamente: Taiwán");
    }
    if (!tanzania) {
      await Pais.create({
        nombre: "Tanzania",
        tlf_code: "+255",
      });
      console.log("País registrado exitosamente: Tanzania");
    }
    if (!tailandia) {
      await Pais.create({
        nombre: "Tailandia",
        tlf_code: "+66",
      });
      console.log("País registrado exitosamente: Tailandia");
    }
    if (!togo) {
      await Pais.create({
        nombre: "Togo",
        tlf_code: "+228",
      });
      console.log("País registrado exitosamente: Togo");
    }
    if (!tonga) {
      await Pais.create({
        nombre: "Tonga",
        tlf_code: "+676",
      });
      console.log("País registrado exitosamente: Tonga");
    }
    if (!trinidad_y_tobago) {
      await Pais.create({
        nombre: "Trinidad y Tobago",
        tlf_code: "+1-868",
      });
      console.log("País registrado exitosamente: Trinidad y Tobago");
    }
    if (!tunez) {
      await Pais.create({
        nombre: "Túnez",
        tlf_code: "+216",
      });
      console.log("País registrado exitosamente: Túnez");
    }
    if (!turquia) {
      await Pais.create({
        nombre: "Turquía",
        tlf_code: "+90",
      });
      console.log("País registrado exitosamente: Turquía");
    }
    if (!turkmenistan) {
      await Pais.create({
        nombre: "Turkmenistán",
        tlf_code: "+993",
      });
      console.log("País registrado exitosamente: Turkmenistán");
    }
    if (!tuvalu) {
      await Pais.create({
        nombre: "Tuvalu",
        tlf_code: "+688",
      });
      console.log("País registrado exitosamente: Tuvalu");
    }
    if (!uganda) {
      await Pais.create({
        nombre: "Uganda",
        tlf_code: "+256",
      });
      console.log("País registrado exitosamente: Uganda");
    }
    if (!ucrania) {
      await Pais.create({
        nombre: "Ucrania",
        tlf_code: "+380",
      });
      console.log("País registrado exitosamente: Ucrania");
    }
    if (!emiratos_arabes_unidos) {
      await Pais.create({
        nombre: "Emiratos Árabes Unidos",
        tlf_code: "+971",
      });
      console.log("País registrado exitosamente: Emiratos Árabes Unidos");
    }
    if (!reino_unido) {
      await Pais.create({
        nombre: "Reino Unido",
        tlf_code: "+44",
      });
      console.log("País registrado exitosamente: Reino Unido");
    }
    if (!estados_unidos) {
      await Pais.create({
        nombre: "Estados Unidos",
        tlf_code: "+1",
      });
      console.log("País registrado exitosamente: Estados Unidos");
    }
    if (!uruguay) {
      await Pais.create({
        nombre: "Uruguay",
        tlf_code: "+598",
      });
      console.log("País registrado exitosamente: Uruguay");
    }
    if (!uzbekistan) {
      await Pais.create({
        nombre: "Uzbekistan",
        tlf_code: "+998",
      });
      console.log("País registrado exitosamente: Uzbekistan");
    }
    if (!vanuatu) {
      await Pais.create({
        nombre: "Vanuatu",
        tlf_code: "+678",
      });
      console.log("País registrado exitosamente: Vanuatu");
    }
    if (!ciudad_del_vaticano) {
      await Pais.create({
        nombre: "Ciudad del Vaticano",
        tlf_code: "+379",
      });
      console.log("País registrado exitosamente: Ciudad del Vaticano");
    }
    if (!venezuela) {
      await Pais.create({
        nombre: "Venezuela",
        tlf_code: "+58",
      });
      console.log("País registrado exitosamente: Venezuela");
    }
    if (!vietnam) {
      await Pais.create({
        nombre: "Vietnam",
        tlf_code: "+84",
      });
      console.log("País registrado exitosamente: Vietnam");
    }
    if (!yemen) {
      await Pais.create({
        nombre: "Yemen",
        tlf_code: "+967",
      });
      console.log("País registrado exitosamente: Yemen");
    }
    if (!zambia) {
      await Pais.create({
        nombre: "Zambia",
        tlf_code: "+260",
      });
      console.log("País registrado exitosamente: Zambia");
    }
    if (!zimbabue) {
      await Pais.create({
        nombre: "Zimbabue",
        tlf_code: "+263",
      });
      console.log("País registrado exitosamente: Zimbabue");
    }
  } catch (error) {
    console.error("Error al crear países:", error);
  }
}

// Función para crear los servicios iniciales
async function crearServicios() {
  try {
    // Verifica si los servicios ya existen en la base de datos
    const psicologia = await Servicio.findOne({
      where: { nombre: "Atención Psicológica" },
    });
    const pediatria = await Servicio.findOne({
      where: { nombre: "Servicios de Pediatría" },
    });
    const derecho = await Servicio.findOne({
      where: { nombre: "Asesoramiento del Derecho" },
    });
    const leceni = await Servicio.findOne({
      where: { nombre: "Servicios de la Constructora LECENI" },
    });
    const aneupi = await Servicio.findOne({
      where: { nombre: "Servicios de la Fundación ANEUPI" },
    });

    // Si el país no existe, se crea en la base de datos
    if (!psicologia) {
      await Servicio.create({
        nombre: "Atención Psicológica",
        descripcion:
          "Atención en todas las ramas de la psicología con los mejores profesionales.",
      });
      console.log("Servicio creado exitosamente");
    }
    if (!pediatria) {
      await Servicio.create({
        nombre: "Servicios de Pediatría",
        descripcion:
          "Atención en las áreas de Pediatría con los mejores profesionales.",
      });
      console.log("Servicio creado exitosamente");
    }
    if (!derecho) {
      await Servicio.create({
        nombre: "Asesoramiento del Derecho",
        descripcion:
          "Asesoramiento en las ramas del Derecho con los mejores profesionales.",
      });
      console.log("Servicio creado exitosamente");
    }
    if (!leceni) {
      await Servicio.create({
        nombre: "Servicios de la Constructora LECENI",
        descripcion:
          "Atención de los servicios que presta la constructora e inmobiliaria LECENI.",
      });
      console.log("Servicio creado exitosamente");
    }
    if (!aneupi) {
      await Servicio.create({
        nombre: "Servicios de la Fundación ANEUPI",
        descripcion: "Atención de Servicios que presta la Fundación ANEUPI.",
      });
      console.log("Servicio creado exitosamente");
    }
  } catch (error) {
    console.error("Error al crear servicios:", error);
  }
}

// // Función para crear ciudades iniciales
// async function crearCiudades() {
//   try {
//     // Verifica si las ciudades ya existen en la base de datos
//     const quito = await Ciudad.findOne({
//       where: { nombre: "Quito" },
//     });
//     const guayaquil = await Ciudad.findOne({
//       where: { nombre: "Guayaquil" },
//     });
//     const cuenca = await Ciudad.findOne({
//       where: { nombre: "Cuenca" },
//     });
//     const bogota = await Ciudad.findOne({
//       where: { nombre: "Bogotá" },
//     });
//     const lima = await Ciudad.findOne({
//       where: { nombre: "Lima" },
//     });
//     const toronto = await Ciudad.findOne({
//       where: { nombre: "Toronto" },
//     });
//     const galapagos = await Ciudad.findOne({
//       where: { nombre: "Galápagos" },
//     });

//     // Paises para obtener el id
//     const ecuador = await Pais.findOne({
//       where: { nombre: "Ecuador" },
//     });
//     const estadosUnidos = await Pais.findOne({
//       where: { nombre: "Estados Unidos" },
//     });
//     const peru = await Pais.findOne({
//       where: { nombre: "Perú" },
//     });
//     const canada = await Pais.findOne({
//       where: { nombre: "Canadá" },
//     });
//     const colombia = await Pais.findOne({
//       where: { nombre: "Colombia" },
//     });

//     // Si la ciudad no existe, se crea en la base de datos
//     if (!quito) {
//       await Ciudad.create({
//         nombre: "Quito",
//         zona_horaria: "America/Guayaquil",
//         pais_id: ecuador.id,
//       });
//       console.log("Ciudad registrada exitosamente");
//     }
//     if (!guayaquil) {
//       await Ciudad.create({
//         nombre: "Guayaquil",
//         zona_horaria: "America/Guayaquil",
//         pais_id: ecuador.id,
//       });
//       console.log("Ciudad registrada exitosamente");
//     }
//     if (!cuenca) {
//       await Ciudad.create({
//         nombre: "Cuenca",
//         zona_horaria: "America/Guayaquil",
//         pais_id: ecuador.id,
//       });
//       console.log("Ciudad registrada exitosamente");
//     }
//     if (!bogota) {
//       await Ciudad.create({
//         nombre: "Bogotá",
//         zona_horaria: "America/Bogota",
//         pais_id: colombia.id,
//       });
//       console.log("Ciudad registrada exitosamente");
//     }
//     if (!lima) {
//       await Ciudad.create({
//         nombre: "Lima",
//         zona_horaria: "America/Lima",
//         pais_id: peru.id,
//       });
//       console.log("Ciudad registrada exitosamente");
//     }
//     if (!toronto) {
//       await Ciudad.create({
//         nombre: "Toronto",
//         zona_horaria: "America/Toronto",
//         pais_id: canada.id,
//       });
//       console.log("Ciudad registrada exitosamente");
//     }
//     if (!galapagos) {
//       await C
//     }
//   } catch (error) {
//     console.error("Error al crear países:", error);
//   }
// }

// Llamar a la función para crear tipos de biblioteca
createTipoBiblioteca();
createTipoExpediente();
crearRoles().then(() => crearAdministrador());
crearEstados();
crearModalidades();
crearTipoConvenio();
crearPaises();
crearServicios();
crearEstadoReportes();

