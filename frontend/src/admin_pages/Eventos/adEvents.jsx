import React from "react";
import { FaFileExcel, FaPencil, FaTrash } from "react-icons/fa6";
import useAdminResource from "../../hooks/useAdminResource";
import {
  deleteEvent,
  fetchEvents,
  generateExcel,
} from "../../redux/slices/eventSlice"; // Importamos las acciones para eventos
import ModalActualizarEvento from "./ModalActualizarEvento"; // Importamos el componente de modal para actualizar eventos
import ModalRegistroEvento from "./ModalRegistroEvento"; // Importamos el componente de modal para registrar eventos
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "../adLayout";
import { Dark } from "../../styles/DarkTheme";
import { Light } from "../../styles/LightTheme";

const serverURL = import.meta.env.VITE_API_URL;

const AdminEventos = () => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const currentTheme = theme === "dark" ? Dark : Light;

  const {
    resources: events,
    loading,
    showConfirmation,
    openConfirmation,
    closeConfirmation,
    confirmDelete,
    showRegistroModal,
    showActualizarModal,
    resourceSelected: eventoSelected,
    openRegistroModal,
    openActualizarModal,
    closeRegistroModal,
    closeActualizarModal,
  } = useAdminResource(fetchEvents, deleteEvent, "eventos");

  // Function to handle Excel button click
  const handleExcelClick = (eventId) => {
    dispatch(generateExcel(eventId)); // Dispatch generateExcel action with the event ID
  };

  return (
    <div className="max-w-screen-xl py-12 mx-auto">
      <ModalRegistroEvento
        showModal={showRegistroModal}
        closeModal={closeRegistroModal}
      />
      <ModalActualizarEvento
        showModal={showActualizarModal}
        closeModal={closeActualizarModal}
        eventoSelected={eventoSelected}
      />
      <header className="flex flex-col items-center justify-between gap-2 md:flex-row">
        <h2 className="text-2xl font-bold text-center md:text-left md:text-4xl">
          Listado de Eventos
        </h2>
      </header>
      <div className="mt-6 overflow-auto min-h-96 max-h-96">
        <table>
          <thead>
            <tr
              className={`text-sm ${
                theme === "dark"
                  ? "border-b border-white"
                  : "border-b border-black"
              }`}
              style={{ color: theme === "dark" ? "#ADD1FF" : "inherit" }}
            >
              <th className="w-[5%]">#</th>
              <th className="w-[10%]">Imagen</th>
              <th className="w-[5%]">Código</th>
              <th className="w-[20%]">Usuario</th>
              <th className="w-[20%]">Nombre Evento</th>
              <th className="w-[15%]">Costo</th>
              <th className="w-[15%]">Estado</th>
              <th className="w-[15%]">Modalidad</th>
              <th className="w-[5%]">Acciones</th>
            </tr>
          </thead>
          <tbody className="min-h-96">
            {!loading &&
              events.map((evento, index) => (
                <tr key={evento.id} className="text-xs">
                  <th>{index + 1}</th>
                  <td
                    className="flex items-center justify-center"
                    style={{ padding: "5px" }}
                  >
                    <img
                      src={`${serverURL}/${evento.imagen}`}
                      alt={evento.nombre}
                      className="object-cover w-10 h-10"
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>{evento.codigo}</td>
                  <td style={{ textAlign: "center" }}>
                    {evento.Usuario.nombreUsuario}
                  </td>
                  <td style={{ textAlign: "center" }}>{evento.nombre}</td>
                  <td style={{ textAlign: "center" }}>${evento.costo}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      className={`badge badge-sm ${
                        evento.Estado.id === 1
                          ? "badge-warning"
                          : evento.Estado.id === 2
                          ? "badge-accent"
                          : evento.Estado.id === 3
                          ? "badge-error"
                          : evento.Estado.id === 4
                          ? "badge-info"
                          : "badge-success text-white"
                      }`}
                    >
                      {evento.Estado.nombre}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {evento.Modalidad.nombre}
                  </td>
                  <td className="flex items-center justify-center gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="m-0 text-white btn btn-info btn-xs"
                        type="button"
                        disabled={loading}
                        onClick={() => openActualizarModal(evento)}
                      >
                        <span className="sr-only">Actualizar</span>
                        <FaPencil />
                      </button>
                      <button
                        className="m-0 text-white btn btn-error btn-xs"
                        type="button"
                        onClick={() => openConfirmation(evento.id)}
                      >
                        <span className="sr-only">Eliminar</span>
                        <FaTrash />
                      </button>
                      <button
                        className="m-0 text-white btn btn-success btn-xs"
                        type="button"
                        onClick={() => handleExcelClick(evento.id)}
                      >
                        <span className="sr-only">Excel</span>
                        <FaFileExcel />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="p-6 space-y-4 bg-white rounded-lg">
              <h2 className="text-lg font-bold md:text-2xl">
                Confirmar eliminación
              </h2>
              <div className="text-sm">
                <p className="">
                  ¿Estás seguro de que deseas eliminar este evento?
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="btn btn-error" onClick={confirmDelete}>
                  Confirmar
                </button>
                <button className="btn" onClick={closeConfirmation}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        className="inline-block mt-4 ml-auto btn btn-primary text-white"
        onClick={openRegistroModal}
      >
        Crear Nuevo Evento
      </button>
    </div>
  );
};

export default AdminEventos;
