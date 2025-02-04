import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchServicioLineas = createAsyncThunk('serviciolineas/fetchServicioLineas', async () => {
	try {
		const response = await axios.get(`${apiUrl}/api/serviciolineas`);
		return response.data;
	} catch (error) {
		throw Error('Error al obtener las líneas de servicio');
	}
});

export const createServicioLinea = createAsyncThunk('serviciolineas/createServicioLinea', async (servicioLineaData) => {
	try {
		const response = await axios.post(`${apiUrl}/api/serviciolineas`, servicioLineaData);
    toast.success('Línea de servicio creada exitosamente');
		return response.data;
	} catch (error) {
		toast.error('Error al crear la línea de servicio');
		throw Error(error.message);
	}
});

export const updateServicioLinea = createAsyncThunk(
	'serviciolineas/updateServicioLinea',
	async ({ id, servicioLineaData }) => {
		try {
			const response = await axios.put(`${apiUrl}/api/serviciolineas/${id}`, servicioLineaData);
			toast.success('Línea de servicio actualizada exitosamente');
			return response.data;
		} catch (error) {
			toast.error('Error al actualizar la línea de servicio');
			throw Error(error.message);
		}
	},
);

export const deleteServicioLinea = createAsyncThunk('serviciolineas/deleteServicioLinea', async (id) => {
	try {
		await axios.delete(`${apiUrl}/api/serviciolineas/${id}`);
		toast.success('Línea de servicio eliminada exitosamente');
		return id;
	} catch (error) {
		toast.error('Error al eliminar la línea de servicio');
		throw Error(error.message);
	}
});

const servicioLineasSlice = createSlice({
	name: 'serviciolinea',
	initialState: {
		serviciolineas: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchServicioLineas.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchServicioLineas.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.serviciolineas = action.payload;
			})
			.addCase(fetchServicioLineas.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createServicioLinea.fulfilled, (state, action) => {
				state.serviciolineas = [...state.serviciolineas, action.payload];
			})
			.addCase(updateServicioLinea.fulfilled, (state, action) => {
				const index = state.serviciolineas.findIndex((serviciolinea) => serviciolinea.id === action.payload.id);
				if (index !== -1) {
					state.serviciolineas[index] = action.payload;
				}
			})
			.addCase(deleteServicioLinea.fulfilled, (state, action) => {
				state.serviciolineas = state.serviciolineas.filter(
					(serviciolinea) => serviciolinea.id !== action.payload,
				);
			});
	},
});

export default servicioLineasSlice.reducer;
