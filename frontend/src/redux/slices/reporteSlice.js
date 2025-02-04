import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const createReporte = createAsyncThunk(
    "reporte/createReporte", async (reporteData) => {
        try {
            const response = await axios.post(`${apiUrl}/api/reportes`, reporteData);
            toast.success('Reporte creado exitosamente');
            return response.data;
        } catch (error) {
            toast.error('Error al crear el reporte');
            throw Error(error.message);
        }
    }
);

export const updateReporte = createAsyncThunk('reporte/updateReporte', async ({ id, reporteData }) => {
    try {
        const response = await axios.put(`${apiUrl}/api/reportes/${id}`, reporteData);
        toast.success("Estado de la denuncia actualizada exitosamente");
        return response.data;
    } catch (error) {
        toast.error("Error al actualizar el estado de la denuncia");
        throw Error(error.response.data.error || 'Error updating solicitante');
    }
});

export const fetchAllReporte = createAsyncThunk('reporte/getAllReportes', async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/reportes`);
        return response.data;
    } catch (error) {
        throw Error(error.response.data.error || 'Error fetching reportes');
    }
});

export const deleteReporte = createAsyncThunk('reporte/deleteReport', async (id) => {
    try {
        await axios.delete(`${apiUrl}/api/reportes/${id}`);
        toast.success('Denuncia eliminada exitosamente');
        return id;
    } catch (error) {
        toast.error('Error al eliminar la denuncia');
        throw Error(error.message);
    }
});

const reporteSlice = createSlice({
    name: 'reportes',
    initialState: {
        reportes: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReporte.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createReporte.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reportes = [...state.reportes, action.payload];
            })
            .addCase(createReporte.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAllReporte.fulfilled, (state, action) => {
                state.loading = false;
                state.reportes = action.payload;
            })
            .addCase(fetchAllReporte.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReporte.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.reportes.findIndex((reporte) => reporte.id === action.payload.id);
                if (index !== -1) {
                    state.reportes[index] = action.payload;
                }
            })
            .addCase(updateReporte.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteReporte.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reportes = state.reportes.filter((reporte) => reporte.id !== action.payload);
            })
            .addCase(deleteReporte.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default reporteSlice.reducer;
