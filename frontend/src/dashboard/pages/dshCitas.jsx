import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaDeleteLeft, FaPencil, FaTrash } from "react-icons/fa6";
import DshContainer from "../layout/dshContainer";
import useAdminResource from "../../hooks/useAdminResource";
import { fetchServiciosCitas, deleteServicioCita } from "../../redux/slices/serviciocitasSlice";
import { fetchServicios } from "../../redux/slices/serviciosSlice";
import { getAllUsuarios } from '../../redux/slices/usuariosSlice';
import ModalActualizarCita from "../../admin_pages/Citas/ModalActualizarCita";
import { BiIdCard } from "react-icons/bi";

const DshCitas = () => {
    const dispatch = useDispatch();

    const {
        resources: citas,
        loading,
        showConfirmation,
        openConfirmation,
        closeConfirmation,
        confirmDelete,
        showActualizarModal,
        resourceSelected: citaSelected,
        openActualizarModal,
        closeActualizarModal,
        resourceUpdated,
        setResourceUpdated,
    } = useAdminResource(fetchServiciosCitas, deleteServicioCita, "citas");

    const usuarios = useSelector((state) => state.usuarios.usuarios);
    const servicios = useSelector((state) => state.servicios.servicios);
    const estados = useSelector((state) => state.estados.estados);

    const [nombreBusqueda, setNombreBusqueda] = useState("");
    const [estadoCita, setEstadoCita] = useState("");
    const [servicio, setServicio] = useState("");

    useEffect(() => {
        dispatch(fetchServiciosCitas())
        dispatch(fetchServicios());
        dispatch(getAllUsuarios());
    }, [dispatch]);

    const handleBusquedaChange = (event) => {
      setNombreBusqueda(event.target.value);
    };

    const citasPorServicio = citas.filter((cita) => {
      if (servicio === "") {
        return citas;
      }
      return cita.ServicioLinea.id_servicio == servicio;
    });

    const citasPorEstado = citasPorServicio.filter((cita) => {
      if (estadoCita === "") {
        return citasPorServicio;
      }
      return cita.Estado.id == estadoCita;
    });

    const citasFiltradas = citasPorEstado.filter((cita) => {
      return cita.solicitante_nombre.toLowerCase().includes(nombreBusqueda.toLowerCase());
    });

    const handleClearSearch = () => {
      setNombreBusqueda("");
    };

    const handleDeleteCita = () => {
        setResourceUpdated({
            ...resourceUpdated,
            isRegistered: {
                ...resourceUpdated.isUdated,
                value: true,
            },
        });
        confirmDelete();
    };

    const handleEstadoCitaChange = (event) => {
      setEstadoCita(event.target.value);
    }

    const handleServicioChange = (event) => {
      setServicio(event.target.value);
    }

    const resetFilters = () => {
      setEstadoCita("");
      setServicio("");
    }

    const obtenerProfesional = (idProfesional) => {
      if (usuarios.usuarios) {
        const profesional = usuarios.usuarios.find(serv => serv.id === idProfesional);
        return profesional ? `${profesional.nombres} ${profesional.apellidos}` : 'Error';
      }
        const profesional = usuarios.find(serv => serv.id === idProfesional);
        return profesional ? `${profesional.nombres} ${profesional.apellidos}` : 'Error';
    };

    const obtenerServicio = (idServicio) => {
        const servicio = servicios.find(serv => serv.id === idServicio);
        return servicio ? servicio.nombre : 'Error';
    };

    const citasOrden = [...citasFiltradas].sort((a, b) => a.id - b.id);

    return (
        <DshContainer
            title="Citas"
        >
            <ModalActualizarCita
                resourceUpdated={resourceUpdated}
                setResourceUpdated={setResourceUpdated}
                showModal={showActualizarModal}
                closeModal={closeActualizarModal}
                citaSelected={citaSelected}
            />

        <div className="flex items-center whitespace-nowrap mx-auto mb-8">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <BiIdCard className="text-2xl text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Buscar cita por nombre del solicitante..."
              className="border ps-11 px-4 py-2 rounded-md w-full dsh-tertiary focus:outline-none focus:shadow-md"
              value={nombreBusqueda}
              onChange={handleBusquedaChange}
            />
          </div>
          <button
            className="px-3 md:px-4 py-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none"
            onClick={handleClearSearch}
          >
            <FaDeleteLeft className="w-full h-full text-3xl md:hidden" />
            <span className='hidden md:block'>Limpiar búsqueda </span>
          </button>
        </div>

        <div className="grid items-center grid-cols-1 gap-4 mb-4 md:grid-cols-5">
          <div>
            <label className="form-control">
              <span className="label-text dark:text-slate-100 ">Tipo de Servicio</span>
              <select
                className="select select-bordered select-sm dark:text-slate-800"
                onChange={handleServicioChange}
                value={servicio}
              >
                <option value="">Todos</option>
                {servicios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label className="form-control">
              <span className="label-text dark:text-slate-100 ">Estado</span>
              <select
                className="select select-bordered select-sm dark:text-slate-800"
                onChange={handleEstadoCitaChange}
                value={estadoCita}
              >
                <option value="">Todos</option>
                {estados.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
              </select>

            </label>
          </div>
          <div className="md:mt-3"> {/* Agrega una clase de margen superior solo en dispositivos medianos y grandes */}
            <button
              className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-white rounded-md dark:bg-blue-700 dark:hover:bg-blue-800 bg-colorcito hover:bg-slate-700 focus:outline-none"
              onClick={resetFilters}
            >
              Restablecer filtros
            </button>
          </div>
        </div>

            <div className="overflow-x-auto">
                <table className="w-full mb-8">
                    <thead className="text-xs font-bold tracking-wider text-white uppercase ">
                        <tr className="text-left bg-colorcito dark:bg-blue-700">
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3 ">Servicio</th>
                            <th className="px-6 py-3 ">Profesional</th>
                            <th className="px-6 py-3 ">Solicitante</th>
                            <th className="px-6 py-3 ">Ciudad/Cantón/Pueblo</th>
                            <th className="px-6 py-3 ">Teléfono Solicitante</th>
                            <th className="px-6 py-3 ">Hora Cita</th>
                            <th className="px-6 py-3 ">Fecha Cita</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="dsh-tertiary divider-y divider-yellow-400">
                        {!loading && citasOrden.map((cita, index) => (
                            <tr key={cita.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{obtenerServicio(cita.ServicioLinea?.id_servicio)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{obtenerProfesional(cita.ServicioLinea?.id_profesional)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{cita.solicitante_nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{cita.ciudad}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{cita.solicitante_telefono}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(cita.fecha_inicio).toTimeString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(cita.fecha_inicio).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                    })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{cita.Estado.nombre}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap">
                                    <button
                                        onClick={() => openActualizarModal(cita)}
                                        className="mr-2 hover:text-blue-500 p-1.5 hover:bg-black/0 rounded-md badge badge-info"
                                    >
                                        <div className="tooltip" data-tip="Actualizar">
                                            <FaPencil />
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => openConfirmation(cita.id)}
                                        className="mr-2 hover:text-red-500 p-1.5 hover:bg-black/0 rounded-md badge badge-error"
                                    >
                                        <div className="tooltip" data-tip="Eliminar">
                                            <FaTrash />
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showConfirmation && (
                    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
                        <div className='p-6 space-y-4 bg-white rounded-lg'>
                            <h2 className='text-lg font-bold md:text-2xl'>Confirmar eliminación</h2>
                            <div className="text-sm dark:text-black">
                                <p className=''>¿Estás seguro de que deseas eliminar esta cita?</p>
                            </div>
                            <div className='flex justify-end gap-2 mt-4'>
                                <button
                                    className="px-5 py-3 text-white rounded-lg bg-red-600 hover:text-red-600 border border-transparent
                                    hover:border-red-600 hover:bg-white hover:shadow-lg hover:shadow-gray-500 dark:bg-red-700 dark:text-white
                                    dark:hover:bg-white dark:hover:text-red-700 dark:hover:border-red-700"
                                    onClick={handleDeleteCita}
                                >
                                    Confirmar
                                </button>

                                <button
                                    className="px-5 py-3 text-black bg-gray-300 rounded-lg hover:text-black border border-transparent
                                    hover:border-gray-500 hover:bg-white hover:shadow-lg hover:shadow-gray-500"
                                    onClick={closeConfirmation}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DshContainer>
    );
};

export default DshCitas;

