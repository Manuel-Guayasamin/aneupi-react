import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

export const verificarInscripcionUsuarioPractica = createAsyncThunk(
	'practicas/verificarInscripcionUsuarioPractica',
	async ({ idUsuario, codigoPractica }, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/api/practicas/${idUsuario}/${codigoPractica}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data || 'Error al verificar inscripción de usuario en evento');
		}
	},
);

// Función para obtener todos los practicas
export const fetchPracticas = createAsyncThunk('practicas/fetchPracticas', async () => {
	try {
		const response = await axios.get(`${apiUrl}/api/practicas`);
		return response.data;
	} catch (error) {
		throw Error('Error al obtener los practicas');
	}
});

export const createPractica = createAsyncThunk('practicas/createPractica', async (guardarData, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${apiUrl}/api/practicas`, guardarData);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data || 'Error al inscribir usuario en la practica');
	}
});

// Función para actualizar un trabajo
export const updatePractica = createAsyncThunk('practicas/updatePractica', async ({ id, practicaData }) => {
	try {
		const response = await axios.put(`${apiUrl}/api/practicas/${id}`, practicaData);
		toast.success('Trabajo actualizado exitosamente');
		return response.data;
	} catch (error) {
		toast.error('Error al actualizar el trabajo');
		throw Error(error.message);
	}
});

// Función para eliminar un practica
export const deletePractica = createAsyncThunk('practicas/deletePractica', async (id) => {
	try {
		await axios.delete(`${apiUrl}/api/practicas/${id}`);
		toast.success('Practica eliminada exitosamente');
		return id;
	} catch (error) {
		toast.error('Error al eliminar la practica');
		throw Error(error.message);
	}
});
export const generatePostulantesExcel = createAsyncThunk(
	'practicas/generatePostulantesExcel',
	async (id, { rejectWithValue }) => {
		try {
			// Generate the current date in the desired format
			const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '');

			// Generate a unique code for the filename
			const uniqueCode = Math.random().toString(36).substring(2, 8);

			// Construct the filename with the event code at the beginning
			const filename = `${currentDate}_practica_${uniqueCode}.xlsx`;

			const response = await axios.get(`${apiUrl}/api/practicas/generateExcel/${id}`, {
				responseType: 'blob',
			});

			const blob = new Blob([response.data], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});
			const url = window.URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', filename);
			document.body.appendChild(link);

			link.click();
			window.URL.revokeObjectURL(url);

			return 'Excel generated successfully';
		} catch (error) {
			return rejectWithValue('Error generating Excel');
		}
	},
);

const practicaSlice = createSlice({
	name: 'practica',
	initialState: {
		loading: false,
		error: null,
		practicas: [],
		practicaSelected: null,
	},
	reducers: {
		setpracticaSelected: (state, action) => {
			state.practicaSelected = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPracticas.fulfilled, (state, action) => {
				state.loading = false;
				state.practicas = action.payload;
			})
			.addCase(createPractica.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createPractica.fulfilled, (state, action) => {
				state.loading = false;
				toast.success('Usuario inscrito en practicas correctamente');
			})
			.addCase(updatePractica.fulfilled, (state, action) => {
				const index = state.practicas.findIndex((practica) => practica.id === action.payload.id);
				if (index !== -1) {
					state.practicas[index] = action.payload;
				}
			})
			.addCase(createPractica.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error('Error al inscribir usuario en practicas');
			})
			.addCase(generatePostulantesExcel.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(generatePostulantesExcel.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(generatePostulantesExcel.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { setpracticaSelected } = practicaSlice.actions;
export default practicaSlice.reducer;
