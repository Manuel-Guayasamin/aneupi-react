import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiURL = import.meta.env.VITE_API_URL;

// Obtener todos los países
export const getAllPaises = createAsyncThunk(
  "paises/getAllPaises",
  async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/paises`
      );
      return response.data;
    } catch (error) {
      throw Error("Error al obtener los países", error.message);
    }
  }
);

// Crear un país
export const createPais = createAsyncThunk(
  "paises/createPais",
  async (paisData) => {
    try {
      const response = await axios.post(
        `${apiURL}/api/paises`,
        paisData,
      );
      toast.success("País creado exitosamente");
      return response.data;
    } catch (error) {
      toast.error("Error al crear el país");
      throw Error(error.message);
    }
  }
);

// Actualizar un país
export const updatePais = createAsyncThunk(
  "paises/updatePais",
  async ({id, paisData }) => {
    try {
      const response = await axios.put(
        `${apiURL}/api/paises/${id}`,
        paisData,
      );
      toast.success("País actualizado exitosamente");
      return response.data;
    } catch (error) {
      toast.error("Error al actualizar el país");
      throw Error(error.message);
    }
  }
);

// Eliminar un país
export const deletePais = createAsyncThunk(
  "pais/deletePais",
  async (id) => {
    try {
      await axios.delete(
        `${apiURL}/api/paises/${id}`
      );
      toast.success("País eliminado exitosamente");
      return id;
    } catch (error) {
      toast.error("Error al eliminar el país");
      throw Error(error.message);
    }
  }
);

// Slice
const paisesSlice = createSlice({
  name: "paises",
  initialState: {
    paises: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPaises.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllPaises.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.paises = action.payload;
      })
      .addCase(getAllPaises.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPais.fulfilled, (state, action) => {
        state.paises = [...state.paises, action.payload];
      })
      .addCase(updatePais.fulfilled, (state, action) => {
        const index = state.paises.findIndex(
          (pais) => pais.id === action.payload.id
        );
        if (index !== -1) {
          state.paises[index] = action.payload;
        }
      })
      .addCase(deletePais.fulfilled, (state, action) => {
        state.paises = state.paises.filter(
          (pais) => pais.id !== action.payload
        );
      });
  }
});

export default paisesSlice.reducer;
