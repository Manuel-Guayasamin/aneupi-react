import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import estadosReducer from "./slices/estadosSlice";
import modalidadesReducer from "./slices/modalidadesSlice";
import eventoReducer from "./slices/eventSlice";
import usuarioReducer from "./slices/usuariosSlice";
import eventoUsuarioReducer from "./slices/eventoUsuariosSlice";
import paymentReducer from "./slices/paymentsSlice";
import practicaReducer from "./slices/practicaSlice";
import trabajoReducer from "./slices/trabajosSlice";
import contactoReducer from "./slices/contactosSlice";
import postulanteReducer from "./slices/postulantesSlice";
import servicioReducer from "./slices/serviciosSlice";
import serviciolineasReducer from "./slices/serviciolineasSlice";
import tipoconvenioReducer from "./slices/tipoconveniosSlice";
import convenioReducer from "./slices/conveniosSlice";
import postulanteExternoReducer from "./slices/postulanteExternoSlice";
import solicitarPracticasReducer from "./slices/solicitarPracticasSlice";
import bibliotecaReducer from "./slices/bibliotecaSlice";
import tipoBibliotecaReducer from "./slices/tipoBibliotecaSlice";
import servicioCitasReducer from "./slices/serviciocitasSlice";
import reportesReducer from "./slices/reporteSlice";
import paisesReducer from "./slices/paisesSlice";
import ciudadesReducer from "./slices/ciudadesSlice";
import expedientesReducer from "./slices/expedienteSlice";
import estadoReporteReducer from "./slices/estadoReporteSlice";

const rootReducer = combineReducers({
  authentication: authReducer,
  estados: estadosReducer,
  modalidades: modalidadesReducer,
  eventos: eventoReducer,
  usuarios: usuarioReducer,
  eventoUsuarios: eventoUsuarioReducer,
  payments: paymentReducer,
  contactos: contactoReducer,
  practicas: practicaReducer,
  trabajos: trabajoReducer,
  postulantes: postulanteReducer,
  servicios: servicioReducer,
  serviciolineas: serviciolineasReducer,
  tipoconvenios: tipoconvenioReducer,
  convenios: convenioReducer,
  postulantesExternos: postulanteExternoReducer,
  solicitudes: solicitarPracticasReducer,
  bibliotecas: bibliotecaReducer,
  tipoBiblioteca: tipoBibliotecaReducer,
  citas: servicioCitasReducer,
  ciudades: ciudadesReducer,
  paises: paisesReducer,
  expedientes: expedientesReducer,
  reportes: reportesReducer,
  estadosReportes: estadoReporteReducer,
});

export default rootReducer;
