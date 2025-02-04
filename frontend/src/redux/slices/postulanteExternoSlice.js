import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Thunk para crear un nuevo postulante externo
export const createPostulanteExterno = createAsyncThunk(
  "postulantesExternos/createPostulanteExterno",
  async (postulanteExternoData, { rejectWithValue }) => {
    try {
      const formDataWithFile = new FormData();
      // Agregar datos del postulante al FormData
      Object.keys(postulanteExternoData).forEach((key) => {
        if (key === "curriculum") {
          // Si es el campo curriculum, agregar el archivo al FormData
          formDataWithFile.append("curriculum", postulanteExternoData[key][0]);
        } else {
          // Para otros campos, simplemente agregar el valor al FormData
          formDataWithFile.append(key, postulanteExternoData[key]);
        }
      });

      // Realizar la solicitud POST al backend con el FormData que incluye el archivo del curriculum
      const response = await axios.post(
        `${apiUrl}/api/postulantes-externos`,
        formDataWithFile,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Especificar el tipo de contenido como form-data
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.error || "Error creando postulante externo"
      );
    }
  }
);

// Thunk para obtener todos los postulantes externos
export const fetchPostulantesExternos = createAsyncThunk(
  "postulantesExternos/fetchPostulantesExternos",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/postulantes-externos`);
      return response.data;
    } catch (error) {
      throw Error(
        error.response.data.error || "Error obteniendo postulantes externos"
      );
    }
  }
);

// Thunk para obtener un postulante externo por su ID
export const fetchPostulanteExternoById = createAsyncThunk(
  "postulantesExternos/fetchPostulanteExternoById",
  async (postId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/postulantes-externos/${postId}`
      );
      return response.data;
    } catch (error) {
      throw Error(
        error.response.data.error || "Error obteniendo postulante externo"
      );
    }
  }
);

// Thunk para actualizar un postulante externo
export const updatePostulanteExterno = createAsyncThunk(
  "postulantesExternos/updatePostulanteExterno",
  async ({ id, postulanteExternoData }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/postulantes-externos/${id}`,
        postulanteExternoData
      );
      return response.data;
    } catch (error) {
      throw Error(
        error.response.data.error || "Error actualizando postulante externo"
      );
    }
  }
);

// Thunk para eliminar un postulante externo
export const deletePostulanteExterno = createAsyncThunk(
  "postulantesExternos/deletePostulanteExterno",
  async (postId) => {
    try {
      await axios.delete(`${apiUrl}/api/postulantes-externos/${postId}`);
      return postId;
    } catch (error) {
      throw Error(
        error.response.data.error || "Error eliminando postulante externo"
      );
    }
  }
);

// Slice para los postulantes externos
const postulantesExternosSlice = createSlice({
  name: "postulantesExternos",
  initialState: {
    postulantesExternos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtiene todos los postulantes externos
      .addCase(fetchPostulantesExternos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostulantesExternos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postulantesExternos = action.payload;
      })
      .addCase(fetchPostulantesExternos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Crea un postulante externo
      .addCase(createPostulanteExterno.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPostulanteExterno.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postulantesExternos.push(action.payload.postulanteExterno);
      })
      .addCase(createPostulanteExterno.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Actualiza un postulante externo
      .addCase(updatePostulanteExterno.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePostulanteExterno.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.postulantesExternos.findIndex(
          (postulante) => postulante.id === action.payload.id
        );
        if (index !== -1) {
          state.postulantesExternos[index] = action.payload;
        }
      })
      .addCase(updatePostulanteExterno.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Elimina un postulante externo
      .addCase(deletePostulanteExterno.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePostulanteExterno.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postulantesExternos = state.postulantesExternos.filter(
          (postulante) => postulante.id !== action.payload
        );
      })
      .addCase(deletePostulanteExterno.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postulantesExternosSlice.reducer;
