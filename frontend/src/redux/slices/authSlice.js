import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
	usuario: JSON.parse(sessionStorage.getItem('usuario')) || null,
	active: JSON.parse(sessionStorage.getItem('usuario')) !== null,
	loading: false,
	error: false,
};

// Acción asincrónica para iniciar sesión
export const iniciarSesion = createAsyncThunk('auth/iniciarSesion', async (datos, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${apiUrl}/api/auth/iniciar_sesion`, datos);
		return response.data.usuario;
	} catch (error) {
		return rejectWithValue(error.response.data || 'Error al iniciar sesión');
	}
});

export const registrarUsuario = createAsyncThunk('auth/registrarUsuario', async (userData, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${apiUrl}/api/auth/registrarse`, userData);
		return response.data;
	} catch (error) {
		if (error.response) {
			if (error.response.data.message === 'El nombre de usuario ya está en uso') {
				toast.error('El nombre de usuario ya está en uso');
			} else if (error.response.data.message === 'El correo electrónico ya está en uso') {
				toast.error('El correo electrónico ya está en uso');
			} else if (error.response.status === 500) {
				toast.error('Error interno del servidor');
			} else if (error.response.status === 400) {
				toast.error('Por favor, proporciona todos los campos necesarios');
			} else {
				toast.error('Error al crear usuario');
			}
		} else {
			toast.error('Error al crear usuario');
		}
		return rejectWithValue(error.response.data || 'Error al crear usuario');
	}
});

// Slice para manejar la autenticación
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// Acción para iniciar sesión
		iniciarSesionStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		iniciarSesionSuccess: (state, action) => {
			state.loading = false;
			state.usuario = action.payload;
			sessionStorage.setItem('usuario', JSON.stringify(action.payload));
			toast.success('Inicio de sesión exitoso');
		},
		iniciarSesionError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			toast.error(action.payload.message || 'Error al iniciar sesión');
		},
		// Acción para cerrar sesión
		logout: (state) => {
			state.usuario = {};
			state.loading = false;
			state.error = null;
			state.active = false;
			sessionStorage.removeItem('usuario');
			toast.info('¡Muchas Gracias!', { theme: 'colored' });
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(iniciarSesion.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(iniciarSesion.fulfilled, (state, action) => {
				state.loading = false;
				state.error = false;
				state.usuario = action.payload;
				state.active = true;
				sessionStorage.setItem('usuario', JSON.stringify(action.payload));
				toast.success('Inicio de sesión exitoso', { theme: 'colored' });
			})
			.addCase(iniciarSesion.rejected, (state, action) => {
				state.loading = false;
				state.error = true;
				toast.error(action.payload.message || 'Error al iniciar sesión', { theme: 'colored' });
			})
			.addCase(registrarUsuario.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registrarUsuario.fulfilled, (state) => {
				state.loading = false;
				toast.success('Registro de usuario exitoso', { theme: 'colored' });
			})
			.addCase(registrarUsuario.rejected, (state) => {
				state.loading = false;
				state.error = true;
			});
	},
});

export const { iniciarSesionStart, iniciarSesionSuccess, iniciarSesionError, logout } = authSlice.actions;

export default authSlice.reducer;
