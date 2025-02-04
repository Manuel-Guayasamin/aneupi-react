// En un archivo llamado estadosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Define una función para obtener los estados desde el servidor
export const fetchEstados = createAsyncThunk('estados/fetchEstados', async () => {
  const response = await axios.get(`${apiUrl}/api/estados`);
  return response.data;
});

// Define el slice para los estados
const estadosSlice = createSlice({
  name: 'estados',
  initialState: {
    estados: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstados.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEstados.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.estados = action.payload;
      })
      .addCase(fetchEstados.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default estadosSlice.reducer;
