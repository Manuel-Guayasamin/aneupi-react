import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

// Función para obtener todas las citas de servicio
export const fetchServiciosCitas = createAsyncThunk(
    "serviciosCitas/fetchServiciosCitas",
    async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/servicios-citas`);
            return response.data;
        } catch (error) {
            throw Error("Error al obtener las citas de servicio");
        }
    }
);

// Función para crear una nueva cita de servicio
export const createServicioCita = createAsyncThunk(
    "serviciosCitas/createServicioCita",
    async (citaData) => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/servicios-citas`,
                citaData
            );
            toast.success("Cita de servicio creada exitosamente");
            return response.data;
        } catch (error) {
            toast.error("Error al crear la cita de servicio");
            throw Error(error.message);
        }
    }
);

// Función para actualizar una cita de servicio
export const updateServicioCita = createAsyncThunk(
    "serviciosCitas/updateServicioCita",
    async ({ id, citaData }) => {
        try {
            const response = await axios.put(
                `${apiUrl}/api/servicios-citas/${id}`,
                citaData
            );
            toast.success("Cita de servicio actualizada exitosamente");
            return response.data;
        } catch (error) {
            toast.error("Error al actualizar la cita de servicio");
            throw Error(error.message);
        }
    }
);

// Función para eliminar una cita de servicio
export const deleteServicioCita = createAsyncThunk(
    "serviciosCitas/deleteServicioCita",
    async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/servicios-citas/${id}`);
            toast.success("Cita de servicio eliminada exitosamente");
            return id;
        } catch (error) {
            toast.error("Error al eliminar la cita de servicio");
            throw Error(error.message);
        }
    }
);

export const generateServiciosCitasExcel = createAsyncThunk(
    "serviciosCitas/generateServiciosCitasExcel",
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
            const filename = `${currentDate}_servicioCita_${uniqueCode}.xlsx`;

            const response = await axios.get(
                `${apiUrl}/api/servicios-citas/generateExcel/${id}`,
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

// Slice para las citas de servicio
const serviciosCitasSlice = createSlice({
    name: "citas",
    initialState: {
        citas: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServiciosCitas.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchServiciosCitas.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.citas = action.payload;
            })
            .addCase(fetchServiciosCitas.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createServicioCita.fulfilled, (state, action) => {
                state.citas = [...state.citas, action.payload];
            })
            .addCase(updateServicioCita.fulfilled, (state, action) => {
                const index = state.serviciosCitas.findIndex(
                    (servicioCita) => servicioCita.id === action.payload.id
                );
                if (index !== -1) {
                    state.serviciosCitas[index] = action.payload;
                }
            })
            .addCase(deleteServicioCita.fulfilled, (state, action) => {
                state.serviciosCitas = state.serviciosCitas.filter(
                    (servicioCita) => servicioCita.id !== action.payload
                );
            })
            .addCase(generateServiciosCitasExcel.pending, (state) => {
                state.status = "loading";
            })
            .addCase(generateServiciosCitasExcel.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(generateServiciosCitasExcel.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default serviciosCitasSlice.reducer;
