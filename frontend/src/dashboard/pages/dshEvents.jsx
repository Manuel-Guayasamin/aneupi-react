import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAdminResource from "../../hooks/useAdminResource";
import {
  deleteEvent,
  fetchEvents,
  generateExcel,
} from "../../redux/slices/eventSlice";
import DshContainer from "../layout/dshContainer";
import ModalActualizar from "../../admin_pages/Eventos/ModalActualizarEvento";
import ModalRegistro from "../../admin_pages/Eventos/ModalRegistroEvento";
import ModalInscritos from "../../admin_pages/Eventos/ModalInscritos";
import {
  FaCalendarPlus,
  FaPencil,
  FaTrash,
  FaFileExcel,
  FaUsers,
} from "react-icons/fa6";
import ActionButton from "../components/Buttons/ActionButton.jsx";
const serverURL = import.meta.env.VITE_API_URL;

const DshPracticas = () => {
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.authentication);

  const [showInscritosModal, setShowInscritosModal] = useState(false);

  const openModal = (eventId) => {
    setShowInscritosModal(eventId);
  };

  const closeModal = () => {
    setShowInscritosModal(false);
  };

  const [modalidadFilter, setModalidadFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");

  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleEstadoFilterChange = (event) => {
    setEstadoFilter(event.target.value);
  };

  const handleModalidadFilterChange = (event) => {
    setModalidadFilter(event.target.value);
  };

  const resetFilters = () => {
    setEstadoFilter("");
    setModalidadFilter("");
  };

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
    resourceUpdated,
    setResourceUpdated,
  } = useAdminResource(fetchEvents, deleteEvent, "eventos");

  const handleExcelClick = (eventId) => {
    dispatch(generateExcel(eventId));
  };

  const handleDeleteEvent = () => {
    confirmDelete();
  };

  useEffect(() => {
    let filtered = events.filter((event) => {
      if (modalidadFilter && event.Modalidad.nombre !== modalidadFilter)
        return false;
      if (estadoFilter && event.Estado.nombre !== estadoFilter) return false;
      return true;
    });
    setFilteredEvents(filtered);
  }, [events, modalidadFilter, estadoFilter]);

  console.log(events);

  return (
    <DshContainer
      title="Eventos"
      content={
        <ActionButton
          ActionIcon={FaCalendarPlus}
          label="Crear Nuevo Evento"
          onClick={openRegistroModal}
        />
      }
    >
      <ModalRegistro
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showRegistroModal}
        closeModal={closeRegistroModal}
      />

      <ModalActualizar
        resourceUpdated={resourceUpdated}
        setResourceUpdated={setResourceUpdated}
        showModal={showActualizarModal}
        closeModal={closeActualizarModal}
        eventoSelected={eventoSelected}
      />
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4">
          <div>
            <label className="form-control">
              <span className="label-text dark:text-slate-100">Estado</span>
              <select
                value={estadoFilter}
                onChange={handleEstadoFilterChange}
                className="select select-bordered select-sm dark:text-slate-800"
              >
                <option value="">Todas</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Rechazado">Rechazado</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </label>
          </div>

          <div>
            <label className="form-control">
              <span className="label-text dark:text-slate-100">Modalidad</span>
              <select
                value={modalidadFilter}
                onChange={handleModalidadFilterChange}
                className="select select-bordered select-sm dark:text-slate-800"
              >
                <option value="">Todas</option>
                <option value="Virtual">Virtual</option>
                <option value="Hibrida">Hibrida</option>
                <option value="Presencial">Presencial</option>
              </select>
            </label>
          </div>

          <div className="md:mt-3">
            {" "}
            {/* Agrega una clase de margen superior solo en dispositivos medianos y grandes */}
            <button
              className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-white dark:bg-blue-700 rounded-md dark:hover:bg-blue-800 bg-colorcito hover:bg-slate-700 focus:outline-none"
              onClick={resetFilters}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
        <table className="w-full mb-8">
          {/* Table headers */}
          <thead className="text-xs font-bold tracking-wider text-white uppercase">
            <tr className="colorcito  text-left  dark:bg-blue-700">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3 text-center">Imagen</th>
              <th className="px-6 py-3">Código</th>

              <th className="px-6 py-3">Nombre Evento</th>
              <th className="px-6 py-3">Costo</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Modalidad</th>
              <th className="px-6 py-3">Inscritos</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="dsh-tertiary divider-y divider-yellow-400">
            {!loading &&
              Array.isArray(filteredEvents) &&
              filteredEvents.reverse().map((event, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{event.id}</td>
                  <td className="flex items-center justify-center mt-2 truncate">
                    <img
                      src={event.imagen}
                      alt={event.nombre}
                      className="w-10 h-10 "
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event.codigo}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {event.Usuario.nombreUsuario}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${event.costo}
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm ${
                        event.Estado.id === 1
                          ? "badge-warning"
                          : event.Estado.id === 2
                          ? "badge-accent"
                          : event.Estado.id === 3
                          ? "badge-error"
                          : event.Estado.id === 4
                          ? "badge-info"
                          : "badge-success text-white"
                      }`}
                    >
                      {event.Estado.nombre}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event.Modalidad.nombre}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      className="mr-2 bg-blue-400 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md"
                      onClick={() => openModal(event.id)}
                    >
                      <FaUsers />
                    </button>
                    {showInscritosModal && (
                      <ModalInscritos
                        postId={showInscritosModal}
                        showModal={!!showInscritosModal}
                        closeModal={closeModal}
                      />
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <button
                      onClick={() => openActualizarModal(event)}
                      className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info"
                    >
                      <div className="tooltip" data-tip="Actualizar">
                        <FaPencil />
                      </div>
                    </button>
                    <button
                      onClick={() => openConfirmation(event.id)}
                      className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error"
                    >
                      <div className="tooltip" data-tip="Eliminar">
                        <FaTrash />
                      </div>
                    </button>
                    <button
                      onClick={() => handleExcelClick(event.id)}
                      className="hover:text-green-500 p-1.5 hover:bg-black/0 rounded-md badge badge-success"
                    >
                      <div className="tooltip" data-tip="Excel">
                        <FaFileExcel />
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="p-6 space-y-4 bg-white rounded-lg">
              <h2 className="text-lg font-bold md:text-2xl">
                Confirmar eliminación
              </h2>
              <div className="text-sm dark:text-black">
                <p className="">
                  ¿Estás seguro de que deseas eliminar este evento?
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-5 py-3 text-white rounded-lg bg-red-600 hover:text-red-600 border border-transparent
                  hover:border-red-600 hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-red-700 dark:text-white 
                  dark:hover:bg-white dark:hover:text-red-700 dark:hover:border-red-700"
                  onClick={handleDeleteEvent}
                >
                  Confirmar
                </button>
                <button
                  className="px-5 py-3 text-black bg-gray-300 rounded-lg hover:text-black border border-transparent
                  hover:border-gray-500 hover:bg-white hover:shadow-lg hover:shadow-gray-500"
                  onClick={closeConfirmation}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Pagination */}
    </DshContainer>
  );
};

export default DshPracticas;
