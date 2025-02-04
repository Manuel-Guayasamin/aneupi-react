import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

// Acción asincrónica para crear un expediente
export const createExpediente = createAsyncThunk(
  "expedientes/createExpediente",
  async (expedienteData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/expedientes`,
        expedienteData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Especifica el tipo de contenido como form-data
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al crear expediente"
      );
    }
  }
);

// Acción asincrónica para obtener todos los expedientes
export const fetchExpedientes = createAsyncThunk(
  "expedientes/fetchExpedientes",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/expedientes`);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw Error("Error al obtener expedientes");
    }
  }
);


// Acción asincrónica para obtener todos los expedientes
export const fetchSentenciasAprobadas = createAsyncThunk(
  "expedientes/fetchSentenciasAprobadas",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/expedientes/sentencias-aprobadas`);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw Error("Error al obtener las sentencias aprobadas");
    }
  }
);

// Acción asincrónica para obtener todas las resoluciones aprobadas
export const fetchResolucionesAprobadas = createAsyncThunk(
  "expedientes/fetchResolucionesAprobadas",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/expedientes/resoluciones-aprobadas`);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw Error("Error al obtener las resoluciones aprobadas");
    }
  }
);

// Acción asincrónica para actualizar un expediente
export const updateExpediente = createAsyncThunk(
  "expedientes/updateExpediente",
  async ({ id, expedienteData }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/expedientes/${id}`,
        expedienteData
      );
      toast.success("Expediente actualizado exitosamente");
      return response.data;
    } catch (error) {
      toast.error("Error al actualizar el expediente");
      throw Error(error.message);
    }
  }
);

// Acción asincrónica para eliminar un expediente
export const deleteExpediente = createAsyncThunk(
  "expedientes/deleteExpediente",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/expedientes/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al eliminar expediente"
      );
    }
  }
);

// Acción asincrónica para buscar en los expedientes
export const getExpedienteByWord = createAsyncThunk(
  "expedientes/getExpedienteByWord",
  async (word, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/expedientes/sentenciaByWord/${word}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al buscar expedientes por palabra"
      );
    }
  }
);

export const searchExpediente = createAsyncThunk(
  "expedientes/searchExpediente",
  async ({ query, tipoExpediente }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/expedientes`, {
        params: { q: query, tipo: tipoExpediente },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al buscar en los expedientes"
      );
    }
  }
);

export const searchExpedienteByWord = createAsyncThunk(
  "expedientes/searchExpedienteByWord",
  async (word, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/expedientes/sentenciaByWord/${word}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al buscar expedientes por palabra"
      );
    }
  }
);
export const searchResolucionByWord = createAsyncThunk(
  "expedientes/searchResolucionByWord",
  async (word, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/expedientes/resolucionByWord/${word}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al buscar expedientes por palabra"
      );
    }
  }
);

export const sentenciaByPhrase= createAsyncThunk(
  "expedientes/sentenciaByPhrase",
  async (word, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/expedientes/sentenciaByPhrase`, {
        params: { word }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al buscar expedientes por palabra"
      );
    }
  }
);
export const resolucionByPhrase = createAsyncThunk(
  "expedientes/resolucionByPhrase",
  async (word, { rejectWithValue }) => {
    try {
      console.log(word);
      const response = await axios.get(`${apiUrl}/api/expedientes/resolucionByPhrase`, {
        params: { word }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al buscar expedientes por palabra"
      );
    }
  }
);
const expedienteSlice = createSlice({
  name: "expedientes",
  initialState: {
    expedientes: [],
    loading: false,
    error: null,
    searchResults: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExpediente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpediente.fulfilled, (state, action) => {
        state.loading = false;
        state.expedientes.push(action.payload);
        toast.success("Expediente creado exitosamente");
      })
      .addCase(createExpediente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error al crear expediente");
      })
      .addCase(fetchExpedientes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpedientes.fulfilled, (state, action) => {
        state.loading = false;
        state.expedientes = action.payload;
      })
      .addCase(fetchExpedientes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSentenciasAprobadas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentenciasAprobadas.fulfilled, (state, action) => {
        state.loading = false;
        state.expedientes = action.payload;
      })
      .addCase(fetchSentenciasAprobadas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchResolucionesAprobadas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResolucionesAprobadas.fulfilled, (state, action) => {
        state.loading = false;
        state.expedientes = action.payload;
      })
      .addCase(fetchResolucionesAprobadas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateExpediente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpediente.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.expedientes.findIndex(
          (expediente) => expediente.id === action.payload.id
        );
        if (index !== -1) {
          state.expedientes[index] = action.payload;
        }
      })
      .addCase(updateExpediente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteExpediente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpediente.fulfilled, (state, action) => {
        state.loading = false;
        state.expedientes = state.expedientes.filter(
          (expediente) => expediente.id !== action.payload.id
        );
      })
      .addCase(deleteExpediente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchExpediente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchExpediente.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchExpediente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchExpedienteByWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchExpedienteByWord.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchExpedienteByWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchResolucionByWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchResolucionByWord.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchResolucionByWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sentenciaByPhrase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sentenciaByPhrase.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(sentenciaByPhrase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resolucionByPhrase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resolucionByPhrase.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(resolucionByPhrase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default expedienteSlice.reducer;
