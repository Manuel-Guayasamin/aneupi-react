import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

// Thunk to create a new postulante with curriculum file
export const createPostulante = createAsyncThunk(
  "postulantes/createPostulante",
  async (postulanteData, { rejectWithValue }) => {
    try {
      const formDataWithFile = new FormData();
      console.log(postulanteData);
      Object.keys(postulanteData).forEach((key) => {
        if (key === "curriculum") {
          // If it's the curriculum field, add the file to the FormData
          formDataWithFile.append("curriculum", postulanteData[key]);
        } else {
          formDataWithFile.append(key, postulanteData[key]);
        }
      });

      // Make the POST request to the backend with the FormData including the curriculum file
      const response = await axios.post(
        `${apiUrl}/api/postulantes`,
        formDataWithFile,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Specify the content type as form-data
          },
        }
      );
      toast.success("Postulante creado exitosamente");
      return response.data;
    } catch (error) {
      toast.error("Postulante no pudo ser creado");

      return rejectWithValue(
        error.response.data.error || "Error creating postulante"
      );
    }
  }
);

// Thunk to fetch all postulantes
export const fetchPostulantes = createAsyncThunk(
  "postulantes/fetchPostulantes",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/postulantes`);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.error || "Error fetching postulantes");
    }
  }
);

// Thunk to fetch a postulante by ID
export const fetchPostulanteById = createAsyncThunk(
  "postulantes/fetchPostulanteById",
  async (postId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/postulantes/${postId}`);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.error || "Error fetching postulante");
    }
  }
);

// Thunk to update a postulante
export const updatePostulante = createAsyncThunk(
  "postulantes/updatePostulante",
  async ({ id, postulanteData }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/postulantes/${id}`,
        postulanteData
      );
      toast.success("Postulante actualizado exitosamente");
      return response.data;
    } catch (error) {
      toast.error("Error al actualizar postulante");
      throw Error(error.response.data.error || "Error updating postulante");
    }
  }
);

// Thunk to delete a postulante
export const deletePostulante = createAsyncThunk(
  "postulantes/deletePostulante",
  async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/postulantes/${id}`);
    } catch (error) {
      throw Error(error.response.data.error || "Error deleting postulante");
    }
  }
);

// Postulantes slice
const postulantesSlice = createSlice({
  name: "postulantes",
  initialState: {
    postulantes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostulantes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostulantes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postulantes = action.payload;
      })
      .addCase(fetchPostulantes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPostulante.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postulantes.push(action.payload.postulante);
      })
      .addCase(createPostulante.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePostulante.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.postulantes.findIndex(
          (postulante) => postulante.id === action.payload.id
        );
        if (index !== -1) {
          state.postulantes[index] = action.payload;
        }
      })
      .addCase(updatePostulante.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePostulante.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postulantes = state.postulantes.filter(
          (postulante) => postulante.id !== action.payload
        );
      })
      .addCase(deletePostulante.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postulantesSlice.reducer;
