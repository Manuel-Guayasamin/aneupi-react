import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

// Define una función para obtener los contactos desde el servidor
export const fetchContactos = createAsyncThunk('contactos/fetchContactos', async () => {
	const response = await axios.get(`${apiUrl}/api/contactos`);
	return response.data;
});

// Define una función para crear un nuevo contacto en el servidor
export const createContacto = createAsyncThunk('contactos/createContacto', async (contactoData, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${apiUrl}/api/contactos`, contactoData);
		toast.success("Contacto creado exitosamente");
		return response.data;
	} catch (error) {
		toast.error("Error al crear contacto");
		return rejectWithValue(error.response.data.error || 'Error creando el contacto');
	}
});

// Define una función para actualizar un contacto en el servidor
export const updateContacto = createAsyncThunk('contactos/updateContacto', async (payload) => {
	const { id, contactoData } = payload;
	const response = await axios.put(`${apiUrl}/api/contactos/${id}`, contactoData);
	return response.data;
});

// Define una función para eliminar un contacto en el servidor
export const deleteContacto = createAsyncThunk('contactos/deleteContacto', async (id, { rejectWithValue }) => {
	try {
		await axios.delete(`${apiUrl}/api/contactos/${id}`);
		toast.success("Contacto eliminado exitosamente");
		return id;
	} catch (error) {
		toast.error("Error al eliminar el contacto");
		return rejectWithValue(error.response.data.error || 'Error eliminando el contacto');
	}
});

// Define el slice para los contactos
const contactosSlice = createSlice({
	name: 'contactos',
	initialState: {
		contactos: [],
		status: 'idle',
		error: null,
		submitting: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchContactos.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchContactos.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.contactos = action.payload;
			})
			.addCase(fetchContactos.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createContacto.pending, (state) => {
				// Agregar caso para createContacto.pending
				state.submitting = true;
			})
			.addCase(createContacto.fulfilled, (state, action) => {
				state.contactos.push(action.payload);
				state.submitting = false; // Actualizar submitting a false al completar la acción

			})
			.addCase(createContacto.rejected, (state, action) => {
				state.error = action.error.message;
				state.submitting = false; // Actualizar submitting a false al completar la acción
			})
			.addCase(updateContacto.pending, (state) => {
				// Agregar caso para updateContacto.pending
				state.submitting = true;
			})
			.addCase(updateContacto.fulfilled, (state, action) => {
				const { id } = action.payload;
				const existingContacto = state.contactos.find((contacto) => contacto.id === id);
				if (existingContacto) {
					Object.assign(existingContacto, action.payload);
				}
				state.submitting = false; // Actualizar submitting a false al completar la acción
			})
			.addCase(updateContacto.rejected, (state, action) => {
				state.error = action.error.message;
				state.submitting = false; // Actualizar submitting a false al completar la acción
			})
			.addCase(deleteContacto.fulfilled, (state, action) => {
				const id = action.payload;
				state.contactos = state.contactos.filter((contacto) => contacto.id !== id);
			});
	},
});

export default contactosSlice.reducer;
