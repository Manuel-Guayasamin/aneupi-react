import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accede al token de autorización desde las variables de entorno
const authorizationToken = import.meta.env.VITE_AUTHORIZATION_TOKEN_ID;

// URL del WebService para envíar solicitud a Payphone
const webServiceURL = import.meta.env.VITE_API_URL;
const apiUrl = `${webServiceURL}/api/payphone`;

// Función para enviar datos al servidor intermedio
export const enviarDatosALink = createAsyncThunk('payments/enviarDatosALink', async (linkdata, thunkAPI) => {
	try {
		const response = await axios.post(apiUrl, linkdata, {
			headers: {
				Authorization: `Bearer ${authorizationToken}`,
			},
		});

		return response.data;
	} catch (error) {
		if (error.response) {
			return thunkAPI.rejectWithValue('Error al enviar la solicitud');
		}
	}
});

// Define el slice para los pagos
const paymentsSlice = createSlice({
	name: 'payments',
	initialState: {
		data: null,
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(enviarDatosALink.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(enviarDatosALink.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(enviarDatosALink.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default paymentsSlice.reducer;
