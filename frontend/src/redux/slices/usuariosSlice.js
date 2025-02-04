import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

// Acción asincrónica para crear un usuario con toast
// Acción asincrónica para crear un usuario con toast
export const createUsuario = createAsyncThunk('usuarios/createUsuario', async (usuarioData, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${apiUrl}/api/usuarios`, usuarioData);
		return response.data;
	} catch (error) {
		const { data } = error.response;
		console.log(data);
		if (data.message === 'La identificación, nombre de usuario o correo electrónico ya están en uso') {
			// Match the error message with the backend
			toast.error('La identificación, nombre de usuario o correo electrónico ya están en uso'); // Match the toast message with the backend
		} else {
			toast.error('Error al crear usuario');
		}
		return rejectWithValue(data.message || 'Error al crear usuario');
	}
});

// Acción asincrónica para obtener todos los usuarios
export const getUsuarios = createAsyncThunk(
	'usuarios/getUsuarios',
	async ({ page, pageSize }, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/api/usuarios?page=${page}&pageSize=${pageSize}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data || 'Error al obtener usuarios');
		}
	}
);

// Acción asincrónica para obtener todos los usuarios
export const getAllUsuarios = createAsyncThunk('usuarios/all/getAllUsuarios', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/api/usuarios/all`);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data || 'Error al obtener usuarios');
	}
});

// Acción asincrónica para obtener un usuario por su ID
export const getUsuarioById = createAsyncThunk('usuarios/getUsuarioById', async (id, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${apiUrl}/api/usuarios/${id}`);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data || 'Error al obtener usuario');
	}
});

// Acción asincrónica para actualizar un usuario por su ID
export const updateUsuario = createAsyncThunk(
	'usuarios/updateUsuario',
	async ({ id, usuarioData }, { rejectWithValue }) => {
		try {
			const response = await axios.put(`${apiUrl}/api/usuarios/${id}`, usuarioData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data || 'Error al actualizar usuario');
		}
	},
);

// Acción asincrónica para eliminar un usuario por su ID
export const deleteUsuario = createAsyncThunk('usuarios/deleteUsuario', async (id, { rejectWithValue }) => {
	try {
		const response = await axios.delete(`${apiUrl}/api/usuarios/${id}`);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data || 'Error al eliminar usuario');
	}
});

// Acción asincrónica para obtener todos los usuarios
export const searchUsuariosByCedula = createAsyncThunk(
	'usuarios/searchUsuariosByCedula',
	async (identificacion, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${apiUrl}/api/usuarios/search/${identificacion}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data || 'Error al obtener usuarios');
		}
	},
);

const usuariosSlice = createSlice({
	name: 'usuarios',
	initialState: {
		loading: false,
		error: false,
		usuarios: [],
		usuarioSelected: null,
	},
	reducers: {
		setUsuarioSelected: (state, action) => {
			state.usuarioSelected = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUsuario.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createUsuario.fulfilled, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.success('Usuario creado correctamente');
			})
			.addCase(createUsuario.rejected, (state, action) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(getUsuarios.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUsuarios.fulfilled, (state, action) => {
				state.loading = false;
				state.usuarios = action.payload;
			})
			.addCase(searchUsuariosByCedula.fulfilled, (state, action) => {
				state.loading = false;
				state.usuarios = action.payload;
				if (action.payload.length === 0) {
					toast.warning('No se encontró ningun usuario');
					return;
				}
				toast.success('Búsqueda finalizada');
			})
			.addCase(getUsuarios.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getUsuarioById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUsuarioById.fulfilled, (state, action) => {
				state.loading = false;
				toast.success('Usuario obtenido correctamente');
				state.usuarioSelected = action.payload;
			})
			.addCase(getUsuarioById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error('Error al obtener usuario');
			})
			.addCase(getAllUsuarios.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllUsuarios.fulfilled, (state, action) => {
				state.loading = false;
				state.usuarios = action.payload;
			})
			.addCase(getAllUsuarios.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateUsuario.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUsuario.fulfilled, (state, action) => {
				state.loading = false;
				toast.success('Usuario actualizado correctamente');
			})
			.addCase(updateUsuario.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error('Error al actualizar usuario');
			})
			.addCase(deleteUsuario.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteUsuario.fulfilled, (state, action) => {
				state.loading = false;
				toast.success('Usuario eliminado correctamente');
				state.usuarios = state.usuarios.filter((usuario) => usuario.id !== action.payload.id);
			})
			.addCase(deleteUsuario.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error('Error al eliminar usuario');
			});
	},
});

export const { setUsuarioSelected } = usuariosSlice.actions;
export default usuariosSlice.reducer;
