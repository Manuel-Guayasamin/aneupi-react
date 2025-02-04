import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Función para obtener todos los tipos de convenios
export const fetchTipoConvenios = createAsyncThunk(
  "tipoconvenios/fetchTipoConvenios",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/tipoconvenios`);
      return response.data;
    } catch (error) {
      throw Error("Error al obtener los tipos de convenios");
    }
  }
);

// Slice para los tipos de convenios
const tipoConveniosSlice = createSlice({
  name: "tipoconvenios",
  initialState: {
    tipoConvenios: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTipoConvenios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTipoConvenios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tipoConvenios = action.payload;
      })
      .addCase(fetchTipoConvenios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tipoConveniosSlice.reducer;
