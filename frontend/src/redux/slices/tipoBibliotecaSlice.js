import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Acción asincrónica para crear un tipo de biblioteca
export const createTipoBiblioteca = createAsyncThunk(
  "tiposBibliotecas/createTipoBiblioteca",
  async (tipoBibliotecaData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/tipo-bibliotecas`,
        tipoBibliotecaData
      );
      return response.data;
    } catch (error) {
      // Manejo de errores
      return rejectWithValue(
        error.response.data || "Error al crear tipo de biblioteca"
      );
    }
  }
);

// Acción asincrónica para obtener todos los tipos de bibliotecas
export const fetchTiposBibliotecas = createAsyncThunk(
  "tiposBibliotecas/fetchTiposBibliotecas",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/tipo-bibliotecas`);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw Error("Error al obtener tipos de bibliotecas");
    }
  }
);

const tipoBibliotecaSlice = createSlice({
  name: "tiposBibliotecas",
  initialState: {
    tiposBibliotecas: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTipoBiblioteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTipoBiblioteca.fulfilled, (state, action) => {
        state.loading = false;
        state.tiposBibliotecas.push(action.payload);
        // Manejo de éxito
      })
      .addCase(createTipoBiblioteca.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Manejo de errores
      })
      .addCase(fetchTiposBibliotecas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTiposBibliotecas.fulfilled, (state, action) => {
        state.loading = false;
        state.tiposBibliotecas = action.payload;
        // Manejo de éxito
      })
      .addCase(fetchTiposBibliotecas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Manejo de errores
      });
  },
});

export default tipoBibliotecaSlice.reducer;
