import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

// Acción asincrónica para crear una biblioteca
export const createBiblioteca = createAsyncThunk(
  "bibliotecas/createBiblioteca",
  async (bibliotecaData, { rejectWithValue }) => {
    try {
      const formDataWithFile = new FormData();

      // Agregar campos de biblioteca al FormData
      Object.keys(bibliotecaData).forEach((key) => {
        if (key === "imagen" || key === "archivo") {
          // Si es el campo de imagen o archivo, agrega el archivo al FormData
          formDataWithFile.append(key, bibliotecaData[key][0]);
        } else {
          // Para otros campos, simplemente agrega el valor al FormData
          formDataWithFile.append(key, bibliotecaData[key]);
        }
      });

      // Realizar la solicitud POST al backend con el FormData que incluye imagen y archivo
      const response = await axios.post(
        `${apiUrl}/api/bibliotecas`,
        formDataWithFile,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Especifica el tipo de contenido como form-data
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al crear biblioteca"
      );
    }
  }
);

// Acción asincrónica para obtener todas las bibliotecas
export const fetchBibliotecas = createAsyncThunk(
  "bibliotecas/fetchBibliotecas",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/bibliotecas`);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw Error("Error al obtener bibliotecas");
    }
  }
);

// Acción asincrónica para actualizar una biblioteca
export const updateBiblioteca = createAsyncThunk(
  "bibliotecas/updateBiblioteca",
  async ({ id, bibliotecaData }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/bibliotecas/${id}`,
        bibliotecaData
      );
      toast.success("Biblioteca actualizado exitosamente");
      return response.data;
    } catch (error) {
      toast.error("Error al actualizar el biblioteca");
      throw Error(error.message);
    }
  }
);

// Acción asincrónica para eliminar una biblioteca
export const deleteBiblioteca = createAsyncThunk(
  "bibliotecas/deleteBiblioteca",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/bibliotecas/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al eliminar biblioteca"
      );
    }
  }
);

// Acción asincrónica para buscar en la biblioteca
export const searchBiblioteca = createAsyncThunk(
  "bibliotecas/searchBiblioteca",
  async ({ query, tipoBiblioteca }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/bibliotecas`, {
        params: { q: query, tipo: tipoBiblioteca },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al buscar en la biblioteca"
      );
    }
  }
);

export const fetchArticulos = createAsyncThunk(
  "bibliotecas/fetchArticulos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/bibliotecas/articulos`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al obtener artículos"
      );
    }
  }
);

export const fetchRevistas = createAsyncThunk(
  "bibliotecas/fetchRevistas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/bibliotecas/revistas`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al obtener revistas"
      );
    }
  }
);

export const fetchLibros = createAsyncThunk(
  "bibliotecas/fetchLibros",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/bibliotecas/libros`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al obtener libros"
      );
    }
  }
);


const bibliotecaSlice = createSlice({
  name: "bibliotecas",
  initialState: {
    bibliotecas: [],
    loading: false,
    error: null,
    searchResults: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBiblioteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBiblioteca.fulfilled, (state, action) => {
        state.loading = false;
        state.bibliotecas.push(action.payload);
        toast.success("Biblioteca creado exitosamente");
        // Manejo de éxito
      })
      .addCase(createBiblioteca.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error al crear Biblioteca");
        // Manejo de errores
      })
      .addCase(fetchBibliotecas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBibliotecas.fulfilled, (state, action) => {
        state.loading = false;
        state.bibliotecas = action.payload;
        // Manejo de éxito
      })
      .addCase(fetchBibliotecas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Manejo de errores
      })
      .addCase(updateBiblioteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBiblioteca.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.bibliotecas.findIndex(
          (biblioteca) => biblioteca.id === action.payload.id
        );
        if (index !== -1) {
          state.bibliotecas[index] = action.payload;
        }
        // Manejo de éxito
      })
      .addCase(updateBiblioteca.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // Manejo de errores
      })
      .addCase(deleteBiblioteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBiblioteca.fulfilled, (state, action) => {
        state.loading = false;
        state.bibliotecas = state.bibliotecas.filter(
          (biblioteca) => biblioteca.id !== action.payload.id
        );
        // Manejo de éxito
      })
      .addCase(deleteBiblioteca.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Manejo de errores
      })
      .addCase(searchBiblioteca.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBiblioteca.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchBiblioteca.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchArticulos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticulos.fulfilled, (state, action) => {
        state.loading = false;
        state.articulos = action.payload;
      })
      .addCase(fetchArticulos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Casos para fetchRevistas
      .addCase(fetchRevistas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevistas.fulfilled, (state, action) => {
        state.loading = false;
        state.revistas = action.payload;
      })
      .addCase(fetchRevistas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Casos para fetchLibros
      .addCase(fetchLibros.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLibros.fulfilled, (state, action) => {
        state.loading = false;
        state.libros = action.payload;
      })
      .addCase(fetchLibros.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bibliotecaSlice.reducer;
