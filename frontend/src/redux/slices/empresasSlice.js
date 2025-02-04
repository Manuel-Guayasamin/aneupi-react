import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Thunk para obtener todas las empresas
export const fetchEmpresas = createAsyncThunk('empresas/fetchEmpresas', async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/empresas`); // Asumiendo que este endpoint devuelve la lista de empresas
        return response.data;
    } catch (error) {
        throw Error(error.response.data.error || 'Error fetching empresas');
    }
});

// Slice para empresas
const empresasSlice = createSlice({
    name: 'empresas',
    initialState: {
        empresas: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmpresas.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmpresas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.empresas = action.payload;
            })
            .addCase(fetchEmpresas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default empresasSlice.reducer;
