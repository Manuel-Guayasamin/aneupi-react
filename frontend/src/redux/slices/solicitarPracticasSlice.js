import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

// Thunk to create a new solicitante with curriculum file
export const createSolicitudPractica = createAsyncThunk(
  'solicitudes/createSolicitudPractica',
  async (solicitudData, { rejectWithValue }) => {
    try {
      const formDataWithFile = new FormData();
      console.log(solicitudData);
      Object.keys(solicitudData).forEach((key) => {
        
        if (key === 'curriculum') {
          formDataWithFile.append('curriculum', solicitudData[key]);
        } else {
          formDataWithFile.append(key, solicitudData[key]);
        }
      });


      // Make the POST request to the backend with the FormData including the curriculum file
      const response = await axios.post(`${apiUrl}/api/solicitar-practicas`, formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specify the content type as form-data
        },
      });

      toast.success("Postulación a la práctica creada exitosamente");
      return response.data;
    } catch (error) {
      toast.error("Error al postular a la práctica");
      return rejectWithValue(error.response.data.error || 'Error creating solicitante');
    }
  },
);

// Thunk to fetch all solicitudes
export const fetchSolicitudPractica = createAsyncThunk('solicitudes/fetchSolicitudPractica', async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/solicitar-practicas`);

    // toast.success("Postulaciones a las prácticas obtenidas exitosamente");
    return response.data;
  } catch (error) {
    throw Error(error.response.data.error || 'Error fetching solicitudes');
  }
});

// Thunk to fetch a solicitante by ID
export const fetchSolicitudPracricaById = createAsyncThunk('solicitudes/fetchSolicitudPracricaById', async (postId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/solicitar-practicas/${postId}`);

    // toast.success("Postulación a la práctica obtenida exitosamente");
    return response.data;
  } catch (error) {
    toast.error("Error al obtener la postulación a la práctica");
    throw Error(error.response.data.error || 'Error fetching solicitante');
  }
});

// Thunk to update a solicitante
export const updateSolicitudPractica = createAsyncThunk('solicitudes/updateSolicitudPractica', async ({ id, solicitudData }) => {
  try {
    const response = await axios.put(`${apiUrl}/api/solicitar-practicas/${id}`, solicitudData);
    toast.success("Postulación a práctica actualizada exitosamente");
    return response.data;
  } catch (error) {
    toast.error("Error al actualizar la postulación a la práctica");
    throw Error(error.response.data.error || 'Error updating solicitante');
  }
});

// Thunk to delete a solicitante
export const deleteSolicitudPractica = createAsyncThunk('solicitudes/deleteSolicitudPractica', async (postId) => {
  try {
    await axios.delete(`${apiUrl}/api/solicitar-practicas/${postId}`);

    toast.success("Postulación a la práctica eliminada exitosamente");
    return postId;
  } catch (error) {
    toast.error("Error al eliminar la postulación práctica");
    throw Error(error.response.data.error || 'Error deleting solicitante');
  }
});

// Postulantes slice
const solicitarPracticasSlice = createSlice({
  name: 'solicitudes',
  initialState: {
    solicitudes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolicitudPractica.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSolicitudPractica.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.solicitudes = action.payload;
      })
      .addCase(fetchSolicitudPractica.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createSolicitudPractica.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createSolicitudPractica.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.solicitudes.push(action.payload.solicitante);
      })
      .addCase(createSolicitudPractica.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSolicitudPractica.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.solicitudes.findIndex((solicitante) => solicitante.id === action.payload.id);
        if (index !== -1) {
          state.solicitudes[index] = action.payload;
        }
      })
      .addCase(updateSolicitudPractica.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteSolicitudPractica.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.solicitudes = state.solicitudes.filter((solicitante) => solicitante.id !== action.payload);
      })
      .addCase(deleteSolicitudPractica.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default solicitarPracticasSlice.reducer;
