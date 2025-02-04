import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchConvenios = createAsyncThunk(
  "convenios/fetchConvenios",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/convenios`);
      return response.data;
    } catch (error) {
      throw Error("Error al obtener los convenios");
    }
  }
);

export const createConvenio = createAsyncThunk(
  "convenios/createConvenio",
  async (convenioData, { rejectWithValue }) => {
    try {
      const formDataWithFile = new FormData();
      Object.keys(convenioData).forEach((key) => {
        if (key === 'propuesta') {
          formDataWithFile.append('propuesta', convenioData[key][0]);
        } else {
          formDataWithFile.append(key, convenioData[key]);
        }
      });


      const response = await axios.post(
        `${apiUrl}/api/convenios`,
        formDataWithFile, {
          headers: {
            'Content-Type': 'multipart/form-data', // Specify the content type as form-data
          },
      });
      return response.data;
    } catch (error) {
      toast.error("Error al crear el convenio");
      return rejectWithValue(error.response.data.error || "Error creando convenio");
    }
  }
);

export const updateConvenio = createAsyncThunk(
  "convenios/updateConvenio",
  async ({ id, convenioData }, { rejectWithValue }) => {
    try {
      const formDataWithFile = new FormData();
      Object.keys(convenioData).forEach((key) => {
        if (key === 'convenio_parcial') {
          formDataWithFile.append('convenio_parcial', convenioData[key][0]);
        } else {
          formDataWithFile.append(key, convenioData[key]);
        }
      });

      // // Display the key/value pairs
      // for (const pair of formDataWithFile.entries()) {
      //   console.log(pair[0], pair[1]);
      // }


      const response = await axios.put(
        `${apiUrl}/api/convenios/${id}`,
        formDataWithFile
      );
      toast.success("Convenio actualizado exitosamente");
      return response.data;
    } catch (error) {
      toast.error("Error al actualizar el convenio");
      return rejectWithValue(error.response.data.error || "Error actualizando convenio");
    }
  }
);

export const deleteConvenio = createAsyncThunk(
  "convenios/deleteConvenio",
  async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/convenios/${id}`);
      toast.success("Convenio eliminado exitosamente");
      return id;
    } catch (error) {
      toast.error("Error al eliminar el convenio");
      throw Error(error.message);
    }
  }
);

const conveniosSlice = createSlice({
  name: "convenios",
  initialState: {
    convenios: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConvenios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConvenios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.convenios = action.payload;
      })
      .addCase(fetchConvenios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createConvenio.fulfilled, (state, action) => {
        state.convenios = [...state.convenios, action.payload];
      })
      .addCase(updateConvenio.fulfilled, (state, action) => {
        const index = state.convenios.findIndex(
          (convenio) => convenio.id === action.payload.id
        );
        if (index !== -1) {
          state.convenios[index] = action.payload;
        }
      })
      .addCase(deleteConvenio.fulfilled, (state, action) => {
        state.convenios = state.convenios.filter(
          (convenio) => convenio.id !== action.payload
        );
      });
  },
});

export default conveniosSlice.reducer;
