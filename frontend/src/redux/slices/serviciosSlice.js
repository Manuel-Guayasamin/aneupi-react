import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

// Función para obtener todos los servicios
export const fetchServicios = createAsyncThunk(
  "servicios/fetchServicios",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/servicios`);
      return response.data;
    } catch (error) {
      throw Error("Error al obtener los servicios");
    }
  }
);

// Función para crear un nuevo servicio
export const createServicio = createAsyncThunk(
  "servicios/createServicio",
  async (servicioData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/servicios`,
        servicioData
      );
      toast.success("Servicio creado exitosamente");
      return response.data;
    } catch (error) {
      toast.error("Error al crear el servicio");
      throw Error(error.message);
    }
  }
);

// Función para actualizar un servicio
export const updateServicio = createAsyncThunk(
  "servicios/updateServicio",
  async ({ id, servicioData }) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/servicios/${id}`,
        servicioData
      );
      toast.success("Servicio actualizado exitosamente");
      return response.data;
    } catch (error) {
      toast.error("Error al actualizar el servicio");
      throw Error(error.message);
    }
  }
);

// Función para eliminar un servicio
export const deleteServicio = createAsyncThunk(
  "servicios/deleteServicio",
  async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/servicios/${id}`);
      toast.success("Servicio eliminado exitosamente");
      return id;
    } catch (error) {
      toast.error("Error al eliminar el servicio");
      throw Error(error.message);
    }
  }
);

export const generateServiciosExcel = createAsyncThunk(
  "servicios/generateServiciosExcel",
  async (id, { rejectWithValue }) => {
    try {
      // Generate the current date in the desired format
      const currentDate = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

      // Generate a unique code for the filename
      const uniqueCode = Math.random().toString(36).substring(2, 8);

      // Construct the filename with the event code at the beginning
      const filename = `${currentDate}_servicio_${uniqueCode}.xlsx`;

      const response = await axios.get(
        `${apiUrl}/api/servicios/generateExcel/${id}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);

      link.click();
      window.URL.revokeObjectURL(url);

      return "Excel generated successfully";
    } catch (error) {
      return rejectWithValue("Error generating Excel");
    }
  }
);

// Slice para los servicios
const serviciosSlice = createSlice({
  name: "servicios",
  initialState: {
    servicios: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.servicios = action.payload;
      })
      .addCase(fetchServicios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createServicio.fulfilled, (state, action) => {
        state.servicios = [...state.servicios, action.payload];
      })
      .addCase(updateServicio.fulfilled, (state, action) => {
        const index = state.servicios.findIndex(
          (servicio) => servicio.id === action.payload.id
        );
        if (index !== -1) {
          state.servicios[index] = action.payload;
        }
      })
      .addCase(deleteServicio.fulfilled, (state, action) => {
        state.servicios = state.servicios.filter(
          (servicio) => servicio.id !== action.payload
        );
      })
      .addCase(generateServiciosExcel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(generateServiciosExcel.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(generateServiciosExcel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default serviciosSlice.reducer;
