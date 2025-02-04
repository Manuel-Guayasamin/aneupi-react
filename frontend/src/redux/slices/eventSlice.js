import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  loading: false,
  error: null,
  eventos: [],
  eventFound: {},
};

// Acción asincrónica para obtener todos los eventos
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/eventos`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error al obtener eventos");
    }
  }
);
// Acción asincrónica para obtener todos los eventos
export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (eventoID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/eventos/${eventoID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error al obtener eventos");
    }
  }
);

// Acción asincrónica para crear un evento con imagen
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const formDataWithFile = new FormData();
      // Agregar campos del evento al FormData
      Object.keys(eventData).forEach((key) => {
        if (key === "imagen") {
          // Si es el campo de imagen, agrega el archivo al FormData
          formDataWithFile.append("imagen", eventData[key][0]);
        } else if (key === "fecha_inicio" || key === "fecha_fin") {
          // Si son las fechas, formatearlas correctamente antes de agregarlas al FormData
          const formattedDate = new Date(eventData[key]).toISOString(); // Formato ISO para la fecha
          formDataWithFile.append(key, formattedDate);
        } else {
          // Para otros campos, simplemente agrega el valor al FormData
          formDataWithFile.append(key, eventData[key]);
        }
      });

      // Realizar la solicitud POST al backend con el FormData que incluye la imagen
      const response = await axios.post(
        `${apiUrl}/api/eventos`,
        formDataWithFile,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Especifica el tipo de contenido como form-data
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error al crear evento");
    }
  }
);

// Acción asincrónica para actualizar un evento
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, eventoData }, { rejectWithValue }) => {
    try {
      // Verificar si hay una nueva imagen proporcionada
      if (
        eventoData.imagen instanceof FileList &&
        eventoData.imagen.length === 1
      ) {
        // Si se proporcionó una nueva imagen, crear FormData y agregarla
        const formDataWithFile = new FormData();

        Object.keys(eventoData).forEach((key) => {
          if (key === "imagen") {
            // Si es el campo de imagen, agrega el archivo al FormData
            formDataWithFile.append("imagen", eventoData[key][0]);
          } else if (key === "fecha_inicio" || key === "fecha_fin") {
            // Si son las fechas, formatearlas correctamente antes de agregarlas al FormData
            const formattedDate = new Date(eventoData[key]).toISOString(); // Formato ISO para la fecha
            formDataWithFile.append(key, formattedDate);
          } else {
            // Para otros campos, simplemente agrega el valor al FormData
            formDataWithFile.append(key, eventoData[key]);
          }
        });

        // Realizar la solicitud PUT con el FormData que incluye la nueva imagen
        const response = await axios.put(
          `${apiUrl}/api/eventos/${id}`,
          formDataWithFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      } else {
        // Si no se proporcionó una nueva imagen, realizar la solicitud PUT sin FormData
        const response = await axios.put(
          `${apiUrl}/api/eventos/${id}`,
          eventoData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al actualizar evento"
      );
    }
  }
);

// Acción asincrónica para eliminar un evento
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/eventos/${eventId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error al eliminar evento");
    }
  }
);

// Acción asincrónica para obtener solo los eventos activos (id_estado !== 1)
export const fetchActiveEvents = createAsyncThunk(
  "events/fetchActiveEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/eventos?estadoIdNotEqual=2`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Error al obtener eventos activos"
      );
    }
  }
);

// Define the generateExcel thunk action
export const generateExcel = createAsyncThunk(
  "events/generateExcel",
  async (eventId, { rejectWithValue }) => {
    try {
      // Generate the current date in the desired format
      const currentDate = new Date()
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "");

      // Generate a unique code for the filename
      const uniqueCode = Math.random().toString(36).substring(2, 8);

      // Construct the filename with the event code at the beginning
      const filename = `${currentDate}_evento_${uniqueCode}.xlsx`;

      // Fetch the Excel file from the server
      const response = await axios.get(
        `${apiUrl}/api/eventos/generateExcel/${eventId}`,
        {
          responseType: "blob", // Ensure response type is blob
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);

      // Return a success message (not necessary but helpful for potential UI updates)
      return "Excel Generado Exitosamente";
    } catch (error) {
      return rejectWithValue(error.response.data || "Error generating Excel");
    }
  }
);

// Slice para manejar los eventos
const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.eventos = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchActiveEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.eventos = action.payload;
      })
      .addCase(fetchActiveEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.eventFound = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success("Evento creado exitosamente");
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error al crear evento");
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Actualiza el evento en el estado con los datos actualizados
        state.eventos = state.eventos.map((event) =>
          event.id === action.payload.id
            ? { ...event, ...action.payload }
            : event
        );
        toast.success("Evento actualizado exitosamente");
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error al actualizar evento");
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Elimina el evento del estado
        state.eventos = state.eventos.filter(
          (event) => event.id !== action.payload.id
        );
        toast.success("Evento eliminado exitosamente");
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error al eliminar evento");
      })
      .addCase(generateExcel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateExcel.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success(action.payload); // Display success message
      })
      .addCase(generateExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error generating Excel"); // Display error message
      });
  },
});

export default eventSlice.reducer;
