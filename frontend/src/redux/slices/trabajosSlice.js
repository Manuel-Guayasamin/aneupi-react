import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

// Función para obtener todos los trabajos
export const fetchTrabajos = createAsyncThunk('trabajos/fetchTrabajos', async () => {
	try {
		const response = await axios.get(`${apiUrl}/api/trabajos`);
		return response.data;
	} catch (error) {
		throw Error('Error al obtener los trabajos');
	}
});

// Función para crear un nuevo trabajo
export const createTrabajo = createAsyncThunk('trabajos/createTrabajo', async (trabajoData) => {
	try {
		const response = await axios.post(`${apiUrl}/api/trabajos`, trabajoData);
		toast.success('Trabajo creado exitosamente');
		return response.data;
	} catch (error) {
		toast.error('Error al crear el trabajo');
		throw Error(error.message);
	}
});

// Función para actualizar un trabajo
export const updateTrabajo = createAsyncThunk('trabajos/updateTrabajo', async ({ id, trabajoData }) => {
	try {
		const response = await axios.put(`${apiUrl}/api/trabajos/${id}`, trabajoData);
		toast.success('Trabajo actualizado exitosamente');
		return response.data;
	} catch (error) {
		toast.error('Error al actualizar el trabajo');
		throw Error(error.message);
	}
});

// Función para eliminar un trabajo
export const deleteTrabajo = createAsyncThunk('trabajos/deleteTrabajo', async (id) => {
	try {
		await axios.delete(`${apiUrl}/api/trabajos/${id}`);
		toast.success('Trabajo eliminado exitosamente');
		return id;
	} catch (error) {
		toast.error('Error al eliminar el trabajo');
		throw Error(error.message);
	}
});

export const generatePostulantesExcel = createAsyncThunk(
	'trabajos/generatePostulantesExcel',
	async (id, { rejectWithValue }) => {
		try {
			// Generate the current date in the desired format
			const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '');

			// Generate a unique code for the filename
			const uniqueCode = Math.random().toString(36).substring(2, 8);

			// Construct the filename with the event code at the beginning
			const filename = `${currentDate}_trabajo_${uniqueCode}.xlsx`;

			const response = await axios.get(`${apiUrl}/api/trabajos/generateExcel/${id}`, {
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

// Slice para los trabajos
const trabajosSlice = createSlice({
	name: 'trabajos',
	initialState: {
		trabajos: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTrabajos.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTrabajos.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.trabajos = action.payload;
			})
			.addCase(fetchTrabajos.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createTrabajo.fulfilled, (state, action) => {
				state.trabajos = [...state.trabajos, action.payload];
			})
			.addCase(updateTrabajo.fulfilled, (state, action) => {
				const index = state.trabajos.findIndex((trabajo) => trabajo.id === action.payload.id);
				if (index !== -1) {
					state.trabajos[index] = action.payload;
				}
			})
			.addCase(deleteTrabajo.fulfilled, (state, action) => {
				state.trabajos = state.trabajos.filter((trabajo) => trabajo.id !== action.payload);
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

export default trabajosSlice.reducer;
