import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

export const verificarInscripcionUsuarioEvento = createAsyncThunk(
	'eventoUsuario/verificarInscripcionUsuarioEvento',
	async ({ idUsuario, codigoEvento }, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/api/evento-usuarios/${idUsuario}/${codigoEvento}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data || 'Error al verificar inscripción de usuario en evento');
		}
	},
);

export const inscribirUsuarioEvento = createAsyncThunk(
	'eventoUsuario/inscribirUsuarioEvento',
	async (inscripcionData, { rejectWithValue }) => {
		try {
			const formDataWithFile = new FormData();
			// Agregar campos de la inscripción al FormData
			Object.keys(inscripcionData).forEach((key) => {
				if (key === 'comprobante') {
					// Si es el campo de comprobante, agrega el archivo al FormData
					formDataWithFile.append('comprobante', inscripcionData[key][0]);
				} else if (key === 'tipoInscripcion' && inscripcionData[key] === 'ponente') {
					// Si es una inscripción de tipo 'ponente', agrega los campos específicos para ponentes
					formDataWithFile.append('tipoInscripcion', 'ponente'); // Add curriculum file
					formDataWithFile.append('curriculum', inscripcionData['curriculum'][0]); // Add curriculum file
					formDataWithFile.append('ponencia', inscripcionData['ponencia'][0]); // Add ponencia file
				} else {
					// Para otros campos y para la inscripción normal, simplemente agrega el valor al FormData
					formDataWithFile.append(key, inscripcionData[key]);
				}
			});
			// Realizar la solicitud POST al backend con el FormData que incluye el comprobante
			const response = await axios.post(`${apiUrl}/api/evento-usuarios`, formDataWithFile, {
				headers: {
					'Content-Type': 'multipart/form-data', // Especifica el tipo de contenido como form-data
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data || 'Error al inscribir usuario en evento');
		}
	},
);

export const getAllInscripciones = createAsyncThunk(
	'eventoUsuario/getAllInscripciones',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/api/evento-usuarios`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data || 'Error al obtener inscripciones');
		}
	},
);

export const getInscripcionById = createAsyncThunk(
	'eventoUsuario/getInscripcionById',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/api/evento-usuarios/${id}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data || 'Error al obtener inscripción');
		}
	},
);

export const cancelarInscripcion = createAsyncThunk(
	'eventoUsuario/cancelarInscripcion',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`${apiUrl}/api/evento-usuarios/${id}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data || 'Error al cancelar inscripción');
		}
	},
);

const eventoUsuarioSlice = createSlice({
	name: 'eventoUsuario',
	initialState: {
		loading: false,
		error: null,
		inscripciones: [],
		inscripcionSelected: null,
		inscripcionVerificada: false,
	},
	reducers: {
		setInscripcionSelected: (state, action) => {
			state.inscripcionSelected = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(verificarInscripcionUsuarioEvento.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(verificarInscripcionUsuarioEvento.fulfilled, (state, action) => {
				state.loading = false;
				state.inscripcionVerificada = action.payload.inscrito;
			})
			.addCase(verificarInscripcionUsuarioEvento.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : 'Error de conexión';
			})
			.addCase(inscribirUsuarioEvento.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(inscribirUsuarioEvento.fulfilled, (state, action) => {
				state.loading = false;
				toast.success('Usuario inscrito correctamente');
			})
			.addCase(inscribirUsuarioEvento.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error('Error al inscribir usuario en evento');
			})
			.addCase(getAllInscripciones.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllInscripciones.fulfilled, (state, action) => {
				state.loading = false;
				state.inscripciones = action.payload;
			})
			.addCase(getAllInscripciones.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getInscripcionById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getInscripcionById.fulfilled, (state, action) => {
				state.loading = false;
				state.inscripcionSelected = action.payload;
			})
			.addCase(getInscripcionById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(cancelarInscripcion.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(cancelarInscripcion.fulfilled, (state, action) => {
				state.loading = false;
				toast.success('Inscripción cancelada correctamente');
				state.inscripciones = state.inscripciones.filter((inscripcion) => inscripcion.id !== action.payload.id);
			})
			.addCase(cancelarInscripcion.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error('Error al cancelar inscripción');
			});
	},
});

export const { setInscripcionSelected } = eventoUsuarioSlice.actions;
export default eventoUsuarioSlice.reducer;
