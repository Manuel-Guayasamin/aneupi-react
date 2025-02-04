// En un archivo llamado modalidadesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Define una función para obtener las modalidades desde el servidor
export const fetchModalidades = createAsyncThunk(
  "modalidades/fetchModalidades",
  async () => {
    const response = await axios.get(`${apiUrl}/api/modalidades`);

    return response.data;
  }
);

// Define el slice para las modalidades
const modalidadesSlice = createSlice({
  name: "modalidades",
  initialState: {
    modalidades: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModalidades.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchModalidades.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.modalidades = action.payload;
      })
      .addCase(fetchModalidades.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default modalidadesSlice.reducer;
