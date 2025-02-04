import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchCiudades = createAsyncThunk('ciudades/fetchCiudades', async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/ciudades`);
        return response.data;
    } catch (error) {
        throw Error('Error al obtener las ciudades');
    }
});

export const createCiudad = createAsyncThunk('ciudades/createCiudad', async (CiudadData) => {
    try {
        const response = await axios.post(`${apiUrl}/api/ciudades`, CiudadData);
        toast.success('Ciudad creada exitosamente');
        return response.data;
    } catch (error) {
        toast.error('Error al crear la ciudad');
        throw Error(error.message);
    }
});

export const updateCiudad = createAsyncThunk(
    'ciudades/updateCiudad',
    async ({ id, CiudadData }) => {
        try {
            const response = await axios.put(`${apiUrl}/api/ciudades/${id}`, CiudadData);
            toast.success('Ciudad actualizada exitosamente');
            return response.data;
        } catch (error) {
            toast.error('Error al actualizar la ciudad');
            throw Error(error.message);
        }
    },
);

export const deleteCiudad = createAsyncThunk('ciudades/deleteCiudad', async (id) => {
    try {
        await axios.delete(`${apiUrl}/api/ciudades/${id}`);
        toast.success('Ciudad eliminada exitosamente');
        return id;
    } catch (error) {
        toast.error('Error al eliminar la ciudad');
        throw Error(error.message);
    }
});

const CiudadesSlice = createSlice({
    name: 'ciudades',
    initialState: {
        ciudades: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCiudades.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCiudades.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ciudades = action.payload;
            })
            .addCase(fetchCiudades.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createCiudad.fulfilled, (state, action) => {
                state.ciudades = [...state.ciudades, action.payload];
            })
            .addCase(updateCiudad.fulfilled, (state, action) => {
                const index = state.ciudades.findIndex((ciudad) => ciudad.id === action.payload.id);
                if (index !== -1) {
                    state.ciudades[index] = action.payload;
                }
            })
            .addCase(deleteCiudad.fulfilled, (state, action) => {
                state.ciudades = state.ciudades.filter(
                    (ciudad) => ciudad.id !== action.payload,
                );
            });
    },
});

export default CiudadesSlice.reducer;