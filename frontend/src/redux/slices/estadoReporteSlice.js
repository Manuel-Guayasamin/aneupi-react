import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchEstadoReportes = createAsyncThunk('estados-reportes/fetchEstadoReportes', async () => {
  const response = await axios.get(`${apiUrl}/api/estados-reportes`);
  return response.data;
});

const estadosReportesSlice = createSlice({
  name: 'estadosReportes',
  initialState: {
    estados: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstadoReportes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEstadoReportes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.estadosReportes = action.payload;
      })
      .addCase(fetchEstadoReportes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default estadosReportesSlice.reducer;
